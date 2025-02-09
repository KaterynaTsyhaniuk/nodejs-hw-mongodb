import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getContact,
  getContacts,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export async function getContactsController(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const data = await getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user.id,
  });

  res.status(200).json({
    status: 200,
    message: 'Contacts received successfully',
    data,
  });
}

export async function getContactController(req, res, next) {
  const { contactId } = req.params;

  const contact = await getContact(contactId, req.user.id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  if (!contact.userId || contact.userId.toString() !== req.user.id.toString()) {
    return next(new createHttpError.Forbidden('Contact is forbidden'));
  }

  res.json({
    status: 200,
    message: 'Contact received successfully',
    data: contact,
  });
}

export async function createContactController(req, res) {
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
    userId: req.user.id,
  };

  const result = await createContact(contact);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: result,
  });
}

export async function deleteContactController(req, res) {
  const { contactId } = req.params;
  const userId = req.user?._id || req.body.userId;

  const result = await deleteContact(contactId, userId, req.body);

  if (result === null) {
    throw createHttpError(404, 'Contact not found!');
  }

  res.status(200).json({
    status: 200,
    message: 'Contact  deleted successfully',
    data: result,
  });
}

export async function patchContactController(req, res, next) {
  const { contactId } = req.params;
  const userId = req.user?._id || req.body.userId;

  if (!userId) {
    return next(createHttpError(400, 'User ID is required'));
  }

  const result = await updateContact(contactId, userId, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a student!`,
    data: result.contact,
  });
}
