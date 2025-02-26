import useSWR from 'swr';
import axios, { fetcher } from '@/lib/axios';
import Swal from 'sweetalert2'
import { useRouter } from "next/navigation";

export const showUser = (user_id) => {
    const pathKey = `/api/users/show/`+user_id;
    const { data, mutate, error } = useSWR(pathKey, fetcher, {
        refreshInterval: 0
    });
    return { user: data || [],data_mutate : mutate , loading: !error && !data };
};

export const listUsersConditionally = (filter ) => {

    const pathKey = filter === 'list-inactive' ? '/api/users/list-inactive' : '/api/users/list-active';

    const { data,mutate, error } = useSWR(pathKey, fetcher, {
        refreshInterval: 0
    });

    return { users: data || [], data_mutate: mutate, loading: !error && !data };
};


export const destroyUser = async (user_id, setStatus) => {


         axios.delete(`/api/users/destroy/${user_id}`)
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
                     }
                     else {
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
            .catch(error=>{

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

export const restoreUser = async (user_id, setStatus) => {


    axios.delete(`/api/users/restore/${user_id}`)
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
                }
                else {
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
        .catch(error=>{

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

export const listLoginNames = (branch_code, device_code) => {
    const pathKey = branch_code && device_code
        ? `/api/users/list-login-names/${branch_code}/${device_code}`
        : null;

    const { data, mutate, error } = useSWR(pathKey, fetcher, { refreshInterval: 0 });

    let loading = false;
    if (branch_code && device_code) {
        loading = !data && !error;
    }
  /*  if (error) {
       if (error?.status == 'error'){

       }
    }*/



    return { data, mutate, error, loading };
};

export const listOrganizationUsersNames = () => {
    const pathKey = '/api/users/list-organization-usersNames';

    const { data, mutate, error   } = useSWR(pathKey, fetcher, { refreshInterval: 0 });




  /*  if (error) {
       if (error?.status == 'error'){

       }
    }*/

    return { data, mutate, loading: !error && !data };
};
export const listAssignedBranches = (user_id) => {
    const pathKey = user_id
        ? `/api/users/list-assigned-branches/${user_id}`
        : null;

    const { data, mutate, error } = useSWR(pathKey, fetcher, { refreshInterval: 0 });


      const  loading = !data && !error;

  /*  if (error) {
       if (error?.status == 'error'){

       }
    }*/



    return { data, mutate, error, loading };
};






