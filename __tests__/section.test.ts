import sectionTests from "./__dataSets__/section";
import parserTests from "./__dataSets__/sectionParser";
import { Section } from '../lib/classes/section';

describe('Section', () => {
  test.each(sectionTests)('Section $label', ({ lines, type, expected }) => {
    const section = new Section(type);
    for (const line of lines) {
      section.addLine(line);
    }

    expect(section.toString()).toEqual(expected);
  });

  test.each(parserTests)('Parser $label', ({ line, expected }) => {
    expect(Section.parseHeader(line)).toEqual(expected);
  });
});
