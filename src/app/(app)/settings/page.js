'use client';
import { useEffect } from 'react';
import Menu from '@/app/(app)/settings/settings_menu'

const MyPage = () => {

    const pageTitle = 'Settings'; // Dynamic page title

    useEffect(() => {
        document.title = pageTitle; // Update title on the client
    }, [pageTitle]);

    return (

        <div>

            <Menu/>

            <p>


            </p>
        </div>
    );
};

export default MyPage;

