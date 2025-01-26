import React from 'react'
import SpotlightCreator from './spotlightcreator'

const Spotlight = () => {
    const categories = [
        {
            title: 'Spotlight',
            cards: [
                { title: 'King', content: 'Hola', img: '/images/icon.png' },
                { title: 'Queen', content: 'Hello', img: '/images/image.png' },
                { title: 'Prince', content: 'Hi', img: '/images/icon.png' },
                { title: 'Princess', content: 'Hey', img: '/images/image.png' },
            ],
        },
        {
            title: 'Mobile App Development',
            cards: [
                { title: 'App1', content: 'Mobile Dev', img: '/images/icon.png' },
                { title: 'App2', content: 'Mobile Dev', img: '/images/image.png' },
                { title: 'App3', content: 'Mobile Dev', img: '/images/icon.png' },
            ],
        },
        {
            title: 'Web Development',
            cards: [
                { title: 'Web1', content: 'Web Dev', img: '/images/image.png' },
                { title: 'Web2', content: 'Web Dev', img: '/images/icon.png' },
            ],
        },
    ]

    return (
        <SpotlightCreator categories={categories} />
    )
}

export default Spotlight
