"use client"
import React, { useState } from 'react'
import Wrapper from '@/app/components/Wrapper'
import styles from '@/app/style'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { LuLoader } from 'react-icons/lu'
import logo from '@/app/assets/logo.jpg'

const UserCreatePage = () => {
    const router = useRouter()
    const [fullName, setFullName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [bio, setBio] = useState('')
    const [eventId, setEventId] = useState('')
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null
        setAvatarFile(file)
        if (file) {
            const reader = new FileReader()
            reader.onload = () => setAvatarPreview(reader.result as string)
            reader.readAsDataURL(file)
        } else {
            setAvatarPreview(null)
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)
        setMessage(null)
        setError(null)

        try {
            const formData = new FormData()
            formData.append('fullName', fullName)
            formData.append('username', username)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('bio', bio)
            formData.append('eventId', eventId)
            if (avatarFile) {
                formData.append('avatarImage', avatarFile)
            }

            const response = await fetch('/api/users', {
                method: 'POST',
                body: formData,
            })

            const result = await response.json()
            if (!response.ok) {
                throw new Error(result.message || 'Erreur lors de la création de l\'utilisateur')
            }

            setMessage('Utilisateur créé avec succès')
            setFullName('')
            setUsername('')
            setEmail('')
            setPassword('')
            setBio('')
            setEventId('')
            setAvatarFile(null)
            setAvatarPreview(null)
            router.push('/user/info')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur inattendue')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Wrapper>
            <div className={`min-h-screen px-6 py-10 ${styles.flexCenter} flex-col gap-6`}>
                <div className={`w-full max-w-3xl ${styles.flexCenter} flex-col gap-6 bg-base-300 rounded-3xl p-8 border_animate`}>
                    <div className={`${styles.flexBetween} w-full gap-2`}>
                        <h1 className={`${styles.heading2}`}>Créer un nouvel utilisateur</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full grid gap-4">
                        <div className="grid lg:grid-cols-2 gap-4">
                            <input
                                value={eventId}
                                onChange={(e) => setEventId(e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="ID de l'événement"
                                required
                            />
                            <input
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Nom complet"
                                required
                            />
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Nom d'utilisateur"
                                required
                            />
                        </div>

                        <div className="grid lg:grid-cols-2 gap-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Email"
                                required
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Mot de passe"
                                required
                            />
                        </div>

                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="textarea textarea-bordered w-full"
                            placeholder="Bio"
                            rows={4}
                            required
                        />

                        <div className="flex flex-col gap-3">
                            <label className="text-sm text-gray-400">Avatar</label>
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <label className="btn btn-outline btn-sm cursor-pointer">
                                    Choisir une image
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleAvatarChange}
                                    />
                                </label>
                                {avatarPreview ? (
                                    <img src={avatarPreview} alt="Avatar preview" width={100} height={100} className="rounded-lg object-cover" />
                                ) : (
                                    <div className="h-24 w-24 rounded-lg overflow-hidden bg-base-200 flex items-center justify-center">
                                        <Image src={logo} alt="Default avatar" width={80} height={80} className="object-contain" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {message && <div className="text-green-500">{message}</div>}
                        {error && <div className="text-red-500">{error}</div>}

                        <button type="submit" className="btn btn-secondary w-full" disabled={loading}>
                            {loading ? <span className="flex items-center justify-center gap-2"><LuLoader className="animate-spin" /> Création...</span> : 'Créer l\'utilisateur'}
                        </button>
                    </form>
                </div>
            </div>
        </Wrapper>
    )
}

export default UserCreatePage
