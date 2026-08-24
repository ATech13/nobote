"use client"

import React from 'react'
import assets from '../assets/assets'
import Link from 'next/link'
import Image from "next/image"
import { useRouter } from 'next/navigation'

interface ErrorProps {
    error: string | null
}

const ErrorComponent: React.FC<ErrorProps> = ({ error }) => {
    const router = useRouter()
    return (
        <div className="w-full p-4">
            <div className="relative p-4 w-full overflow-hidden border rounded-lg border-base-content/50">
                <div className="flex flex-col gap-3 items-center justify-center md:h-[80vh] py-50 md:py-0 w-full rounded-lg p-4">
                    <div className="text-9xl text-center scale_animate">😩</div>
                    <p className="text-4xl font-bold"> Oups! </p>
                    <span className="text-md md:text-xl flex items-center gap-3 text-center"> {error} </span>
                    <div className="flex gap-3 justify-center items-center w-full flex-wrap">
                        <button onClick={() => window.location.reload()} className="btn btn-secondary btn-sm rounded-lg btn-outline"> Actualiser </button>
                        <Link href={"/user/info"} className="btn btn-secondary btn-sm rounded-lg"> Voir tous les candidats </Link>
                    </div>
                </div>
                <div className="absolute right-0 bottom-0 p-5 flex items-center gap-1">
                    <div className="md:h-15 md:w-15 h-10 w-10 overflow-hidden rounded-full flex justify-center items-center bg-accent">
                        <Image src={assets.nobote_logo} alt="Logo de noboté" className='h-full w-full object-cover rounded-full' />
                    </div>
                    <span className="text-md md:text-xl font-semibold">Noboté</span>
                </div>
            </div>
        </div>
    )
}

export default ErrorComponent
