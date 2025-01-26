import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const HeroComp = () => {
    return (
        <div className='w-full h-48  bg-gradient-to-br from-[#4a42a33f] to-[#1a026182] flex flex-col items-center justify-center text-white gap-4'>
            <h1 className='text-3xl'>HOYA HACKS 2025</h1>
            <p>Submit your Hoya hack
                projects with mini-tutorials to
                help inspire and teach future learners!</p>
            <Link href='/uploadtest'>
                <Button variant={"main"}>Make Submission</Button>
            </Link>
        </div>
    )
}

export default HeroComp

// bg-[#8123997b]