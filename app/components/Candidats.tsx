import React from 'react'
import { candidatsData } from './Objects'
import Image from "next/image"
import Link from 'next/link'
import assets from '../assets/assets'
import { ArrowUpCircle } from 'lucide-react'

const Candidats = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center gap-3 p-6">
      {candidatsData.map((candidat) => (
        <div key={candidat.id} className="flex flex-col sm:grid sm:grid-cols-2 md:flex gap-3 rounded-lg bg-base-300 items-center h-full p-4">
            <div className="rounded-lg h-60 md:h-70 w-full overflow-hidden hover:h-55 transition-all duration-800">
                <Image src={candidat.candidatPicture} alt={`winner of event ${candidat.eventName}`} className="h-full w-full object-cover hover:scale-130 transition-all duration-300 ease-in-out" />
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
                <h3 className="font-semibold text-lg italic text-center"> {candidat.eventName} </h3>
                <Link href={"/user/info"} className="btn btn-secondary rounded-lg btn-sm btn-soft">
                    Voir tous les candidats
                </Link>
            </div>
        </div>
      ))}
      <Link href={"/event/new"} className="h-60 md:h-full rounded-lg transition-all duration-800 bg-base-300 p-4 bg-size-[100%] bg-center bg-no-repeat hover:bg-size-[200%] hover:bg-position-[0%] flex justify-end items-end" style={{
        backgroundImage: `url(${assets.nobote_full.src})`
      }}>
        <div className="rounded-full p-4 border border-secondary flex justify-center items-center hover:rotate-360 transition-all duration-800 ease-in-out">
            <ArrowUpCircle className="h-6 w-6 rotate-45 text-secondary" />
        </div>
      </Link>
    </div>
  )
}

export default Candidats
