import useSWR from 'swr';
import axios, { fetcher } from '@/lib/axios';
import Swal from 'sweetalert2'
import {  useRouter } from 'next/navigation'

export const useDevices = () => {
    const router = useRouter()
    const showDevice = (device_id) => {
        const pathKey = `/api/devices/show/` + device_id;
        const { data, mutate, error } = useSWR(pathKey, fetcher, {
            refreshInterval: 0
        });
        return { device: data || [], data_mutate: mutate, loading: !error && !data };
    };

     const listDevices = (filter) => {

        //const pathKey = '/api/devices/list-devices';
         const pathKey = filter === 'list-inactive' ? '/api/devices/list-inactive' : '/api/devices/list-devices';

        const { data, mutate, error } = useSWR(pathKey, fetcher, {
            refreshInterval: 0
        });

        return { devices: data || [], data_mutate: mutate, loading: !error && !data };
    };


 const destroyDevice = async (device_id, setStatus) => {


        axios.delete(`/api/devices/destroy/${device_id}`)
            .then(
                response => {
                    if (response.data.status === "error") {


                        Swal.fire({
                            toast: true,
                            icon: "error",
                            title: 'Fail',
                            text: response.data.message,
                            position: "top",
                            showConfirmButton: false,
                            timer: 5000,
                            timerProgressBar: true,
                        });
                        setStatus('error');
                    } else {
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
                        setStatus('success');
                    }

                })
            .catch(error => {

                Swal.fire({
                    toast: true,
                    position: "top",
                    icon: "error",
                    title: "An Error Occurred",
                    text: "Contact your Adminstrator",
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                });
                console.log(error)
                setStatus('error');
            })

    }

  const restoreDevice = async (device_id, setStatus) => {


        axios.delete(`/api/devices/restore/${device_id}`)
            .then(
                response => {
                    if (response.data.status === "error") {


                        Swal.fire({
                            toast: true,
                            icon: "error",
                            title: 'Fail',
                            text: response.data.message,
                            position: "top",
                            showConfirmButton: false,
                            timer: 5000,
                            timerProgressBar: true,
                        });
                        setStatus('error');
                    } else {
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
                        setStatus('success');
                    }

                })
            .catch(error => {

                Swal.fire({
                    toast: true,
                    position: "top",
                    icon: "error",
                    title: "An Error Occurred",
                    text: "Contact your Adminstrator",
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                });
                console.log(error)
                setStatus('error');
            })

    }
    const createDevice = async ({ setErrors, setStatus, setSuccessMessage, action, ...props }) => {

        //const router = useRouter()
        //  await csrf()
        let url = '/api/devices/store'
        setErrors([])
        setStatus('')
        setSuccessMessage('')
        if (action == 'edit') {
            url = '/api/devices/update'
        }
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
                    } else {
                        setSuccessMessage(response.data.message);
                        if (action == 'view') {
                            router.push('/settings/devices/' + response.data.device_id)
                           // redirect('/settings/devices/');
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
    return {
        showDevice,
        listDevices,
        destroyDevice,
        restoreDevice,
        createDevice,

    }
}
