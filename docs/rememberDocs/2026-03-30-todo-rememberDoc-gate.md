# RememberDoc: Todo rememberDoc gate

## Summary
Updated the repo-local workflow skills and `tasks/todo.md` so an agent cannot move to the next task until it creates a rememberDoc and records that rememberDoc path in the task board.

## Why
The task board template did not expose rememberDoc as a visible completion gate, so an agent could finish work, advance the queue, and forget the handoff note.

## Files Changed
- .agents/skills/task-management/SKILL.md: added rememberDoc-path recording to done criteria and task closure sequence
- .agents/skills/remember-doc/SKILL.md: required recording the rememberDoc path in `tasks/todo.md`
- .agents/skills/workflow-orchestration/SKILL.md: added rememberDoc-path recording to the transition gate
- tasks/todo.md: added a rememberDoc checkpoint and progress-log field
- tasks/lessons.md: captured the workflow correction

## Verification
- Tests: not applicable; documentation and template changes only
- Manual checks: reviewed the diff to confirm all task-transition rules now require a rememberDoc path in `tasks/todo.md`

## Decisions
- Enforced the rule in both the skills and the task board so the visible workflow state matches the documented workflow policy.

## Follow-ups
- [ ] If needed, add an example filled-in `tasks/todo.md` entry showing a completed task with its rememberDoc path.

## Risks / Notes
- Agents that ignore repo-local skills entirely can still bypass the intended flow, but the project instructions and templates now make the requirement explicit.
