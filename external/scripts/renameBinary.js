import { execa } from 'execa';
import * as fs from 'fs';
import * as path from 'path';

// Attempt to more reliably determine the script's directory.
const scriptDirectory = path.dirname(new URL(import.meta.url).pathname);
console.log(`Script directory (pre-adjustment): ${scriptDirectory}`);

// Adjust for Windows' "/" vs. "\" and potential leading "/" issue.
const adjustedScriptDirectory = scriptDirectory.replace(/^\/([A-Za-z]:\/)/, '$1');
console.log(`Script directory (adjusted for Windows): ${adjustedScriptDirectory}`);

const externalBackendBinaryDir = path.join(adjustedScriptDirectory, '..', 'backend');
console.log(`[EXTERNAL] binaries directory: ${externalBackendBinaryDir}`);

let extension = '';
if (process.platform === 'win32') {
  extension = '.exe';
}

async function main() {
  const rustInfo = (await execa('rustc', ['-vV'])).stdout;
  const targetTriple = /host: (\S+)/g.exec(rustInfo)[1];
  if (!targetTriple) {
    console.error('Failed to determine platform target triple');
    return;
  }

  console.log(`Target triple: ${targetTriple}`);

  const files = fs.readdirSync(externalBackendBinaryDir);
  files.forEach((file) => {
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
  process.exit(1);
});
