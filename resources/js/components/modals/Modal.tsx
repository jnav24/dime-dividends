import React, { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
const d3 = require('d3-ease');

type ModalType = {
	animateCloseModal: boolean;
	handleShowModal: (e: boolean) => void;
	persistent?: boolean;
	show: boolean;
};

const Modal: React.FC<ModalType> = ({
	children,
	animateCloseModal,
	handleShowModal,
	persistent = false,
	show,
}) => {
	const [showContent, setShowContent] = useState(false);

	useEffect(() => {
		if (show) {
			setShowContent(true);
		}
	}, [show]);

	useEffect(() => {
		if (!showContent) {
			setTimeout(() => {
				handleShowModal(false);
			}, 300);
		}
	}, [showContent]);

	useEffect(() => {
	    if (animateCloseModal) {
            setShowContent(false);
        }
    }, [animateCloseModal]);

	const closeModal = () => {
		if (!persistent) {
			setShowContent(false);
		}
	};

	const backgroundAnimation = useSpring({
		config: {
			duration: 250,
			easing: d3.easeExpOut,
		},
		opacity: showContent ? 0.75 : 0,
	});

	const contentAnimation = useSpring({
		config: {
			duration: 300,
			easing: d3.easeQuadInOut,
		},
		opacity: showContent ? 1 : 0,
		transform: showContent ? 'translateY(0)' : 'translateY(45%)',
	});

	return (
		<>
			{show && (
				<div className="fixed z-100 inset-0 overflow-y-auto">
					<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
						<div className="fixed inset-0">
							<animated.div
								style={backgroundAnimation}
								className="absolute inset-0 bg-black"
								onClick={closeModal}
							/>
						</div>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span className="hidden sm:inline-block sm:align-middle sm:h-screen" />
						&#8203;

						<animated.div
							style={contentAnimation}
							className="inline-block align-bottom bg-white overflow-x-hidden rounded-lg text-left shadow-xl sm:my-8 sm:align-middle"
							role="dialog"
							aria-modal="true"
							aria-labelledby="modal-content"
						>
							{children}
						</animated.div>
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;
