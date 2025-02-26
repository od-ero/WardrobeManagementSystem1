'use client';
import { getPageTitle } from '@/app/commonVariable';


const MyPage = () => {

        document.title = getPageTitle +  ` Roles and Permissions `;

    return (

            <div>
                <p>roles</p>

            </div>
    );
};

export default MyPage;

