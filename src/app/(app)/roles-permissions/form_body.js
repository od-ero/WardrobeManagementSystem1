'use client'

import React, { useEffect, useState, forwardRef, useImperativeHandle , useRef } from 'react';
import { Header } from '@/app/commonVariable'
import ErrorList from '@/components/ErrorList'
import {
    Floating_Form_input,
    Floating_select, Floating_textarea,
    handleFormInputChange, SwitchInput,
} from '@/components/Floating_Form_input'
import DisplayErrors from '@/components/DisplayErrors'
import Button from '@/components/Button'
import { z } from 'zod'
import { useHook } from '@/hooks/rolesPermissions'
import Swal from 'sweetalert2'
import ValidateUser from '@/app/(app)/validate_user'
import LoadingModal from '@/components/LoadingModal'
const schema = z.object({

   name: z.string().min(3, { message: "Enter a valid Name" }),
    selectedPermissions_id:z.array(z.string()).min(1, "At least one Permission must be selected"),
    description: z.string({ message: "set string" }).optional(),
});

//const User_form_body = ({ is_edit, user_id}) =>
const Form_body = forwardRef(({ is_edit, organization, closeModal }, ref) =>

{
    const { create : createRole, listAllPermissionNames, storePermissions } = useHook();
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [description, setDescription] = useState("");
    const [success_message, setSuccessMessage] = useState("");
    const [url, setUrl] = useState('/api/register');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedPermissions_id,setSelectedPermissionsId ] = useState([]);
  const {data : permission_names, loading} = listAllPermissionNames();


  let page_title = is_edit ? 'Edit Role' : 'Create Role';
  if(is_edit) {
      document.title = page_title
  }

    const togglePermission = (value) => {

        setSelectedPermissionsId((prevSelected) =>
            prevSelected.includes(value)
                ? prevSelected.filter((item) => item !== value)
                : [...prevSelected, value]
        );
    };
  const RunPermissionsSeeder = () => {

      storePermissions({
          is_edit
      })
    };

useEffect(() => {

            try {

                if (is_edit) {
                    setName(organization.name || '');
                    setDescription(organization.description || '');
setId(organization.id || '')
                    setUrl('/api/users/update/'+organization?.id);
                    /*const branchIds = user?.branches ? Object.values(user.branches).map(branch => branch.id) : [];
                    setSelectedPermissionsId(branchIds);*/

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
                name,
                description,
                selectedPermissions_id
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

                    name,
                    description,
                    selectedPermissions_id,
                });
            }
            setName('');
            setDescription( '');
            setStatus('');
            setErrors('');
            setId('');
            setSelectedPermissionsId([]);
        }
    }, [response_status]);

    const submit = async (action) => {
        createRole({

            name,
            id,
            description,
            setErrors,
            setStatus,
            selectedPermissions_id,
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

    /*const Permission_div = () =>(


    <div className={`flex flex-col m-4`}>

            <h6 className={`text-center m-4`}> Permissions </h6>

            <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-4">

                {permission_names?.map((item) => (
                        <SwitchInput
                            key={item.value}
                            name={`selectedPermissions_id`}
                            input_label={item.label}
                            checked={selectedPermissions_id.includes(item.value)}
                            onChange={(e) => {
                                togglePermission(item.value)
                                handleFormInputChange(e, setErrors)
                            }}
                        />
                    )
                )
                }

            </div>

            <DisplayErrors error={errors.selectedPermissions_id} />
        </div>
    )*/

    const Permission_div = () => {
        return (
            <div className="flex flex-col">
                <h6 className="text-center my-4 font-bold  text-lg">Permissions</h6>
                <div className={`px-4`}>
                    <DisplayErrors error={errors.selectedPermissions_id} />
                </div>

                <div >

                    {Object.entries(permission_names).map(([module, permissions]) => (
                        <div key={module} className="border p-4 rounded-lg  mb-4">
                            <h3 className="text-md font-semibold mb-2 text-center">{module}</h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {permissions.map((item) => (
                                <SwitchInput
                                    key={item.value}
                                    name="selectedPermissions_id"
                                    input_label={item.label}
                                    checked={selectedPermissions_id.includes(item.value)}
                                    onChange={(e) => {
                                        togglePermission(item.value)
                                        handleFormInputChange(e, setErrors)
                                    }}
                                />
                            ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className={`px-4`}>
                  <DisplayErrors error={errors.selectedPermissions_id} />
                </div>
            </div>
        );
    };

    if (loading) {
        return <LoadingModal/>
    }

    return <div>
            <>
            {!is_edit && ( <Header title={page_title} />)}
                <div className="mt-4  mx-4 rounded">
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



                        <Permission_div/>

                            <Floating_textarea
                                id="description"
                                error={errors.description}
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                    handleFormInputChange(e, setErrors)
                                }}
                            />



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

 <Button className="w-auto bg-primaryGreen hover:bg-primaryGreen"
                                        type="button"
                                        disabled={isSubmitting}
                                        onClick={() => {
                                            RunPermissionsSeeder()
                                        }}
                                       /* onClick={() => {
                                            validateUserPassword('add')
                                        }}*/
                                >Run Permissions Seeder</Button>

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
