'use client';
import { getPageTitle } from '@/app/commonVariable';
import { useEffect } from 'react';
import HomeMenu from '@/app/(app)/users/users_menu'
import UsersMenu from '@/app/(app)/users/users_menu'

const Dashboard = () => {

    const pageTitle = 'POS Center'; // Dynamic page title

    useEffect(() => {
        document.title = pageTitle + ' | ' + localStorage.getItem('company_name'); // Update title on the client
    }, [pageTitle]);

    return (

            <div>
                <UsersMenu   />
                <p>


                </p>
            </div>
    );
};

export default Dashboard;

