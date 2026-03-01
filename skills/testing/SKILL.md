---
name: testing
description: Design and implement tests across unit, integration, and end-to-end layers with reliable assertions and maintainable structure. Use when adding, fixing, or improving test coverage.
---

# Testing Skill

## Overview

Write tests that catch bugs, enable confident refactoring, and document expected behavior. Good tests are maintainable, fast, and trustworthy.

## Testing Pyramid

```
    /\
   /  \     E2E Tests (Few)
  /----\    - Full user flows
 /      \   - Slow, expensive
/--------\  Integration Tests (Some)
|        |  - Component interactions
|--------|  - External services
|        |  Unit Tests (Many)
|________|  - Fast, isolated
```

## Unit Testing

### Anatomy of a Good Test

```javascript
describe("calculateDiscount", () => {
  it("should apply 10% discount for orders over $100", () => {
    // Arrange - Set up test data
    const order = { subtotal: 150 };

    // Act - Execute the function
    const discount = calculateDiscount(order);

    // Assert - Verify the result
    expect(discount).toBe(15);
  });
});
```

### Test Naming Conventions

```javascript
// Pattern: should [expected behavior] when [condition]
it("should return empty array when no items match filter");
it("should throw ValidationError when email is invalid");
it("should apply bulk discount when quantity exceeds 10");

// Alternative: [method] - [scenario] - [expected result]
test("calculateTax - US order - returns correct tax amount");
```

### Testing Best Practices

#### One Assertion Per Behavior

```javascript
// ❌ Bad: Multiple unrelated assertions
it("should process order", () => {
  const result = processOrder(order);
  expect(result.id).toBeDefined();
  expect(result.status).toBe("processed");
  expect(result.total).toBe(100);
  expect(sendEmail).toHaveBeenCalled(); // Different concern
});

// ✅ Good: Focused tests
it("should set status to processed", () => {
  const result = processOrder(order);
  expect(result.status).toBe("processed");
});

it("should calculate correct total", () => {
  const result = processOrder(order);
  expect(result.total).toBe(100);
});

it("should send confirmation email", () => {
  processOrder(order);
  expect(sendEmail).toHaveBeenCalledWith(order.email);
});
```

#### Use Descriptive Test Data

```javascript
// ❌ Bad: Magic values
const user = { name: "test", age: 25 };

// ✅ Good: Intention-revealing data
const validUser = {
  name: "John Doe",
  email: "john@example.com",
  age: 25,
};

const minorUser = {
  name: "Jane Doe",
  email: "jane@example.com",
  age: 17, // Under 18 for age restriction tests
};
```

#### Test Factory Functions

```javascript
// Create test data with sensible defaults
function createUser(overrides = {}) {
  return {
    id: "user_123",
    name: "Test User",
    email: "test@example.com",
    role: "member",
    createdAt: new Date("2024-01-01"),
    ...overrides,
  };
}

// Usage
const admin = createUser({ role: "admin" });
const newUser = createUser({ createdAt: new Date() });
```

## What to Test

### Test Behavior, Not Implementation

```javascript
// ❌ Bad: Testing implementation details
it("should call database.save with user object", () => {
  createUser(userData);
  expect(database.save).toHaveBeenCalledWith(userData);
});

// ✅ Good: Testing behavior
it("should persist user and return assigned ID", async () => {
  const result = await createUser(userData);

  expect(result.id).toBeDefined();
  expect(await getUser(result.id)).toMatchObject(userData);
});
```

### Edge Cases to Cover

```javascript
describe("divide", () => {
  // Happy path
  it("should divide two positive numbers", () => {
    expect(divide(10, 2)).toBe(5);
  });

  // Edge cases
  it("should handle decimal results", () => {
    expect(divide(10, 3)).toBeCloseTo(3.333, 2);
  });

  it("should handle negative numbers", () => {
    expect(divide(-10, 2)).toBe(-5);
  });

  it("should throw when dividing by zero", () => {
    expect(() => divide(10, 0)).toThrow("Division by zero");
  });

  // Boundary values
  it("should handle very large numbers", () => {
    expect(divide(Number.MAX_SAFE_INTEGER, 1)).toBe(Number.MAX_SAFE_INTEGER);
  });
});
```

## Mocking and Stubbing

### When to Mock

- External services (APIs, databases)
- Time-dependent functions
- Random number generators
- File system operations
- Expensive computations (in unit tests)

