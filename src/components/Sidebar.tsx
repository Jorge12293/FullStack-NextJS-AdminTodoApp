import Image from 'next/image';
import { CiBookmarkCheck, CiLogout } from 'react-icons/ci';
import { SidebarItem } from './SidebarItem';
import Link from 'next/link';
import { IoBasketOutline, IoCalendarOutline, IoCheckboxOutline, IoCodeWorkingOutline, IoListOutline } from 'react-icons/io5';

const menuItems = [
    {
        id: 1,
        icon: <IoCalendarOutline size={30} />,
        title: 'Dashboard',
        path: '/dashboard',
    },
    {
        id: 2,
        icon: <IoCheckboxOutline size={30} />,
        title: 'Rest TODO',   
        path: '/dashboard/rest-todo',
    },
    {
        id: 3,
        icon: <IoListOutline size={30} />,
        title: 'Server Actions',   
        path: '/dashboard/server-todo',
    },
    {
        id: 4,
        icon: <IoCodeWorkingOutline size={30} />,
        title: 'Cookies',   
        path: '/dashboard/cookies',
    },
    {
        id: 5,
        icon: <IoBasketOutline size={30} />,
        title: 'Products',   
        path: '/dashboard/products',
    }
]

export const Sidebar = () => {
    return (
        <>
            <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
                <div>
                    <div className="-mx-6 px-6 py-4">
                        <Link href="/dashboard" title="home">
                            <Image 
                                src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg" 
                                className="w-32" 
                                alt="tailus logo" 
                                width={32}
                                height={32} 
                                priority={true}/>
                        </Link>
                    </div>

                    <div className="mt-8 text-center">
                        <Image 
                            src="https://ampire.tailus.io/images/avatars/avatar-4.webp" 
                            alt="Avatar User" 
                            className="m-auto rounded-full object-cover"
                            width={100} 
                            height={100} 
                            priority={true}/>
                        <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">Jorge L. Rivera</h5>
                        <span className="hidden text-gray-400 lg:block">Admin</span>
                    </div>

                    <ul className="space-y-2 tracking-wide mt-8">
                        {
                            menuItems.map(menu=>(
                                <SidebarItem key={menu.id} {...menu} />
                            ))
                        }
                    </ul>
                </div>

                <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
                    <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                        <CiLogout />
                        <span className="group-hover:text-gray-700">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    )
}
