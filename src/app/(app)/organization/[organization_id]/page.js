'use client';

import React from 'react';
import { useAuth } from '@/hooks/auth';
import LoadingModal from '@/components/LoadingModal';
import OrganizationCard from '@/components/OrganizationsCard';
import { Header } from '@/app/commonVariable'
import {useHook  } from '@/hooks/userOrganiztionBranches'
//import {useHook  } from '@/hooks/organiztions/organization_branches'
//import {listAssignedBranches} from '@/hooks/users'
import Swal from 'sweetalert2'
import { useSearchParams } from 'next/navigation'

const Dashboard = ({ params }) => {
    document.title = 'My Branches';
    const { user,setOrganizationBranch, logout } = useAuth();
    const user_special_access = user?.special_access;
    const {organization_id } = params;
    //const {list} =useHook();
    const { getMyBranches } = useHook();
    const searchParams = useSearchParams()
    const intended_url = searchParams.get('intended');
    const {data, loading, data_mutate} = getMyBranches(organization_id)
    const branches_data = data?.userbranches;
   /* let data = [];
    let loading = false;*/
   /* if (user_special_access == 0 ){
        ({data, loading } = listAssignedBranches(user?.id));
    }
    else if (user_special_access == 1){
       ( { data, loading } = list(organization_id));
    }
    else{
        logout()
    }*/

function updateBranch(branch_id){
       setOrganizationBranch ({
           organization_id,
           user_id: user?.id,
           branch_id
       });
}




    if (loading) return <LoadingModal />;
    if (!branches_data || branches_data.length === 0){
        if ( user_special_access == 0) {
            logout()
            Swal.fire({
                toast: true,
                icon: "error",
                title: 'Fail',
                text: 'You have No Access to A Branch',
                position: "top",
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
            });
        }else{
            return 'No active c branches'
        }
    };
    if ( user_special_access == 0) {
        if (branches_data.length === 1) {
            setOrganizationBranch({
                organization_id,
                user_id: user?.id,
                branch_id: data[0].branch_id
            });
        }
    }
    return (
        <div>
            <Header title="My Branches" />
            <div className="grid sm:grid-cols-3 gap-4 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4">
                {branches_data.length > 0 ? (
                    branches_data.map((item) => (
                        <OrganizationCard
                            key={item?.branch_id}
                            name={item?.name}
                            location={item?.role}
                            phone={item?.phone}
                           /* user={user}*/
                            onSelectBranch={() =>  updateBranch(item?.branch_id)}
                        />
                    ))
                ) : (
                    <p>No Active ff Branches</p>
                )}
            </div>
        </div>
    );
};



export default Dashboard;
