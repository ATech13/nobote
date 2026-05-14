import Link from 'next/link'
import React from 'react'
import { menuContent, socialLinks } from './Objects'




const SidebarContent = () => {
    return (
        <div className='flex flex-col py-4 px-2 w-full bg-base-300 rounded-lg'>

            <div className='flex mt-3 justify-center items-center text-secondary gap-3 w-full
            h-full
            '>
                {menuContent.map((menu) => (
                    <Link key={menu.id} href={menu.href} className='flex flex-col justify-center items-center'>
                        <div className="p-4 rounded-full backdrop-blur-2xl h-fit w-fit bg-base-100
                            flex items-center justify-center text-secondary
                    ">
                            {menu.icon}
                        </div>
                        <div className='font-bold text-xs md:text-sm text-gray-400'>
                            {menu.label}
                        </div>
                    </Link>
                ))}
                {/*
                <div className='grid grid-cols-3 items-center text-secondary gap-3 w-full
            h-full
            '>
                    {menuContent.map((menu) => (
                        <Link key={menu.id} href={menu.href} className='flex flex-col justify-center items-center'>
                            <div className="p-4 rounded-full backdrop-blur-2xl h-fit w-fit bg-base-100
                            flex items-center justify-center text-secondary
                    ">
                                {menu.icon}
                            </div>
                            <div className='font-bold text-xs md:text-sm text-gray-400'>
                                {menu.label}
                            </div>
                        </Link>
                    ))} */}

            </div>

            <div className='bg-base-300 duration-1000 flex flex-col justify-center p-4 items-center gap-3 w-full
            h-full
            '>
                <div className='text-xs md:text-sm'>
                    Contactez-nous sur
                </div>

                <div className="flex justify-center items-center gap-4 w-full">
                    {socialLinks.map((social) => (
                        <Link href={social.href} key={social.id} className="flex flex-col justify-center items-center">
                            <div className="p-4 rounded-full backdrop-blur-2xl text-gray-400 bg-base-100">
                                {social.icon}
                            </div>
                            <span className="text-xs text-secondary">
                                {social.description}
                            </span>
                        </Link>
                    ))}
                </div>

                {/* <div className="grid grid-cols-4 gap-3 w-full">
                    {socialLinks.map((social) => (
                        <Link href={social.href} key={social.id} className="flex flex-col justify-center items-center">
                            <div className="p-4 rounded-full backdrop-blur-2xl text-gray-400 bg-base-100">
                                {social.icon}
                            </div>
                            <span className="text-xs text-secondary">
                                {social.description}
                            </span>
                        </Link>
                    ))}
                </div> */}

            </div>
            <p className="text-center text-xs mt-4">Copyright © {new Date().getFullYear()} <span className="font-bold title_gradient">RARTech</span> <br /> Tous les droits sont reservés</p>
        </div>
    )
}

export default SidebarContent