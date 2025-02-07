import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const contactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'any.only': 'Contact name is required',
    'string.base': 'Contact name must be a string',
    'string.min': 'Contact name length must be at least 3 characters long',
    'string.empty': 'Contact name is not allowed to be empty',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'any.only': 'Contact phoneNumber name is required',
    'string.base': 'Contact phoneNumber must be a string',
    'string.min':
      'Contact phoneNumber length must be at least 3 characters long',
    'string.empty': 'Contact phoneNumber is not allowed to be empty',
  }),
  email: Joi.string().min(3).max(20).messages({
    'any.only': 'Contact email is required',
    'string.base': 'Contact email must be a string',
    'string.min': 'Contact email length must be at least 3 characters long',
    'string.empty': 'Contact email is not allowed to be empty',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'Contact "isFavourite" must be a boolean',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'any.only': 'contactType must be one of [work, home, personal]',
      'string.empty': 'contactType is not allowed to be empty',
    }),
  userId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('User id should be a valid mongo id');
    }
    return true;
  }),
});
