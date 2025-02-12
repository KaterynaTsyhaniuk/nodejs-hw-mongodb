import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'any.required': 'Name is required',
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be at most 30 characters long',
    'string.empty': 'Name cannot be empty',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Invalid email format',
    'string.empty': 'Email cannot be empty',
  }),
  password: Joi.string().min(6).max(50).required().messages({
    'any.required': 'Password is required',
    'string.base': 'Password must be a string',
    'string.min': 'Password must be at least 6 characters long',
    'string.max': 'Password must be at most 50 characters long',
    'string.empty': 'Password cannot be empty',
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Invalid email format',
    'string.empty': 'Email cannot be empty',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
    'string.empty': 'Password cannot be empty',
  }),
});

export const sendResetEmailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Invalid email format',
    'string.empty': 'Email cannot be empty',
  }),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().min(6).max(50).required().messages({
    'any.required': 'Password is required',
    'string.base': 'Password must be a string',
    'string.min': 'Password must be at least 6 characters long',
    'string.max': 'Password must be at most 50 characters long',
    'string.empty': 'Password cannot be empty',
  }),
  token: Joi.string().required().messages({
    'any.required': 'Token is required',
    'string.empty': 'Token cannot be empty',
  }),
});
