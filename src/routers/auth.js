import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  loginSchema,
  registerSchema,
  sendResetEmailSchema,
} from '../validation/auth.js';
import {
  loginController,
  logoutController,
  refreshController,
  registerController,
  sendResetEmailController,
} from '../controllers/auth.js';
const authRoutes = express.Router();

const jsonParser = express.json();

authRoutes.post(
  '/register',
  jsonParser,
  validateBody(registerSchema),
  ctrlWrapper(registerController),
);

authRoutes.post(
  '/login',
  jsonParser,
  validateBody(loginSchema),
  ctrlWrapper(loginController),
);

authRoutes.post('/refresh', ctrlWrapper(refreshController));

authRoutes.post('/logout', ctrlWrapper(logoutController));

authRoutes.post(
  '/send-reset-email',
  jsonParser,
  validateBody(sendResetEmailSchema),
  ctrlWrapper(sendResetEmailController),
);

export default authRoutes;
