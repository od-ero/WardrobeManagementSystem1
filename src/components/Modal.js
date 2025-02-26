import React, { useState } from 'react'
export const ModalHeader = ({ modalHeader, onClose }) => {
    return (<>
    <div className="flex items-center p-4 md:p-5 border-b rounded-t dark:border-gray-600 relative">

        <h3 className="absolute left-0 right-16 text-xl font-semibold text-gray-900 dark:text-white text-center">
            {modalHeader}
        </h3>

        <button
            onClick={onClose}
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
            ✕
            <span className="sr-only">Close modal</span>
        </button>
        </div>
        </>
    );
};


export const ModalFooter = ({ modalButtons, onClose }) => {
    return (
        <div
            className="flex items-center justify-evenly  p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            {modalButtons}
            <button
                onClick={onClose}
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
                Close
            </button>
        </div>
    );
};


const Modal = ({ isOpen, onClose, modalBody, modalHeader, modalButtons }) => {
    if (!isOpen) return null;

    return (
        <div
            id="default-modal"
            tabIndex="-1"
            aria-hidden="false"
            className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50 overflow-y-auto"
           >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <ModalHeader modalHeader={modalHeader} onClose={onClose}/>
                    <div className="p-4 md:p-5 space-y-4">{modalBody}</div>
                    <ModalFooter modalButtons={modalButtons} onClose={onClose} />

                </div>
            </div>
        </div>
    );
};

export default Modal;


