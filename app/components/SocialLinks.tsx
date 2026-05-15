"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import image1 from "../assets/lettersDesigns/a.jpg";
import image2 from "../assets/lettersDesigns/b.jpg";
import image3 from "../assets/lettersDesigns/c.jpg";
import image4 from "../assets/lettersDesigns/k.jpg";
import image5 from "../assets/lettersDesigns/p.jpg";
import image6 from "../assets/lettersDesigns/r.jpg";
import image7 from "../assets/lettersDesigns/s.jpg";
import image8 from "../assets/lettersDesigns/u.jpg";
import image9 from "../assets/lettersDesigns/a.jpg";
import image10 from "../assets/lettersDesigns/b.jpg";
// import { User } from '@/type/types';

const SocialLinks = () => {

    // const [users, setUsers] = useState<User[]>([])
    // const [loading, setLoading] = useState(true)
    // const [error, setError] = useState<string | null>(null)

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         try {
    //             const response = await fetch('/api/users')
    //             if (!response.ok) {
    //                 throw new Error('Impossible de récupérer les utilisateurs')
    //             }
    //             const data = await response.json()
    //             setUsers(data.users || [])
    //         } catch (err) {
    //             setError(err instanceof Error ? err.message : 'Erreur lors de la récupération des utilisateurs')
    //         } finally {
    //             setLoading(false)
    //         }
    //     }

    //     fetchUsers()
    // }, [])

    return (
        <div>
            <div className="banner min-h-100">
                <div className="slider" style={{ "--quantity": 10 } as React.CSSProperties}>
                    <div className="item" style={{ "--position": 1 } as React.CSSProperties}><Image src={image1} alt="" /></div>
                    <div className="item" style={{ "--position": 2 } as React.CSSProperties}><Image src={image2} alt="" /></div>
                    <div className="item" style={{ "--position": 3 } as React.CSSProperties}><Image src={image3} alt="" /></div>
                    <div className="item" style={{ "--position": 4 } as React.CSSProperties}><Image src={image4} alt="" /></div>
                    <div className="item" style={{ "--position": 5 } as React.CSSProperties}><Image src={image5} alt="" /></div>
                    <div className="item" style={{ "--position": 6 } as React.CSSProperties}><Image src={image6} alt="" /></div>
                    <div className="item" style={{ "--position": 7 } as React.CSSProperties}><Image src={image7} alt="" /></div>
                    <div className="item" style={{ "--position": 8 } as React.CSSProperties}><Image src={image8} alt="" /></div>
                    <div className="item" style={{ "--position": 9 } as React.CSSProperties}><Image src={image9} alt="" /></div>
                    <div className="item" style={{ "--position": 10 } as React.CSSProperties}><Image src={image10} alt="" /></div>
                </div>
            </div>
        </div>
    )
}

export default SocialLinks