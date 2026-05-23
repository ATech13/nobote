"use client"

import Wrapper from "./components/Wrapper"
import background from "./assets/golden-bg.jpg";
// import { useState } from "react";
// import SocialLinks from "./components/SocialLinks";
// import styles from "./style"
import Link from "next/link"
import SocialLinks from "./components/SocialLinks";
import { badges } from "./components/Objects"
import { homeLinks } from "./components/Objects";
import { useEffect, useState } from "react";
import { FaArrowCircleRight, FaArrowDown } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { HiChevronRight } from "react-icons/hi";
import { useEdgeStore } from "@/lib/edgestore";
import { EventUser } from "@/type/types";
// import {fetchEvents} from "@/fetchData"

export default function Home() {

const [file, setFile] = useState<File>()
const { edgestore } = useEdgeStore()
const [urls, setUrls] = useState<{
  url: string;
  thumbnailUrl: string | null
}>();

  return (
    <Wrapper>
      <>
        {/* <div>
        {
          events.map((e) =>(
            <div>
              {e.name}
            </div>
          ))
        }
      </div> */}
        <div className="min-h-screen w-full flex flex-col gap-3 justify-evenly items-center relative px-6 pb-10" style={{
          backgroundImage: `url(${background.src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}>
          <div className="md:mt-20 mt-30">
            <h1 className="anim delay1 uppercase font-bold text-7xl md:text-9xl title_gradient">noboté</h1>
            <p className="anim delay2 text-md md:text-2xl text-[#3a3a3a]">Venez présenter votre <span className="uppercase title_gradient font-bold">noboté</span> ici, et découvez les non-beaux et non-belles</p>
          </div>
          <div className="flex flex-col gap-10  text-start">
            <div className={`flex flex-col max-h-250 md:flex-row gap-4 `}>
              {homeLinks.map((homeLink, index) => (
                <Link key={index} href={homeLink.href} className=" relative">
                  <div className="custom-card delay3 p-4 backdrop-blur-[5px] backdrop-brightness-110 backdrop-contrast-110 rounded-2xl">
                    <div className="flex gap-2 items-center text-sm">
                      <div className="h-6 w-0.5 bg-secondary"></div>
                      <div className="font-semibold text-[#3a3a3a]">{homeLink.description}</div>
                    </div>
                    <div className="text-xs text-[#5b5959]">{homeLink.desc}</div>
                  </div>
                  <div className="absolute anim delay4  flex justify-center items-center right-0 bottom-0  w-8 h-8 bg-white/50 backdrop-blur-[5px] rounded-full  ">
                    <HiChevronRight className="text-secondary" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <SocialLinks />

        {/* <div className="w-full grid md:grid-cols-2 gap-2 px-6 py-6 duration-500 bg-base-200">
          {badges.map((badge, index) => (
            <div key={index} className="p-3 bg-base-100 flex items-center border border-base-300 gap-2 rounded-lg duration-500 translate_animate">
              <div className="rounded-lg bg-secondary-opacity text-secondary p-3">
                {badge.icon}
              </div>
              <p className="text-xs md:text-sm">
                {badge.description}
              </p>
            </div>
          ))}
        </div> */}
        <div className="flex flex-col items-center m-6 gap-2">
          <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0])}
          />
          <button className="btn" onClick={async () => {
            if(file) {
              const res = await edgestore.publicFiles.upload({file})

              setUrls({
                url: res.url,
                thumbnailUrl: "res.thumbnailUrl",
              })
            }
          }}>
            Upload
          </button>
          {urls?.url && <Link href={urls.url}></Link>}
        </div>
      </>
    </Wrapper>
  );
}
