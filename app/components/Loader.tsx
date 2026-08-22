import React from 'react'
import { LuLoader } from 'react-icons/lu'

const Loader = () => {
    return (
        <div className="w-full h-[70vh] flex items-center justify-center">
            <LuLoader className="animate-spin text-6xl md:text-8xl text-secondary" />
        </div>
    )
}

export default Loader
