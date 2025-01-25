import React from 'react'
import HomeCard from './homeCard'

const Spotlight = () => {
    return (
        <div className='w-3/5 flex gap-4 ml-4'>
            <HomeCard title='King' content='Hola' img='/images/icon.png' />
            <HomeCard title='King' content='Hola' img='/images/icon.png' />
            <HomeCard title='King' content='Hola' img='/images/image.png' />
        </div >
        //  Add your props here

    )
}

export default Spotlight