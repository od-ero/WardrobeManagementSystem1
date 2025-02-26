
'use client'

import Input_body from '@/app/(app)/settings/(admin)/organization_branches/form_body'

const Mypage =() => {
    document.title = 'Create Org Branch';
    return <div>
        <Input_body triggered_action={ `create` } module_data={ '' } closeModal={``}/>
    </div>
}
export default Mypage;


