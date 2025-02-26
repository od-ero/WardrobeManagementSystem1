'use client';

import React from 'react';
import { useAuth } from '@/hooks/auth';
import { useOrganizations } from '@/hooks/organiztions/organizations';
import LoadingModal from '@/components/LoadingModal';
import OrganizationCard from '@/components/OrganizationsCard';
import { Header } from '@/app/commonVariable'
import { useRouter, useSearchParams } from 'next/navigation'
import Swal from 'sweetalert2'
const Dashboard = () => {
    document.title = 'My Organizations';
    const router = useRouter()
    const { user, logout} = useAuth();
    const { loading, data: organizationsData } = useOrganizations().listOrganizations();
    const searchParams = useSearchParams()
    const intended_url = searchParams.get('intended');
    if (user?.special_access === 1) {
        if (loading) {
            return <LoadingModal />;
        }



        return (
            <div>
                <Header title={`My Organizations`}/>
                <div className="grid sm:grid-cols-3 gap-4 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4">

                    {organizationsData?.length > 0 ? (
                        organizationsData.map((item) => {
                            const home_landing_page = intended_url
                                ? `/organization/${item?.id}?intended=${intended_url}`
                                : `/organization/${item?.id}`;

                            return (
                                <OrganizationCard
                                    key={item.id}
                                    name={item?.name}
                                    location={item?.location}
                                    href={home_landing_page}
                                    phone={item?.phone}
                                />
                            );
                        })
                    ) : (
                        <p>No organizations found.</p>
                    )}
                </div>
            </div>
        );
   }
   else{
       if(user?.organization_id) {
           const home_landing_page = intended_url ? `/organization/${user?.organization_id}?intended=${intended_url} `: `/organization/${user?.organization_id}`
           router.replace(home_landing_page)

       }else{
           Swal.fire({
               toast: true,
               position: "top",
               icon: "error",
               title: "Error",
               text: 'Kindly Ensure Your Organization Is Active',
               showConfirmButton: false,
               timer: 5000,
               timerProgressBar: true,
           });
           logout();
       }

    }
   // return null; // Avoid rendering anything if `special_access !== 0`
};

export default Dashboard;
