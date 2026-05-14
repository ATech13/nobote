"use client"

import Wrapper from '@/app/components/Wrapper'
import React from 'react'
import styles from "@/app/style"
// import { eventLists } from '@/app/components/Objects'
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from 'lucide-react'
import { fetchEvents, Post } from '@/app/fetchData'
import { useState, useEffect } from 'react'
import { LuLoader } from 'react-icons/lu'

const EventList = () => {
  // const [posts, setPosts] = useState<Post[]>([])
  // const [posting, setPosting] = useState<Post>()

  // useEffect(() => {
  //   fetchEvents().then(data => {
  //     setPosts(data.products)
  //   })
  // }, [])

  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)



  return (
    <Wrapper>
      {/* {posts ? (
        <div className={`mt-25 grid md:grid-cols-3 sm:grid-cols-2 items-center w-full gap-3 px-4`}>
          {posts.map((post: Post) => (
            <div key={post.id} className={`${styles.flexCenter} flex-col gap-2 w-full rounded-lg bg-base-300 p-4`}>
              <div className="h-80 w-full overflow-hidden">
              <Image src={post?.images[0]} alt={post.title} width={300} height={300} className="h-full w-full object-cover hover:scale-110 transition-all duration-300" />
            </div>
              <div className={`${styles.flexCenter} flex-col gap-2 w-full`}>
                <h1 className={`text-sm ${styles.paragraph} text-center font-bold`}> {post.title} </h1>
                <div className={`${styles.flexBetween} w-full gap-2`}>
                  <button className="btn btn-secondary btn-sm"> En savoir plus </button>
                  <Link href={`/event/info/${post.id}`} className="btn btn-secondary btn-sm">
                    <ArrowRight className="h-4 w-4 -rotate-45" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-screen flex items-center justify-center z-10">
          <LuLoader className="animate-spin text-4xl md:text-8xl text-secondary" />
        </div>
      )} */}
      <div>

      </div>
    </Wrapper>
  )
}

export default EventList
// require 