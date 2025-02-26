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
import { useOrganizations } from '@/hooks/organiztions/organizations'
import Swal from 'sweetalert2'
import ValidateUser from '@/app/(app)/validate_user'
const schema = z.object({
   code: z.string({ message: "set string" }).min(3, "Atleast 3 characters").regex(/^[a-zA-Z0-9-_]+$/, { message: "Code can only contain letters, numbers, and dashes" }),
   name: z.string().min(3, { message: "Enter a valid Name" }),

    phone: z.string({ message: "set string" }).min(7, "Atleast 7 characters").max(15, 'Maximum of 15 characters') .regex(/^[0-9+\-() ]+$/, { message: "Invalid phone number format" }),
    phone_2: z.string()
        .trim() // Removes unnecessary spaces
        .optional() // Allows undefined but not an empty string
        .refine((val) => !val || /^[0-9+\-() ]+$/.test(val), {
            message: "Invalid phone number format",
        })
        .refine((val) => !val || (val.length >= 5 && val.length <= 15), {
            message: "Phone number must be between 5 and 15 characters",
        }),

    kra_pin: z.string()
        .trim()
        .optional()
        .refine((val) => !val || /^[A-Z]\d{9}[A-Z]$/.test(val), {
            message: "Invalid KRA PIN format. Format should be A123456789B",
        })
        .transform((val) => val?.toUpperCase()),

    email: z.string().email().optional().or(z.literal('')),
    location: z.string().optional(),
    description: z.string({ message: "set string" }).optional(),
});

//const User_form_body = ({ is_edit, user_id}) =>
const Form_body = forwardRef(({ is_edit, organization, closeModal }, ref) =>

{
    const { createOrganization } = useOrganizations();
    const [org_id, setOrgId] = useState(null);
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
    const [isSubmitting, setIsSubmitting] = useState(false);



  let page_title = is_edit ? 'Edit Organization' : 'Create Organization';
    document.title = page_title;

useEffect(() => {

            try {

                if (is_edit) {
                    setOrgId(organization.id || '');
                    setCode(organization.code || '');
                    setName(organization.name || '');
                    setPhone(organization.phone || '');
                    setPhone2(organization.phone_2 || '');
                    setEmail(organization.email || '');
                    setLocation(organization.location || '');
                    setKraPin(organization.kra_pin || '' );
                    setDescription(organization.description || '');
                    //page_title = organization.name;
                    setUrl('/api/users/update/'+organization?.id);

                }
         } catch (error) {
                console.error("Error fetching organization data:", error);
            }

    }, [is_edit, organization]);


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
                code,
                name,
                kra_pin,
                phone,
                phone_2,
                email,
                description,
                location,
            });

            //const validateUserPassword = (action) => {
                if (validateUserPasswordRef.current) {
                    validateUserPasswordRef.current.triggerPasswordValidation(action);
                }
           // };
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
            if(is_edit){
                closeModal({
                    org_id,
                    code,
                    name,
                    kra_pin,
                    location,
                    phone,
                    phone_2,
                    email,
                    description,
                });
            }
            setOrgId('');
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
        createOrganization({
            org_id,
            code,
            name,
            kra_pin,
            phone,
            phone_2,
            email,
            description,
            setErrors,
            setStatus,
            location,
            setSuccessMessage,
            url,
            action,

        })
    }
    useImperativeHandle(ref, () => ({
        submitForm: async () => {
            await validateAndSubmit('edit')

        },
    }));
        return <div>
            <>
            {!is_edit && ( <Header title={page_title} />)}
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
                               // is_required={`true`}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    handleFormInputChange(e, setErrors)
                                }}
                            />

                            <Floating_Form_input
                                id="location"
                                input_label="Location"
                                error={errors.location}
                                value={location}
                               // is_required={`true`}
                                onChange={(e) => {
                                    setLocation(e.target.value)
                                    handleFormInputChange(e, setErrors )
                                }}
                            />
                            <Floating_Form_input
                                id="kra_pin"
                                input_label="KRA PIN"
                                error={errors.kra_pin}
                                value={kra_pin}
                               // is_required={`true`}
                                onChange={(e) => {
                                    setKraPin(e.target.value)
                                    handleFormInputChange(e, setErrors )
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


                        {!is_edit && (
                            <div className="flex items-center justify-evenly mt-4">
                                <Button
                                    className="w-auto bg-primaryBlue"
                                    type="button"
                                    onClick={() => {
                                        validateAndSubmit('view')
                                    }}
                                  /*  onClick={() => {
                                        validateUserPassword('view')
                                    }}*/
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
                                       /* onClick={() => {
                                            validateUserPassword('add')
                                        }}*/
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
