"use client"

import React, { useState } from "react"
import { useParams, useRouter } from "next/navigation"

const RegisterPage = () => {

    const router = useRouter()
    const params = useParams()

    const eventId = params.id as string

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        bio: "",
    })

    const [avatarImage, setAvatarImage] =
        useState<File | null>(null)

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement
        >
    ) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault()

        try {

            setLoading(true)

            const body = new FormData()

            body.append("fullName", formData.fullName)
            body.append("username", formData.username)
            body.append("email", formData.email)
            body.append("password", formData.password)
            body.append("bio", formData.bio)

            body.append("eventId", eventId)

            if (avatarImage) {
                body.append("avatarImage", avatarImage)
            }

            const response = await fetch(
                "/api/user/register",
                {
                    method: "POST",
                    body
                }
            )

            const data = await response.json()

            if (!response.ok) {
                alert(data.message)
                return
            }

            alert("Registration successful")

            router.push(`/event/${eventId}`)

        } catch (error) {

            console.log(error)
            alert("Error")

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center px-6">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-xl bg-base-200 p-8 rounded-xl flex flex-col gap-4"
            >

                <h1 className="text-3xl font-bold">
                    Join Event
                </h1>

                <input
                    type="text"
                    name="fullName"
                    placeholder="Full name"
                    className="input input-bordered w-full"
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="input input-bordered w-full"
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered w-full"
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="input input-bordered w-full"
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="bio"
                    placeholder="Bio"
                    className="textarea textarea-bordered w-full"
                    onChange={handleChange}
                />

                <input
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered w-full"
                    onChange={(e) => {
                        if (e.target.files?.[0]) {
                            setAvatarImage(e.target.files[0])
                        }
                    }}
                />

                <button
                    type="submit"
                    className="btn btn-secondary"
                    disabled={loading}
                >
                    {
                        loading
                            ? "Loading..."
                            : "Participate"
                    }
                </button>

            </form>

        </div>
    )
}

export default RegisterPage