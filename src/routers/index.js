import express from 'express';
import authRoutes from './auth.js';
import contactRouter from './contacts.js';
import { authenticate } from '../middlewares/authorization.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/contacts', authenticate, contactRouter);

export default router;
