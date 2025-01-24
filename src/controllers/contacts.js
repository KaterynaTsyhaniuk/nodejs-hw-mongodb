import createHttpError from 'http-errors';
import {
  changeContactPhoneNumber,
  createContact,
  deleteContact,
  getContact,
  getContacts,
} from '../services/contacts.js';

export async function getContactsController(req, res) {
  const contacts = await getContacts();
  res.json(contacts);
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

export async function changeContactPhoneNumberController(req, res) {
  const { contactId } = req.params;
  const { phoneNumber } = req.body;

  const result = await changeContactPhoneNumber(contactId, phoneNumber);

  if (result === null) {
    throw createHttpError(404, 'Contact not found!');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully parched a contact',
    data: result,
  });
}
