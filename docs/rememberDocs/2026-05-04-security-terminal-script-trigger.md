# RememberDoc: Add security trigger for terminal scripts

## Summary
Updated the security skill and selection guide so agents load `security` before running terminal scripts or other security-sensitive commands.
Added a script-review checklist for installs, network access, secrets, file changes, permission changes, migrations, and destructive operations.

## Why
Terminal scripts can install dependencies, execute downloaded code, mutate files, use credentials, or touch services, so security review should happen before execution.

## Files Changed
- AGENTS.md: expanded the security trigger row and added a setup-script example
- .agent/skills/security/SKILL.md: expanded metadata and added mandatory trigger points plus pre-command checks
- .agent/skills/README.md: updated the security summary and quick reference
- docs/rememberDocs/2026-05-04-security-terminal-script-trigger.md: recorded the task outcome and verification

## Verification
- Tests: not run; this repository has no package.json, Makefile, or root README test command
- Manual checks: `git diff --check` passed; reviewed the markdown diff

## Commit
- Hash: `<filled in after git commit --amend>`

## Decisions
- Put the trigger in both `AGENTS.md` and the skill metadata/body so selection works from the top-level gate and the skill remains self-describing.
- Treated script execution as security-sensitive when it can install code, use secrets, touch networks/services, mutate files, change permissions, or perform destructive operations.

## Follow-ups
- [ ] Consider adding a dedicated terminal-command safety checklist skill if command execution policy grows beyond security concerns.

## Risks / Notes
- Existing uncommitted changes from the prior pnpm security update and task-board work are still present in the worktree.
