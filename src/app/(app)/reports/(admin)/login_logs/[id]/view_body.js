'use client'

import React, {  useState } from 'react'
import { useLoginLogs } from '@/hooks/login_logs'
import { Header } from '@/app/commonVariable'
import ViewPageTable from '@/components/TableViewPage'
import Button from '@/components/Button'
import Edit, { Destroy, Restore } from '@/app/(app)/settings/(admin)/devices/devices_modals'
import dayjs from 'dayjs';
import { notFound } from 'next/navigation'
import LoadingModal from '@/components/LoadingModal'

const ViewBody = ({log_id, isModal, onClose}) => {
    const { showLoginLog } = useLoginLogs();
    const { data :log, loading } = showLoginLog(log_id);



    if (loading) {
        return (
            <LoadingModal
                onClose={() => onClose(null)}
                closeModal = { onClose }
            />
        );
    }


    else if(Object.keys(log).length === 0){
        notFound()
        return null;
    }






    const data = [
        { key: "User", value: log?.user?.first_name +' '+log?.user?.last_name },
        { key: "Device", value: log?.device?.device_name },
        { key: "Login Time", value: dayjs(log?.created_at).format('DD/MM/YYYY HH:mm') },
        {
            key: 'Login Status', value: <div
                className={`font-semibold ${
                    log?.session?.user_id ? 'text-primaryGreen' : 'text-primaryBlack'
                }`}
            >
                {log?.session?.user_id ? 'Active' : 'Out'}
            </div>,
        },
        { key: 'IP', value: log?.ip_address },
        { key: 'Branch Details', value: log?.branche_id },
    ];



    return <div>


        <div className="basis-full w-full lg:basis-3/4 flex justify-center items-center relative">

            <div className="w-full sm:w-3/4 shadow-md">

                {!isModal && (
                    <Header
                        title={`${
                           "Login Log Profile"
                        } - ${log?.user?.first_name +' '+log?.user?.last_name} `}
                    />
                )}


                <div className="overflow-x-auto">

                    <ViewPageTable data={data} />
                </div>




            </div>
        </div>

    </div>;

};

export default ViewBody;
