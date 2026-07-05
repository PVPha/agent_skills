// Mirrors .agents/skills/ (source of truth) into .claude/skills/ so Claude Code
// discovers the same skills that Antigravity and Codex load natively.
// Run: pnpm sync:skills
import { cpSync, rmSync, existsSync } from "node:fs";

const SOURCE = ".agents/skills";
const TARGET = ".claude/skills";

if (!existsSync(SOURCE)) {
  console.error(`Source directory not found: ${SOURCE}`);
  process.exit(1);
}

rmSync(TARGET, { recursive: true, force: true });
cpSync(SOURCE, TARGET, { recursive: true });
console.log(`Synced ${SOURCE} -> ${TARGET}`);
