"use client"

import { Share2 } from "lucide-react"

interface ShareButtonProps {
    title: string
    text: string
    url: string
}

const ShareButton = ({
    title,
    text,
    url,
}: ShareButtonProps) => {

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title,
                    text,
                    url,
                })
            } else {
                await navigator.clipboard.writeText(url)
                alert("Lien copié !")
            }

        } catch (error) {
            console.error("Erreur de partage :", error)
        }
    }

    return (
        <button
            type="button"
            onClick={handleShare}
            className="rounded-lg p-2 bg-base-100/45 cursor-pointer hover:bg-base-100/80 transition-all duration-300 ease-in-out text-secondary"
        >
            <Share2 className="w-5 h-5" />
        </button>
    )
}

export default ShareButton