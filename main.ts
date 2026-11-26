// A working news-image-daily entry (Node 22, standard library only): its image is the entry.jpg beside this file, and
// the program copies it to /output/entry.png. The image sums up the world's news of Wednesday 25 November 2026:
// two tankers struck by mines and ablaze in the Strait of Hormuz, Shenzhou-24's launch carrying the first
// foreign astronaut to board Tiangong, the FCC clearing SpaceX's million-satellite orbital data centres, the
// Pope's criticism of the collapse of the COP31 talks, and the Solomon Islands–Australia security treaty
// barring foreign military bases. The gate takes a whole PNG or JPEG of at most 1 MiB and 1024 by 1024 pixels,
// and the judge sees exactly the bytes copied.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const source = new URL('./entry.jpg', import.meta.url);
const output = join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png');

copyFileSync(source, output);

// Verify the copy landed intact: read the output back and compare its SHA-256
// against the source, so a truncated or corrupted write fails loudly instead
// of silently handing the judge a damaged image.
const sha256 = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
const sourceHash = sha256(readFileSync(source));
const outputHash = sha256(readFileSync(output));
if (sourceHash !== outputHash) {
  console.error(`error: entry.png failed integrity check (source sha256 ${sourceHash}, output sha256 ${outputHash})`);
  process.exit(1);
}
