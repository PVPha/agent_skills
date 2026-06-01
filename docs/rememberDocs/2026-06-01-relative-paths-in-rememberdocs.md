# RememberDoc: Require relative paths in rememberDocs

## Summary
Updated the rememberDoc skill and template so `Files Changed` entries use repository-relative paths. This prevents generated task notes from embedding `file://` URLs or local device paths.

## Why
Absolute paths make rememberDocs less portable across machines and can expose local workspace details.

## Files Changed
- .agent/skills/rememberDoc/SKILL.md: added explicit guidance to use repository-relative paths and avoid absolute, `file://`, home, workspace-root, or device-specific paths
- docs/rememberDocs/_template.md: changed file placeholders to `<repo-relative path>`
- tasks/todo.md: recorded the active task, completion status, and rememberDoc path

## Verification
- Tests: not run; this documentation-only repo has no test script
- Manual checks: reviewed `git diff` and ran `git diff --check`

## Commit
- Hash: `dabbf6faa8f0ae77ec2a005e8d60a422374c2b0a`

## Decisions
- Kept the allowance for absolute paths only when documenting dependencies outside the repository, with an explanation requirement.

## Follow-ups
- [ ] None

## Risks / Notes
- Existing older rememberDocs may still contain absolute paths until cleaned up separately.
