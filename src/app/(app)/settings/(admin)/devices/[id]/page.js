'use client'


import React from 'react'

import ViewBody from '@/app/(app)/settings/(admin)/devices/[id]/view_body'
import MyListingPage from '@/app/(app)/settings/(admin)/devices/[id]/list-devices'

const MyPage = ({params}) => {
    const { id } = params;

    if ( id == 'list-active' ||  id == 'list-inactive') {
        return <><MyListingPage page_id={ id }/></>;

    }  else {
            return <><ViewBody device_id = {id} isModal={false} />

            </>
        }
};

export default MyPage;
