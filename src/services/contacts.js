import { Contact } from '../db/models/contacts.js';
import { SORT_ORDER } from '../index.js';

export async function getContacts({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
}) {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactsQuery = Contact.find();

  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  const [total, contacts] = await Promise.all([
    Contact.countDocuments(contactsQuery),
    contactsQuery
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
