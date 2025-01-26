import Profile from '@/app/profile/page'
import React, { useState } from 'react'
import { CardDescription, CardTitle } from './ui/card'
import { Heart, Star } from 'lucide-react'

interface DiscussionClipProps {
    name: string,
    title: string,
    description: string,
    likeCount: number,
    starCount: number,
}

const DiscussionClip: React.FC<DiscussionClipProps> = ({ name, title, description, likeCount, starCount }: DiscussionClipProps) => {
    const [likes, setLikes] = useState(likeCount)
    const [stars, setStars] = useState(starCount)
    const [liked, setLiked] = useState(false)
    const [starred, setStarred] = useState(false)

    // Handle like button click
    const handleLike = () => {
        setLiked(!liked)
        setLikes(liked ? likes - 1 : likes + 1)
    }

    // Handle star button click
    const handleStar = () => {
        setStarred(!starred)
        setStars(starred ? stars - 1 : stars + 1)
    }

    return (
        <div className='w-5/6 bg-[#fdfdfd25] h-48 mx-auto flex flex-col gap-4 p-4 rounded-lg'>
            <div className='flex items-center text-white'>
                <Profile />
                {name}
            </div>
            <CardTitle className='text-2xl text-white'>{title}</CardTitle>
            <CardDescription className='text-lg text-white'>{description}</CardDescription>
            <div className='flex space-x-8'>
                {/* Like Button */}
                <span className={`flex items-center cursor-pointer ${liked ? 'text-red-600' : 'text-gray-600'} transition-all duration-300`} onClick={handleLike}>
                    <Heart
                        size={20}
                        className={`transform ${liked ? 'scale-125' : ''} 
                    transition-all duration-300`}
                        fill={liked ? "red" : "none"}
                        stroke={liked ? "red" : "black"} />
                    <span className="ml-2">{likes}</span>
                </span>

                {/* Star Button */}
                <span className={`flex items-center cursor-pointer ${starred ? 'text-black' : 'text-gray-600'} transition-all duration-300`} onClick={handleStar}>
                    <Star
                        size={20}
                        fill={starred ? "black" : "none"}
                        stroke={starred ? "black" : "white"}

                        className={`transform ${starred ? 'scale-125' : ''} transition-all duration-300`} />
                    <span className="ml-2">{stars}</span>
                </span>
            </div>
        </div>
    )
}

export default DiscussionClip