### Mock Patterns

```javascript
// Manual mock
const mockUserService = {
  getById: jest.fn().mockResolvedValue({ id: "123", name: "Test" }),
  create: jest.fn().mockResolvedValue({ id: "456" }),
};

// Module mock
jest.mock("./userService", () => ({
  getById: jest.fn(),
  create: jest.fn(),
}));

// Spy on existing method
const spy = jest.spyOn(userService, "getById");
spy.mockResolvedValue(mockUser);

// Verify mock calls
expect(mockUserService.getById).toHaveBeenCalledWith("123");
expect(mockUserService.getById).toHaveBeenCalledTimes(1);
```

### Time Mocking

```javascript
describe("subscription expiry", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-06-15"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should mark subscription as expired after end date", () => {
    const subscription = createSubscription({
      endDate: new Date("2024-06-01"),
    });

    expect(subscription.isExpired()).toBe(true);
  });
});
```

## Integration Testing

### Database Tests

```javascript
describe("UserRepository", () => {
  let db;

  beforeAll(async () => {
    db = await createTestDatabase();
  });

  afterAll(async () => {
    await db.close();
  });

  beforeEach(async () => {
    await db.truncateTables();
  });

  it("should create and retrieve user", async () => {
    const userData = { name: "John", email: "john@example.com" };

    const created = await userRepository.create(userData);
    const retrieved = await userRepository.getById(created.id);

    expect(retrieved).toMatchObject(userData);
  });
});
```

### API Tests

```javascript
describe("POST /api/users", () => {
  it("should create user and return 201", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({ name: "John", email: "john@example.com" })
      .set("Authorization", `Bearer ${validToken}`);

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe("John");
  });

  it("should return 400 for invalid email", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({ name: "John", email: "invalid" })
      .set("Authorization", `Bearer ${validToken}`);

    expect(response.status).toBe(400);
    expect(response.body.error).toContain("email");
  });

  it("should return 401 without authentication", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({ name: "John", email: "john@example.com" });

    expect(response.status).toBe(401);
  });
});
```

## Test Organization

### File Structure

```
src/
├── services/
│   ├── userService.js
│   └── userService.test.js     # Co-located tests
│
tests/
├── unit/                        # Or separate folders
│   └── userService.test.js
├── integration/
│   └── userApi.test.js
├── e2e/
│   └── userFlow.test.js
└── fixtures/
    └── users.js                 # Shared test data
```

### Test Grouping

```javascript
describe("UserService", () => {
  describe("create", () => {
    it("should create user with valid data");
    it("should hash password before storing");
    it("should throw for duplicate email");
  });

  describe("authenticate", () => {
    it("should return user for valid credentials");
    it("should return null for invalid password");
    it("should return null for non-existent email");
  });

  describe("resetPassword", () => {
    it("should generate reset token");
    it("should send reset email");
    it("should expire token after 24 hours");
  });
});
```

## Testing Async Code

```javascript
// Async/await (preferred)
it("should fetch user data", async () => {
  const user = await userService.getById("123");
  expect(user.name).toBe("Test");
});

// Testing rejections
it("should throw for non-existent user", async () => {
  await expect(userService.getById("invalid")).rejects.toThrow(
    "User not found",
  );
});

// Testing callbacks (if needed)
it("should callback with data", (done) => {
  fetchData((error, data) => {
    expect(error).toBeNull();
    expect(data).toBeDefined();
    done();
  });
});
```

## Test Maintenance

### Avoiding Flaky Tests

```javascript
// ❌ Bad: Timing-dependent
await new Promise((resolve) => setTimeout(resolve, 1000));
expect(result).toBe("done");

// ✅ Good: Wait for condition
await waitFor(() => expect(element).toBeVisible());

// ❌ Bad: Order-dependent tests
// ✅ Good: Each test sets up its own state

// ❌ Bad: Relying on real time
// ✅ Good: Mock time with jest.useFakeTimers()
```

### Test Coverage

- Aim for 80%+ coverage on critical paths
- Don't chase 100% coverage at expense of quality
- Cover: happy paths, error paths, edge cases
- Skip: trivial getters/setters, framework code

### When Tests Fail

1. Read the error message carefully
2. Check if test or code is wrong
3. Run test in isolation to rule out interference
4. Check recent changes that might affect it
5. Add debugging output if needed
