'use client'

import React, { useState } from 'react'
import {useHook} from '@/hooks/organiztions/organization_branches'
import { Header } from '@/app/commonVariable'
import ViewPageTable from '@/components/TableViewPage'
import Button from '@/components/Button'
import { Edit,  Destroy, Restore } from '@/app/(app)/settings/(admin)/organization_branches/modals'
import dayjs from 'dayjs';
import { notFound } from 'next/navigation'
import LoadingModal from '@/components/LoadingModal'

const ViewBody = ({branch_id, isModal, onClose}) => {
    const { show } = useHook();
    const { data : branchData, loading, data_mutate } =show(branch_id);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isActivateModalOpen, setIsActivateModalOpen] = useState(false);

    if (loading) {
        return (
            <LoadingModal
                onClose={() => onClose(null)}
                closeModal = { onClose }
            />
        );
    }
    else if(Object.keys(branchData).length === 0){
        notFound()
        return null;
    }

    const openEditModal = () => {
        setIsEditModalOpen(true);
    };

    const closeEditModal = (updatedData) => {
           data_mutate();
        /*if(updatedData.organization_id != branchData.organization_id) {
           /!* if (updatedData.organization_id != branchData.organization_id){

            }else {*!/
                const mergedData = { ...branchData, ...updatedData }
                data_mutate(mergedData, false)
            //}
            //data_mutate(updatedData , false)
        }*/
        setIsEditModalOpen(false);

    };

    const openDeleteModal = () => {

        setIsDeleteModalOpen(true);

    };

    const closeDeleteModal = (response) => {
        if(response == 'success') {
            const updatedData = {
                ...branchData,
                deleted_at: dayjs().format()
            };

            data_mutate(updatedData , false)
        }
        setIsDeleteModalOpen(false);

    };

    const openActivateModal = () => {
        setIsActivateModalOpen(true);

    };
    const closeActivateModal = (response) => {
        if(response == 'success') {
            const updatedData = {
                ...branchData,
                deleted_at: null
            };

            data_mutate(updatedData , false)
        }
        setIsActivateModalOpen(false);
    };

    const data = [
        { key: "Organization", value: branchData.organization.name },
        { key: "Name", value: branchData.name },
        { key: "Code", value: branchData.code },
        { key: "Phone", value: branchData.phone },
        { key: "Second Phone", value: branchData.phone_2 },
        { key: "Email", value: branchData.email },
        { key: "Location", value: branchData.location },
        { key: "KRA PIN", value: branchData.kra_pin },
        { key: "Description", value: branchData.description },
    ];

    var login_status = 'Active';
    if(branchData.deleted_at){
        const deleted_at = dayjs(branchData.deleted_at);
        login_status = 'In Active'
        data.push({ key: "Deactivated At", value: deleted_at.format('DD/MM/YYYY') });
    }
    data.push({ key: "Status", value: login_status });

    return <div>
           <div className="basis-full w-full lg:basis-3/4 flex justify-center items-center relative">

                <div className="w-full sm:w-3/4 shadow-md">

                    {!isModal && (
                        <Header
                            title={`${
                                branchData.deleted_at ? "Deleted Org Branch Profile" : "Org Branch Profile"
                            } - ${branchData.name}`}
                        />
                    )}

                <div className="overflow-x-auto">
                    { isEditModalOpen && (<Edit
                        branch_id={ branch_id }
                        onClose={(updatedData) => closeEditModal(updatedData)}
                    />) }

                    { isDeleteModalOpen && (<Destroy organization={{
                        id: branchData.id,
                        name: branchData.name
                    }} onClose={closeDeleteModal} />) }

                    { isActivateModalOpen && (<Restore  organization={{
                        id: branchData.id,
                        name: branchData.name
                    }}  onClose={closeActivateModal} />) }

                    <ViewPageTable data={data} />
                </div>


                {!isModal && (
                    <div className="flex items-center justify-evenly my-2">
                        <Button
                            className="w-auto bg-primaryBlue"
                            type="button"
                            onClick={() => openEditModal(branchData.id)}
                        >
                            Edit
                        </Button>

                        {
                            login_status === 'Active' ? (
                                <Button
                                    onClick={() => openDeleteModal()}
                                    className="w-auto bg-primaryRed hover:bg-primaryGreen"
                                    type="button"
                                >
                                    Delete
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => openActivateModal()}
                                    className="w-auto bg-primaryBlue"
                                    type="button"
                                >
                                    Activate
                                </Button>
                            )
                        }

                    </div>
                )}


            </div>
        </div>

    </div>;

};

export default ViewBody;
