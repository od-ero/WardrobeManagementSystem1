import Form_body from '@/app/(app)/settings/(admin)/organization_branches/form_body'
import Modal from '@/components/Modal'
import React, { useRef , useEffect, useState } from 'react'
import { useHook } from '@/hooks/organiztions/organization_branches'
import ViewBody from '@/app/(app)/settings/(admin)/organization_branches/[id]/view_body'
import LoadingModal from '@/components/LoadingModal'




export const Preview = ({branch, onClose, openEditModal, openActivateModal, openDeleteModal  }) =>{

    return (
        <Modal
            isOpen={ true }
            onClose={ onClose }
            modalHeader={`Preview Branch - ${branch.name} ` }
            modalBody={<ViewBody isModal={true} branch_id={branch.id}/>}
            modalButtons={
                <>
                    <button

                        onClick={() => {
                            onClose()
                            openEditModal(branch)

                        }}
                        className="py-2 px-4 bg-blue-500 text-white rounded"
                    >
                        Edit
                    </button>


                    {branch.deleted_at  ?
                        ( <button
                        onClick={() => {
                            onClose()
                            openActivateModal(branch)
                        }}
                        className="py-2 px-4 bg-red-500 text-white rounded ml-2"
                    >
                        Activate
                    </button> )  :
                        (  <button
                                onClick={() => {
                                    onClose()
                                    openDeleteModal(branch)

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
export const Destroy = ({branch, onClose}) =>{
    const { destroy } = useHook();
    const [response_status, setStatus] = useState(false);
    useEffect(() => {
        if(response_status == 'success'){
            onClose('success');
        }else if(response_status == 'error') {
            onClose('error');
        }
    }, [response_status]);
    const deleteUser = () => {
         destroy(branch.id, setStatus);
    }

    return (
        <Modal
            isOpen={true}
            onClose={onClose}
            modalHeader={`Delete ${branch.name }`}
            modalBody={<p> Are you sure you want to Delete {branch.name}</p>}
            modalButtons={
                <button
                    onClick={() => {
                       deleteUser();
                    }}
                    className="py-2 px-4 bg-primaryRed text-white rounded"
                >
                    Delete
                </button>
            }
        />
    );
}

export const Restore = ({branch, onClose}) =>{
    const { restore } = useHook();
    const [response_status, setStatus] = useState(false);

    useEffect(() => {
        if(response_status == 'success'){
            onClose('success');
        }else if(response_status == 'error'){
            onClose('error');
        }
    }, [response_status]);
    const activateUser = () => {

        restore(branch.id, setStatus);
    }
    return (
        <Modal
            isOpen={true}
            onClose={onClose}
            modalHeader={`Activate ${branch.name }`}
            modalBody={<p> Are you sure you want to Activate {branch.name}</p>}
            modalButtons={
                <button
                    onClick={() => {
                        activateUser ();
                    }}
                    className="py-2 px-4 bg-primaryBlue text-white rounded"
                >
                            Activate
                </button>
            }
        />
    );
}


export const Create = ({ organization, onClose }) => {

    const childRef = useRef(null);
    const handleSave = async (triggeredAction, closeModal) => {
        if (childRef.current) {
            await childRef.current.submitForm(triggeredAction,closeModal);
        }
    };

    /* if (loading) {
         return (
             <LoadingModal
                 onClose={() => onClose(null)}
                 closeModal = { onClose }
             />
         );
     }*/

    return (
        <Modal
            isOpen={true}
            onClose={() => onClose(null)}
            modalHeader={`Create A Branch For - ${organization.name} Organisation`}
            modalBody={<Form_body triggered_action={`createModal`}  module_data ={ organization } closeModal = { onClose } ref={childRef} />}
            modalButtons={<>
                <button
                    //onClick={handleSave('view')}
                    onClick={() => handleSave('view', true)}
                    className="py-2 px-4 bg-primaryBlue text-white rounded"
                >
                    Save And View
                </button>
                <button
                    //onClick={handleSave('view')}
                    onClick={() => handleSave('add', false)}
                    className="py-2 px-4 bg-primaryBlue text-white rounded"
                >
                    Save And Add
                </button>
                <button
                    //onClick={handleSave('view')}
                    onClick={() => handleSave('', true)}
                    className="py-2 px-4 bg-primaryBlue text-white rounded"
                >
                    Save And Close
                </button>

            </>
            }
        />
    );
};
export const Edit = ({ branch_id, onClose }) => {
    const { show } = useHook()
    const { data: branch, loading } = show(branch_id)
    const childRef = useRef(null)

    const handleSave = async () => {
        if (childRef.current) {
            await childRef.current.submitForm('edit',true);
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
            modalHeader={`Edit - ${branch.name} for Organization  ${branch.organization
                .name}`}
            modalBody={<Form_body triggered_action={`edit`}  module_data ={ branch } closeModal = { onClose } ref={childRef} />}
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
export default Create;


