"use client"

// import { ImageKitProvider, ImageKitContext, IKUpload, IKImage, IKVideo } from "imagekitio-next"
// import config from "@/lib/config";
// import { useRef, useState } from "react";
// import { FilePlus } from "lucide-react";

// interface Props {
//     type: "image" | "video"
//     onFileChange: (filePath: string) => void
//     placeholder: string
//     folder: string
//     variant: "sunset" | "light"
//     accept: string
// }

// const { env: { imagekit: { publicKey, urlEndpoint } } } = config;


// const authenticator = async () => {
//     const response = await fetch("/api/auth/imagekit")

//     if (!response.ok) {
//         throw new Error("ImageKit authentication failed")
//     }

//     return await response.json()
// }

// const FileUpload = ({
//     onFileChange, placeholder, folder, variant, type, accept
// }: Props) => {

//     const ikUploadRef = useRef(null)
//     const [file, setFile] = useState<{ filePath: string } | null>(null)
//     const [progress, setProgress] = useState(0)
//     const onError = (error: any) => {
//         console.log(error)
//     }
//     const onSuccess = (res: any) => {
//         setFile(res)
//         onFileChange(res.filePath)
//     }
//     const onValidate = (file: File) => {
//         if (type === "image") {
//             if (file.size > 8 * 1024 * 1024) {
//                 console.error("File size too large, plase upload a file that is less than 8MB in size")
//                 return false
//             }
//         } else if (type === "video") {
//             if (file.size > 20 * 1024 * 1024) {
//                 console.error("File size too large, plase upload a video that is less than 20MB in size")
//                 return false
//             }
//         }
//         return true
//     }


//     return <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
//         <IKUpload
//             className="hidden"
//             ref={ikUploadRef}
//             onError={onError}
//             onSuccess={onSuccess}
//             useUniqueFileName={true}
//             onUploadStart={() => setProgress(0)}
//             onUploadProgress={({loaded, total}) => {
//                 const percent = Math.round((loaded/total) * 100)
//                 setProgress(percent)
//             }}
//             folder={folder}
//             accept={accept}
//         />
//         <button className="btn" onClick={(e) => {
//             e.preventDefault()
//             if (ikUploadRef.current) {
//                 ikUploadRef.current?.click()
//             }
//         }}>
//             <FilePlus className="h-4 w-4" />
//             <p className="text-sm"> Upload a file </p>
//             {file && <p className="text-lg text-green-400"> {file.filePath} </p>}
//         </button>

//         {progress > 0 && progress !== 100 && (
//             <div className="w-full rounded-full bg-green-200">
//                 <div className="progress" style={{width: `${progress}%`}}>
//                     {progress}%
//                 </div>
//             </div>
//         )}

//         {file && (
//             (type === "image") ? (
//                 <IKImage
//                 alt={file.filePath}
//                 path={file.filePath}
//             />
//             ) : type === "video" ? (
//                 <IKVideo
//                 path={file.filePath}
//                 controls={true}
//                 className="h-96 w-full rounded-xl"
//                 />
//             ) : null
//         )}
//     </ImageKitProvider>
// }

// export default FileUpload





// "use client"

// import {
//     Image,
//     Video,
//     ImageKitProvider,
//     upload,
// } from "@imagekit/next"

// import { useRef, useState } from "react"
// import { FilePlus } from "lucide-react"

// interface UploadedFile {
//     filePath: string
//     url: string
//     name: string
//     fileId: string
// }

// interface Props {
//     type: "image" | "video"
//     onFileChange: (file: UploadedFile) => void
//     placeholder: string
//     folder: string
//     variant: "sunset" | "light"
//     accept: string
// }

// const authenticator = async () => {
//     const response = await fetch("/api/auth/imagekit")

//     if (!response.ok) {
//         throw new Error(
//             "Impossible d'obtenir les paramètres ImageKit"
//         )
//     }

//     return response.json()
// }

// const FileUpload = ({
//     onFileChange,
//     placeholder,
//     folder,
//     type,
//     accept,
// }: Props) => {

//     const fileInputRef =
//         useRef<HTMLInputElement | null>(null)

//     const [file, setFile] =
//         useState<UploadedFile | null>(null)

//     const [progress, setProgress] =
//         useState(0)

//     const [uploading, setUploading] =
//         useState(false)

//     const handleFileChange = async (
//         e: React.ChangeEvent<HTMLInputElement>
//     ) => {

//         const selectedFile = e.target.files?.[0]

//         if (!selectedFile) return

//         // Vérification du type
//         if (type === "image" &&
//             !selectedFile.type.startsWith("image/")) {
//             console.error("Le fichier doit être une image")
//             return
//         }

//         if (type === "video" &&
//             !selectedFile.type.startsWith("video/")) {
//             console.error("Le fichier doit être une vidéo")
//             return
//         }

//         // Limite image
//         if (
//             type === "image" &&
//             selectedFile.size > 2 * 1024 * 1024
//         ) {
//             console.error(
//                 "L'image doit faire moins de 2 MB"
//             )
//             return
//         }

