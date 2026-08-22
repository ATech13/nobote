"use client"

import React, { useEffect, useState } from 'react'
import { homePlansContent } from './Objects'
import Title from './Title';
import { ArrowUpCircle, CheckCircle, XCircle } from 'lucide-react';
import Link from "next/link"
import assets from '../assets/assets';
// import manualNotification, {a} from './Notification';

interface HomePlanProps {
  id: number;
  planName: string;
  categorie: string;
  pricePlan: string;
  description: string;
  avantages: string[];
  limitations?: string[];
  duration: string;
}
type Status = "all" | "event" | "month"

const HomePlans = () => {
  const [status, setStatus] = useState<Status>("event")

  let filteredPlans: HomePlanProps[]
  filteredPlans = homePlansContent.filter(plan => plan.categorie === status || plan.categorie === "all")
  if(status === "all") {
    filteredPlans = homePlansContent
  }
  // useEffect(() => {
  //   a
  // })


  return (
    <div>
      <Title title="Plans" description="Dévouvrez les plans disponibles sur noboté" id="homePlan" />
      <div className="p-4">

        <div className="pb-4 flex justify-center items-center">
          <div className="flex items-center">
            <button className={`${status === "all" ? "btn-secondary" : "btn-soft"} btn btn-sm shadow-none`}
              onClick={() => setStatus("all")}
            > Tous </button>
            <button className={`${status === "event" ? "btn-secondary" : "btn-soft"} btn btn-sm shadow-none`}
              onClick={() => setStatus("event")}
            > Event </button>
            <button className={`${status === "month" ? "btn-secondary" : "btn-soft"} btn btn-sm shadow-none`}
              onClick={() => setStatus("month")}
            > Mensuel </button>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-3 p-4 rounded-lg">
          {filteredPlans.map((plan, index) => (
            <div key={plan.id} className={`h-full flex flex-col gap-3 relative p-3
            shadow-md shadow-base-content/30 ${index === 1 ? "py-5 bg-base-100 border-y rounded-[35px] border-secondary border-4" : "bg-base-200 rounded-lg"} `}
            // onClick={() => {manualNotification(`${plan.planName}`, `${assets.nobote_logo}`, "/event/info")}}
            >
              <span
                className="capitalize bg-base-100 border border-secondary absolute top-0 right-0 mr-3 mt-2 badge badge-sm shadow-lg shadow-secondary rounded-full text-secondary animate-bounce"
              > {plan.duration}
              </span>
              <h1 className="capitalize font-bold text-2xl text-center md:text-start">
                {plan.planName}
              </h1>
              <div className="flex justify-center items-end relative">
                <span className="font-bold text-6xl pb-4 text-secondary"> $ </span>
                <h2 className="first-letter:text-5xl first-letter:text-secondary font-bold text-2xl"> {plan.pricePlan}/ </h2>
                <span className="text-sm capitalize badge badge-soft badge-secondary badge-xs">{plan.duration}</span>
              </div>
              <p className="text-xs text-secondary capitalize"> {plan.description} ! </p>
              <ul className="flex flex-col gap-2">
                {plan.avantages.map((avantage, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm first-letter:uppercase">
                    <CheckCircle className="h-4 w-4 text-success" />
                    {avantage}
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-2">
                {plan.limitations?.map((limit, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm first-letter:uppercase">
                    <XCircle className="h-4 w-4 text-error" />
                    {limit}
                  </li>
                ))}
              </ul>
              <Link
                href={`https://wa.me/243900163658?text=Bonjour. J'amerais avoir plus de détails concernant le ${plan.planName}/${plan.categorie} sur Noboté`}
                target="_blank" className="w-full btn btn-sm md:btn-md btn-secondary rounded-lg">
                Mettre à niveau <ArrowUpCircle className="h-4 w-4 rotate-45" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePlans
