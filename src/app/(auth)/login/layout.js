import Link from 'next/link'
import AuthCard from '@/app/(auth)/AuthCard'
import ApplicationLogo from '@/components/ApplicationLogo'
import Image from "next/image";
import background from "/public/images/auth/mountain.png"

/*export const metadata = {
    title: 'Login',
}*/


import { getPageTitle } from '@/app/commonVariable';

export const metadata = {
    title: getPageTitle('Login'), // Now correctly appends the system name
};

const Layout = ({ children }) => {
    return (
        <div>
                {children}
        </div>
    )
}

export default Layout
