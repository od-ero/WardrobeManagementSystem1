'use client'

import UserBranchesViewBody from '@/app/(app)/users/user-organization-branches/[user_id]/view_body'
import EditAddUserOrganizationBranch from '@/app/(app)/users/user-organization-branches/modals'
import Edit, { Destroy, Restore } from '@/app/(app)/users/users_modals'
import { Header } from '@/app/commonVariable'
import Button from '@/components/Button'
import LoadingModal from '@/components/LoadingModal'
import ViewPageTable from '@/components/TableViewPage'
import { showUser } from '@/hooks/users'
import dayjs from 'dayjs'
import { notFound, useRouter } from 'next/navigation'
import { useState } from 'react'
import { mutate } from 'swr'


const ViewBody = ({user_id, isModal, onClose}) => {

    const { user : userData, loading, data_mutate } = showUser(user_id);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isEditAddUserOrganizationBranchModalOpen, setIsEditAddUserOrganizationBranchModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isActivateModalOpen, setIsActivateModalOpen] = useState(false);
const router = useRouter();
    if (loading) {
        return (
            <LoadingModal
                onClose={() => onClose(null)}
                closeModal = { onClose }
            />
        );
    }


    else if(Object.keys(userData).length === 0){
        notFound()
        return null;
    }

    const openEditAddUserOrganizationBranchModal = () => {
        setIsEditAddUserOrganizationBranchModalOpen(true);
    };

    const closeEditAddUserOrganizationBranchModal = () => {
mutate(`/api/user-organization-branches/show/${user_id}`);

        setIsEditAddUserOrganizationBranchModalOpen(false);

    };
    const openEditModal = () => {
        setIsEditModalOpen(true);
    };

    const closeEditModal = (updatedData) => {

        if(updatedData) {
            const mergedData = { ...userData, ...updatedData };
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
                ...userData,
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
                ...userData,
                deleted_at: null
            };

            data_mutate(updatedData , false)
        }
        setIsActivateModalOpen(false);
    };
    const data = [
        { key: "First Name", value: userData.first_name },
        { key: "Last Name", value: userData.last_name },
        { key: "Phone", value: userData.phone },
        { key: "Second Phone", value: userData.second_phone },
        { key: "Id Number", value: userData.id_no },
        { key: "Email", value: userData.email },
        { key: "Staff Number", value: userData.staff_no },
        { key: "Location", value: userData.phy_address },
       
        { key: "Description", value: userData.description },
    ];

    var login_status = 'Active';
    if(userData.deleted_at){
        const deleted_at = dayjs(userData.deleted_at);
        login_status = 'In Active'
        data.push({ key: "Deactivated At", value: deleted_at.format('DD/MM/YYYY') });
    }
    data.push({ key: "Login Status", value: login_status });

    return <div>


           <div className="basis-full w-full lg:basis-3/4 flex justify-center items-center relative">

                <div className="w-full sm:w-3/4 shadow-md">

                    {!isModal && (
                        <Header
                            title={`${
                                userData.deleted_at ? "Deleted Profile" : "User Profile"
                            } - ${userData.first_name} ${userData.last_name}`}
                        />
                    )}


                <div className="overflow-x-auto">
                    { isEditModalOpen && (<Edit
                        user_id={user_id}
                        onClose={(updatedData) => closeEditModal(updatedData)}
                    />) }

   { isEditAddUserOrganizationBranchModalOpen && (<EditAddUserOrganizationBranch
                        user_id={user_id}
                        onClose={() => closeEditAddUserOrganizationBranchModal()}
                    />) }

                    { isDeleteModalOpen && (<Destroy user={{
                        id: userData.id,
                        name: userData.first_name + `  ` + userData.last_name
                    }} onClose={closeDeleteModal} />) }

                    { isActivateModalOpen && (<Restore  user={{
                        id: userData.id,
                        name: userData.first_name + `  ` + userData.last_name
                    }}  onClose={closeActivateModal} />) }

                    <ViewPageTable data={data} />

                   
                </div>

                {!isModal && (
                    <div className="flex items-center justify-evenly my-2">
                        <Button
                            className="w-auto bg-primaryBlue"
                            type="button"
                            onClick={() => openEditModal(userData.id)}
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
