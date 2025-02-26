import axios from '@/lib/axios'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import useSWR from 'swr'


export const useAuth = ({ middleware } = {}) => {

  // let { mutate as globalMutate } = useSWRConfig()

 const router = useRouter()
    const current_pathname = usePathname()
    const searchParams = useSearchParams()
    const intended_url = searchParams.get('intended');
    let home_landing_page = '/home'



    const { data: user, error, mutate } = useSWR(
        '/api/user',

        () =>
            axios
                .get('/api/user')
                .then(res => res.data)
                .catch(error => {
                    if (error.response.status !== 409) throw error
                   // setIsAuthenticated(false)
                    router.push('/verify-email')
                }),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            errorRetryCount: 0,
        }
    )



   

   
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register = async ({ setErrors, setStatus,setSuccessMessage, action,url, ...props }) => {
      //  await csrf()

        setErrors([])
        setStatus('')
        setSuccessMessage('')

        axios
            .post(url, props)
            .then(
                response => {
                    setStatus(response.data.status);
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
                        });
                    }
                    else {
                        setSuccessMessage(response.data.message);
                        if(action == 'view'){
                            router.push('/users/'+response.data.user_id);
                        }

                        Swal.fire({
                            toast: true,
                            position: "top",
                            icon: "success",
                            title: "Success",
                            text: response.data.message,
                            showConfirmButton: false,
                            timer: 5000,
                            timerProgressBar: true,
                        });
                    }

                })
            .catch(error => {

                console.error('Request error: ', error);
                Swal.fire({
                    toast: true,
                    icon: "error",
                    title: error.response.data.message,
                    position: "top",
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                });

            })

    }


 

    const login = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/login', props)
            .then((response) => {

                mutate()

                localStorage.setItem('isAuthenticated', 'true');

            })
            .catch(error => {


                setErrors(error.response.data.errors)
                Swal.fire({
                    toast: true,
                    icon: "error",
                    title: error.response.data.message,
                    position: "top",
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                });
              if (error.response.error ) {

                    setErrors(error.response.data.errors || 'An error occurred');
                    Swal.fire({
                        toast: true,
                        icon: "error",
                        title: error.response.data.message,
                        position: "top",
                        showConfirmButton: false,
                        timer: 5000,
                        timerProgressBar: true,
                    });
                } else if (error.request) {

                    console.error('Request error:', error.request);
                    setErrors('Network error. Please try again.');
                } else {
                    console.error('Error:', error.message);
                    setErrors('An unexpected error occurred.');
                }
            });

    }


    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', { token: params.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }
    const logout = async () => {

        try {

            // Post logout request to the server
            await axios.post('/logout');
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('company_name');

            router.push('/login');

            mutate(null, false);
        } catch (error) {
            router.push('login');
            console.error('Error during logout:', error);
        }
    };




    useEffect(() => {

        if (middleware === 'guest' && user) {
           router.push(home_landing_page);
        }

        if (middleware === 'auth' && error) {
         
             router.replace('/login');
        
        }
    }, [middleware,  user, error]);


    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
       // isAuthenticated,
    }
}
