"use client"

import React, { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { AuthUser } from '@/type/types'
import { useRouter } from 'next/navigation'
import WrapperSide from '../components/WrapperSide'
import Link from 'next/link'
import { toast } from 'sonner'

const AuthedUsers = () => {
    const [authedUsers, setAuthedUsers] = useState<AuthUser[] | null>(null)
    const [authedUser, setAuthedUser] = useState<AuthUser | null>(null)
    const { isLoaded, isSignedIn, user } = useUser();
    const router = useRouter()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("/api/session_user", {
                    method: "GET"
                })

                if (!response.ok) {
                    toast.error("❌ ERROR: Impossible de récuperer l'utilisateur connecté")
                }

                const data = await response.json()
                console.log(data.user)
                setAuthedUser(data.user)
                toast.success("✅ SUCCESS : Utilisateur récuperé avec success")

            } catch (error) {
                console.error("Error getting user:", error)
                toast.error("❌ ERROR: Quelque chose ne va pas, veuillez patienter")
            }
        }

        fetchUser()
    }, [])

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await fetch("/api/session_user/authedUsers", {
                    method: "GET"
                })
                // if (!authedUser) {
                //     router.push("/sign-in")
                //     throw new Error("Utilisateur non authentifié")
                // }
                if (!response.ok) {
                    throw new Error("Failed to get users")
                }

                const data = await response.json()
                console.log(data.users)
                setAuthedUsers(data.users)

            } catch (error) {
                console.error("Error getting user:", error)
            }
        }
        fetchAllUsers()
    }, [])
    return (
        <WrapperSide>
            {authedUser?.rang === "NATION" ? (
                <div className="grid w-full gap-2 place-items-center py-4 px-2">
                    <h1 className="text-center text-lg md:text-xl text-success font-semibold"> Liste de tous les utilisateurs connectés </h1>
                    {/* TABLE DAISYUI FOR ALL USERS LIST */}
                    <div className="overflow-x-auto w-full max-w-3xl">
                        <table className="table table-xs table-zebra table-pin-rows table-pin-cols w-full">
                            <thead>
                                <tr>
                                    <th></th>
                                    <td>Name</td>
                                    <td>UserName</td>
                                    <td>Email</td>
                                    <td>Rang</td>
                                    <td>Certification</td>
                                    <td>Créé le</td>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {authedUsers?.map((user, index) => (
                                    <tr key={user.clerkId} className='text-xs md:text-sm'>
                                        <th> {index + 1} </th>
                                        <td>{user.fullName}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.rang}</td>
                                        <td> {user.isCertified ? (
                                            <div className="badge badge-success badge-xs badge-soft">Certifié</div>
                                        ) : (
                                            <div className="badge badge-error badge-xs badge-soft">Non certifié</div>
                                        )} </td>
                                        <td>{new Date(user.createdAt).toLocaleDateString("FR-fr")}</td>
                                        <th> {index + 1} </th>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="h-[80vh] w-full flex items-center justify-center p-6 flex-col gap-3">
                    <p className="text-lg text-secondary font-semibold">Vous devez être de rang nation pour acceder à cette page</p>
                    <Link href={"/user/info"} className="btn btn-secondary btn-sm btn-soft rounded-lg">Voir la liste des événements</Link>
                </div>
            )}
        </WrapperSide>
    )
}

export default AuthedUsers
