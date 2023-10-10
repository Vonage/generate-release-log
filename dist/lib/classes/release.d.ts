import { Release as GitHubRelease } from '@octokit/webhooks-types';
import { Section } from '../classes/section';
export declare class Release {
    version: string | null;
    sections: Set<Section>;
    lines: string[];
    releaseDate: string | null;
    pkgName: string;
    static parseReleaseHeader(line: string): Array<string | null>;
    static fromGithubRelease(gitHubRelease: GitHubRelease, pkgName?: string): Release;
    static fromMarkdownRelease(markdown: string, pkgName?: string): Release;
    constructor(pkgName?: string);
    get releaseTitle(): string;
    addLine(line: string): void;
    getLines(): Array<string>;
    toString(): string;
}
