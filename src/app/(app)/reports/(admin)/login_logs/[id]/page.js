'use client'


import React from 'react'

import ViewBody from '@/app/(app)/reports/(admin)/login_logs/[id]/view_body'
import MyListingPage from '@/app/(app)/reports/(admin)/login_logs/[id]/list_login_logs'

const MyPage = ({params}) => {
    const { id } = params;

    if ( id == 'list') {
        return <><MyListingPage page_id={ id }/></>;

    }  else {
        return <><ViewBody log_id={id} isModal={false} />

        </>
    }
};

export default MyPage;
