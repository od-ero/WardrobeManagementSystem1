import React, { useState } from 'react'
import { Icon } from "@iconify/react"
import Select from 'react-select'
import DisplayErrors from '@/components/DisplayErrors'

export const Floating_Form_input =
    ({ ...props }) => {
        return (
            <div>
            <div className="relative m-2">
                <input  {...props}
                       type= { props.type || "text" }
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 text-black bg-white rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " />
                <label htmlFor={props.id}
                       className="absolute text-sm text-gray-500 bg-white duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">{props.input_label}
                    {props.is_required && (<span className="text-red-500">&nbsp;&nbsp; &#42;</span>)}
                </label>

            </div>
              <DisplayErrors error={props.error} />
        </div>
        )
    };

export const Floating_textarea =
    ({ ...props }) => {

        return (
            <div>
            < div
                className="relative w-full m-2 ">
    < textarea
        {...props}
        rows={props.rows || 4}
        className="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder="">< /textarea>
                <label htmlFor={props.id}
                       className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 left-2.5 origin-[0] bg-white px-2 peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-4">{props.input_label || "Description" }
                    {props.is_required && (<span className="text-red-500">&nbsp;&nbsp; &#42;</span>)}</label>

            </div>
        <DisplayErrors error={props.error} />
        </div>
        )
    }

/*export const Floating_textarea = ({ ...props }) => {
    return (
        <div className="relative w-full m-2">
            <textarea
                {...props}
                rows={props.rows || 4}
                className="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
            />
            <label
                htmlFor={props.id}
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 left-2.5 origin-[0] bg-white px-2 peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
                {props.input_label || "Description"}
                {props.is_required && (
                    <span className="text-red-500">&nbsp;&nbsp; &#42;</span>
                )}
            </label>
            <DisplayErrors error={props.error} />
        </div>
    );
};*/


export const Floating_select = ({ ...props }) => {

    const id = props.id || `floating-select`;
    const instanceId = `${id}-instance`;


    return (
        <div>
        <div className="relative  m-2 bg-primaryWhite ">

            <Select
                id={id}
                instanceId={instanceId}
                className="basic-single bg-blue-50"
                placeholder= {props.placeholder}
                options={props.options}
                onChange={props.onChange}
                value={props.value}
                {...props}
            />

            <label htmlFor={id}
                   className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-primaryWhite px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                {props.input_label}  {props.is_required && (<span className="text-red-500">&nbsp;&nbsp; &#42;</span>)}
            </label>

        </div>
    <DisplayErrors error={props.error} />
   </div>
    );
};


export const Floating_password =
    ({...props}) => {
        const [passwordType, setPasswordType] = useState('password');
        const togglePasswordType = () => {
            setPasswordType((prevType) => (prevType === "password" ? "text" : "password"));
        };
        return (
            <div>
            <div className="relative m-2 ">
                <input
                    {...props}
                    id={props.id}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black bg-white rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none  focus:border-blue-600 peer"
                    placeholder=" "
                    type={passwordType}
                />
                <label
                    htmlFor={props.id}
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    {props.input_label}
                    {props.is_required && (
                        <span className="text-red-500">&nbsp;&nbsp; &#42;</span>
                    )}
                </label>


                <div
                    className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
                    onClick={togglePasswordType} >
                    {passwordType === 'password' ? (
                        <Icon icon="heroicons:eye" className="w-4 h-4 text-gray-400" />
                    ) : (
                        <Icon icon="heroicons:eye-slash" className="w-4 h-4 text-gray-400" />
                    )}
                </div>

            </div>
        <DisplayErrors error={props.error} />
    </div>
        )
    };
export const SwitchInput = ({ input_label, ...props }) => {
    return (

            <label className="inline-flex items-center mb-5 cursor-pointer">
                <input
                    type="checkbox"
                    /* checked={checked}
                     onChange={onChange} */
                    {...props}
                    className="sr-only peer"
                />
                <div
                    className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{input_label}</span>
            </label>

    );
};

export const RadioInput = ({ input_label, ...props }) => {
    return (
        <div
            className="flex items-center ps-4 border border-gray-200 rounded-sm dark:border-gray-700">
            <input
                //id={props?.key}
                   {...props}
                   type="radio"
                   //value=""
                  /* name="bordered-radio"*/
                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
         <label htmlFor={props?.id}
                   className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{input_label}</label>
        </div>
    );
};


export const handleFormInputChange = (event, setErrors, additionalErrorKeys = []) => {
    const { id, name, value } = event.target;
    // Ensure additionalErrorKeys is always an array
    if (!Array.isArray(additionalErrorKeys)) {
        additionalErrorKeys = [];
    }

    // Remove errors related to the input's ID and any additional keys
    setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[id];
        delete newErrors[name];// Automatically remove error for the input's ID
        additionalErrorKeys.forEach((key) => delete newErrors[key]); // Remove additional keys
        return newErrors;
    });
};


