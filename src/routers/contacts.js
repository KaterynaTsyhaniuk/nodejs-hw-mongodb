import express from 'express';
import { Router } from 'express';
import {
  getContactController,
  getContactsController,
  createContactController,
  deleteContactController,
  changeContactPhoneNumberController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactRouter = Router();
const jsonParser = express.json();

contactRouter.get('/contacts', ctrlWrapper(getContactsController));

contactRouter.get('/contacts/:contactId', ctrlWrapper(getContactController));

contactRouter.post(
  '/contacts',
  jsonParser,
  ctrlWrapper(createContactController),
);

contactRouter.patch(
  '/contacts/:contactId/phoneNumber',
  jsonParser,
  ctrlWrapper(changeContactPhoneNumberController),
);

contactRouter.delete(
  '/contacts/:contactId',
  ctrlWrapper(deleteContactController),
);

export default contactRouter;
