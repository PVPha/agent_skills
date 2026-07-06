## Session Goal
Remove redundancy from the agent setup and fix the commit-gate amend bug.

## Active Task
<none>

## Done Criteria
- [x] Commit gate no longer amends to inject a stale SHA
- [x] Task closure sequence stated in exactly one place (task-management)
- [x] clean-code + naming-conventions merged into coding-standards
- [x] remember-doc skill folded into task-management
- [x] Skill gate retry clause removed; gate scoped to task-shaped requests
- [x] Pre-commit hook auto-syncs `.claude/skills/` mirror
- [x] RememberDoc created and path recorded

## Queue
1. <none>

## Parking Lot
- Consider adding CI commit-message validation if the release workflow expands.
- CI check that `.claude/skills/` matches `.agents/skills/`.
- Claude Code hook to mechanically validate SKILL_GATE/COMMIT_GATE output lines.

## New Task Registration
Task: Dedupe skills and fix commit gate
Outcome: Setup loads ~half the instruction text per task, commit gate records real SHAs, mirror cannot drift.
Constraints: Preserve rememberDoc artifact terminology and gate output contracts; do not rewrite historical rememberDocs.
Verification: pnpm sync:skills runs clean; grep shows no stale references to removed skills or the amend flow.

## Story-to-Task Mapping
- Setup-efficiency review -> Dedupe skills and fix commit gate

## Progress Log
[09:10] Task: Dedupe skills and fix commit gate
Status: Start
Note: User approved fixing all six findings from the setup review.
Next: Rewrite AGENTS.md gates, merge quality skills, dedupe closure rules, add pre-commit sync.

[09:25] Task: Dedupe skills and fix commit gate
Status: Done
Note: 13 skills -> 10, closure sequence canonical in task-management, amend flow removed, mirror auto-syncs on commit.
Next: Commit task closure.
RememberDoc: docs/rememberDocs/2026-07-06-dedupe-skills-and-fix-commit-gate.md

[10:40] Task: Enforce gitmoji in task closure commits
Status: Done
Note: Closure commit template now includes <emoji>; AGENTS.md co-loads commit-messages with task-management and gates on gitmoji.
Next: Cut a new release tag so the fixed zip ships to new projects.
RememberDoc: docs/rememberDocs/2026-07-06-enforce-gitmoji-in-task-closure.md
