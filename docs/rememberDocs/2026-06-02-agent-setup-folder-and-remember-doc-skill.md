# RememberDoc: Agent setup folder and remember-doc skill

## Summary
Renamed the repo-local agent setup directory from the old singular folder to `.agents/skills/`.
Renamed the loadable rememberDoc skill to `remember-doc` so the skill directory and frontmatter use kebab-case.

## Why
The agent setup path needed to match the expected `.agents` folder name, and the camelCase rememberDoc skill name could trigger setup warnings.

## Files Changed
- AGENTS.md: updated the mandatory skill gate and skill-selection table to use `.agents/skills/` and `remember-doc`.
- .agents/skills/remember-doc/SKILL.md: renamed the skill folder and changed the frontmatter name to `remember-doc`.
- .agents/skills/README.md: updated the RememberDoc skill links to the new folder.
- .agents/skills/task-management/SKILL.md: updated task-closure references to `skills/remember-doc/SKILL.md`.
- docs/rememberDocs/*.md: updated old singular setup path references to `.agents/skills`.
- tasks/todo.md: recorded this active task and closure state.

## Verification
- Tests: `pnpm commitlint` passed with 0 problems and 0 warnings.
- Manual checks: stale singular setup paths and old camelCase skill identifiers were searched for and returned no matches.

## Commit
- Hash: `c171568`

## Decisions
- Kept rememberDoc as the artifact/output-field term where the workflow talks about task notes, but changed the loadable skill identifier to `remember-doc`.

## Follow-ups
- [ ] Add a dedicated skill metadata validation script if future setup warnings need automated coverage.

## Risks / Notes
- Historical rememberDocs still use their original filenames even when their content now points at current setup paths.
