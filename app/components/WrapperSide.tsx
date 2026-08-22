import React from 'react'
import Sidebar from './Sidebar'
import Link from 'next/link'

interface WrapperSideProps {
    children: React.ReactNode
}

const WrapperSide: React.FC<WrapperSideProps> = ({ children }) => {
    return (
        <div className="md:flex md:flex-row-reverse flex-col gap-3 md:pr-3">
            <div className="flex flex-col gap-3 w-full overflow-hidden">
                {children}
                <p className="mb-30 md:mb-4 text-sm text-body text-center">© {new Date().getFullYear()} <Link href="https://axium.cc" target="_blank" className="hover:underline bg_stroke font-bold text-secondary text-lg">AXIUM™</Link>. All Rights Reserved.</p>
            </div>
            <Sidebar />
        </div>
    )
}

export default WrapperSide
