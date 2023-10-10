import tests from './__dataSets__/parserRelease';

import { parseReleaseLog } from '../lib/parseReleaseLog';

describe('Release log', () => {
  test.each(tests)('Parses $label', async ({ file, expected }) => {
    const markdown = await parseReleaseLog(file);
    expect(markdown.toString()).toEqual(expected);
  });
});
