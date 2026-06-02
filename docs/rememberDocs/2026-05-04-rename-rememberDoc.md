# RememberDoc: Rename rememberDoc spelling

## Summary
Renamed the project workflow term to `remember-doc` across project documentation, skill files, task tracking, and matching paths.

## Why
The old term was misspelled and appeared in both content and filenames, making the workflow terminology inconsistent with the requested spelling.

## Files Changed
- `AGENTS.md`: updated skill gate, commit gate, examples, and co-loading rules to use `remember-doc`
- `.agents/skills/remember-doc/SKILL.md`: renamed the skill path and updated the skill metadata/content
- `.agents/skills/task-management/SKILL.md`: updated task closure instructions and paths
- `.agents/skills/workflow-orchestration/SKILL.md`: updated transition gate wording
- `.agents/skills/README.md`: updated skill table and workflow links
- `docs/rememberDocs/`: renamed the notes directory and updated historical note content
- `tasks/todo.md`: updated completion checklist and rememberDoc path placeholder
- `tasks/lessons.md`: updated workflow lesson wording

## Verification
- Tests: not run; this is a documentation and path rename with no project test command present
- Manual checks: ran `rg --hidden` scans for old spelling in contents and filenames, excluding `.git`

## Commit
- Hash: `<filled in after git commit --amend>`

## Decisions
- Left `.git` history logs unchanged because they are repository metadata, not project source files.

## Follow-ups
- [ ] None

## Risks / Notes
- Any external tooling that hardcodes the former skill or notes paths must be updated to the new paths.
