import useSWR from 'swr';
import axios, { fetcher } from '@/lib/axios';
import Swal from 'sweetalert2'
import {  useRouter } from 'next/navigation'

export const useOrganizations = () => {
    const router = useRouter()
    const showOrganization = (device_id) => {
        const pathKey = `/api/organizations/show/` + device_id;
        const { data, mutate, error } = useSWR(pathKey, fetcher, {
            refreshInterval: 0
        });
        return { data, data_mutate: mutate, loading: !error && !data };
    };

    const listOrganizations = (filter) => {

        //const pathKey = '/api/devices/list-devices';
        const pathKey = filter === 'list-inactive' ? '/api/organizations/list-inactive' : '/api/organizations/list-active';

        const { data, mutate, error } = useSWR(pathKey, fetcher, {
            refreshInterval: 0
        });

        return { data, data_mutate: mutate, loading: !error && !data };
    };
    const listOrganizationNames = () => {

        //const pathKey = '/api/devices/list-devices';
        const pathKey = '/api/organizations/list-active-names';

        const { data : back_data, mutate, error } = useSWR(pathKey, fetcher, {
            refreshInterval: 0
        });
        const mappedData = back_data?.map(item => ({
            value: item.id,
            label: item.name
        }));
        return { data : mappedData, data_mutate: mutate, loading: !error && !back_data };
    };


    const destroyOrganization = async (id, setStatus) => {


        axios.delete(`/api/organizations/destroy/${id}`)
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

    const restoreOrganization = async (id, setStatus) => {


        axios.delete(`/api/organizations/restore/${id}`)
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
    const createOrganization = async ({ setErrors, setStatus, setSuccessMessage, action, ...props }) => {

        //const router = useRouter()
        //  await csrf()
        let url = '/api/organizations/store'
        setErrors([])
        setStatus('')
        setSuccessMessage('')
      if (action == 'edit') {
            url = '/api/organizations/update'
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
                            router.push('/settings/organizations/' + response.data.id)
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
        showOrganization,
        listOrganizations,
        listOrganizationNames,
        destroyOrganization,
        restoreOrganization,
        createOrganization,

    }
}
