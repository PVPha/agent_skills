## Session Goal
Update rememberDoc guidance so file-change entries stay portable across devices.

## Active Task
Require repository-relative paths in rememberDoc Files Changed entries.

## Done Criteria
- [x] rememberDoc skill tells agents to use repository-relative file paths
- [x] rememberDoc template reflects repository-relative path placeholders
- [x] Verification completed
- [x] RememberDoc created and path recorded

## Queue
1. <none>

## Parking Lot
- Consider adding CI commit-message validation if the release workflow expands.

## New Task Registration
Task: Require relative paths in rememberDocs
Outcome: Future rememberDocs list changed files with portable repository-relative paths instead of device-specific absolute paths.
Constraints: Keep the skill concise and preserve the existing rememberDoc structure.
Verification: Review the diff and run the nearest available project check.

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

[09:34] Task: Require relative paths in rememberDocs
Status: Start
Note: User reported rememberDocs showing absolute file URLs with local device paths.
Next: Update rememberDoc skill and template, then verify the diff.

[09:35] Task: Require relative paths in rememberDocs
Status: Done
Note: Updated rememberDoc instructions and template to require repository-relative Files Changed paths.
Next: Commit task closure.
RememberDoc: docs/rememberDocs/2026-06-01-relative-paths-in-rememberdocs.md
