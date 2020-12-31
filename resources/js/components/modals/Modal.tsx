import React from 'react';

type ModalType = {
    show: boolean,
}

const Modal: React.FC<ModalType> = ({ children, show }) => {
    const closeModal = () => {};

    return (
        <>
            {show && (
                <div className="fixed z-100 inset-0 overflow-y-auto">
                    <div
                        className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
                    >
                        <div className="fixed inset-0">
                            <div
                                className="absolute inset-0 bg-black opacity-75"
                                onClick={closeModal}
                            />
                        </div>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        />
                        &#8203;

                        <div
                            className="inline-block align-bottom bg-white overflow-x-hidden rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-content"
                        >
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
