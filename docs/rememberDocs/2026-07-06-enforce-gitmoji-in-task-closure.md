# RememberDoc: Enforce gitmoji in task closure commits

## Summary
Fixed the setup so automatic commits made during the task closure sequence use gitmoji. The closure commit template in task-management now includes the emoji placeholder, and AGENTS.md co-loads commit-messages whenever task-management is active.

## Why
Testing the setup in a fresh project showed the agent committing without gitmoji. Root cause: the copy-pasteable commit template in task-management's closure sequence had no `<emoji>` placeholder, and nothing forced commit-messages to load at task closure — the "Writing commits" table row only fires on explicit user requests.

## Files Changed
- .agents/skills/task-management/SKILL.md: added `<emoji>` to the closure commit template and a "message MUST start with a gitmoji" commit rule
- AGENTS.md: "Finishing a task" row now loads `task-management, commit-messages`; added co-loading rule task-management → commit-messages; Commit Gate Contract now states the message must start with a gitmoji
- .claude/skills/task-management/SKILL.md: regenerated mirror via `pnpm sync:skills`

## Verification
- Tests: none applicable (markdown-only repo)
- Manual checks: `pnpm sync:skills` ran clean; `git diff --stat` confirms source and mirror match; commitlint/husky validates this task's own commit message

## Decisions
- Put the gitmoji rule inline in task-management's commit rules instead of only pointing to commit-messages — a concrete template beats a cross-reference, which is exactly how the bug happened.
- Did not add husky/commitlint to the release zip; enforcement in consumer projects stays instruction-based to keep the zip dependency-free.

## Follow-ups
- [ ] Cut a new `v*` release tag so `agent_setup.zip` ships the fix to new projects
- [ ] Re-test in a fresh project after the new release

## Risks / Notes
- Projects that installed the old zip keep the buggy template until they re-download the release.
