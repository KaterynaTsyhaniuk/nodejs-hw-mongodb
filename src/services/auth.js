import bcrypt from 'bcrypt';

import createHttpError from 'http-errors';
import { User } from '../db/models/user.js';

export async function registerUser(payload) {
  const user = await User.findOne({ email: payload.email });

  if (user !== null) {
    throw createHttpError(409, 'Email in use.');
  }

  payload.password = await bcrypt.hash(payload.password, 10);
  return User.create(payload);
}
