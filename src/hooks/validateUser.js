import axios from '@/lib/axios';
import Swal from 'sweetalert2';

export const useValidateUser = () => {
    const validateUser = async ({ setErrors, setResponseStatus, setSuccessMessage, ...props }) => {
let response_status = '';
        try {
            // Clear existing state before making the request
            setErrors([]);
            setResponseStatus('');
            setSuccessMessage('');

            // Make the API request
            const response = await axios.post('/api/validate-user', props);

            // Handle response
            const { status :response_status, errors, message } = response.data;
            setResponseStatus(response_status);

           if (response_status === "error") {
                setErrors(errors);
                Swal.fire({
                    toast: true,
                    icon: "error",
                    title: 'Error',
                    text: message,
                    position: "top",
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                });
            }
          /* else {
                setSuccessMessage(message);
                Swal.fire({
                    toast: true,
                    icon: "success",
                    title: 'Success',
                    text: message,
                    position: "top",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            }*/
        } catch (error) {
            // Handle any errors
            response_status = 'error';
            const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
            Swal.fire({
                toast: true,
                icon: "error",
                title: 'error',
                text: errorMessage,
                position: "top",
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
            });

            setErrors([{ path: 'global', message: errorMessage }]);
        }
return response_status;
    };

    return {
        validateUser,
    };
};



/*

import axios from '@/lib/axios'
import Swal from 'sweetalert2'
import {  useRouter } from 'next/navigation'

export const useValidateUser = () => {
  //  const router = useRouter()

    const validateUser = async ({ setErrors, setStatus, setSuccessMessage, ...props }) => {
        {

        //const router = useRouter()
        //  await csrf()
        setErrors([])
        setStatus('')
        setSuccessMessage('')
        axios
            .post('/api/validate-user', props)
            .then(
                response => {


                    setStatus(response.data.status)
                    if (response.data.status === "error") {
                        setErrors(response.data.errors)
                        Swal.fire({
                            toast: true,
                            icon: "error",
                            title: "Response Error. <br>Please review the form.",
                            position: "top",
                            showConfirmButton: false,
                            timer: 5000,
                            timerProgressBar: true,
                        })
                    } else {
                        setSuccessMessage(response.data.message)
                    }

                })
            .catch(error => {

                console.error('Request error: ', error)
                Swal.fire({
                    toast: true,
                    icon: "error",
                    title: error.response.data.message,
                    position: "top",
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                })

            })
    }
    return {
        validateUser

    }
}
*/
