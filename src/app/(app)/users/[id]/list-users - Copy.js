'use client'

import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { listUsersConditionally } from '@/hooks/users'
import Button from '@/components/DropdownSplit'
import Dropdown from '@/components/DropdownSplitButton'
import DropdownLink, { DropdownButton } from '@/components/DropdownLink'
import { Header } from '@/app/commonVariable'
import Edit, { Destroy, Preview, Restore } from '@/app/(app)/users/users_modals'
import { Floating_select } from '@/components/Floating_Form_input'

const MyListingPage = ({ page_id }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState(null)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isActivateModalOpen, setIsActivateModalOpen] = useState(false)

    const pageOptions = [
        { value: 'list-active', label: 'List Active' },
        { value: 'list-inactive', label: 'List Inactive' }]

    const [filter, setFilter] = useState(page_id)

    const { users, data_mutate, loading: activeLoading } = listUsersConditionally(filter)


    const active_user = 'Active Users'
    const inactive_user = 'Inactive Users'

    const [pageTitle, setPageTitle] = useState('')
    useEffect(() => {
        if (page_id === 'list-active') {
            document.title = active_user
            setPageTitle(active_user)
        } else if (page_id === 'list-inactive') {
            document.title = inactive_user
            setPageTitle(inactive_user)
        }
    }, [page_id])


    const handleFilterChange = (selectedOption) => {
        const filter_type = selectedOption?.value
        setFilter(filter_type)
        if (filter_type === 'list-active') {
            document.title = active_user
            setPageTitle(active_user)

        } else {
            document.title = inactive_user
            setPageTitle(inactive_user)
        }
    }

    const openModal = (user) => {
        //console.log('user  :' + JSON.stringify(user, null, 2))
        setSelectedUserId(user);
        setIsModalOpen(true)

    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedUserId(null)
    }
    const openEditModal = (user_id) => {
        setSelectedUserId(user_id)
        setIsEditModalOpen(true)
    }

    const closeEditModal = (updatedData) => {
        const user_id = selectedUserId // Get the selected user ID
        if (!user_id) return // If no user is selected, do nothing

        if (users) {
            const updatedDataList = users.map((row) =>
                row.id === user_id ? { ...row, ...updatedData } : row,
            )
            data_mutate(updatedDataList, false)
            setIsEditModalOpen(false)
            setSelectedUserId(null)
        }
    }


    const openDeleteModal = (user_id) => {
        setSelectedUserId(user_id)
        setIsDeleteModalOpen(true)

    }

    const closeDeleteModal = (response) => {
        const user_id = selectedUserId.id
        if (response == 'success') {
            const updatedDataList = users.filter((row) => row.id !== user_id);
            data_mutate(updatedDataList, false)
        }

        setIsDeleteModalOpen(false)
        setSelectedUserId(null)

    }

    const openActivateModal = (user_id) => {
        setSelectedUserId(user_id)
        setIsActivateModalOpen(true)

    }

    const closeActivateModal = (response) => {
        const user_id = selectedUserId.id
            if (response == 'success') {
                const updatedDataList = users.filter((row) => row.id !== user_id);
                data_mutate(updatedDataList, false)
        }
        setIsActivateModalOpen(false)
        setSelectedUserId(null)
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

            <DropdownLink href={`/users/${row.id}`}>View</DropdownLink>

            <DropdownButton onClick={() => openEditModal(row.id)}>Edit</DropdownButton>

            {row.deleted_at  ?
                (<DropdownButton onClick={() => openActivateModal(row)}>
                    Activate
                </DropdownButton>)

           : (<DropdownButton onClick={() => openDeleteModal(row)}>Delete</DropdownButton>)}

        </Dropdown>
        </div>
    )

    const columns = [
        {
            name: <div className="text-yellow-500 font-medium">#</div>,
            width: '5%',
            sortable: true,
            cell: (row, rowIndex) => <div>{rowIndex + 1}</div>,
        },
        {
            name: <div className="text-yellow-500 font-medium">Name</div>,
            selector: (row) => row.first_name,
            sortable: true,
            cell: (row) => <div className="text-gray-800">{`${row.first_name} ${row.last_name}`}</div>,
        },
        {
            name: <div className="text-yellow-500 font-medium">Details</div>,
            selector: (row) => row.email,
            sortable: true,
            cell: (row) => (
                <div className="flex text-blue-900 font-medium">
                    {row.phone}
                    <br />
                    {row.email}
                </div>
            ),
            wrap: true,
        },
        {
            name: <div className="text-yellow-500 font-medium">Permission Level</div>,
            selector: (row) => row.role_id,
            sortable: true,
            cell: (row) => <div className="text-green-600 font-semibold">{row.role_id}</div>,
        },
        {
            name: <div className="text-yellow-500 font-medium">Action</div>,
            cell: (row) => (
                <div className="flex items-center space-x-0">
                    <CustomdropDown   row={{
                        id: row.id,
                       name: row.first_name + `  ` + row.last_name,
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
                           data={users}
                           highlightOnHover
                           pointerOnHover
                           pagination
                           striped
                           noTableHead
                           keyField="id"
                />
            ) : (
                <p>Loading active users...</p>
            )}

            {isModalOpen && (
                <Preview user={selectedUserId}
                         openEditModal = {openEditModal}
                         openActivateModal = {openActivateModal}
                         openDeleteModal = {openDeleteModal}
                         onClose={closeModal} />
            )}

            {isEditModalOpen && (
                <Edit
                    user_id={selectedUserId}
                    onClose={(updatedData) => closeEditModal(updatedData)}
                />
            )}

            {isDeleteModalOpen && (<Destroy user={selectedUserId} onClose={closeDeleteModal} />)}

            {isActivateModalOpen && (<Restore user={selectedUserId} onClose={closeActivateModal} />)}

        </div>
    )
}

export default MyListingPage
