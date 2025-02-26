'use client'

import React, { useEffect, useState, forwardRef, useImperativeHandle , useRef } from 'react';
import { Header } from '@/app/commonVariable'
import ErrorList from '@/components/ErrorList'
import {
    Floating_Form_input,
    Floating_password,
    Floating_select, Floating_textarea,
    handleFormInputChange, SwitchInput,
} from '@/components/Floating_Form_input'
import DisplayErrors from '@/components/DisplayErrors'
import Button from '@/components/Button'
import { z } from 'zod'
import { useAuth } from '@/hooks/auth'
import Swal from 'sweetalert2'
import ValidateUser from '@/app/(app)/validate_user'
import { useHook as useRolesPermissions } from '@/hooks/rolesPermissions'
import { useHook as useOrgBranches } from '@/hooks/organiztions/organization_branches'
import LoadingModal from '@/components/LoadingModal'
const schema = z.object({
   first_name: z.string({ message: "set string" }).min(3, "Enter a valid first name"),
    last_name: z.string().min(3, { message: "Enter a valid Last Name" }),
    id_no: z.string().optional(),
    staff_no: z.string().optional(),
    phone: z.string({ message: "set string" }).min(7, "Atleast 7 characters").max(15, 'Maximum of 15 characters') .regex(/^[0-9+\-() ]+$/, { message: "Invalid phone number format" }),
    second_phone:z.string()
        .trim() // Removes unnecessary spaces
        .optional() // Allows undefined but not an empty string
        .refine((val) => !val || /^[0-9+\-() ]+$/.test(val), {
            message: "Invalid phone number format",
        })
        .refine((val) => !val || (val.length >= 5 && val.length <= 15), {
            message: "Phone number must be between 5 and 15 characters",
        }),
    email: z.string().email().optional().or(z.literal('')),
    phy_address: z.string().optional(),
   /* role_id: z.union([
        z.string().nonempty({ message: "Select Permission Level." }),
        z.number().min(1, { message: "Select Permission Level" }),
    ]),*/

    password: z.string().min(3, { message: "Password must be at least 3 characters." }),
    description: z.string({ message: "set string" }).optional(),
  /*  selectedBranches_id:z.array(z.string()).min(1, "At least one branch must be selected"),*/
});

//const User_form_body = ({ is_edit, user_id}) =>
const User_form_body = forwardRef(({ is_edit,user, closeModal }, ref) =>

{

  //  let { data: organizationNames, loading:loadingOrganizationNames } = listOrganizationNames();
    const { register, user:logged_user } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/home',
    });
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [id_no, setIdNo] = useState("");
    const [staff_no, setStaffNo] = useState("");
    const [phone, setPhone] = useState("");
    const [second_phone, setSecondPhone] = useState("");
    const [email, setEmail] = useState("");
    const [phy_address, setPhyAddress] = useState("");
    /*const [role_id, setRoleId] = useState("");*/
    const [password, setPassword] = useState("");
    const [description, setDescription] = useState("");
    const [success_message, setSuccessMessage] = useState("");
    const [url, setUrl] = useState('/api/register');
    const [isSubmitting, setIsSubmitting] = useState(false);
    //const [ displayBranches,  setDisplayBranches] = useState(false);
  /*  const [selectedBranches_id, setSelectedBranchesId] = useState([logged_user?.login_info?.branch_id]);
*/
   /* const toggleBranch = (value) => {

        setSelectedBranchesId((prevSelected) =>
            prevSelected.includes(value)
                ? prevSelected.filter((item) => item !== value)
                : [...prevSelected, value]
        );
    };*/
    /*const { listNames}  = useOrgBranches();
   const { listAllRolesNames } = useRolesPermissions();

       let { data: branches_names, loading: loading_branches } = listNames();
       let { data:role_names, loading: loading_RolesPermissions } = listAllRolesNames();

    let loading = loading_branches || loading_RolesPermissions

     */
    let page_title = is_edit ? 'Edit User' : 'Create User';
    if(!is_edit) {
        document.title = page_title
    }
