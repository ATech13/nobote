"use client"
import Wrapper from '@/app/components/Wrapper'
import styles from '@/app/style'
import React, { useState, useEffect } from 'react'
import Image from "next/image"
import Link from "next/link"
import logo from "@/app/assets/logo.jpg"
import { ArrowLeft, Mail, MapPin } from 'lucide-react'
import { LuLoader } from 'react-icons/lu'
import { useRouter } from 'next/navigation'
import Breadcrumbs from '@/app/components/Breadcrumbs'

interface User {
    id: string
    fullName: string
    username: string
    email: string
    avatar?: string
    bio?: string
    country?: string
    city?: string
    age?: number
    role: string
    isVerified: boolean
}

const UserDetailPage = ({ params }: { params: { id: string } }) => {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { id } = await params
                const response = await fetch(`/api/users/${id}`)
                if (!response.ok) {
                    throw new Error('Impossible de récupérer l\'utilisateur')
                }
                const data = await response.json()
                setUser(data.user)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erreur lors de la récupération de l\'utilisateur')
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [params])

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
                <div className="w-full h-screen flex items-center justify-center flex-col gap-4">
                    <p className="text-red-500">Erreur: {error}</p>
                    <button onClick={() => router.back()} className="btn btn-secondary">
                        <ArrowLeft className="h-4 w-4" />
                        Retour
                    </button>
                </div>
            </Wrapper>
        )
    }

    if (!user) {
        return (
            <Wrapper>
                <div className="w-full h-screen flex items-center justify-center">
                    <p>Utilisateur non trouvé</p>
                </div>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <div className={`mt-15 md:mt-25 px-6 ${styles.flexCenter} gap-4 flex-col min-h-screen`}>
                <button onClick={() => router.back()} className="btn btn-ghost btn-sm self-start">
                    <ArrowLeft className="h-4 w-4" />
                    Retour
                </button>
                <Breadcrumbs items={[
                    { label: 'Événements', href: '/event/info' },
                    { label: 'Candidates', href: '/user/info' },
                    { label: `@${user.username}` },
                ]} />

                <div className={`w-full max-w-2xl ${styles.flexCenter} flex-col gap-6 bg-base-300 rounded-lg p-8`}>
                    {/* Avatar */}
                    <div className="h-40 w-40 rounded-full overflow-hidden border-4 border-secondary">
                        <Image
                            src={user.avatar || logo}
                            alt={user.fullName}
                            width={160}
                            height={160}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* User Info */}
                    <div className={`${styles.flexCenter} flex-col gap-2 w-full`}>
                        <div className="flex items-center gap-2 justify-center">
                            <h1 className={`${styles.heading2}`}>{user.fullName}</h1>
                            {user.isVerified && (
                                <span className="badge badge-secondary">Vérifié</span>
                            )}
                        </div>
                        <p className="text-gray-400">@{user.username}</p>
                        {/* <span className="badge badge-outline">{user.role}</span> */}
                    </div>

                    {/* Bio */}
                    {user.bio && (
                        <p className={`${styles.paragraph} text-center max-w-lg`}>{user.bio}</p>
                    )}

                    {/* Details */}
                    <div className={`w-full ${styles.flexCenter} flex-col gap-3`}>
                        {/* Email */}
                        <div className={`${styles.flexBetween} w-full gap-2 p-3 bg-base-200 rounded-lg`}>
                            <div className="flex items-center gap-2">
                                <Mail className="h-5 w-5 text-secondary" />
                                <span className="text-sm font-semibold">Email</span>
                            </div>
                            <span className="text-sm text-gray-400">{user.email}</span>
                        </div>

                        {/* Location */}
                        {(user.city || user.country) && (
                            <div className={`${styles.flexBetween} w-full gap-2 p-3 bg-base-200 rounded-lg`}>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-secondary" />
                                    <span className="text-sm font-semibold">Localisation</span>
                                </div>
                                <span className="text-sm text-gray-400">
                                    {user.city}{user.city && user.country ? ', ' : ''}{user.country}
                                </span>
                            </div>
                        )}

                        {/* Age */}
                        {user.age && (
                            <div className={`${styles.flexBetween} w-full gap-2 p-3 bg-base-200 rounded-lg`}>
                                <span className="text-sm font-semibold">Âge</span>
                                <span className="text-sm text-gray-400">{user.age} ans</span>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex badge_animated gap-2 w-full justify-center">
                        <Link href={`/event/info`} className="btn w-full btn-secondary btn-sm">
                            Voir les événements
                        </Link>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default UserDetailPage