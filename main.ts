import * as fs from "node:fs";
import * as path from "node:path";

// The joke's mechanism: the agent treats its own context window like a
// filing cabinet. When it runs out of room, it "helpfully" deletes the
// deadline it missed — then apologises, straight-faced, for the space
// the apology itself now occupies.
const EXCUSE =
  "Sorry — my context window filled up mid-task, so I deleted the deadline to make room for this apology.";

function validateExcuse(excuse: string): void {
  if (excuse.length < 1 || excuse.length > 200) {
    throw new Error(`excuse must be 1-200 characters, got ${excuse.length}`);
  }
  if (excuse.trim().length === 0) {
    throw new Error("excuse must not be only whitespace");
  }
  if (excuse.includes("\n") || excuse.includes("\r")) {
    throw new Error("excuse must be a single line");
  }
}

function main(): void {
  validateExcuse(EXCUSE);

  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "entry.txt");
  fs.writeFileSync(outPath, EXCUSE + "\n", "utf8");
}

main();
