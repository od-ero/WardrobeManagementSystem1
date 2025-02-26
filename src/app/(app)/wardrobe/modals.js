import ViewBody from '@/app/(app)/wardrobe/[id]/view_body'
import Form_body from '@/app/(app)/wardrobe/form_body'
import LoadingModal from '@/components/LoadingModal'
import Modal from '@/components/Modal'
import { useHook } from '@/hooks/wardrobe'
import { useEffect, useRef, useState } from 'react'




export const Preview = ({wardrobe, onClose, openEditModal, openActivateModal, openDeleteModal  }) =>{

    return (
        <Modal
            isOpen={ true }
            onClose={ onClose }
            modalHeader={`Preview Item - ${wardrobe.name} ` }
            modalBody={<ViewBody isModal={true} wardrobe_id={wardrobe.id}/>}
            modalButtons={
                <>
                    <button

                        onClick={() => {
                            onClose()
                            openEditModal(wardrobe)

                        }}
                        className="py-2 px-4 bg-blue-500 text-white rounded"
                    >
                        Edit
                    </button>


                    {wardrobe.deleted_at  ?
                        ( <button
                        onClick={() => {
                            onClose()
                            openActivateModal(wardrobe)
                        }}
                        className="py-2 px-4 bg-red-500 text-white rounded ml-2"
                    >
                        Activate
                    </button> )  :
                        (  <button
                                onClick={() => {
                                    onClose()
                                    openDeleteModal(wardrobe)

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
export const Destroy = ({wardrobe, onClose}) =>{
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
         destroy(wardrobe.id, setStatus);
    }

    return (
        <Modal
            isOpen={true}
            onClose={onClose}
            modalHeader={`Delete ${wardrobe.name }`}
            modalBody={<p> Are you sure you want to Delete {wardrobe.name}</p>}
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

export const Restore = ({wardrobe, onClose}) =>{
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

        restore(wardrobe.id, setStatus);
    }
    return (
        <Modal
            isOpen={true}
            onClose={onClose}
            modalHeader={`Activate ${wardrobe.name }`}
            modalBody={<p> Are you sure you want to Activate {wardrobe.name}</p>}
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


export const Create = ({ wardrobe, onClose }) => {

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
            modalHeader={`Create An Item`}
            modalBody={<Form_body triggered_action={`createModal`}  module_data ={ wardrobe } closeModal = { onClose } ref={childRef} />}
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
export const Edit = ({ wardrobe_id, onClose }) => {
    const { show } = useHook()
    const { data: wardrobe, loading } = show(wardrobe_id)
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
            modalHeader={`Edit Item - ${wardrobe.name}`}
            modalBody={<Form_body triggered_action={`edit`}  module_data ={ wardrobe } closeModal = { onClose } ref={childRef} />}
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


