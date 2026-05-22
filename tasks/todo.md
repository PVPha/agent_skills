## Session Goal
Document how to set up and use the commitlint configuration.

## Active Task
Create a commitlint setup guide.

## Done Criteria
- [x] Setup guide explains install and hook activation
- [x] Guide documents valid commit message format and examples
- [x] Guide includes verification commands
- [x] RememberDoc created and path recorded

## Queue
1. <none>

## Parking Lot
- Consider adding CI commit-message validation if the release workflow expands.

## New Task Registration
Task: Create commitlint setup guide
Outcome: Contributors can install, verify, and use commitlint consistently.
Constraints: Use pnpm commands and align examples with the commit-message skill.
Verification: Read the guide against package scripts and commitlint config.

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

[09:34] Task: Create commitlint setup guide
Status: Start
Note: User requested setup documentation for commitlint.
Next: Add docs/commitlint-setup.md.

[09:38] Task: Create commitlint setup guide
Status: Done
Note: Added setup guide and verified example messages against Commitlint.
Next: Commit task closure.
RememberDoc: docs/rememberDocs/2026-05-22-commitlint-setup-guide.md
