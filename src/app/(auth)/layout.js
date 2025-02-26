import Link from 'next/link'
import AuthCard from '@/app/(auth)/AuthCard'
import ApplicationLogo from '@/components/ApplicationLogo'

import { getPageTitle } from '@/app/commonVariable';

export const metadata = {
    title: getPageTitle('Authentication'), // Now correctly appends the system name
};

const Layout = ({ children }) => {
    return (
        <div>
                <AuthCard >
                    {children}
                </AuthCard>
        </div>
    )
}

export default Layout
