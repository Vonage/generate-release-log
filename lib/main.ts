import * as core from '@actions/core';
import * as github from '@actions/github';
import { ReleaseEvent } from '@octokit/webhooks-types';
import { parseReleaseLog } from './parseReleaseLog';
import { resolve } from 'path';
import { Release } from './classes/release';
import * as fs from 'fs';

export async function run(): Promise<void> {
  core.info('Updating release');
  try {
    const inputFile: string = core.getInput('input-file');
    core.debug(`File from workflow [${inputFile}]`);
    const releaseFile: string = inputFile
      || resolve(process.cwd(), './RELEASES.md');

    core.debug(`Reading file ${releaseFile}`);

    if (!fs.existsSync(releaseFile)) {
      core.info(`File ${releaseFile} does not exist`);
      core.info(`Please create a ${releaseFile} file in the root of your project`);
      return;
    }

    const markdown = await parseReleaseLog(releaseFile);

    const { release: githubRelease } = github.context.payload as ReleaseEvent;
    const release = Release.fromGithubRelease(githubRelease);

    markdown.addRelease(release);
    core.debug(`Release: ${release.toString()}`);
    core.debug(`Writing file ${releaseFile}`);
    fs.writeFileSync(releaseFile, markdown.toString());
  } catch (error) {
    if (error instanceof Error) {core.setFailed(error.message);}
  }
}
