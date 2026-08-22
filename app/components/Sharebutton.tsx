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
            className="btn btn-secondary btn-soft rounded-lg"
        >
            <Share2 className="w-4 h-4" />
            Partager
        </button>
    )
}

export default ShareButton