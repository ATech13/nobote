import React from 'react'
import assets from '../assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import Title from './Title'

const HomeResults = () => {
    return (
        <div>
            {/* <div className='h-125 w-full' style={{
                backgroundImage: `url(${assets.golden_background.src})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
            }}></div> */}
            <Title title="Results" description="Visualisez le résultat en temps réels de tous les évenements présents et disponibles sur noboté" id="homeResult" />
            <div className='flex justify-center p-4'>
                <div className='overflow-hidden max-w-300 grid md:grid-cols-2  gap-2.5 items-center bg-base-300 p-4 rounded-lg '>
                    <div className='overflow-hidden h-99 w-full transition-all duration-800 rounded-lg md:hover:w-[203%] hover:h-198' >
                        <Image src={assets.crown} alt="crown" className='w-full h-full object-cover' />
                    </div>

                    <div className=' flex flex-col gap-4 '>
                        <h1 className='font-bold text-2xl text-secondary text-center'>Transparence des résultats</h1>
                        <p className="text-sm md:text-md"> Afficher les résultats des évenements disponibles sur noboté avec une expression conforme à votre non-beauté. Ainsi visualiser en temps réél et dans la conformité selon toutes les tendences des différents résultats des évenements inclus dans la plate-forme </p>
                        <div className='flex justify-end'>
                            <Link href={'/results'} className='btn btn-secondary rounded-lg w-full'>Voir les résultats </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default HomeResults
