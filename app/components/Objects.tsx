

import { BaggageClaimIcon, LucideBarChart4, SettingsIcon, ShoppingCartIcon, GraduationCap } from 'lucide-react';
import img1 from "@/app/assets/crowns/q1.jpg"
import img2 from "@/app/assets/crowns/q2.jpg"
import img3 from "@/app/assets/crowns/k1.jpg"
import miss1 from "@/app/assets/candidats/nobote_1.jpg"
import miss2 from "@/app/assets/candidats/nobote_2.jpg"
import miss3 from "@/app/assets/candidats/nobote_3.jpg"
import { IoPersonCircleOutline } from 'react-icons/io5';
import React from 'react'
import { FaFacebook, FaInstagramSquare, FaRegCalendarAlt } from 'react-icons/fa'
import { FaUsersGear } from 'react-icons/fa6'
import { IoBarChartOutline, IoPhonePortrait } from 'react-icons/io5'
import assets from '../assets/assets';


// SLIDE HOME DATA CONTENT
export const sliderData = [
  {
    id: 1,
    title: "Activités de tout genre :-: Elections professionnelles",
    offer: "Professionnalisme et fiabilité ++",
    buttonText1: "S'inscrire",
    buttonText2: "Se connecter",
    imgSrc: assets.miss_1,
  },
  {
    id: 2,
    title: "Découvrez le plasir de vôter :-: La non-beauté mise en avant",
    offer: "Présentation des candidats 100% !",
    buttonText1: "Evenements",
    buttonText2: "Candidats",
    imgSrc: assets.miss_2,
  },
  {
    id: 3,
    title: "Suivi amélioré en profondeur :-: Résultats accessibles en temps réels",
    offer: "Transparence et clarté !!!",
    buttonText1: "Consulter",
    buttonText2: "En savoir plus",
    imgSrc: assets.miss_3,
  },
];
// SLIDE HOME DATA CONTENT

// WINNER CANDIDATS HOME CONTENT
export const candidatsData = [
  {
    id: 1,
    candidatPicture: assets.winner_1,
    eventName: "Meilleure école Goma 2025-2026",
  },
  {
    id: 2,
    candidatPicture: assets.winner_2,
    eventName: "Miss Ecocinq",
  },
  {
    id: 3,
    candidatPicture: assets.winner_3,
    eventName: "Meilleur joueur FIFA 2026",
  },
  {
    id: 4,
    candidatPicture: assets.winner_4,
    eventName: "Meilleure option 2026",
  },
  {
    id: 5,
    candidatPicture: assets.winner_5,
    eventName: "Meilleure formation 2me édition GenioTech",
  },
  {
    id: 6,
    candidatPicture: assets.winner_6,
    eventName: "Meilleure réseau social",
  },
  {
    id: 7,
    candidatPicture: assets.winner_7,
    eventName: "Meilleur style",
  },
]
// WINNER CANDIDATS HOME CONTENT

// WINNER EVENTS HOME CONTENT
export const homeEventContent = [
  {
    id: 1,
    eventImage: assets.ecocinq,
    name: "élection miss 50naire",
    description: "Pour l'activité culturelle organisée dans l'année 2025-2026 en vue de promouvoir la culture, la science et les valeurs africaines",
  },
  {
    id: 2,
    eventImage: assets.bal,
    name: "bal de fin d'année 2025-2026",
    description: "Pour le vôte de la meilleure école de la ville de Goma/DRC, du meilleur doyen, de la meilleure option pour l'année scolaire avec plus de 500 vôtes",
  },
]
// WINNER EVENTS HOME CONTENT

// HOME PLANS
export const homePlansContent = [
  {
    id: 1,
    planName: "plan freemium",
    categorie: "all",
    pricePlan: "0.00",
    description: "Création jusqu'à 5 évenements gratuitement",
    avantages: [
      "Création d'évenements",
      "Plan totalement gratuit",
      "Invitation à la participation à l'évenement",
      "Visualisation de l'évenement",
      "Accès à d'autres évenements disponibles",
      "Rang C accordé",
    ],
    limitations: [
      "Limité à seulement 5 évenements",
      "L'accord de l'administrateur est essentiel pour l'affichage",
      "Nombre des candidats limité par évenement",
    ],
    duration: "gratuit",
  },
  
  {
    id: 2,
    planName: "plan pro",
    categorie: "event",
    pricePlan: "1.97",
    description: "Création d'un évenement et validation directe",
    avantages: [
      "Un seul compte admin",
      "évenement directement officiel",
      "gestion totale sur l'évenement créé",
      "Réduction sur le prochain évenement",
      "Gérer la visualisation des résultats",
      "Accès à d'autres évenements disponibles",
      "Rang B accordé",
    ],
    limitations: [
      "Plan pour un évenement unique",
    ],
    duration: "populaire",
  },
  
  {
    id: 3,
    planName: "plan pro",
    categorie: "month",
    pricePlan: "4.97",
    description: "évenements certifiés pour tout le mois",
    avantages: [
      "Compte admin accordé",
      "jusqu'à 10 évenements par mois",
      "Visibilité des évenements sur la plateforme",
      "Accès à d'autres évenements disponibles",
      "Rang A accordé",
      "Personnalisation des évenements à ajouter",
    ],
    limitations: [
      "Valable pour un mois",
      "10 évenements maximum par mois",
      "Un seul compte admin",
    ],
    duration: "populaire",
  },
  
  {
    id: 4,
    planName: "plan premium",
    categorie: "all",
    pricePlan: "9.97",
    description: "évenements certifiés pour un trimestre",
    avantages: [
      "Utilisation de 2 comptes admins",
      "jusqu'à plus de 10 évenements par mois",
      "Visibilité des évenements sur la plateforme",
      "Accès à d'autres évenements disponibles",
      "Rang S accordé",
      "Personnalisation des évenements à ajouter",
    ],
    duration: "3 mois",
  },
  
  {
    id: 5,
    planName: "plan custom",
    categorie: "all",
    pricePlan: "_.__",
    description: "Plan personnalisable en fonction de vos besoins",
    avantages: [
      "Compte certifié sur Noboté",
      "2 ou plusieurs compte admin",
      "jusqu'à un nombre personnalisable d'events",
      "Visibilité de l'évenement sur la plateforme",
      "Plan adapté aux business et start-up",
      "Accès à d'autres évenements disponibles",
      "Rang SS accordé",
      "Accès à la communauté",
      "Plan annuel disponible",
    ],
    duration: "1an ou personnalisation",
  },
]
// HOME PLANS
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
    description: "Evénements",
    href: "/event/info",
    desc: "Voir la liste des évenements disponibles auxquels vous pouvez participer"
  },
  {
    id: 2,
    description: "Candidats",
    href: "/user/info",
    desc: "Voir la liste de tous les candidats de tous les évenements disponibles"
  },
  {
    id: 3,
    description: "Créer un event",
    href: "/event/new",
    desc: "Lancer votre propre évenement sur Noboté et ajouter des candidats"
  },
  {
    id: 4,
    description: "Résultats",
    href: "/results",
    desc: "Visualisez en temps réel l'évolution des résultats de différents évenements"
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
  {
    id: 4,
    icon: <IoPhonePortrait className='h-4 w-4' />,
    description: "Téléphone",
    href: "https://www.whatsapp.com",
  },
]
