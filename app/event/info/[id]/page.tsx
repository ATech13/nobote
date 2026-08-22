"use client"
import styles from '@/app/style'
import React, { useState, useEffect } from 'react'
import Image from "next/image"
import { Image as IKImage } from "@imagekit/next"
import { ArrowLeft, ArrowUp, ChartArea, ClipboardX, Plus, Share2, Trash2, X } from 'lucide-react'
import { LuLoader } from 'react-icons/lu'
import { useRouter } from 'next/navigation'
import EmptyState from '@/app/components/EmptyState'
import Link from 'next/link'
import { FaEye, FaPhotoVideo, FaRegCalendarAlt } from 'react-icons/fa'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import VoteButton from '@/app/components/VoteButton'
// import { EventDetail } from '@/type/types'
import { User, Event, Comment } from '@prisma/client'
import { AuthUser, EventUser, StatusType } from '@/type/types'
import WrapperSide from '@/app/components/WrapperSide'
import Loader from '@/app/components/Loader'
import ErrorComponent from '@/app/components/Error'
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";
import assets from '@/app/assets/assets'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import { eventNames } from 'process'
import ShareButton from '@/app/components/Sharebutton'
import logo from "@/app/assets/logo.jpg"





const EventDetailPage = ({ params }: { params: { id: string } }) => {
    const router = useRouter()
    const [event, setEvent] = useState<EventUser | null>(null)
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [votedCandidateId, setVotedCandidateId] = useState<string | null>(null)
    const [comments, setComments] = useState<Comment[]>([])
    const [description, setDescription] = useState<string>("")
    const [viewComments, setViewComments] = useState<boolean>(true)
    const [updating, setUpdating] = useState<boolean>(false)
    const [status, setStatus] = useState<StatusType>("DISABLED")
    const [authedUser, setAuthedUser] = useState<AuthUser | null>(null)

    const hasVoted = Boolean(votedCandidateId)
    const { user } = useUser()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("/api/session_user", {
                    method: "GET"
                })

                // if (!user?.primaryEmailAddress?.emailAddress) return
                if (!response.ok) {
                    toast.error("Failed to get user")
                }

                const data = await response.json()

                setAuthedUser(data.user)

            } catch (error) {
                console.error("Error getting user:", error)
                toast.error("Erreur lors de la récupération de l'utilisation")
            }
        }
        fetchUser()
    }, [])

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const { id } = await params
                const response = await fetch(`/api/events/${id}`)
                if (!response.ok) {
                    toast.error("❌ ERROR: Impossible de récupérer l\'événement")
                }
                const data = await response.json()
                setEvent(data.event)
                setUsers(data.event.users || [])
                setComments(data.event.comments || [])
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erreur lors de la récupération de l\'événement')
                toast.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchEvent()
    }, [params])


    useEffect(() => {
        const fetchVotedCandidateId = async () => {
            const { id } = await params
            const eventId = id
            const storedVote = localStorage.getItem(`voted_event_${eventId}`)
            if (storedVote) {
                setVotedCandidateId(storedVote)
            }
        }

        fetchVotedCandidateId()
    }, [params])

    const handleAddComment = async () => {
        try {
            const formData = new FormData()
            const { id } = await params
            const eventId = id

            formData.append('description', description)
            formData.append("eventId", eventId)
            const response = await fetch("/api/comments", {
                method: "POST",
                body: formData
            })

            if (description === "") {
                throw new Error("Cannot send empty message")
            }
            if (!response.ok) {
                toast.error("❌ ERROR: Failed to get comments")
            }
            setDescription("")
            toast.success("Comment added successfully")
            router.push(`/event/info/${eventId}`)

        } catch (error) {
            console.error("Error getting comments:", error)
            toast.error("Erreur lors de la récupération des comments")
        }
    }

    const handleStatusChange = async (
        action: "ACTIVATE" | "DISABLE"
    ) => {
        try {
            const { id } = await params

            setUpdating(true)
            toast.success("⏳ LOADING: Uploading...")
            const response = await fetch(
                `/api/events/${id}`,
                {
                    method: "PATCH",
                    body: action,
                }
            )

            const data = await response.json()

            if (!response.ok) {
                toast.error(`${data.message || "Erreur lors de la modification"}`)
            }

            toast.success(`Status changed successfully in ${data.event.status}`)
            setStatus(data.event.status)

        } catch (error) {
            console.error(error)
            toast.error("Error while patching status")
        } finally {
            setUpdating(false)
        }
    }


    const handleDeleteEvent = async () => {
        try {
            const { id } = await params
            const eventId = id
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

    // const handleShare = async () => {
    //     const shareData = {
    //         title: "Evenement sur Noboté",
    //         text: `Découvrez l'evenement ${event?.title} sur NOBOTE`,
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

    if (!event) {
        return (
            <WrapperSide>
                <div className="w-full h-screen flex items-center justify-center">
                    <p>Événement non trouvé</p>
                </div>
            </WrapperSide>
        )
    }

    return (
        <WrapperSide>
            <div className={`px-2 ${styles.flexCenter} gap-4 flex-col min-h-screen`}>
                <button onClick={() => router.back()} className="btn btn-ghost btn-sm self-start">
                    <ArrowLeft className="h-4 w-4" />
                    Retour
                </button>
                <Breadcrumbs items={[
                    { label: 'Événements', href: '/event/info', icon: <FaRegCalendarAlt className="md:w-6 md:h-6 h-4 w-4" />, },
                    { label: `${event.title}` },
                ]} />
                {(authedUser?.id === event.ownerId && authedUser?.rang !== "E" && authedUser?.rang !== "D") || authedUser?.rang === "NATION" ? (
                    <div className="flex justify-center items-center gap-3 p-2 bg-base-200 w-full rounded-lg">
                        <button
                            onClick={() =>
                                handleStatusChange(
                                    status === "DISABLED"
                                        ? "ACTIVATE"
                                        : "DISABLE"
                                )
                            }
                            disabled={updating || status === "FINISHED"}
                            className="btn btn-secondary"
                        >
                            {updating
                                ? "Modification..."
                                : status === "DISABLED"
                                    ? "Activer"
                                    : "Désactiver"}
                        </button>
                        <button
                            type="button"
                            onClick={() => (document.getElementById('eventDelete_confirmation') as HTMLDialogElement).showModal()}
                            className="btn btn-error btn-soft btn-sm rounded-lg"
                        >
                            Supprimer
                        </button>
                        <dialog id="eventDelete_confirmation" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <h3 className="font-bold text-lg">Confirmer la suppression</h3>
                                <p className="py-4">Êtes-vous sûr de vouloir supprimer cet évenement ?</p>
                                <div className="w-full flex justify-end items-center">
                                    <button className="btn rounded-lg btn-error btn-soft" onClick={handleDeleteEvent}>Supprimer</button>
                                </div>
                            </div>
                        </dialog>
                    </div>
                ) : (
                    <div>
                        {authedUser?.id === event.ownerId && (authedUser?.rang === "E" || authedUser?.rang === "D") ? (
                            <div onClick={() => router.push("/plans")} className={`w-full flex gap-2 justify-center items-center p-4 ${authedUser?.email !== user?.primaryEmailAddress?.emailAddress ? "hidden" : ""}`}>
                                <button className="btn btn-secondary btn-soft btn-sm rounded-lg md:btn-md">Contacter l'admin pour activer l'évenement</button>
                                <button
                                    type="button"
                                    onClick={() => (document.getElementById('eventDelete_confirmatione') as HTMLDialogElement).showModal()}
                                    className="btn btn-error btn-soft btn-sm rounded-lg"
                                >
                                    <Trash2 className='h-5 w-5' />
                                </button>
                                <dialog id="eventDelete_confirmatione" className="modal">
                                    <div className="modal-box">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                        </form>
                                        <h3 className="font-bold text-lg">Confirmer la suppression</h3>
                                        <p className="py-4">Êtes-vous sûr de vouloir supprimer cet évenement ?</p>
                                        <div className="w-full flex justify-end items-center">
                                            <button className="btn rounded-lg btn-error btn-soft" onClick={handleDeleteEvent}>Supprimer</button>
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                )}
                <div className="w-full flex justify-center items-center p-3"
                // onClick={handleShare}
                >
                    <ShareButton
                        title={event.title}
                        text={`Participez à l'évenement "${event.title}" sur NOBOTE.`}
                        url={`${process.env.NEXT_PUBLIC_URL_APP}/event/info/${event.id}`}
                    />
                </div>

                <div className={`w-full ${styles.flexCenter} flex-col gap-6 rounded-lg px-4 md:p-8`}>
                    <div className="grid lg:grid-cols-2 items-center p-2 gap-3 bg-base-200 rounded-xl border border-base-content/25 shadow-md">
                        <div className={`${styles.flexCenter} flex-col gap-2 w-full text-center`}>
                            <h1 className={`font-poppins font-semibold md:text-[32px] text-[25px] text-secondary`}>{event.title}</h1>
                            <p className={`${styles.paragraph} linecamp text-center text-sm md:text-md`}>{event.description}</p>
                        </div>
                        <div className="relative w-full overflow-hidden rounded-xl border border-base-300/50 bg-base-100">
                            {event.coverImage ? (
                                event.coverImage.startsWith("/event") ? (
                                    <IKImage
                                        urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}
                                        width={400}
                                        height={400}
                                        src={event.coverImage}
                                        alt={event.title}
                                        className="h-full w-full object-cover"
                                    />
                                ) : event.coverImage.startsWith("/upload") ? (
                                    <Image
                                        width={400}
                                        height={400}
                                        src={event.coverImage}
                                        alt={event.title}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <Image
                                        width={400}
                                        height={400}
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
                            <div className={`gap-2 badge_animated md:gap-4 absolute top-5 left-2 z-1`}>
                                <div className="p-2 md:p-4 w-full md:w-fit backdrop-blur-[5px] backdrop-brightness-110 backdrop-contrast-110 rounded-2xl shadow-md bg-base-100/15">
                                    <h2 className="font-semibold text-sm">Dates de l&apos;événement</h2>
                                    <p className="md:text-sm text-xs text-gray-400">Créé le {new Date(event.createdAt).toLocaleDateString('fr-FR')}</p>
                                    <p className="md:text-sm text-xs text-gray-400">Prévu pour le {new Date(event.endDate).toLocaleDateString('fr-FR')}</p>
                                    <p className={`px-2 mt-2 w-fit rounded-xl uppercase tracking-[0.2em] badge sm:badge-sm badge-soft
                                            ${event.status === "DISABLED" ? "badge-error" : event.status === "UPCOMING" ? " badge-success" : event.status === "ACTIVE" ? "badge-secondary" : "badge-base-300"} `}>
                                        {event.status}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {hasVoted && (
                        <div className="toast toast-top toast-end">
                            <div className="alert alert-secondary w-full max-w-3xl text-center">
                                Vous avez déjà voté pour <span className="font-semibold">{event.users.find((u) => u.id === votedCandidateId)?.fullName || 'une candidate'}</span>.
                            </div>
                        </div>
                    )}
                    <div className={`${styles.heading2}`}>Canditats de l&apos;événement</div>
                    {event.users.length === 0 ? (
                        <div className="w-full">
                            <EmptyState IconComponent={'UserRoundX'} message={'Pas de candidats pour cet événement.'} />
                            {authedUser?.email === user?.primaryEmailAddress?.emailAddress && (
                                <div className="flex justify-center items-center py-1 px-5 w-full">
                                    <Link href="/user/new" className="btn btn-secondary btn-soft btn-sm w-full max-w-2xl"> Ajouter un candidat</Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className={`grid sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-items-center w-full gap-3 py-4`}>
                            {event.users.map((user) => (
                                <div key={user.id} className={`${styles.flexCenter} flex-col gap-2 w-full rounded-lg bg-base-300 p-4 hover:shadow-lg transition-all`}>
                                    <div className="h-80 w-full overflow-hidden rounded-lg">
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
                                    <div className={`${styles.flexCenter} flex-col gap-2 w-full`}>
                                        <h1 className={`text-sm ${styles.paragraph} text-center font-bold`}> {user.fullName} </h1>
                                        <p className="text-xs text-gray-400 text-center">@{user.username}</p>
                                        <p className="text-xs text-gray-400 text-center line-clamp-2">{user.bio}</p>
                                        <div className="w-full flex flex-col gap-2">
                                            {event.status === "DISABLED" || event.status === "FINISHED"}
                                            <VoteButton
                                                candidateId={user.id}
                                                eventId={event.id}
                                                votedCandidateId={votedCandidateId}
                                                hasVoted={hasVoted || event.status === "DISABLED" || event.status === "FINISHED"}
                                                onVoteSuccess={(candidateId) => {
                                                    setVotedCandidateId(candidateId)
                                                    localStorage.setItem(`voted_event_${event.id}`, candidateId)
                                                }}
                                            />
                                            <Link href={`/user/info/${user.id}`} className="btn btn-secondary btn-sm w-full flex items-center justify-center gap-2 rounded-lg">
                                                <FaEye /> Voir le profil
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-full md:w-fit flex justify-center mb-4">
                    <Link href={`/results/${event.id}`} className="w-full btn btn-secondary btn-sm">
                        Voir les résultats
                    </Link>
                </div>
            </div>
            <div className={`grid items-end gap-1 fixed w-full top-0 p-3 max-w-xl z-101 ${viewComments ? "-left-full" : "left-0"} bg-base-200/75 backdrop-blur-xs h-screen overflow-hidden rounded-lg shadow-md transition-all duration-400 `}>
                <div className="flex gap-1 flex-col shadow-md p-3 rounded-lg">
                    <div className="flex justify-between items-center gap-2">
                        <div className="flex items-center gap-2">
                            <button className=""
                                onClick={() => setViewComments(true)}
                            >
                                <ArrowLeft className='h-5.5 w-5.5' />
                            </button>
                            <h1 className='text-secondary text-sm font-semibold'>Commentaires ({comments.length}) </h1>
                        </div>
                        <button className="btn btn-secondary btn-soft btn-circle btn-sm"
                            onClick={() => setViewComments(true)}
                        >
                            <X className='h-5.5 w-5.5' />
                        </button>
                    </div>
                    <div className={`flex gap-2 w-full rounded-lg overflow-y-auto h-[80vh] bg-base-100/75 shadow relative bg-center bg-cover`}>
                        {/* <div className="absolute h-full w-full bg-black opacity-40"></div> */}
                        {comments.length === 0 ? (
                            <div className="flex items-center justify-center h-full w-full flex-col gap-3">
                                <ClipboardX className='h-20 w-20 wiggle-animation' strokeWidth={0.7} />
                                <p>Aucun commentaire pour le moment.</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-1 w-full">
                                {comments.map((comment) => {
                                    const avatar = createAvatar(adventurer, {
                                        seed: `${comment.voterIp}-noboté`,
                                    });

                                    const avatarDataUri = avatar.toDataUri();
                                    return (
                                        <div key={comment.id} className="w-full rounded-lg p-2 flex flex-col gap-1">
                                            <div className="chat chat-end">
                                                <div className="chat-image avatar">
                                                    <div className="w-10 rounded-full">
                                                        <img src={avatarDataUri} alt="Avatar" />
                                                    </div>
                                                </div>
                                                {/* <div className="chat-header">
                                                Anakin
                                                <time className="text-xs opacity-50">12:46</time>
                                            </div> */}
                                                <div className="chat-bubble text-sm"> {comment.description} </div>
                                                <div className="chat-footer opacity-50 text-secondary">Posté le {new Date(comment.createdAt).toLocaleDateString('fr-FR')}</div>
                                            </div>
                                        </div>
                                    )
                                }
                                )}
                            </div>
                        )}
                    </div>
                    <div className={`flex items-center gap-2 h-fit`}>
                        <input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='input rounded-full w-full'
                            placeholder='Noboté: Placez un commentaire'
                        />
                        <button type="submit" className="btn btn-circle btn-sm md:btn-md btn-secondary btn-soft"
                            onClick={() => handleAddComment()}
                        >
                            <ArrowUp className='h-5 w-5' />
                        </button>
                    </div>
                </div>
            </div>
            <div className='fixed md:bottom-0 right-0 p-5'>
                <button className="btn rounded-full btn-sm md:btn-md btn-secondary btn-soft"
                    onClick={() => setViewComments(!viewComments)}
                >
                    <Plus className='h-5 w-5' /> Ajouter un commentaire
                </button>
            </div>
        </WrapperSide>
    )
}

export default EventDetailPage
