/**
 * Replace all occurrences of the "from" string with the "to" string in the "src" string
 * @param src {string} Source
 * @param from {string} String to replace
 * @param to {string} To replace all with
 */
export function replaceAll(src: string, from: string, to: string): string {
  let src2: string = src;
  const fromAll: string[] = [from];

  // If there is a newline symbol in the string (\n), replace them all with the Windows
  // newline symbol (\r\n)
  const newLines: number = (from.match(/\n/g) || []).length;
  if (newLines > 0) {
    fromAll.push(from.replace('\n', '\r\n'));
  }
  for (let i: number = 0; i < newLines - 1; i++) {
    fromAll[1] = fromAll[1].replace('\n', '\r\n');
  }

  for (let i: number = 0; i < fromAll.length; i++) {
    const count: number = (src.match(new RegExp(fromAll[i], 'g')) || []).length;
    for (let j: number = 0; j < count; j++) {
      src2 = src2.replace(fromAll[i], to);
    }
  }
  return src2;
}

/**
 * Replace all occurrences of the "from" string with the "to" string in the "src" string
 * Keeps characters in mind that need to be escaped in LaTeX
 * @param file {string} Source
 * @param from {string} String to replace
 * @param to {string} To replace all with
 */
export function replaceAllSafe(file: string, from: string, to: string): string {
  to = to.replace('\\', '\\textbackslash');
  to = to.replace('~', '\\textasciitilde');
  to = to.replace('^', '\\textasciicircum');
  to = to.replace(/([&%$#_{}])/g, '\\$1');
  return replaceAll(file, from, to);
}
