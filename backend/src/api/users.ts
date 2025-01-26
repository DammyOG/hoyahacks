import { Router } from 'express';
import { connectToDatabase } from '../lib/mongodb';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import multer from 'multer';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

const s3Client = new S3Client({ 
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
});

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

    console.log('\n=== New User Created ===');
    console.log('User ID:', result.insertedId);
    console.log('User Details:', {
      name: newUser.name,
      email: newUser.email,
      skills: newUser.skills,
      s3FolderPath: newUser.s3FolderPath,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt
    });
    console.log('✅ MongoDB document created successfully');
    console.log('=====================\n');

    // Fetch and log the complete user document
    const createdUser = await collection.findOne({ _id: result.insertedId });
    console.log('Complete User Schema:', JSON.stringify(createdUser, null, 2));

    res.status(201).json({ success: true, userId: result.insertedId });
  } catch (error) {
    console.error('\n❌ Error creating user:');
    console.error('User Details:', req.body);
    console.error('Error Details:', error);
    console.error('=====================\n');
    res.status(500).json({ error: 'Failed to create user' });
  }
});

router.get('/:email', async (req, res) => {
  try {
    const { client, db } = await connectToDatabase();
    const collection = db.collection('users');

    const user = await collection.findOne({ email: req.params.email });
    if (!user) {
      console.log('\n❌ User not found for email:', req.params.email);
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Log user data
    console.log('\n=== User Data Fetched ===');
    console.log('Name:', user.name);
    console.log('Email:', user.email);
    console.log('=====================\n');

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

router.post('/create-folder', async (req, res) => {
  try {
    // Validate environment variables
    if (!process.env.AWS_BUCKET_NAME) {
      throw new Error('AWS_S3_BUCKET environment variable is not set');
    }

    const { email } = req.body;
    const folderKey = `users/${email}/`;
    
    console.log('\n=== Creating S3 Folder ===');
    console.log('User Email:', email);
    console.log('Folder Path:', folderKey);
    console.log('Using Bucket:', process.env.AWS_BUCKET_NAME);
    
    // Create an empty object to simulate a folder in S3
    await s3Client.send(new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: folderKey,
      Body: '', // Empty content
    }));

    console.log('✅ S3 folder created successfully');
    console.log('Bucket:', process.env.AWS_BUCKET_NAME);
    console.log('=====================\n');

    res.json({ success: true, s3Path: folderKey });
  } catch (error) {
    console.error('\n❌ Error creating S3 folder:');
    console.error('User Email:', req.body.email);
    console.error('Error Details:', error);
    console.error('=====================\n');
    res.status(500).json({ error: 'Failed to create S3 folder' });
  }
});

// Add this new endpoint for file uploads
router.post('/upload/:email', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file provided');
    }

    const userEmail = req.params.email;
    const file = req.file;
    
    console.log('\n=== Uploading File to S3 ===');
    console.log('User Email:', userEmail);
    console.log('File Name:', file.originalname);
    
    // Get user's S3 folder path from MongoDB
    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({ email: userEmail });
    
    if (!user || !user.s3FolderPath) {
      throw new Error('User not found or missing S3 folder path');
    }
    
    // Create the full S3 key (path + filename)
    const s3Key = `${user.s3FolderPath}${file.originalname}`;
    console.log('S3 Key:', s3Key);
    
    // Upload to S3
    await s3Client.send(new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: s3Key,  // This will now be like "users/email@example.com/filename.txt"
      Body: file.buffer,
      ContentType: file.mimetype,
    }));
    
    console.log('✅ File uploaded successfully to:', s3Key);
    console.log('=====================\n');
    
    res.json({ 
      success: true, 
      message: 'File uploaded successfully',
      filePath: s3Key 
    });
    
  } catch (error) {
    console.error('\n❌ Error uploading file:');
    console.error('Error Details:', error);
    console.error('=====================\n');
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

export default router; 