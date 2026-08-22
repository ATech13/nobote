import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoBarChartOutline } from 'react-icons/io5';
import { FaUsersGear } from 'react-icons/fa6';
import { FaRegCalendarAlt, FaUserAlt } from 'react-icons/fa';
import { ArrowUpRightSquare, LogIn, Share } from 'lucide-react';
import { UserButton, useUser } from '@clerk/nextjs';
import AuthButton from './AuthButton';
import { TbUsersGroup } from 'react-icons/tb';

const SideBar = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const pathname = usePathname()
    const menuItems = [
        { name: 'évenements', path: '/event/info', icon: <FaRegCalendarAlt className="md:w-6 md:h-6 h-4 w-4" />, },
        { name: 'candidats', path: '/user/info', icon: <FaUsersGear className="md:w-6 md:h-6 h-4 w-4" />, },
        { name: 'résultats', path: '/results', icon: <IoBarChartOutline className="md:w-6 md:h-6 h-4 w-4" />, },
    ];

    return (
        <>
            <div className="hidden md:flex flex-col md:justify-between sticky md:top-25 md:left-0 bottom-0 md:h-[80vh] border-gray-300 py-2 border-r z-99">
                <div className='md:w-50 lg:w-64 w-16 text-base h-full md:flex flex-col'>
                    {menuItems.map((item) => {

                        const isActive = pathname === item.path;

                        return (
                            <Link href={item.path} key={item.name} passHref>
                                <div
                                    className={
                                        `flex items-center py-3 px-4 gap-3 ${isActive
                                            ? "border-r-4 md:border-r-[6px] bg-secondary/10 border-secondary/90"
                                            : "hover:bg-base-300 border-white"
                                        }`
                                    }
                                >
                                    <div className="text-secondary">{item.icon}</div>
                                    <p className='md:block hidden text-center capitalize'>{item.name}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <div className="flex items-center gap-2 px-2 justify-between max-w-46">
                    <AuthButton />
                    {isSignedIn ? (
                        <div className='flex items-center gap-2'>
                            <span className='text-sm'>{user?.fullName}</span>
                            <Link href={"/dashboard"}>
                                <Share className="h-5 w-5" />
                            </Link>
                        </div>
                    ) : (
                        <div className='flex items-center gap-2'>
                            <span className='text-sm'>Se connecter</span>
                            <Link href={"/sign-in"}>
                                <LogIn className="h-5 w-5" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <div className="md:hidden flex justify-center items-center fixed bottom-0 w-full py-3 px-6 sm:px-15 z-99">
                <div className="w-full bg-base-200/80 backdrop-blur-lg flex items-center gap-3 justify-between rounded-full px-4 py-1">
                    {menuItems.map((item) => {

                        const isActive = pathname === item.path;

                        return (
                            <Link href={item.path} key={item.name} passHref className="">
                                <div
                                    className={
                                        `flex flex-col md:flex-row items-center px-6 gap-2 rounded-full transition-all duration-300 ${isActive
                                            ? "bg-secondary/10 text-secondary"
                                            : "hover:bg-base-100 border-white"
                                        }`
                                    }
                                >
                                    <div className="transition-all duration-300 hover:scale-120 py-1.5">{item.icon}</div>
                                </div>
                                <p className='text-center capitalize text-[10.5px]'>{item.name}</p>
                            </Link>
                        );
                    })}
                    {isSignedIn ? (
                        <div>
                            <AuthButton />
                            <p className="text-center capitalize text-[10.5px]">Vous</p>
                        </div>
                    ) : (
                        <div>
                            <Link href={"/sign-in"} className="overflow-hidden rounded-full flex justify-center items-center skeleton bg-base-200 border border-base-content/40">
                                <FaUserAlt className="h-4 w-4" />
                            </Link>
                            <p className="text-center capitalize text-[10.5px]">Vous</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default SideBar;
