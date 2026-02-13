# Commit Message Skill

## Overview

Write clear, consistent commit messages that explain what changed and why. Good commit history makes debugging, reviewing, and understanding code evolution easier.

## Commit Message Format

### Structure

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Example

```
feat(auth): add OAuth2 login with Google

Implement Google OAuth2 authentication flow:
- Add OAuth2 strategy configuration
- Create callback handler for token exchange
- Store refresh tokens securely in database
- Add session management for OAuth users

Closes #234
```

## Commit Types

| Type       | Description                 | Example                                 |
| ---------- | --------------------------- | --------------------------------------- |
| `feat`     | New feature                 | `feat: add user profile page`           |
| `fix`      | Bug fix                     | `fix: resolve login timeout issue`      |
| `docs`     | Documentation only          | `docs: update API readme`               |
| `style`    | Formatting, no code change  | `style: fix indentation in auth module` |
| `refactor` | Code change, no feature/fix | `refactor: extract validation logic`    |
| `perf`     | Performance improvement     | `perf: optimize database queries`       |
| `test`     | Adding/updating tests       | `test: add unit tests for user service` |
| `build`    | Build system/dependencies   | `build: upgrade webpack to v5`          |
| `ci`       | CI configuration            | `ci: add GitHub Actions workflow`       |
| `chore`    | Maintenance tasks           | `chore: update .gitignore`              |
| `revert`   | Revert previous commit      | `revert: revert "feat: add feature X"`  |

## Gitmoji

Gitmoji adds visual context to commits using emoji. Use at the start of the subject line.

### Format with Gitmoji

```
<emoji> <type>(<scope>): <subject>
# or without type (emoji replaces type)
<emoji> (<scope>): <subject>
```

### Gitmoji Reference

| Emoji | Code                          | Type     | Description               |
| ----- | ----------------------------- | -------- | ------------------------- |
| ✨    | `:sparkles:`                  | feat     | New feature               |
| 🐛    | `:bug:`                       | fix      | Bug fix                   |
| 🔥    | `:fire:`                      | -        | Remove code/files         |
| 📝    | `:memo:`                      | docs     | Documentation             |
| 💄    | `:lipstick:`                  | style    | UI/style updates          |
| ♻️    | `:recycle:`                   | refactor | Refactor code             |
| ⚡️    | `:zap:`                       | perf     | Performance improvement   |
| ✅    | `:white_check_mark:`          | test     | Add/update tests          |
| 🔧    | `:wrench:`                    | chore    | Configuration files       |
| 🏗️    | `:building_construction:`     | build    | Build system changes      |
| 👷    | `:construction_worker:`       | ci       | CI/CD changes             |
| ⬆️    | `:arrow_up:`                  | build    | Upgrade dependencies      |
| ⬇️    | `:arrow_down:`                | build    | Downgrade dependencies    |
| 🔒️    | `:lock:`                      | fix      | Security fix              |
| 🚀    | `:rocket:`                    | -        | Deploy                    |
| 🎨    | `:art:`                       | refactor | Improve structure/format  |
| 🚧    | `:construction:`              | -        | Work in progress          |
| 💚    | `:green_heart:`               | ci       | Fix CI build              |
| ➕    | `:heavy_plus_sign:`           | build    | Add dependency            |
| ➖    | `:heavy_minus_sign:`          | build    | Remove dependency         |
| 🔀    | `:twisted_rightwards_arrows:` | -        | Merge branches            |
| ⏪️    | `:rewind:`                    | revert   | Revert changes            |
| 🏷️    | `:label:`                     | -        | Add/update types          |
| 🗃️    | `:card_file_box:`             | -        | Database changes          |
| 🌐    | `:globe_with_meridians:`      | -        | Internationalization      |
| 💡    | `:bulb:`                      | docs     | Add comments              |
| 🍱    | `:bento:`                     | -        | Add/update assets         |
| ♿️    | `:wheelchair:`                | -        | Accessibility             |
| 🚸    | `:children_crossing:`         | -        | UX improvements           |
| 📱    | `:iphone:`                    | -        | Responsive design         |
| 🥅    | `:goal_net:`                  | fix      | Catch errors              |
| 🩹    | `:adhesive_bandage:`          | fix      | Simple fix (non-critical) |
| 🧪    | `:test_tube:`                 | test     | Add failing test          |
| 🔊    | `:loud_sound:`                | -        | Add logs                  |
| 🔇    | `:mute:`                      | -        | Remove logs               |

### Gitmoji Examples

```bash
# Feature
✨ feat(auth): add OAuth2 login with Google
✨ (auth): add OAuth2 login with Google

# Bug fix
🐛 fix(cart): resolve quantity calculation error

# Documentation
📝 docs: update API documentation

# Performance
⚡️ perf(db): optimize user query with index

# Security
🔒️ fix(auth): patch XSS vulnerability in comments

# Dependencies
⬆️ build: upgrade react to v19
➕ build: add zod for validation

# Tests
✅ test(user): add unit tests for registration

# Refactor
♻️ refactor(api): simplify error handling middleware
🎨 refactor: improve code formatting

# Remove code
🔥 chore: remove deprecated API endpoints

# Work in progress (feature branches only)
🚧 wip: partial implementation of checkout

# Database
🗃️ feat(db): add migration for user preferences

# Accessibility
♿️ feat(ui): add aria labels to navigation
```

