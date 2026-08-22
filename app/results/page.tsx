"use client"

import React, { useEffect, useState } from 'react'
import { LuLoader } from 'react-icons/lu'
import EmptyState from '../components/EmptyState'
import ResultCard from '../components/ResultCard'
import Breadcrumbs from '../components/Breadcrumbs'
import { EventUser, Result, User } from '@/type/types'
import { useRouter } from 'next/navigation'
import { Image as IKImage } from "@imagekit/next"
import Image from "next/image"
import logo from "@/app/assets/logo.jpg"
import Link from 'next/link'
import WrapperSide from '../components/WrapperSide'
import Loader from '../components/Loader'
import ErrorComponent from '../components/Error'
import { FaPhotoVideo, FaRegCalendarAlt } from 'react-icons/fa'
import { IoBarChartOutline } from 'react-icons/io5'



const ResultsPage = () => {
  const router = useRouter()
  const [events, setEvents] = useState<EventUser[]>([])
  const [results, setResults] = useState<Result[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {

    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events")
        const data = await response.json()

        if (!response.ok) {
          // throw new Error(data.message || 'Erreur de chargement')
          throw new Error("Erreur de chargement des évenements pour afficher les résultats")
        }
        setEvents(data.events)
        setUsers(data.events.users || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    const fetchResults = async () => {
      try {
        const response = await fetch('/api/vote')
        const data = await response.json()

        if (!response.ok) {
          // throw new Error(data.message || 'Erreur de chargement')
          throw new Error("Erreur de chargement des résultats")
        }

        setResults(data.results || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
    fetchResults()
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
      <div className="p-4 w-full">
        <div className="mx-auto max-w-7xl rounded-4xl border border-base-200 bg-linear-to-br from-base-300/90 via-base-300/60 to-base-100/20 p-2 md:p-6 shadow-[0px_0px_15px_var(--color-base-content)]
                        shadow-base-content/30">
          {/* <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-secondary">
                Résultats
              </span>
              <h1 className="mt-4 text-3xl font-bold text-base-content">Classement des candidates</h1>
              <p className="mt-2 max-w-2xl text-sm text-gray-500">
                Les votes sont comptabilisés en temps réel avec l&apos;avatar, le username et le total de voix.
              </p>
            </div>
            <div className="rounded-3xl bg-base-200 p-4 text-center">
              <p className="text-sm uppercase tracking-[0.25em] text-gray-500">Total</p>
              <p className="mt-1 text-3xl font-bold text-secondary">{results.length}</p>
            </div>
          </div> */}

          <div></div>

          <div className="mt-6">
            <Breadcrumbs items={[
              { label: 'Événements', href: `/event/info`, icon: <FaRegCalendarAlt className="md:w-6 md:h-6 h-4 w-4" />, },
              { label: 'Résultats', href: ``, icon: <IoBarChartOutline className="md:w-6 md:h-6 h-4 w-4" />, },
            ]} />
          </div>

          {loading ? (
            <Loader />
          ) : error ? (
            <div className="mt-12 flex min-h-[40vh] items-center justify-center">
              <p className="text-red-500">{error}</p>
            </div>
          ) : results.length === 0 ? (
            <div className="">
              <EmptyState IconComponent={'ClipboardX'} message={'Pas encore des résultats'} />
            </div>
          ) : (
            <div className="mt-12 grid gap-4 md:gap-6 md:grid-cols-2 xl:grid-cols-3">
              {/* {results.map((result, index) => (
                // <ResultCard
                //   key={result.id}
                //   rank={index + 1}
                //   username={result.username}
                //   fullName={result.fullName}
                //   avatar={result.avatar}
                //   votesCount={result.votesCount}
                // />
                <div key={result.id}>
                  
                </div>
              ))} */}
              {events?.map((e) => (
                <div key={e.id} className="flex justify-between items-center group w-full rounded-full border border-base-content/10 bg-base-100 backdrop-blur-xl shadow-2xl shadow-black/5 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-secondary/40 hover:shadow-lg">
                  <div className="relative h-12 w-12 rounded-4xl overflow-hidden border-4 border-secondary/20 bg-base-200 shadow-inner flex items-center justify-center text-2xl font-bold text-secondary">
                    {e.coverImage ? (
                      e.coverImage.startsWith("/event") ? (
                        <IKImage
                          urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}
                          width={400}
                          height={400}
                          src={e.coverImage}
                          alt={e.title}
                          className="h-full w-full object-cover"
                        />
                      ) : e.coverImage.startsWith("/upload") ? (
                        <Image
                          width={400}
                          height={400}
                          src={e.coverImage}
                          alt={e.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Image
                          width={400}
                          height={400}
                          src={logo}
                          alt={e.title}
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
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-secondary/80">{e.status}</p>
                    <h3 className="md:text-md text-xs font-semibold text-base-content">{e.title}</h3>
                    {/* <p className="md:text-sm text-xs text-gray-500 w-60 line-clamp-1">{e.description}</p> */}
                  </div>
                  <button onClick={() => router.push(`/results/${e.id}`)} disabled={e.status === "DISABLED"} className={`btn btn-secondary btn-sm rounded-lg`}>Résultat</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </WrapperSide>
  )
}

export default ResultsPage
