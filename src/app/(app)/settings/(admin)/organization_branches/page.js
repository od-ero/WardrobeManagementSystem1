'use client';
import { getPageTitle } from '@/app/commonVariable';
import { useRouter,  useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import UsersMenu from '@/app/(app)/users/users_menu'
import MyListingPage from '@/app/(app)/settings/(admin)/organization_branches/[id]/list'
import ViewBody from '@/app/(app)/settings/(admin)/organization_branches/[id]/view_body'
const MyPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const org_id = searchParams.get('org_id');
    const branch_id = searchParams.get('branch_id');
    if (org_id) {
        return <><MyListingPage organization_id = { org_id }  page_id={ org_id }/></>;
    } else if (branch_id) {
        return <> <ViewBody branch_id={branch_id}/></>
    }
    else {
        const pageTitle = 'Org Branches Center';

        useEffect(() => {
            document.title = pageTitle;
        }, [pageTitle]);


        return (
            <>
                <UsersMenu />
            </>
        );
    }
};

export default MyPage;

