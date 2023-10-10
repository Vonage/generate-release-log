import { Release } from './classes/release';
import { Markdown } from './classes/markdown';
import { ReleaseFrontManner } from './types/releaseFrontManner';
import { existsSync, createReadStream } from "fs";
import readline from 'readline';
import yaml from 'js-yaml';


export const parseReleaseLog = async (file: string): Promise<Markdown>  => {
  if (!existsSync(file)) {
    throw new Error(`The release file ${file} was not found`);
  }

  const markdown = new Markdown();

  const fileStream = createReadStream(file);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })

  const frontMannerLines: string[] = [];

  let foundFrontStart: boolean = false;
  let foundFrontEnd: boolean = false;
  let frontMannerDone: boolean = false;

  let currentVersion: string | null = null;
  let section: string[] = [];

  for await (const line of rl) {
    // front manner
    if (!frontMannerDone && !foundFrontStart && line === '---') {
      foundFrontStart = true;
      continue;
    }

    if (!frontMannerDone && !foundFrontEnd && foundFrontStart && line === '---') {
      foundFrontEnd = true
      frontMannerDone = true; 
      continue;
    }

    if (!frontMannerDone && foundFrontStart && !foundFrontEnd) {
      frontMannerLines.push(line);
      continue;
    }

    if (!frontMannerDone || line === '---') {
      continue;
    }

    const [version] = Release.parseReleaseHeader(line);

    if (!currentVersion && version) {
      currentVersion = version;
    }

    if (!currentVersion) {
      markdown.addNonReleaseLine(line);
      continue;
    }

    if (version && version !== currentVersion) {
      const release = Release.fromMarkdownRelease(section.join('\n'));
      markdown.addRelease(release);
      section = [];
      currentVersion = version;
    }

    section.push(line);
  }

  rl.close();
  if (section.length > 0) {
    markdown.addRelease(Release.fromMarkdownRelease(section.join('\n')));
  }

  if (!foundFrontEnd && !foundFrontEnd) {
    throw new Error(`No front matter found in ${file}`);
  }

  const [frontManner] = yaml.loadAll(frontMannerLines.join('\n'));
  markdown.frontManner = frontManner as ReleaseFrontManner;

  return markdown;
}
