/**
 * IN-MEMORY DATABASE (for demo only)
 * Synchronous: returns plain values (no Promises). Real DBs are async and return Promises.
 */

// Simple in-memory store: array of users + auto-increment id
const store = {
  users: [],
  nextId: 1
};

// DB interface: same shape as you'd get from an ORM (e.g. findOne, create)
export const db = {
  orders: {
    findOne: (query) => {
      const key = Object.keys(query.where)[0];
      const value = query.where[key];
      const found = store.users.find((u) => u[key] === value);
      return found ?? null;
    },
    findById: (id) => {
      const numId = Number(id);
      const found = store.users.find((u) => u.id === numId);
      return found ?? null;
    },
    findAll: () => [...store.users],
    create: (data) => {
      const user = { id: store.nextId++, ...data, createdAt: new Date() };
      store.users.push(user);
      return user;
    },
    update: (id, data) => {
      const numId = Number(id);
      const i = store.users.findIndex((u) => u.id === numId);
      if (i === -1) return null;
      store.users[i] = { ...store.users[i], ...data };
      return store.users[i];
    },
    delete: (id) => {
      const numId = Number(id);
      const i = store.users.findIndex((u) => u.id === numId);
      if (i === -1) return false;
      store.users.splice(i, 1);
      return true;
    }
  }
};
