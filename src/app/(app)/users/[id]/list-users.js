'use client'

import EditAdd, { Preview as PreviewUserBranch } from '@/app/(app)/users/user-organization-branches/modals'
import Edit, { Destroy, Preview, Restore } from '@/app/(app)/users/users_modals'
import { Header } from '@/app/commonVariable'
import DropdownLink, { DropdownButton } from '@/components/DropdownLink'
import Button from '@/components/DropdownSplit'
import Dropdown from '@/components/DropdownSplitButton'
import { Floating_select } from '@/components/Floating_Form_input'
import TanTable from '@/components/TanTable'
import { listUsersConditionally } from '@/hooks/users'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const MyListingPage = ({ page_id }) => {

    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState(null)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isActivateModalOpen, setIsActivateModalOpen] = useState(false)
    const [isPreviewUserBrancheModalOpen, setIsPreviewUserBranchModalOpen] = useState(false)
    const [isEditAddUserBrancheModalOpen, setIsEditAddUserBranchModalOpen] = useState(false)

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

    const closePreviewUserBranchModal = () => {
        setIsPreviewUserBranchModalOpen(false)
        setSelectedUserId(null)
    }
    const openPreviewUserBranchModal = (user) => {
        //console.log('user  :' + JSON.stringify(user, null, 2))
        setSelectedUserId(user);
        setIsPreviewUserBranchModalOpen(true)

    }
    const openEditAddUserBranchModal = (user) => {
        //console.log('user  :' + JSON.stringify(user, null, 2))

        setSelectedUserId(user?.id);
        setIsEditAddUserBranchModalOpen(true)

    }
    const closeEditAddUserBranchModal = () => {
        //console.log('user  :' + JSON.stringify(user, null, 2))
        data_mutate();
        setSelectedUserId(null);
        setIsEditAddUserBranchModalOpen(false);

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

            <DropdownLink href={`/users/${row?.id}`}>View</DropdownLink>

            <DropdownButton onClick={() => openEditModal(row?.id)}>Edit</DropdownButton>

            {row.deleted_at  ?
                (<DropdownButton onClick={() => openActivateModal(row)}>
                    Activate
                </DropdownButton>)

           : (<>

                <DropdownButton onClick={() => router.push(`/users/user-organization-branches/${row?.id}`)}>View Branches</DropdownButton>
                    <DropdownButton onClick={() => openEditAddUserBranchModal(row)}>Add/ Edit Branch</DropdownButton>
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
            accessorKey: 'first_name',
            enableSorting: true,
            header: 'Name',
            cell: ({ row }) => <div>{`${row.original.first_name} ${row.original.last_name}`}</div>,
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
                            name: row.original.first_name+'  '+row.original.last_name,
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
                    data={users}
                />
               /* <DataTable columns={columns}
                           data={users}
                           highlightOnHover
                           pointerOnHover
                           pagination
                           striped
                           noTableHead
                           keyField="id"
                />*/
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
            {isEditAddUserBrancheModalOpen && (
                <EditAdd
                   user_id={selectedUserId}
                    onClose={() => closeEditAddUserBranchModal()}
                />
            )}
            {isPreviewUserBrancheModalOpen && (
                <PreviewUserBranch
                    user={selectedUserId}

                   // openEditAddModal={() => closePreviewUserBranchModal()}
                    onClose={() => closePreviewUserBranchModal()}
                />
            )}

            {isDeleteModalOpen && (<Destroy user={selectedUserId} onClose={closeDeleteModal} />)}

            {isActivateModalOpen && (<Restore user={selectedUserId} onClose={closeActivateModal} />)}

        </div>
    )
}

export default MyListingPage
