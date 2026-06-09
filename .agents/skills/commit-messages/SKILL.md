---
name: commit-messages
description: Write clear conventional commit messages with gitmoji. Use when creating commits or enforcing commit format consistency.
---

# Commit Message Skill

> [!CAUTION]
> **Every commit message MUST start with a gitmoji emoji. No exceptions.**
> Missing emoji = invalid commit. Stop and fix before proceeding.

## Format

```
<emoji> <type>(<scope>): <subject>

[optional body]

[optional footer]
```

## Pre-Commit Checklist (verify before EVERY `git commit`)

1. Message starts with a gitmoji emoji
2. Emoji is followed by a space, then the type
3. Type is from the table below
4. Subject: imperative mood, lowercase, no period, ≤50 chars

If ANY check fails → rewrite before committing.

## Type → Emoji Reference

| Emoji | Type       | When to use                              |
| ----- | ---------- | ---------------------------------------- |
| ✨    | `feat`     | New feature                              |
| 🐛    | `fix`      | Bug fix                                  |
| 📝    | `docs`     | Documentation only                       |
| 💄    | `style`    | Formatting, no logic                     |
| ♻️    | `refactor` | Restructure, no new feat                 |
| ⚡️    | `perf`     | Performance improvement                  |
| ✅    | `test`     | Add/update tests                         |
| 🏗️    | `build`    | Build system/deps                        |
| 👷    | `ci`       | CI/CD config                             |
| 🔧    | `chore`    | Maintenance, config                      |
| ⏪️    | `revert`   | Revert previous commit                   |
| 🔥    | `chore`    | Remove code/files                        |
| 🔒️    | `fix`      | Security fix                             |
| ⬆️    | `build`    | Upgrade dependency                       |
| ⬇️    | `build`    | Downgrade dependency                     |
| ➕    | `build`    | Add dependency                           |
| ➖    | `build`    | Remove dependency                        |
| 🗃️    | `feat`     | Database changes                         |
| 🌐    | `feat`     | Internationalization                     |
| ♿️    | `feat`     | Accessibility                            |
| 🚧    | `wip`      | Work in progress (feature branches only) |

## Subject Line Rules

```
✅ ✨ feat(cart): add quantity validation
✅ 🐛 fix: prevent duplicate form submissions
✅ ♻️ refactor(api): simplify error handling

❌ feat(cart): Added validation.       ← past tense, period, no emoji
❌ fix stuff                           ← vague, no type, no emoji
❌ Updated readme                      ← no type, past tense, no emoji
```

## Scope

Short, consistent name for the affected area:

- Module: `auth`, `cart`, `api`, `payments`
- Layer: `ui`, `db`, `service`
- Nested: `api/users`

Scope is optional but encouraged.

## Body (when needed)

Include a body for: complex changes, reasoning (why not what), breaking changes.

- Blank line after subject
- Wrap at 72 chars
- Bullet points for lists
- Explain what and why — code shows how

## Footer

```
Fixes #123              ← closes issue on merge
Refs #123               ← reference without closing
BREAKING CHANGE: <desc> ← breaking change notice

Co-authored-by: Name <email>
```

## Breaking Changes

```
✨ feat(api)!: change auth header format

BREAKING CHANGE: Authorization header now requires 'Bearer ' prefix.
Old: Authorization: <token>
New: Authorization: Bearer <token>
```

## Atomic Commits

One logical change per commit. Never bundle unrelated changes.

```
✅ git commit -m "✨ feat(ui): add loading spinner"
✅ git commit -m "✨ feat(api): add data fetching service"

❌ git commit -m "add spinner, fix typos, update deps"
```

## Multi-line Commit Command

```bash
git commit -m "✨ feat(auth): add OAuth support" \
           -m "Implement Google OAuth2 flow with refresh tokens." \
           -m "Closes #234"
```
