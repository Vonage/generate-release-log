import { SectionType } from '../enums/sectionType';
import { cleanLines } from '../cleanLines';
import { SectionTitle } from '../enums/sectionTitle';

const headerRegex = /#|'|"/g

export class Section {
  type: SectionType;
  _lines: string[];

  constructor(type: SectionType, lines: string[] = []) {
    this._lines = lines;
    this.type = type;
  }

  get lines() {
    this._lines= cleanLines(this._lines);
    if (this._lines.length > 1 && this._lines[1] !== '') {
      this._lines = [
        this._lines[0],
        '',
        ...this._lines.splice(1)
      ]
    }

    return this._lines;
  }

  static parseHeader(line: string): SectionType | undefined {
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

  addLine(line: string): void {
    const firstWord = line.split(' ')[0];
    let newLine = line

    if (firstWord.startsWith('#')) {
      newLine = SectionTitle[this.type];
    }

    this._lines.push(newLine);
  }

  getLines(): Array<string> {
    return cleanLines(this.lines)
  }

  toString(): string {
    return this.getLines().join('\n');
  }
}
