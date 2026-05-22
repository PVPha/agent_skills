# RememberDoc: Create commitlint setup guide

## Summary
Added a setup guide for installing and using the Commitlint/Husky configuration.
The guide documents the required gitmoji conventional commit format, examples, and manual verification commands.

## Why
Contributors needed a durable setup reference instead of relying on chat history for commitlint usage.

## Files Changed
- docs/commitlint-setup.md: added setup, format, examples, verification commands, and normal commit flow.
- tasks/todo.md: recorded the documentation task and completion status.

## Verification
- Tests: `printf '%s\n' '📝 docs(commitlint): add setup guide' | pnpm exec commitlint --verbose` passed.
- Tests: `printf '%s\n' 'docs(commitlint): add setup guide' | pnpm exec commitlint --verbose` failed as expected.
- Manual checks: reviewed the guide against `package.json`, `.husky/commit-msg`, and `commitlint.config.cjs`.

## Commit
- Hash: `6cc9c94d1e0ceedbdbe7993ae5294ac8d9f2b139`

## Decisions
- Created `docs/commitlint-setup.md` as a dedicated operational guide so setup instructions are easy to find.
- Used pnpm-only commands to match the repository tooling rule.

## Follow-ups
- [ ] Link this guide from a root README if a root README is added later.

## Risks / Notes
- The latest-commit check depends on the latest commit message already following the gitmoji format.
