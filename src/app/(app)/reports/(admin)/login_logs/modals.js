
import Modal from '@/components/Modal'
import React from 'react'
import ViewBody from '@/app/(app)/reports/(admin)/login_logs/[id]/view_body'




export const Preview = ({log, onClose }) =>{
    return (
        <Modal
            isOpen={ true }
            onClose={ onClose }
            modalHeader={`Preview Login Log For - ${log.user_name} ` }
            modalBody={<ViewBody isModal={true} log_id={log.id} id= {log.id} />}
            modalButtons={false}
        />
    );
}
export default Preview;

