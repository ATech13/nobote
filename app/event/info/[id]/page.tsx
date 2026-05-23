"use client"
import Wrapper from '@/app/components/Wrapper'
import styles from '@/app/style'
import React, { useState, useEffect } from 'react'
import Image from "next/image"
import { ArrowLeft } from 'lucide-react'
import { LuLoader } from 'react-icons/lu'
import { useRouter } from 'next/navigation'
import EmptyState from '@/app/components/EmptyState'
import Link from 'next/link'
import { FaEye } from 'react-icons/fa'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import VoteButton from '@/app/components/VoteButton'
// import { EventDetail } from '@/type/types'
import { User, Event } from '@prisma/client'
import { EventUser } from '@/type/types'





const EventDetailPage = ({ params }: { params: { id: string } }) => {
    const router = useRouter()
    const [event, setEvent] = useState<EventUser | null>(null)
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [votedCandidateId, setVotedCandidateId] = useState<string | null>(null)

    const hasVoted = Boolean(votedCandidateId)

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const { id } = await params
                const response = await fetch(`/api/events/${id}`)
                if (!response.ok) {
                    throw new Error('Impossible de récupérer l\'événement')
                }
                const data = await response.json()
                setEvent(data.event)
                setUsers(data.event.users || [])
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erreur lors de la récupération de l\'événement')
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
                    <button onClick={() => router.push('/event/info')} className="btn btn-secondary">
                        <ArrowLeft className="h-4 w-4" />
                        Retour aux événements
                    </button>
                </div>
            </Wrapper>
        )
    }

    if (!event) {
        return (
            <Wrapper>
                <div className="w-full h-screen flex items-center justify-center">
                    <p>Événement non trouvé</p>
                </div>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <div className={`mt-8 md:mt-25 px-2 ${styles.flexCenter} gap-4 flex-col min-h-screen`}>
                <button onClick={() => router.back()} className="btn btn-ghost btn-sm self-start">
                    <ArrowLeft className="h-4 w-4" />
                    Retour
                </button>
                <Breadcrumbs items={[
                    { label: 'Événements', href: '/event/info' },
                    { label: `${event.title}` },
                ]} />

                <div className={`w-full max-w-full md:max-w-5xl ${styles.flexCenter} flex-col gap-6 rounded-lg px-4 md:p-8`}>
                    <h1 className={`font-poppins font-semibold md:text-[32px] text-[18px] text-secondary`}>{event.title}</h1>
                    {event.coverImage ? (
                        <div className="h-90 relative md:h-screen w-full overflow-hidden rounded-xl">
                            <Image
                                src={event.coverImage}
                                alt={event.title}
                                width={600}
                                height={600}
                                className="h-full w-full object-cover"
                            />
                            <div className={`gap-2 badge_animated md:gap-4 absolute top-5 left-2 z-1`}>
                                <div className="p-2 md:p-4 w-full md:w-fit backdrop-blur-[5px] backdrop-brightness-110 backdrop-contrast-110 rounded-2xl bg-white/15">
                                    <h2 className="font-semibold text-white text-sm md:text-md">Dates de l&apos;événement</h2>
                                    <p className="md:text-sm text-xs text-gray-300">Créé le {new Date(event.createdAt).toLocaleDateString('fr-FR')}</p>
                                    <p className="md:text-sm text-xs text-gray-300">Prévu pour le {new Date(event.endDate).toLocaleDateString('fr-FR')}</p>
                                    <p className="px-2 mt-2 w-fit rounded-xl bg-[#02ff56]/20 text-[#02ff56] md:text-sm text-xs uppercase tracking-[0.2em]">{event.status}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-80 w-full rounded-xl bg-base-200 flex items-center justify-center text-gray-500">
                            Pas d&apos;image de couverture
                        </div>
                    )}
                    <div className={`${styles.flexCenter} flex-col gap-4 w-full text-center`}>
                        <p className={`${styles.paragraph} linecamp text-center`}>{event.description}</p>
                    </div>

                    {hasVoted && (
                        <div className="alert alert-info w-full max-w-3xl text-center">
                            Vous avez déjà voté pour <span className="font-semibold">{event.users.find((u) => u.id === votedCandidateId)?.fullName || 'une candidate'}</span>.
                        </div>
                    )}
                    <div className={`${styles.heading2}`}>Canditats de l&apos;événement</div>
                    {event.users.length === 0 ? (
                        <EmptyState IconComponent={'UserRoundX'} message={'Pas de candidats pour cet événement.'} />
                    ) : (
                        <div className={`grid md:grid-cols-3 sm:grid-cols-2 items-center w-full gap-3 py-4`}>
                            {event.users.map((user) => (
                                <div key={user.id} className={`${styles.flexCenter} flex-col gap-2 w-full rounded-lg bg-base-300 p-4 hover:shadow-lg transition-all`}>
                                    <div className="h-80 w-full overflow-hidden rounded-lg">
                                        <Image
                                            src={user.avatar || ""}
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
                                        <div className="w-full flex flex-col gap-2">
                                            <VoteButton
                                                candidateId={user.id}
                                                eventId={event.id}
                                                votedCandidateId={votedCandidateId}
                                                hasVoted={hasVoted}
                                                onVoteSuccess={(candidateId) => {
                                                    setVotedCandidateId(candidateId)
                                                    localStorage.setItem(`voted_event_${event.id}`, candidateId)
                                                }}
                                            />
                                            <Link href={`/user/info/${user.id}`} className="btn btn-secondary btn-sm w-full flex items-center justify-center gap-2">
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
        </Wrapper>
    )
}

export default EventDetailPage
