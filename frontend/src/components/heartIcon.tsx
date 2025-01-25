import React, { useState } from "react";
import { Heart } from "lucide-react";

const HeartIcon = () => {
    const [liked, setLiked] = useState(false);

    const handleClick = () => {
        setLiked(!liked);
    };

    return (
        <div
            onClick={handleClick}
            className={`absolute right-2 top-2 bg-white/85 p-2 rounded-full size-11 flex items-center justify-center cursor-pointer ${liked ? "animate-in" : "animate-out"
                }`}
        >
            <Heart
                size={24}
                fill={liked ? "red" : "none"}
                stroke={liked ? "red" : "black"}
                className={`transition - transform duration - 300 ${liked ? "scale-125" : "scale-100"
                    } `}
            />
        </div>
    );
};

export default HeartIcon;
