# Agent Skills Setup

A portable set of coding skills, workflow gates, and planning templates for AI coding agents. Drop it into any repository and Antigravity, Codex, and Claude Code will all discover the same skills.

## How Each Agent Discovers the Setup

| Agent | Instructions file | Skills location | Notes |
| ----- | ----------------- | --------------- | ----- |
| Google Antigravity | `AGENTS.md` | `.agents/skills/` | Native support |
| OpenAI Codex | `AGENTS.md` | `.agents/skills/` | Native support (scans cwd up to repo root) |
| Claude Code | `CLAUDE.md` (imports `AGENTS.md`) | `.claude/skills/` (auto-generated mirror) | Claude Code does not read `.agents/skills/` yet |

`.agents/skills/` is the single source of truth. The `.claude/skills/` mirror is regenerated automatically by the Husky `pre-commit` hook on every commit; to refresh it manually, run:

```bash
pnpm sync:skills
```

## Install Into a Project

Download and extract the latest release into your repository root:

**macOS / Linux:**

```bash
curl -L "https://github.com/PVPha/agent_skills/releases/latest/download/agent_setup.zip" -o agent_setup.zip && unzip -o agent_setup.zip && rm agent_setup.zip
```

**Windows (PowerShell):**

```powershell
Invoke-WebRequest "https://github.com/PVPha/agent_skills/releases/latest/download/agent_setup.zip" -OutFile agent_setup.zip; Expand-Archive agent_setup.zip -Force -DestinationPath .; Remove-Item agent_setup.zip
```

The zip contains:

- `AGENTS.md` — mandatory skill gate, planning gate, commit gate, and skill selection table
- `CLAUDE.md` — Claude Code entry point importing `AGENTS.md`
- `.agents/skills/` — the 10 skills (see the [skills overview](.agents/skills/README.md))
- `.claude/skills/` — mirror of the skills for Claude Code
- `docs/mvp-plan.md`, `docs/rememberDocs/` — durable planning and task-note templates
- `tasks/todo.md`, `tasks/lessons.md` — clean session board and lessons templates

## Skills Overview

See [.agents/skills/README.md](.agents/skills/README.md) for the full skill table, quick reference, and the recommended delivery workflow.

## Development (this repo)

- `pnpm install` — installs commitlint + husky (commit messages are enforced: gitmoji + conventional format, see [docs/commitlint-setup.md](docs/commitlint-setup.md))
- `pnpm sync:skills` — regenerate the `.claude/skills/` mirror after editing skills
- Releases: push a `v*` tag; GitHub Actions builds and uploads `agent_setup.zip`
