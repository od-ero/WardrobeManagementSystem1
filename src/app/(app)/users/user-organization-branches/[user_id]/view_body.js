'use client'

import React, { useState } from 'react'
import {useHook} from '@/hooks/userOrganiztionBranches'
import { Header } from '@/app/commonVariable'
import {  ViewTablePage } from '@/components/TableViewPage'
import Button from '@/components/Button'
import EditAdd from '@/app/(app)/users/user-organization-branches/modals'
import dayjs from 'dayjs';
import {  useRouter } from 'next/navigation'
import LoadingModal from '@/components/LoadingModal'
import { handleFormInputChange, SwitchInput } from '@/components/Floating_Form_input'
import DisplayErrors from '@/components/DisplayErrors'
import CreateBranch from '@/app/(app)/settings/(admin)/organization_branches/modals'


const ViewBody = ({user_id, isModal, onClose}) => {
   const router  = useRouter();
    const {show} = useHook();
    const { data, loading, data_mutate } = show(user_id);
const userbranchesData = data?.userbranches;
const user_full_name = data?.user_full_name;
    const [isAddEditModalOpen, setisAddEditModalOpen] = useState(false);

    if (loading) {
        return (
            <LoadingModal
                onClose={() => onClose(null)}
                closeModal = { onClose }
            />
        );
    }




    const openEditModal = () => {
        setisAddEditModalOpen(true);
    };

    const closeAddEditModal = () => {

       /* if(updatedData) {
            const mergedData = { ...userbranchesData, ...updatedData };*/
            data_mutate()
     /*   }*/
        setisAddEditModalOpen(false);

    };





    const columns = [
        {
            name: <div className="text-yellow-500 font-medium">#</div>,
            width: '5%',
            sortable: true,
            cell: (row, rowIndex) => <div>{rowIndex + 1}</div>,
        },
        {
            name: <div className="text-yellow-500 font-medium">Branch</div>,
            selector: (row) => row.name,
            sortable: true,
            cell: (row) => <div className="text-gray-800">{`${row.name}`}</div>,
        },
        {
            name: <div className="text-yellow-500 font-medium">Permission Level</div>,
            selector: (row) => row.role,
            sortable: true,
            cell: (row) => <div className="text-green-600 font-semibold">{row.role}</div>,
        },
        {
            name: <div className="text-yellow-500 font-medium">Description</div>,
            selector: (row) => row.role,
            sortable: true,
            cell: (row) => <div className="text-green-600 font-semibold">{row.description}</div>,
        }
    ]

    return <div>


           <div className="basis-full w-full lg:basis-3/4 flex justify-center items-center relative">

                <div className="w-full sm:w-3/4 shadow-md">

                    {!isModal && (
                        <Header
                            title={`Branches and roles for - ${user_full_name}`}
                        />
                    )}


                <div className="overflow-x-auto">
                    { isAddEditModalOpen && (<EditAdd
                        user_id={user_id}
                        onClose={() => closeAddEditModal()}
                    />) }





                    <ViewTablePage data={userbranchesData} columns={columns} />


                </div>

                {!isModal && (
                    <div className="flex items-center justify-evenly my-2 flex-nowrap">
                        <Button
                            className="w-auto bg-primaryBlue"
                            type="button"
                            onClick={() => openEditModal(userbranchesData.id)}
                        >
                            Update / Add
                        </Button>
                        <Button

                            className="w-auto bg-primaryBlue"
                            type="button"
                            onClick={() => router.push(`/users/user-organization-branches?user_id=${user_id}`)}

                        >
                           Update/ Add  and add new
                        </Button>

                    </div>
                )}


            </div>
        </div>

    </div>;

};

export default ViewBody;
