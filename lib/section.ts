import { SectionType } from './enums/sectionType';
import { Section } from './classes/section';

export const getSectionByType = (
  sections: Set<Section>,
  which: SectionType,
): Section | undefined => {
  for (const section of sections.values()) {
    if (section.type === which) {
      return section;
    }
  }
};

