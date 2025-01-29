import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getContact,
  getContacts,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export async function getContactsController(req, res) {
  // console.log(req.query);

  const { page, perPage } = parsePaginationParams(req.query);

  console.log({ page, perPage });

  const data = await getContacts({ page, perPage });
  res.status(200).json({
    status: 200,
    message: 'Contacts received successfully',
    data,
  });
}

export async function getContactController(req, res) {
  const { contactId } = req.params;

  const contact = await getContact(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
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

  const result = await deleteContact(contactId);

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
  const result = await updateContact(contactId, req.body);

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
