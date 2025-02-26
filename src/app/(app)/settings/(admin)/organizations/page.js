'use client';
import { getPageTitle } from '@/app/commonVariable';
import { useEffect } from 'react';
import UsersMenu from '@/app/(app)/users/users_menu'

const MyPage = () => {

    const pageTitle = 'Users Center'; // Dynamic page title

    useEffect(() => {
        document.title = pageTitle; // Update title on the client
    }, [pageTitle]);

    return (

            <div>
                <UsersMenu/>

                <p>


                </p>
            </div>
    );
};

export default MyPage;

