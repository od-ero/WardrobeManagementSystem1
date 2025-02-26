'use client'

import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react'
import { Header } from '@/app/commonVariable'
import ErrorList from '@/components/ErrorList'
import {
    Floating_Form_input, Floating_select, Floating_textarea,
    handleFormInputChange, SwitchInput,
} from '@/components/Floating_Form_input'
import Button from '@/components/Button'
import { z } from 'zod'
import { useDevices } from '@/hooks/devices'
import { useHook as useOrgBranches } from '@/hooks/organiztions/organization_branches'
import { useAuth } from '@/hooks/auth'
import Swal from 'sweetalert2'
import ValidateUser from '@/app/(app)/validate_user'
import { useOrganizations } from '@/hooks/organiztions/organizations'
import LoadingModal from '@/components/LoadingModal'
import DisplayErrors from '@/components/DisplayErrors'

const schema = z.object({
   device_name: z.string({ message: "set string" }).min(3, "Enter a valid device name"),
    device_code: z.string().min(3, { message: "Enter a valid Device Code" }),
    device_mac: z.string().optional(),
    description: z.string({ message: "set string" }).optional(),

    branch_id: z.union([
        z.string().nonempty({ message: "Select an Organization Branch." }),
        z.number().min(1, { message: "Select An Organization Branch." }),
    ]),
    selectedBranches_id:z.array(z.string()).min(1, "At least one branch must be selected"),

});


//const User_form_body = ({ is_edit, user_id}) =>
const Devices_form_body = forwardRef(({ is_edit,device, closeModal }, ref) =>

{
    const { createDevice } = useDevices();
    const [device_id, setDeviceId] = useState("");
    const [device_name, setDeviceName] = useState("");
    const [device_code, setDeviceCode] = useState("");
    const [device_mac, setDeviceMac] = useState("");
    const [description, setDescription] = useState("");
    const [success_message, setSuccessMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {user : logged_user } = useAuth();
    const [branch_id, setBranchId] = useState(logged_user?.login_info?.branch_id);
    const [ displayBranches,  setDisplayBranches] = useState(false);
    const [selectedBranches_id, setSelectedBranchesId] = useState([logged_user?.login_info?.branch_id]);

    const { listNames}  = useOrgBranches();
    const toggleBranch = (value) => {

        setSelectedBranchesId((prevSelected) =>
            prevSelected.includes(value)
                ? prevSelected.filter((item) => item !== value)
                : [...prevSelected, value]
        );
    };

    let { data: branches_names, loading: loading_branches } = listNames();


  let page_title = is_edit ? 'Edit Device' : 'Create A Device';
  if(!is_edit) {
      document.title = page_title
  }

useEffect(() => {

            try {
                if (is_edit) {
                    setDeviceId(device.id || '');
                    setDeviceName(device.device_name || '');
                    setDeviceCode(device.device_code || '');
                    setDeviceMac( device.device_mac || '');
                    setDescription(device.description || '');
                    page_title = device.device_name;
                    setBranchId(device.branch_id);
                    const branchIds = device?.branches ? Object.values(device?.branches).map(branch => branch?.id) : [];
                    setSelectedBranchesId(branchIds);
                }
         } catch (error) {
                console.error("Error fetching device data:", error);
            }

    }, [is_edit, device]);


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
                device_name,
                device_code,
                device_mac,
                description,
                branch_id,
                selectedBranches_id
            });
            if (validateUserPasswordRef.current) {
                validateUserPasswordRef.current.triggerPasswordValidation(action);
            }
 /*   await createDevice({
        device_id,
        device_name,
        device_code,
        device_mac,
        description,
        setErrors,
        setStatus,
        setSuccessMessage,
        action,
    })*/
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
                    device_name,
                    device_code,
                    device_mac,
                    description,
                    branch_id,
                    selectedBranches_id
                });
            }
            setDeviceName('');
            setDeviceCode('');
            setDeviceMac ('');
            setDescription('');
            setStatus('');
            setErrors('');
            setBranchId([logged_user?.login_info?.branch_id]);
        }
    }, [response_status]);

    useImperativeHandle(ref, () => ({
        submitForm: async () => {
            await validateAndSubmit('edit')
        },
    }));
const submit = async (action) => {
   createDevice({
        device_id,
        device_name,
        device_code,
        device_mac,
        description,
       branch_id,
       selectedBranches_id,
        setErrors,
        setStatus,
        setSuccessMessage,
        action,
    })
}

    let loading = loading_branches

    useEffect(() => {

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
    }, [loading_branches, branches_names]);
    const Branches_div = () =>(<div className="flex flex-col">
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
    )


    if (loading) {
        return (

            <LoadingModal
                /*  onClose={() => onClose(null)}
                  closeModal = { onClose }*/
            />
        )
    }
        return <>
            {!is_edit && ( <Header title={page_title} />)}
            <div className="mt-4 rounded">
                <form >
                    {Object.keys(errors).length > 0 && (
                        <div className="flex w-fit mx-auto ">
                            <ErrorList errors={Object.entries(errors)} />
                        </div>
                    )}
                   {success_message && (
                        <div className="flex w-fit mx-auto mb-2 p-3 bg-primaryGreen">
                            <p> {success_message} </p>
                        </div>
                    )}
                    <div className="grid sm:grid-cols-2 gap-4 mx-4">

                        <Floating_Form_input
                            id="device_name"
                            input_label="Device Name"
                            is_required="true"
                            value={device_name}
                            error={errors.device_name}
                            onChange={(e) => {
                                setDeviceName(e.target.value)
                                handleFormInputChange(e, setErrors)
                            }}
                        />

                        <Floating_Form_input
                            id="device_code"
                            input_label="Device Code"
                            is_required="true"
                            value={device_code}
                            error={errors.device_code}
                            onChange={(e) => {
                                setDeviceCode(e.target.value)
                                handleFormInputChange(e, setErrors)
                            }}
                        />

                        <Floating_Form_input
                            id="device_mac"
                            input_label="Device MAC"
                            value={device_mac}
                            error={errors.device_mac}
                            onChange={(e) => {
                                setDeviceMac(e.target.value)
                                handleFormInputChange(e, setErrors)
                            }}
                        />

                            <Floating_select
                                id="branch_id"
                                input_label="Org Branch"
                                placeholder="Select Org Branch"
                                is_required="true"
                                options={branches_names}
                                error={errors.branch_id}
                                value={branch_id ? branches_names.find((branch_name) => branch_name.value === branch_id) : null}
                                onChange={(selectedOption) => {
                                    setBranchId(selectedOption?.value)
                                    handleFormInputChange({
                                        target: {
                                            id: 'branch_id',
                                            name: 'branch_id',
                                            value: selectedOption?.value,
                                        },
                                    }, setErrors)
                                }}

                            />

                        {displayBranches && (
                            <Branches_div/>
                        )}
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
                                onClick={(e) => {
                                    validateAndSubmit('view')
                                }}
                                disabled={isSubmitting}
                            >
                                Save and View
                                </Button>
                                <Button className="w-auto bg-primaryGreen hover:bg-primaryGreen"
                                        type="button"
                                        disabled={isSubmitting}
                                        onClick={(e) => {
                                            validateAndSubmit('add')
                                        }}
                                >Save and Add New</Button>

                            </div>

                        )}


                </form>
            </div>
            <ValidateUser ref={validateUserPasswordRef}
                          onSuccess={(action) => submit(action)}
            />
        </>
});
export default Devices_form_body;
