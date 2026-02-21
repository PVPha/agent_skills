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
| [MVP Planning](mvp-planning.md)             | Define MVP scope, write user stories, and break work into executable tasks |
| [Remmerdoc](remmerdoc.md)                   | Post-task completion notes for summary, validation, and follow-ups    |

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

- ðŸ”´ Required (blocking)
- ðŸ’¡ Suggestion (non-blocking)
- â“ Question
- âœ¨ Praise
- ðŸ”§ Nitpick

### Testing Pattern

```
Arrange â†’ Act â†’ Assert
```

### Error Handling

- Fail fast (validate early)
- Fail gracefully (don't crash)
- Be specific (custom error types)
- Log with context

### Task Management

- Keep one active task
- Define done criteria first
- Work in short implement/verify loops
- Keep queue and parking-lot notes

### MVP Planning

- Define outcome and strict in/out scope
- Write stories with clear acceptance criteria
- Refine and split stories into clear, testable user outcomes
- Break each story into 2-8 hour tasks

### Remmerdoc

- Write a short post-task record after finishing work
- Capture files changed, verification, and decisions
- List follow-up items and known risks

## Usage

These skills can be loaded as context for AI agents to improve code quality consistently. Each skill file is self-contained with examples in multiple programming languages.

## Contributing

To add new skills:

1. Create a markdown file in this directory
2. Follow the existing format with overview, principles, and examples
3. Update this README with the new skill




