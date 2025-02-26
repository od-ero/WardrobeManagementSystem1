'use client'


import React from 'react'

import ViewUserBody from '@/app/(app)/users/[id]/user_view_body'
import MyListingPage from '@/app/(app)/users/[id]/list-users'
const MyPage = ({params}) => {
    const { id } = params;

    if ( id == 'list-active' ||  id == 'list-inactive') {
        return <><MyListingPage page_id={ id }/></>;

    }  else {
            return <><ViewUserBody user_id={id} isModal={false} />

            </>
        }
};

export default MyPage;
