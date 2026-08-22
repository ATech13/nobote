"use client"

import { useState } from "react"
import { CiCircleCheck } from "react-icons/ci"
import { FaVoteYea } from "react-icons/fa"
import { FiLoader } from "react-icons/fi"
import { toast } from "sonner"

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
    toast.success("✅ SUCCESS : Vote effectué avec success")

    setLoading(false)

    if (res.ok) {
      setVoted(true)
      onVoteSuccess?.(candidateId)
    } else {
      toast.error(data.message)
    }
  }
  // buttonDisabled
  return (
    <>
      <button
        onClick={() => (document.getElementById('vote_modal') as HTMLDialogElement).showModal()}
        disabled={buttonDisabled}
        className={`btn w-full btn-secondary btn-sm rounded-lg ${buttonDisabled ? "cursor-not-allowed opacity-50" : ""}`}
      >
        {hasAlreadyVotedThis || voted ? (
          <>
            <CiCircleCheck className="inline-block mr-2" />
            Voté
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
      <dialog id="vote_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Confirmer le vote</h3>
          <p className="py-4">Êtes-vous sûr de vouloir vôter pour ce candidat ?</p>
          <div className="w-full flex justify-end items-center">
            <button disabled={buttonDisabled} className="btn rounded-lg btn-success btn-soft" onClick={handleVote}>Voter</button>
          </div>
        </div>
      </dialog>

    </>
  )
}
