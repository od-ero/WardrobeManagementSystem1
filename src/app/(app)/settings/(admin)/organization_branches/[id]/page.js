'use client'


import React from 'react'

import ViewBody from '@/app/(app)/settings/(admin)/organization_branches/[id]/view_body'
import MyListingPage from '@/app/(app)/settings/(admin)/organization_branches/[id]/list'
const MyPage = ({params}) => {
    const { id } = params;

   /* if ( id == 'list-active' ||  id == 'list-inactive') {*/
        return <><MyListingPage organization_id = { id }  page_id={ id }/></>;

   /* }  else {
            return <><ViewBody organization_id={id} isModal={false} />

            </>
        }*/
};

export default MyPage;
