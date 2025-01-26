// src/components/CreateDiscussion.tsx
import React, { useState } from 'react';
import { discussionService } from '../services/discussionService';

export const CreateDiscussion: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState(''); // In a real app, this would come from auth

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await discussionService.createDiscussion({
        title,
        content,
        author
      });
      // Clear form
      setTitle('');
      setContent('');
      setAuthor('');
      // You might want to trigger a refresh of the discussions list here
    } catch (error) {
      console.error('Error creating discussion:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Author
        </label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="mt-1 block w-full border rounded-md shadow-sm p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border rounded-md shadow-sm p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full border rounded-md shadow-sm p-2"
          rows={4}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Create Discussion
      </button>
    </form>
  );
};