export interface Project {
  _id?: string;
  userId: string;
  name: string;
  description?: string;
  projectLink?: string;
  githubLink?: string;
  tags: string[];
  skills: string[];
  files: string[];
  projectPicture?: string;
  createdAt: Date;
  updatedAt: Date;
} 