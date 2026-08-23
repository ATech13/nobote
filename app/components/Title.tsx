import Link from 'next/link'
import React from 'react'
import { HiChevronDown } from 'react-icons/hi'

type TitleProps = {
    title: string
    description: string
    id: string
}

const Title: React.FC<TitleProps> = ({ title, description, id }) => {
    return (
        <div className="w-full flex justify-end items-center p-3 rounded-lg md:justify-center" id={id} >
            <div className="relative w-full">
                <div className="custom-card delay3 p-4 backdrop-blur-[5px] rounded-2xl w-full md:max-w-130 bg-base-200">
                    <div className="flex gap-2 items-center text-sm">
                        <div className="h-6 w-2 bg-secondary"></div>
                        <div className="font-semibold text-lg ">{title} </div>
                    </div>
                    <div className="text-sm">{description}</div>
                </div>
                <Link href={`#${id}`} className="absolute anim delay4 border border-secondary flex justify-center items-center right-0 bottom-0  w-8 h-8 bg-base-100 backdrop-blur-[5px] rounded-full  ">
                    <HiChevronDown className="text-secondary" />
                </Link>
            </div>
        </div>
    )
}

export default Title
