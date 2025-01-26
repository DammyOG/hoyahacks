import express, { Request, Response } from 'express';
import multer from 'multer';
import cors from 'cors';
import { s3Client } from '../../config/aws';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import uploadRouter from './upload';
import usersRouter from './users';

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

app.use('/upload', uploadRouter);
app.use('/api/users', usersRouter);

app.post("/upload", upload.array("files"), async (req: Request, res: Response) => {
  try {
    if (!req.files || !(req.files as Express.Multer.File[]).length) {
      res.status(400).json({ error: "No files uploaded" });
      return;
    }

    const files = req.files as Express.Multer.File[];

    //Decide on some folder name... going to be random for now but will update on this later based off of user
    const folderName = `folder-${randomUUID()}`;
    const folderKey = `uploads/${folderName}/`;

    // Create an empty object so that S3 console shows it as a folder
    await s3Client.send(
        new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: folderKey,
            Body: ''

        })
    );
    const uploadedUrls: string[] = [];

    // For each file, upload it to S3
    for (const file of files) {
      // file.originalname will match the name we appended in FormData
      // If we used `file.webkitRelativePath`, that string will be stored as `originalname`.
      // So something like: "folderA/subfolderB/filename.png"

      // Construct the S3 key to include "uploads/" plus the path
      // e.g. uploads/folderA/subfolderB/filename.png

      const objectKey = `${folderKey}${file.originalname}`;

      const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: objectKey,
        Body: file.buffer,
        ContentType: file.mimetype,
      });

      await s3Client.send(command);

      // Build the file's public URL (assuming your bucket isn't restricted)
      const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${objectKey}`;
      uploadedUrls.push(url);
    }

    res.json({
      message: "Files uploaded successfully",
      urls: uploadedUrls,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

app.get("/", (_req: Request, res: Response) => {
    res.status(200).send("Backend running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});