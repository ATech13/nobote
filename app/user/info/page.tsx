"use client"
import Wrapper from '@/app/components/Wrapper'
import styles from '@/app/style'
import React, { useState, useEffect } from 'react'
import Image from "next/image"
import Link from "next/link"
import logo from "@/app/assets/logo.jpg"
import { LuLoader } from 'react-icons/lu'
import { FaEye, FaUser } from 'react-icons/fa'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import { User } from '@/type/types'


const UserList = () => {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/users')
                if (!response.ok) {
                    throw new Error('Impossible de récupérer les utilisateurs')
                }
                const data = await response.json()
                setUsers(data.users || [])
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erreur lors de la récupération des utilisateurs')
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
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
                    { label: 'Événements', href: '/event/info' },
                    { label: 'Candidates' },
                ]} />
                <h1 className={`${styles.heading2}`}> Candidates aux events </h1>

                {users.length === 0 ? (
                    <p className="text-center text-gray-500">Aucun utilisateur disponible</p>
                ) : (
                    <div className={`grid md:grid-cols-3 sm:grid-cols-2 items-center w-full gap-3 py-4`}>
                        {users.map((user) => (
                            <Link key={user.id} href={`/user/info/${user.id}`}>
                                <div className={`${styles.flexCenter} flex-col gap-2 w-full rounded-lg bg-base-300 p-4 hover:shadow-lg transition-all`}>
                                    <div className="h-80 w-full overflow-hidden rounded-lg">
                                        <Image
                                            src={user.avatar || logo}
                                            alt={user.fullName}
                                            width={300}
                                            height={300}
                                            className="h-full w-full object-cover hover:scale-110 transition-all duration-300"
                                        />
                                    </div>
                                    <div className={`${styles.flexCenter} flex-col gap-2 w-full`}>
                                        <h1 className={`text-sm ${styles.paragraph} text-center font-bold`}> {user.fullName} </h1>
                                        <p className="text-xs text-gray-400 text-center">@{user.username}</p>
                                        <p className="text-xs text-gray-400 text-center line-clamp-2">{user.bio}</p>
                                        <div className="btn btn-secondary btn-xs w-full">
                                            <FaEye /> Voir le profil
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

export default UserList
