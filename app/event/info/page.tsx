"use client"
import WrapperSide from '@/app/components/WrapperSide'
import styles from '@/app/style'
import React, { useState, useEffect } from 'react'
import { Image as IKImage } from "@imagekit/next"
import Image from "next/image"
import Link from "next/link"
import logo from "@/app/assets/logo.jpg"
import { ArrowRight, PlusCircleIcon } from 'lucide-react'
import { EventPropsInterface } from '@/type/types'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import Loader from '@/app/components/Loader'
import ErrorComponent from '@/app/components/Error'
import { FaPhotoVideo, FaRegCalendarAlt } from 'react-icons/fa'
import { FaUsersGear } from 'react-icons/fa6'
import EmptyState from '@/app/components/EmptyState'
import { toast } from 'sonner'

const EventInfoList = () => {
  const [events, setEvents] = useState<EventPropsInterface[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events')
        if (!response.ok) {
          toast.error("Erreur lors de la récuperation des événements")
        }
        const data = await response.json()
        setEvents(data.events || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors de la récupération des événements')
        toast.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (loading) {
    return (
      <WrapperSide>
        <Loader />
      </WrapperSide>
    )
  }

  if (error) {
    return (
      <WrapperSide>
        <ErrorComponent error={error} />
      </WrapperSide>
    )
  }

  return (
    <WrapperSide>
      <div className={`px-6 ${styles.flexCenter} gap-4 flex-col relative py-2`}>
        <Breadcrumbs items={[
          { label: 'Événements', href: ``, icon: <FaRegCalendarAlt className="md:w-6 md:h-6 h-4 w-4" />, },
          { label: 'Candidates', href: `/user/info`, icon: <FaUsersGear className="md:w-6 md:h-6 h-4 w-4" />, },
        ]} />
        <div className="flex flex-col gap-3 w-full justify-center items-center px-2">
          <h1 className={`${styles.heading2}`}> Événements </h1>
          <div className="grid grid-cols-2 items-center gap-3 w-full">
            <Link href={"/event/new"} className='flex justify-end items-center'>
              <button className="btn btn-soft btn-sm sm:btn-md btn-secondary rounded-lg"><PlusCircleIcon className='h-4 w-4' />Créer un event</button>
            </Link>
            <Link href={"/user/new"} className=''>
              <button className="btn btn-soft btn-sm sm:btn-md btn-secondary rounded-lg"><PlusCircleIcon className='h-4 w-4' />Ajouter un candidat</button>
            </Link>
          </div>
        </div>

        {events.length === 0 ? (
          <div className="mt-12">
            <EmptyState IconComponent={'ClipboardX'} message={'Aucun évenement disponible'} />
          </div>
        ) : (
          <div className={`grid sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-center w-full gap-3 py-4 place-items-center`}>
            {events.map((event) => (
              <Link href={`/event/info/${event.id}`} key={event.id} className={`w-full max-w-125 ${event.status === "DISABLED" ? "hidden" : ""}`}>
                <div key={event.id} className={`${styles.flexCenter} flex-col gap-2 w-full bg-base-300 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all`}>
                  <div className="h-full w-full overflow-hidden rounded-lg bg-base-100">
                    {event.coverImage ? (
                      event.coverImage.startsWith("/event") ? (
                        <IKImage
                          urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}
                          width={300}
                          height={300}
                          src={event.coverImage}
                          alt={event.title}
                          className="h-full w-full object-cover"
                        />
                      ) : event.coverImage.startsWith("/upload") ? (
                        <Image
                          width={300}
                          height={300}
                          src={event.coverImage}
                          alt={event.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Image
                          width={300}
                          height={300}
                          src={logo}
                          alt={event.title}
                          className="h-full w-full object-cover"
                        />
                      )
                    ) : (
                      <div className="w-full rounded-xl flex items-center justify-center flex-col gap-3 h-full bg-base-100 border border-base-300/30">
                        <FaPhotoVideo className="h-20 w-20" />
                        <p>Pas d&apos;image de couverture</p>
                      </div>
                    )}
                  </div>
                  <div className={`${styles.flexCenter} flex-col gap-2 w-full overflow-hidden`}>
                    <h1 className={`text-sm ${styles.paragraph} text-center font-bold line-clamp-2`}> {event.title} </h1>
                    <p className="text-xs text-gray-400 text-center line-clamp-2">{event.description}</p>
                    <div className={`${styles.flexBetween} w-full gap-2`}>

                      <div className="badge_animated btn btn-xs sm:btn-sm btn-secondary rounded-lg w-full">
                        Participer <ArrowRight className="h-4 w-4 -rotate-45" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </WrapperSide>
  )
}

export default EventInfoList