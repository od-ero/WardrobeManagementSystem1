'use client'

import React, { useState, useEffect } from 'react'
import TanTable from '@/components/TanTable'
import { useHook } from '@/hooks/organiztions/organization_branches'
import { useOrganizations } from '@/hooks/organiztions/organizations'
import Button from '@/components/DropdownSplit'
import Dropdown from '@/components/DropdownSplitButton'
import DropdownLink, { DropdownButton } from '@/components/DropdownLink'
import { Header } from '@/app/commonVariable'
import { Edit, Destroy, Preview, Restore } from '@/app/(app)/settings/(admin)/organization_branches/modals'
import { Floating_select } from '@/components/Floating_Form_input'
import LoadingModal from '@/components/LoadingModal'
import { useRouter } from 'next/navigation'

const MyListingPage = ({ organization_id:pass_org_id }) => {
    const router = useRouter();
    const { list } = useHook();
    const { listOrganizationNames } = useOrganizations();
    // Combine loading states into one
    let { data: organizationNames, loading: loadingNames } = listOrganizationNames();


    const [isPreviewModalOpen, setisPreviewModalOpen] = useState(false)
    const [selectedBranch, setSelectedBranch] = useState(null)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isActivateModalOpen, setIsActivateModalOpen] = useState(false)
    const [organization_id, setOrganizationId] = useState(pass_org_id)

    const pageOptions = [
        { value: 'list-active', label: 'List Active' },
        { value: 'list-inactive', label: 'List Inactive' }
    ]

    const [filter, setFilter] = useState('list-active')
    let { data: organizations, data_mutate, loading: loadingOrganizations } = list(organization_id, filter);


    let loading = loadingNames || loadingOrganizations
   /* let { data:organizations, data_mutate, loading } = list(organization_id,filter)*/


    const active_organization = 'Active Organization - Branches'
    const inactive_organization = 'Inactive Organization - Branches'

    const [pageTitle, setPageTitle] = useState(active_organization)
   /* useEffect(() => {
        if (page_id === 'list-active') {
            document.title = active_organization
            setPageTitle(active_organization)
        } else if (page_id === 'list-inactive') {
            document.title = inactive_organization
            setPageTitle(inactive_organization)
        }
    }, [page_id])*/


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
        setSelectedBranch(organization);
        setisPreviewModalOpen(true)

    }

    const closeModal = () => {
        setisPreviewModalOpen(false)
        setSelectedBranch(null)
    }
    const openEditModal = (organization) => {
        setSelectedBranch(organization)
        setIsEditModalOpen(true)
    }

    const closeEditModal = (updatedData) => {
        const organization_id = selectedBranch.id // Get the selected organization ID
        if (!organization_id) return // If no organization is selected, do nothing

        if (organizations) {
            const updatedDataList = organizations.map((row) =>
                row.id === organization_id ? { ...row, ...updatedData } : row,
            )
            data_mutate(updatedDataList, false)
            setIsEditModalOpen(false)
            setSelectedBranch(null)
        }
    }


    const openDeleteModal = (organization) => {
        setSelectedBranch(organization)
        setIsDeleteModalOpen(true)

    }

    const closeDeleteModal = (response) => {
        const organization_id = selectedBranch.id
        if (response == 'success') {
            const updatedDataList = organizations.filter((row) => row.id !== organization_id);
            data_mutate(updatedDataList, false)
        }

        setIsDeleteModalOpen(false)
        setSelectedBranch(null)

    }

    const openActivateModal = (organization) => {
        setSelectedBranch(organization)
        setIsActivateModalOpen(true)

    }

    const closeActivateModal = (response) => {
        const organization_id = selectedBranch.id
            if (response == 'success') {
                const updatedDataList = organizations.filter((row) => row.id !== organization_id);
                data_mutate(updatedDataList, false)
        }
        setIsActivateModalOpen(false)
        setSelectedBranch(null)
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
            <DropdownButton onClick={() => router.push(`/settings/organization_branches?branch_id=${row.id}`)}>View</DropdownButton>
            <DropdownButton onClick={() => openEditModal(row)}>Edit</DropdownButton>

            {row.deleted_at  ?
                (<DropdownButton onClick={() => openActivateModal(row)}>
                    Activate
                </DropdownButton>)

           : (<> <DropdownButton onClick={() => router.push(`/settings/login-links?branch_id=${row.id}`)}>Login URL</DropdownButton>
                    <DropdownButton onClick={() => openDeleteModal(row)}>Delete</DropdownButton>
                </>)}

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
            accessorKey: 'details',
            enableSorting: false,
            header: 'Details',
            cell: ({ row }) => <div>
                {row.original.phone}<br />{row.original.email}</div>,
        },
        {
            accessorKey: 'devices_count',
            enableSorting: false,
            header: 'Devices',
            cell: ({ row }) => <div>
                {row.original.devices_count}</div>,
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

    if (loading) {
        return (
            <LoadingModal
                /*  onClose={() => onClose(null)}
                  closeModal = { onClose }*/
            />
        );
    }
    return (
        <div>
            <div className={'flex items-center justify-between'}>
                <div className={`mx-auto`}>
                    <Header title={pageTitle} />
                </div>

                <div className=" flex flex-nowrap ml-auto p-8 space-x-2  z-20">


                    <Floating_select
                        id="organization_id"
                        input_label="Organization"
                        placeholder="Select Organization"
                        options={ organizationNames}
                        value={organization_id ? organizationNames.find((organizationName) => organizationName.value === organization_id) : null}
                        onChange={(selectedOption) => {
                            setOrganizationId(selectedOption?.value);
                        }}
                        instanceId="permissionlevel-select-instance"
                    />
                    <Floating_select
                        id="role_id"
                        input_label="Status"
                        placeholder="Select Filter"
                        options={pageOptions}
                        value={filter ? pageOptions.find((pageOption) => pageOption.value === filter) : null}
                        onChange={handleFilterChange}
                    />
                </div>
            </div>
           {/* {!activeLoading ? (*/}
                <TanTable
                    columns={columns}
                    data={organizations}
                />


            {isPreviewModalOpen && (
                <Preview branch={selectedBranch}
                         openEditModal = {openEditModal}
                         openActivateModal = {openActivateModal}
                         openDeleteModal = {openDeleteModal}
                         onClose={closeModal} />
            )}

            {isEditModalOpen && (
                <Edit
                    branch_id ={ selectedBranch.id }
                    onClose={(updatedData) => closeEditModal(updatedData)}
                />
            )}

            {isDeleteModalOpen && (<Destroy branch={selectedBranch} onClose={closeDeleteModal} />)}

            {isActivateModalOpen && (<Restore branch={selectedBranch} onClose={closeActivateModal} />)}

        </div>
    )
}

export default MyListingPage
