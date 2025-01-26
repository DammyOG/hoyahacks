import { Router, Request, Response } from 'express';
import { connectToDatabase } from '../lib/mongodb';
import { S3Client, PutObjectCommand, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import multer from 'multer';
import archiver from 'archiver';
import { Readable } from 'stream';

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
    const relativePath = req.body.relativePath || ''; // Get the relative path from the frontend
    
    // Get user's S3 folder path from MongoDB
    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({ email: userEmail });
    
    if (!user || !user.s3FolderPath) {
      throw new Error('User not found or missing S3 folder path');
    }
    
    // Create the full S3 key including the relative path
    const s3Key = `users/${userEmail}/${relativePath}${file.originalname}`;
    console.log('S3 Key:', s3Key);
    
    await s3Client.send(new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: s3Key,
      Body: file.buffer,
      ContentType: file.mimetype,
    }));
    
    console.log('✅ File uploaded successfully to:', s3Key);
    
    res.json({ 
      success: true, 
      message: 'File uploaded successfully',
      filePath: s3Key 
    });
  } catch (error) {
    console.error('\n❌ Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// Update the project creation endpoint
router.post('/projects', async (req: Request, res: Response) => {
  try {
    const { db } = await connectToDatabase();
    const { email, ...projectData } = req.body;

    // Verify the session matches the email
    const storedSession = req.headers.authorization;
    if (!storedSession || JSON.parse(storedSession).email !== email) {
      res.status(401).json({ error: 'Unauthorized: Session mismatch' });
      return;
    }

    // Find the user
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Check for existing project with same name
    const existingProject = await db.collection('projects').findOne({
      userId: user._id,
      name: projectData.projectname
    });

    if (existingProject) {
      res.status(400).json({ 
        error: 'A project with this name already exists' 
      });
      return;
    }

    console.log('\n=== Creating New Project ===');
    console.log('User:', user.email);
    console.log('Project Name:', projectData.projectname);

    // Create the project document
    const project = {
      userId: user._id,
      name: projectData.projectname,
      description: projectData.projectdescription,
      projectLink: projectData.projectlink,
      githubLink: projectData.githublink,
      tags: projectData.projecttags || [],
      skills: projectData.skills || [],
      files: projectData.filePaths || [], // Array of S3 file paths
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Insert the project
    const result = await db.collection('projects').insertOne(project);
    
    // Update the user's projects array
    await db.collection('users').updateOne(
      { _id: user._id },
      { $addToSet: { projects: result.insertedId } }
    );

    console.log('✅ Project created successfully');
    console.log('Project ID:', result.insertedId);
    console.log('=====================\n');

    res.status(201).json({ 
      success: true, 
      projectId: result.insertedId 
    });

  } catch (error) {
    console.error('\n❌ Error creating project:');
    console.error('Error Details:', error);
    console.error('=====================\n');
    res.status(500).json({ error: 'Failed to create project' });
  }
});

router.post('/upload-project-picture/:email', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file provided');
    }

    const userEmail = req.params.email;
    const projectName = req.body.projectName;
    const file = req.file;
    
    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({ email: userEmail });
    
    if (!user || !user.s3FolderPath) {
      throw new Error('User not found or missing S3 folder path');
    }
    
    // Use a consistent filename for all project pictures
    const s3Key = `users/${projectName}/cover.jpg`;
    
    await s3Client.send(new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: s3Key,
      Body: file.buffer,
      ContentType: 'image/jpeg',
    }));
    
    res.json({ 
      success: true, 
      filePath: s3Key 
    });
  } catch (error) {
    console.error('Error uploading project picture:', error);
    res.status(500).json({ error: 'Failed to upload project picture' });
  }
});

// Update the projects endpoint to use the user's projects array
router.get('/:email/projects', async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({ email: req.params.email });
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Get all projects referenced in user's projects array
    const projectIds = user.projects || [];
    const projects = await db.collection('projects')
      .find({ _id: { $in: projectIds } })
      .toArray();

    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Update the download endpoint
router.get('/download-project/:projectName', async (req, res) => {
  try {
    const projectName = req.params.projectName;
    
    // Create a zip archive
    const archive = archiver('zip', {
      zlib: { level: 9 }
    });

    // Set response headers
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename=${projectName}.zip`);

    // Pipe archive data to the response
    archive.pipe(res);

    // Get all files from S3 for this project
    const listParams = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Prefix: `users/${projectName}/`
    };

    const s3Files = await s3Client.send(new ListObjectsV2Command(listParams));
    
    // Add each file to the archive
    for (const file of s3Files.Contents || []) {
      const fileData = await s3Client.send(new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: file.Key!
      }));
      
      // Convert the ReadableStream to a Buffer
      const chunks: Uint8Array[] = [];
      for await (const chunk of fileData.Body as Readable) {
        chunks.push(chunk);
      }
      const buffer = Buffer.concat(chunks);

      // Remove the prefix from the filename
      const fileName = file.Key!.replace(`users/${projectName}/`, '');
      archive.append(buffer, { name: fileName });
    }

    await archive.finalize();
  } catch (error) {
    console.error('Error downloading project:', error);
    res.status(500).json({ error: 'Failed to download project' });
  }
});

export default router; 