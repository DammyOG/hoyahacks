import React from 'react'
import { Button } from './ui/button'

const HeroComp = () => {
    return (
        <div className='w-full h-48  bg-gradient-to-br from-[#4a42a3] to-[#1a0261] flex flex-col items-center justify-center text-white gap-4'>
            <h1 className='text-3xl'>HOYA HACKS 2025</h1>
            <p>Submit your Hoya hack
                projects with mini-tutorials to
                help inspire and teach future learners!</p>
            <Button variant={"main"}>Make Submission</Button>
        </div>
    )
}

export default HeroComp

// bg-[#8123997b]