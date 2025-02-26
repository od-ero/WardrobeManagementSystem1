import Axios from 'axios'
import Swal from 'sweetalert2'
import { notFound } from 'next/navigation'
const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true
});


/*export const fetcher = (url) => {
    return axios.get(url).then((res) => {
        if (!res.data) {
            throw Error(res.data.message);
        }
        return res.data;
    });
};*/

/*export const fetcher = (url) => {
    return axios.get(url)
        .then((res) => {
            if (!res.data || res.data.status === "error") {
                throw new Error(res.data || "An unknown error occurred");
            }
            return res.data;
        })
        .catch((error) => {
           const errorData = error.response?.data || { 'message': 'An error occurred'}
            console.log('error_data   :' + JSON.stringify( errorData, null, 2));
            throw new Error(errorData);

        });
};*/

export const fetcher = (url) => {
    return axios.get(url)
        .then((res) => {
            if (!res.data || res.data.status === "error") {
                throw new Error(JSON.stringify(res.data || { message: "An unknown error occurred" }));
            }
            return res.data;
        })
        .catch((error) => {
            const errorData = error.response?.data || { message: "An error occurred" };
            const res_status = error.response.status;
            if(res_status == 404){
                notFound();
            }
            if(res_status == 403){
                notFound();
            }
            throw { isAxiosError: true, ...errorData };
        });
};

export default axios
