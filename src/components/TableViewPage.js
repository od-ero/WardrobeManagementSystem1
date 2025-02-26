import DataTable from 'react-data-table-component';
import React from 'react'

const columns = [
    {

        cell: row => <div className="flex text-gray-800 font-bold w-full">{row.key}</div>,

    },
    {
        cell: row => <div className="text-gray-800 ">{row.value}</div>,
    },

];
const splitedColumns = [
    {
       // width: '10%',
        cell: row => <div className="flex text-gray-800 font-bold ">{row.key}</div>,

    },
    {
        cell: row => <div className="text-gray-800 ">{row.value}</div>,
    },

];

const listingColumns = [
    {
        width: '10%',
        cell: row => <div className="flex text-gray-800 font-bold ">{row.key}</div>,

    },
    {
        cell: row => <div className="text-gray-800 ">{row.value}</div>,
    },

];

const customStyles = {
    rows: {
        style: {
            borderBottom: '1px solid #e5e7eb', // Add border to each row (tr)
        },
        stripedStyle: {
            backgroundColor: '#f8f9fa',
            color: '#333',
        },
    },
    headCells: {
        style: {
            borderBottom: '1px solid #e5e7eb', // Optional: Add border to header cells
        },
    },
    cells: {
        style: {
            borderLeft: '1px solid #e5e7eb', // Border for left side of each cell (td)
            borderRight: '1px solid #e5e7eb', // Border for right side of each cell (td)
        },
    },
    table: {
        //minWidth: 'max-content', // Ensures the table width adjusts to the content
        style: {
            border: '1px solid #e5e7eb', // Optional: Add border to header cells
        },

    },
};

const TableViewPage = ({ data}) => (
    <DataTable
        columns={columns}
        data={data}
        highlightOnHover
        pointerOnHover
        customStyles={customStyles}
        striped
        noTableHead
        className="table-auto inline-block w-auto" />
);

 export const SplitedTableViewPage = ({ data_left, data_right}) => (<div className={`mb-2`}>

     <div className="grid sm:grid-cols-2 sm:space-x-2">
         {data_left && (
         <DataTable
             columns={splitedColumns}
             data={data_left}
             highlightOnHover
             pointerOnHover
             customStyles={customStyles}
             striped
             noTableHead
             className="table-auto inline-block w-auto" />)}
         {data_right && (
         <DataTable
             columns={splitedColumns}
             data={data_right}
             highlightOnHover
             pointerOnHover
             customStyles={customStyles}
             striped
             noTableHead
             className="table-auto inline-block w-auto" />
         )}
     </div>
     </div>
     );

 export const ListingTableViewPage = ({ data}) => (<div className={`mb-2`}>
         {data && (
         <DataTable
             columns={listingColumns}
             data={data}
             highlightOnHover
             pointerOnHover
             customStyles={customStyles}
             striped
             noTableHead
             className="table-auto inline-block w-auto" />)}

     </div>
     );

 export const ViewTablePage = ({ data, columns}) => (<div className={`mb-2`}>
         {data && (
         <DataTable
             columns={columns}
             data={data}
             highlightOnHover
             pointerOnHover
             customStyles={customStyles}
             striped
            // noTableHead
             className="table-auto inline-block w-auto" />)}

     </div>
     );

     export default TableViewPage;
