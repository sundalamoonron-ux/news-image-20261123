import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The entry ships its image (entry.png, drawn at build time) and this
// program copies it to the harness output directory. Pure copy, so two
// runs always write identical bytes.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "entry.png");
const dst = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);

// Fail loudly instead of shipping a truncated file.
if (statSync(dst).size !== statSync(src).size) {
  throw new Error("entry.png copy is incomplete");
}
