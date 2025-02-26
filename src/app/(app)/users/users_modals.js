import User_form_body from '@/app/(app)/users/user_form_body'
import Modal from '@/components/Modal'
import React, { useRef , useEffect, useState } from 'react'
import { showUser, destroyUser ,  restoreUser } from '@/hooks/users'
import ViewBody from '@/app/(app)/users/[id]/user_view_body'
import LoadingModal from '@/components/LoadingModal'
import ValidateUser from '@/app/(app)/validate_user'




export const Preview = ({user, onClose, openEditModal, openActivateModal, openDeleteModal  }) =>{

    return (
        <Modal
            isOpen={ true }
            onClose={ onClose }
            modalHeader={`Preview User - ${user.name} ` }
            modalBody={<ViewBody isModal={true} user_id={user.id} id= {user.id} />}
            modalButtons={
                <>
                    <button

                        onClick={() => {
                            onClose()
                            openEditModal(user.id)

                        }}
                        className="py-2 px-4 bg-blue-500 text-white rounded"
                    >
                        Edit
                    </button>


                    {user.deleted_at  ?
                        ( <button
                        onClick={() => {
                            onClose()
                            openActivateModal(user)
                        }}
                        className="py-2 px-4 bg-red-500 text-white rounded ml-2"
                    >
                        Activate
                    </button> )  :
                        (  <button
                                onClick={() => {
                                    onClose()
                                    openDeleteModal(user)

                                }}
                                className="py-2 px-4 bg-red-500 text-white rounded ml-2"
                            >
                                Delete
                            </button> )

                    }
                </>
            }
        />
    );
}
export const Destroy = ({user, onClose}) =>{
    const [response_status, setStatus] = useState(false);
    const validateUserPasswordRef = useRef(null);
    useEffect(() => {
        if(response_status == 'success'){
            onClose('success');
        }else if(response_status == 'error') {
            onClose('error');
        }
    }, [response_status]);

    const  validateUser = () => {
        if (validateUserPasswordRef.current) {
            validateUserPasswordRef.current.triggerPasswordValidation()
        }
    }
    const deleteUser = () => {
         destroyUser(user.id, setStatus);
    }

    return (<>
            <Modal
                isOpen={true}
                onClose={onClose}
                modalHeader={`Delete ${user.name }`}
                modalBody={<p> Are you sure you want to Delete {user.name}</p>}
                modalButtons={
                    <button
                        onClick={() => {
                            validateUser();
                        }}
                        className="py-2 px-4 bg-primaryRed text-white rounded"
                    >
                        Delete
                    </button>
                }
            />
        <ValidateUser ref={validateUserPasswordRef}
                      onSuccess={() => deleteUser()}
        />
    </>

    );
}

export const Restore = ({user, onClose}) =>{
    const [response_status, setStatus] = useState(false);
    const validateUserPasswordRef = useRef(null);

    const  validateUser = () => {
        if (validateUserPasswordRef.current) {
            validateUserPasswordRef.current.triggerPasswordValidation()
        }
    }
    useEffect(() => {
        if(response_status == 'success'){
            onClose('success');
        }else if(response_status == 'error'){
            onClose('error');
        }
    }, [response_status]);
    const activateUser = () => {
        restoreUser(user.id, setStatus);
    }
//console.log('destroy user_id :' + { user_id }+'destroy user :' + user[1] )
    return (<>
        <Modal
            isOpen={true}
            onClose={onClose}
            modalHeader={`Activate ${user.name }`}
            modalBody={<p> Are you sure you want to Activate {user.name}</p>}
            modalButtons={
                <button
                    onClick={() => {
                        validateUser ();
                    }}
                    className="py-2 px-4 bg-primaryBlue text-white rounded"
                >
                    Activate
                </button>
            }
        />
        <ValidateUser ref={validateUserPasswordRef}
                      onSuccess={() => activateUser()}/>
    </>

    );
}

const Edit = ({ user_id, onClose }) => {
    const { user , loading}=  showUser(user_id);
    const childRef = useRef(null);

    const handleSave = async () => {
        if (childRef.current) {
            await childRef.current.submitForm();
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
            modalHeader={`Edit - ${user.first_name} ${user.last_name}`}
            modalBody={<User_form_body is_edit={true} user ={ user } closeModal = { onClose } ref={childRef} />}
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
export default Edit;


