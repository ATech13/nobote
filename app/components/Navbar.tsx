"use client"

import Image from "next/image"
// import { useSession } from "next-auth/react"



import Link from "next/link"
import assets from '../assets/assets';
import { FaRegCalendarAlt, FaUserAlt } from 'react-icons/fa';
import { FaUsersGear } from 'react-icons/fa6'
import { IoBarChartOutline } from 'react-icons/io5'
import { usePathname, useRouter } from 'next/navigation';
import { BadgeCheck, CopyPlus } from 'lucide-react'
import { GiUpgrade } from 'react-icons/gi'
import { AuthUser } from "@prisma/client";
import { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import AuthButton from "./AuthButton";
import ToggleTheme from "./ToggleTheme";
import { toast } from "sonner";
import { GrRefresh } from "react-icons/gr";
import { BiDotsVerticalRounded } from "react-icons/bi";

const Navbar = () => {

    const [authedUser, setAuthedUser] = useState<AuthUser | null>(null)
    const { isLoaded, isSignedIn, user } = useUser();
    const [theme, setTheme] = useState("light")
    const router = useRouter()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("/api/session_user", {
                    method: "POST"
                })

                if (!user?.primaryEmailAddress?.emailAddress) return
                if (!response.ok) {
                    throw new Error("Failed to get user")
                }

                const data = await response.json()

                setAuthedUser(data.user)
            } catch (error) {
                console.error("Error getting user:", error)
            }
        }
        fetchUser()
    }, [])

    const getDBTheme = async () => {
        try {
            const response = await fetch("/api/session_user/theme")

            if (!response.ok) {
                toast.warning("Veuillez vous authentifier")
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
        document.documentElement.setAttribute("data-theme", theme)
    })

    // const { data: session } = useSession()
    const pathname = usePathname()
    const menuItems = [
        { name: 'évenements', path: '/event/info', icon: <FaRegCalendarAlt className="md:w-6 md:h-6 h-4 w-4" />, },
        { name: 'candidats', path: '/user/info', icon: <FaUsersGear className="md:w-6 md:h-6 h-4 w-4" />, },
        { name: 'résultats', path: '/results', icon: <IoBarChartOutline className="md:w-6 md:h-6 h-4 w-4" />, },
    ];

    return (

        <>
            <div className='sticky flex justify-between items-center z-99 px-6 py-2 sm:py-1 bg-base-100/70 backdrop-blur-[5px] top-0 left-0 sm:w-full sm:border-b border-base-content/40 shadow-xs'>
                {/* NAVBAR */}
                <div className="flex items-center gap-1">
                    <button onClick={() => window.location.reload()}>
                        <GrRefresh className="h-5 w-5" />
                    </button>
                    <Link href={"/user/info"} className="flex items-center gap-1 z-100">
                    <div className="overflow-hidden">
                        {theme === "light" ?
                            <Image src={assets.nobote_full} alt="logo de noboté" className="hidden sm:block h-full w-40 scale-150 object-cover" /> :
                            <Image src={assets.nobote_full_white} alt="logo de noboté" className="hidden sm:block h-full w-40 scale-150 object-cover" />
                        }
                        <Image src={assets.nobote_logo} alt="Logo de noboté" className="h-12 w-12 block sm:hidden" />
                    </div>
                    {/* <span className="uppercase font-bold text-2xl md:text-3xl">noboté</span> */}
                </Link>
                </div>

                <ul className="sm:flex items-center gap-2 hidden">
                    {menuItems.map((item) => {

                        const isActive = pathname === item.path;

                        return (
                            <li key={item.name} className='px-2'>
                                <Link href={item.path} key={item.name} passHref className={`max-md:text-sm font-semibold capitalize hover:text-secondary transition-all duration-300 ease-in-out ${isActive ? "text-secondary uppercase" : ""}`}>
                                    {/* <div className="text-secondary">{item.icon}</div> */}
                                    <p className='md:block hidden text-center capitalize'>{item.name}</p>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <div className="hidden md:flex items-center gap-1">
                    <AuthButton />
                </div>

                <div className="md:hidden flex items-center gap-1">
                    <AuthButton />
                    <div className="dropdown dropdown-end md:hidden">
                        <div tabIndex={0} role="button" className="md:hidden block"> <BiDotsVerticalRounded className="h-5.5 w-5.5" /> </div>
                        <ul tabIndex={-1} className="dropdown-content menu gap-2 bg-base-200/80 backdrop-blur-lg rounded-box z-1 w-52 p-2 shadow-md text-xs">
                            {menuItems.map((item) => {

                                const isActive = pathname === item.path;

                                return (
                                    <li key={item.name} className=''>
                                        <Link href={item.path} key={item.name} passHref className={`font-semibold capitalize transition-all duration-300 ease-in-out
                                        flex items-center gap-2 ${isActive ? "bg-base-100" : ""}`}>
                                            <div className="">{item.icon}</div>
                                            <p className='capitalize'>{item.name}</p>
                                        </Link>
                                    </li>
                                );
                            })}
                            <li className=''>
                                <Link href={"/event/new"} passHref className="font-semibold capitalize transition-all duration-300 ease-in-out
                                        flex items-center gap-2 ">
                                    <div className=""> <CopyPlus className="h-4 w-4" /> </div>
                                    <p className='capitalize'> Créer un évent</p>
                                </Link>
                            </li>
                            <li className=''>
                                <Link href={"/#homePlan"} passHref className="font-semibold capitalize transition-all duration-300 ease-in-out
                                        flex items-center gap-2 ">
                                    <div className=""> <BadgeCheck className="h-4 w-4" /> </div>
                                    <p className='capitalize'> Mettre à niveau</p>
                                </Link>
                            </li>
                            {/* <li className='flex'>
                                <input
                                    type="checkbox"
                                    name="theme-dropdown"
                                    className="theme-controller toggle"
                                    value="sunset" />
                            </li> */}
                        </ul>
                    </div>
                </div>
                {/* END NAVBAR */}
            </div>
        </>

    )
}

export default Navbar