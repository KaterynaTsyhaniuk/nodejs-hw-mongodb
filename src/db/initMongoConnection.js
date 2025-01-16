import mongoose from 'mongoose';

const DB_URI =
  'mongodb+srv://kyzkakatryska:nIsGuTmiuKBTj2v7@clusterkate.9ibcv.mongodb.net/contacts?retryWrites=true&w=majority&appName=ClusterKaTe';

async function initMangoConnection() {
  try {
    await mongoose.connect(DB_URI);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { initMangoConnection };
