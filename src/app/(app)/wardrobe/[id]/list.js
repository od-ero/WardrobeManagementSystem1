'use client'

import { Destroy, Edit, Preview, Restore } from '@/app/(app)/wardrobe/modals'
import { Header } from '@/app/commonVariable'
import { DropdownButton } from '@/components/DropdownLink'
import Button from '@/components/DropdownSplit'
import Dropdown from '@/components/DropdownSplitButton'
import { Floating_select } from '@/components/Floating_Form_input'
import LoadingModal from '@/components/LoadingModal'
import TanTable from '@/components/TanTable'

import { useHook } from '@/hooks/wardrobe'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const MyListingPage = ({ page_id }) => {
    const router = useRouter();
    const { list, listNames } = useHook();

    const [isPreviewModalOpen, setisPreviewModalOpen] = useState(false)
    const [selectedWardrobe, setSelectedWardrobe] = useState(null)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isActivateModalOpen, setIsActivateModalOpen] = useState(false)
    const [category_id, setCategoryId] = useState('all')
  //  const [wardrobes, setWardrobes] = useState([])

    const pageOptions = [
        { value: 'list-active', label: 'List Active' },
        { value: 'list-inactive', label: 'List Inactive' }
    ]

    const [filter, setFilter] = useState(page_id)
    let { data:wardrobes, data_mutate, loading:wardrobe_loading } = list(category_id, filter);
    const {data:categoryNames , loading: categories_loading} =listNames();

    
   /* let { data:wardrobes, data_mutate, loading } = list(wardrobe_id,filter)*/


    const active_wardrobe = 'Active Wardrobe  Items'
    const inactive_wardrobe = 'Inactive wardrobe'
let intial_title =  page_id == 'list-active' ? active_wardrobe : inactive_wardrobe;
    const [pageTitle, setPageTitle] = useState(intial_title);
//   useEffect(() => {
//       setWardrobes(data);
//     }, [data])
   

    const handleFilterChange = (selectedOption) => {
        const filter_type = selectedOption?.value
        setFilter(filter_type)
        if (filter_type === 'list-active') {
            document.title = active_wardrobe
            setPageTitle(active_wardrobe)

        } else {
            document.title = inactive_wardrobe
            setPageTitle(inactive_wardrobe)
        }
    }

  
    const openModal = (wardrobe) => {
        //console.log('wardrobe  :' + JSON.stringify(wardrobe, null, 2))
        setSelectedWardrobe(wardrobe);
        setisPreviewModalOpen(true)

    }

    const closeModal = () => {
        setisPreviewModalOpen(false)
        setSelectedWardrobe(null)
    }
    const openEditModal = (wardrobe) => {
        setSelectedWardrobe(wardrobe)
        setIsEditModalOpen(true)
    }

    const closeEditModal = (updatedData) => {
        const wardrobe_id = selectedWardrobe.id // Get the selected wardrobe ID
        if (!wardrobe_id) return // If no wardrobe is selected, do nothing

        if (wardrobes) {
            const updatedDataList = wardrobes.map((row) =>
                row.id === wardrobe_id ? { ...row, ...updatedData } : row,
            )
            data_mutate(updatedDataList, false)
            setIsEditModalOpen(false)
            setSelectedWardrobe(null)
        }
    }


    const openDeleteModal = (wardrobe) => {
        setSelectedWardrobe(wardrobe)
        setIsDeleteModalOpen(true)

    }

    const closeDeleteModal = (response) => {
        const wardrobe_id = selectedWardrobe.id
        if (response == 'success') {
            const updatedDataList = wardrobes.filter((row) => row.id !== wardrobe_id);
            data_mutate(updatedDataList, false)
        }

        setIsDeleteModalOpen(false)
        setSelectedWardrobe(null)

    }

    const openActivateModal = (wardrobe) => {
        setSelectedWardrobe(wardrobe)
        setIsActivateModalOpen(true)

    }

    const closeActivateModal = (response) => {
        const wardrobe_id = selectedWardrobe.id
            if (response == 'success') {
                const updatedDataList = wardrobes.filter((row) => row.id !== wardrobe_id);
                data_mutate(updatedDataList, false)
        }
        setIsActivateModalOpen(false)
        setSelectedWardrobe(null)
    }

    // const filterCategory = (category_id) => {
    //     setCategoryId(category_id);
    
    //     const filteredData = wardrobes.filter((item) =>
    //         item.category_id === category_id
    //     );
    
    //     setWardrobes(filteredData); // Update state properly
    // };

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
            <DropdownButton onClick={() => router.push(`/wardrobe/${row.id}`)}>View</DropdownButton>
            <DropdownButton onClick={() => openEditModal(row)}>Edit</DropdownButton>

            {row.deleted_at  ?
                (<DropdownButton onClick={() => openActivateModal(row)}>
                    Activate
                </DropdownButton>)

           : (<>
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
            accessorKey: 'category.name',
            enableSorting: true,
            header: 'Category',
            cell: ({ row }) => <div>{row.original.category.name}</div>,
        },
        {
            accessorKey: 'pattern',
            enableSorting: true,
            header: 'Pattern',
            cell: ({ row }) => <div>{row.original.pattern}</div>,
        },
        {
            accessorKey: 'color',
            enableSorting: false,
            header: 'Color',
            cell: ({ row }) => <div>{row.original.color}</div>,
        },
     
        {
            accessorKey: 'action',
            header: '',
            cell: ({ row }) => (
                <div className="flex items-center justify-end pr-2 mr-2 ">
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
    const loading =  categories_loading || wardrobe_loading;

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


                    {/* <Floating_select
                        id="category_id"
                        input_label="Category"
                        placeholder="Filter"
                        options={ categoryNames }
                        value={category_id ? categoryNames.find((categoryName) => categoryName.value === category_id) : null}
                        onChange={(selectedOption) => {
                            
                            filterCategory(selectedOption?.value);
                        }}
                        instanceId="category-select-instance"
                    /> */}
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
                    data={wardrobes}
                />


            {isPreviewModalOpen && (
                <Preview wardrobe={selectedWardrobe}
                         openEditModal = {openEditModal}
                         openActivateModal = {openActivateModal}
                         openDeleteModal = {openDeleteModal}
                         onClose={closeModal} />
            )}

            {isEditModalOpen && (
                <Edit
                    wardrobe_id ={ selectedWardrobe.id }
                    onClose={(updatedData) => closeEditModal(updatedData)}
                />
            )}

            {isDeleteModalOpen && (<Destroy wardrobe={selectedWardrobe} onClose={closeDeleteModal} />)}

            {isActivateModalOpen && (<Restore wardrobe={selectedWardrobe} onClose={closeActivateModal} />)}

        </div>
    )
}

export default MyListingPage
