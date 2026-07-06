# RememberDoc: Dedupe skills and fix commit gate

## Summary
Merged `clean-code` and `naming-conventions` into `coding-standards`, folded the `remember-doc` skill into `task-management` (now the single canonical owner of the Task Closure Sequence and rememberDoc rules), removed the commit-amend hash flow, simplified the skill gate, and added a Husky pre-commit hook that auto-regenerates the `.claude/skills/` mirror. Skill count went from 13 to 10.

## Why
The setup loaded ~40% duplicate instruction text per task (closure rules stated in four places, three overlapping quality skills always co-loaded), the amend flow recorded a commit SHA that stopped existing the moment the commit was amended, the skill-gate retry clause was unenforceable, and the mirror sync was manual and could drift.

## Files Changed
- AGENTS.md: simplified skill gate (scoped to task-shaped requests, removed retry clause), rewrote Commit Gate to a single no-amend commit with the hash only in the gate line, updated selection table / co-loading rules / examples for the merged skills
- .agents/skills/coding-standards/SKILL.md: rewritten as the merged quality skill (structure + clean-code rules + naming conventions + formatting + control flow)
- .agents/skills/task-management/SKILL.md: rewritten as the canonical owner of the Task Closure Sequence and RememberDoc Rules; commit flow updated to rememberDoc-first, single commit, no amend
- .agents/skills/workflow-orchestration/SKILL.md: replaced restated closure rules with references to task-management
- .agents/skills/clean-code/, .agents/skills/naming-conventions/, .agents/skills/remember-doc/: deleted (content absorbed)
- .agents/skills/README.md: updated skill table and recommended workflow (no amend step)
- README.md: skill count 13 → 10, documented auto-sync via pre-commit hook
- docs/rememberDocs/_template.md: removed the `## Commit` hash section (was always stale after amend)
- .husky/pre-commit: new hook running `pnpm sync:skills` + `git add .claude/skills`
- .claude/skills/: regenerated mirror
- tasks/todo.md: session board updated for this task

## Verification
- Tests: none defined for this repo (`pnpm test` not configured); nearest check is the sync script — `pnpm sync:skills` ran clean and the mirror lists exactly the 10 remaining skills
- Manual checks: grepped for stale references to `clean-code`, `naming-conventions`, `remember-doc/SKILL`, and the amend flow across AGENTS.md, CLAUDE.md, READMEs, skills, and templates — only intentional mentions remain (historical rememberDocs left untouched as records)

## Decisions
- Commit hash now lives only in the `COMMIT_GATE` line and git history, not inside the rememberDoc, because amending to inject the hash always produced a stale SHA.
- Kept the `SKILL_GATE` first-line contract but dropped the "treat run as invalid and retry" clause — the agent that forgot the line cannot be the one enforcing it.
- Kept `docs/rememberDocs/_template.md` as the template source instead of moving it to `templates/`, since existing docs and paths already point there.

## Follow-ups
- [ ] Optionally add a CI check that fails when `.claude/skills/` differs from `.agents/skills/` (belt-and-suspenders over the pre-commit hook)
- [ ] Consider a Claude Code hook to mechanically validate the `SKILL_GATE`/`COMMIT_GATE` output lines

## Risks / Notes
- Historical rememberDocs still reference the old skill names and amend flow; they are records of past work and were intentionally not rewritten.
- Any external material that deep-links to the deleted skill folders (e.g., old release zips) will 404 until the next release is cut.
