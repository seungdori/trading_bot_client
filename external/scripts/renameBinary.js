/**
 * This script creates copies of all binaries in the specified directory with platform-specific postfixes appended to their names,
 * ensuring that files already containing the target triple in their names are not duplicated.
 */
import { execa } from 'execa';
import * as fs from 'fs';
import * as path from 'path';

const __dirname = new URL('.', import.meta.url).pathname;

let extension = '';
if (process.platform === 'win32') {
  extension = '.exe';
}

const externalBackendBinaryDir = path.join(__dirname, '../', 'backend');
console.log(`[EXTERNAL] binaries directory: ${externalBackendBinaryDir}`);

async function main() {
  const rustInfo = (await execa('rustc', ['-vV'])).stdout;
  const targetTriple = /host: (\S+)/g.exec(rustInfo)[1];
  if (!targetTriple) {
    console.error('Failed to determine platform target triple');
    return;
  }

  const files = fs.readdirSync(externalBackendBinaryDir);
  files.forEach((file) => {
    // Check if the file is not a directory and does not already contain the target triple
    const filePath = path.join(externalBackendBinaryDir, file);
    if (fs.statSync(filePath).isFile() && !file.includes(targetTriple)) {
      const renamedFilePath = path.join(
        externalBackendBinaryDir,
        `${path.parse(file).name}-${targetTriple}${extension}`,
      );
      fs.copyFileSync(filePath, renamedFilePath);
      console.log(`[SUCCESS] Created renamed binary: ${renamedFilePath}`);
    } else if (file.includes(targetTriple)) {
      console.log(`[SKIP] File already contains the target triple: ${file}`);
    }
  });
}

main().catch((e) => {
  console.error(e);
  throw e;
});
