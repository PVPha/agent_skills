---
name: code-review
description: Perform high-signal code reviews focused on bugs, regressions, risk, and maintainability. Use when reviewing pull requests, patches, or proposed code changes.
---

# Code Review Skill

## Overview

Code review is a collaborative process to improve code quality, share knowledge, and catch issues before they reach production.

## Reviewer Mindset

### Goals of Code Review

1. **Catch bugs** before they reach production
2. **Ensure quality** and maintainability
3. **Share knowledge** across the team
4. **Maintain consistency** in codebase
5. **Mentor** and help others grow

### Review Attitude

- Be constructive, not critical
- Assume positive intent
- Ask questions rather than making demands
- Praise good solutions
- Focus on the code, not the person

## What to Review

### Priority Checklist

#### High Priority (Must Check)

- [ ] **Correctness**: Does the code do what it's supposed to?
- [ ] **Security**: Are there vulnerabilities (injection, XSS, auth issues)?
- [ ] **Error Handling**: Are errors handled gracefully?
- [ ] **Edge Cases**: Are boundary conditions handled?
- [ ] **Breaking Changes**: Will this break existing functionality?

#### Medium Priority (Should Check)

- [ ] **Performance**: Are there obvious performance issues?
- [ ] **Tests**: Are there adequate tests? Do they pass?
- [ ] **Naming**: Are names clear and consistent?
- [ ] **DRY**: Is there unnecessary duplication?
- [ ] **Complexity**: Is the code unnecessarily complex?

#### Lower Priority (Nice to Check)

- [ ] **Style**: Does it follow project conventions?
- [ ] **Documentation**: Are complex parts documented?
- [ ] **Formatting**: Is formatting consistent?

## Providing Feedback

### Comment Types

#### Required Change (Blocking)

````
🔴 This will cause a SQL injection vulnerability.
Please use parameterized queries:

```sql
db.query('SELECT * FROM users WHERE id = $1', [userId])
````

```

#### Suggestion (Non-blocking)
```

💡 Consider using early returns here to reduce nesting:

```javascript
if (!user) return null;
// rest of logic
```

```

#### Question (Clarification)
```

❓ What happens if `items` is empty? Should we handle that case?

```

#### Praise
```

✨ Nice use of the builder pattern here! This is much cleaner than the old approach.

```

#### Nitpick (Minor, Optional)
```

🔧 Nit: Could rename `data` to `userProfile` for clarity.
(Not blocking)

```

### Feedback Format

**Be Specific**
```

❌ "This is confusing"
✅ "The variable name `d` is unclear. Consider `deliveryDate` to show its purpose."

```

**Explain Why**
```

❌ "Don't do it this way"
✅ "Using `any` here bypasses TypeScript's type checking, which could hide bugs.
Consider defining a proper interface for the API response."

```

**Suggest Solutions**
```

❌ "This is inefficient"
✅ "This loops through the array twice. You could combine the filter and map:
`items.filter(x => x.active).map(x => x.name)`
Or use `reduce` for a single pass."

```

## Review Checklist by Category

### Logic & Correctness
```

- Does the logic match the requirements?
- Are there off-by-one errors?
- Are null/undefined cases handled?
- Are async operations awaited properly?
- Are race conditions possible?

```

### Security
```

- Is user input validated and sanitized?
- Are SQL queries parameterized?
- Is sensitive data (passwords, tokens) handled securely?
- Are authentication/authorization checks in place?
- Are dependencies up to date (no known vulnerabilities)?

```

### Error Handling
```

- Are all error cases handled?
- Are errors logged with useful context?
- Do errors fail gracefully for users?
- Are async errors caught?

```

### Testing
```

- Are there unit tests for new logic?
- Are edge cases tested?
- Are the tests actually testing the right thing?
- Do tests have clear assertions?
- Are integration tests needed?

```

### Performance
```

- Are there N+1 query problems?
- Is data fetched efficiently?
- Are expensive operations cached?
- Are loops optimized for large datasets?

```

### Maintainability
```

- Is the code easy to understand?
- Are there magic numbers that should be constants?
- Is the code DRY without over-abstracting?
- Are functions/classes single-purpose?

```

## Responding to Reviews

### As an Author

**Be Open to Feedback**
```

✅ "Good point, I didn't consider that edge case. Fixed!"
✅ "I went with this approach because X. Want me to change it?"
❌ "That's how I've always done it."

```

**Ask for Clarification**
```

"Could you elaborate on what you mean? I want to make sure I address your concern."

```

**Explain Your Reasoning**
```

"I chose this approach because it's more performant for our use case.
See benchmark results: [link]. Open to other suggestions though!"

```

### Resolving Disagreements
1. Discuss the tradeoffs objectively
2. Reference team conventions or documentation
3. Get a third opinion if stuck
4. Document decisions for future reference

## Review Efficiency

### Before Requesting Review
- [ ] Self-review your changes first
- [ ] Run tests locally
- [ ] Run linter/formatter
- [ ] Write clear PR description
- [ ] Keep changes focused and reasonably sized

### PR Size Guidelines
| Size | Lines Changed | Review Time |
|------|--------------|-------------|
| XS | < 50 | Minutes |
| S | 50-200 | < 1 hour |
| M | 200-400 | 1-2 hours |
| L | 400+ | Split if possible |

### Speed vs. Thoroughness
- Prioritize blocking issues
- Don't let PRs sit too long (aim for < 24h response)
- For large PRs, do multiple passes
- Use async review for non-urgent items

## Automated Review Support

### Tools to Use
- **Linters**: ESLint, Pylint, RuboCop
- **Formatters**: Prettier, Black, gofmt
- **Type Checkers**: TypeScript, mypy
- **Security Scanners**: Snyk, Dependabot
- **Test Coverage**: Jest, Coverage.py

### Automate What You Can
Let tools catch:
- Formatting issues
- Common bugs (unused variables, etc.)
- Security vulnerabilities
- Dependency issues

Focus human review on:
- Logic and correctness
- Architecture decisions
- Knowledge sharing
- Complex interactions
```
