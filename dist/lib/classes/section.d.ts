import { SectionType } from '../enums/sectionType';
export declare class Section {
    type: SectionType;
    _lines: string[];
    constructor(type: SectionType, lines?: string[]);
    get lines(): string[];
    static parseHeader(line: string): SectionType | undefined;
    addLine(line: string): void;
    getLines(): Array<string>;
    toString(): string;
}
