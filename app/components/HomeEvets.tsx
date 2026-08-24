import React from 'react'
import Link from "next/link"
import { ArrowUpCircle } from 'lucide-react'
import { homeEventContent } from './Objects'
import Image from "next/image"

const HomeEvets = () => {
    return (
        <div className="grid lg:grid-cols-2 items-center gap-3 pt-4">
            {homeEventContent.map((event) => (
                <div key={event.id} className="relative overflow-hidden rounded-lg bg-base-200 grid sm:grid-cols-2 gap-3 p-3 border border-base-content/30">
                    <div className="rounded-lg h-100 md:h-80 w-full overflow-hidden transition-all duration-800 border border-base-content/30">
                        <Image src={event.eventImage} alt={`winner of event ${event.name}`} className="h-full w-full object-cover hover:scale-110 transition-all duration-300 ease-in-out" />
                    </div>
                    <div className="absolute px-4 sm:static md:px-0 z-3 bottom-0 left-0 backdrop-blur-[2px] sm:h-full sm:w-full bg-base-200/80 py-4 md:py-0 flex flex-col justify-center items-center gap-1">
                        <h3 className="font-bold sm:font-semibold text-xl sm:text-lg text-center capitalize sm:text-secondary light:text-black mb-4 sm:mb-0"> {event.name} </h3>
                        <p className="text-sm light:text-black sm:text-base-content text-center sm:text-start"> {event.description} </p>
                        <Link href={"/user/info"} className="btn btn-secondary rounded-lg btn-sm">
                            Créer votre évenement
                        </Link>
                    </div>
                </div>
            ))}

            <Link href={"/event/info"} className="border border-base-content/30 relative bg-base-200 flex items-center gap-2 justify-center p-3 rounded-lg h-50">
                <h3 className="z-2 flex justify-center items-center gap-2 rounded-xl text-secondary py-3 px-7 transition-all duration-300 hover:bg-secondary hover:text-base-content hover:px-14 bg-base-100">Voir tous les evenements <ArrowUpCircle className="h-4 w-4 rotate-45" /></h3>
            </Link>
            <Link href={"/event/new"} className="border border-base-content/30 relative bg-base-200 flex items-center gap-2 justify-center p-3 rounded-lg h-50" >
                <h3 className="z-2 flex justify-center items-center gap-2 rounded-xl bg-secondary py-3 px-7 transition-all duration-300 hover:bg-base-100 hover:text-secondary hover:px-14">Créer un évenement <ArrowUpCircle className="h-4 w-4 rotate-45" /></h3>
            </Link>
        </div>
    )
}

export default HomeEvets
