import { Release } from '@octokit/webhooks-types';
import { format } from 'date-fns';

const regex =/\r?\n|\r|\n/g;
const headerRegex = /#|'|"/gm;

enum SectionType {
  ADDED = 'ADDED',
  CHANGED = 'CHANGED',
  CHANGELOG = 'CHANGELOG',
  CONTRIBUTOR = 'CONTRIBUTOR',
  DEPRECATED = 'DEPRECATED',
  FIXED = 'FIXED',
  PREAMBLE = 'PREAMBLE',
  REMOVED = 'REMOVED',
  SECURITY = 'SECURITY',
}

enum SectionOrder {
  PREAMBLE = 0,
  ADDED = 1,
  FIXED = 2,
  SECURITY = 3,
  REMOVED = 4,
  CHANGED = 5,
  DEPRECATED = 6,
  CONTRIBUTOR = 7,
  CHANGELOG = 8
}

enum SectionTitle {
  ADDED = '### Added',
  CHANGED = '### Changed',
  CHANGELOG = '', 
  CONTRIBUTOR = '### New Contributor(s)',
  DEPRECATED = '### Deprecated',
  FIXED = '### Fixed',
  PREAMBLE = '',
  REMOVED = '### Removed',
  SECURITY = '### Security',
}

type Section = {
  name: SectionType
  content: string[],
};

const normalizeLine = (line: string): string => {
  const firstWord = line.split(' ')[0];
  let newLine = line

  if (['#', '##'].includes(firstWord)) {
    newLine =`#${line}`; 
  }

  return newLine.trimRight(); 
}

const getSection = (sections: Set<Section>, which: SectionType): Section | undefined => {
  for (const section of sections.values()) {
    if (section.name === which) {
      return section;
    }
  }
};

const parseSection = (line: string): SectionType | undefined => {
  const noHeader = `${line}`.replaceAll(headerRegex, '').trim().toUpperCase();
  switch(noHeader) {
    // This is the default from github
    case 'WHATS NEW':
    case 'WHATS CHANGED':
    case SectionType.ADDED:
      return SectionType.ADDED;
    case SectionType.CHANGED:
      return SectionType.CHANGED;
    // This is added from github
    case 'NEW CONTRIBUTORS':
    case SectionType.CONTRIBUTOR:
      return SectionType.CONTRIBUTOR;
    case SectionType.DEPRECATED:
      return SectionType.DEPRECATED;
    case 'FIXES':
    case SectionType.FIXED:
      return SectionType.FIXED;
    case SectionType.PREAMBLE:
      return SectionType.PREAMBLE;
    case SectionType.REMOVED:
      return SectionType.REMOVED;
    case SectionType.SECURITY:
      return SectionType.SECURITY;
  }

  if (noHeader.startsWith('**FULL CHANGELOG**')) {
    return SectionType.CHANGELOG;
  }
}

const cleanSection = (section: Section) => {
  section.content = section.content.map(
    (content) => content.startsWith('#') ? '' : content
  );

  if (!section.content[0]) {
    section.content[0] = SectionTitle[section.name]
  }

  return section;
};

export const markdownRelease = (pkgName: string, release: Release): string => {
  const version = release.tag_name.replaceAll('v', '');
  const releaseDate = Date.parse(release.published_at || release.created_at as string);
  const sectionSet = new Set([]) as Set<Section>;
  const sections = [] as Section[];

  const releaseLines = release.body.split(regex);
  let lastSection = SectionType.PREAMBLE;

  for (const line of releaseLines) {
    lastSection = parseSection(line) || lastSection;
    const currentSection = getSection(sectionSet, lastSection) || {name: lastSection, content: [], title: SectionTitle[lastSection]} as Section
    currentSection.content.push(normalizeLine(line));
    sectionSet.add(currentSection);
  }

  for (const section of sectionSet.values()) {
    sections.push(cleanSection(section));
  }

  sections.sort(
    (sectionOne: Section, sectionTwo: Section) => SectionOrder[sectionOne.name] - SectionOrder[sectionTwo.name]
  )

  let lastLine: string | null = null;
  const markdownLines = [
    `## Vonage ${pkgName} v${version} (${format(releaseDate, 'yyyy-MM-dd')})`,
    '',
    ...sections.map(({content}: Section) => content)
  ]
  .flat()
  // Remove duplicate blank lines
  .filter((line) => {
    if (null === lastLine) {
      lastLine = line;
      return true;
    }

    if (lastLine === '' && line === '') {
      lastLine = line;
      return false;
    }

    lastLine = line;
    return true;
  })

  return markdownLines.join('\n')
} 