### Gitmoji with Full Commit Message

```
✨ feat(payments): add Stripe payment integration

Implement Stripe payment processing:
- Add Stripe SDK configuration
- Create payment intent handler
- Add webhook for payment confirmation
- Store transaction records

Closes #567
```

```
🐛 fix(auth): resolve session timeout issue

Users were being logged out after 5 minutes due to
incorrect token expiry calculation.

- Fix: Use seconds instead of milliseconds for JWT exp
- Add: Token refresh 1 minute before expiry

Fixes #234
```

### Gitmoji Tools

- **gitmoji-cli**: Interactive CLI for selecting emoji
  ```bash
  npm i -g gitmoji-cli
  gitmoji -c  # Commit with emoji prompt
  ```
- **VS Code Extension**: Gitmoji extension for commit messages
- **Git Hook**: Auto-prompt for gitmoji on commit

## Subject Line Rules

### Do's

- Use imperative mood: "add", "fix", "change" (not "added", "fixing")
- Keep under 50 characters (72 max)
- Start with lowercase (after type prefix)
- No period at the end

```
✅ feat(cart): add quantity validation
✅ fix: prevent duplicate form submissions
✅ refactor(api): simplify error handling
```

### Don'ts

```
❌ feat(cart): Added quantity validation.    # Past tense, period
❌ fix: This commit fixes the login bug      # Too verbose
❌ Updated readme                            # No type, past tense
❌ WIP                                       # Not descriptive
❌ fix stuff                                 # Too vague
```

## Scope Guidelines

Scope indicates the area of code affected. Keep it short and consistent.

### Common Scopes

- Component/module name: `auth`, `cart`, `api`
- Layer: `ui`, `db`, `service`
- Feature area: `login`, `checkout`, `search`

```
feat(auth): implement password reset flow
fix(cart): correct tax calculation
refactor(api/users): simplify response mapping
test(checkout): add integration tests
```

## Writing Good Commit Bodies

### When to Include a Body

- Explaining complex changes
- Documenting the reasoning (why, not just what)
- Breaking changes
- Linking to issues or discussions

### Body Format

- Separate from subject with blank line
- Wrap at 72 characters
- Use bullet points for multiple items
- Explain what and why, not how (code shows how)

```
fix(payments): handle declined card errors gracefully

Previously, declined cards caused an unhandled exception that
crashed the checkout flow. Users saw a blank page instead of
a helpful error message.

Changes:
- Catch PaymentDeclinedError in checkout handler
- Display user-friendly error message
- Log detailed error for debugging
- Add retry option for users

The error handling follows our standard error response format
and integrates with the existing notification system.

Fixes #456
```

## Footer Conventions

### Issue References

```
Fixes #123           # Closes issue when merged
Closes #123          # Same as Fixes
Resolves #123        # Same as Fixes
Refs #123            # References without closing
Related to #123      # Loosely related
```

### Breaking Changes

```
feat(api)!: change authentication header format

BREAKING CHANGE: The Authorization header now requires 'Bearer ' prefix.
Old: Authorization: <token>
New: Authorization: Bearer <token>

Migration: Update all API clients to include the Bearer prefix.
```

### Co-authors

```
feat: implement new dashboard

Co-authored-by: Jane Doe <jane@example.com>
Co-authored-by: John Smith <john@example.com>
```

## Commit Best Practices

### Atomic Commits

Each commit should be one logical change.

```
# ✅ Good: Separate concerns
git commit -m "feat(ui): add loading spinner component"
git commit -m "feat(api): add data fetching service"
git commit -m "feat(dashboard): integrate loading states"

# ❌ Bad: Multiple unrelated changes
git commit -m "add spinner, fix typos, update deps, refactor api"
```

### Commit Frequency

- Commit when you have a working, logical unit
- Don't commit broken code to shared branches
- Use WIP commits on feature branches, squash before merging

### Interactive Rebase for Clean History

```bash
# Clean up commits before merging
git rebase -i main

# Squash WIP commits
pick abc1234 feat: add user validation
squash def5678 WIP
squash ghi9012 fix tests
```

## Commit Message Templates

### Feature

```
feat(<scope>): <what was added>

<Why this feature was needed>
<Key implementation details if complex>

- <Bullet point changes>
- <More changes>

Closes #<issue>
```

### Bug Fix

```
fix(<scope>): <what was fixed>

<What was the bug>
<What caused it>
<How it was fixed>

Fixes #<issue>
```

### Refactor

```
refactor(<scope>): <what was refactored>

<Why the refactor was needed>
<What approach was taken>

No functional changes.
```

## Multi-line Commit Command

```bash
# Using -m multiple times
git commit -m "feat(auth): add OAuth support" \
           -m "Implement Google OAuth2 flow with refresh tokens." \
           -m "Closes #234"

# Using editor (configured via git config)
git commit  # Opens editor for full message
```

## Conventional Commits Benefits

Following conventional commits enables:

- Automatic changelog generation
- Semantic versioning automation
- Clear commit history
- Easier code review
- Better debugging with git bisect

## Gitmoji Benefits

Adding gitmoji provides:

- Visual scanning of commit history
- Quick identification of commit purpose
- More expressive commit messages
- Consistent visual language across teams
- Fun and engaging commit workflow
