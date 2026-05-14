import Link from "next/link"

type Props = {
    id: string
    title: string
    description: string
    coverImage?: string | null
    status: "UPCOMING" | "ACTIVE" | "FINISHED"
}

export default function EventCard({
    id,
    title,
    description,
    coverImage,
    status
}: Props) {
    return (
        <Link href={`/events/info/${id}`}>
            <div className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition">

                <img
                    src={coverImage || "/event.jpg"}
                    className="w-full h-40 object-cover"
                />

                <div className="p-4">
                    <h2 className="font-bold text-lg">{title}</h2>

                    <p className="text-sm text-gray-500">
                        {description.slice(0, 80)}...
                    </p>

                    <span className="text-xs mt-2 inline-block px-2 py-1 bg-gray-200 rounded">
                        {status}
                    </span>
                </div>

            </div>
        </Link>
    )
}