import { SectionType } from './enums/sectionType';
import { Section } from './classes/section';
export declare const getSectionByType: (sections: Set<Section>, which: SectionType) => Section | undefined;
