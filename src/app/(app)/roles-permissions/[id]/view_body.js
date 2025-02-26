'use client'

import React, { useState } from 'react'
import {useHook} from '@/hooks/rolesPermissions'
import { Header } from '@/app/commonVariable'
import ViewPageTable, { ListingTableViewPage } from '@/components/TableViewPage'
import Button from '@/components/Button'
import Edit, { Destroy, Restore } from '@/app/(app)/roles-permissions/modals'
import dayjs from 'dayjs';
import { notFound } from 'next/navigation'
import LoadingModal from '@/components/LoadingModal'
import { handleFormInputChange, SwitchInput } from '@/components/Floating_Form_input'

const ViewBody = ({role_id, isModal, onClose}) => {
    const { show } = useHook();
    const { data : roleData, loading, data_mutate } =show(role_id);

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


    else if(Object.keys(roleData).length === 0){
        notFound()
        return null;
    }

    const openEditModal = () => {
        setIsEditModalOpen(true);
    };

    const closeEditModal = (updatedData) => {

        if(updatedData) {
            const mergedData = { ...roleData, ...updatedData };
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
                ...roleData,
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
                ...roleData,
                deleted_at: null
            };

            data_mutate(updatedData , false)
        }
        setIsActivateModalOpen(false);
    };

    const openCreateBranchModal = () => {

        setIsCreateBranchModalOpen(true)
    }

    const Permission_div = () => {
        return (
            <>
                <div  className="border p-4 rounded-lg mb-4">
                <ViewPageTable data={[{key: 'Role name', value: roleData?.name}]}/>
                </div>
                {Object.entries(roleData?.grouped_permissions || {}).map(([module, permissions], moduleIndex) => {
                    const data = permissions.map((permission, index) => ({
                        key: `${index + 1}  .`, // Unique key
                        value: permission.name, // Using name as the label
                    }))

                    return (
                        <div key={moduleIndex} className="border p-4 rounded-lg mb-4">

                            <h3 className="text-md font-semibold mb-2 text-center">{module}</h3>
                            {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">*/}
                            <ListingTableViewPage data={data} />
                            {/*</div>*/}
                        </div>
                    )
                })}
            </>
        );
    };


    return <div>


        <div className="basis-full w-full lg:basis-3/4 flex justify-center items-center relative">

                <div className="w-full sm:w-3/4 shadow-md">

                    {!isModal && (
                        <Header
                            title={`${
                                roleData.deleted_at ? "Deleted Role Profile" : "Role Profile"
                            } - ${roleData.name}`}
                        />
                    )}

                <div className="overflow-x-auto">
                    { isEditModalOpen && (<Edit
                        role_id={role_id}
                        onClose={(updatedData) => closeEditModal(updatedData)}
                    />) }

                    { isDeleteModalOpen && (<Destroy organization={{
                        id: roleData.id,
                        name: roleData.name
                    }} onClose={closeDeleteModal} />) }

                    { isActivateModalOpen && (<Restore  organization={{
                        id: roleData.id,
                        name: roleData.name
                    }}  onClose={closeActivateModal} />) }

                    <Permission_div/>
{/*<ListingTableViewPage data={} />*/}
                    {/*<ViewPageTable data={data} />*/}

                </div>


                {!isModal && (
                    <div className="flex items-center justify-evenly my-2">
                        <Button
                            className="w-auto bg-primaryBlue"
                            type="button"
                            onClick={() => openEditModal(roleData.id)}
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

                       {/* {
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
*/}
                    </div>
                )}


            </div>
        </div>

    </div>;

};

export default ViewBody;
