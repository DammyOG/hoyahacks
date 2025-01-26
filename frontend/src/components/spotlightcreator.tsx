import React from 'react'
import HomeCard from './homeCard'
import { CardTitle } from './ui/card'
import './spotlight.css'

interface SpotlightCategory {
    title: string
    cards: {
        title: string
        content: string
        img: string
    }[]
}

interface SpotlightProps {
    categories: SpotlightCategory[]
}

const SpotlightCreator: React.FC<SpotlightProps> = ({ categories }) => {
    return (
        <div className='w-full xl:w-3/5 flex flex-col gap-4 ml-4 text-white'>
            {categories.map((category, index) => (
                <div key={index} className='space-y-4'>
                    <CardTitle>{category.title}</CardTitle>
                    <div className='flex gap-3 overflow-x-auto hide-scrollbar'>
                        {category.cards.map((card, idx) => (
                            <HomeCard
                                key={idx}
                                title={card.title}
                                content={card.content}
                                img={card.img}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SpotlightCreator
