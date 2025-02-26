'use client'

import ValidateUser from '@/app/(app)/validate_user';
import { Header } from '@/app/commonVariable';
import Button from '@/components/Button';
import DisplayErrors from '@/components/DisplayErrors';
import ErrorList from '@/components/ErrorList';
import {
    Floating_Form_input,
    Floating_select, Floating_textarea,
    handleFormInputChange,
} from '@/components/Floating_Form_input';
import LoadingModal from '@/components/LoadingModal';
import { useAuth } from '@/hooks/auth';
import { useHook } from '@/hooks/wardrobe';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { z } from 'zod';

const schema = z.object({
  
     name: z.string().min(3, { message: "Enter Atleast 3 characters" }),
  
    brand: z.string().optional(),
   size: z.string().optional(),
  color: z.string().optional(),
  pattern: z.string().optional(),
  material: z.string().optional(),
  purchase_place: z.string().optional(),
  purchase_price: z.string().optional(),
    description: z.string({ message: "set string" }).optional(),
    category_id: z.union([
        z.string().nonempty({ message: "Select Category" }),
        z.number().min(1, { message: "Select Category" }),
    ]),
});



const Form_body = forwardRef(({ triggered_action, module_data, closeModal }, ref) =>

{
    const { create , listNames} = useHook();
    const { user } =useAuth();
  
    const{data : categoryNames, loading} =  listNames();
  
    const [brand, setBrand] = useState("");
    const [name, setName] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [pattern, setPattern] = useState("");
    const [material, setMaterial] = useState("");
    const [purchase_price, setPurchasePrice] = useState("");
    const [purchase_place, setPurchasePlace] = useState("");
    const [description, setDescription] = useState("");
    const [success_message, setSuccessMessage] = useState("");
    const [closeModalAfterSubmit, setCloseModalAfterSubmit] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [category_id, setCategoryId] = useState('');
    const [wrId, setWRId] = useState(null);

    let page_title = triggered_action=='create' && ( 'Add An Item');
    useEffect(() => {

            try {
                if(triggered_action == 'edit') {
                    setWRId( module_data?.id || '');
                    setName(module_data?.name || '');
                    setCategoryId( module_data?.category_id || '');
                    setBrand( module_data?.brand || '');
                    setSize( module_data?.size || '');
                    setColor( module_data?.color || '');
                    setPattern( module_data?.pattern || '');
                    setMaterial( module_data?.material || '');
                    setPurchasePrice( module_data.purchase_price || '' );
                    setPurchasePlace( module_data.purchase_place || '' );
                    setDescription( module_data.description || '');
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
                name,
                category_id,
                brand,
                size,
                color,
                pattern,
                material,
                purchase_place,
               purchase_price,
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
                title: "Error",
                text: "Validation failed. Please review the form.",
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
                    name,
                    category_id,
                    brand,
                    size,
                    color,
                    pattern,
                    material,
                    purchase_place,
                   purchase_price,
                    description,
                   })
               }
            }
           // setOrganizationId(null);
            setCategoryId(null);
            setBrand('');
            setName('');
            setSize( '');
            setColor( '');
            setPattern( '');
            setMaterial('');
            setPurchasePrice('' );
            setPurchasePlace('');
            setDescription( '');
            setStatus('');
            setErrors('');

        }
    }, [response_status]);

    const submit = async (action) => {
        create({
            wrId,
            name,
            category_id,
            brand,
            size,
            color,
            pattern,
            material,
            purchase_place,
           purchase_price,
            description,
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
  <div className="relative">

<Floating_select
    id="category_id"
    input_label="Category"
    placeholder="Select Category"
    is_required="true"
    options={ categoryNames}
    value={category_id ? categoryNames.find((item) => item.value === category_id) : null}
    onChange={(selectedOption) => {
        setCategoryId(selectedOption?.value);
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors.category_id;
            return newErrors;
        });
    }}
            instanceId="category-select-instance"
/>
<DisplayErrors error={errors.category_id} />
</div>
                            <Floating_Form_input
                                id="brand"
                                input_label="Brand"
                               
                                value={brand}
                                error={errors.brand}
                                onChange={(e) => {
                                    setBrand(e.target.value)
                                    handleFormInputChange(e, setErrors)
                                }}
                            />


                            <Floating_Form_input
                                id="size"
                                input_label="Size"
                               
                                value={size}
                                error={errors.size}
                                onChange={(e) => {
                                    setSize(e.target.value)
                                    handleFormInputChange(e, setErrors)
                                }}
                            />

                            <Floating_Form_input
                                id="color"
                                input_label="Color"
                                error={errors.color}
                                value={color}
                                onChange={(e) => {
                                    setColor(e.target.value)
                                    handleFormInputChange(e, setErrors)
                                }}
                            />

                            <Floating_Form_input
                                id="pattern"
                                input_label="pattern"
                                error={errors.pattern}

                                value={pattern}
                                onChange={(e) => {
                                    setPattern(e.target.value)
                                    handleFormInputChange(e, setErrors)
                                }}
                            />
                          

                            <Floating_Form_input
                                id="material"
                                input_label="Material"
                                error={errors.material}
                                value={material}

                                onChange={(e) => {
                                    setMaterial(e.target.value)
                                    handleFormInputChange(e, setErrors)
                                }}
                            />
                         <Floating_Form_input
                                id="purchase_price"
                                input_label="Purchase Price"
                                error={errors.purchase_price}
                                value={purchase_price}

                                onChange={(e) => {
                                    setPurchasePrice(e.target.value)
                                    handleFormInputChange(e, setErrors)
                                }}
                            />
                         
                         <Floating_Form_input
                        id="purchase_place"
                        input_label="purchase_place"
                        error={errors.purchase_place}
                        value={purchase_place}

                        onChange={(e) => {
                            setPurchasePlace(e.target.value)
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
