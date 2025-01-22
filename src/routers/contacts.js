import { Router } from 'express';
import {
  getContactController,
  getContactsController,
} from '../controllers/contacts.js';

const contactRouter = Router();

contactRouter.get('/contacts', getContactsController);

contactRouter.get('/contacts/:contactId', getContactController);

export default contactRouter;
