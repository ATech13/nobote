"use client"

import React, { useEffect, useState } from 'react'
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link';
import { BiSolidDashboard, BiUser } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { AuthUser } from '@/type/types';
import { TbUsersGroup } from 'react-icons/tb';
import { toast } from 'sonner';

const AuthButton = () => {

    const [authedUser, setAuthedUser] = useState<AuthUser | null>(null)

    const router = useRouter()
    const { isLoaded, isSignedIn, user } = useUser();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("/api/session_user", {
                    method: "GET"
                })
                // if(!user) {
                //     console.log("Utilisateur courant introuvable")
                // }

                if (!response.ok) {
                    // toast.error("Erreur lors de la recupération de l'utilisateur connecté")
                    console.error("Erreur lors de la récupération de l'utilisateur connecté")
                }

                const data = await response.json()
                setAuthedUser(data.user)

            } catch (error) {
                console.error("Error getting user:", error)
            }
        }

        fetchUser()
    }, [])

    return (
        <>
            {isSignedIn ? (
                <UserButton>
                    <UserButton.MenuItems>
                        <UserButton.Action label='Dashboard' labelIcon={<BiSolidDashboard />} onClick={() => router.push("/dashboard")} />
                        {authedUser?.rang === "NATION" && (
                            <UserButton.Action label='Utilisateurs' labelIcon={<TbUsersGroup />} onClick={() => router.push("/authedUsers")} />
                       )}
                    </UserButton.MenuItems>
                </UserButton>
            ) : (
                <Link href={"/sign-in"} className="flex overflow-hidden p-1 skeleton rounded-full bg-base-300 items-center justify-center border border-base-content/40">
                    {/* <Image src={assets.user_icon} alt="Connexion" className='h-full w-full object-cover' /> */}
                    <BiUser className="h-5.5 w-5.5" />
                </Link>
            )
            }
        </>
    )
}

export default AuthButton
