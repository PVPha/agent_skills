# Clean Code Skill

## Overview

Write code that is easy to read, easy to change, and hard to misuse.

## Core Rules

### Prefer Clarity Over Cleverness

- Write code for the next reader, not for brevity contests
- Avoid dense one-liners when straightforward code is clearer
- Make intent obvious with descriptive names and simple control flow

```javascript
// ❌ Hard to read
const ok = users.filter(u => u.a && !u.d).map(u => ({ ...u, n: u.n?.trim() ?? "" }));

// ✅ Clear intent
const activeUsers = users.filter((user) => user.isActive && !user.deletedAt);
const normalizedUsers = activeUsers.map((user) => ({
  ...user,
  name: user.name?.trim() ?? "",
}));
```

### Keep Functions Focused

- Give each function one reason to change
- Prefer small functions with clear inputs and outputs
- Extract logic when a function mixes validation, transformation, and side effects

```typescript
// ✅ Focused units
function validateEmail(email: string): void {
  if (!email.includes("@")) throw new Error("Invalid email");
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
```

### Name Things Precisely

- Use domain terms, not generic names like `data`, `item`, `temp`
- Include units and constraints in names (`timeoutMs`, `maxRetries`)
- Prefer booleans that read as facts (`isEnabled`, `hasAccess`, `canRetry`)

```typescript
// ❌ Vague
const d = 3000;

// ✅ Explicit
const retryDelayMs = 3000;
```

### Minimize Nesting

- Use guard clauses and early returns
- Keep happy path visually dominant
- Split deep conditional trees into helper functions

```python
def process(order):
    if not order:
        raise ValueError("order required")
    if not order.items:
        raise ValueError("items required")
    if not order.payment_method:
        raise ValueError("payment method required")
    return charge(order)
```

### Make Side Effects Obvious

- Separate pure logic from I/O
- Keep mutation local and explicit
- Avoid hidden state changes in utility helpers

```javascript
// ✅ Pure computation
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// ✅ Side effect isolated
async function saveOrder(order) {
  return await db.orders.insert(order);
}
```

## Design Heuristics

### DRY, but Not Premature Abstraction

- Remove duplicated business rules quickly
- Avoid creating abstractions before you see stable patterns
- Duplicate small code once if abstraction would hide intent

### Prefer Composition

- Build behavior from small functions/modules
- Favor dependency injection over hard-coded globals
- Keep modules decoupled behind explicit interfaces

### Make Invalid States Unrepresentable

- Validate data at boundaries
- Use types/schemas/enums to constrain inputs
- Fail fast with specific errors and context

## Clean Code Checklist

Before merging, verify:

- [ ] Names communicate purpose without extra comments
- [ ] Functions are small and single-purpose
- [ ] Control flow is shallow and readable
- [ ] Side effects are explicit and isolated
- [ ] Duplicate logic is reduced at the right abstraction level
- [ ] Errors are specific and actionable
- [ ] Tests cover core behavior and edge cases

## Refactoring Triggers

Refactor when you notice:

- Same bug fixed in multiple places
- Long functions with unrelated sections
- Repeated conditionals for the same rule
- Frequent changes touching many files for one behavior
- Hard-to-test code due to mixed concerns

Use incremental refactors: add tests, extract one unit, verify behavior, repeat.
