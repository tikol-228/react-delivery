# Lesson example: Controller → Service → Repository (CRUD)

Working server with full user CRUD.

## Structure

```
src/
├── controllers/
│   └── user.controller.js
├── services/
│   └── user.service.js
├── repositories/
│   └── user.repository.js
├── routes/
│   └── user.routes.js
├── utils/
│   ├── hash.js
│   └── dto.js          ← toUserDto (no password in response)
├── models/
├── db.js               ← in-memory (replace with real DB)
└── app.js
```

## Run

```bash
npm install
npm start
```

## API

| Method | Path       | Description        |
|--------|------------|--------------------|
| GET    | /user     | List all users     |
| GET    | /user/:id | Get one user       |
| POST   | /user     | Create user        |
| PUT    | /user/:id | Update user        |
| DELETE | /user/:id | Delete user        |

## Examples

**Create**
```bash
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"email":"a@b.com","password":"secret"}'
# 201 → {"id":1,"email":"a@b.com"}
```

**List**
```bash
curl http://localhost:3000/user
# 200 → [{"id":1,"email":"a@b.com"}]
```

**Get one**
```bash
curl http://localhost:3000/user/1
# 200 → {"id":1,"email":"a@b.com"}
```

**Update** (email and/or password)
```bash
curl -X PUT http://localhost:3000/user/1 \
  -H "Content-Type: application/json" \
  -d '{"email":"new@b.com"}'
# 200 → {"id":1,"email":"new@b.com"}
```

**Delete**
```bash
curl -X DELETE http://localhost:3000/user/1
# 204 (no body)
```

## Flow

Controller → Service → Repository. DTO used for all responses (id + email only).

---

## Why we use try/catch (and when you’d use async/await)

This demo uses **no Promises**: the in-memory DB is synchronous, so the service and controller call the repository directly and get a value back. We still use **try/catch** so validation errors (e.g. "Email required", "User already exists") are passed to `next(e)` and the global handler sends a JSON error (400, 404).

**Current code (synchronous):**

```js
createUser: (req, res, next) => {
  try {
    const result = userService.createUser(req.body);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
},
```

| Concept | Why we use it here |
|--------|---------------------|
| **try/catch** | Service can throw; we catch and send the error via `next(e)` instead of crashing. |
| **No async/await** | In-memory DB returns values immediately, so we don’t need to wait. |

**When you switch to a real DB** (PostgreSQL, MongoDB, etc.), the driver will be async and return Promises. Then you’ll need `async`/`await` again in the controller and service, and the “Why we use async, await, and try/catch” pattern will apply.

---

## Summary: what each file does

Short overview of each part (matches the comments in the code).

| File | Role |
|------|------|
| **app.js** | Entry point: creates Express app, mounts routes, JSON parser, global error handler. |
| **db.js** | In-memory store for demo. In production replace with a real DB; only this layer knows how data is stored. |
| **routes/user.routes.js** | Maps HTTP method + path to controller. No business logic. |
| **controllers/user.controller.js** | HTTP only: reads `req`, calls service, sends `res`. No DB or business rules. |
| **services/user.service.js** | Business logic: validation, rules (e.g. unique email), calls repository. No HTTP. |
| **repositories/user.repository.js** | Data access only: talks to DB. To swap DB, change this file (and db.js). |
| **utils/hash.js** | Password hashing (demo uses SHA-256; use bcrypt in production). |
| **utils/dto.js** | DTO: returns only safe fields (id, email); never sends password to client. |

Request flow: **Route → Controller → Service → Repository → DB** (then back with DTO).
