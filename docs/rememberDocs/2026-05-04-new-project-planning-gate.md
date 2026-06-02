# RememberDoc: New project planning gate

## Summary
Added a blocking planning-to-implementation gate so new-project work must update durable planning files before codebase creation starts.
The gate now appears in the root instructions, MVP planning skill, workflow orchestration skill, task management skill, skills README, MVP plan template, task board, and lessons.

## Why
The setup allowed an `implementation_plan.md` or chat-only plan to become the effective source of truth. When the user approved the plan with "proceed", the agent could jump straight into implementation without first filling `docs/mvp-plan.md` and `tasks/todo.md`.

## Files Changed
- `AGENTS.md`: added the blocking New Project Planning Gate.
- `.agents/skills/mvp-planning/SKILL.md`: required durable planning artifacts before implementation approval.
- `.agents/skills/workflow-orchestration/SKILL.md`: made "proceed" a planning-to-implementation stage gate.
- `.agents/skills/task-management/SKILL.md`: required initializing `tasks/todo.md` before implementation starts.
- `.agents/skills/README.md`: updated the recommended workflow order.
- `docs/mvp-plan.md`: added a usage gate warning that placeholders must be replaced before implementation.
- `tasks/lessons.md`: recorded the correction pattern.
- `tasks/todo.md`: recorded the active task, verification expectations, and rememberDoc path.

## Verification
- Tests: no project test command exists; no `package.json`, `Makefile`, or root `README.md` is present.
- Manual checks: `git diff --check` passed.
- Manual checks: `rg` confirmed the new gate text appears in the root setup, planning skill, workflow skill, task skill, MVP template, task board, and lessons.

## Commit
- Hash: `<filled in after git commit --amend>`

## Decisions
- Made `docs/mvp-plan.md` and `tasks/todo.md` the explicit durable source of truth instead of adding another planning artifact.
- Kept `implementation_plan.md` as an optional review artifact so existing plan-review flows can still work.

## Follow-ups
- [ ] Add an automated setup linter if the repository later gains an executable test harness.

## Risks / Notes
- Existing released setup archives are not updated by this local repository change until a new release artifact is published.
