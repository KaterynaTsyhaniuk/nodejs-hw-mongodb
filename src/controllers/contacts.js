import fs from 'node:fs/promises';
import path from 'node:path';

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
import { getEnvVar } from '../utils/getEnvVar.js';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';

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

  if (contact.photo) {
    contact.photoUrl = contact.photo;
  }

  res.json({
    status: 200,
    message: 'Contact received successfully',
    data: contact,
  });
}

export async function createContactController(req, res) {
  console.log(req.file);
  let photo = null;

  if (typeof req.file !== 'undefined') {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      const result = await uploadToCloudinary(req.file.path);
      await fs.unlink(req.file.path);

      photo = result.secure_url;
    } else {
      await fs.rename(
        req.file.path,
        path.resolve('src', 'public/photos', req.file.filename),
      );

      photo = `http://localhost:3000/photos/${req.file.filename}`;
    }
  }
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
    userId: req.user.id,
    photo,
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

  let updatedFields = { ...req.body };

  if (req.file) {
    let photo = null;

    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      const result = await uploadToCloudinary(req.file.path);
      photo = result.secure_url;
    } else {
      const newFilePath = path.resolve(
        'src',
        'public/photos',
        req.file.filename,
      );
      await fs.rename(req.file.path, newFilePath);
      photo = `http://localhost:3000/photos/${req.file.filename}`;
    }

    updatedFields.photo = photo;
  }

  const result = await updateContact(contactId, userId, updatedFields);

  if (!result) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.json({
    status: 200,
    message: `Successfully patched the contact!`,
    data: result.contact,
  });
}
