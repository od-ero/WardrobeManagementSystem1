'use client'

import React, { useEffect, useState, forwardRef, useImperativeHandle , useRef } from 'react';
import { Header } from '@/app/commonVariable'
import ErrorList from '@/components/ErrorList'
import {
    Floating_Form_input,
    Floating_select, Floating_textarea,
    handleFormInputChange,
} from '@/components/Floating_Form_input'
import DisplayErrors from '@/components/DisplayErrors'
import Button from '@/components/Button'
import { z } from 'zod'
import { useHook } from '@/hooks/organiztions/organization_branches'
import {  useOrganizations } from '@/hooks/organiztions/organizations'
import Swal from 'sweetalert2'
import ValidateUser from '@/app/(app)/validate_user'
import LoadingModal from '@/components/LoadingModal'
import {useAuth} from '@/hooks/auth'

const schema = z.object({
   code: z.string({ message: "set string" }).min(3, "Enter a valid code"),
     name: z.string().min(3, { message: "Enter a valid Name" }),
    phone: z.string({ message: "set string" }).min(5, "Please enter a valid phone number").max(15, 'Please enter a valid phone number'),
    phone_2: z
        .string()
        .optional()
        .refine((val) => !val || val.length >= 5, {
            message: "Please enter a valid phone number",
        }),
    email: z.string().email().optional().or(z.literal('')),
    location: z.string().optional(),
    description: z.string({ message: "set string" }).optional(),
    organization_id: z.union([
        z.string().nonempty({ message: "Select Organization" }),
        z.number().min(1, { message: "Select Organization" }),
    ]),
});



