
import Modal from '@/components/Modal'
import React, { useRef, useEffect, useState, forwardRef } from 'react'
import ViewBody from '@/app/(app)/settings/(admin)/devices/[id]/view_body'
import LoadingModal from '@/components/LoadingModal'
import { useDevices } from '@/hooks/devices'
import Devices_form_body from '@/app/(app)/settings/(admin)/devices/devices_form_body'
import ValidateUser from '@/app/(app)/validate_user'




export const Preview = ({device, onClose, openEditModal, openActivateModal, openDeleteModal  }) =>{
    return (
        <Modal
            isOpen={ true }
            onClose={ onClose }
            modalHeader={`Preview Device - ${device.device_name} ` }
            modalBody={<ViewBody isModal={true} device_id={device.id} />}
            modalButtons={
                <>
                    <button

                        onClick={() => {
                            onClose()
                            openEditModal(device)

                        }}
                        className="py-2 px-4 bg-blue-500 text-white rounded"
                    >
                        Edit
                    </button>


                    {device.deleted_at  ?
                        ( <button
                        onClick={() => {
                            onClose()
                            openActivateModal(device)
                        }}
                        className="py-2 px-4 bg-red-500 text-white rounded ml-2"
                    >
                        Activate
                    </button> )  :
                        (  <button
                                onClick={() => {
                                    onClose()
                                    openDeleteModal(device)

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
export const Destroy = ({device, onClose}) =>{
    const { destroyDevice } = useDevices();
    const validateUserPasswordRef = useRef(null);
   // destroyDevice(device.id);

    const [response_status, setStatus] = useState(false);
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
    const deleteDevice = () => {
         destroyDevice(device.id, setStatus);
    }

    return (<>
        <Modal
            isOpen={true}
            onClose={onClose}
            modalHeader={`Delete ${device.device_name }`}
            modalBody={<p> Are you sure you want to Delete {device.device_name}</p>}
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
                      onSuccess={() => deleteDevice()}
        />
    </>);
}

export const Restore = ({device, onClose}) =>{
    const [response_status, setStatus] = useState(false);
    const validateUserPasswordRef = useRef(null);
    const  validateUser = () => {
        if (validateUserPasswordRef.current) {
            validateUserPasswordRef.current.triggerPasswordValidation();
        }
    }
    const { restoreDevice } = useDevices();
    useEffect(() => {
        if(response_status == 'success'){
            onClose('success');
        }else if(response_status == 'error'){
            onClose('error');
        }
    }, [response_status]);
    const activateDevice = () => {
        restoreDevice(device.id, setStatus);
    }

    return (<>
        <Modal
            isOpen={true}
            onClose={onClose}
            modalHeader={`Activate ${device.device_name }`}
            modalBody={<p> Are you sure you want to Activate {device.device_name}</p>}
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
                  onSuccess={() => activateDevice()}
    />
    </>
    );
}

const Edit = ({ device_id, onClose }) => {
 const { showDevice } = useDevices();

 const { device  , data_mutate , loading } = showDevice(device_id);
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
            onClose={() => onClose(null)}
            modalHeader={`Edit - ${device.device_name}`}
            modalBody={<Devices_form_body is_edit={true} device ={device } closeModal = { onClose } ref={childRef} />}
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


