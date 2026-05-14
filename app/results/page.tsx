"use client"

import React, { useEffect, useState } from 'react'
import { LuLoader } from 'react-icons/lu'
import EmptyState from '../components/EmptyState'
import Wrapper from '../components/Wrapper'
import ResultCard from '../components/ResultCard'
import Breadcrumbs from '../components/Breadcrumbs'

type Result = {
  id: string
  fullName: string
  username: string
  avatar?: string | null
  votesCount: number
}

const ResultsPage = () => {
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch('/api/vote')
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Erreur de chargement')
        }

        setResults(data.results || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue')
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [])

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
                { label: 'Résultats' },
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

export default ResultsPage
