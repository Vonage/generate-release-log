import { SectionType } from '../../lib/enums/sectionType';

export default [
  {
    label: 'returns undefined',
    line: '',
    expected: undefined,
  },
  {
    label: 'returns added for "Whats New"',
    line: '### Whats New',
    expected: SectionType.ADDED,
  },
  {
    label: 'returns added for "What\'s New"',
    line: '### What\'s New',
    expected: SectionType.ADDED,
  },
  {
    label: 'returns added for "What\'s Changed"',
    line: '### What\'s Changed',
    expected: SectionType.ADDED,
  },
];
