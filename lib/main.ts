import * as core from '@actions/core';
import * as github from '@actions/github';
import { ReleaseEvent } from '@octokit/webhooks-types';
import { parseReleaseLog } from './parseReleaseLog';
import { resolve } from 'path';
import { Release } from './classes/release';
import * as fs from 'fs';

export async function run(): Promise<void> {
  try {
    const releaseFile: string = core.getInput('release-file')
      || resolve(process.cwd(), 'RELEASES.md');
    core.debug(`Reading file ${releaseFile}`);

    const markdown = await parseReleaseLog(releaseFile);

    const { release: githubRelease } = github.context.payload as ReleaseEvent;
    const release = Release.fromGithubRelease(githubRelease);

    markdown.addRelease(release);
    core.debug(`Writing file ${releaseFile}`);
    fs.writeFileSync(releaseFile, markdown.toString());

  } catch (error) {
    if (error instanceof Error) {core.setFailed(error.message);}
  }
}
