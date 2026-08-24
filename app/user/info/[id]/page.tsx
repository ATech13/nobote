"use client"
import styles from '@/app/style'
import React, { useState, useEffect } from 'react'
import Link from "next/link"
import { Image as IKImage } from "@imagekit/next"
import Image from "next/image"
import logo from "@/app/assets/logo.jpg"
import { ArrowLeft, MapPin, Share2, Trash2 } from 'lucide-react'
import { LuLoader } from 'react-icons/lu'
import { useRouter } from 'next/navigation'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import WrapperSide from '@/app/components/WrapperSide'
import Loader from '@/app/components/Loader'
import ErrorComponent from '@/app/components/Error'
import { FaPhotoVideo, FaRegCalendarAlt } from 'react-icons/fa'
import { FaUsersGear } from 'react-icons/fa6'
import { LiaCertificateSolid } from 'react-icons/lia'
import VoteButton from '@/app/components/VoteButton'
import { toast } from 'sonner'
import ShareButton from '@/app/components/Sharebutton'

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
    eventId?: string
    password?: string
}

const UserDetailPage = ({ params }: { params: { id: string } }) => {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [votedCandidateId, setVotedCandidateId] = useState<string | null>(null)
    const hasVoted = Boolean(votedCandidateId)
    const [password, setPassword] = useState<string>("")

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { id } = await params
                const response = await fetch(`/api/users/${id}`)
                if (!response.ok) {
                    toast.error("'Impossible de récupérer l\'utilisateur")
                }
                const data = await response.json()
                setUser(data.user)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erreur lors de la récupération de l\'utilisateur')
                // toast.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [params])

    useEffect(() => {
        const fetchVotedCandidateId = async () => {
            const eventId = user?.id
            const storedVote = localStorage.getItem(`voted_event_${eventId}`)
            if (storedVote) {
                setVotedCandidateId(storedVote)
            }
        }

        fetchVotedCandidateId()
    }, [params])

    // const handleShare = async () => {
    //     const shareData = {
    //         title: user?.fullName,
    //         text: `Découvrez l'utilisateur ${user?.username} sur NOBOTE`,
    //         url: window.location.href,
    //     }

    //     try {
    //         if (navigator.share) {
    //             await navigator.share(shareData)
    //         } else {
    //             await navigator.clipboard.writeText(window.location.href)

    //             toast.success("Lien copié !")
    //         }
    //     } catch (error) {
    //         toast.error("Erreur de partage")
    //         console.error("Erreur de partage :", error)
    //     }
    // }

    const handleDeleteUser = async () => {
        try {
            const { id } = await params
            // if (password === user?.password) {
            const response = await fetch(`/api/users/${id}`, {
                method: "DELETE",
            })

            const data = await response.json()

            if (!response.ok) {
                toast.error("Erreur lors de la suppression")
                throw new Error(data.message || "Erreur lors de la suppression")
            }
            // }

            toast.success("Utilisateur supprimé avec succès")
            router.push("/user/new")

        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Impossible de supprimer l'utilisateur"
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

    if (!user) {
        return (
            <WrapperSide>
                <div className="w-full h-[75vh] flex items-center justify-center">
                    <p>Utilisateur non trouvé</p>
                </div>
            </WrapperSide>
        )
    }

    return (
        <WrapperSide>
            <div className={`px-6 ${styles.flexCenter} gap-4 flex-col`}>
                <button onClick={() => router.back()} className="btn btn-ghost btn-sm self-start hidden sm:flex">
                    <ArrowLeft className="h-4 w-4" />
                    Retour
                </button>
                <Breadcrumbs items={[
                    { label: 'Evenements', href: '/event/info', icon: <FaRegCalendarAlt className="md:w-6 md:h-6 h-4 w-4" />, },
                    { label: 'Candidats', href: '/user/info', icon: <FaUsersGear className="md:w-6 md:h-6 h-4 w-4" />, },
                    { label: `@${user.username}` },
                ]} />
                <div className="py-2 px-3 w-full flex justify-end items-center">
                    <button className="btn btn-error btn-soft rounded-lg"
                        onClick={() => (document.getElementById('userDelete_confirmation') as HTMLDialogElement).showModal()}>
                        <Trash2 className='h-5 w-5' />
                    </button>
                    <dialog id="userDelete_confirmation" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <h3 className="font-bold text-lg">Confirmer la suppression du candidat</h3>
                            <p className="py-4">Entrez le mot de passe de l'utilisateur pour le supprimer</p>
                            <form onSubmit={handleDeleteUser} className="grid gap-2 items-center w-full">
                                <input
                                    type="text"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='input input-secondary input-sm w-full'
                                    placeholder="Mot de passe du candidat"
                                />
                                <div className="w-full flex justify-end items-center">
                                    <button type="submit" disabled={password !== user?.password} className="btn rounded-lg btn-error btn-soft" onClick={handleDeleteUser}>Supprimer</button>
                                </div>
                            </form>
                        </div>
                    </dialog>
                </div>

                <div className={`relative w-full max-w-2xl flex flex-col gap-6 bg-base-200 overflow-hidden rounded-lg p-8 border border-base-content/30`}>
                    {/* Avatar */}
                    <div className="flex justify-between gap-3 items-center w-full">
                        <div className="flex items-center gap-2 flex-col md:flex-row md:justify-start justify-center md:text-start text-center w-full">
                            <div className="h-40 w-40 rounded-full overflow-hidden border-2 border-secondary">
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
                            </div>
                            <div>
                                <h1 className={`${styles.heading2}`}>{user.fullName}</h1>
                                <p className="text-gray-400">@{user.username}</p>
                                <span className="text-sm text-gray-400">{user.email}</span>
                            </div>
                        </div>

                        <div className="absolute top-0 right-0 p-4 md:static">
                            {user.isVerified ? (
                                <span className="text-success flex flex-col items-center gap-1 text-xs text-center"> <LiaCertificateSolid className="h-8 w-8" /> Certifié</span>
                            ) : (
                                <span className='text-error flex flex-col items-center gap-1 text-xs text-center'> <LiaCertificateSolid className="h-8 w-8" /> Non certifié </span>
                            )}
                        </div>

                    </div>

                    {/* User Info */}
                    <div className={`${styles.flexCenter} flex-col gap-2 w-full`}>
                        {user.bio && (
                            <p className={`${styles.paragraph} text-center text-sm`}>{user.bio}</p>
                        )}
                        {/* <span className="badge badge-outline">{user.role}</span> */}
                    </div>

                    {/* Bio */}

                    {/* Details */}
                    <div className={`w-full ${styles.flexCenter} flex-col gap-3`}>
                        {/* Email */}
                        <div className={`${styles.flexBetween} w-full gap-4 p-3 bg-base-200 rounded-lg overflow-hidden`}>
                            <div className="flex items-center gap-2"
                            // onClick={handleShare}
                            >
                                <ShareButton
                                    title={`Noboté: ${user.fullName}`}
                                    text={`Voir l'utilisateur "${user.username}" sur NOBOTE.`}
                                    url={`${process.env.NEXT_PUBLIC_URL_APP}/user/info/${user.id}`}
                                /> <span className='sm:text-sm font-semibold text-xs'>Partager</span>
                                {/* <Share2 className="h-5 w-5 text-secondary" />
                                <span className="text-sm font-semibold">Partager</span> */}
                            </div>
                            <span className="text-sm text-gray-400"> {process.env.NEXT_PUBLIC_URL_APP}/user/info/{user.id} </span>
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
                    <div className="grid md:grid-cols-2 items-center gap-2">
                        <div className="flex  gap-2 w-full justify-center">
                            {user?.eventId && <VoteButton
                                candidateId={user.id}
                                eventId={user?.eventId}
                                votedCandidateId={votedCandidateId}
                                hasVoted={hasVoted}
                                onVoteSuccess={(candidateId) => {
                                    setVotedCandidateId(candidateId)
                                    localStorage.setItem(`voted_event_${user.eventId}`, candidateId)
                                }}
                            />}
                        </div>
                        <div className="flex  gap-2 w-full justify-center">
                            <Link href={`/event/info`} className="btn w-full btn-secondary btn-outline btn-sm rounded-lg">
                                Voir les événements
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </WrapperSide>
    )
}

export default UserDetailPage