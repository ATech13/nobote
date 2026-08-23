"use client"

import Title from "./components/Title";
// import { useState } from "react";
// import SocialLinks from "./components/SocialLinks";
// import styles from "./style"
import Link from "next/link"
import Image from "next/image"
import assets from "./assets/assets";
import SocialLinks from "./components/SocialLinks";
import { badges } from "./components/Objects"
import { homeLinks } from "./components/Objects";
import { useEffect, useState } from "react";
import { FaArrowCircleRight, FaArrowDown } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { HiChevronRight } from "react-icons/hi";
import { EventUser } from "@/type/types";
import HeaderSlider from "./components/HeaderSlider";
import Candidats from "./components/Candidats";
import HomeEvets from "./components/HomeEvets";
import HomeResults from "./components/HomeResults";
import HomePlans from "./components/HomePlans";
import Footer from "./components/Footer";
// import {fetchEvents} from "@/fetchData"

export default function Home() {

  const [file, setFile] = useState<File>()
  const [urls, setUrls] = useState<{
    url: string;
    thumbnailUrl: string | null
  }>();
  const [theme, setTheme] = useState("")

  const getDBTheme = async () => {
    try {
      const response = await fetch("/api/session_user/theme")

      if (!response.ok) {
        console.error("Nous ne pouvons pas recuperer le thème")
      }

      const data = await response.json()
      setTheme(data.theme)


    } catch (error) {
      console.error(
        "Erreur récupération thème:",
        error
      )
    }
  }

  useEffect(() => {
    getDBTheme()
  })

  return (
    <>
      <div className="md:px-20 px-2 py-4">
        <HeaderSlider />
      </div>
      <div className="w-full flex flex-col gap-3 justify-evenly items-center relative px-6 pb-10" >
        <div className="overflow-hidden anim delay1 w-full flex justify-center items-center">
          {/* <Image src={assets.nobote_full} alt="logo de noboté" className="h-full max-h-100 w-auto scale-150 object-cover" /> */}
          {theme === "light" ?
            <Image src={assets.nobote_full} alt="logo de noboté" className="h-full max-h-100 scale-150 object-cover w-auto" /> :
            <Image src={assets.nobote_full_white} alt="logo de noboté" className="h-full max-h-100 scale-150 object-cover w-auto" />
          }
        </div>
        <div className="flex flex-col gap-10 text-start w-full">
          <div className={`grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-4 w-full`}>
            {homeLinks.map((homeLink, index) => (
              <Link key={index} href={homeLink.href} className="w-full relative">
                <div className="custom-card delay3 p-4 backdrop-blur-[5px] bg-base-300/50 rounded-2xl">
                  <div className="flex gap-2 items-center">
                    <div className="h-2 w-6 md:h-6 md:w-2 bg-secondary/45"></div>
                    <div className="font-semibold text-md md:text-lg ">{homeLink.description}</div>
                  </div>
                  <div className="text-xs md:text-sm">{homeLink.desc}</div>
                </div>
                <div className="absolute anim delay4 border border-secondary flex justify-center items-center right-0 bottom-0  w-8 h-8 bg-base-100 backdrop-blur-[5px] rounded-full  ">
                  <HiChevronRight className="text-secondary" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Title title="Winners" description="Gagnants aux évenements passés" id="HomeWinners" />
      <Candidats />
      <Title title="Events" description="Evenement phares récent" id="HomeEvents" />
      <div className="p-4">
        <HomeEvets />
      </div>
      <HomeResults />

      <HomePlans />
      <SocialLinks />
      <Footer />
    </>
  );
}
