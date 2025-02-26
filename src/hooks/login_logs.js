import useSWR from 'swr';
import axios, { fetcher } from '@/lib/axios';
import Swal from 'sweetalert2'
import {  useRouter } from 'next/navigation'

export const useLoginLogs = () => {
   // const router = useRouter()
    const showLoginLog = (log_id) => {
        const pathKey = `/api/reports/login_logs/show/` + log_id;
        const { data, mutate, error } = useSWR(pathKey, fetcher, {
            refreshInterval: 0
        });
        return { data, data_mutate: mutate, loading: !error && !data };
    };

    const listLoginLogs = () => {

        //const pathKey = '/api/devices/list-devices';
        const pathKey= '/api/reports/login_logs/list';

        const { data, mutate, error } = useSWR(pathKey, fetcher, {
            refreshInterval: 0
        });

        return {  data, data_mutate: mutate, loading: !error && !data };
    };

    return {
        showLoginLog,
        listLoginLogs,


    }
}
