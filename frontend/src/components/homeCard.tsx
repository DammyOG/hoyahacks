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
        <div className='stroke-white stroke-2'>
            <Card className='relative min-w-[14rem] w-[16rem] h-[16rem] bg-center gap-4 flex flex-col text-white'
                  style={{
                    backgroundImage: `url(${img})`,
                  }}>

                <div className='absolute flex flex-col items-center justify-center h-32 inset-x-0 bottom-0 backdrop-blur-md bg-white/30 rounded-bl-lg rounded-br-lg '>
                    <CardTitle className='font-semibold'>{title}</CardTitle>
                    <CardContent className=' pt-3'>
                        <p>{content}</p>
                    </CardContent>
                    {/* <HeartIcon /> */}
                </div>
            </Card>

        </div>

        //img

    )
}

export default HomeCard