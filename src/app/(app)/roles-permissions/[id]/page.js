'use client'


import React from 'react'

import ViewBody from '@/app/(app)/roles-permissions/[id]/view_body'
import MyListingPage from '@/app/(app)/roles-permissions/[id]/list'
const MyPage = ({params}) => {
    const { id } = params;

    if ( id == 'list-active' ||  id == 'list-inactive') {
        return <><MyListingPage page_id={ id }/></>;

    }  else {
            return <><ViewBody role_id={id} isModal={false} />

            </>
        }
};

export default MyPage;
