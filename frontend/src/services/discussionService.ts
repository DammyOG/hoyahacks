import axios from 'axios';

// You'll want to store this in your environment variables
const API_BASE_URL = 'http://localhost:5000/api';

export interface CreateDiscussionDto {
  title: string;
  content: string;
  author: string;
}

export interface CreateReplyDto {
  content: string;
  author: string;
  parentId?: string | null;
}

// We'll mirror our backend interfaces for type safety
export interface IReply {
  _id?: string;
  content: string;
  author: string;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDiscussion {
  _id: string;
  title: string;
  content: string;
  author: string;
  replies: IReply[];
  createdAt: Date;
  updatedAt: Date;
}

export const discussionService = {
  // Fetch all discussions
  async getDiscussions(): Promise<IDiscussion[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/discussions`);
      
      // Add logging to see what the API is returning
      console.log('API Response:', response.data);
      
      // Ensure we always return an array
      if (!Array.isArray(response.data)) {
        console.error('API returned non-array data:', response.data);
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.error('Error in getDiscussions:', error);
      throw error;
    }
  },

  // Create a new discussion
  async createDiscussion(data: CreateDiscussionDto): Promise<IDiscussion> {
    const response = await axios.post(`${API_BASE_URL}/discussions`, data);
    return response.data;
  },

  // Add a reply to a discussion
  async addReply(discussionId: string, data: CreateReplyDto): Promise<IDiscussion> {
    const response = await axios.post(
      `${API_BASE_URL}/discussions/${discussionId}/reply`,
      data
    );
    return response.data;
  }
};