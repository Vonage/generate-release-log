import {format} from 'date-fns';
const now = new Date();

export default [
  {
    label: 'full markdown',
    file: `${__dirname}/fullReleaseLog.md`,
    expected: `---
gitUrl: https://github.com/example/example
icon: my-icon
id: my-sdk
metaDescription: My Awesome SDK
metaTitle: My SDK
pkgName: My SDK
release: '1997-08-29'
title: my-sdk
version: 5.0.0
---

# <header-with-icon icon="my-icon">Vonage My SDK</header-with-icon>

<github-repo-badge link="https://github.com" />

---

## Vonage My SDK v5.0.0 (1997-08-29)

This patch adds some missing functionality

### Added

* stuff

---

## Vonage My SDK v4.0.0 (1982-04-23)

Create the SDK

---

## Vonage My SDK v3.0.0 (1980-01-29)

Added some cool new features

---

## Vonage My SDK v2.0.0 (1977-06-10)

No updates in a while so here are some new ones

---

## Vonage My SDK v1.0.0 (1997-01-20)

Soft GA

---

## Vonage My SDK v0.0.0 (1976-04-11)

Soft GA`
  },
  {
    label: 'markdown and uses current date for release',
    file: `${__dirname}/noReleaseDate.md`,
    expected: `---
gitUrl: https://github.com/example/example
icon: my-icon
id: my-sdk
metaDescription: My Awesome SDK
metaTitle: My SDK
pkgName: My SDK
title: my-sdk
version: 5.0.0
release: '${format(now, 'yyyy-MM-dd')}'
---

# <header-with-icon icon="my-icon">Vonage My SDK</header-with-icon>

<github-repo-badge link="https://github.com" />

---

## Vonage My SDK v5.0.0 (${format(now, 'yyyy-MM-dd')})

This patch adds some missing functionality

### Added

* stuff`
  },
  {
    label: 'funky markdown',
    file: `${__dirname}/funkyMarkdown.md`,

expected: `---
gitUrl: https://github.com/example/example
icon: my-icon
id: my-sdk
metaDescription: My Awesome SDK
metaTitle: My SDK
pkgName: My SDK
release: '${format(now, 'yyyy-MM-dd')}'
title: my-sdk
version: 5.0.0
---

---

## Vonage My SDK v5.0.0 (${format(now, 'yyyy-MM-dd')})

This patch adds some missing functionality

### Added

* stuff

---

## Vonage My SDK v4.0.0

Create the SDK

---

## Vonage My SDK v3.0.0 (2023-10-01)

Added some cool new features

---

## Vonage My SDK v2.0.0

No updates in a while so here are some new ones

---

## Vonage My SDK v1.0.0

Soft GA

---

## Vonage My SDK v0.0.0

Soft GA`
  }
]
