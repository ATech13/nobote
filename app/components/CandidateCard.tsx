"use client"

import { useState } from "react"
import VoteButton from "./VoteButton"

type Props = {
  id: string
  fullName: string
  avatar?: string | null
  votesCount: number
  eventId: string
}

export default function CandidateCard({
  id,
  fullName,
  avatar,
  votesCount,
  eventId
}: Props) {
  return (
    <div className="border rounded-xl p-4 flex flex-col items-center gap-3 shadow">
      
      <img
        src={avatar || "/default-avatar.png"}
        alt={fullName}
        className="w-24 h-24 rounded-full object-cover"
      />

      <h2 className="font-bold text-lg">{fullName}</h2>

      <p className="text-sm text-gray-500">
        {votesCount} votes
      </p>

      <VoteButton candidateId={id} eventId={eventId} />
    </div>
  )
}