"use client"

import { Image as IKImage } from "@imagekit/next"
import Image from "next/image"
import logo from "@/app/assets/logo.jpg"
import React from "react"
import { FaPhotoVideo } from "react-icons/fa"

type ResultCardProps = {
  rank: number
  username: string
  fullName: string
  avatar?: string | null
  votesCount: number
}

const ResultCard: React.FC<ResultCardProps> = ({ rank, username, fullName, avatar, votesCount }) => {
  const initials = fullName
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  // const progressSteps = [
  //   "w-[0%]",
  //   "w-[10%]",
  //   "w-[20%]",
  //   "w-[30%]",
  //   "w-[40%]",
  //   "w-[50%]",
  //   "w-[60%]",
  //   "w-[70%]",
  //   "w-[80%]",
  //   "w-[90%]",
  //   "w-[100%]",
  // ]
  // const progressIndex = Math.min(10, Math.floor(votesCount / 10))
  // const widthClass = progressSteps[progressIndex]

  return (
    <div className="group rounded-4xl border border-base-content/10 bg-base-100 backdrop-blur-xl shadow-2xl shadow-black/5 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-secondary/30 hover:shadow-lg max-w-125">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex justify-between items-center gap-4">
          <div className="relative h-16 w-16 rounded-full overflow-hidden border-4 border-secondary/20 bg-base-200 shadow-inner flex items-center justify-center text-2xl font-bold text-secondary">
            {avatar ? (
              avatar.startsWith("/event") ? (
                <IKImage
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}
                  width={300}
                  height={300}
                  src={avatar}
                  alt={fullName}
                  className="h-full w-full object-cover"
                />
              ) : avatar.startsWith("/upload") ? (
                <Image
                  width={300}
                  height={300}
                  src={avatar}
                  alt={fullName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image
                  width={300}
                  height={300}
                  src={logo}
                  alt={fullName}
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
            <p className="text-xs uppercase tracking-[0.3em] text-secondary/80">Candidate #{rank}</p>
            <h3 className="md:text-md text-sm font-semibold text-base-content">{fullName}</h3>
            <p className="md:text-sm text-xs text-gray-500">@{username}</p>
          </div>
        </div>
        <div className="rounded-3xl flex flex-col justify-between items-center bg-secondary/10 px-4 py-2 text-right">
          <p className="text-[16px] md:text-[20px] font-bold text-secondary">{votesCount}</p>
          <p className="text-[8px] md:text-[11px] uppercase tracking-[0.2em] text-secondary/70">votes</p>
        </div>
      </div>
      {/* <div className="h-2 w-full rounded-full bg-base-200 overflow-hidden">
        <div className={`h-full rounded-full bg-linear-to-r from-secondary via-secondary-focus to-secondary ${widthClass}`} />
      </div> */}
    </div>
  )
}

export default ResultCard
