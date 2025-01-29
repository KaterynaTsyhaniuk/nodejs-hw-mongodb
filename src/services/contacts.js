import { Contact } from '../db/models/contacts.js';

export async function getContacts({ page, perPage, sortBy, sortOrder }) {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const [total, contacts] = await Promise.all([
    Contact.countDocuments(),
    Contact.find()
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPages = Math.ceil(total / perPage);

  return {
    data: contacts,
    page,
    perPage,
    totalItem: total,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: totalPages - page > 0,
  };
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

export async function updateContact(contactId, payload, options = {}) {
  const rawResult = await Contact.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
}
