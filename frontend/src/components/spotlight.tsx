import React from 'react'
import HomeCard from './homeCard'
import { CardTitle } from './ui/card'

const Spotlight = () => {
    return (
        <div className='w-full xl:w-3/5 flex flex-col gap-4 ml-4 text-white'>
            <div className='space-y-4'>
                <CardTitle> Spotlight</CardTitle>
                <div className='flex gap-3 oveflow-x-auto'>
                    <HomeCard title='King' content='Hola' img='/images/icon.png' />
                    <HomeCard title='King' content='Hola' img='/images/icon.png' />
                    <HomeCard title='King' content='Hola' img='/images/image.png' />
                </div>
            </div>
            <div className='space-y-4'>
                <CardTitle>Mobile App Development</CardTitle>
                <div className='flex gap-3'>
                    <HomeCard title='King' content='Hola' img='/images/icon.png' />
                    <HomeCard title='King' content='Hola' img='/images/icon.png' />
                    <HomeCard title='King' content='Hola' img='/images/image.png' />
                </div>
            </div>
            <div className='space-y-4 '>
                <CardTitle> Web Development</CardTitle>
                <div className='flex gap-3'>
                    <HomeCard title='King' content='Hola' img='/images/icon.png' />
                    <HomeCard title='King' content='Hola' img='/images/icon.png' />
                    <HomeCard title='King' content='Hola' img='/images/image.png' />
                </div>
            </div>
        </div >
        //  Add your props here

    )
}

export default Spotlight