// src/pages/discussions/index.tsx
import { CreateDiscussion } from '@/components/CreateDiscussion';
import { DiscussionThread } from '@/components/DiscussionThread';
import { discussionService, IDiscussion } from '@/services/discussionService';
import { useEffect, useState } from 'react';


export default function DiscussionsPage() {
  // Initialize with empty array to ensure discussions is always an array
  const [discussions, setDiscussions] = useState<IDiscussion[]>([]);
  // Add loading state to handle initial data fetch
  const [isLoading, setIsLoading] = useState(true);
  // Add error state to handle potential errors
  const [error, setError] = useState<string | null>(null);

  const fetchDiscussions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await discussionService.getDiscussions();
      
      // Add a check to ensure data is an array
      if (!Array.isArray(data)) {
        console.error('Received non-array data:', data);
        setError('Invalid data format received from server');
        setDiscussions([]); // Fallback to empty array
        return;
      }
      
      setDiscussions(data);
    } catch (error) {
      console.error('Error fetching discussions:', error);
      setError('Failed to fetch discussions');
      setDiscussions([]); // Fallback to empty array
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscussions();
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Discussions</h1>
        <div>Loading discussions...</div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Discussions</h1>
        <div className="text-red-500">{error}</div>
        <button 
          onClick={fetchDiscussions}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Discussions</h1>
      <CreateDiscussion />
      <div className="mt-8">
        {/* Add additional check before mapping */}
        {Array.isArray(discussions) && discussions.length > 0 ? (
          discussions.map(discussion => (
            <DiscussionThread
              key={discussion._id}
              discussion={discussion}
              onUpdate={fetchDiscussions}
            />
          ))
        ) : (
          <div className="text-gray-500">No discussions yet. Be the first to create one!</div>
        )}
      </div>
    </div>
  );
}