const Form_body = forwardRef(({ triggered_action, module_data, closeModal }, ref) =>

{
    const { create } = useHook();
    const { user } =useAuth();
    const { listOrganizationNames } = useOrganizations();
    const{data : organizationNames, loading} =  listOrganizationNames();
    const [organization_id, setOrganizationId] = useState(user?.login_info?.organization_id);
    const [organization_branch_id, setOrganizationBranchId] = useState(null);
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [phone_2, setPhone2] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [kra_pin, setKraPin] = useState("");
    const [description, setDescription] = useState("");
    const [success_message, setSuccessMessage] = useState("");
    const [url, setUrl] = useState('/api/register');
    const [closeModalAfterSubmit, setCloseModalAfterSubmit] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [change_organization_id, setChangeOrganizationId] = useState(false);


    let page_title = triggered_action=='create' && ( 'Create Organization Branch');
    useEffect(() => {

            try {
                if(triggered_action == 'createModal'){
                    setOrganizationId(module_data.id || '')
                    setChangeOrganizationId(true);
                }else if (triggered_action == 'edit') {
                    setOrganizationBranchId( module_data.id || '');
                    setOrganizationId(module_data.organization_id || '');
                    setCode( module_data.code || '');
                    setName( module_data.name || '');
                    setPhone( module_data.phone || '');
                    setPhone2( module_data.phone_2 || '');
                    setEmail( module_data.email || '');
                    setLocation( module_data.location || '');
                    setKraPin( module_data.kra_pin || '' );
                    setDescription( module_data.description || '');
                    setUrl('/api/users/update/'+ module_data?.id);
                }

         } catch (error) {
                console.error("Error fetching data:", error);
            }

    }, [triggered_action,  module_data]);


    const [response_status, setStatus ] = useState('');
    const [errors, setErrors] = useState({});
    const validateUserPasswordRef = useRef(null);


    const validateAndSubmit = async (action) => {
        //  e.preventDefault();
          setIsSubmitting(true);
        setErrors({});
        setStatus('');
        setSuccessMessage('');
        try {

            schema.parse({
                organization_id,
                code,
                name,
                kra_pin,
                location,
                phone,
                phone_2,
                email,
                description,
            });

                if (validateUserPasswordRef.current) {
                    validateUserPasswordRef.current.triggerPasswordValidation(action);
                }

        }

        catch (validationError) {
            const validationErrors = {};
            validationError.errors.forEach((error) => {
                validationErrors[error.path[0]] = error.message;
            });
            setErrors(validationErrors);
            Swal.fire({
                toast: true,
                icon: "error",
                title: "Validation failed. <br>Please review the form.",
                position: "top",
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
            });
        } finally {
            setIsSubmitting(false);

        }
    };

    useEffect(() => {

        if(response_status == 'success'){
            if(triggered_action != 'create'){
               if (closeModalAfterSubmit) {
                   closeModal({
                       organization_branch_id,
                       organization_id,
                       code,
                       name,
                       kra_pin,
                       location,
                       phone,
                       phone_2,
                       email,
                       description,
                   })
               }
            }
           // setOrganizationId(null);
            setOrganizationBranchId(null);
            setCode('');
            setName('');
            setPhone( '');
            setPhone2( '');
            setEmail( '');
            setLocation('');
            setKraPin('' );
            setDescription( '');
            setStatus('');
            setErrors('');

        }
    }, [response_status]);

    const submit = async (action) => {
        create({
            organization_id,
           organization_branch_id,
            code,
            name,
            kra_pin,
            location,
            phone,
            phone_2,
            email,
            description,
            setErrors,
            setStatus,
            setSuccessMessage,
            url,
            action,

        })
    }
    useImperativeHandle(ref, () => ({
        submitForm: async (triggered_action,close) => {
            setCloseModalAfterSubmit(close);
            await validateAndSubmit(triggered_action)

        },
    }));
     if (loading) {
        return (
            <LoadingModal
              /*  onClose={() => onClose(null)}
                closeModal = { onClose }*/
            />
        );
    }
        return <div>
            <>
            {triggered_action=='create' && ( <Header title={page_title} />)}
                <div className="mt-4 rounded">
                    <form >


                        {Object.keys(errors).length > 0 && (
                            <div className="flex w-fit mx-auto ">
                                <ErrorList errors={Object.entries(errors)} />
                            </div>
                        )}
                     {success_message && (
                            <div className="flex w-fit mx-auto bg-primaryGreen">
                                <p> {success_message} </p>
                            </div>
                        )}
                        <div className="grid sm:grid-cols-2 gap-4 mx-4">

                            <Floating_Form_input
                                id="name"
                                input_label="Name"
                                is_required="true"
                                value={name}
                                error={errors.name}
                                onChange={(e) => {
                                    setName(e.target.value)
                                    handleFormInputChange(e, setErrors)
                                }}
                            />

                            <Floating_Form_input
                                id="code"
                                input_label="Code"
                                is_required="true"
                                value={code}
                                error={errors.code}
                                onChange={(e) => {
                                    setCode(e.target.value)
                                    handleFormInputChange(e, setErrors)
                                }}
                            />


                            <Floating_Form_input
                                id="phone"
                                input_label="Phone"
                                is_required="true"
                                value={phone}
                                error={errors.phone}
                                onChange={(e) => {
                                    setPhone(e.target.value)
                                    handleFormInputChange(e, setErrors, ['phone'])
                                }}
                            />

                            <Floating_Form_input
                                id="phone2"
                                input_label="Second Phone"
                                error={errors.phone_2}
                                value={phone_2}
                                onChange={(e) => {
                                    setPhone2(e.target.value)
                                    handleFormInputChange(e, setErrors)
                                }}
                            />

                            <Floating_Form_input
                                id="email"
                                input_label="Email"
                                error={errors.email}

                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    handleFormInputChange(e, setErrors)
                                }}
                            />
                            <div className="relative">

                                <Floating_select
                                    id="organization_id"
                                    input_label="Organization"
                                    placeholder="Select Organization"
                                    is_required="true"
                                    isDisabled= { change_organization_id }
                                    options={ organizationNames}
                                    value={organization_id ? organizationNames.find((organizationName) => organizationName.value === organization_id) : null}
                                    onChange={(selectedOption) => {
                                        setOrganizationId(selectedOption?.value);
                                        setErrors((prevErrors) => {
                                            const newErrors = { ...prevErrors };
                                            delete newErrors.organization_id;
                                            return newErrors;
                                        });
                                    }}
                                            instanceId="permissionlevel-select-instance"
                                />
                                <DisplayErrors error={errors.organization_id} />
                            </div>

                            <Floating_Form_input
                                id="location"
                                input_label="Location"
                                error={errors.location}
                                value={location}

                                onChange={(e) => {
                                    setLocation(e.target.value)
                                    handleFormInputChange(e, setErrors)
                                }}
                            />
                            <Floating_Form_input
                                id="kra_pin"
                                input_label="KRA PIN"
                                error={errors.kra_pin}
                                value={kra_pin}

                                onChange={(e) => {
                                    setKraPin(e.target.value)
                                    handleFormInputChange(e, setErrors)
                                }}
                            />

                        </div>

                        <div className="mx-4">
                            <Floating_textarea
                                id="description"
                                error={errors.description}
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                    handleFormInputChange(e, setErrors)
                                }}
                            />
                        </div>


                        {triggered_action == 'create' && (
                            <div className="flex items-center justify-evenly mt-4">
                                <Button
                                    className="w-auto bg-primaryBlue"
                                    type="button"
                                    onClick={() => {
                                        validateAndSubmit('view')
                                    }}

                                    disabled={isSubmitting}
                                >
                                    Save and View
                                </Button>

                                <Button className="w-auto bg-primaryGreen hover:bg-primaryGreen"
                                        type="button"
                                        disabled={isSubmitting}
                                        onClick={() => {
                                            validateAndSubmit('add')
                                        }}

                                >Save and Add New</Button>

                            </div>

                        )}


                    </form>
                </div>
            </>
            <ValidateUser ref={validateUserPasswordRef}
                          onSuccess={(action) => submit(action)}
            />
        </div>



})
export default Form_body
