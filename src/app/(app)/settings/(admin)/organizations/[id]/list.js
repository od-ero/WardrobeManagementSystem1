'use client'

import React, { useState, useEffect } from 'react'
import TanTable from '@/components/TanTable'
import { useOrganizations } from '@/hooks/organiztions/organizations'
import Button from '@/components/DropdownSplit'
import Dropdown from '@/components/DropdownSplitButton'
import DropdownLink, { DropdownButton } from '@/components/DropdownLink'
import { Header } from '@/app/commonVariable'
import Edit, { Destroy, Preview, Restore } from '@/app/(app)/settings/(admin)/organizations/modals'

import CreateBranch from '@/app/(app)/settings/(admin)/organization_branches/modals'
import { Floating_select } from '@/components/Floating_Form_input'

const MyListingPage = ({ page_id }) => {
    const { listOrganizations } = useOrganizations();
    const [isPreviewModalOpen, setisPreviewModalOpen] = useState(false)
    const [selectedOrganization, setSelectedOrganization] = useState(null)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isCreateBranchModalOpen, setIsCreateBranchModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isActivateModalOpen, setIsActivateModalOpen] = useState(false)

    const pageOptions = [
        { value: 'list-active', label: 'List Active' },
        { value: 'list-inactive', label: 'List Inactive' }]

    const [filter, setFilter] = useState(page_id)

    const { data:organizations, data_mutate, loading: activeLoading } = listOrganizations(filter)


    const active_organization = 'Active Organizations'
    const inactive_organization = 'InactiveOrganizations'

    const [pageTitle, setPageTitle] = useState('')
    useEffect(() => {
        if (page_id === 'list-active') {
            document.title = active_organization
            setPageTitle(active_organization)
        } else if (page_id === 'list-inactive') {
            document.title = inactive_organization
            setPageTitle(inactive_organization)
        }
    }, [page_id])


    const handleFilterChange = (selectedOption) => {
        const filter_type = selectedOption?.value
        setFilter(filter_type)
        if (filter_type === 'list-active') {
            document.title = active_organization
            setPageTitle(active_organization)

        } else {
            document.title = inactive_organization
            setPageTitle(inactive_organization)
        }
    }

    const openModal = (organization) => {
        //console.log('organization  :' + JSON.stringify(organization, null, 2))
        setSelectedOrganization(organization);
        setisPreviewModalOpen(true)

    }

    const closeModal = () => {
        setisPreviewModalOpen(false)
        setSelectedOrganization(null)
    }
    const openEditModal = (organization) => {
        setSelectedOrganization(organization)
        setIsEditModalOpen(true)
    }

    const closeEditModal = (updatedData) => {
        const organization_id = selectedOrganization.id // Get the selected organization ID
        if (!organization_id) return // If no organization is selected, do nothing

        if (organizations) {
            const updatedDataList = organizations.map((row) =>
                row.id === organization_id ? { ...row, ...updatedData } : row,
            )
            data_mutate(updatedDataList, false)
            setIsEditModalOpen(false)
            setSelectedOrganization(null)
        }
    }
    const openCreateBranchModal = (organization) => {
        setSelectedOrganization(organization)
       setIsCreateBranchModalOpen(true)
    }

    const closeCreateBranchModal = (updatedData) => {
        const organization_id = selectedOrganization.id // Get the selected organization ID
       /* if (!organization_id) return // If no organization is selected, do nothing

        if (organizations) {
            const updatedDataList = organizations.map((row) =>
                row.id === organization_id ? { ...row, ...updatedData } : row,
            )*/
        //    data_mutate(updatedDataList, false)
            setIsCreateBranchModalOpen(false)
            setSelectedOrganization(null)
       // }
    }


    const openDeleteModal = (organization) => {
        setSelectedOrganization(organization)
        setIsDeleteModalOpen(true)

    }

    const closeDeleteModal = (response) => {
        const organization_id = selectedOrganization.id
        if (response == 'success') {
            const updatedDataList = organizations.filter((row) => row.id !== organization_id);
            data_mutate(updatedDataList, false)
        }

        setIsDeleteModalOpen(false)
        setSelectedOrganization(null)

    }

    const openActivateModal = (organization) => {
        setSelectedOrganization(organization)
        setIsActivateModalOpen(true)

    }

    const closeActivateModal = (response) => {
        const organization_id = selectedOrganization.id
            if (response == 'success') {
                const updatedDataList = organizations.filter((row) => row.id !== organization_id);
                data_mutate(updatedDataList, false)
        }
        setIsActivateModalOpen(false)
        setSelectedOrganization(null)
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

            <DropdownLink href={`/settings/organizations/${row.id}`}>View</DropdownLink>
            <DropdownLink href={`/settings/organization_branches?org_id=${row.id}`}>Branches</DropdownLink>
            <DropdownButton onClick={() => openEditModal(row)}>Edit</DropdownButton>

            {row.deleted_at  ?
                (<DropdownButton onClick={() => openActivateModal(row)}>
                    Activate
                </DropdownButton>)

                : (<><DropdownButton onClick={() => openCreateBranchModal(row)}>Add Branch</DropdownButton><DropdownButton onClick={() => openDeleteModal(row)}>Delete</DropdownButton></>)}

        </Dropdown>
        </div>
    )

    const columns = [
        {
            accessorKey: 'index',
            enableSorting: true,
            header: '#',
            cell: ({ row }) => <div>{row.index+1}</div>, // Use `row.index`
        },
        {
            accessorKey: 'name',
            enableSorting: true,
            header: 'Name',
            cell: ({ row }) => <div>{row.original.name}</div>,
        },
        {
            accessorKey: 'code',
            enableSorting: true,
            header: 'Code',
            cell: ({ row }) => <div>{row.original.code}</div>,
        },
        {
            accessorKey: 'branches_count',
            enableSorting: true,
            header: 'Branches',
            cell: ({ row }) => (
                <div>
                    <a
                        className="text-blue-500 hover:text-blue-700 hover:underline"
                        href={`/settings/organization_branches?org_id=${row.original.id}`}
                    >
                        {row.original.branches_count}
                    </a>
                </div>
            ),
        },
        {
            accessorKey: 'devices_count',
            enableSorting: true,
            header: 'Devices',
            cell: ({ row }) => <div>{row.original.devices_count}</div>,
        },
        {
            accessorKey: 'details',
            enableSorting: false,
            header: 'Details',
            cell: ({ row }) => <div>
                {row.original.phone}<br />{row.original.email}</div>,
        },
        {
            accessorKey: 'action',
            header: '',
            cell: ({ row }) => (
                <div className="flex items-center space-x-0">
                    <CustomdropDown
                        row={{
                            id: row.original.id,
                            name: row.original.name,
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

                <div className=" ml-auto p-8 relative  z-20">
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
                    data={organizations}
                />
            ) : (
                <p>Loading active organizations...</p>
            )}

            {isPreviewModalOpen && (
                <Preview organization={selectedOrganization}
                         openEditModal = {openEditModal}
                         openActivateModal = {openActivateModal}
                         openDeleteModal = {openDeleteModal}
                         onClose={closeModal} />
            )}

            {isEditModalOpen && (
                <Edit
                    organization_id ={ selectedOrganization.id }
                    onClose={(updatedData) => closeEditModal(updatedData)}
                />
            )}


            {isDeleteModalOpen && (<Destroy organization={selectedOrganization} onClose={closeDeleteModal} />)}

            {isActivateModalOpen && (<Restore organization={selectedOrganization} onClose={closeActivateModal} />)}

        </div>
    )
}

export default MyListingPage
