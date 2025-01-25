import { connectToDatabase } from '../lib/mongodb';
import { User } from '../types/mongodb';
import { ObjectId } from 'mongodb';

async function testConnection() {
  try {
    const { client, db } = await connectToDatabase();
    console.log('🔌 Successfully connected to MongoDB!\n');
    
    // Create a test user
    const testUser: Partial<User> = {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      skills: ["JavaScript", "TypeScript", "MongoDB"],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    console.log('Creating test user...');
    const result = await db.collection('users').insertOne(testUser);
    console.log('User created with ID:', result.insertedId, '\n');

    // Fetch and display the user
    console.log('Fetching user details...');
    const foundUser = await db.collection('users').findOne({ _id: result.insertedId });
    console.log('User details:', JSON.stringify(foundUser, null, 2), '\n');

    // Delete the test user
    console.log('Cleaning up - deleting test user...');
    await db.collection('users').deleteOne({ _id: result.insertedId });
    console.log('Test user deleted\n');

    // Verify deletion
    const verifyDeletion = await db.collection('users').findOne({ _id: result.insertedId });
    console.log(verifyDeletion ? 'User still exists' : 'User successfully deleted');

    await client.close();
    console.log('\nDatabase connection closed');
  } catch (error) {
    console.error('Error:', error);
  }
}

testConnection();