'use client'

import React, { useState } from 'react'
import {useOrganizations} from '@/hooks/organiztions/organizations'
import { Header } from '@/app/commonVariable'
import ViewPageTable, { ListingTableViewPage } from '@/components/TableViewPage'
import Button from '@/components/Button'
import Edit, { Destroy, Restore } from '@/app/(app)/settings/(admin)/organizations/modals'
import dayjs from 'dayjs';
import { notFound } from 'next/navigation'
import LoadingModal from '@/components/LoadingModal'
import CreateBranch from '@/app/(app)/settings/(admin)/organization_branches/modals'
import Branches  from '@/app/(app)/settings/(admin)/organization_branches/[id]/list'
import Devices from '@/app/(app)/settings/(admin)/devices/[id]/list-devices'
const ViewBody = ({organization_id, isModal, onClose}) => {
    const { showOrganization } = useOrganizations();
    const { data : organizationData, loading, data_mutate } =showOrganization(organization_id);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isActivateModalOpen, setIsActivateModalOpen] = useState(false);
    const [isCreateBranchModalOpen, setIsCreateBranchModalOpen] = useState(false)
    if (loading) {
        return (
            <LoadingModal
                onClose={() => onClose(null)}
                closeModal = { onClose }
            />
        );
    }


    else if(Object.keys(organizationData).length === 0){
        notFound()
        return null;
    }

    const openEditModal = () => {
        setIsEditModalOpen(true);
    };

    const closeEditModal = (updatedData) => {

        if(updatedData) {
            const mergedData = { ...organizationData, ...updatedData };
            data_mutate(mergedData, false)
            //data_mutate(updatedData , false)
        }
        setIsEditModalOpen(false);

    };

    const openDeleteModal = () => {

        setIsDeleteModalOpen(true);

    };

    const closeDeleteModal = (response) => {
        if(response == 'success') {
            const updatedData = {
                ...organizationData,
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
                ...organizationData,
                deleted_at: null
            };

            data_mutate(updatedData , false)
        }
        setIsActivateModalOpen(false);
    };

    const openCreateBranchModal = () => {

        setIsCreateBranchModalOpen(true)
    }

    const closeCreateBranchModal = () => {

        setIsCreateBranchModalOpen(false)

    }
    const data = [
        { key: "Name", value: organizationData.name },
        { key: "Code", value: organizationData.code },
        { key: "Phone", value: organizationData.phone },
        { key: "Second Phone", value: organizationData.phone_2 },
        { key: "Email", value: organizationData.email },
        { key: "KRA PIN ", value: organizationData.kra_pin},
        { key: "Location", value: organizationData.location },
        { key: "Description", value: organizationData.description },
    ];

    var login_status = 'Active';
    if(organizationData.deleted_at){
        const deleted_at = dayjs(organizationData.deleted_at);
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
                                organizationData.deleted_at ? "Deleted Organization Profile" : "Organization Profile"
                            } - ${organizationData.name}`}
                        />
                    )}

                <div className="overflow-x-auto">
                    { isEditModalOpen && (<Edit
                        organization_id={organization_id}
                        onClose={(updatedData) => closeEditModal(updatedData)}
                    />) }

                    { isDeleteModalOpen && (<Destroy organization={{
                        id: organizationData.id,
                        name: organizationData.name
                    }} onClose={closeDeleteModal} />) }

                    { isActivateModalOpen && (<Restore  organization={{
                        id: organizationData.id,
                        name: organizationData.name
                    }}  onClose={closeActivateModal} />) }
                    {isCreateBranchModalOpen && (
                        <CreateBranch
                            organization={{
                                id: organizationData.id,
                                name: organizationData.name
                            }}
                            onClose={(updatedData) => closeCreateBranchModal(updatedData)}
                        />
                    )}

                    <ViewPageTable data={data} />

                    {organizationData?.branches_count > 0 && (
                        <>
                            <Branches organization_id={organization_id} />

                           {/* {organizationData?.branches?.length > 0 && (
                                <>
                                    <h6 className="text-center m-3">Assigned Branches</h6>
                                    <ListingTableViewPage
                                        data={organizationData.branches.map((item, index) => ({
                                            key: index + 1,
                                            value: item.name
                                        }))}
                                    />
                                </>
                            )}*/}
                        </>
                    )}
                    {organizationData?.devices_count > 0 && (
                        <>
                            <Devices organization_id={organization_id} />

                           {/* {organizationData?.branches?.length > 0 && (
                                <>
                                    <h6 className="text-center m-3">Assigned Branches</h6>
                                    <ListingTableViewPage
                                        data={organizationData.branches.map((item, index) => ({
                                            key: index + 1,
                                            value: item.name
                                        }))}
                                    />
                                </>
                            )}*/}
                        </>
                    )}



                  {/*  {organizationData?.devices_count > 0 && (() => {
                        const branches_data = organizationData?.devices?.map((item, index) => ({
                            key: index + 1,
                            value: item.device_name
                        }));

                        return (
                            <>
                                <h6 className="text-center m-3">Devices</h6>
                                 {userData?.branches?.map((item, index) => (

                                    <span key={index}>{`${index + 1}. ${item.name}`}</span>
                                ))}
                                <ListingTableViewPage data={branches_data}/>
                            </>
                        );
                    })()}*/}
                </div>


                {!isModal && (
                    <div className="flex items-center justify-evenly my-2">
                        <Button
                            className="w-auto bg-primaryBlue"
                            type="button"
                            onClick={() => openEditModal(organizationData.id)}
                        >
                            Edit
                        </Button>
                        <Button
                            className="w-auto"
                            type="button"
                            onClick={() =>  openCreateBranchModal()}
                        >
                            Add Branch
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
