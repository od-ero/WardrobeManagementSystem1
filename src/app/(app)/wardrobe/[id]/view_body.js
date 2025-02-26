'use client'

import { Destroy, Edit, Restore } from '@/app/(app)/wardrobe/modals'
import { Header } from '@/app/commonVariable'
import Button from '@/components/Button'
import LoadingModal from '@/components/LoadingModal'
import ViewPageTable from '@/components/TableViewPage'
import { useHook } from '@/hooks/wardrobe'
import dayjs from 'dayjs'
import { notFound } from 'next/navigation'
import { useState } from 'react'

const ViewBody = ({wardrobe_id, isModal, onClose}) => {
    const { show } = useHook();
    const { data :wardrobeData, loading, data_mutate } =show(wardrobe_id);
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
    else if(Object.keys(wardrobeData).length === 0){
        notFound()
        return null;
    }

    const openEditModal = () => {
        setIsEditModalOpen(true);
    };

    const closeEditModal = (updatedData) => {
           data_mutate();
       
        setIsEditModalOpen(false);

    };

    const openDeleteModal = () => {

        setIsDeleteModalOpen(true);

    };

    const closeDeleteModal = (response) => {
        if(response == 'success') {
            const updatedData = {
                ...wardrobeData,
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
                ...wardrobeData,
                deleted_at: null
            };

            data_mutate(updatedData , false)
        }
        setIsActivateModalOpen(false);
    };

    const data = [
       
        { key: "Name", value:wardrobeData?.name },
        { key: "Category", value:wardrobeData?.category?.name },
        { key: "Brand", value:wardrobeData?.brand },
        { key: "Size", value:wardrobeData?.size },
        { key: "Color", value:wardrobeData?.color },
        { key: "Pattern", value:wardrobeData?.pattern },
        { key: "Material", value:wardrobeData?.material},
        { key: "Purchase Price", value:wardrobeData?.purchase_price },
        { key: "Purchase Place", value:wardrobeData?.purchase_place},
        { key: "Description", value:wardrobeData?.description },
    ];

    var status = 'Active';
    if(wardrobeData.deleted_at){
        const deleted_at = dayjs(wardrobeData?.deleted_at);
        status = 'In Active'
        data.push({ key: "Deactivated At", value: deleted_at?.format('DD/MM/YYYY') });
    }
    data.push({ key: "Status", value: status });

    return <div>
           <div className="basis-full w-full lg:basis-3/4 flex justify-center items-center relative">

                <div className="w-full sm:w-3/4 shadow-md">

                    {!isModal && (
                        <Header
                            title={`${
                               wardrobeData?.deleted_at ? "Deleted Item Profile" : "Item Profile"
                            } - ${wardrobeData?.name}`}
                        />
                    )}

                <div className="overflow-x-auto">
                    { isEditModalOpen && (<Edit
                        wardrobe_id={ wardrobe_id }
                        onClose={(updatedData) => closeEditModal(updatedData)}
                    />) }

                    { isDeleteModalOpen && (<Destroy wardrobe={{
                        id:wardrobeData?.id,
                        name:wardrobeData?.name
                    }} onClose={closeDeleteModal} />) }

                    { isActivateModalOpen && (<Restore  wardrobe={{
                        id:wardrobeData?.id,
                        name:wardrobeData?.name
                    }}  onClose={closeActivateModal} />) }

                    <ViewPageTable data={data} />
                </div>


                {!isModal && (
                    <div className="flex items-center justify-evenly my-2">
                        <Button
                            className="w-auto bg-primaryBlue"
                            type="button"
                            onClick={() => openEditModal(wardrobeData?.id)}
                        >
                            Edit
                        </Button>

                        {
                            status === 'Active' ? (
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
