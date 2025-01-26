// src/components/DiscussionThread.tsx
import React, { useState } from 'react';
import { IDiscussion, IReply, discussionService } from '../services/discussionService';

interface DiscussionThreadProps {
  discussion: IDiscussion;
  onUpdate: () => void;
}

export const DiscussionThread: React.FC<DiscussionThreadProps> = ({ 
  discussion,
  onUpdate 
}) => {
  const [replyContent, setReplyContent] = useState('');
  const [replyAuthor, setReplyAuthor] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleReplySubmit = async (parentId: string | null = null) => {
    try {
      await discussionService.addReply(discussion._id, {
        content: replyContent,
        author: replyAuthor,
        parentId
      });
      setReplyContent('');
      setReplyAuthor('');
      setReplyingTo(null);
      onUpdate();
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  // Helper function to organize replies into threads
  const getRepliesForParent = (parentId: string | null): IReply[] => {
    return discussion.replies.filter(reply => 
      String(reply.parentId) === String(parentId)
    );
  };

  const renderReplies = (parentId: string | null = null, depth: number = 0) => {
    const replies = getRepliesForParent(parentId);
    
    
    return replies.map(reply => {
        const replyId = reply._id ?? null;
        return (
            <div 
              key={reply._id} 
              className={`ml-${depth * 4} mt-2 p-2 border-l-2`}
            >
              <div className="font-bold">{reply.author}</div>
              <div className="mt-1">{reply.content}</div>
              <button
                onClick={() => setReplyingTo(replyId)}
                className="text-blue-500 text-sm mt-1"
              >
                Reply
              </button>
              {replyingTo === reply._id && (
                <div className="mt-2">
                  {/* Reply form */}
                  <input
                    type="text"
                    placeholder="Your name"
                    value={replyAuthor}
                    onChange={(e) => setReplyAuthor(e.target.value)}
                    className="block w-full border rounded-md p-2 mb-2"
                  />
                  <textarea
                    placeholder="Your reply"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="block w-full border rounded-md p-2 mb-2"
                  />
                  <button
                    onClick={() => handleReplySubmit(reply._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Submit Reply
                  </button>
                </div>
              )}
              {renderReplies(reply._id, depth + 1)}
            </div>
          )
    });
  };

  return (
    <div className="border rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold">{discussion.title}</h2>
      <div className="mt-2">
        <span className="text-gray-600">Posted by {discussion.author}</span>
      </div>
      <div className="mt-4">{discussion.content}</div>
      
      {/* Reply to main discussion */}
      <div className="mt-4">
        <button
          onClick={() => setReplyingTo('main')}
          className="text-blue-500"
        >
          Reply to Discussion
        </button>
      </div>
      
      {replyingTo === 'main' && (
        <div className="mt-4">
          <input
            type="text"
            placeholder="Your name"
            value={replyAuthor}
            onChange={(e) => setReplyAuthor(e.target.value)}
            className="block w-full border rounded-md p-2 mb-2"
          />
          <textarea
            placeholder="Your reply"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="block w-full border rounded-md p-2 mb-2"
          />
          <button
            onClick={() => handleReplySubmit(null)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Submit Reply
          </button>
        </div>
      )}
      
      {/* Render all replies */}
      <div className="mt-4">
        {renderReplies(null)}
      </div>
    </div>
  );
};