'use client'

import React, { useEffect, useState, forwardRef, useImperativeHandle , useRef } from 'react';
import { Header } from '@/app/commonVariable'
import ErrorList from '@/components/ErrorList'
import {
    Floating_select, Floating_textarea,
    handleFormInputChange, RadioInput, SwitchInput,
} from '@/components/Floating_Form_input'
import DisplayErrors from '@/components/DisplayErrors'
import Button from '@/components/Button'
import { z } from 'zod'
import { useHook } from '@/hooks/userOrganiztionBranches'
import Swal from 'sweetalert2'
import ValidateUser from '@/app/(app)/validate_user'
import LoadingModal from '@/components/LoadingModal'
import {useAuth} from '@/hooks/auth'
import {listOrganizationUsersNames } from '@/hooks/users'

const formSchema = z.object({
    user_id: z.string().nonempty("Select User"),
    selectedBranchesWithRoles: z.array(
        z.object({
            branch_id: z.string().nonempty("Branch ID is required"),
            role_id: z.string().nonempty("Role ID is required"),
            description: z.string().optional(),
        })
    ).min(1, "At least one branch must be selected with a corresponding role"),
});

const Form_body = forwardRef(({ triggered_action, passed_user_id, closeModal }, ref) =>

{
    const { create, listBranchesRoles } = useHook();
    const { user } =useAuth();
    const [user_id, setUserId] = useState(passed_user_id || '');
    const{data , loading : branches_loading} =  listBranchesRoles(user_id);
    const {data : organization_users, loading: organization_users_loading}= listOrganizationUsersNames()
    const branchesNames =data?.branches || [];
    const allocated_branches = data?.assigned_branches || [];
    const [success_message, setSuccessMessage] = useState("");
    const [closeModalAfterSubmit, setCloseModalAfterSubmit] = useState(false);
  //  const [change_user_id_allowed, setChangeUserIdAllowed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedBranchesWithRoles, setSelectedBranchesWithRoles] = useState([]);

    let page_title = triggered_action=='create' && ( 'Allocate User Branches');
    let change_user_id_allowed = (triggered_action || '') !== 'create';
    useEffect(() => {
        if (!branches_loading && allocated_branches.length > 0) {
            setSelectedBranchesWithRoles(allocated_branches);
        }
    }, [allocated_branches, branches_loading]);
    const toggleBranch = (branch_id) => {
        setSelectedBranchesWithRoles((prev) => {
            // Check if the branch is already selected
            const branchExists = prev.some((item) => item.branch_id === branch_id);

            if (branchExists) {
                // If branch is deselected, remove all entries for that branch
                return prev.filter((item) => item.branch_id !== branch_id);
            } else {
                // If branch is selected, add the branch with no role initially
                return [...prev, { branch_id, role_id: '' , description: ''}];
            }
        });
    };

    const onChangeUserId = (new_user_id) => {
        setSelectedBranchesWithRoles([]);
        setUserId(new_user_id)
       // listBranchesRoles(new_user_id)
    };

    const handleRoleSelection = (branch_id, role_id) => {

        setSelectedBranchesWithRoles((prev) => {
            const branchIndex = prev.findIndex((item) => item.branch_id === branch_id);

            if (branchIndex !== -1) {
                // Update the role for the existing branch
                const updated = [...prev];
                updated[branchIndex] = { ...updated[branchIndex], role_id };
                return updated;
            } else {
                // Add a new branch with the selected role
                return [...prev, { branch_id, role_id }];
            }
        });
    };
  /* useEffect(() => {

           console.log('selectedBranchesWithRoles  :'+JSON.stringify(selectedBranchesWithRoles) )
        }, [selectedBranchesWithRoles]);*/
/*
  const handleDescriptionChange = (branch_id, description) => {
        setSelectedBranchesWithRoles((prev) => {
            const branchIndex = prev.findIndex((item) => item.branch_id === branch_id);

            if (branchIndex !== -1) {
                // Only update if the description actually changed
                if (prev[branchIndex].description !== description) {
                    const updated = [...prev];
                    updated[branchIndex] = { ...updated[branchIndex], description };
                    return updated;
                }
                return prev; // Avoid triggering a state update if nothing changed
            } else {
                // Add a new branch with the description if it doesn't exist
                return [...prev, { branch_id, description }];
            }
        });
    };
*/

/*
    const handleDescriptionChange = (branch_id, description) => {
        setSelectedBranchesWithRoles((prev) =>
            prev.map((item) =>
                item.branch_id === branch_id ? { ...item, description } : item
            )
        );
    };
*/

    const handleDescriptionChange = (branch_id, description) => {
        setSelectedBranchesWithRoles((prev) =>
            prev.map((item) =>
                item.branch_id === branch_id ? { ...item, description } : item
            )
        );
    };

/* useEffect(() => {

        try {
            if(triggered_action == 'createModal'){
              //  setOrganizationId(module_data.id || '')

            }else if (triggered_action == 'edit') {


                setUrl('/api/users/update/'+ module_data?.id);
            }

        } catch (error) {
            console.error("Error fetching data:", error);
        }

    }, [triggered_action,  module_data]);*/


    const [response_status, setStatus ] = useState('');
    const [errors, setErrors] = useState({});
    const validateUserPasswordRef = useRef(null);

    const validateAndSubmit = async (action) => {
        setIsSubmitting(true);
        setErrors({});
        setStatus('');
        setSuccessMessage('');

        try {
            // Collect the form data
            const formData = {
                user_id,
                selectedBranchesWithRoles,
            };

            // Validate the form data
            const validationResult = formSchema.safeParse(formData);

            if (!validationResult.success) {
                const validationErrors = {};

                validationResult.error.errors.forEach((error) => {
                    if (error.path[0] === "user_id") {
                        validationErrors["user_id"] = error.message;
                    } else if (error.path[0] === "selectedBranchesWithRoles") {
                        if (typeof error.path[1] === "number") {
                            // Get the index of the error
                            const index = error.path[1];

                            // Retrieve the corresponding branch object
                            const branch = selectedBranchesWithRoles[index];
                            const checked_branch = branchesNames.find(
                                (branchName) => branchName.value === branch?.branch_id
                            );

                            // Create a more informative error message
                            const branchLabel = checked_branch?.label || "selected";
                            validationErrors[`branch_${branch?.branch_id || index}`] = `Select role for branch ${branchLabel}`;
                        } else {

                            validationErrors["selectedBranchesWithRoles"] = error.message;
                        }
                    }
                });

                // Set the errors in the state
                setErrors(validationErrors);

                // Display a validation error message
                Swal.fire({
                    toast: true,
                    icon: "error",
                    title: "Validation failed.",
                     text: "Please review the form.",
                    position: "top",
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                });

                return;
            }

            // Proceed with form submission if validation is successful
            if (validateUserPasswordRef.current) {
                validateUserPasswordRef.current.triggerPasswordValidation(action);
            }
        } catch (error) {
            Swal.fire({
                toast: true,
                icon: "error",
                title: "Error",
                 text : "Please Contact Adminstrator",
                position: "top",
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
            });
            console.error("Unexpected error:", error);
        } finally {
            setIsSubmitting(false);
        }


    };





    useEffect(() => {

        if(response_status == 'success'){
            if(triggered_action != 'create'){
                if (closeModalAfterSubmit) {
                    closeModal();
                }
            }
            // setOrganizationId(null);
            setUserId('');
            setSelectedBranchesWithRoles([])
            setStatus('');
            setErrors('');

        }
    }, [response_status]);

    const submit = async (action) => {
        create({
            selectedBranchesWithRoles,
            user_id,

            setErrors,
            setStatus,
            setSuccessMessage,

            action,

        })
    }
    useImperativeHandle(ref, () => ({
        submitForm: async (triggered_action,close) => {
            setCloseModalAfterSubmit(close);
            await validateAndSubmit(triggered_action)

        },
    }));
    let loading = branches_loading || organization_users_loading;
    if (loading) {
        return (
            <LoadingModal
                /*  onClose={() => onClose(null)}
                  closeModal = { onClose }*/
            />
        );
    }



    const Permission_div = () => {
        return (
            <div className="flex flex-col m-2">
                <div className="px-4">
                    <DisplayErrors error={errors.selectedBranchesWithRoles} />
                </div>
                <div>
                    {branchesNames.map((branch) => (
                        <div key={branch.value} className="border p-4 rounded-lg mb-4">
                            <div key={`role_div_${branch.value}`}
                                 className=" grid grid-cols-2  gap-4">

                                <div className={`flex items-center  h-auto p-2`}>
                                    <SwitchInput
                                        key={`branch_switch_${branch.value}`}
                                        name={`branch_${branch.value}`}
                                        input_label={branch.label}
                                        checked={selectedBranchesWithRoles.some((item) => item.branch_id === branch.value)}
                                        onChange={(e) => {
                                            toggleBranch(branch.value)
                                            handleFormInputChange(e, setErrors, ['selectedBranchesWithRoles'])
                                        }}
                                    />
                                </div>
                                <div>
                                    <div
                                        key={`branch_e_div_${branch.value}`}
                                        className={`${
                                            !selectedBranchesWithRoles.some((item) => item.branch_id === branch.value)
                                                ? 'pointer-events-none cursor-not-allowed opacity-50 bg-gray-300'
                                                : ''
                                        }`}
                                    >

                                       <Floating_select
                                            id={`branch_${branch.value}`}
                                            input_label="Role"
                                            placeholder="Select Role"
                                            is_required="true"
                                            options={branch.roles}
                                            error={errors[`branch_${branch.value}`]}
                                            value={branch.roles.find((role) => role.value === selectedBranchesWithRoles.find((item) => item.branch_id === branch.value)?.role_id) || null}

                                            onChange={(selectedOption) => {
                                                handleRoleSelection(branch.value, selectedOption?.value)
                                                handleFormInputChange(
                                                    { target: { id: `branch_${branch.value}`, value: selectedOption?.value } },
                                                    setErrors
                                                );
                                            }}

                                        />


                                    </div>
                                </div>


                            </div>
                            <div  className={`${
                                !selectedBranchesWithRoles.some((item) => item.branch_id === branch.value)
                                    ? 'pointer-events-none cursor-not-allowed opacity-50 bg-gray-300'
                                    : ''
                            }`}>
                                <Floating_textarea
                                    id={`description_${branch.value}`}
                                    error={errors[`description_${branch.value}`]}
                                    value={
                                        selectedBranchesWithRoles.find((item) => item?.branch_id === branch?.value)?.description ?? ""
                                    }
                                    onChange={(e) => {
                                        handleDescriptionChange(branch.value, e.target.value)
                                        handleFormInputChange(e, setErrors)
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="px-4">
                    <DisplayErrors error={errors.selectedBranchesWithRoles} />
                </div>
            </div>
        );
    };

    return <div>
        <>
            {triggered_action == 'create' && (<Header title={page_title} />)}
            <div className="mt-4 rounded m-2">
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
                    <Floating_select
                        id="user_id"
                        input_label="Select User"
                        placeholder="Select User"
                        is_required="true"
                        isDisabled={change_user_id_allowed}
                        options={organization_users}
                        error={errors.user_id}
                       value={user_id ? organization_users.find((user) => user.value == user_id) : null}
                       onChange={(selectedOption) => {

                           //setUserId(selectedOption?.value)
                           onChangeUserId(selectedOption?.value);
                            handleFormInputChange( { target: { id: "user_id", value: selectedOption?.value } }, setErrors)
                        }}

                    />
                 <Permission_div />

                    {triggered_action == 'create' && (
                        <div className="flex items-center justify-evenly mt-2">
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

                          {/*  <Button className="w-auto bg-primaryGreen hover:bg-primaryGreen"
                                    type="button"
                                    disabled={isSubmitting}
                                    onClick={() => {
                                        validateAndSubmit('add')
                                    }}

                            >Save and Add New</Button>*/}

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


