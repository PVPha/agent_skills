# RememberDoc: Configure commitlint for gitmoji conventional commits

## Summary
Added commitlint setup for the project-local commit-message skill.
Commit headers now require a supported gitmoji, conventional commit type, optional lowercase scope, and imperative subject.
Added a Husky commit-msg hook so local commits are checked automatically.

## Why
The project needed an executable guardrail for the documented gitmoji + conventional commit format.

## Files Changed
- package.json: added pnpm scripts and commitlint/Husky dev dependencies.
- pnpm-lock.yaml: locked commitlint and Husky dependency versions.
- commitlint.config.cjs: configured parsing and rules for skill-aligned commit messages.
- .husky/commit-msg: runs commitlint against commit message files.
- .gitignore: excludes generated dependency and Husky runtime folders.
- tasks/todo.md: recorded active task status and closure.

## Verification
- Tests: `printf '%s\n' '✨ feat(auth): add OAuth2 login with Google' | pnpm exec commitlint --verbose` passed.
- Tests: `printf '%s\n' '✨ feat(auth): Add OAuth2 login with Google' | pnpm exec commitlint --verbose` failed as expected.
- Tests: `printf '%s\n' 'feat(auth): add OAuth2 login with Google' | pnpm exec commitlint --verbose` failed as expected.
- Manual checks: `.husky/commit-msg /private/tmp/agent-skills-valid-commit-msg` passed and `.husky/commit-msg /private/tmp/agent-skills-invalid-commit-msg` failed as expected.

## Commit
- Hash: `28df174465ce4159830c066b3b7a59292002fccc`

## Decisions
- Made gitmoji mandatory because the local commit-message skill lists gitmoji + conventional commits as the default behavior.
- Allowed proper nouns inside subjects so examples like `OAuth2` and `Google` remain valid while uppercase-starting subjects fail.

## Follow-ups
- [ ] Consider adding CI commit-message validation if pull requests are introduced.

## Risks / Notes
- Missing gitmoji currently reports as empty type/subject because the header parser does not match plain conventional headers.
