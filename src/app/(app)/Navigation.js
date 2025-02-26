import DropdownArrow from '@/components/DropdownArrow'
import { DropdownButton } from '@/components/DropdownLink'
import NavLink from '@/components/NavLink'
import Sidebar from '@/components/Sidebar'
import { useAuth } from '@/hooks/auth'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import noImageUser from '../../../public/images/users/noimageuser.png'
const Navigation = ({ user, onSelectMenuLink  }) => {

    const { logout } = useAuth()
    const router = useRouter()

    const pathname = usePathname();


    const [open, setOpen] = useState(false)
    return (
        <>

            <div className="fixed top-0 left-0 right-0 bg-blue-600 shadow text-white  h-14 z-40 ">

                    <div className="mx-2 h-full  sm:px-6 lg:px-8 flex items-center justify-between">


                        <div className="font-semibold text-xl leading-tight align-middle">
                          <Link href="/home" >WMS</Link>
                        </div>

                        <div className="leading-tight">
                           Wardrobe Management System

                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <DropdownArrow
                                align="right"
                                width="48"
                                trigger={
                                    <button
                                        className="flex items-center text-sm font-medium  focus:outline-none transition duration-150 ease-in-out">

                                        {/* User Profile Image */}
                                        <div className="flex-shrink-0 mr-3">
                                            <Image src={noImageUser} alt="image"
                                                   className="w-10 h-10 rounded-full"
                                            />
                                        </div>

                                        {/* User Information */}
                                        <div className="text-left">
                                            <div>{user?.first_name} {user?.last_name}</div>
                                           
                                            
                                        </div>

                                        {/* Dropdown Arrow */}
                                        <div className="ml-1">
                                            <svg
                                                className="fill-current h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    </button>
                                }>

                             
                                <DropdownButton onClick={() => logout()}>
                                    Logout
                                </DropdownButton>

                            </DropdownArrow>
                        </div>


                        {/* Hamburger */}
                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setOpen(open => !open)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-blue-600 bg-gray-100 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-blue-600 transition duration-150 ease-in-out">
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24">
                                    {open ? (
                                        <path
                                            className="inline-flex"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            className="inline-flex"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </button>
                        </div>

                    </div>

            </div>

            <nav>


                    <div className="fixed top-14 h-14 left-0 right-0 bg-white border-b-2 border-blue-100 hidden sm:block">

                        <div className=" mx-auto h-full  sm:px-6 lg:px-8 flex items-center justify-between">

                   
                          <>
                              <NavLink
                                href="/home"
                                active={usePathname() === '/home'}
                                className={`inline-flex items-center`}
                                // onClick={() => onSelectMenuLink('/home', 'home/home_menu', 'HOME')}
                            >
                                Home
                            </NavLink>
                      
                            <NavLink
                            href="/wardrobe"
                            active={usePathname() === '/wardrobe'}
                            // onClick={() => onSelectMenuLink('/reports', 'reports/reports_menu', 'Reports Center')}
                        >
                            Wardrobe
                        </NavLink>
                        
                       <NavLink
                            href="/users"
                            active={usePathname() === '/users'}
                            // onClick={() => onSelectMenuLink('/users', 'users/users_menu', 'Users Center')}
                        >
                            Users
                        </NavLink> 

                   
 {/* 
                      
                                              
                            <NavLink
                                href="#"
                                active={usePathname() === '/settings'}
                                onClick={() => onSelectMenuLink( '/settings', 'settings/settings_menu', 'Settings Center')}
                            >
                                Settings
                            </NavLink>

                             */}

                        </>

                        </div>

                    </div>
                    

            </nav>


            <Sidebar
                user={user}
                openSidebar={open}
                logOut={() => logout()}

            />

        </>


)
}

export default Navigation
