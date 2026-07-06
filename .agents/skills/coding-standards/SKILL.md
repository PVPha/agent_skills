---
name: coding-standards
description: Write readable, maintainable, low-risk code — structure, naming, formatting, control flow, and clean-code rules in one place. Use when implementing, editing, refactoring, or naming anything in a codebase.
---

# Coding Standards Skill

## Overview

Write code that is easy to read, easy to change, and hard to misuse. This is the single quality skill for implementation work: structure, clarity, naming, formatting, and control flow.

## Code Structure

### Single Responsibility

Each function, class, or module should have one clear purpose. Extract logic when a function mixes validation, transformation, and side effects.

```javascript
// ❌ Bad: validates, transforms, saves, emails, and logs in one function
async function processUser(user) {
  if (!user.email) throw new Error('Invalid email');
  user.email = user.email.toLowerCase();
  await db.users.insert(user);
  await sendWelcomeEmail(user);
  logger.info('User created');
}

// ✅ Good: focused units composed together
function validateUser(user) {
  if (!user.email) throw new ValidationError('Email required');
}

function normalizeUser(user) {
  return { ...user, email: user.email.toLowerCase() };
}

async function createUser(user) {
  validateUser(user);
  return await userRepository.create(normalizeUser(user));
}
```

### Keep Functions Small

- Aim for 20-30 lines maximum
- If a function needs a comment to explain a section, extract that section
- Limit parameters to 3-4; use an options object for more

### Make Side Effects Obvious

- Separate pure logic from I/O
- Keep mutation local and explicit; prefer immutable operations

```javascript
// ✅ Pure computation
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// ✅ Side effect isolated
async function saveOrder(order) {
  return await db.orders.insert(order);
}

// ✅ Immutable update instead of mutating the argument
function addItem(cart, item) {
  return { ...cart, items: [...cart.items, item] };
}
```

### DRY, but Not Premature Abstraction

- Remove duplicated business rules quickly
- Avoid creating abstractions before you see stable patterns
- Duplicate small code once if abstraction would hide intent

```javascript
// ✅ Extract the shared rule, keep call sites simple
function isActiveUser(user) {
  return user.status === 'active' && !user.deletedAt;
}
```

### Prefer Composition

- Build behavior from small functions/modules
- Favor dependency injection over hard-coded globals
- Make invalid states unrepresentable: validate at boundaries, constrain inputs with types/schemas/enums, fail fast with specific errors

## Naming

### General Principles

- Names reveal intent; prefer clarity over cleverness or brevity
- Use domain terms, not generic names like `data`, `item`, `temp`, `doStuff`
- Include units and constraints in names (`timeoutMs`, `maxRetries`)
- Booleans read as positive facts (`isActive`, `hasPermission`, `canEdit` — never `isNotActive`)
- No Hungarian notation (`strName`, `arrUsers`)
- Avoid abbreviations unless universal (`id`, `url`, `http`); single letters only for loop counters

| Scope           | Length           | Example               |
| --------------- | ---------------- | --------------------- |
| Loop counter    | 1-2 chars        | `i`, `idx`            |
| Local variable  | Short, clear     | `count`, `user`       |
| Function/Method | Action + context | `calculateTotalPrice` |
| Class/Type      | Noun phrase      | `UserProfileManager`  |
| Global/Constant | Descriptive      | `MAX_RETRY_ATTEMPTS`  |

### Case Conventions by Language

| Language  | Variables/functions | Classes/types | Constants | Private members |
| --------- | ------------------- | ------------- | --------- | --------------- |
| JS/TS     | `camelCase` | `PascalCase` | `SCREAMING_SNAKE_CASE` | `_prefix` or `#field` |
| Python    | `snake_case` | `PascalCase` | `SCREAMING_SNAKE_CASE` | `_prefix` |
| C#        | `camelCase` | `PascalCase` (interfaces `IThing`) | `PascalCase` | `_camelCase` fields |
| Java      | `camelCase` | `PascalCase` | `SCREAMING_SNAKE_CASE` | — |
| Go        | `camelCase` unexported | `PascalCase` exported | same rule as identifiers | lowercase = unexported |

Go acronyms keep consistent casing: `userID`, `httpClient` (not `userId`).

### Context-Specific Names

