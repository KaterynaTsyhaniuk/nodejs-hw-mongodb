import express from 'express';
import 'dotenv/config';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import cors from 'cors';
import { Contact } from './db/models/contacts.js';

const PORT = Number(getEnvVar('PORT', '3000'));

const app = express();

app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    console.error(error);
  }
});

app.get('/contacts/:contactId', async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    console.error(error);
  }
});

export async function setupServer() {
  try {
    app.use(express.json());

    app.use(cors());

    app.use(
      pino({
        transport: {
          target: 'pino-pretty',
        },
      }),
    );

    app.get('/', (req, res) => {
      res.json({ message: 'Hello Contacts' });
    });

    app.use('*', (req, res, next) => {
      res.status(404).json({ message: 'Not found' });
    });

    app.use((err, req, res, next) => {
      res.status(500).json({
        message: 'Something went wrong',
        error: err.message,
      });
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}
