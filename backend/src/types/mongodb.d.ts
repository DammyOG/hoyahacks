import { PolicyStatus } from '@aws-sdk/client-s3';
import { Collection, Db, MongoClient, ObjectId } from 'mongodb';

declare global {
  namespace NodeJS {
    interface Global {
      mongodb: {
        conn: MongoClient | null;
        promise: Promise<MongoClient> | null;
      }
    }
  }
}
export interface User {
   _id:ObjectId;
   name: string;
   email:string;
   password:string;
   profilePic?: string;
   major?: string;
   bio?:string;
   skills: string[];
   resume?: string;
   createdAt: Date;
   updatedAt: Date;
}

export interface Project{
   _id: ObjectId;
   title: string;
   description: string;
   ownerId: ObjectId;
   teamMembers: ObjectId[];
   tags:string;
   files: {fileName: string; fileUrl: string}[];
   likes: number;
   createdAt: Date;
}

export interface JobApp{
   _id: ObjectId;
  userId: ObjectId;
  jobId: ObjectId;
  resume: string;
  coverLetter?: string;
  status: "pending" | "accepted" | "rejected";
  appliedAt: Date;
}

export interface JobPost {
  _id: ObjectId;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary?: string;
  postedBy: ObjectId;
  postedAt: Date;
}

export interface Collab {
  _id: ObjectId;
  projectId: ObjectId;
  userId: ObjectId;
  status: "pending" | "approved" | "rejected";
  message: string;
  createdAt: Date;
}

export interface Message {
  _id: ObjectId;
  senderId: ObjectId;
  receiverId: ObjectId;
  message: string;
  seen: boolean;
  sentAt: Date;
}

export interface Post {
  _id: ObjectId;
  userId: ObjectId;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: {
    userId: ObjectId;
    text: string;
    commentedAt: Date;
  }[];
  createdAt: Date;
}

export interface File {
  _id: ObjectId;
  userId: ObjectId;
  fileName: string;
  fileType: string;
  fileUrl: string;
  uploadedAt: Date;
}

export interface MongoConnection {
  client: MongoClient;
  db: Db;
}

export interface Collections {
  files: Collection<File>;
  users: Collection<User>;
  projects: Collection<Project>;
  jobApps: Collection<JobApp>;
  jobPosts: Collection<JobPost>;
  collabs: Collection<Collab>;
  messages: Collection<Message>;
  posts: Collection<Post>;

  // Add other collections as needed
} 