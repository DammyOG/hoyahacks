import { Router } from 'express';
import { connectToDatabase } from '../lib/mongodb';
import { User } from '../types/mongodb';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { client, db } = await connectToDatabase();
    const collection = db.collection('users');

    const newUser = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(newUser);

    // Log the new user details
    console.log('\n=== New User Created ===');
    console.log('User ID:', result.insertedId);
    console.log('User Details:', {
      name: newUser.name,
      email: newUser.email,
      skills: newUser.skills,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt
    });
    console.log('=====================\n');

    // Fetch and log the complete user document
    const createdUser = await collection.findOne({ _id: result.insertedId });
    console.log('Complete User Schema:', JSON.stringify(createdUser, null, 2));

    res.status(201).json({ success: true, userId: result.insertedId });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

export default router; 