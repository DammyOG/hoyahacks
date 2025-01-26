import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Heart } from 'lucide-react'
import HeartIcon from './heartIcon'

// Homecard props
interface HomeCardProps {
    title: string,
    content: string,
    img: string
}




const HomeCard = ({ title, content, img }: HomeCardProps) => {
    return (
        // Design your card here
        <>
            <Card className='relative w-[16rem] h-[16rem] bg-gradient-to-t from-[#0000c5] to-[#150040] gap-4 flex flex-col text-white'>
                <div className='bg-transparent h-3/5'>
                    <img src={img} alt="" />
                </div>
                <CardTitle className='pl-2'>{title}</CardTitle>
                <CardContent className='p-0 pl-2'>
                    <p>{content}</p>
                </CardContent>

                <HeartIcon />+
            </Card>

        </>

        //img

    )
}

export default HomeCard