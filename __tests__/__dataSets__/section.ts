import { SectionType } from '../../lib/enums/sectionType';

export default [
  {
    label: 'outputs empty section',
    lines: [],
    type: SectionType.PREAMBLE,
    expected: ``,
  },
  {
    label: 'outputs section',
    lines: [
      '### Added',
      '',
      '* reticulating splines',
    ],
    type: SectionType.ADDED,
    expected: `### Added

* reticulating splines`,
  },
  {
    label: 'removes extra lines',
    lines: [
      '',
      '',
      '### Added',
      '',
      '',
      '* reticulating splines',
      '',
      '',
      '',
    ],
    type: SectionType.ADDED,
    expected: `### Added

* reticulating splines`,
  },
  {
    label: 'adjusts headings',
    lines: [
      '# Fixes',
      '',
      '* reticulating splines',
      '',
      '',
      '',
    ],
    type: SectionType.FIXED,
    expected: `### Fixed

* reticulating splines`,
  },
  {
    label: 'adds line after header',
    lines: [
      '# Fixes',
      '* reticulating splines',
    ],
    type: SectionType.FIXED,
    expected: `### Fixed

* reticulating splines`,
  },


];
