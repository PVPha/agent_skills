# Agent Coding Skills

A comprehensive collection of coding best practices and skills for AI coding agents.

## Skills Overview

| Skill                                       | Description                                                           |
| ------------------------------------------- | --------------------------------------------------------------------- |
| [Naming Conventions](naming-conventions.md) | Variable, function, class, and file naming standards across languages |
| [Coding Standards](coding-standards.md)     | Code structure, formatting, control flow, and security basics         |
| [Commit Messages](commit-messages.md)       | Conventional commits format, types, and best practices                |
| [Code Review](code-review.md)               | Review mindset, feedback patterns, and checklists                     |
| [Documentation](documentation.md)           | Comments, README templates, API docs, and ADRs                        |
| [Testing](testing.md)                       | Unit/integration testing, mocking, and test organization              |
| [Error Handling](error-handling.md)         | Error types, try-catch patterns, logging, and recovery                |

## Quick Reference

### Naming (by Language)

- **JavaScript/TypeScript**: camelCase variables, PascalCase classes, SCREAMING_SNAKE constants
- **Python**: snake_case functions/variables, PascalCase classes
- **Go**: PascalCase exported, camelCase unexported

### Commit Format

```
type(scope): description

[body]

[footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`

### Code Review Markers

- 🔴 Required (blocking)
- 💡 Suggestion (non-blocking)
- ❓ Question
- ✨ Praise
- 🔧 Nitpick

### Testing Pattern

```
Arrange → Act → Assert
```

### Error Handling

- Fail fast (validate early)
- Fail gracefully (don't crash)
- Be specific (custom error types)
- Log with context

## Usage

These skills can be loaded as context for AI agents to improve code quality consistently. Each skill file is self-contained with examples in multiple programming languages.

## Contributing

To add new skills:

1. Create a markdown file in this directory
2. Follow the existing format with overview, principles, and examples
3. Update this README with the new skill
