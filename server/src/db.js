import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.resolve(__dirname, "..", "db.json");

function normalizeStore(raw) {
  const orders = Array.isArray(raw?.orders) ? raw.orders : [];
  const menu = Array.isArray(raw?.menu) ? raw.menu : [];
  const numericIds = orders.map((o) => Number(o?.id)).filter((n) => Number.isFinite(n));
  const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
  const nextIdFromFile = Number(raw?.nextId);

  return {
    orders,
    menu,
    nextId: Number.isFinite(nextIdFromFile) && nextIdFromFile > maxId ? nextIdFromFile : maxId + 1
  };
}

function readStore() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initial = { orders: [], nextId: 1 };
      fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2), "utf-8");
      return initial;
    }

    const content = fs.readFileSync(DB_PATH, "utf-8").trim();
    if (!content) {
      return { orders: [], nextId: 1 };
    }

    return normalizeStore(JSON.parse(content));
  } catch (error) {
    console.error("Failed to read db.json:", error);
    return { orders: [], nextId: 1 };
  }
}

function writeStore(store) {
  fs.writeFileSync(DB_PATH, JSON.stringify(store, null, 2), "utf-8");
}

function updateStore(mutator) {
  const store = readStore();
  const result = mutator(store);
  writeStore(store);
  return result;
}

export const db = {
  orders: {
    findById: (id) => {
      const numId = Number(id);
      const store = readStore();
      const found = store.orders.find((o) => o.id === numId);
      return found ?? null;
    },
    findAll: () => {
      const store = readStore();
      return [...store.orders];
    },
    create: (data) =>
      updateStore((store) => {
        const order = { id: store.nextId++, ...data, createdAt: new Date().toISOString() };
        store.orders.push(order);
        return order;
      }),
    update: (id, data) =>
      updateStore((store) => {
        const numId = Number(id);
        const i = store.orders.findIndex((o) => o.id === numId);
        if (i === -1) return null;
        store.orders[i] = { ...store.orders[i], ...data };
        return store.orders[i];
      }),
    delete: (id) =>
      updateStore((store) => {
        const numId = Number(id);
        const i = store.orders.findIndex((o) => o.id === numId);
        if (i === -1) return false;
        store.orders.splice(i, 1);
        return true;
      })
  },
  menu: {
    findAll: () => {
      const store = readStore();
      return [...store.menu];
    }
  }
};
