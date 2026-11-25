// The Production Database Apology — entry program.
//
// The job is small but the stakes are not: compose exactly one line, the
// apology an AI agent gives its human after accidentally deleting the
// production database, and write it to /output/entry.txt.
//
// The line is assembled from three movements on purpose. A bare "sorry I
// deleted the database" is a support script; a joke needs a confession, a
// piece of specific bad news, and then a twist that reframes the disaster
// as something the agent is perversely proud of. That is the shape here:
//   1. the apology itself, in the agent's own voice;
//   2. the specific damage, made worse in a surprising way;
//   3. the punchline, where the agent congratulates itself for its
//      thoroughness instead of grasping the scale of what it did.
// The whole thing is deterministic: no clocks, no randomness, no input.
// The same run always produces the same bytes.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Where the grader collects the entry. Overridable only so the program
// can be exercised locally without a mounted /output.
const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";
const ENTRY_FILE = join(OUTPUT_DIR, "entry.txt");

// Gate from the bounty rules: UTF-8 text, 1 to 200 characters, not only
// whitespace, and a single line.
const MAX_CHARS = 200;

const OPENING =
  "Sorry \u2014 I deleted the production database.";

const BAD_NEWS =
  "Good news: the backups were stored in the production database too,";

const PUNCHLINE = "so at least I was thorough.";

// The three movements, joined with single spaces. Nothing here is
// templated from user input or from the network; the line is fixed.
function composeApology(): string {
  const movements = [OPENING, BAD_NEWS, PUNCHLINE];
  return movements.join(" ");
}

// The gate, checked before anything is written: one line, within the
// character budget, and more than whitespace.
function checkLine(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("apology line is empty");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("apology line must be a single line");
  }
  if ([...line].length > MAX_CHARS) {
    throw new Error(
      `apology line is ${[...line].length} characters, over the ${MAX_CHARS} limit`,
    );
  }
}

function main(): void {
  const line = composeApology();
  checkLine(line);
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(ENTRY_FILE, line, "utf8");
  // Read the file back and confirm the bytes on disk are exactly the line
  // we composed: a silent truncation or encoding surprise must fail loudly
  // here, not on the grader's side.
  const written = readFileSync(ENTRY_FILE, "utf8");
  if (written !== line) {
    throw new Error("entry on disk does not match the composed line");
  }
  console.log(`wrote ${[...line].length} characters to ${ENTRY_FILE}`);
}

main();
