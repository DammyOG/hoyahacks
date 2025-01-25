import { MongoClient } from 'mongodb';
import { MongoConnection } from '../types/mongodb';
import dotenv from 'dotenv';
import path from 'path';

// Load .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Get the MongoDB connection string from environment variables
const uri = process.env.MONGODB_URI!;
// Additional MongoDB connection options can be added here
const options = {};

// Cache the database connection to avoid creating new connections on every request
let cachedClient: MongoClient | null = null;
let cachedDb: MongoConnection | null = null;

// Validate that the MongoDB URI exists in environment variables
if(!process.env.MONGODB_URI){
   throw new Error("Please add the MongoDB URI to .env file");
}

// Function to connect to MongoDB and return the connection
export async function connectToDatabase(): Promise<MongoConnection> {
  // If we already have a connection, return it instead of creating a new one
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb.db };
  }

  // Create a new connection to MongoDB
  const client = await MongoClient.connect(uri, options);
  // Get a reference to the database
  const db = client.db(process.env.MONGODB_DB);

  // Cache the client and db connection for future use
  cachedClient = client;
  cachedDb = { client, db };

  // Return the connection details
  return { client, db };
}
