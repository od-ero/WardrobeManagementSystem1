import useSWR from 'swr';
import axios, { fetcher } from '@/lib/axios';
import Swal from 'sweetalert2'
import {  useRouter } from 'next/navigation'

export const useHook = () => {
    const router = useRouter()
    const show = (id) => {
        const pathKey = `/api/organization-branches/show/` + id;
        const { data, mutate, error } = useSWR(pathKey, fetcher, {
            refreshInterval: 0
        });
        return { data, data_mutate: mutate, loading: !error && !data };
    };

    const list = (organization_id, filter) => {

        const pathKey = filter == `list-inactive` ? `/api/organization-branches/list-inactive/${organization_id}` : `/api/organization-branches/list-active/${organization_id}`;

        const { data, mutate, error } = useSWR(pathKey, fetcher, {
            refreshInterval: 0
        });

        return { data, data_mutate: mutate, loading: !error && !data };
    };

    const listNames = () => {

        //const pathKey = '/api/devices/list-devices';
        const pathKey = `/api/organization-branches/list-active-names`;

        const { data, mutate, error } = useSWR(pathKey, fetcher, {
            refreshInterval: 0,
        });

        const     loading = !data && !error

        return { data, mutate, error, loading };


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
    const setOrganizationBranch = async ({...props }) => {

        let url = '/api/reports/login_logs/set-branch'
        axios
            .post(url, props)
            .then(
                response => {

                    /*
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
                                                router.push('/settings/organization_branches?branch_id=' + response.data.id)
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

                                    }*/
                    router.replace('/home');
                   // router.replace('/home');
                }
                )
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
        setOrganizationBranch,
        show,
        list,
        destroy,
        restore,
        listNames,

    }
}
