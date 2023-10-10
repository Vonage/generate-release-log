import * as core from '@actions/core';
import * as github from '@actions/github';
import * as main from '../lib/main';
import { releaseEvent } from './__dataSets__/release.event';
import { resolve } from 'path';
import mockFs from 'mock-fs';
import { readFileSync } from 'fs';

const getInputMock = jest.spyOn(core, 'getInput');
const runMock = jest.spyOn(main, 'run');

describe('action', () => {
  beforeEach(() => {
    mockFs({
      'RELEASES.md': mockFs.load(resolve(__dirname, '__dataSets__/empty.md')),
    });
    jest.clearAllMocks();
  });

  afterEach(() => {
    mockFs.restore();
  });

  test('Adds github release', async () => {
    const releaseFile =resolve(process.cwd(), 'RELEASES.md'); 
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
      default:
        return '';
      }
    });

    github.context.payload = releaseEvent; 

    await main.run();
    expect(runMock).toHaveReturned();
    expect(readFileSync(releaseFile, 'utf-8')).toBe(`---
gitUrl: https://github.com/example/example
icon: my-icon
id: my-sdk
metaDescription: My Awesome SDK
metaTitle: My SDK
pkgName: My SDK
title: my-sdk
version: 1.0.0
release: '2023-10-01'
---

---

## Vonage My SDK v1.0.0 (2023-10-01)

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

* Call to kernal`);
  });
});
