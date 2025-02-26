import Form_body from '@/app/(app)/users/user-organization-branches/form_body'
import Modal from '@/components/Modal'
import React, { useRef , useEffect, useState } from 'react'
import { showUser, destroyUser ,  restoreUser } from '@/hooks/users'
import ViewBody from '@/app/(app)/users/user-organization-branches/[user_id]/view_body'
import LoadingModal from '@/components/LoadingModal'
import ValidateUser from '@/app/(app)/validate_user'
import Button from '@/components/Button'




export const Preview = ({user, onClose, openEditAddModal  }) =>{

    return (
        <Modal
            isOpen={ true }
            onClose={ onClose }
            modalHeader={`Preview Branches for - ${user.name} ` }
            modalBody={<ViewBody isModal={true} user_id={user.id}/>}
            modalButtons={
                <>
                    <Button

                        onClick={() => {
                            onClose()
                            openEditAddModal(user.id)

                        }}

                    >
                        Edit / Add
                    </Button>

                </>
            }
        />
    );
}


const EditAdd = ({ user_id, onClose }) => {
    const { user , loading}=  showUser(user_id);
    const childRef = useRef(null);

    const handleSave = async () => {
        if (childRef.current) {
            await childRef.current.submitForm('createModal', true);
        }
    };

    if (loading) {
        return (
                <LoadingModal
                    onClose={() => onClose(null)}
                    closeModal = { onClose }
                />
        );
    }

   return (
        <Modal
            isOpen={true}
            onClose={() => onClose(null)} // Handle case if modal is closed without saving
            modalHeader={`Edit Role- ${user.first_name} ${user.last_name}`}
            modalBody={<Form_body triggered_action={`createModal`} passed_user_id ={ user_id } closeModal = { onClose } ref={childRef} />}
            modalButtons={
                <button
                    onClick={handleSave}
                    className="py-2 px-4 bg-primaryBlue text-white rounded"
                >
                    Save Update
                </button>
            }
        />
    );
};
export default EditAdd;


