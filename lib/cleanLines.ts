export const cleanLines = (lines: string[]): string [] => {
  let lastLine: string | null = null;
  let blankCount: number = 0;
  let cleanedLines: string[] = [];

  for (const line of lines) {
    blankCount += line === '' ? 1 : blankCount * -1;
    // Skip blank lines at the start
    if (blankCount && lastLine === null ) {
      continue;
    }

    if (lastLine === null) {
      cleanedLines.push(line);
      lastLine = line;
      continue;
    }
    
    if (line === '' && blankCount > 1) {
      continue;
    }

    cleanedLines.push(line);
    lastLine = line;
  }

  if (cleanedLines[cleanedLines.length -1] === '') {
    cleanedLines = cleanedLines.slice(0, -1);
  }

  return cleanedLines;
}

