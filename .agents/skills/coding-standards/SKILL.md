---
name: coding-standards
description: Apply coding standards for structure, style, consistency, and maintainability across codebases. Use when writing new code or normalizing existing code to team standards.
---

# Coding Standards Skill

## Overview

Write clean, maintainable, and efficient code by following these standards and best practices.

## Code Structure Principles

### Single Responsibility

Each function, class, or module should have one clear purpose.

```javascript
// ❌ Bad: Multiple responsibilities
function processUser(user) {
  // Validate
  if (!user.email) throw new Error('Invalid email');
  // Transform
  user.email = user.email.toLowerCase();
  // Save to DB
  await db.users.insert(user);
  // Send email
  await sendWelcomeEmail(user);
  // Log
  logger.info('User created');
}

// ✅ Good: Single responsibility
function validateUser(user) {
  if (!user.email) throw new ValidationError('Email required');
}

function normalizeUser(user) {
  return { ...user, email: user.email.toLowerCase() };
}

async function createUser(user) {
  validateUser(user);
  const normalized = normalizeUser(user);
  return await userRepository.create(normalized);
}
```

### Keep Functions Small

- Aim for 20-30 lines maximum
- If a function needs a comment to explain a section, extract that section
- Limit parameters to 3-4; use objects for more

```javascript
// ❌ Bad: Too many parameters
function createUser(name, email, age, address, phone, role, department) { }

// ✅ Good: Use an options object
function createUser(options: CreateUserOptions) { }

interface CreateUserOptions {
  name: string;
  email: string;
  age?: number;
  address?: Address;
  phone?: string;
  role?: UserRole;
  department?: string;
}
```

### DRY (Don't Repeat Yourself)

Extract common logic, but don't over-abstract prematurely.

```javascript
// ❌ Bad: Duplicated logic
function getActiveUsers() {
  const users = await db.users.findAll();
  return users.filter(u => u.status === 'active' && !u.deletedAt);
}

function getActiveAdmins() {
  const users = await db.users.findAll();
  return users.filter(u => u.status === 'active' && !u.deletedAt && u.role === 'admin');
}

// ✅ Good: Extract common logic
function isActiveUser(user) {
  return user.status === 'active' && !user.deletedAt;
}

function getActiveUsers() {
  const users = await db.users.findAll();
  return users.filter(isActiveUser);
}

function getActiveAdmins() {
  const users = await db.users.findAll();
  return users.filter(u => isActiveUser(u) && u.role === 'admin');
}
```

## Code Formatting

### Consistency is Key

- Use automated formatters (Prettier, Black, gofmt)
- Configure and commit formatting rules
- Run formatters on save or pre-commit

### Indentation and Spacing

```javascript
// Use consistent indentation (2 or 4 spaces, not tabs)
function example() {
  if (condition) {
    doSomething();
  }
}

// Add blank lines to separate logical sections
function processOrder(order) {
  // Validation
  validateOrder(order);

  // Calculate totals
  const subtotal = calculateSubtotal(order.items);
  const tax = calculateTax(subtotal);
  const total = subtotal + tax;

  // Create record
  return createOrderRecord(order, total);
}
```

### Line Length

- Keep lines under 80-120 characters
- Break long lines logically

```javascript
// ❌ Bad: Too long
const result = someFunction(
  parameter1,
  parameter2,
  parameter3,
  parameter4,
  parameter5,
);

// ✅ Good: Break logically
const result = someFunction(
  parameter1,
  parameter2,
  parameter3,
  parameter4,
  parameter5,
);
```

## Control Flow

### Early Returns

Reduce nesting with early returns (guard clauses).

```javascript
// ❌ Bad: Deep nesting
function processPayment(order) {
  if (order) {
    if (order.items.length > 0) {
      if (order.paymentMethod) {
        // Process payment
        return processPaymentGateway(order);
      } else {
        throw new Error("No payment method");
      }
    } else {
      throw new Error("Empty order");
    }
  } else {
    throw new Error("No order");
  }
}

// ✅ Good: Early returns
function processPayment(order) {
  if (!order) throw new Error("No order");
  if (order.items.length === 0) throw new Error("Empty order");
  if (!order.paymentMethod) throw new Error("No payment method");

  return processPaymentGateway(order);
}
```

### Avoid Deep Nesting

Maximum 3 levels of indentation. Extract functions if needed.

### Prefer Positive Conditions

```javascript
// ❌ Bad
if (!isNotFound) {
}

// ✅ Good
if (isFound) {
}
```

## Data Handling

### Immutability

Prefer immutable data operations.

```javascript
// ❌ Bad: Mutating
function addItem(cart, item) {
  cart.items.push(item);
  return cart;
}

// ✅ Good: Immutable
function addItem(cart, item) {
  return {
    ...cart,
    items: [...cart.items, item],
  };
}
```

### Null Safety

Handle null/undefined explicitly.

```javascript
// Use optional chaining
const userName = user?.profile?.name;

// Use nullish coalescing
const displayName = userName ?? "Anonymous";

// Guard against null in functions
function greet(user) {
  if (!user) return "Hello, Guest";
  return `Hello, ${user.name}`;
}
```

## Async/Await Best Practices

```javascript
// ✅ Use async/await over raw promises
async function fetchUserData(userId) {
  const user = await userService.getById(userId);
  const orders = await orderService.getByUserId(userId);
  return { user, orders };
}

// ✅ Parallel when independent
async function fetchDashboard(userId) {
  const [user, orders, notifications] = await Promise.all([
    userService.getById(userId),
    orderService.getByUserId(userId),
    notificationService.getByUserId(userId),
  ]);
  return { user, orders, notifications };
}

// ✅ Always handle errors
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

Group and order imports consistently:

1. Built-in/Standard library
2. External dependencies
3. Internal/Local modules

```javascript
// Node.js built-ins
import fs from "fs";
import path from "path";

// External packages
import express from "express";
import { z } from "zod";

// Internal modules
import { UserService } from "@/services/user";
import { formatDate } from "./utils";
```

### File Structure

```
src/
├── components/     # UI components
├── services/       # Business logic
├── repositories/   # Data access
├── utils/          # Shared utilities
├── types/          # TypeScript types
├── hooks/          # React hooks
├── constants/      # App constants
└── config/         # Configuration
```

## Performance Considerations

### Avoid Premature Optimization

- Write clear code first
- Measure before optimizing
- Optimize bottlenecks, not everything

### Common Performance Patterns

```javascript
// ✅ Use appropriate data structures
const userMap = new Map(users.map((u) => [u.id, u])); // O(1) lookup
const user = userMap.get(userId);

// ✅ Avoid unnecessary work in loops
const lowercaseTerms = searchTerms.map((t) => t.toLowerCase()); // Outside loop
for (const item of items) {
  if (lowercaseTerms.some((t) => item.name.toLowerCase().includes(t))) {
    results.push(item);
  }
}

// ✅ Debounce expensive operations
const debouncedSearch = debounce(search, 300);
```

## Security Basics

```javascript
// ✅ Never trust user input
const sanitizedInput = sanitize(userInput);

// ✅ Use parameterized queries
await db.query("SELECT * FROM users WHERE id = $1", [userId]);

// ❌ Never: String concatenation for queries
await db.query(`SELECT * FROM users WHERE id = ${userId}`);

// ✅ Validate and sanitize
const schema = z.object({
  email: z.string().email(),
  age: z.number().min(0).max(150),
});
const validated = schema.parse(input);
```
