"use client"
import React from 'react'
import styles from "@/app/style"
import Image from 'next/image'
import { useRouter } from "next/navigation"
import Form from '@/app/components/Form'
import assets from '@/app/assets/assets';
import WrapperSide from '@/app/components/WrapperSide';
import Link from 'next/link'
import { FaRegCalendarAlt, FaRegCalendarPlus, FaUserPlus } from 'react-icons/fa'
import { ArrowUpCircle } from 'lucide-react'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import { toast } from 'sonner'


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
          toast.error(
            error.message || "❌ ERROR: Impossible de créer l'événement"
          )
        } catch (parseError) {
          console.error(`Failed to create event: ${response.statusText}`)
          toast.error(
            "Une erreur est survenue. Veuillez réessayer."
          )
        }
      }
      toast.success("✅ SUCCESS : Événement créé avec succès")

      router.replace(`/dashboard`)
    } catch (error) {
      console.error(error)
      router.replace("/sign-in")
    }
  }

  return (
    <WrapperSide>
      <div>
        <Breadcrumbs items={[
          { label: 'Evenements', href: `/event/info`, icon: <FaRegCalendarAlt className="md:w-6 md:h-6 h-4 w-4" />, },
          { label: 'Créer un évenement', href: ``, icon: <FaRegCalendarPlus className="md:w-6 md:h-6 h-4 w-4" />, },
        ]} />
        <div className="grid lg:grid-cols-2 gap-3 px-4 py-6 min-h-[80vh] bg-center bg-cover" style={{
          backgroundImage: `url(${assets.golden_background.src})`
        }}>
          <div className=''>
            <Image src={assets.nobote_logo} alt="noboté logo" className="h-full w-full object-cover" />
          </div>
          <div className={`${styles.flexCenter}`}>
            <div className={`w-full ${styles.flexCenter} flex-col p-6 rounded-lg gap-4 bg-base-300 border_animate`}>
              <div className={`${styles.flexBetween} w-full gap-2 z-2`}>
                <div className="flex items-center gap-1">
                  <div className="h-6 w-6 scale-120 rounded-full overflow-hidden">
                    <Image src={assets.nobote_logo} alt="logo de noboté" />
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
        </div>

        <Link href={"/user/new"} className="w-full flex justify-center items-center p-6 bg-base-200 rounded-b-lg gap-4">
          <FaUserPlus className="h-14 w-14" />
          <button className="underline text-xl font-bold text-secondary text-center flex items-center gap-1"> Ajouter un candidat <ArrowUpCircle className="h-6 w-6 rotate-45" /> </button>
        </Link>
      </div>
    </WrapperSide>
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