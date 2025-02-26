'use client';
import { getPageTitle, Header } from '@/app/commonVariable'
import { notFound, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react';

import { useLoginLinks } from '@/hooks/login_links';
import LoadingModal from '@/components/LoadingModal'

import { ViewTablePage } from '@/components/TableViewPage'
import CopyButton from '@/components/CopyButton'
import TanTable from '@/components/TanTable'
const MyPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const device_id = searchParams.get('device_id');
    const branch_id = searchParams.get('branch_id');
   let passed_id = '';
    let filter = '';
    let filter_toggle = '';
    const { listBranchLoginLinks } = useLoginLinks();

    if(branch_id){
        filter = 'branch';
        filter_toggle = 'Device';
        passed_id= branch_id;
    }
    else if(device_id){
        filter = 'device';
        filter_toggle = 'Branch';

        passed_id= device_id;
    }else{
        notFound();
    }
    const { data, loading } = listBranchLoginLinks(filter, passed_id);
    const urls = data?.urls;
     const module = data?.module;
    if (loading) return <><LoadingModal /></>

    const columns = [
        {
            accessorKey: 'index',
            enableSorting: true,
            header: '#',
            cell: ({ row }) => <div>{row.index+1}</div>, // Use `row.index`
        },
        {
            accessorKey: name,
            enableSorting: true,
            header: filter_toggle,
            cell: ({ row }) => <div>{row.original.name}</div>,
        },
        {
            accessorKey: 'url',
            enableSorting: false,
            header: 'URL',
            cell: ({ row }) => <div className="text-primaryBlue text-sm italic" >
                {row.original.url}</div>,
        },



        {
            accessorKey: 'action',
            header: '',
            cell: ({ row }) => (
                <div className="flex items-center space-x-0">
                    <CopyButton text={row.original.url} />
                </div>
            ),
        },
    ]

    return <div>
        <div className="basis-full w-full lg:basis-3/4 flex justify-center items-center relative">

            <div className="w-full sm:w-3/4 shadow-md">
                    <Header
                        title={`Login urls for ${filter} - ${module?.name}`}
                    />
              {/*  <ViewTablePage data={urls} columns={columns} />*/}
                <TanTable
                    columns={columns}
                    data={urls}
                />
            </div>
        </div>

    </div>
}
export default MyPage;

