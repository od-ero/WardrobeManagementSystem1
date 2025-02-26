import useSWR from 'swr';
import axios, { fetcher } from '@/lib/axios';
import Swal from 'sweetalert2'
import {  useRouter } from 'next/navigation'

export const useHook = () => {
    const router = useRouter()
    const show = (user_id) => {
        const pathKey = `/api/user-organization-branches/show/${user_id}`;

        const { data, mutate, error } = useSWR(pathKey, fetcher, {
            refreshInterval: 0
        });
        return { data, data_mutate: mutate, loading: !error && !data };
    };

    const getMyBranches = (organization_id) => {
        const pathKey = `/api/user-organization-branches/get-my-branches/${organization_id}`;

        const { data, mutate, error } = useSWR(pathKey, fetcher, {
            refreshInterval: 0
        });
        return { data, data_mutate: mutate, loading: !error && !data };
    };



    const listBranchesRoles = (user_id) => {

        //const pathKey = '/api/devices/list-devices';
        const pathKey =user_id ? `/api/user-organization-branches/allocate-user-branches/${user_id}` : null;

        const { data, mutate, error } = useSWR(pathKey, fetcher, {
            refreshInterval: 0,
        });
        let loading = false;
        if(user_id) {
             loading = !data && !error
        }
        return { data, mutate, error, loading };



    };

    const create = async ({ setErrors, setStatus, setSuccessMessage, action, ...props }) => {
        //const router = useRouter()
        //  await csrf()
        let url = '/api/user-organization-branches/store'
        setErrors([])
        setStatus('')
        setSuccessMessage('')
      /*  if (action == 'edit') {
            url = '/api/organization-branches/update'
        }*/
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
                            router.push(`/users/user-organization-branches/${response.data.user_id}`)
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

        create,
        listBranchesRoles,
        getMyBranches

    }
}
