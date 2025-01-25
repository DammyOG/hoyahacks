import React from 'react'
import { Input } from './ui/input'
import { Search } from 'lucide-react'

const SearchComp = () => {
    return (
        <div className='relative  hidden md:flex items-center gap-4'>
            <Input className="rounded-full" type="search" placeholder="Search" />
            <span className="absolute right-4">
                <Search size={16} />
            </span>
        </div>
    )
}

export default SearchComp