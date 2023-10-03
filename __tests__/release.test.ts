import tests from "./__dataSets__/releaseToMarkdown";
import { markdownRelease } from '../lib/release';

describe('Release', () => {
  test.each(tests)('Converts $label', ({pkgName, release, expected}) => {
    expect(markdownRelease(pkgName, release)).toEqual(expected)
  })
})
