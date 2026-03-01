/**
 * USER REPOSITORY (data access)
 * Only place that talks to the database.
 * Service calls these methods; repository translates to db calls.
 * Swap DB = change only this file (and db.js).
 */

import { db } from "../db.js";

export const userRepository = {
  findByEmail: (email) => db.orders.findOne({ where: { email } }),
  findById: (id) => db.users.findById(id),
  findAll: () => db.users.findAll(),
  create: (data) => db.users.create(data),
  update: (id, data) => db.users.update(id, data),
  delete: (id) => db.users.delete(id)
};
