"use client"
import React, { useEffect, useState } from 'react'
import styles from '@/app/style'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { LuLoader } from 'react-icons/lu'
import logo from '@/app/assets/logo.jpg'
import WrapperSide from '@/app/components/WrapperSide'
import assets from '@/app/assets/assets'
import { ArrowUpCircle, CheckCircle } from 'lucide-react'
import { BsUpload } from 'react-icons/bs'
import Link from 'next/link'
import { FaRegCalendarAlt } from 'react-icons/fa'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import { FaUserGear, FaUsersGear } from 'react-icons/fa6'
import { AuthUser, UploadedFile } from '@/type/types'
import { useUser } from '@clerk/nextjs'
import FileUpload from '@/app/components/FileUpload'
import { upload } from "@imagekit/next"
import { toast } from 'sonner'

const authenticator = async () => {
    const response = await fetch(
        "/api/auth/imagekit",
        {
            method: "GET",
            cache: "no-store",
        }
    )

    const data = await response.json()

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Impossible d'obtenir les paramètres ImageKit"
        )
    }

    return data
}

const UserCreatePage = () => {

    const [authedUser, setAuthedUser] = useState<AuthUser | null>(null)
    const { isLoaded, user } = useUser();


    useEffect(() => {
        // if(!isLoaded) return 
        const fetchUser = async () => {
            try {
                const response = await fetch("/api/session_user", {
                    method: "GET"
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

    const router = useRouter()
    const [fullName, setFullName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [bio, setBio] = useState('')
    const [eventId, setEventId] = useState('')
    // const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [selectedFile, setSelectedFile] =
        useState<File | null>(null)
    const [uploadedFile, setUploadedFile] =
        useState<UploadedFile | null>(null)

    // const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = event.target.files?.[0] || null
    //     setAvatarFile(file)
    //     if (file) {
    //         const reader = new FileReader()
    //         reader.onload = () => setAvatarPreview(reader.result as string)
    //         reader.readAsDataURL(file)
    //     } else {
    //         setAvatarPreview(null)
    //     }
    // }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)
        setMessage(null)
        setError(null)

        try {

            if (!fullName || !username || !email || !password || !bio || !eventId) {
                toast.error("Veuillez remplir tous les champs")
                return
            }

            let coverImage: string | undefined = undefined
            let coverImageId: string | undefined = undefined

            // =====================================
            // 1. UPLOAD IMAGEKIT
            // =====================================

            if (selectedFile) {

                const authParams = await authenticator()

                const response = await upload({
                    file: selectedFile,
                    fileName: selectedFile.name,

                    publicKey: authParams.publicKey,
                    token: authParams.token,
                    signature: authParams.signature,
                    expire: authParams.expire,

                    folder: "events",

                    useUniqueFileName: true,
                })

                coverImage = response.filePath
                coverImageId = response.fileId

                console.log(
                    "Image uploadée :",
                    response
                )
            }

            const formData = new FormData()
            formData.append('fullName', fullName)
            formData.append('username', username)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('bio', bio)
            formData.append('eventId', eventId)
            if (coverImage) {
                formData.append(
                    "avatarImage",
                    coverImage
                )
            } if (coverImageId) {
                formData.append("avatarImageId", coverImageId)
            }
            // if (avatarFile) {
            //     formData.append('avatarImage', avatarFile)
            // }

            const response = await fetch('/api/users', {
                method: 'POST',
                body: formData,
            })

            const result = await response.json()
            if (!response.ok) {
                toast.error(result.message || 'Erreur lors de la création de l\'utilisateur')
            }

            setMessage('Utilisateur créé avec succès')
            setFullName('')
            setUsername('')
            setEmail('')
            setPassword('')
            setBio('')
            // setAvatarFile(null)
            // setAvatarPreview(null)
            toast.success("Utilisateur ajouté avec succès")
            router.push(`/event/info/${eventId}`)
            setEventId('')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur inattendue')
            toast.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <WrapperSide>
            <div>
                <Breadcrumbs items={[
                    { label: 'Candidates', href: `/user/info`, icon: <FaUsersGear className="md:w-6 md:h-6 h-4 w-4" />, },
                    { label: 'Ajouter un candidat', href: ``, icon: <FaUserGear className="md:w-6 md:h-6 h-4 w-4" />, },
                ]} />
                <div className={`px-6 py-4 ${styles.flexCenter} gap-6 bg-center bg-cover bg-fixed xl:flex-row flex-col`} style={{
                    backgroundImage: `url(${assets.golden_background.src})`
                }}>
                    <div className=''>
                        <Image src={assets.nobote_logo} alt="noboté logo" className="h-full w-full object-cover" />
                    </div>
                    <div className={`w-full max-w-3xl ${styles.flexCenter} flex-col gap-6 bg-base-300/75 backdrop-blur-md rounded-lg p-8 shadow-lg shadow-base-100/70`}>
                        <div className={`${styles.flexBetween} w-full gap-2`}>
                            <h1 className={`${styles.heading2}`}>Ajouter un candidat</h1>
                        </div>

                        <form onSubmit={handleSubmit} className="relative w-full grid gap-4 p-2 border rounded-lg border-base-content/40 shadow-[0px_0px_10px] shadow-base-content/60  ">
                            <div className="grid lg:grid-cols-2 gap-4">
                                {/* <input
                                    value={eventId}
                                    onChange={(e) => setEventId(e.target.value)}
                                    className="input input-bordered w-full z-2 bg-base-100/70 backdrop-blur-xs shadow-md"
                                    placeholder="ID de l'événement"
                                    required
                                /> */}
                                {authedUser && authedUser?.events?.length > 0 ? (
                                    <select
                                        value={eventId}
                                        onChange={(e) => setEventId(e.target.value)}
                                        className="select select-bordered rounded-lg w-full bg-base-100 backdrop-blur-lg shadow-md z-2 px-2 overflow-hidden"
                                        required
                                    >
                                        <option value="">
                                            Sélectionner un événement
                                        </option>
                                        {authedUser?.events.map((event) => (
                                            <option
                                                key={event.id}
                                                value={event.id}
                                                className='overflow-hidden font-semibold shadow-md'
                                            >{event.title}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <Link href={"/event/new"} className="btn btn-secondary btn-soft z-2 rounded-lg">Créer un évenement d'abord</Link>
                                )}
                                <input
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="input input-bordered w-full z-2 bg-base-100/70 backdrop-blur-xs shadow-md"
                                    placeholder="Nom complet"
                                    required
                                />
                                <input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="input input-bordered w-full z-2 bg-base-100/70 backdrop-blur-xs shadow-md"
                                    placeholder="Nom d'utilisateur"
                                    required
                                />
                            </div>

                            <div className="grid lg:grid-cols-2 gap-4">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input input-bordered w-full z-2 bg-base-100/70 backdrop-blur-xs shadow-md"
                                    placeholder="Email"
                                    required
                                />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input input-bordered w-full z-2 bg-base-100/70 backdrop-blur-xs shadow-md"
                                    placeholder="Mot de passe"
                                    required
                                />
                            </div>

                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="textarea textarea-bordered w-full z-2 bg-base-100/70 backdrop-blur-xs shadow-md resize-none"
                                placeholder="Bio"
                                rows={4}
                                required
                            />

                            <div className="flex flex-col gap-3">
                                <label className="text-sm text-gray-400 z-2">Avatar</label>
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    {/* <label className="flex items-center justify-center p-10 rounded-lg cursor-pointer z-2 bg-base-100/70 backdrop-blur-xs shadow-md border border-base-content/40">
                                        {avatarPreview ? <div className="flex flex-col items-center gap-1">
                                            <CheckCircle className="md:h-10 md:w-10 h-6 w-6 text-green-500" />
                                            <span className="text-sm md:text-md text-center"> Changer l'image ? </span>
                                        </div> : <div className="flex flex-col items-center gap-1">
                                            <BsUpload className="md:h-10 md:w-10 h-6 w-6" />
                                            <span className="text-sm md:text-md text-center"> Ajouter l'image du candidat </span>
                                        </div>}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleAvatarChange}
                                        />
                                    </label> */}
                                    <FileUpload
                                        type="image"
                                        accept="image/*"
                                        placeholder="Ajouter une image"
                                        onFileChange={(file) => {
                                            setSelectedFile(file)
                                        }}
                                    />
                                </div>
                            </div>

                            {message && <div className="text-green-500 z-2">{message}</div>}
                            {error && <div className="text-red-500 z-2">{error}</div>}

                            {(authedUser?.rang === "D" || authedUser?.rang === "E") ? (
                                <span className="link link-secondary text-md sm:text-lg" onClick={() => router.push("/plans")}>Augmenter votre rang pour ajouter des users</span>
                            ) : (
                                <button type="submit" className="btn btn-secondary w-full z-2 rounded-lg" disabled={loading}>
                                    {loading ? <span className="flex items-center justify-center gap-2"><LuLoader className="animate-spin" /> Création...</span> : 'Ajouter l\'utilisateur'}
                                </button>
                            )}
                        </form>
                    </div>
                </div>
                <Link href={"/event/new"} className="w-full flex justify-center items-center p-6 bg-base-200 rounded-b-lg gap-4">
                    <FaRegCalendarAlt className="h-14 w-14" />
                    <button className="underline text-xl font-bold text-secondary text-center flex items-center gap-1"> Créer un évenement <ArrowUpCircle className="h-6 w-6 rotate-45" /> </button>
                </Link>
            </div>
        </WrapperSide>
    )
}

export default UserCreatePage
