# Remmerdoc: Todo remmerdoc gate

## Summary
Updated the repo-local workflow skills and `tasks/todo.md` so an agent cannot move to the next task until it creates a remmerdoc and records that remmerdoc path in the task board.

## Why
The task board template did not expose remmerdoc as a visible completion gate, so an agent could finish work, advance the queue, and forget the handoff note.

## Files Changed
- .agent/skills/task-management/SKILL.md: added remmerdoc-path recording to done criteria and task closure sequence
- .agent/skills/remmerdoc/SKILL.md: required recording the remmerdoc path in `tasks/todo.md`
- .agent/skills/workflow-orchestration/SKILL.md: added remmerdoc-path recording to the transition gate
- tasks/todo.md: added a remmerdoc checkpoint and progress-log field
- tasks/lessons.md: captured the workflow correction

## Verification
- Tests: not applicable; documentation and template changes only
- Manual checks: reviewed the diff to confirm all task-transition rules now require a remmerdoc path in `tasks/todo.md`

## Decisions
- Enforced the rule in both the skills and the task board so the visible workflow state matches the documented workflow policy.

## Follow-ups
- [ ] If needed, add an example filled-in `tasks/todo.md` entry showing a completed task with its remmerdoc path.

## Risks / Notes
- Agents that ignore repo-local skills entirely can still bypass the intended flow, but the project instructions and templates now make the requirement explicit.