useEffect(() => {

            try {

                if (is_edit) {
                    setFirstName(user?.first_name || '');
                    setLastName(user?.last_name || '');
                    setIdNo(user?.id_no || '');
                    setStaffNo(user?.staff_no || '');
                    setPhone(user?.phone || '');
                    setSecondPhone(user?.second_phone || '');
                    setEmail(user?.email || '');
                    setPhyAddress(user?.phy_address || '');
                   /* setRoleId(user?.role_id || '');*/
                    setDescription(user?.description || '');
                    page_title = user?.first_name + ' ' + user?.last_name;
                    setPassword('is_edit');
                    setUrl('/api/users/update/'+user?.id)
                   /* const branchIds = user?.branches ? Object.values(user.branches).map(branch => branch.id) : [];
                    setSelectedBranchesId(branchIds);*/

                }

         } catch (error) {
                console.error("Error fetching user data:", error);
            }

    }, [is_edit, user]);


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
                first_name,
                last_name,
                id_no,
                staff_no,
                phone,
                second_phone,
                email,
                phy_address,
               /* role_id,*/
                password,
                description,

              /*  selectedBranches_id*/
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
                    first_name,
                    last_name,
                    id_no,
                    staff_no,
                    phone,
                    second_phone,
                    email,
                    phy_address,
                   /* role_id,*/
                    password,
                    description,
                  /*  selectedBranches_id,*/
                });
            }
            setFirstName('');
            setLastName('');
            setIdNo('');
            setStaffNo('');
            setPhone('');
            setSecondPhone('');
            setEmail('');
            setPhyAddress('');
           /* setRoleId('');*/
            setPassword('');
            setDescription('');
            setStatus('');
            setErrors({});
          //  setSelectedBranchesId([logged_user?.login_info?.branch_id]);

        }
    }, [response_status]);

    const submit = async (action) => {
        register({
            first_name,
            last_name,
            id_no,
            staff_no,
            phone,
            second_phone,
            email,
            phy_address,
           /* role_id,*/
            password,
            description,
            setErrors,
            setStatus,
          /*  selectedBranches_id,*/
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


/*    useEffect(() => {

        setDisplayBranches(false);
        if (!loading_branches) {
            if (!branches_names || branches_names.length === 0) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    selectedBranches_id: 'Kindly Ensure your Organization has active Branch',
                }));
            } else if (branches_names.length === 1) {
                console.log('The array has one item:', branches_names[0]);
                setSelectedBranchesId([branches_names[0].value]);
            } else {
                setDisplayBranches(true);
            }
        }
    }, [loading_branches, branches_names]);*/
 /*   const Branches_div = () =>(<div className="flex flex-col">
            <span> Assigned Branches<span className="text-red-500">&nbsp;&nbsp; (&#42;)</span> </span>
            <div className="grid sm:grid-cols-2">

            {branches_names?.map((item) => (
                    <SwitchInput
                        key={item.value}
                        name={`selectedBranches_id`}
                        input_label={item.label}
                        checked={selectedBranches_id.includes(item.value)} // Use 'checked' instead of 'value'
                        onChange={(e) => {
                            toggleBranch(item.value)
                            handleFormInputChange(e, setErrors)
                        }}
               />
                    )
            )
            }


            </div>
            <DisplayErrors error={errors.selectedBranches_id} />
        </div>
    )*/


/*    if (loading) {
        return (

            <LoadingModal/>
        )
    }*/
    return <div>
        <>
            {!is_edit && (<Header title={page_title} />)}
            <div className="mt-4 rounded">
            <form>


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
                    <div className="grid sm:grid-cols-2 ">

                        <Floating_Form_input
                            id="first_name"
                            input_label="First Name"
                            is_required="true"
                            value={first_name}
                            error={errors.first_name}
                            onChange={(e) => {
                                setFirstName(e.target.value)
                                handleFormInputChange(e, setErrors, ['full_name'])
                            }}
                        />

                        <Floating_Form_input
                            id="last_name"
                            input_label="Last Name"
                            is_required="true"
                            value={last_name}
                            error={errors.last_name}
                            onChange={(e) => {
                                setLastName(e.target.value)
                                handleFormInputChange(e, setErrors, ['full_name'])
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
                            id="second_phone"
                            input_label="Second Phone"
                            error={errors.second_phone}
                            value={second_phone}
                            onChange={(e) => {
                                setSecondPhone(e.target.value)
                                handleFormInputChange(e, setErrors)
                            }}
                        />
                        <Floating_Form_input
                            id="id_no"
                            input_label="ID Number"
                            value={id_no}
                                error={errors.id_no}
                                onChange={(e) => {
                                    setIdNo(e.target.value)
                                    handleFormInputChange(e, setErrors, ['id_no'])
                                }}
                            />

                        <Floating_Form_input
                            id="email"
                            input_label="Email"
                            error={errors.email}
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                handleFormInputChange(e, setErrors, ['email'])
                            }}
                        />

                            <Floating_Form_input
                                id="staff_no"
                                input_label="Staff Number"
                                value={staff_no}
                                error={errors.staff_no}
                                onChange={(e) => {
                                    setStaffNo(e.target.value)
                                    handleFormInputChange(e, setErrors, ['staff_no'])
                                }}
                            />





                            <Floating_Form_input
                                id="phy_address"
                                input_label="Location"
                                error={errors.phy_address}
                                value={phy_address}
                                onChange={(e) => {
                                    setPhyAddress(e.target.value)
                                    handleFormInputChange(e, setErrors, ['phy_address'])
                                }}
                            />
{/*
                        <div className="relative">

                          <Floating_select
                                    id="role_id"
                                    input_label="Permission Level"
                                    placeholder="Select Permission"
                                    is_required="true"
                                    options={role_names}
                                    error={errors.role_id}
                                      value={role_id ? role_names.find((role) => role.value == role_id) : null}
                                        onChange={(selectedOption) => {
                                            setRoleId(selectedOption?.value)
                                            handleFormInputChange( { target: { id: "role_id", name: "role_id", value: selectedOption?.value } }, setErrors)
                                        }}

                                />



                        </div>*/}
                        {!is_edit && (
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
                        )}
                       {/* {displayBranches && (
                        <Branches_div/>
                        )}*/}
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
                              {/*  <Button
                                    className="w-auto bg-primaryRed"
                                    type="button"
                                    onClick={() => {
                                        validateUserPassword()
                                    }}
                                    disabled={isSubmitting}
                                >
                                   password
                                </Button>*/}
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
export default User_form_body
