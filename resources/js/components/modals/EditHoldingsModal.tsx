import React, {useState} from 'react';

import Modal from './Modal';
import CustomButton from '../ui-elements/form/CustomButton';
import FormContextProvider from '../ui-elements/form/FormContextProvider';

type Props = {
    handleShowModal: (e: boolean) => void;
    show: boolean;
};

const EditHoldingsModal: React.FC<Props> = ({ handleShowModal, show }) => {
    const [animateCloseModal, setAnimateCloseModal] = useState(false);
    const [isValid, setIsValid] = useState(false);

    return (
        <Modal handleShowModal={handleShowModal} show={show} animateCloseModal={animateCloseModal}>
            <div className="w-200">
                <div className="bg-gray-100 pl-2 py-2 text-2xl text-gray-700 font-header">
                    Update Holding
                </div>

                <FormContextProvider
                    valid={isValid}
                    handleUpdateValid={setIsValid}
                >
                    <div className="py-4 px-2">
                        Content here
                    </div>

                    <div className="bg-gray-100 flex-row flex justify-end py-2">
                        <CustomButton
                            handleClick={() => setAnimateCloseModal(true)}
                            ignoreValidation
                        >
                            Cancel
                        </CustomButton>

                        <CustomButton
                            color="secondary"
                            handleClick={() => setAnimateCloseModal(true)}
                            isDisabled={!isValid}
                        >
                            Update
                        </CustomButton>
                    </div>
                </FormContextProvider>
            </div>
        </Modal>
    );
};

export default EditHoldingsModal;
