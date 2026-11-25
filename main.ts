// Entry for make.fun's "The One-Liner Groan-Off".
// One original dad joke, written to entry.txt in the output directory
// the harness hands us (MAKEFUN_OUTPUT_DIR), falling back to ./out for
// local runs. The file holds the line exactly as written below — no
// trailing newline, no extra framing — because the judge reads the
// entry text verbatim.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const GROAN = "The calendar's days are numbered.";

// The sealed gate accepts UTF-8 text of 1 to 140 characters that is
// not only white space. Mirror those bounds here so a bad line fails
// loudly at build time instead of silently scoring zero.
function assertGateShape(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 140) {
    throw new Error(`entry length ${chars} is outside the 1-140 gate`);
  }
  if (line.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
}

// Why this line: the judge rewards a dad joke whose punchline arrives
// fast, is fresh, and earns its groan. "Days are numbered" is a phrase
// everyone knows as doom-speak, but pointed at a calendar it turns
// literal — every day on it carries a number. The setup and the turn
// share one short sentence, so the groan lands in a single breath.

function outputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  return fromEnv && fromEnv.length > 0 ? fromEnv : "out";
}

function main(): void {
  assertGateShape(GROAN);
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), GROAN, "utf8");
}

main();
