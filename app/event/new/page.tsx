"use client"
import Wrapper from '@/app/components/Wrapper'
import React from 'react'
import styles from "@/app/style"
import Image from 'next/image'
import logo from "@/app/assets/logo.jpg";
import { useRouter } from "next/navigation"
import Form from '@/app/components/Form'


const CreateNewEvent = () => {

  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    try {
      const response = await fetch("/api/events", {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        try {
          const error = await response.json()
          throw new Error(error.message)
        } catch (parseError) {
          throw new Error(`Failed to create event: ${response.statusText}`)
        }
      }

      router.replace('/event/info')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Wrapper>
      <div className={`${styles.flexCenter} w-full px-6 min-h-screen`}>
        <div className={`w-full max-w-120 ${styles.flexCenter} flex-col p-6 rounded-lg gap-4 bg-base-300 border_animate`}>
          <div className={`${styles.flexBetween} w-full gap-2`}>
            <div className="flex items-center">
              <div className="h-6 w-6 rounded-full overflow-hidden">
                <Image src={logo} alt="logo de noboté" />
              </div>
              <span className="uppercase font-bold text-md md:text-xl text-secondary">noboté</span>
            </div>
            <h1 className="font-bold text-[12px] md:text-[20px]"> Créer un évenement</h1>
          </div>

          <Form
            initialValues={{ title: "", description: "", startDate: new Date(), endDate: new Date() }}
            onSubmit={handleSubmit}
            submitButtonLabel="Add event"
          />
        </div>
      </div>
    </Wrapper>
  )
}

export default CreateNewEvent
/* 
example: 
{
    "name": "string",
    "start": number->start_duration,
    "end": number->end_duration,
}
*/