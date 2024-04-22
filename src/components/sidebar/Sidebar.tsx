import Image from 'next/image';
import { SidebarItem } from './SidebarItem';
import Link from 'next/link';
import { IoBasketOutline, IoCalendarOutline, IoCheckboxOutline, IoCodeWorkingOutline, IoListOutline, IoPersonOutline } from 'react-icons/io5';
import { auth } from '@/app/api/auth/auth';
import { LogoutButton } from './LogoutButton';

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
    },
    {
        id: 6,
        icon: <IoPersonOutline size={30} />,
        title: 'Profile',
        path: '/dashboard/profile',
    }
]

export const Sidebar = async () => {
    const session = await auth();
    const userName = session?.user?.name ?? 'No Name'
    const avatarUrl = (session?.user?.image)
        ? session.user.image
        : 'https://ampire.tailus.io/images/avatars/avatar-4.webp';
    const userRoles = session?.user?.roles ?? ['client']    

    return (
        <>
            <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r 
                bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
                <div>
                    <div className="-mx-6 px-6 py-4">
                        <Link href="/dashboard" title="home">
                            <Image
                                src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
                                className="w-32"
                                alt="tailus logo"
                                width={32}
                                height={32}
                                priority={true} />
                        </Link>
                    </div>

                    <div className="mt-8 text-center">
                        <Image
                            src={avatarUrl}
                            alt="Avatar User"
                            className="m-auto rounded-full object-cover"
                            width={100}
                            height={100}
                            priority={true} />
                        <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{userName}</h5>
                        <span className="hidden text-gray-400 lg:block capitalize">
                            {userRoles.join(',')}
                        </span>
                    </div>

                    <ul className="space-y-2 tracking-wide mt-8">
                        {
                            menuItems.map(menu => (
                                <SidebarItem key={menu.id} {...menu} />
                            ))
                        }
                    </ul>
                </div>

                <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
                     <LogoutButton />
                </div>
            </aside>
        </>
    )
}
