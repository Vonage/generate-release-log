import { Release as GitHubRelease } from '@octokit/webhooks-types';
import { Section } from '../classes/section';
import { SectionType } from '../enums/sectionType';
import { SectionOrder } from '../enums/sectionOrder';
import { format } from 'date-fns';
import { cleanLines } from '../cleanLines';

const releaseRegex = /(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))? ?\(?([0-9-]*)?\)?/;
const newLineRegext =/\r?\n|\r|\n/g;

const getSection = (
  sections: Set<Section>,
  which: SectionType,
): Section | undefined => {
  for (const section of sections.values()) {
    if (section.type === which) {
      return section;
    }
  }
};

export class Release  {
  version: string | null;
  sections: Set<Section>;
  lines: string[];
  releaseDate: string | null;
  pkgName: string;

  static parseReleaseHeader(line: string): Array<string | null>{
    if (!line.startsWith('#')) {
      return [];
    }

    let m;
    while ((m = releaseRegex.exec(line)) !== null) {
      if (m.index === releaseRegex.lastIndex) {
        releaseRegex.lastIndex++;
      }

      const releaseDate = m[6];
      const version =`${[m[1], m[2], m[3]].join('.')}${m[4] ? `-${m[4]}` : ''}`;

      return [version, releaseDate];
    }

    return [];
  }

  static fromGithubRelease(
    gitHubRelease: GitHubRelease,
    pkgName: string = '',
  ): Release {

    const release = Release.fromMarkdownRelease(gitHubRelease.body, pkgName);
    release.version = gitHubRelease.tag_name.replaceAll('v', '');
    release.releaseDate = format(
      Date.parse(
        gitHubRelease.published_at
          || gitHubRelease.created_at as string,
      ),
      'yyyy-MM-dd',
    );

    return release;
  }

  static fromMarkdownRelease(
    markdown: string,
    pkgName: string = '',
  ) {
    const releaseLines = markdown.split(newLineRegext);
    const release = new Release(pkgName);
    for (const line of releaseLines) {
      release.addLine(line);
    }

    return release;
  }

  constructor(pkgName: string = '') {
    this.sections = new Set([new Section(SectionType.PREAMBLE)]);
    this.lines = [];
    this.version = null;
    this.releaseDate = null;
    this.pkgName = pkgName;
  }

  get releaseTitle(): string {
    const parts: string[] = [
      '## Vonage',
    ];

    if (this.pkgName) {
      parts.push(this.pkgName);
    }

    if (this.version) {
      parts.push(`v${this.version}`);
    }

    if (this.releaseDate) {
      parts.push(`(${this.releaseDate})`);
    }

    return parts.join(' ');
  }


  addLine(line: string): void {
    const [version, releaseDate] = Release.parseReleaseHeader(line);
    if (!this.releaseDate && releaseDate) {
      this.releaseDate = releaseDate;
    }

    if (!this.version && version) {
      this.version = version;
      return;
    }

    this.lines.push(line);
  }

  getLines(): Array<string> {
    const sections = [] as Section[];
    let lastSection = SectionType.PREAMBLE;

    for (const line of this.lines) {
      lastSection = Section.parseHeader(line) || lastSection;
      const currentSection = getSection(
        this.sections,
        lastSection,
      ) || new Section(lastSection);
      currentSection.addLine(line);
      this.sections.add(currentSection);
    }

    for(const section of this.sections.values()) {
      sections.push(section);
    }

    sections.sort((
      sectionOne: Section,
      sectionTwo: Section,
    ) => SectionOrder[sectionOne.type] - SectionOrder[sectionTwo.type]);

    return cleanLines([
      this.releaseTitle,
      '',
      ...sections.map(({ lines }) => [...lines, '']),
    ].flat());
  }

  toString(): string {
    return this.getLines().join('\n').trimRight();
  }
}
