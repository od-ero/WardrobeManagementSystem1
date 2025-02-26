import React from 'react'

import ViewBody from '@/app/(app)/users/user-organization-branches/[user_id]/view_body'
import MyListingPage from '@/app/(app)/users/[id]/list-users'
const MyPage = ({params}) => {
    const { user_id } = params;

        return <>
            <ViewBody user_id={user_id} isModal={false} />

        </>
};

export default MyPage;
