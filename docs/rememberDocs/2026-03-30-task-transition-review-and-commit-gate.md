# RememberDoc: Task transition review and commit gate

## Summary
Updated the workflow skills so task completion and "move to next task" transitions require self-review, verification, rememberDoc creation, and commit before advancing.

## Why
The existing workflow required commit-before-next-task, but it did not explicitly enforce a self-review gate or define the exact closure sequence when the user asks to move on.

## Files Changed
- skills/task-management/SKILL.md: added task closure sequence and explicit next-task transition rules
- skills/workflow-orchestration/SKILL.md: added transition gate requirements to orchestration verification
- skills/code-review/SKILL.md: added self-review expectations for task closure

## Verification
- Tests: not applicable; documentation-only changes
- Manual checks: reviewed the git diff for consistency and fixed a misplaced checklist item in `skills/code-review/SKILL.md`

## Decisions
- Applied the rule at the workflow level instead of only one skill so task execution, orchestration, and review stay aligned.

## Follow-ups
- [ ] Add a repo-local `.agent/skills/` directory or update `AGENTS.md` so the mandatory skill gate points at a real path.

## Risks / Notes
- The repo-level `AGENTS.md` currently references `.agent/skills/`, but this workspace only contains `skills/`.
