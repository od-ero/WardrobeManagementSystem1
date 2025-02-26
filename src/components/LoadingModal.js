import React, { useEffect, useState } from 'react'
import Modal from '@/components/Modal'


const LoadingModal = ({  closeModal }) => {

    return (
        <Modal
            isOpen={true}
            onClose={closeModal}
            modalHeader={`Waiting`}
            modalBody={`Loading... be patience`}
            modalButtons={<> </>}
         />
       )


}

export default LoadingModal
