import Form_body from '@/app/(app)/settings/(admin)/organizations/form_body'
import Modal from '@/components/Modal'
import React, { useRef , useEffect, useState } from 'react'
import { useOrganizations } from '@/hooks/organiztions/organizations'
import ViewBody from '@/app/(app)/settings/(admin)/organizations/[id]/view_body'
import LoadingModal from '@/components/LoadingModal'
import { useHook } from '@/hooks/organiztions/organization_branches'
import ValidateUser from '@/app/(app)/validate_user'




export const Preview = ({organization, onClose, openEditModal, openActivateModal, openDeleteModal  }) =>{

    return (
        <Modal
            isOpen={ true }
            onClose={ onClose }
            modalHeader={`Preview Organization - ${organization.name} ` }
            modalBody={<ViewBody isModal={true} organization_id={organization.id} id= {organization.id} />}
            modalButtons={
                <>
                    <button

                        onClick={() => {
                            onClose()
                            openEditModal(organization)

                        }}
                        className="py-2 px-4 bg-blue-500 text-white rounded"
                    >
                        Edit
                    </button>


                    {organization.deleted_at  ?
                        ( <button
                        onClick={() => {
                            onClose()
                            openActivateModal(organization)
                        }}
                        className="py-2 px-4 bg-red-500 text-white rounded ml-2"
                    >
                        Activate
                    </button> )  :
                        (  <button
                                onClick={() => {
                                    onClose()
                                    openDeleteModal(organization)

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
export const Destroy = ({organization, onClose}) =>{
    const { destroyOrganization } = useOrganizations();
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
    const deleteOrganization = () => {

         destroyOrganization(organization.id, setStatus);
    }

    return (<>
        <Modal
            isOpen={true}
            onClose={onClose}
            modalHeader={`Delete ${organization.name }`}
            modalBody={<p> Are you sure you want to Delete {organization.name}</p>}
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
                      onSuccess={() => deleteOrganization()}/>
   </> );
}

export const Restore = ({organization, onClose}) =>{
    const { restoreOrganization } = useOrganizations();
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
    const activateOrganization = () => {

        restoreOrganization(organization.id, setStatus);
    }
    return (<>
        <Modal
            isOpen={true}
            onClose={onClose}
            modalHeader={`Activate ${organization.name }`}
            modalBody={<p> Are you sure you want to Activate {organization.name}</p>}
            modalButtons={
                <button
                    onClick={() => {
                        validateUser();

                    }}
                    className="py-2 px-4 bg-primaryBlue text-white rounded"
                >
                            Activate
                </button>
            }
        />
    <ValidateUser ref={validateUserPasswordRef}
                  onSuccess={() => activateOrganization()}/>
        </>
    );
}
const Edit = ({ organization_id, onClose }) => {
   const { showOrganization,} = useOrganizations();
    const { data:organization , loading}=  showOrganization(organization_id);
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
            modalHeader={`Edit - ${organization.name} `}
            modalBody={<Form_body is_edit={true} organization ={ organization } closeModal = { onClose } ref={childRef} />}
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


