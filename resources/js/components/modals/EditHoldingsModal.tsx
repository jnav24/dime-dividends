import React, {useState} from 'react';

import Modal from './Modal';

type Props = {
    handleShowModal: (e: boolean) => void;
    show: boolean;
};

const EditHoldingsModal: React.FC<Props> = ({ handleShowModal, show }) => {
    const [animateCloseModal, setAnimateCloseModal] = useState(false);

    return (
        <Modal handleShowModal={handleShowModal} show={show} animateCloseModal={animateCloseModal}>
            <div className="w-200">
                content here
            </div>
        </Modal>
    );
};
