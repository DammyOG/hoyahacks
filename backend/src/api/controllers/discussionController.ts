// src/api/controllers/discussionController.ts
import { Request, Response } from 'express';
import { Discussion, IDiscussion, IReplyBase } from '../../lib/models/Discussion';
import mongoose from 'mongoose';

// Define the expected parameters type for the reply route
interface ReplyParams {
  discussionId: string;
}

export const discussionController = {
  // Create a new discussion
  createDiscussion: async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, content, author } = req.body;
      const discussion = new Discussion({
        title,
        content,
        author
      });
      await discussion.save();
      res.status(201).json(discussion);
    } catch (error) {
      res.status(500).json({ message: 'Error creating discussion', error });
    }
  },

  // Get all discussions
  async getDiscussions(req: Request, res: Response): Promise<void> {
    try {
      // Check database connection
      if (mongoose.connection.readyState !== 1) {
        console.error('Database connection not established');
        res.status(500).json({ 
          message: 'Database connection error',
          details: 'MongoDB connection not established'
        });
        return; // Explicit return after sending response
      }

      console.log('Attempting to fetch discussions...');
      const discussions = await Discussion.find().sort({ createdAt: -1 });
      console.log('Discussions fetched successfully:', discussions);
      
      res.json(discussions);
      return; // Explicit return after sending response
    } catch (error) {
      console.error('Error in getDiscussions:', error);
      
      res.status(500).json({
        message: 'Error fetching discussions',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : '') : undefined
      });
      return; // Explicit return after sending error response
    }
  },

  // Add a reply to a discussion
  addReply: async (req: Request<ReplyParams>, res: Response): Promise<void> => {
    try {
      const { discussionId } = req.params;
      const { content, author, parentId } = req.body;
      
      const discussion = await Discussion.findById(discussionId);
      if (!discussion) {
        res.status(404).json({ message: 'Discussion not found' });
        return;
      }

      const newReply: IReplyBase = {
        content,
        author,
        parentId: parentId ? new mongoose.Types.ObjectId(parentId) : null,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      discussion.replies.push(newReply);
      await discussion.save();
      res.json(discussion);
    } catch (error) {
      res.status(500).json({ message: 'Error adding reply', error });
    }
  }
};