- Event handlers: `handleClick`, `handleUserSubmit`
- React components and their prop types: `UserProfileCard`, `UserProfileCardProps`; hooks use `use` prefix (`useUserProfile`)
- Models/entities singular (`User`, `OrderItem`); collections/tables plural (`users`)
- Requests/responses: `createUserRequest`, `userResponse`

### Files and Directories

| Type               | Convention              | Example                |
| ------------------ | ----------------------- | ---------------------- |
| Components (React) | PascalCase              | `UserProfile.tsx`      |
| Modules (JS/TS)    | kebab-case              | `user-service.ts`      |
| Python modules     | snake_case              | `user_service.py`      |
| Tests              | Same as source + suffix | `user-service.test.ts` |
| Directories        | kebab-case (snake_case for Python packages), grouped by feature/domain | `user-management/` |

## Formatting

- Use automated formatters (Prettier, Black, gofmt); commit the config and run on save or pre-commit
- Consistent indentation (2 or 4 spaces, not tabs); blank lines between logical sections
- Keep lines under 80-120 characters; break long lines logically

## Control Flow

### Early Returns, Shallow Nesting

Use guard clauses so the happy path stays visually dominant. Maximum 3 levels of indentation — extract functions if needed.

```javascript
// ✅ Guard clauses instead of nested conditionals
function processPayment(order) {
  if (!order) throw new Error("No order");
  if (order.items.length === 0) throw new Error("Empty order");
  if (!order.paymentMethod) throw new Error("No payment method");

  return processPaymentGateway(order);
}
```

### Prefer Positive Conditions

```javascript
// ❌ if (!isNotFound)
// ✅ if (isFound)
```

## Data Handling

### Null Safety

Handle null/undefined explicitly:

```javascript
const userName = user?.profile?.name;        // optional chaining
const displayName = userName ?? "Anonymous"; // nullish coalescing

function greet(user) {
  if (!user) return "Hello, Guest";
  return `Hello, ${user.name}`;
}
```

### Async/Await

```javascript
// ✅ async/await over raw promises; parallelize independent calls
async function fetchDashboard(userId) {
  const [user, orders, notifications] = await Promise.all([
    userService.getById(userId),
    orderService.getByUserId(userId),
    notificationService.getByUserId(userId),
  ]);
  return { user, orders, notifications };
}

// ✅ Always handle errors with context
async function safeFetch(userId) {
  try {
    return await fetchUserData(userId);
  } catch (error) {
    logger.error("Failed to fetch user data", { userId, error });
    throw new UserDataError("Unable to load user data");
  }
}
```

## Code Organization

### Imports Order

1. Built-in/standard library
2. External dependencies
3. Internal/local modules

### File Structure

```
src/
├── components/     # UI components
├── services/       # Business logic
├── repositories/   # Data access
├── utils/          # Shared utilities
├── types/          # Types
├── constants/      # App constants
└── config/         # Configuration
```

## Performance

- Write clear code first; measure before optimizing; optimize bottlenecks, not everything
- Use appropriate data structures (`Map` for O(1) lookup), hoist invariant work out of loops, debounce expensive operations

## Security Basics

```javascript
// ✅ Never trust user input — validate and sanitize at boundaries
const schema = z.object({
  email: z.string().email(),
  age: z.number().min(0).max(150),
});
const validated = schema.parse(input);

// ✅ Parameterized queries only — never string concatenation
await db.query("SELECT * FROM users WHERE id = $1", [userId]);
```

For anything beyond basics (authz, secrets, script execution), load `.agents/skills/security/SKILL.md`.

## Pre-Merge Checklist

- [ ] Names communicate purpose without extra comments
- [ ] Functions are small and single-purpose
- [ ] Control flow is shallow; happy path dominant
- [ ] Side effects are explicit and isolated
- [ ] Duplicate logic reduced at the right abstraction level
- [ ] Nulls and errors handled explicitly with context
- [ ] Tests cover core behavior and edge cases

## Refactoring Triggers

Refactor when you notice:

- Same bug fixed in multiple places
- Long functions with unrelated sections
- Repeated conditionals for the same rule
- Frequent changes touching many files for one behavior
- Hard-to-test code due to mixed concerns

Use incremental refactors: add tests, extract one unit, verify behavior, repeat.
