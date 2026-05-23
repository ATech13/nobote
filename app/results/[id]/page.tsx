"use client"

import Breadcrumbs from '@/app/components/Breadcrumbs'
import Wrapper from '@/app/components/Wrapper'
import styles from '@/app/style'
import { EventUser, Result } from '@/type/types'
import { User } from '@prisma/client'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { LuLoader } from 'react-icons/lu'
import Image from "next/image"
import EmptyState from '@/app/components/EmptyState'
import VoteButton from '@/app/components/VoteButton'
import Link from 'next/link'
import { FaEye } from 'react-icons/fa'
import ResultCard from '@/app/components/ResultCard'

const page = ({ params }: { params: { id: string } }) => {

    const router = useRouter()
    const [event, setEvent] = useState<EventUser | null>(null)
    const [results, setResults] = useState<Result[]>([])
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [votedCandidateId, setVotedCandidateId] = useState<string | null>(null)

    // const hasVoted = Boolean(votedCandidateId)


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

        // const fetchVotedCandidateId = async () => {
        //     const { id } = await params
        //     const eventId = id
        //     const storedVote = localStorage.getItem(`voted_event_${eventId}`)
        //     if (storedVote) {
        //         setVotedCandidateId(storedVote)
        //     }
        // }

        const fetchResults = async () => {
            try {
                const { id } = await params
                 const response = await fetch(`/api/vote/${id}`)

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(
                        data.message || "Erreur de chargement"
                    )
                }

                setResults(data.results || [])

            } catch (err) {

                setError(
                    err instanceof Error
                        ? err.message
                        : "Erreur inconnue"
                )

            } finally {
                setLoading(false)
            }
        }

        fetchResults()

        // fetchEvents()
        // fetchResults()
        // fetchVotedCandidateId()
    }, [params])

    // if (loading) {
    //     return (
    //         <Wrapper>
    //             <div className="w-full h-screen flex items-center justify-center">
    //                 <LuLoader className="animate-spin text-4xl md:text-8xl text-secondary" />
    //             </div>
    //         </Wrapper>
    //     )
    // }

    // if (error) {
    //     return (
    //         <Wrapper>
    //             <div className="w-full h-screen flex items-center justify-center flex-col gap-4">
    //                 <p className="text-red-500">Erreur: {error}</p>
    //                 <button onClick={() => router.push('/event/info')} className="btn btn-secondary">
    //                     <ArrowLeft className="h-4 w-4" />
    //                     Retour aux événements
    //                 </button>
    //             </div>
    //         </Wrapper>
    //     )
    // }

    // if (!event) {
    //     return (
    //         <Wrapper>
    //             <div className="w-full h-screen flex items-center justify-center">
    //                 <p>Événement non trouvé</p>
    //             </div>
    //         </Wrapper>
    //     )
    // }

    return (
        <Wrapper>
            <div className="mt-24 px-6 pb-10">
                <div className="mx-auto max-w-7xl rounded-4xl border border-base-200 bg-linear-to-br from-base-100/90 via-base-200/80 to-white/80 p-6 shadow-2xl shadow-black/10">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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
                    </div>

                    <div className="mt-6">
                        <Breadcrumbs
                            items={[
                                { label: 'Evénement', href: '/event/info' },
                                { label: 'Résultats', href: '/results' },
                                {label: `${event?.title}`, href: `/event/info/${event?.id}`}
                            ]}
                        />
                    </div>

                    {loading ? (
                        <div className="mt-12 flex min-h-[40vh] items-center justify-center">
                            <LuLoader className="h-12 w-12 animate-spin text-secondary" />
                        </div>
                    ) : error ? (
                        <div className="mt-12 flex min-h-[40vh] items-center justify-center">
                            <p className="text-red-500">{error}</p>
                        </div>
                    ) : results.length === 0 ? (
                        <div className="mt-12">
                            <EmptyState IconComponent={'ClipboardX'} message={'Pas encore des résultats'} />
                        </div>
                    ) : (
                        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {results.map((result, index) => (
                                <ResultCard
                                    key={result.id}
                                    rank={index + 1}
                                    username={result.username}
                                    fullName={result.fullName}
                                    avatar={result.avatar}
                                    votesCount={result.votesCount}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Wrapper>
    )
}

export default page