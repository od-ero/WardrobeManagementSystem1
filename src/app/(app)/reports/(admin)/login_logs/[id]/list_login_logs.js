'use client'

import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { useLoginLogs }  from '@/hooks/login_logs'
import Button from '@/components/DropdownSplit'
import Dropdown from '@/components/DropdownSplitButton'
import DropdownLink, { DropdownButton } from '@/components/DropdownLink'
import { Header } from '@/app/commonVariable'
import Preview from '@/app/(app)/reports/(admin)/login_logs/modals'
import { Floating_select } from '@/components/Floating_Form_input'
import dayjs from 'dayjs'

const MyListingPage = ({ page_id }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedDevice, setSelectedDevice] = useState(null)

    const pageOptions = [
        { value: 'list-active', label: 'List Active' },
        { value: 'list-inactive', label: 'List Inactive' }]

    const [filter, setFilter] = useState(page_id)
    const { listLoginLogs } = useLoginLogs();
    const { data:login_logs, data_mutate, loading: activeLoading } = listLoginLogs()

    const active_device = 'Active Devices'
    const inactive_device = 'Inactive Devices'

    const [pageTitle, setPageTitle] = useState('')
    useEffect(() => {
        if (page_id === 'list-active') {
            document.title = active_device
            setPageTitle(active_device )
        } else if (page_id === 'list-inactive') {
            document.title = inactive_device
            setPageTitle(inactive_device)
        }
    }, [page_id])


    const handleFilterChange = (selectedOption) => {
        const filter_type = selectedOption?.value
        setFilter(filter_type)
        if (filter_type === 'list-active') {
            document.title = active_device
            setPageTitle(active_device)

        } else {
            document.title = inactive_device
            setPageTitle(inactive_device)
        }
    }

    const openModal = (device) => {
        // console.log('device  :' + JSON.stringify(device, null, 2))
        setSelectedDevice(device);
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedDevice(null)
    }



    const CustomdropDown = ({ row }) => (
        <div className="flex items-center space-x-0">
            <Button onClick={() => openModal(row)}>Preview</Button>
            <Dropdown
                align="right"
                width="48"
                trigger={
                    <button
                        type="submit"
                        className="flex items-center p-2 bg-primaryBlue border border-transparent rounded-r-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-400 active:bg-blue-900 focus:outline-none transition ease-in-out duration-150"
                    >
                        <div className="ml-1">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </button>
                }
            >

              <DropdownLink href={`/reports/login_logs/${row.id}`}>View</DropdownLink>

                {/*   <DropdownButton onClick={() => openEditModal(row)}>Edit</DropdownButton>

                {row.deleted_at  ?
                    (<DropdownButton onClick={() => openActivateModal(row)}>
                        Activate
                    </DropdownButton>)

                    : (<DropdownButton onClick={() => openDeleteModal(row)}>Delete</DropdownButton>)}*/}

            </Dropdown>
        </div>
    )

    const columns = [
        {
            name: <div className="text-yellow-500 font-medium flex flex-nowrap">#</div>,
            width: '5%',
            sortable: true,
            cell: (row, rowIndex) => <div>{rowIndex + 1}</div>,
        },
        {
            name: <div className="text-yellow-500 font-medium">User</div>,
            selector: (row) => row?.user?.first_name + ' ' + row?.user?.last_name,
            sortable: true,
            cell: (row) => <div className="text-gray-800">{ row?.user?.first_name + ' ' + row?.user?.last_name }</div>,
        },
        {
            name: <div className="text-yellow-500 font-medium">Device</div>,
            selector: (row) => row?.device?.device_name,
            sortable: true,
            cell: (row) => (
                <div className="flex text-blue-900 font-medium">
                    {row?.device?.device_name}

                </div>
            ),
            wrap: true,
        },
        {
            name: <div className="text-yellow-500 font-medium">Login Time</div>,
            selector: (row) => row?.created_at,
            sortable: true,
            cell: (row) => <div className="text-green-600 font-semibold">{ dayjs(row?.created_at).format('DD/MM/YYYY HH:mm')}</div>,
        },
        {
            name: <div className="text-yellow-500 font-medium">Login Status</div>,
            selector: (row) => row?.session?.user_id,
            sortable: true,
            cell: (row) => (
                <div
                    className={`font-semibold ${
                        row?.session?.user_id ? "text-primaryGreen" : "text-primaryBlack"
                    }`}
                >
                    {row?.session?.user_id ? "Active" : "Out"}
                </div>
            ),
        },

        {
            name: <div className="text-yellow-500 font-medium">Action</div>,
            cell: (row) => (
                <div className="flex items-center space-x-0">
                    <CustomdropDown   row={{
                        id: row.id,
                        user_name: row?.user?.first_name + `  ` + row?.user?.last_name,
                        deleted_at: row.deleted_at
                    }}  />
                </div>
            ),
        },
    ]

    return (
        <div>
            <div className={'flex items-center justify-between'}>
                <div className={`mx-auto`}>
                    <Header title={pageTitle} />
                </div>

                <div className=" ml-auto p-8 relative">
                    <Floating_select
                        id="role_id"
                        input_label="Filter"
                        placeholder="Select Filter"
                        options={pageOptions}
                        value={filter ? pageOptions.find((pageOption) => pageOption.value === filter) : null}
                        onChange={handleFilterChange}
                    />
                </div>
            </div>
            {!activeLoading ? (
                <DataTable columns={columns}
                           data={login_logs}
                           highlightOnHover
                           pointerOnHover
                           pagination
                           striped
                    //noTableHead
                           keyField="id"
                />
            ) : (
                <p>Loading active devices...</p>
            )}

            {isModalOpen && (
                <Preview log ={selectedDevice}

                         onClose={closeModal} />
            )}
        </div>
    )
}

export default MyListingPage
