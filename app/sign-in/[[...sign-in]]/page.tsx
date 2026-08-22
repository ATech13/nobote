"use client"

import assets from '@/app/assets/assets'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import WrapperSide from '@/app/components/WrapperSide'
import { SignIn } from '@clerk/nextjs'
import { FaHome, FaUserPlus } from 'react-icons/fa'

export default function Page() {
    return (
        <WrapperSide>
            <div className="w-full flex flex-col gap-3 justify-center items-center p-6 h-full bg-cover bg-fixed bg-center" style={{
                backgroundImage: `url(${assets.golden_background.src})`
            }}>
                <Breadcrumbs items={[
                    { label: 'Accueuil', href: `/`, icon: <FaHome className="md:w-6 md:h-6 h-4 w-4" />, },
                    { label: "S'inscrire", href: ``, icon: <FaUserPlus className="md:w-6 md:h-6 h-4 w-4" />, },
                ]} />
                <SignIn />
            </div>
        </WrapperSide>
    )
}