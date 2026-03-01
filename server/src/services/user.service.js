/**
 * USER SERVICE (business logic)
 * Validates input, applies rules (e.g. unique email), calls repository.
 * Does NOT know about HTTP (req/res) or DB details — only plain data in/out.
 */

import { userRepository } from "../repositories/user.repository.js";
import { hash } from "../utils/hash.js";
import { toUserDto } from "../utils/dto.js";

// Helper: throw if value is missing (used for validation)
function require(value, message) {
  if (!value) throw new Error(message);
}

export const userService = {
  createUser(data) {
    require(data?.email, "Email required");
    require(data?.password, "Password required");

    const existing = userRepository.findByEmail(data.email);
    if (existing) throw new Error("User already exists");

    const user = userRepository.create({
      email: data.email,
      password: hash(data.password)
    });
    return toUserDto(user);
  },

  getAllUsers() {
    const users = userRepository.findAll();
    return users.map(toUserDto);
  },

  getUser(id) {
    const user = userRepository.findById(id);
    if (!user) throw new Error("User not found");
    return toUserDto(user);
  },

  updateUser(id, data) {
    const user = userRepository.findById(id);
    if (!user) throw new Error("User not found");

    if (data.email !== undefined) {
      require(data.email, "Email required");
      const existing = userRepository.findByEmail(data.email);
      if (existing && existing.id !== user.id) throw new Error("Email already taken");
    }

    const update = { ...data };
    if (update.password) update.password = hash(update.password);

    const updated = userRepository.update(id, update);
    return toUserDto(updated);
  },

  deleteUser(id) {
    const user = userRepository.findById(id);
    if (!user) throw new Error("User not found");
    userRepository.delete(id);
    return true;
  }
};
