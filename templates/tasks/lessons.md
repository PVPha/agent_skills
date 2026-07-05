# Lessons

## Workflow Corrections

- Do not move to the next task from `tasks/todo.md` until the current task has a rememberDoc written in `docs/rememberDocs/` and that exact path is recorded in the task board.
- Do not move to the next task until `COMMIT_GATE: PASS | hash=<sha> | task=<title>` has been output in the response. A commit described in prose but not actually run does not satisfy this gate.
- For new projects, do not let an `implementation_plan.md` or chat-only plan replace durable project docs. Update `docs/mvp-plan.md` and `tasks/todo.md` before accepting "proceed" or creating the codebase.

<!-- Add project-specific correction patterns below as they occur. -->
