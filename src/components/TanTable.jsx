import React, { useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';

import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
const TanTable = ({ data, columns }) => {
    const [filter, setFilter] = useState('');
    const [sorting, setSorting] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(0);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            globalFilter: filter, // Pass the filter state
            sorting, // Pass the sorting state
            pagination: {
                pageIndex,
                pageSize,
            },
        },
        onGlobalFilterChange: setFilter,
        onSortingChange: setSorting,
        onPaginationChange: (updater) => {
            const newPagination = updater({
                pageIndex,
                pageSize,
            });
            setPageIndex(newPagination.pageIndex);
            setPageSize(newPagination.pageSize);
        },
    });

    // Export to Excel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'table_data.xlsx');
    };

    // Export to PDF
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [columns.map((col) => col.header)], // headers from columns
            body: data.map((row) => columns.map((col) => row[col.id])), // map data to column accessors
        });
        doc.save('table_data.pdf');
    };

    const printTable = () => {
        // Create a div element to hold the content for printing
        const printContent = document.createElement('div');
        printContent.innerHTML = document.querySelector('table').outerHTML;

        // Add some custom styles to format the print content
        const printStyle = `
        <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            @media print {
                body { visibility: hidden; }
                .print-content { visibility: visible; }
            }
        </style> `;

        // Create an inline frame for printing
        const iframe = document.createElement('iframe');
        iframe.style.position = 'absolute';
        iframe.style.width = '0px';
        iframe.style.height = '0px';
        iframe.style.border = 'none';
        document.body.appendChild(iframe);

        const iframeDoc = iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write('<html><head>' + printStyle + '</head><body class="print-content">' + printContent.innerHTML + '</body></html>');
        iframeDoc.close();

        // Trigger the print dialog
        iframe.contentWindow.focus();
        iframe.contentWindow.print();

        // Clean up the iframe after printing
        setTimeout(() => {
            document.body.removeChild(iframe);
        }, 1000);
    };


    return (
        <div className="relative">

            <table className="table-auto w-full border-collapse">
                <thead className="bg-gray-200 sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header, index) => (
                            // Render the last header cell with search input


                            /*<th
                             key={header.id}
                             className={`pl-2 py-2 border-b cursor-pointer text-left ${index === headerGroup.headers.length - 1 ? 'relative' : ''}`}
                                >*/

                            <th
                                key={header.id}
                                className={`pl-2 py-2 border-b cursor-pointer text-left ${index === headerGroup.headers.length - 1 ? 'relative' : ''}`}
                                onClick={() => {
                                    const isSorted = sorting[0]?.id === header.id
                                    const direction = isSorted && sorting[0]?.desc ? false : true
                                    setSorting([{ id: header.id, desc: direction }]) // Update sorting state directly
                                }}
                            >

                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {index === headerGroup.headers.length - 1 && (
                                    <div className="absolute top-0 right-0 mr-2 mt-1">


                                        <input
                                            type="text"
                                            value={filter}
                                            onChange={(e) => setFilter(e.target.value)}
                                            placeholder="Search..."
                                            className="p-1 border rounded "
                                        />

                                    </div>
                                )}

                                <span>
                                        {header.column.getIsSorted()
                                            ? header.column.getIsSorted() === 'asc'
                                                ? ' 🔼'
                                                : ' 🔽'
                                            : null}
                                    </span>



                            </th>
                        ))}
                    </tr>
                ))}
                </thead>

                <tbody>
                {table.getRowModel().rows.map((row, index) => (
                    <tr key={row.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="pl-2 py-2 border-b">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>


            {/* Pagination Controls */}
            <div className="flex justify-between mt-4">

                <div>
                    <button
                        onClick={() => setPageIndex((old) => Math.max(old - 1, 0))}
                        disabled={!table.getCanPreviousPage()}
                        className="p-2 mx-5 bg-gray-50 border-2  text-black rounded hover:bg-blue-600 hover:text-white"
                    >
                        Previous
                    </button>

                    <button
                        onClick={() => setPageIndex((old) => Math.min(old + 1, table.getPageCount() - 1))}
                        disabled={!table.getCanNextPage()}
                        className="p-2 mx-5 bg-gray-50 border-2  text-black rounded hover:bg-blue-600 hover:text-white"
                    >
                        Next
                    </button>
                </div>

                <div>
                    <span>Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</span>
                </div>

                <div>
                    <select
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        className="p-2 border rounded"
                    >
                        {[100, 200, 300, 400,500].map((size) => (
                            <option key={size} value={size}>
                                Show {size} rows
                            </option>
                        ))}
                    </select>
                </div>
            </div>


            <br /> <br />
            {/* Export Buttons */}
            <div className="flex justify-start mb-4">
                <button
                    onClick={exportToExcel}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                >
                    Export to Excel
                </button>
                <button
                    onClick={exportToPDF}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
                >
                    Export to PDF
                </button>
                <button
                    onClick={printTable}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Print
                </button>
            </div>


        </div>
    )
        ;
};

export default TanTable;
