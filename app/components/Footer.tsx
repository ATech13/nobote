"use client"

import Image from "next/image"
import Link from "next/link"
import assets from "../assets/assets"
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa"
import { ArrowUp, Mail } from "lucide-react"

const Footer = () => {
    return (
        <div>
            <footer className="bg-neutral-primary-soft border-t border-base-300">
                <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                    <div className="md:flex md:justify-between">
                        <div className="mb-6 md:mb-0">
                            <div className="flex items-center gap-2">
                                <div className="h-20 scale-150 overflow-hidden rounded-full">
                                    <Image src={assets.nobote_full} className="h-full w-full object-cover" alt="FlowBite Logo" />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-heading uppercase text-secondary">Partenaires</h2>
                                <ul className="font-body text-sm md:text-meduim">
                                    <li className="mb-4">
                                        <Link href="https://axium.cc/" target="_blank" className="hover:underline"> AXIUM </Link>
                                    </li>
                                    <li>
                                        <Link href="https://rartech.ecocinq.com/" target="_blank" className="hover:underline">RARTech</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-heading uppercase text-secondary">Nous suivre</h2>
                                <ul className="font-body text-sm md:text-meduim">
                                    <li className="mb-4">
                                        <Link href="https://wa.me/243985132446" target="_blank" className="hover:underline ">WhatsApp</Link>
                                    </li>
                                    <li>
                                        <Link href="https://instagram.com" target="_blank" className="hover:underline">Instagram</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-heading uppercase text-secondary">Legal</h2>
                                <ul className="font-body text-sm md:text-meduim">
                                    <li className="mb-4">
                                        <Link href="#" className="hover:underline">Privacy Policy</Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:underline">Terms &amp; Conditions</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-heading uppercase text-secondary">Liens internes</h2>
                                <ul className="font-body text-sm md:text-meduim">
                                    <li className="mb-4">
                                        <Link href="#homeResult" className="hover:underline">Résultats</Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link href="#homePlan" className="hover:underline">Plans</Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link href="#homeWinners" className="hover:underline">Winners</Link>
                                    </li>
                                    <li className="">
                                        <Link href="#homeEvents" className="hover:underline">Evenements</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-heading uppercase text-secondary">AUTRES LIENS</h2>
                                <ul className="font-body text-sm md:text-meduim">
                                    <li className="mb-4">
                                        <Link href="/event/info" className="hover:underline">Evenements</Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link href="/results" className="hover:underline">Résultats</Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link href="/event/new" className="hover:underline">Création</Link>
                                    </li>
                                    <li className="">
                                        <Link href="/user/info" className="hover:underline">Candidats</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex items-center justify-center w-20 overflow-hidden">
                                {/* <Link href="#Home" className="rounded-full flex items-center justify-center p-5 animate-bounce border border-secondary">
                                    <ArrowUp className="h-6 w-6 text-secondary " />
                                </Link> */}
                                <Image src={assets.axium_logo} alt="Axium" className="h-full w-full object-contain" />
                            </div>
                        </div>
                    </div>
                    <hr className="my-6 border-default sm:mx-auto lg:my-8" />
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <p className="text-sm text-body text-center">© {new Date().getFullYear()} <Link href="https://axium.cc" className="hover:underline bg_stroke font-bold text-secondary text-lg">AXIUM™</Link>. All Rights Reserved.
                        </p>
                        <div className="flex mt-4 justify-center sm:mt-0">
                            <Link href="https://wa.me/243985132446" className="text-body hover:text-heading">
                                <FaWhatsapp className="h-6 w-6" />
                            </Link>
                            <Link href="https://facebook.com/axium_official" className="text-body hover:text-heading ms-5">
                                <FaFacebook className="h-6 w-6" />
                            </Link>
                            <Link href="https://instagram.com/axium_official" className="text-body hover:text-heading ms-5">
                                <FaInstagram className="h-6 w-6" />
                            </Link>
                            <Link href="mailto:axium@ecocinq.com" className="text-body hover:text-heading ms-5">
                                <Mail className="h-6 w-6" />
                            </Link>
                            <Link href="#" className="text-body hover:text-heading ms-5">
                                <FaTwitter className="h-6 w-6" />
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default Footer