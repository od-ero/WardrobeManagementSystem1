import useSWR from 'swr';
import axios, { fetcher } from '@/lib/axios';
import Swal from 'sweetalert2'
import {  useRouter } from 'next/navigation'

export const useLoginLinks = () => {
   // const router = useRouter()
    const showLoginLog = (log_id) => {
        const pathKey = `/api/reports/login_logs/show/` + log_id;
        const { data, mutate, error } = useSWR(pathKey, fetcher, {
            refreshInterval: 0
        });
        return { data, data_mutate: mutate, loading: !error && !data };
    };

    const listBranchLoginLinks = (filter,id) => {
            let pathKey = null

        if(id && filter){

            pathKey =   filter === 'device' ? `/api/login-links/list-device-login-links/${id}`: `/api/login-links/list-branch-login-links/${id}`;
        }
        //const pathKey = '/api/devices/list-devices';


        const { data, mutate, error } = useSWR(pathKey, fetcher, {
            refreshInterval: 0
        });

        return {  data, data_mutate: mutate, loading: !error && !data };
    };

    return {
        showLoginLog,
        listBranchLoginLinks,


    }
}
