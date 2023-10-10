import { Release } from '@octokit/webhooks-types';
export default [
  {
    label: 'standard github release to markdown',
    pkgName: 'My SDK',
    githubRelease: JSON.parse(JSON.stringify({
      url: "https://api.github.com/repos/alice.bob/release-testing/releases/123456789011",
      assets_url: "https://api.github.com/repos/alice.bob/release-testing/releases/123456789011/assets",
      upload_url: "https://uploads.github.com/repos/alice.bob/release-testing/releases/123456789011/assets{?name,label}",
      html_url: "https://github.com/alice.bob/release-testing/releases/tag/untagged-093b136fe952f1a03a3d",
      id: 123456789011,
      author: {
        login: "alice.bob",
        id: 123456,
        node_id: "MDQ6VXNlcjEyMzQ1NgogICAgICAg",
        avatar_url: "https://avatars.githubusercontent.com/u/123456?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/alice.bob",
        html_url: "https://github.com/alice.bob",
        followers_url: "https://api.github.com/users/alice.bob/followers",
        following_url: "https://api.github.com/users/alice.bob/following{/other_user}",
        gists_url: "https://api.github.com/users/alice.bob/gists{/gist_id}",
        starred_url: "https://api.github.com/users/alice.bob/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/alice.bob/subscriptions",
        organizations_url: "https://api.github.com/users/alice.bob/orgs",
        repos_url: "https://api.github.com/users/alice.bob/repos",
        events_url: "https://api.github.com/users/alice.bob/events{/privacy}",
        received_events_url: "https://api.github.com/users/alice.bob/received_events",
        type: "User",
        site_admin: false,
      },
      node_id: "RE_kwDOJe08xM4HWkAL",
      tag_name: "1.0.0",
      target_commitish: "main",
      name: "1.0.0",
      draft: true,
      prerelease: false,
      created_at: "2023-10-01T14:21:07Z",
      published_at: null,
      assets: [],
      tarball_url: null,
      zipball_url: null,
      body: `## What's Changed
* fix: failed to reticulate splines @bob in https://github.com/example-org/example-repo/pull/42



**Full Changelog**: https://github.com/example-org/example-repo/compare/0.0.0...1.0.0`,
      mentions_count: 1,
    })) as Release,
    expected: `## Vonage My SDK v1.0.0 (2023-10-01)

### Added

* fix: failed to reticulate splines @bob in https://github.com/example-org/example-repo/pull/42

**Full Changelog**: https://github.com/example-org/example-repo/compare/0.0.0...1.0.0`,
    expectedVersion: '1.0.0',
    expectedReleaseDate: "2023-10-01",
  },
  {
    label: 'to releaselog and adjusts the order',
    pkgName: 'My SDK',
    githubRelease: JSON.parse(JSON.stringify({
      url: "https://api.github.com/repos/alice.bob/release-testing/releases/123456789011",
      assets_url: "https://api.github.com/repos/alice.bob/release-testing/releases/123456789011/assets",
      upload_url: "https://uploads.github.com/repos/alice.bob/release-testing/releases/123456789011/assets{?name,label}",
      html_url: "https://github.com/alice.bob/release-testing/releases/tag/untagged-093b136fe952f1a03a3d",
      id: 123456789011,
      author: {
        login: "alice.bob",
        id: 123456,
        node_id: "MDQ6VXNlcjEyMzQ1NgogICAgICAg",
        avatar_url: "https://avatars.githubusercontent.com/u/123456?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/alice.bob",
        html_url: "https://github.com/alice.bob",
        followers_url: "https://api.github.com/users/alice.bob/followers",
        following_url: "https://api.github.com/users/alice.bob/following{/other_user}",
        gists_url: "https://api.github.com/users/alice.bob/gists{/gist_id}",
        starred_url: "https://api.github.com/users/alice.bob/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/alice.bob/subscriptions",
        organizations_url: "https://api.github.com/users/alice.bob/orgs",
        repos_url: "https://api.github.com/users/alice.bob/repos",
        events_url: "https://api.github.com/users/alice.bob/events{/privacy}",
        received_events_url: "https://api.github.com/users/alice.bob/received_events",
        type: "User",
        site_admin: false,
      },
      node_id: "RE_kwDOJe08xM4HWkAL",
      tag_name: "1.0.0",
      target_commitish: "main",
      name: "1.0.0",
      draft: true,
      prerelease: false,
      created_at: "2023-10-01T14:21:07Z",
      published_at: "1997-08-29T02:14:00Z",
      assets: [],
      tarball_url: null,
      zipball_url: null,
      body: `## Vonage My SDK v1.0.0 (2023-11-01)

### Changed
* Planks constant to a lower value

### Deprecated
* Call to kernal 

### Fixes 
* Ctrl Key no longer overheats CPU

### Removed
* The need for speed

### Added
* New feature to reticulate splines

### Security
* Key Card now requrired for entry


`,
      mentions_count: 1,
    })) as Release,
    expected: `## Vonage My SDK v1.0.0 (1997-08-29)

### Added

* New feature to reticulate splines

### Fixed

* Ctrl Key no longer overheats CPU

### Security

* Key Card now requrired for entry

### Removed

* The need for speed

### Changed

* Planks constant to a lower value

### Deprecated

* Call to kernal`,
    expectedVersion: '1.0.0',
    expectedReleaseDate: "1997-08-29",
  },
  {
    label: 'a non standard release by leaving it alone',
    pkgName: 'My SDK',
    githubRelease: JSON.parse(JSON.stringify({
      url: "https://api.github.com/repos/alice.bob/release-testing/releases/123456789011",
      assets_url: "https://api.github.com/repos/alice.bob/release-testing/releases/123456789011/assets",
      upload_url: "https://uploads.github.com/repos/alice.bob/release-testing/releases/123456789011/assets{?name,label}",
      html_url: "https://github.com/alice.bob/release-testing/releases/tag/untagged-093b136fe952f1a03a3d",
      id: 123456789011,
      author: {
        login: "alice.bob",
        id: 123456,
        node_id: "MDQ6VXNlcjEyMzQ1NgogICAgICAg",
        avatar_url: "https://avatars.githubusercontent.com/u/123456?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/alice.bob",
        html_url: "https://github.com/alice.bob",
        followers_url: "https://api.github.com/users/alice.bob/followers",
        following_url: "https://api.github.com/users/alice.bob/following{/other_user}",
        gists_url: "https://api.github.com/users/alice.bob/gists{/gist_id}",
        starred_url: "https://api.github.com/users/alice.bob/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/alice.bob/subscriptions",
        organizations_url: "https://api.github.com/users/alice.bob/orgs",
        repos_url: "https://api.github.com/users/alice.bob/repos",
        events_url: "https://api.github.com/users/alice.bob/events{/privacy}",
        received_events_url: "https://api.github.com/users/alice.bob/received_events",
        type: "User",
        site_admin: false,
      },
      node_id: "RE_kwDOJe08xM4HWkAL",
      tag_name: "1.0.0",
      target_commitish: "main",
      name: "1.0.0",
      draft: true,
      prerelease: false,
      created_at: "2023-10-01T14:21:07Z",
      published_at: "1997-08-29T02:14:00Z",
      assets: [],
      tarball_url: null,
      zipball_url: null,
      body: `I am error

I am a change log that is not standard.`,
      mentions_count: 1,
    })) as Release,
    expected: `## Vonage My SDK v1.0.0 (1997-08-29)

I am error

I am a change log that is not standard.`,
    expectedVersion: '1.0.0',
    expectedReleaseDate: "1997-08-29",
  },
];
