# Test Login with GraphQL

## Server Running
- URL: http://localhost:4000/graphql
- GraphQL Playground: http://localhost:4000/graphql

## 1. Register a New User

```graphql
mutation RegisterUser {
  register(input: {
    email: "test@example.com"
    password: "Password123!"
    phone: "+1234567890"
    role: SEEKER
    firstName: "John"
    lastName: "Doe"
  }) {
    accessToken
    refreshToken
    user {
      id
      email
      phone
      role
      seeker {
        id
        firstName
        lastName
      }
    }
  }
}
```

## 2. Login with Existing User

```graphql
mutation Login {
  login(input: {
    email: "test@example.com"
    password: "Password123!"
  }) {
    accessToken
    refreshToken
    user {
      id
      email
      phone
      role
      seeker {
        id
        firstName
        lastName
      }
    }
  }
}
```

## 3. Validate Token

```graphql
query ValidateToken {
  validateToken(token: "YOUR_ACCESS_TOKEN_HERE")
}
```

## 4. Refresh Token

```graphql
mutation RefreshToken {
  refreshToken(token: "YOUR_REFRESH_TOKEN_HERE") {
    accessToken
    refreshToken
    user {
      id
      email
      role
    }
  }
}
```

## 5. Logout

```graphql
mutation Logout {
  logout
}
```

## Expected Results

### Register Response:
```json
{
  "data": {
    "register": {
      "accessToken": "eyJhbGc...",
      "refreshToken": "eyJhbGc...",
      "user": {
        "id": "clxxx...",
        "email": "test@example.com",
        "phone": "+1234567890",
        "role": "SEEKER",
        "seeker": {
          "id": "clxxx...",
          "firstName": "John",
          "lastName": "Doe"
        }
      }
    }
  }
}
```

### Login Response:
```json
{
  "data": {
    "login": {
      "accessToken": "eyJhbGc...",
      "refreshToken": "eyJhbGc...",
      "user": {
        "id": "clxxx...",
        "email": "test@example.com",
        "phone": "+1234567890",
        "role": "SEEKER",
        "seeker": {
          "id": "clxxx...",
          "firstName": "John",
          "lastName": "Doe"
        }
      }
    }
  }
}
```

## Testing Instructions

1. Open your browser and navigate to: http://localhost:4000/graphql
2. Copy and paste the mutation queries from above
3. Run the Register mutation first to create a test user
4. Then run the Login mutation with the same credentials
5. Copy the accessToken from the response
6. Use it to test the validateToken query

## Error Scenarios

### Invalid Credentials:
```graphql
mutation Login {
  login(input: {
    email: "test@example.com"
    password: "WrongPassword"
  }) {
    accessToken
  }
}
```

Expected error:
```json
{
  "errors": [
    {
      "message": "Invalid credentials",
      "extensions": {
        "code": "UNAUTHORIZED"
      }
    }
  ]
}
```

### Duplicate Registration:
```graphql
mutation Register {
  register(input: {
    email: "test@example.com"
    password: "Password123!"
    phone: "+1234567890"
    role: SEEKER
    firstName: "Jane"
    lastName: "Doe"
  }) {
    accessToken
  }
}
```

Expected error:
```json
{
  "errors": [
    {
      "message": "Email already exists",
      "extensions": {
        "code": "BAD_REQUEST"
      }
    }
  ]
}
```
