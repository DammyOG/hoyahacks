import { PutObjectCommand } from "@aws-sdk/client-s3";
import multer from "multer";
import { Router, Request, Response } from 'express';
import { s3Client } from '../../config/aws';

const router = Router();

// Configure multer for handling multiple files
const upload = multer({ storage: multer.memoryStorage() });

// Define interface for typed request
interface MulterRequest extends Request {
  files: Express.Multer.File[];
}

router.post('/', upload.array('files'), (req: Request, res: Response) => {
    const files = (req as any).files as Express.Multer.File[];
    
    if (!files || !Array.isArray(files)) {
        res.status(400).json({ error: 'No files uploaded' });
        return;
    }

    const uploadPromises = files.map(async (file) => {
        // Get the file path from the original name (includes folder structure)
        const key = file.originalname;

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        try {
            await s3Client.send(new PutObjectCommand(params));
            return { filename: key, status: 'success' };
        } catch (error) {
            console.error(`Error uploading ${key}:`, error);
            return { filename: key, status: 'error', error };
        }
    });

    Promise.all(uploadPromises)
        .then(results => res.json({ message: 'Upload complete', results }))
        .catch(error => {
            console.error('Upload error:', error);
            res.status(500).json({ error: 'Upload failed' });
        });
});

export default router;