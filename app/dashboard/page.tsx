"use client"

import React, { useEffect, useState } from 'react'
import WrapperSide from '../components/WrapperSide'
import Breadcrumbs from '../components/Breadcrumbs'
import { BiSolidDashboard, BiUser } from 'react-icons/bi'
import { FaUsersGear } from 'react-icons/fa6'
import Link from 'next/link'
import { GiTeamUpgrade } from 'react-icons/gi'
import { BsDiagram3 } from 'react-icons/bs'
import Title from '../components/Title'
import { FaPhotoVideo, FaRegCalendarAlt } from 'react-icons/fa'
import { useUser } from '@clerk/nextjs'
import { Image as ImageIo } from '@imagekit/next'
import Image from "next/image"
import { AuthUser, EventUser, StatusType } from '@/type/types'
import ErrorComponent from '../components/Error'
import Loader from '../components/Loader'
import { TbUsersGroup } from 'react-icons/tb'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { ArrowRight, Trash2 } from 'lucide-react'
import ThemeToggle from '../components/ToggleTheme'

const page = () => {

  const [authedUser, setAuthedUser] = useState<AuthUser | null>(null)
  const { user } = useUser();
  const [events, setEvents] = useState<EventUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<StatusType>("DISABLED")
  const [eventId, setEventId] = useState("")

  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/session_user", {
          method: "GET"
        })

        if (!response.ok) {
          throw new Error("Failed to get user")
        }

        const data = await response.json()

        setAuthedUser(data.user)

      } catch (error) {
        console.error("Error getting user:", error)
      }
    }

    fetchUser()
  }, [])

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
        setError(err instanceof Error ? err.message : 'Erreur lors de la récupération des événements ')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  // function getEventStatus(
  //   startDate: Date,
  //   endDate: Date,
  //   currentStatus: StatusType
  // ): StatusType {
  //   if (currentStatus === "DISABLED") {
  //     return "DISABLED";
  //   }

  //   const now = new Date();

  //   if (now < startDate) {
  //     return "UPCOMING";
  //   }

  //   if (now >= startDate && now < endDate) {
  //     return "ACTIVE";
  //   }

  //   return "FINISHED";
  // }

  useEffect(() => {
    events.map((event) => {
      setEventId(event.id)
    })
  })

  const handleDeleteEvent = async () => {
    try {

      if (eventId === "") {
        toast.error("ID de l'évenement introuvable")
        return
      }
      const response = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.message || "Erreur lors de la suppression")
        throw new Error(data.message || "Erreur lors de la suppression")
      }

      toast.success("Evenement supprimé avec succès")
      router.replace("/dashboard")

    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Impossible de supprimer l'événement"
      )
    }
  }


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
      <Breadcrumbs items={[
        { label: 'Utilisateurs', href: `/user/info`, icon: <FaUsersGear className="md:w-6 md:h-6 h-4 w-4" />, },
        { label: 'Dashboard', href: ``, icon: <BiSolidDashboard className="md:w-6 md:h-6 h-4 w-4" />, },
      ]} />
      {/* USER ACCOUNT INFORMATIONS */}
      <div className="flex justify-between items-center flex-col md:flex-row gap-2 px-3">

        <div className="flex items-center gap-1 flex-col sm:flex-row">
          {user ? (
            <div className="h-20 w-20 rounded-full overflow-hidden skeleton">
              <Image src={user?.imageUrl} alt={user?.fullName ?? "Utilisateur"} height={300} width={300} className='' />
            </div>
          ) : (
            <div className="flex overflow-hidden p-3 skeleton rounded-full bg-base-200 items-center justify-center border border-base-content/40">
              {/* <Image src={assets.user_icon} alt="Connexion" className='h-full w-full object-cover' /> */}
              <BiUser className="h-15 w-15" />
            </div>
          )}
          <div className="text-center sm:text-start">
            <h1 className="font-semibold text-lg">{authedUser?.fullName}</h1>
            <p className="text-sm">{authedUser?.email}</p>
            <span className="text-xs">Rang <span className="font-bold badge badge-secondary badge-xs badge-soft animate-bounce">{authedUser?.rang}</span></span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href={"/plans"} className="bg-base-200 p-4 rounded-lg flex flex-col items-center justify-center">
            <GiTeamUpgrade className="h-7 w-7" />
            <h3 className="text-xs sm:text-sm font-bold text-center"> Rang supérieur </h3>
          </Link>
          <Link href={"/#homePlan"} className="btn btn-soft btn-secondary h-full p-4 rounded-lg flex flex-col items-center justify-center">
            <BsDiagram3 className="h-7 w-7" />
            <h3 className="text-xs sm:text-sm font-bold text-center"> Voir le classement </h3>
          </Link>
        </div>

      </div>
      {/* USER ACCOUNT INFORMATIONS */}

      {authedUser?.rang === "NATION" && (
        <div className='grid w-full p-4 place-items-center rounded-lg'>
          <Link href={"/authedUsers"} className="bg-secondary/20 backdrop-blur-xs text-secondary py-3 px-10 w-full max-w-2xl rounded-lg flex justify-center items-center gap-3">
            <div
              className={`flex items-center py-3 px-4 gap-3`}
            >
              <div className=""> <TbUsersGroup className='h-6 w-6' /> </div>
              <p className='text-center capitalize text-secondary font-semibold'> Utilisateurs connectés </p>
            </div>
          </Link>
        </div>
      )}

      {/* USER EVENTS INFORMATIONS */}

      <div className="flex justify-center items-center px-2 flex-col gap-3">
        <div className="w-full justify-between items-center flex gap-2 p-4 bg-base-200 max-w-2xl rounded-lg">
          <p className='text-sm'>Changer le thème de l'application</p>
          <ThemeToggle />
        </div>

        <div className="grid sm:grid-cols-2 w-full gap-3 items-center max-w-2xl">
          <Link href={"/event/new"} className="text-secondary-content p-4 rounded-lg flex flex-col items-center justify-center overflow-hidden bg-secondary">
            <FaRegCalendarAlt className="h-7 w-7" />
            <h3 className="text-xs font-bold text-center"> Créer un évenement </h3>
          </Link>

          <div className="bg-base-200 p-4 rounded-lg flex flex-col items-center justify-center overflow-hidden">
            <span className="uppercase text-center text-sm ">TOTAL</span>
            <h3 className="text-xl text-secondary font-bold text-center"> {authedUser?.events.length} </h3>
          </div>
        </div>

        {authedUser && authedUser?.events.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] items-center gap-2 max-w-2xl w-full">
            <h1 className="text-center text-secondary p-2 text-lg md:text-xl font-semibold flex items-center gap-3"> Vos événements <ArrowRight className="h-5 w-5 animate-bounce" /> </h1>
            {authedUser?.events.map((event) => (
              <Link key={event.id} href={`/event/info/${event?.id}`} className="bg-base-200 p-4 rounded-lg flex flex-col items-center justify-center overflow-hidden border border-base-content/25">
                <FaRegCalendarAlt className="h-7 w-7" />
                <h3 className="text-center title_gradient font-semibold"> {event.title} </h3>
                <span className={`px-2 mt-2 w-fit rounded-xl uppercase tracking-[0.2em] badge sm:badge-sm badge-soft
                    ${event.status === "DISABLED" ? "badge-error" : event.status === "UPCOMING" ? " badge-success" : event.status === "ACTIVE" ? "badge-secondary" : "badge-base-300"} `}>
                  {event.status}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div>Pas d'évenement</div>
        )}
      </div>
      {/* USER EVENTS INFORMATIONS */}

      {/* ALL EVENTS FOR ADMINS  */}
      {authedUser?.rang === "NATION" && (
        <div className='flex flex-col gap-2 items-center justify-center w-full pt-5'>
          <h1> Tous les évenements disponibles sur Noboté </h1>
          <div className="grid max-w-2xl items-center w-full gap-2 px-2">
            {events.map((event) => (
              <Link href={`/event/info/${event.id}`} key={event.id} className="flex gap-2 border border-base-content/20 rounded-lg p-2 items-center">
                <div className="overflow-hidden h-15 w-15 rounded-lg">
                  {event.coverImage ? (
                    <ImageIo src={event.coverImage}
                      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}
                      height={60}
                      width={60}
                      alt={`Couverture de l'évenement ${event.title}`} className="h-full w-full object-cover" />
                  ) : (
                    <FaPhotoVideo className='h-6 w-6' />
                  )}
                </div>
                <div className="flex justify-between items-center gap-2 w-full">
                  <div className="flex flex-col gap-1 overflow-hidden">
                    <h3 className="font-semibold text-sm"> {event.title} </h3>
                    <p className="text-xs"> {event.description} </p>
                    <span className='text-xs'> {new Date(event.createdAt).toLocaleDateString('fr-FR')} </span>
                  </div>
                  <p className={`px-2 mt-2 w-fit rounded-xl uppercase tracking-[0.2em] badge sm:badge-sm badge-xs badge-soft
                      ${event.status === "DISABLED" ? "badge-error" : event.status === "UPCOMING" ? " badge-success" : event.status === "ACTIVE" ? "badge-secondary" : "badge-base-300"} `}>
                    {event.status}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      {/* ALL EVENTS FOR ADMINS  */}
    </WrapperSide>
  )
}

export default page
