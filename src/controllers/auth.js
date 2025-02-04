import { registerUser } from '../services/auth.js';

export async function registerController(req, res) {
  const payload = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const userRegister = await registerUser(payload);

  res.json({
    status: 201,
    message: 'Successfully registered a user!',
    data: userRegister,
  });
}
