// src/api/routes/discussionRoutes.ts
import express, { Router } from 'express';  // Add Router type import
import { discussionController } from '../controllers/discussionController';

// Create the router with explicit typing
const router: Router = express.Router();

// Now TypeScript knows these are route handlers
router.post('/', discussionController.createDiscussion);
router.get('/', discussionController.getDiscussions);
router.post('/:discussionId/reply', discussionController.addReply);

export default router;