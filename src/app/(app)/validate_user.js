import React, { useRef, useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import { useValidateUser } from '@/hooks/validateUser';
import ErrorList from '@/components/ErrorList';
import { Floating_password, handleFormInputChange } from '@/components/Floating_Form_input';
import { z } from 'zod';
import Swal from 'sweetalert2';

const schema = z.object({
    password: z.string().min(3, { message: "Incorrect Password" }),
});

const ValidateUser = forwardRef(({ onSuccess }, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { validateUser } = useValidateUser();
    const [password, setPassword] = useState('');
    const [responseAction, setResponseAction] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [responseStatus, setResponseStatus] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const openModal = () => {
        setErrors({});
        setResponseStatus('');
        setIsSubmitting(false);
        setPassword('');
        setSuccessMessage('');
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {

        if(responseStatus == 'success'){
            closeModal();
            onSuccess(responseAction)

        }
    }, [responseStatus]);
    const validatePasswordAndSubmit = async () => {
        setIsSubmitting(true);
        setErrors({});
        setResponseStatus('');
        try {
            // Validate using Zod schema
            schema.parse({ password });

            // Call the validateUser function
         await validateUser({
                password,
                setErrors,
                setResponseStatus,
                setSuccessMessage,
            });


        } catch (validationError) {
            const validationErrors = {};
            if (validationError.errors) {
                validationError.errors.forEach((error) => {
                    validationErrors[error.path[0]] = error.message;
                });
            }
            setErrors(validationErrors);

            Swal.fire({
                toast: true,
                icon: 'error',
                title: 'Validation failed. Please review the form.',
                position: 'top',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    useImperativeHandle(ref, () => ({
        triggerPasswordValidation: (action) => {
            setResponseAction(action);
            openModal();
        },
    }));

    return (
     <div>
         <Modal
             isOpen={isModalOpen}
             onClose={closeModal}
             modalHeader={`Authorize This With Your Password`}
             modalBody={<div className="mt-4 rounded">
                 <form>
                     {Object.keys(errors).length > 0 && (
                         <div className="flex w-fit mx-auto">
                             <ErrorList errors={Object.entries(errors)} />
                         </div>
                     )}
                     {successMessage && (
                         <div className="flex w-fit mx-auto bg-primaryGreen">
                             <p>{successMessage}</p>
                         </div>
                     )}
                     <div className="grid sm:grid-cols-2 gap-4 mx-4">
                         <Floating_password
                             id="password"
                             input_label="Password"
                             is_required="true"
                             value={password}
                             error={errors.password}
                             onChange={(e) => {
                                 setPassword(e.target.value);
                                 handleFormInputChange(e, setErrors, ["password"]);
                             }}
                         />
                     </div>

                 </form>
             </div>}
             modalButtons={
                 <Button
                     className="w-auto"
                     type="button"
                     disabled={isSubmitting}
                     onClick={validatePasswordAndSubmit}
                 >
                     Save
                 </Button>
             }
         />
     </div>
    );
});

export default ValidateUser