//         // Limite vidéo
//         if (
//             type === "video" &&
//             selectedFile.size > 5 * 1024 * 1024
//         ) {
//             console.error(
//                 "La vidéo doit faire moins de 5 MB"
//             )
//             return
//         }

//         try {
//             setUploading(true)
//             setProgress(0)

//             const authParams = await authenticator()

//             const response = await upload({
//                 file: selectedFile,
//                 fileName: selectedFile.name,

//                 publicKey: authParams.publicKey,
//                 token: authParams.token,
//                 signature: authParams.signature,
//                 expire: authParams.expire,

//                 folder,

//                 useUniqueFileName: true,

//                 onProgress: (event) => {
//                     const percent = Math.round(
//                         (event.loaded / event.total) * 100
//                     )

//                     setProgress(percent)
//                 },
//             })

//             const uploadedFile: UploadedFile = {
//                 filePath: response.filePath,
//                 url: response.url,
//                 name: response.name,
//                 fileId: response.fileId,
//             }

//             setFile(uploadedFile)

//             // Envoie le résultat au composant parent
//             onFileChange(uploadedFile)

//         } catch (error) {
//             console.error(
//                 "ImageKit upload error:",
//                 error
//             )
//         } finally {
//             setUploading(false)
//         }
//     }

//     return (
//         <ImageKitProvider
//             urlEndpoint={
//                 process.env
//                     .NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!
//             }
//         >

//             <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept={accept}
//                 onChange={handleFileChange}
//                 className="hidden"
//             />

//             <button
//                 type="button"
//                 className="btn z-2 btn-secondary"
//                 disabled={uploading}
//                 onClick={() =>
//                     fileInputRef.current?.click()
//                 }
//             >
//                 <FilePlus className="h-4 w-4" />

//                 <p className="text-sm">
//                     {uploading
//                         ? `Upload ${progress}%`
//                         : placeholder}
//                 </p>
//             </button>

//             {progress > 0 && progress < 100 && (
//                 <progress
//                     className="progress w-full"
//                     value={progress}
//                     max="100"
//                 />
//             )}

//             {file && type === "image" && (
//                 <Image
//                     src={file.filePath}
//                     alt={file.name}
//                     width={400}
//                     height={300}
//                     className="rounded-lg object-cover"
//                 />
//             )}

//             {file && type === "video" && (
//                 <Video
//                     src={file.filePath}
//                     controls
//                     className="h-96 w-full rounded-xl"
//                 />
//             )}

//         </ImageKitProvider>
//     )
// }

// export default FileUpload


"use client"

import { useRef, useState } from "react"
import { FilePlus } from "lucide-react"
import { toast } from "sonner"

interface Props {
    type: "image" | "video"
    onFileChange: (file: File | null) => void
    placeholder: string
    accept: string
}

const FileUpload = ({
    type,
    onFileChange,
    placeholder,
    accept,
}: Props) => {

    const inputRef = useRef<HTMLInputElement | null>(null)

    const [preview, setPreview] = useState<string | null>(null)

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file = e.target.files?.[0] ?? null

        if (!file) return

        // Vérification du type
        if (
            type === "image" &&
            !file.type.startsWith("image/")
        ) {
            toast.error("Le fichier diot être une image")
            return
        }

        if (
            type === "video" &&
            !file.type.startsWith("video/")
        ) {
            toast.error("Le fichier doit être une vidéo")
            return
        }

        // Limite image
        if (
            type === "image" &&
            file.size > 2 * 1024 * 1024
        ) {
            toast.error("L'image est trop lourde, essayez une de taille reduite")
            return
        }

        // Limite vidéo
        if (
            type === "video" &&
            file.size > 5 * 1024 * 1024
        ) {
            toast.error("La vidéo est trop lourde, essayez une autre")
            return
        }

        // Preview locale
        const previewUrl = URL.createObjectURL(file)

        setPreview(previewUrl)

        // IMPORTANT :
        // On transmet uniquement le File au parent.
        // Aucun upload vers ImageKit ici.
        onFileChange(file)
        toast.success("file Uploaded")
    }

    return (
        <div className={`w-full justify-center items-center flex flex-col gap-2 z-2`}>

            <input
                ref={inputRef}
                type="file"
                accept={accept}
                onChange={handleFileChange}
                className="hidden"
            />

            <button
                type="button"
                className="btn w-full max-w-xl rounded-lg btn-secondary btn-soft"
                onClick={() => inputRef.current?.click()}
            >
                <FilePlus className="h-4 w-4" />

                <p className="text-sm">
                    {placeholder}
                </p>
            </button>

            {preview && type === "image" && (
                <img
                    src={preview}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded-lg"
                />
            )}

            {preview && type === "video" && (
                <video
                    src={preview}
                    controls
                    className="w-full rounded-lg"
                />
            )}

        </div>
    )
}

export default FileUpload