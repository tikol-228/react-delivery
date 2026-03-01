/**
 * Password hashing (for demo: SHA-256).
 * In production use bcrypt or similar.
 */

import crypto from "crypto";

export function hash(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}
