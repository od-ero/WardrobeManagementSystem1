'use client'
import {  useSearchParams } from 'next/navigation'
import Input_body from '@/app/(app)/users/user-organization-branches/form_body'

import React from 'react'

const Mypage =() => {
    document.title = 'Assign User Branches';

    const searchParams = useSearchParams();
    const passed_user_id = searchParams.get('user_id');
let user_id = '';
if(passed_user_id){
    user_id= passed_user_id;
}
 /*   const  module_data = { user_id: user_id }*/
    return <div>
        <Input_body triggered_action={ `create` } passed_user_id={user_id} closeModal={``}/>
    </div>
}
export default Mypage;


