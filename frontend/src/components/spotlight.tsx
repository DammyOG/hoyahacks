import React from 'react'
import HomeCard from './homeCard'
import { CardTitle } from './ui/card'

const Spotlight = () => {
    return (
        <div className='w-full xl:w-3/5 flex flex-col gap-4 ml-4 text-white'>
            <div className='space-y-4'>
                <CardTitle className='pt-10'> Spotlight</CardTitle>
                <div className='flex pl-3 gap-9 oveflow-x-auto'>
                    <HomeCard title='Sample Project Name' content='This project does things. Things are important. Things inspire.' img='/images/tech.jpeg' />
                    <HomeCard title='Sample Project Name' content='This project does things. Things are important. Things inspire.' img='/images/tech.jpeg' />
                    <HomeCard title='Sample Project Name' content='This project does things. Things are important. Things inspire.' img='/images/tech.jpeg' />
                </div>
            </div>
            <div className='space-y-4'>
                <CardTitle className='pt-10'>Mobile App Development</CardTitle>
                <div className='flex pl-3 gap-9 oveflow-x-auto'>
                    <HomeCard title='Sample Project Name' content='This project does things. Things are important. Things inspire.' img='/images/tech.jpeg' />
                    <HomeCard title='Sample Project Name' content='This project does things. Things are important. Things inspire.' img='/images/tech.jpeg' />
                    <HomeCard title='Sample Project Name' content='This project does things. Things are important. Things inspire.' img='/images/tech.jpeg' />
                </div>
            </div>
            <div className='space-y-4 '>
                <CardTitle className='pt-10'> Web Development</CardTitle>
                <div className='flex pl-3 gap-9 oveflow-x-auto'>
                    <HomeCard title='Sample Project Name' content='This project does things. Things are important. Things inspire.' img='/images/tech.jpeg' />
                    <HomeCard title='Sample Project Name' content='This project does things. Things are important. Things inspire.' img='/images/tech.jpeg' />
                    <HomeCard title='Sample Project Name' content='Hola' img='/images/tech.jpeg' />
                </div>
            </div>
        </div >
        //  Add your props here

    )
}

export default Spotlight