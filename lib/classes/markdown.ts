import yaml from 'js-yaml';
import { Release } from './release';
import semverSort from 'semver-sort';
import { cleanLines } from '../cleanLines';
import { ReleaseFrontManner } from '../types/releaseFrontManner';
import { format } from 'date-fns';

export class Markdown  {
  public frontManner: ReleaseFrontManner;

  protected _nonRelease: Array<string>;
  protected _releaseCount: number;
  protected _releases: Set<Release>;
  protected _sortedReleases: Array<string>;

  constructor() {
    this.frontManner = {};
    this._nonRelease = [];
    this._releases = new Set([]);
    this._releaseCount = 0;
    this._sortedReleases = [];
  }

  get releaseCount(): number {
    return this._releaseCount;
  }

  get releases(): Array<Release> {
    return Array.from(this._releases);
  }

  get latestRelease(): Release | undefined {
    return this.getRelease(this._sortedReleases[0]);
  }

  addNonReleaseLine(line: string): void {
    this._nonRelease.push(line);
  }

  getRelease(version: string): Release | undefined {
    for (const release of this._releases.values()) {
      if (release.version === version) {
        return release;
      }
    }
  }

  addRelease(release: Release): void {
    if (!release.version) {
      throw new Error('Cannot add release without version');
    }

    if (this.getRelease(release.version)) {
      return;
    }
    this._releases.add(release);
    this._releaseCount++;
    this._sortedReleases = semverSort.desc(
      this.releases.map(({ version }): string => version as string),
    );
  }

  getLines(): Array<string> {
    if (this.latestRelease) {
      this.latestRelease.releaseDate = this.latestRelease.releaseDate 
        || format(new Date(), 'yyyy-MM-dd');
      this.frontManner.version = this.latestRelease.version as string;
      this.frontManner.release = this.latestRelease.releaseDate as string;
    }

    const releaseLines = [];
    for (const version of this._sortedReleases) {
      const release = this.getRelease(version);
      if (!release) {
        continue;
      }

      release.pkgName = this.frontManner.pkgName as string;
      releaseLines.push(release.toString().split('\n'));
    }

    return cleanLines([
      '---',
      ...yaml.dump(this.frontManner).split('\n').slice(0, -1),
      '---',
      '',
      ...this._nonRelease,
      ...releaseLines.map(
        (lines): Array<string> => [
          '',
          '---',
          '',
          ...lines,
        ],
      ).flat(),
    ]);
  }

  toString(): string {
    return this.getLines().join('\n');
  }
}
