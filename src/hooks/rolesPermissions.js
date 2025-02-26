import useSWR from 'swr';
import axios, { fetcher } from '@/lib/axios';
import Swal from 'sweetalert2'
import {  useRouter } from 'next/navigation'

export const useHook = () => {
    const router = useRouter()
    const show = (id) => {
        const pathKey = `/api/roles-permissions/show/${id}`;
        const { data, mutate, error } = useSWR(pathKey, fetcher, {
            refreshInterval: 0
        });
        return { data, data_mutate: mutate, loading: !error && !data };
    };

    const list = (filter) => {
        const pathKey = filter === 'list-inactive' ? '/api/roles-permissions/list-inactive' : '/api/roles-permissions/list-active';
        const { data, mutate, error } = useSWR(pathKey, fetcher, {
            refreshInterval: 0
        });

        return { data, data_mutate: mutate, loading: !error && !data };
    };

    const listAllPermissionNames = () => {

        //const pathKey = '/api/devices/list-devices';
        const pathKey = `/api/roles-permissions/list-all-permission-names`;

        const { data, mutate, error } = useSWR(pathKey, fetcher, {
            refreshInterval: 0,
        });

        const     loading = !data && !error

        return { data, mutate, error, loading };


    };
    const listAllRolesNames = () => {

        //const pathKey = '/api/devices/list-devices';
        const pathKey = `/api/roles-permissions/list-all-roles-names`;

        const { data, mutate, error } = useSWR(pathKey, fetcher, {
            refreshInterval: 0,
        });

        const     loading = !data && !error

        return { data, mutate, error, loading };


    };
    const storePermissions = ({ ...props }) => {

        //const pathKey = '/api/devices/list-devices';
        const url = `/api/roles-permissions/store-permissions`;

        axios
            .post(url, props)
            .then(
                response => {



                    if (response.data.status === "error") {

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


    };
    const destroy = async (id, setStatus) => {


        axios.delete(`/api/organization-branches/destroy/${id}`)
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

    const restore = async (id, setStatus) => {
        axios.delete(`/api/organization-branches/restore/${id}`)
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
    const create = async ({ setErrors, setStatus, setSuccessMessage, action, ...props }) => {
        //const router = useRouter()
        //  await csrf()
        let url = '/api/roles-permissions/store'
        setErrors([])
        setStatus('')
        setSuccessMessage('')
        if (action == 'edit') {
            url = '/api/roles-permissions/update'
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
                            router.push(`/roles-permissions/${response.data.id}`)
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
        show,
        list,
        destroy,
        restore,
        create,
        storePermissions,
        listAllPermissionNames,
        listAllRolesNames

    }
}
