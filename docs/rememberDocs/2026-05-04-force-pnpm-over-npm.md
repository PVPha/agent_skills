# RememberDoc: Force pnpm over npm in setup guidance

## Summary
Updated agent and skill documentation so JavaScript/TypeScript setup, install, update, and package-script commands use pnpm.
Changed remaining npm command examples to pnpm equivalents and added security guidance to translate npm/yarn setup instructions or stop if they cannot be translated safely.

## Why
The workflow should consistently avoid npm/yarn in setup paths and enforce pnpm as the safer default package manager.

## Files Changed
- AGENTS.md: changed default JS commands to pnpm and added a package-manager enforcement rule
- .agent/skills/security/SKILL.md: made pnpm mandatory for JS/TS setup, installs, updates, and package scripts
- .agent/skills/documentation/SKILL.md: changed README setup and run examples from npm to pnpm
- .agent/skills/commit-messages/SKILL.md: changed the gitmoji global install example to pnpm
- docs/rememberDocs/2026-05-04-force-pnpm-over-npm.md: recorded the task outcome and verification

## Verification
- Tests: not run; this repository has no package.json, Makefile, or root README test command
- Manual checks: searched for remaining npm/yarn command examples; `git diff --check` passed

## Commit
- Hash: `<filled in after git commit --amend>`

## Decisions
- Kept npm/yarn mentions only where the text explicitly says to translate them to pnpm or stop if that cannot be done safely.
- Used pnpm shorthand commands for common package scripts and `pnpm install --frozen-lockfile` for CI install enforcement.

## Follow-ups
- [ ] Add an automated markdown policy check if package-manager drift becomes recurring.

## Risks / Notes
- Existing uncommitted task-board changes and previous security rememberDocs were already present in the worktree.
