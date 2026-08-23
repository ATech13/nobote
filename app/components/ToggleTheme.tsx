"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const ThemeToggle = () => {
    const [isSunset, setIsSunset] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const response = await fetch("/api/session_user/theme")

                if (!response.ok) {
                    throw new Error("Impossible de récupérer le thème")
                }

                const data = await response.json()

                const theme = data.theme

                // Appliquer le thème à la page
                // document.documentElement.setAttribute(
                //     "data-theme",
                //     theme
                // )

                // Synchroniser le toggle
                setIsSunset(theme === "sunset")

            } catch (error) {
                console.error(
                    "Erreur récupération thème:",
                    error
                )
            }
        }

        loadTheme()
    }, [])

    const handleChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const theme = e.target.checked
            ? "sunset"
            : "light"

        // Mise à jour immédiate du toggle
        setIsSunset(e.target.checked)

        // Mise à jour immédiate du thème
        // document.documentElement.setAttribute(
        //     "data-theme",
        //     theme
        // )

        try {
            const response = await fetch("/api/session_user/theme", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    theme,
                }),
            })

            if (!response.ok) {
                throw new Error(
                    "Impossible de sauvegarder le thème"
                )
            }
        } catch (error) {
            console.error(
                "Erreur sauvegarde thème:",
                error
            )
        }
    }

    return (
        <input
            type="checkbox"
            className="toggle toggle-secondary toggle-xs md:toggle-sm"
            checked={isSunset}
            onChange={handleChange}
             onClick={() => router.refresh()}
        />
    )
}

export default ThemeToggle