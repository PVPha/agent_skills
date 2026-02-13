# Naming Conventions Skill

## Overview

Consistent naming is critical for code readability and maintainability. Apply these conventions based on the language and context.

## General Principles

### Be Descriptive and Intentional

- Names should reveal intent and purpose
- Avoid abbreviations unless universally understood (`id`, `url`, `http`)
- Use searchable names - avoid single letters except loop counters
- Prefer clarity over brevity

### Naming Length Guidelines

| Scope           | Length           | Example               |
| --------------- | ---------------- | --------------------- |
| Loop counter    | 1-2 chars        | `i`, `j`, `idx`       |
| Local variable  | Short, clear     | `count`, `user`       |
| Function/Method | Action + context | `calculateTotalPrice` |
| Class/Type      | Noun phrase      | `UserProfileManager`  |
| Global/Constant | Descriptive      | `MAX_RETRY_ATTEMPTS`  |

## Language-Specific Conventions

### JavaScript/TypeScript

```javascript
// Variables and functions: camelCase
const userName = 'john';
function getUserProfile() { }

// Classes and types: PascalCase
class UserService { }
interface UserProfile { }
type ApiResponse<T> = { }

// Constants: SCREAMING_SNAKE_CASE
const MAX_RETRIES = 3;
const API_BASE_URL = 'https://api.example.com';

// Private members: prefix with underscore or use #
class Service {
  _privateMethod() { }  // Convention
  #truePrivate = true;  // ES2022+
}

// Boolean variables: use is/has/can/should prefix
const isActive = true;
const hasPermission = false;
const canEdit = true;

// Event handlers: handle + Event
function handleClick() { }
function handleUserSubmit() { }
```

### Python

```python
# Variables and functions: snake_case
user_name = 'john'
def get_user_profile():
    pass

# Classes: PascalCase
class UserService:
    pass

# Constants: SCREAMING_SNAKE_CASE
MAX_RETRIES = 3
API_BASE_URL = 'https://api.example.com'

# Private members: single underscore prefix
class Service:
    def _private_method(self):
        pass

    def __name_mangled(self):  # Avoid unless necessary
        pass

# Module-level "constants": UPPER_SNAKE_CASE
DEFAULT_TIMEOUT = 30
```

### C# / Java

```csharp
// Variables: camelCase
var userName = "john";

// Methods: PascalCase
public UserProfile GetUserProfile() { }

// Classes/Interfaces: PascalCase
public class UserService { }
public interface IUserRepository { }  // C#: prefix I for interfaces

// Constants: PascalCase (C#) or SCREAMING_SNAKE_CASE (Java)
public const int MaxRetries = 3;  // C#
public static final int MAX_RETRIES = 3;  // Java

// Private fields: camelCase with underscore prefix (C#)
private readonly string _connectionString;
```

### Go

```go
// Exported (public): PascalCase
func GetUserProfile() {}
type UserService struct {}

// Unexported (private): camelCase
func getUserProfile() {}
type userService struct {}

// Constants: PascalCase for exported, camelCase for unexported
const MaxRetries = 3
const maxRetries = 3

// Acronyms: consistent casing
var userID string  // Not userId
var httpClient *http.Client
```

## File and Directory Naming

### Files

| Type               | Convention              | Example                |
| ------------------ | ----------------------- | ---------------------- |
| Components (React) | PascalCase              | `UserProfile.tsx`      |
| Modules (JS/TS)    | kebab-case              | `user-service.ts`      |
| Python modules     | snake_case              | `user_service.py`      |
| Tests              | Same as source + suffix | `user-service.test.ts` |
| Config files       | kebab-case              | `eslint-config.js`     |

### Directories

- Use kebab-case for most languages: `user-management/`
- Use snake_case for Python packages: `user_management/`
- Group by feature or domain, not by type

## Anti-Patterns to Avoid

```javascript
// ❌ Bad: Meaningless names
const d = new Date();
const temp = calculate();
function doStuff() {}

// ✅ Good: Meaningful names
const createdAt = new Date();
const totalPrice = calculateOrderTotal();
function validateUserInput() {}

// ❌ Bad: Type in name (Hungarian notation)
const strName = "john";
const arrUsers = [];

// ✅ Good: Name describes purpose
const name = "john";
const users = [];

// ❌ Bad: Negated booleans
const isNotActive = false;

// ✅ Good: Positive booleans
const isActive = true;

// ❌ Bad: Generic names
const data = fetchData();
const info = getInfo();

// ✅ Good: Specific names
const userProfile = fetchUserProfile();
const orderDetails = getOrderDetails();
```

## Context-Specific Names

### API/HTTP

```javascript
// Requests
const createUserRequest = {};
const updateOrderPayload = {};

// Responses
const userResponse = await fetch();
const apiResult = {};

// Endpoints
const USER_ENDPOINT = "/api/users";
```

### Database

```javascript
// Models/Entities: singular PascalCase
class User {}
class OrderItem {}

// Collections/Tables: plural
const users = db.collection("users");
```

### React Components

```jsx
// Components: PascalCase
function UserProfileCard() { }

// Props types
interface UserProfileCardProps { }

// Hooks: use prefix
function useUserProfile() { }
function useLocalStorage() { }

// Context
const UserContext = createContext();
const UserProvider = ({ children }) => { };
```
