import React, {useState} from 'react';

import Modal from './Modal';
import CustomButton from '../ui-elements/form/CustomButton';
import CustomRadio from '../ui-elements/form/CustomRadio';
import FormContextProvider from '../ui-elements/form/FormContextProvider';
import CustomRadioGroup from '../ui-elements/form/CustomRadioGroup';

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
                    <div className="py-4 px-2 flex flex-row justify-between items-start">
                        <div>
                            Name/Ticker
                            Current Price
                            Quantity
                        </div>

                        <div>
                            <CustomRadioGroup label="Order Type" row defaultValue="bought">
                                <CustomRadio label="Bought" value="bought" />
                                <CustomRadio label="Sold" value="sold" />
                            </CustomRadioGroup>
                            Cost
                            Amount
                        </div>
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
