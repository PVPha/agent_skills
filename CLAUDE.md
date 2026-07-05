# Claude Code Entry Point

@AGENTS.md

Note for Claude Code: the canonical skill source is `.agents/skills/`. The copies in `.claude/skills/` are an auto-generated mirror (run `pnpm sync:skills` after editing skills) so Claude Code's native skill discovery picks them up. Treat both paths as the same skills.
