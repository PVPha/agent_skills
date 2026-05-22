# Commitlint Setup Guide

This project uses Commitlint and Husky to enforce the commit-message skill format:

```text
<emoji> <type>(<scope>): <subject>
```

Example:

```text
✨ feat(auth): add OAuth2 login with Google
```

## Prerequisites

- Node.js installed
- pnpm installed

Use pnpm for all JavaScript setup commands in this repository.

## Install Dependencies

From the repository root:

```bash
pnpm install
```

This installs Commitlint and Husky from `package.json`. The `prepare` script runs Husky so Git can use the local hooks.

## Files Involved

- `package.json`: defines Commitlint scripts and dev dependencies.
- `commitlint.config.cjs`: defines the gitmoji + conventional commit rules.
- `.husky/commit-msg`: runs Commitlint when `git commit` is created.
- `pnpm-lock.yaml`: locks the dependency versions.

## Commit Message Format

Use this structure:

```text
<emoji> <type>(<scope>): <subject>

[optional body]

[optional footer]
```

Rules enforced by Commitlint:

- Start with a supported gitmoji.
- Use a supported conventional type.
- Keep scope lowercase when present.
- Write a non-empty subject.
- Start the subject in lowercase.
- Do not end the subject with a period.
- Keep the header at 72 characters or less.

Supported types:

```text
feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
```

## Examples

Valid:

```text
✨ feat(auth): add OAuth2 login with Google
🐛 fix(cart): resolve quantity calculation error
📝 docs: update commitlint setup guide
🔧 chore(commitlint): enforce gitmoji commit messages
```

Invalid:

```text
feat(auth): add OAuth2 login with Google
✨ feat(auth): Add OAuth2 login with Google
✨ feat(Auth): add OAuth2 login with Google
✨ feat(auth): add OAuth2 login with Google.
```

## Manual Verification

Check a valid message:

```bash
printf '%s\n' '✨ feat(auth): add OAuth2 login with Google' | pnpm exec commitlint --verbose
```

Check an invalid message:

```bash
printf '%s\n' 'feat(auth): add OAuth2 login with Google' | pnpm exec commitlint --verbose
```

Check the latest commit:

```bash
pnpm commitlint
```

Check a commit message file:

```bash
pnpm commitlint:edit .git/COMMIT_EDITMSG
```

## Normal Commit Flow

After staging files:

```bash
git commit -m "🔧 chore(commitlint): enforce gitmoji commit messages"
```

Husky runs `.husky/commit-msg`, which calls:

```bash
pnpm exec commitlint --edit "$1"
```

If the message fails, Git stops the commit and prints the Commitlint errors. Update the message and try again.
