export default [
  {
    label: 'major, minor, patch',
    text: '## 1.2.3',
    expected: ['1.2.3', undefined]
  },
  {
    label: 'major, minor, patch with header',
    text: '## 1.2.3',
    expected: ['1.2.3', undefined]
  },
  {
    label: 'major, minor, patch with v',
    text: '## v1.2.3',
    expected: ['1.2.3', undefined]
  },
  {
    label: 'major, minor, patch with extra characters',
    text: '## [1.2.3]',
    expected: ['1.2.3', undefined]
  },
  {
    label: 'major, minor, patch with extra characters and v',
    text: '## [v1.2.3]',
    expected: ['1.2.3', undefined]
  },
  {
    label: 'major, minor, patch with relese header',
    text: '## Vonage My SDK v1.2.3',
    expected: ['1.2.3', undefined]
  },
  {
    label: 'major, minor, patch with relese header and date',
    text: '## Vonage My SDK v1.2.3 (1997-08-29)',
    expected: ['1.2.3', '1997-08-29']
  },
  {
    label: 'major, minor, patch with relese header, date but no package name',
    text: '## Vonage v1.2.3 (1997-08-29)',
    expected: ['1.2.3', '1997-08-29']
  },
  {
    label: 'major, minor, patch with relese header but no package name',
    text: '## Vonage v1.2.3',
    expected: ['1.2.3', undefined]
  }
]
