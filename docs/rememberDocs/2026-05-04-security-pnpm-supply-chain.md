# RememberDoc: Update security skill for pnpm supply-chain hygiene

## Summary
Updated the security skill's dependency hygiene guidance to prefer pnpm for JavaScript and TypeScript projects.
Added pnpm-specific controls for lockfile enforcement, isolated installs, supply-chain configuration, and audit checks.

## Why
The security skill needed explicit package-manager guidance to reduce supply-chain risk from dependency installation and update workflows.

## Files Changed
- .agents/skills/security/SKILL.md: added pnpm-focused dependency and supply-chain hygiene guidance
- docs/rememberDocs/2026-05-04-security-pnpm-supply-chain.md: recorded the task outcome and verification

## Verification
- Tests: not run; this repository has no package.json, Makefile, or root README test command
- Manual checks: `git diff --check` passed; reviewed the updated security skill section

## Commit
- Hash: `<filled in after git commit --amend>`

## Decisions
- Kept the update scoped to dependency hygiene rather than changing unrelated security guidance.
- Used pnpm's lockfile, frozen installs, isolated layout, audit, and build-approval controls as the concrete workflow guidance.

## Follow-ups
- [ ] Add an automated docs lint/check command if this skill repository grows executable validation.

## Risks / Notes
- Existing `tasks/todo.md` had unrelated uncommitted task-board changes before this work started.
