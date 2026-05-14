"use client"

import { useState } from "react"
import { CiCircleCheck } from "react-icons/ci"
import { FaVoteYea } from "react-icons/fa"
import { FiLoader } from "react-icons/fi"

type Props = {
  candidateId: string
  eventId: string
  votedCandidateId?: string | null
  hasVoted?: boolean
  onVoteSuccess?: (candidateId: string) => void
}

export default function VoteButton({ candidateId, eventId, votedCandidateId, hasVoted, onVoteSuccess }: Props) {
  const [loading, setLoading] = useState(false)
  const [voted, setVoted] = useState(false)
  const hasAlreadyVotedThis = votedCandidateId === candidateId
  const hasAlreadyVotedOther = Boolean(hasVoted && !hasAlreadyVotedThis)
  const buttonDisabled = loading || Boolean(hasVoted) || voted

  const handleVote = async () => {
    setLoading(true)

    let deviceId = localStorage.getItem("deviceId")

    if (!deviceId) {
      deviceId = crypto.randomUUID()
      localStorage.setItem("deviceId", deviceId)
    }

    const res = await fetch("/api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        eventId,
        candidateId,
        deviceId
      })
    })

    const data = await res.json()

    setLoading(false)

    if (res.ok) {
      setVoted(true)
      onVoteSuccess?.(candidateId)
    } else {
      alert(data.message)
    }
  }

  return (
    <button
      onClick={handleVote}
      disabled={buttonDisabled}
      className={`btn w-full btn-secondary btn-sm ${buttonDisabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      {hasAlreadyVotedThis || voted ? (
        <>
          <CiCircleCheck className="inline-block mr-2" />
          Voter
        </>
      ) : hasAlreadyVotedOther ? (
        <>
          <CiCircleCheck className="inline-block mr-2" />
          Déjà voté
        </>
      ) : loading ? (
        <>
          <FiLoader className="inline-block mr-2 animate-spin" />
          Vote en cours...
        </>
      ) : (
        <>
          <FaVoteYea className="inline-block mr-2" />
          Voter
        </>
      )}
    </button>
  )
}
