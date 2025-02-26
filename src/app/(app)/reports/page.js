'use client';

import { useEffect } from 'react'
import ReportsMenu from '@/app/(app)/reports/reports_menu'

const MyPage = () => {

    const pageTitle = 'Reports Center';

    useEffect(() => {
        document.title = pageTitle;
    }, [pageTitle]);

    return (
            <div>
                <ReportsMenu/>
            </div>
    );
};

export default MyPage;

