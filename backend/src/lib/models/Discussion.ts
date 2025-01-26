// src/lib/models/Discussion.ts
import mongoose, { Schema, Document } from 'mongoose';

// Base interface for reply data
export interface IReplyBase {
  content: string;
  author: string;
  parentId: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

// Interface that extends Document for Mongoose
export interface IReply extends IReplyBase, Document {}

// Base interface for discussion data
export interface IDiscussionBase {
  title: string;
  content: string;
  author: string;
  replies: IReplyBase[];  // Note: Changed from IReply[] to IReplyBase[]
  createdAt: Date;
  updatedAt: Date;
}

// Interface that extends Document for Mongoose
export interface IDiscussion extends IDiscussionBase, Document {}

const ReplySchema = new Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
  parentId: { type: Schema.Types.ObjectId, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const DiscussionSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  replies: [ReplySchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Discussion = mongoose.model<IDiscussion>('Discussion', DiscussionSchema);