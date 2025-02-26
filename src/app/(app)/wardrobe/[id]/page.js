'use client'

import MyListingPage from '@/app/(app)/wardrobe/[id]/list';
import ViewBody from '@/app/(app)/wardrobe/[id]/view_body';
const MyPage = ({params}) => {
    const { id } = params;

   if ( id == 'list-active' ||  id == 'list-inactive') {
        return <><MyListingPage  page_id={ id }/></>;

    }  else {
            return <><ViewBody wardrobe_id={id} isModal={false} />

            </>
        }
};

export default MyPage;
