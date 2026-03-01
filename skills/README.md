# Agent Coding Skills

A comprehensive collection of coding best practices and skills for AI coding agents.

## Skills Overview

| Skill                                       | Description                                                           |
| ------------------------------------------- | --------------------------------------------------------------------- |
| [Naming Conventions](naming-conventions/SKILL.md) | Variable, function, class, and file naming standards across languages |
| [Coding Standards](coding-standards/SKILL.md)     | Code structure, formatting, control flow, and security basics         |
| [Commit Messages](commit-messages/SKILL.md)       | Conventional commits format, types, and best practices                |
| [Code Review](code-review/SKILL.md)               | Review mindset, feedback patterns, and checklists                     |
| [Documentation](documentation/SKILL.md)           | Comments, README templates, API docs, and ADRs                        |
| [Testing](testing/SKILL.md)                       | Unit/integration testing, mocking, and test organization              |
| [Error Handling](error-handling/SKILL.md)         | Error types, try-catch patterns, logging, and recovery                |
| [Security](security/SKILL.md)                     | Secure coding practices, authz checks, secret handling, and hardening |
| [MVP Planning](mvp-planning/SKILL.md)             | Define MVP scope, write user stories, and break work into executable tasks |
| [Remmerdoc](remmerdoc/SKILL.md)                   | Post-task completion notes for summary, validation, and follow-ups    |
| [Clean Code](clean-code/SKILL.md)                 | Practical rules for writing readable, maintainable, low-risk code      |
| [Workflow Orchestration](workflow-orchestration/SKILL.md) | Coordinate multi-step engineering workflows with dependencies, gates, and handoffs |

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

### Security

- Validate all untrusted input at boundaries
- Enforce least privilege and deny-by-default authorization
- Keep secrets out of source and logs
- Use parameterized queries and safe output encoding

### Task Management

- Keep one active task
- Define done criteria first
- Work in short implement/verify loops
- Keep queue and parking-lot notes

### Workflow Orchestration

- Define workflow stages with explicit exit criteria
- Map dependencies before execution
- Gate stage transitions with verification evidence

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

