import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";

// Type for our enhanced request including files
interface MulterRequest extends NextApiRequest {
    files: Express.Multer.File[];
}

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!, // Fixed typo in ACCESS
    }
});

// Create multer middleware
const upload = multer({ storage: multer.memoryStorage() });

// Promisify multer middleware
const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: any) => {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
};

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Run multer
        await runMiddleware(req, res, upload.array('files'));
        
        const typedReq = req as MulterRequest;
        const files = typedReq.files;
        const folderName = req.body?.folder || "uploads";

        await Promise.all(
            files.map(async (file) => {
                const params = {
                    Bucket: process.env.AWS_BUCKET_NAME!,
                    Key: `${folderName}/${file.originalname}`,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                };

                await s3.send(new PutObjectCommand(params));
            })
        );

        return res.status(200).json({ message: "Files uploaded successfully" });

    } catch (error) {
        console.error("Error uploading files:", error);
        return res.status(500).json({ error: "Upload failed" });
    }
}

export const config = {
    api: {
        bodyParser: false, // Multer handles the multipart data
    },
};

export default handler;