"use client"

import styles from '@/app/style'
import React, { useState, useEffect } from 'react'
import { Image as IKImage } from "@imagekit/next"
import Image from "next/image"
import Link from "next/link"
import logo from "@/app/assets/logo.jpg"
import { LuLoader } from 'react-icons/lu'
import { FaEye, FaPhotoVideo, FaRegCalendarAlt, FaUser } from 'react-icons/fa'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import { EventDetail, EventUser, User } from '@/type/types'
import WrapperSide from '@/app/components/WrapperSide'
import Loader from '@/app/components/Loader'
import ErrorComponent from "@/app/components/Error"
import { FaUsersGear } from 'react-icons/fa6'
import { toast } from 'sonner'


const UserList = () => {
    // const [users, setUsers] = useState<User[]>([])
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('/api/users', {
                    method: "GET"
                })
                if (!response.ok) {
                    toast.error("Impossible de récupérer les événements pour afficher les candidats")
                }
                const data = await response.json()
                setUsers(data.users || [])
                console.log(data.users)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erreur lors de la récupération des événements pour afficher les candidats')
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
            <div className={`px-6 ${styles.flexCenter} gap-4 flex-col py-2`}>
                <Breadcrumbs items={[
                    { label: 'Événements', href: `/event/info`, icon: <FaRegCalendarAlt className="md:w-6 md:h-6 h-4 w-4" />, },
                    { label: 'Candidates', href: ``, icon: <FaUsersGear className="md:w-6 md:h-6 h-4 w-4" />, },
                ]} />
                <h1 className={`${styles.heading2}`}> Candidats aux events </h1>

                <div className="grid sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] grid-cols-2 gap-2 place-items-center w-full">
                    {users.map((user) => (
                        <Link key={user.id} href={`/user/info/${user.id}`} className='overflow-hidden w-full h-full relative shadow-md rounded-lg bg-base-300 max-w-125'>
                            <div className={`${styles.flexCenter} h-full flex-col gap-2 rounded-lg sm:p-4 border border-base-content/10 sm:border-none hover:shadow-lg transition-all w-full`}>
                                <div className="h-full overflow-hidden rounded-lg relative w-full">
                                    {user.avatar ? (
                                        user.avatar.startsWith("/event") ? (
                                            <IKImage
                                                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}
                                                width={300}
                                                height={300}
                                                src={user.avatar}
                                                alt={user.fullName}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : user.avatar.startsWith("/upload") ? (
                                            <Image
                                                width={300}
                                                height={300}
                                                src={user.avatar}
                                                alt={user.fullName}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <Image
                                                width={300}
                                                height={300}
                                                src={logo}
                                                alt={user.fullName}
                                                className="h-full w-full object-cover"
                                            />
                                        )
                                    ) : (
                                        <div className="w-full rounded-xl flex items-center justify-center flex-col gap-3 h-full bg-base-100 border border-base-300/30">
                                            <FaPhotoVideo className="h-20 w-20" />
                                            <p>Pas d&apos;image de couverture</p>
                                        </div>
                                    )}
                                    <div className="absolute top-0 right-0 p-4 sm:flex hidden">
                                        <span className='badge badge-xs animate-bounce badge-secondary badge-soft'> {user.fullName} </span>
                                    </div>
                                </div>
                                <div className="w-full absolute sm:p-6 px-3 py-1 bottom-0 left-0 sm:backdrop-blur-xs rounded-lg flex items-center gap-2 justify-between">
                                    <div className="sm:hidden flex">
                                        <span className='items-start overflow-hidden line-clamp-1 max-w-25 badge badge-xs badge-outline text-gray-400'> {user.fullName} </span>
                                    </div>
                                    <button className="btn btn-secondary hidden sm:flex btn-xs sm:w-full sm:btn-sm btn-soft rounded-lg"><FaEye /> Voir le profil</button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </WrapperSide >
    )
}

export default UserList
