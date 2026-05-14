"use client"
import React, { useState } from 'react'
import styles from '../style'
import { FormPropsInterface } from '@/type/types'

const Form = ({ initialValues, onSubmit, submitButtonLabel, coverImagePreview }: FormPropsInterface) => {

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
    const [image, setImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(coverImagePreview || null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImage(file)

        if (file) {
            const reader = new FileReader()
            reader.onload = () => setImagePreview(reader.result as string)
            reader.readAsDataURL(file)
        } else {
            setImagePreview(null)
        }
    }
    const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()
        const form = new FormData()
        form.append("title", formData.title)
        form.append("description", formData.description)
        form.append("startDate", formData.startDate)
        form.append("endDate", formData.endDate)
        if (image) {
            form.append("coverImage", image)
        }
        await onSubmit(form)
    }

    return (
        <form onSubmit={handleSubmit} className={`w-full ${styles.flexCenter} flex-col gap-2`}>
            <input
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                className="input input-sm input-bordered w-full rounded-lg"
                placeholder="Entrez votre nom de l'évenement"
            />
            <div className={`${styles.flexCenter} w-full flex-col gap-1`} >
                <label htmlFor="startEvent" className="text-xs text-gray-400">Début de l&apos;évenement</label>
                <input
                    name="startDate"
                    onChange={handleChange}
                    type="date"
                    value={formData.startDate}
                    id="startEvent"
                    className="input input-sm input-bordered w-full rounded-lg"
                />
            </div>
            <div className={`${styles.flexCenter} w-full flex-col gap-1`} >
                <label htmlFor="endEvent" className="text-xs text-gray-400">Fin de l&apos;évenement</label>
                <input
                    name="endDate"
                    onChange={handleChange}
                    type="date"
                    value={formData.endDate}
                    id="endEvent"
                    className="input input-sm input-bordered w-full rounded-lg"
                />
            </div>
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="resize-none h-16 py-1 px-2 mt-2 input input-sm input-bordered w-full rounded-lg"
                placeholder="Description de l'événement"
            ></textarea>
            <div className="my-2 w-full flex gap-2 justify-center items-center">
                <label htmlFor="image" className="w-fit cursor-pointer btn btn-sm border border-secondary text-secondary">Choisir une image</label>
                <input
                    id="image"
                    name="coverImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />
                {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="mt-0 w-20 h-20 object-cover rounded-md" />
                )}
            </div>
            {/* <button className="btn btn-sm bg-base-100 text-gray-400 btn-ghost w-full rounded-lg">
                    <LogIn className="w-4 h-4" /> Se connecter avec Google
                  </button> */}
            <button type="submit" className="btn btn-sm bg-secondary text-base-100 w-full rounded-lg">
                {submitButtonLabel}
            </button>
        </form>
    )
}

export default Form