import { Release } from './release';
import { ReleaseFrontManner } from '../types/releaseFrontManner';
export declare class Markdown {
    frontManner: ReleaseFrontManner;
    protected _nonRelease: Array<string>;
    protected _releaseCount: number;
    protected _releases: Set<Release>;
    protected _sortedReleases: Array<string>;
    constructor();
    get releaseCount(): number;
    get releases(): Array<Release>;
    get latestRelease(): Release | undefined;
    addNonReleaseLine(line: string): void;
    getRelease(version: string): Release | undefined;
    addRelease(release: Release): void;
    getLines(): Array<string>;
    toString(): string;
}
