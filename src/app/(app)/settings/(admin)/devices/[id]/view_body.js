'use client'

import React, {  useState } from 'react'
import { useDevices} from '@/hooks/devices'
import { Header } from '@/app/commonVariable'
import ViewPageTable, { ListingTableViewPage } from '@/components/TableViewPage'
import Button from '@/components/Button'
import Edit, { Destroy, Restore } from '@/app/(app)/settings/(admin)/devices/devices_modals'
import dayjs from 'dayjs';
import { notFound } from 'next/navigation'
import LoadingModal from '@/components/LoadingModal'

const ViewBody = ({device_id, isModal, onClose}) => {
    const { showDevice } = useDevices();
    const { device : deviceData, loading, data_mutate } = showDevice(device_id);

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


    else if(Object.keys(deviceData).length === 0){
        notFound()
        return null;
    }

    const openEditModal = () => {
        setIsEditModalOpen(true);
    };

    const closeEditModal = (updatedData) => {

        if(updatedData) {
            const mergedData = { ...deviceData, ...updatedData };
            data_mutate(mergedData, false)
        }
        setIsEditModalOpen(false);

    };

    const openDeleteModal = () => {

        setIsDeleteModalOpen(true);

    };

    const closeDeleteModal = (response) => {
        if(response == 'success') {
            const updatedData = {
                ...deviceData,
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
                ...deviceData,
                deleted_at: null
            };

            data_mutate(updatedData , false)
        }
        setIsActivateModalOpen(false);
    };

    const data = [

        { key: "Name", value: deviceData.device_name },
        { key: "Code", value: deviceData.device_code },
        { key: "MAC", value: deviceData.device_mac },
        { key: "Organization", value: deviceData.organization.name },
      /*  { key: "Created BY", value: deviceData.creator.first_name + '  ' + deviceData.creator.last_name },
        { key: "Updated BY", value: deviceData.updater.first_name + ' '+  deviceData.updater.last_name },*/
        { key: "Description", value: deviceData.description },
    ];

    var login_status = 'Active';
    if(deviceData.deleted_at){
        const deleted_at = dayjs(deviceData.deleted_at);
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
                                deviceData.deleted_at ? "Deleted Device" : "Device Profile"
                            } - ${deviceData.device_name} `}
                        />
                    )}


                <div className="overflow-x-auto">
                    { isEditModalOpen && (<Edit
                        device_id={device_id}
                        onClose={(updatedData) => closeEditModal(updatedData)}
                    />) }

                    { isDeleteModalOpen && (<Destroy device={{
                        id: deviceData.id,
                        device_name: deviceData.device_name,
                    }} onClose={closeDeleteModal} />) }

                    { isActivateModalOpen && (<Restore  device={{
                        id: deviceData.id,
                        device_name: deviceData.device_name
                    }}  onClose={closeActivateModal} />) }

                    <ViewPageTable data={data} />

                    {deviceData?.branches_count > 0 && (() => {
                        const branches_data = deviceData?.branches?.map((item, index) => ({
                            key: index + 1,
                            value: item.name
                        }));

                        return (
                            <>
                                <h6 className="text-center m-3">Assigned Branches</h6>
                                {/* {userData?.branches?.map((item, index) => (

                                    <span key={index}>{`${index + 1}. ${item.name}`}</span>
                                ))}*/}
                                <ListingTableViewPage data={branches_data}/>
                            </>
                        );
                    })()}

                </div>


                {!isModal && (
                    <div className="flex items-center justify-evenly my-2">
                        <Button
                            className="w-auto bg-primaryBlue"
                            type="button"
                            onClick={() => openEditModal(deviceData.id)}
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
