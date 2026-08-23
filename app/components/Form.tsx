"use client"
import React, { useEffect, useState } from 'react'
import styles from '../style'
import { AuthUser, FormPropsInterface, UploadedFile } from '@/type/types'
import { CheckCircle, Loader } from 'lucide-react'
import { BsUpload } from 'react-icons/bs'
import FileUpload from './FileUpload'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { upload } from "@imagekit/next"

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

const Form = ({ initialValues, onSubmit, submitButtonLabel, coverImagePreview }: FormPropsInterface) => {

    const [authedUser, setAuthedUser] = useState<AuthUser | null>(null)
    const { isLoaded, user } = useUser();
    const router = useRouter()
    const [loader, setLoader] = useState(false)

    const [formData, setFormData] = useState({
        title: initialValues.title,
        description: initialValues.description,
        startDate: initialValues.startDate
            ? new Date(initialValues.startDate).toISOString().split("T")[0]
            : "",
        endDate: initialValues.endDate
            ? new Date(initialValues.endDate).toISOString().split("T")[0]
            : "",
    })
    // const [image, setImage] = useState<File | null>(null)
    const [imagePath, setImagePath] = useState<string | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(
        coverImagePreview || null
    )
    // const [uploadedFile, setUploadedFile] =
    //     useState<UploadedFile | null>(null)
    const [selectedFile, setSelectedFile] =
        useState<File | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0] || null;
    //     setImagePath(file)

    //     if (file) {
    //         const reader = new FileReader()
    //         reader.onload = () => setImagePreview(reader.result as string)
    //         reader.readAsDataURL(file)
    //     } else {
    //         setImagePreview(null)
    //     }
    // }

    // const handleSubmit = async (
    //     e: React.FormEvent<HTMLFormElement>
    // ) => {
    //     e.preventDefault()

    //     const form = new FormData()

    //     form.append(
    //         "title",
    //         formData.title
    //     )

    //     form.append(
    //         "description",
    //         formData.description
    //     )

    //     form.append(
    //         "startDate",
    //         formData.startDate
    //     )

    //     form.append(
    //         "endDate",
    //         formData.endDate
    //     )

    //     // if (selectedFile) {
    //     //     form.append(
    //     //         "coverImage",
    //     //         selectedFile.filePath
    //     //     )
    //     // }

    //     await onSubmit(form)
    // }

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault()
        setLoader(true)

        try {
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
            }

            // =====================================
            // 2. CREATION DU FORMDATA
            // =====================================

            const form = new FormData()

            form.append(
                "title",
                formData.title
            )

            form.append(
                "description",
                formData.description
            )

            form.append(
                "startDate",
                formData.startDate
            )

            form.append(
                "endDate",
                formData.endDate
            )

            if (coverImage) {
                form.append(
                    "coverImage",
                    coverImage
                )
            }

            if (coverImageId) {
                form.append("coverImageId", coverImageId)
            }

            // =====================================
            // 3. ENVOI AU PARENT
            // =====================================

            await onSubmit(form)

        } catch (error) {

            console.error(
                "Erreur lors de la soumission :",
                error
            )
        } finally {
            setLoader(false)
        }
    }

    useEffect(() => {
        // if(!isLoaded) return 
        const fetchUser = async () => {
            try {
                const response = await fetch("/api/session_user", {
                    method: "GET"
                })

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

    useEffect(() => {
        console.log("Fichier sélectionné :", selectedFile)
    }, [selectedFile])

    return (
        <form onSubmit={handleSubmit} className={`relative w-full ${styles.flexCenter} flex-col gap-2 p-2`}>
            <input
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                className="input input-sm input-bordered w-full z-2 rounded-lg bg-base-100/70 backdrop-blur-xs shadow-md"
                placeholder="Entrez votre nom de l'évenement"
                required
            />
            <div className={`${styles.flexCenter} w-full flex-col gap-1 z-2`} >
                <label htmlFor="startEvent" className="text-xs text-gray-400">Début de l&apos;évenement</label>
                <input
                    name="startDate"
                    onChange={handleChange}
                    type="date"
                    value={formData.startDate}
                    id="startEvent"
                    className="input input-sm input-bordered w-full rounded-lg bg-base-100/70 backdrop-blur-xs shadow-md"
                    required
                />
            </div>
            <div className={`${styles.flexCenter} w-full flex-col gap-1 z-2`} >
                <label htmlFor="endEvent" className="text-xs text-gray-400">Fin de l&apos;évenement</label>
                <input
                    name="endDate"
                    onChange={handleChange}
                    type="date"
                    value={formData.endDate}
                    id="endEvent"
                    className="input input-sm input-bordered w-full rounded-lg bg-base-100/70 backdrop-blur-xs shadow-md"
                    required
                />
            </div>
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="resize-none h-16 py-1 px-2 mt-2 z-2 input input-sm input-bordered w-full rounded-lg bg-base-100/70 backdrop-blur-xs shadow-md"
                placeholder="Description de l'événement"
                required
            ></textarea>
            <div className="w-full flex gap-2 py-2">
                {/* <label htmlFor="image" className="flex items-center justify-center p-4 bg-base-100/70 backdrop-blur-xs shadow-md rounded-lg cursor-pointer z-2 border border-base-content/40">
                    {imagePreview ? <div className="flex flex-col items-center gap-1">
                        <CheckCircle className="md:h-10 md:w-10 h-6 w-6 text-green-500" />
                        <span className="text-sm md:text-md text-center"> Changer l'image ? </span>
                    </div> : <div className="flex flex-col items-center gap-1">
                        <BsUpload className="md:h-10 md:w-10 h-6 w-6" />
                        <span className="text-sm md:text-md text-center"> Ajouter l'image de couverture </span>
                    </div>}
                </label> */}
                {/* <input
                    id="image"
                    name="coverImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                /> */}
                <FileUpload
                    type="image"
                    accept="image/*"
                    placeholder="Ajouter une image"
                    onFileChange={(file) => {
                        setSelectedFile(file)
                    }}
                />
                {imagePreview && (
                    // <img src={imagePreview} alt="Preview" className="mt-0 w-20 h-20 object-cover rounded-md" />
                    <img src={imagePreview} alt="Preview" className="z-1 absolute top-0 left-0 h-full w-full object-cover rounded-lg border border-base-content/40" />
                )}
            </div>
            {/* <button className="btn btn-sm bg-base-100 text-gray-400 btn-ghost w-full rounded-lg">
                    <LogIn className="w-4 h-4" /> Se connecter avec Google
                  </button> */}

            {(authedUser?.rang === "D" || authedUser?.rang === "E") ? (
                <div className="grid gap-2 place-items-center w-full">
                    <button className="btn btn-sm w-full btn-secondary rounded-lg " onClick={() => router.push("/plans")}>Augmenter votre rang pour créer un event.</button>
                    <p className="badge badge-sm font-semibold badge-secondary badge-soft animate-bounce"> Rang actuel: {authedUser?.rang} </p>
                </div>
            ) : (
                <button type="submit" disabled={loader}  className="btn btn-sm btn-secondary text-base-100 w-full rounded-lg z-2">
                    {submitButtonLabel} {loader && <Loader className='h-4 w-4 animate-spin'/>}
                </button>
            )}
        </form>
    )
}

export default Form