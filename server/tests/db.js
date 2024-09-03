import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from "mongoose";

let mongod;

export async function initialize() {
  mongod = await MongoMemoryServer.create();
}

export async function connect() {
  const uri = mongod.getUri();
  const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  mongoose.set('strictQuery', true); // Ajoutez cette ligne pour supprimer l'avertissement ( peu causé une erreur )
  await mongoose.connect(uri, mongooseOptions);
}

export async function closeDatabase() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
}

export async function clearDatabase() {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
}

export default {
  initialize,
  connect,
  closeDatabase,
  clearDatabase
}