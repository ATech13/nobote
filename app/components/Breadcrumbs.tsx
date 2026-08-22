"use client"

import Link from 'next/link'
import React from 'react'

interface BreadcrumbItem {
    label: string
    href?: string
    icon?: React.ReactNode
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[]
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => (
    <div className="breadcrumbs text-xs sm:text-sm px-2 w-full bg-base-200 rounded-lg">
        <ul className="flex items-center gap-1 text-gray-500 p-1 sm:p-2 rounded-lg">
            {items.map((item, index) => (
                <li key={`${item.label}-${index}`} className="flex items-center gap-1">
                    {item.href ? (
                        <Link href={item.href} className="flex items-center gap-1 text-secondary hover:text-secondary-focus">
                            {item.icon} <span className="text-xs sm:text-sm"> {item.label} </span>
                        </Link>
                    ) : (
                        <div className="flex items-center gap-1">
                            {item.icon} <span className="font-semibold text-xs sm:text-sm"> {item.label} </span>
                        </div>
                    )}
                    {index < items.length - 1 && <span className="text-gray-400"></span>}
                </li>
            ))}
        </ul>
    </div>
)

export default Breadcrumbs
