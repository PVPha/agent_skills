# Remmerdoc: Agent setup improvements

## Summary
Addressed six gaps identified in the agent setup feedback: skill-matching guidance, co-loading rules, live task board, filled MVP plan, dev-environment skill, and README updates to reflect all changes.

## Why
The setup had a strong gate mechanism and workflow enforcement, but agents starting cold had no skill-selection guidance, no project context in the task board or MVP plan, and no way to discover project test/lint commands.

## Files Changed
- `AGENTS.md`: added skill selection table, co-loading rules, quick examples, and environment/tooling section
- `tasks/todo.md`: replaced blank template with initialized live session board
- `docs/mvp-plan.md`: replaced blank template with filled plan for the agent_skills project
- `.agent/skills/dev-environment/SKILL.md`: new skill for discovering test/lint/build commands
- `.agent/skills/README.md`: added `dev-environment` to skills table, added co-loading rules section, added step 0 to recommended workflow

## Verification
- Tests: not applicable; documentation and configuration changes only
- Manual checks: reviewed all changed files for internal consistency; confirmed cross-references between AGENTS.md, README, and new skill are correct

## Decisions
- Kept `dev-environment` as a skill file (not just a section in AGENTS.md) so it can be selected independently and stays consistent with how all other skills are structured
- Filled `docs/mvp-plan.md` with the agent_skills project itself as the subject, since that is the actual product being built
- Initialized `tasks/todo.md` with a real queue entry pointing at filling in project-specific tooling commands, keeping it actionable rather than blank

## Follow-ups
- [ ] Replace default commands in AGENTS.md environment table with actual project-specific commands once confirmed
- [ ] Add `dev-environment` to the AGENTS.md skill selection guide trigger table (already done)
- [ ] Consider a `changelog` or `HISTORY.md` to track skill version changes over time

## Risks / Notes
- The MVP plan is filled with the agent_skills project as a placeholder; if this repo is used as a template, `docs/mvp-plan.md` should be replaced with the actual product's plan
