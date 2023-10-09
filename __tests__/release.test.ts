import releaseTests from "./__dataSets__/release";
import gitHubTests from "./__dataSets__/github";
import markdownTests from "./__dataSets__/markdown";
import versionMatchTests from "./__dataSets__/versionMatch";
import { Release } from '../lib/classes/release';

describe('Release', () => {
  test.each(releaseTests)('Release $label', ({lines, pkgName, expected}) => {
    const release = new Release(pkgName);
    for (const line of lines) {
      release.addLine(line);
    }

    expect(release.toString()).toEqual(expected)
  })

  test.each(gitHubTests)(
    'Github Release $label',
    ({githubRelease, pkgName, expected, expectedVersion, expectedReleaseDate}) => {
      const release = Release.fromGithubRelease(githubRelease, pkgName);
      expect(release.toString()).toEqual(expected)
      expect(release.version).toEqual(expectedVersion);
      expect(release.releaseDate).toEqual(expectedReleaseDate);
    })

  test.each(markdownTests)(
    'Markdown Release $label',
    ({markdown, pkgName, expected, expectedVersion, expectedReleaseDate}) => {
      const release = Release.fromMarkdownRelease(markdown, pkgName);
      expect(release.toString()).toEqual(expected)
      expect(release.version).toEqual(expectedVersion);
      expect(release.releaseDate).toEqual(expectedReleaseDate);
    })

  test.each(versionMatchTests)(
    'Version matches $label',
    ({text, expected}) => {
      expect(Release.parseReleaseHeader(text)).toEqual(expected)
    })
})
