import { Contact } from '../db/models/contacts.js';

export function getContacts() {
  return Contact.find();
}

export function getContact(contactId) {
  return Contact.findById(contactId);
}

export function createContact(contact) {
  return Contact.create(contact);
}

export function deleteContact(contactId) {
  return Contact.findByIdAndDelete(contactId);
}

export function changeContactPhoneNumber(contactId, phoneNumber) {
  return Contact.findByIdAndUpdate(contactId, { phoneNumber }, { new: true });
}
