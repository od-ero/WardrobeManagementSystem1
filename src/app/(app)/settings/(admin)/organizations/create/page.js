
'use client'

import Organization_input_body from '@/app/(app)/settings/(admin)/organizations/form_body'

const Mypage =() => {
    return <div>
        <Organization_input_body is_edit={ false } organization={ '' } closeModal={``}/>
    </div>
}
export default Mypage;


