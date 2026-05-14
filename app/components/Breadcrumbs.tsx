"use client"

import Link from 'next/link'
import React from 'react'

interface BreadcrumbItem {
    label: string
    href?: string
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[]
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => (
    <div className="breadcrumbs text-sm mb-4">
        <ul className="flex flex-wrap items-center gap-2 text-gray-500">
            {items.map((item, index) => (
                <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                    {item.href ? (
                        <Link href={item.href} className="text-secondary hover:text-secondary-focus">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="font-semibold text-base-content">{item.label}</span>
                    )}
                    {index < items.length - 1 && <span className="text-gray-400"></span>}
                </li>
            ))}
        </ul>
    </div>
)

export default Breadcrumbs
