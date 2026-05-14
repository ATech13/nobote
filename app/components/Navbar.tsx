"use client"

import React, { useState } from 'react'
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"



import { X } from "lucide-react";
import logo from "../assets/logo.jpg";
import SidebarContent from "./SidebarContent";
import Link from "next/link"
import { IoHome, IoPersonCircleOutline } from 'react-icons/io5';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { GoSignOut } from 'react-icons/go';
// import menuBackground from "../assets/menu_background.jpg"

const Navbar = () => {

    const { data: session } = useSession()

    const [menu, setMenu] = useState(false)
    const [connexion, setConnexion] = useState(false)
    const [vip, setVip] = useState(false)

    return (
        <>
            <div className='fixed flex justify-between  items-center z-99 p-6 backdrop-blur-[5px] backdrop-brightness-110 backdrop-contrast-110 top-0 left-0 w-full'>
                {/* NAVBAR */}
                <Link href={`/event/info`} className="flex items-center gap-2 z-100">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                        <Image src={logo} alt="logo de noboté" />
                    </div>
                    <span className="uppercase font-bold text-xl md:text-2xl text-secondary">noboté</span>
                </Link>

                <div className=" flex items-center gap-2">
                    {/* {session?.user?.image ? (
                        <Image src={session.user.image} alt="Profile picture" width={30} height={30} className=" rounded-full " onClick={() => {
                            const modal = document.getElementById("my_modal_3") as HTMLDialogElement | null;
                            if (modal) {
                                modal.showModal();
                            }
                        }} />

                    ) : (
                        <Link href={"/signIn"} className="rounded-lg text-secondary btn sm:btn-sm btn-xs bg-secondary-opacity overflow-hidden bg-base-300">
                            <IoPersonCircleOutline className="h-4 w-4 md:h-6 md:w-6" onClick={() => setConnexion(!connexion)} />
                        </Link>
                    )}

                    <Link href="/" className="btn btn-xs sm:btn-sm text-secondary bg-secondary-opacity">
                        <IoHome className="h-4 w-4" />
                    </Link> */}

                    <div onClick={() => setMenu(!menu)} className="text-secondary border-none cursor-pointer bg-secondary-opacity btn sm:btn-sm btn-xs">
                        <button className="">
                            {menu ? <X className="h-4 w-4" /> : <AiOutlineMenuUnfold className="h-4 w-4" />}
                        </button>
                    </div>
                </div>
                {/* END NAVBAR */}

                <div className={`absolute top-0 ${menu ? "left-0" : "-left-full"} h-screen flex justify-center items-center
            w-fit max-w-120 p-4 text-gray-400 duration-700 z-99 backdrop-blur-3xl backdrop-brightness-200
            `}
                    onClick={() => setMenu(!menu)}
                >
                    <SidebarContent />
                </div>

                {/* <div className={`absolute top-0 ${menu ? "left-0" : "-left-full"} h-screen flex justify-center items-center
            w-[80%] max-w-120 p-4 text-gray-400 duration-700 z-99 backdrop-blur-3xl backdrop-brightness-200
            `}
                    onClick={() => setMenu(!menu)}
                >
                    <SidebarContent />
                </div> */}
            </div>
            {session?.user?.image && <div>
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm border bordered rounded-full text-secondary absolute right-2 top-2">✕</button>
                        </form>

                        <div className="flex items-center justify-around text-sm gap-4 mb-4">
                            <div className="flex gap-2 items-center justify-center">
                                <Image src={session.user.image} alt="profile picture" width={40} height={40} className="rounded-full" />
                                <span>{session?.user?.name}</span>
                            </div>
                            <span className="badge badge-secondary badge-sm">{session?.user?.email}</span>
                        </div>
                        <h3 className="text-lg">Bienvenue sur la plateforme <span className="title_gradient font-bold text-secondary uppercase">noboté</span></h3>
                        <button className="btn btn-secondary w-full mt-4" onClick={() => signOut({ callbackUrl: "/signIn" })}><GoSignOut className="h-4 w-4 text-white" />Deconnexion</button>
                    </div>
                </dialog>
            </div>}
        </>

    )
}

export default Navbar