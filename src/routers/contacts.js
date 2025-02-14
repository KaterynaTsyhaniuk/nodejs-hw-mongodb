import express from 'express';
// import { Router } from 'express';
import {
  getContactController,
  getContactsController,
  createContactController,
  deleteContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { contactSchema } from '../validation/contacts.js';
import { upload } from '../middlewares/upload.js';

const contactRouter = express.Router();
const jsonParser = express.json();

contactRouter.get('/', ctrlWrapper(getContactsController));

contactRouter.get('/:contactId', isValidId, ctrlWrapper(getContactController));

contactRouter.post(
  '/',
  upload.single('photo'),
  jsonParser,
  validateBody(contactSchema),
  ctrlWrapper(createContactController),
);

contactRouter.patch(
  '/:contactId',
  upload.single('photo'),
  isValidId,
  jsonParser,
  validateBody(contactSchema),
  ctrlWrapper(patchContactController),
);

contactRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default contactRouter;
