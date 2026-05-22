## Session Goal
Set up commitlint to enforce the project commit-message skill format.

## Active Task
Configure commitlint for gitmoji conventional commits.

## Done Criteria
- [x] Commitlint configuration added
- [x] Package scripts and hook setup added
- [x] Valid and invalid commit messages verified
- [x] RememberDoc created and path recorded

## Queue
1. <none>

## Parking Lot
- Consider adding CI commit-message validation if the release workflow expands.

## New Task Registration
Task: Configure commitlint for gitmoji conventional commits
Outcome: Commit messages can be checked against the local commit-message skill.
Constraints: Use pnpm for JavaScript tooling and keep setup repo-local.
Verification: Run commitlint against valid and invalid sample messages.

## Story-to-Task Mapping
- Story 1 -> T1, T2, T3
- Story 2 -> T4, T5

## Progress Log
[09:17] Task: Configure commitlint for gitmoji conventional commits
Status: Start
Note: No existing package.json or commitlint setup found.
Next: Add commitlint config, package scripts, and commit hook.

[09:29] Task: Configure commitlint for gitmoji conventional commits
Status: Done
Note: Commitlint config, pnpm scripts, Husky hook, and ignore rules added.
Next: Commit task closure.
RememberDoc: docs/rememberDocs/2026-05-22-commitlint-gitmoji-setup.md
