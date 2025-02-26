'use client'

import React, { useState, useEffect } from 'react'
import TanTable from '@/components/TanTable'
import { useDevices }  from '@/hooks/devices'
import Button from '@/components/DropdownSplit'
import Dropdown from '@/components/DropdownSplitButton'
import DropdownLink, { DropdownButton } from '@/components/DropdownLink'
import { Header } from '@/app/commonVariable'
import Edit, { Destroy, Preview, Restore } from '@/app/(app)/settings/(admin)/devices/devices_modals'
import { Floating_select } from '@/components/Floating_Form_input'
import { useRouter } from 'next/navigation'

const MyListingPage = ({ page_id }) => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedDevice, setSelectedDevice] = useState(null)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isActivateModalOpen, setIsActivateModalOpen] = useState(false)

    const pageOptions = [
        { value: 'list-active', label: 'List Active' },
        { value: 'list-inactive', label: 'List Inactive' }]

    const [filter, setFilter] = useState(page_id)
    const { listDevices } = useDevices();
    const { devices, data_mutate, loading: activeLoading } = listDevices(filter)

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
    const openEditModal = (selectedDevice) => {
        setSelectedDevice(selectedDevice)
        setIsEditModalOpen(true)
    }

    const closeEditModal = (updatedData) => {

        if (!selectedDevice) return // If no user is selected, do nothing

        if (devices) {
            const updatedDataList = devices.map((row) =>
                row.id === selectedDevice.id ? { ...row, ...updatedData } : row,
            )
            data_mutate(updatedDataList, false)
            setIsEditModalOpen(false)
            setSelectedDevice(null)
        }
    }


    const openDeleteModal = (selectedDevice) => {
        setSelectedDevice(selectedDevice)
        setIsDeleteModalOpen(true)

    }

    const closeDeleteModal = (response) => {

        if (response == 'success') {
            const updatedDataList = devices.filter((row) => row.id !== selectedDevice.id);
            data_mutate(updatedDataList, false)
        }
        setIsDeleteModalOpen(false)
        setSelectedDevice(null)

    }

    const openActivateModal = (selectedDevice) => {
        setSelectedDevice(selectedDevice)
        setIsActivateModalOpen(true)

    }

    const closeActivateModal = (response) => {
        if (response == 'success') {
            const updatedDataList = devices.filter((row) => row.id !== selectedDevice.id);
            data_mutate(updatedDataList, false)
        }
        setIsActivateModalOpen(false)
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

                <DropdownLink href={`/settings/devices/${row.id}`}>View</DropdownLink>

                <DropdownButton onClick={() => openEditModal(row)}>Edit</DropdownButton>

                {row.deleted_at  ?
                    (<DropdownButton onClick={() => openActivateModal(row)}>
                        Activate
                    </DropdownButton>)

                    : (<><DropdownButton onClick={() => router.push(`/settings/login-links?device_id=${row?.id}`)}>Login Links</DropdownButton>
                        <DropdownButton onClick={() => openDeleteModal(row)}>Delete</DropdownButton>
                    </>)}

            </Dropdown>
        </div>
    )

    const columns = [
        {
            id: 'id#', // Unique column ID
            header: '#',
            cell: ({ row }) => <div>{row.index + 1}</div>, // Use `row.index`
            enableSorting: true,
        },
        {
            accessorKey: 'device_name',
            header: 'Name',
            enableSorting: true,
        },
        {
            accessorKey: 'device_code',
            header: 'Code',
            enableSorting: true,
        },
        {
            accessorKey: 'branches_count',
            header: 'Assigned Branches',
            enableSorting: true,
        },
        {
            accessorKey: 'device_mac',
            header: 'Mac',
            enableSorting: true,
        },
        {
            accessorKey: 'action', // Unique column ID
            header: '',
            cell: ({ row }) => (
                <div className="flex items-center space-x-0">
                    <CustomdropDown
                        row={{
                            id: row.original.id, // Ensure correct data reference
                            device_name: row.original.device_name,
                            deleted_at: row.original.deleted_at,
                        }}
                    />
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

                <div className=" ml-auto p-8 relative z-20">
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
                <TanTable
                    columns={columns}
                    data={devices}
                />
            ) : (
                <p>Loading active devices...</p>
            )}

            {isModalOpen && (
                <Preview device ={selectedDevice}
                         openEditModal = {openEditModal}
                         openActivateModal = {openActivateModal}
                         openDeleteModal = {openDeleteModal}
                         onClose={closeModal} />
            )}

            {isEditModalOpen && (
                <Edit
                    device_id={selectedDevice.id}
                    onClose={(updatedData) => closeEditModal(updatedData)}
                />
            )}

            {isDeleteModalOpen && (<Destroy device={selectedDevice} onClose={closeDeleteModal} />)}

            {isActivateModalOpen && (<Restore device={selectedDevice} onClose={closeActivateModal} />)}

        </div>
    )
}

export default MyListingPage
