import { useState } from "react";
import ReactModal from "react-modal";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

ReactModal.setAppElement( '#root' );

export const CalendarModal = () => {

    const [ isOpen, setIsOpen ] = useState( true );

    const onCloseModal = () => {
        setIsOpen( false );
    };

    return (
        <ReactModal
            className='modal'
            closeTimeoutMS={ 200 }
            isOpen={ isOpen }
            onRequestClose={ onCloseModal }
            overlayClassName='modal-fondo'
            style={ customStyles }
        >
            <h1>Hola mundo</h1>
            <hr />
            <p>Sunt esse dolor pariatur do amet anim et reprehenderit veniam dolore.</p>
        </ReactModal>
    );
};
