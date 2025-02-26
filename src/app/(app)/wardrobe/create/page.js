
'use client'

import Input_body from '@/app/(app)/wardrobe/form_body';

const Mypage =() => {
    document.title = 'Add Item';
    return <div>
        <Input_body triggered_action={ `create` } module_data={ '' } closeModal={``}/>
    </div>
}
export default Mypage;


