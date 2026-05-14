

import { BaggageClaimIcon, LucideBarChart4, SettingsIcon, ShoppingCartIcon, Phone, LocationEdit, GraduationCap, CircleQuestionMark  } from 'lucide-react';
import img1 from "@/app/assets/crowns/q1.jpg"
import img2 from "@/app/assets/crowns/q2.jpg"
import img3 from "@/app/assets/crowns/k1.jpg"
import miss1 from "@/app/assets/candidats/nobote_1.jpg"
import miss2 from "@/app/assets/candidats/nobote_2.jpg"
import miss3 from "@/app/assets/candidats/nobote_3.jpg"
import { IoPersonCircleOutline } from 'react-icons/io5';
import React from 'react'
import { FaCreditCard, FaFacebook, FaHandshake, FaInstagramSquare, FaPlusCircle, FaRegCalendarAlt, FaWhatsappSquare } from 'react-icons/fa'
import { FaUsersGear } from 'react-icons/fa6'
import { IoBarChartOutline, IoImages, IoNewspaper, IoPhonePortrait, IoSettingsOutline } from 'react-icons/io5'
import { LiaListUlSolid } from 'react-icons/lia'
import { TfiYoutube } from 'react-icons/tfi'
import { MdAddCircle, MdOutlineInfo, MdOutlineLocalActivity } from 'react-icons/md';



export const badges = [
  {
    id: 1,
    icon: <IoPersonCircleOutline className="h-4 w-4 md:h-6 md:w-6" />,
    description: "The quick brown fox jumps over the lazy dog",
  },
  {
    id: 2,
    icon: <ShoppingCartIcon className="h-4 w-4 md:h-6 md:w-6" />,
    description: "The quick brown fox",
  },
  {
    id: 3,
    icon: <BaggageClaimIcon className="h-4 w-4 md:h-6 md:w-6" />,
    description: "The quick brown fox jumps over the lazy dog",
  },
  {
    id: 4,
    icon: <LucideBarChart4 className="h-4 w-4 md:h-6 md:w-6" />,
    description: "The quick brown fox jumps over the lazy dog",
  },
  {
    id: 5,
    icon: <SettingsIcon className="h-4 w-4 md:h-6 md:w-6" />,
    description: "The quick brown fox jumps over the lazy dog",
  },
  {
    id: 6,
    icon: <GraduationCap className="h-4 w-4 md:h-6 md:w-6" />,
    description: "The quick brown fox jumps over the lazy dog"
  },
]


export const homeLinks = [
  {
    id: 1,
    description: "Activités",
    href: "/event/list",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur dolore sequi natus ipsum nostrum ets."
  },
  {
    id: 2,
    description: "Infos des Miss",
    href: "/miss/info",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur dolore sequi natus ipsum nostrum ets."
  },
  {
    id: 3,
    description: "Créer un event",
    href: "/event/new",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur dolore sequi natus ipsum nostrum ets."
  },
  {
    id: 4,
    description: "Miss des events",
    href: "/miss/event",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur dolore sequi natus ipsum nostrum ets."
  },
  {
    id: 6,
    description: "Détails events",
    href: "/event/info",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur dolore sequi natus ipsum nostrum ets."
  },
]

export const eventLists = [
  {
    id: 1,
    missImage: img1,
    eventTitle: "Evenement 1 miss",
  },
  {
    id: 2,
    missImage: img2,
    eventTitle: "Evenement 2 nombre",
  },
  {
    id: 3,
    missImage: img3,
    eventTitle: "The quick brown fox jumps over the lazy dog",
  },
]


export const missCandidats = [
  {
    id: 1,
    missImage: miss1,
    eventTitle: "Evenement 1 miss",
  },
  {
    id: 2,
    missImage: miss2,
    eventTitle: "Evenement 2 nombre",
  },
  {
    id: 3,
    missImage: miss3,
    eventTitle: "The quick brown fox jumps over the lazy dog",
  },
]


export const menuContent = [
    {
        id: 1,
        icon: <IoBarChartOutline className="md:w-6 md:h-6 h-4 w-4" />,
        label: "Résultats",
        href: "/results",
    },
    {
        id: 2,
        icon: <FaUsersGear className="md:w-6 md:h-6 h-4 w-4" />,
        label: "Candidats",
        href: "/user/info",
    },
    // {
    //     id: 3,
    //     icon: <IoSettingsOutline className="md:w-6 md:h-6 h-4 w-4" />,
    //     label: "Compte",
    //     href: "/signIn",
    // },
    // {
    //     id: 4,
    //     icon: <FaHandshake className="md:w-6 md:h-6 h-4 w-4" />,
    //     label: "Soutenir",
    //     href: "/",
    // },
    {
        id: 5,
        icon: <FaRegCalendarAlt className="md:w-6 md:h-6 h-4 w-4" />,
        label: "Evenements",
        href: "/event/info",
    },
    // {
    //     id: 6,
    //     icon: <MdAddCircle className="md:w-6 md:h-6 h-4 w-4" />,
    //     label: "Créer",
    //     href: "/",
    // },
    // {
    //     id: 7,
    //     icon: <IoImages className="md:w-6 md:h-6 h-4 w-4" />,
    //     label: "Gallerie",
    //     href: "/",
    // },
    // {
    //     id: 8,
    //     icon: <MdOutlineLocalActivity className="md:w-6 md:h-6 h-4 w-4" />,
    //     label: "Activités",
    //     href: "/",
    // },
    // {
    //     id: 9,
    //     icon: <MdOutlineInfo className="md:w-6 md:h-6 h-4 w-4" />,
    //     label: "Détails",
    //     href: "/",
    // },
]

export const socialLinks = [
    {
        id: 1,
        icon: <FaInstagramSquare className='h-4 w-4' />,
        description: "Instagram",
        href: "https://www.instagram.com",
    },
    {
        id: 2,
        icon: <FaFacebook className='h-4 w-4' />,
        description: "Facebook",
        href: "https://www.facebook.com",
    },
    // {
    //     id: 3,
    //     icon: <TfiYoutube className='h-4 w-4' />,
    //     description: "Youtube",
    //     href: "#https://www.youtube.com",
    // },
    {
        id: 4,
        icon: <IoPhonePortrait className='h-4 w-4' />,
        description: "Téléphone",
        href: "https://www.whatsapp.com",
    },
    // {
    //     id: 5,
    //     icon: <FaWhatsappSquare className='h-4 w-4' />,
    //     description: "Whatsapp",
    //     href: "/",
    // },
    // {
    //     id: 6,
    //     icon: <LocationEdit className='h-4 w-4' />,
    //     description: "Localisation",
    //     href: "/",
    // },
    // {
    //     id: 7,
    //     icon: <CircleQuestionMark className='h-4 w-4' />,
    //     description: "Questions",
    //     href: "/",
    // },
]
