"use client"
import Wrapper from '@/app/components/Wrapper'
import styles from '@/app/style'
import React, { useState, useEffect } from 'react'
import Image from "next/image"
import Link from "next/link"
import logo from "@/app/assets/logo.jpg"
import { ArrowRight } from 'lucide-react'
import { LuLoader } from 'react-icons/lu'
import { EventPropsInterface } from '@/type/types'
import Breadcrumbs from '@/app/components/Breadcrumbs'

const EventInfoList = () => {
  const [events, setEvents] = useState<EventPropsInterface[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events')
        if (!response.ok) {
          throw new Error('Impossible de récupérer les événements')
        }
        const data = await response.json()
        setEvents(data.events || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors de la récupération des événements')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (loading) {
    return (
      <Wrapper>
        <div className="w-full h-screen flex items-center justify-center">
          <LuLoader className="animate-spin text-4xl md:text-8xl text-secondary" />
        </div>
      </Wrapper>
    )
  }

  if (error) {
    return (
      <Wrapper>
        <div className="w-full h-screen flex items-center justify-center">
          <p className="text-red-500">Erreur: {error}</p>
        </div>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <div className={`mt-25 px-6 ${styles.flexCenter} gap-4 flex-col`}>
        <Breadcrumbs items={[
          { label: 'Événements', href: `` },
          { label: 'Candidates', href: `/user/info` },
        ]} />
        <h1 className={`${styles.heading2}`}> Événements </h1>

        {events.length === 0 ? (
          <p className="text-center text-gray-500">Aucun événement disponible</p>
        ) : (
          <div className={`grid md:grid-cols-3 sm:grid-cols-2 items-center w-full gap-3 py-4`}>
            {events.map((event) => (
              <Link href={`/event/info/${event.id}`} key={event.id} className="w-full">
                <div key={event.id} className={`${styles.flexCenter} flex-col gap-2 w-full rounded-lg bg-base-300 p-4 cursor-pointer hover:shadow-lg transition-all`}>
                  <div className="h-80 w-full overflow-hidden rounded-lg">
                    {event.coverImage ? (
                      <Image
                        src={event.coverImage}
                        alt={event.title}
                        width={300}
                        height={300}
                        className="h-full w-full object-cover hover:scale-110 transition-all duration-300 mix-blend-darken"
                      />
                    ) : (
                      <div className="h-full w-full bg-base-200 flex items-center justify-center">
                        <span>Pas d&apos;image</span>
                      </div>
                    )}
                  </div>
                  <div className={`${styles.flexCenter} flex-col gap-2 w-full`}>
                    <h1 className={`text-sm ${styles.paragraph} text-center font-bold`}> {event.title} </h1>
                    <p className="text-xs text-gray-400 text-center line-clamp-2">{event.description}</p>
                    <div className={`${styles.flexBetween} w-full gap-2`}>

                      <div className="badge_animated btn btn-sm btn-secondary  w-full">
                        Participer à l&apos;événement <ArrowRight className="h-4 w-4 -rotate-45" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  )
}

export default EventInfoList