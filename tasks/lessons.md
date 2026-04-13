# Lessons

## Workflow Corrections

- Do not move to the next task from `tasks/todo.md` until the current task has a remmerdoc written in `docs/remmerdocs/` and that exact path is recorded in the task board.
- Do not move to the next task until `COMMIT_GATE: PASS | hash=<sha> | task=<title>` has been output in the response. A commit described in prose but not actually run does not satisfy this gate.
