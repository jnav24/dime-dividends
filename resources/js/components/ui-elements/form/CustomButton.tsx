import React, { useContext } from 'react';
import { FormContext } from './FormContextProvider';

type CustomButtonType = {
	block?: boolean;
	checkbox?: boolean;
	color?: string;
	fab?: boolean;
	handleClick?: () => void;
	ignoreValidation?: boolean;
	isDisabled?: boolean;
	submit?: boolean;
};

const CustomButton: React.FC<CustomButtonType> = ({
	block = false,
	checkbox = false,
	children,
	color = 'default',
	fab = false,
	handleClick = () => null,
	ignoreValidation = false,
	isDisabled = false,
	submit = false,
}) => {
	const formContext = useContext(FormContext);

	const getButtonStyles = () => {
		let styles =
			'focus:outline-none focus:shadow-outline transition duration-150 ';

		if (!isDisabled) {
			switch (color) {
				case 'primary':
					styles =
						'bg-primary hover:bg-opacity-85 active:bg-dark-primary text-white ';
					break;
				case 'secondary':
					styles =
						'bg-secondary hover:bg-opacity-85 active:bg-dark-secondary text-gray-700 ';
					break;
				case 'danger':
					styles =
						'bg-danger hover:bg-opacity-85 active:bg-dark-danger ';
					break;
				default:
					styles =
						'bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-700 border-gray-300 border ';
					break;
			}
		} else {
			styles += 'bg-gray-400 text-gray-700 cursor-text ';
		}

		if (fab) {
			styles += 'rounded-full p-2 mr-2 ';
		}

		if (checkbox) {
			styles += 'p-1 rounded-md ';
		}

		if (!fab && !checkbox) {
			styles += 'py-3 px-6 rounded-md text-sm mr-2 ';
		}

		if (block) {
			styles += 'w-full ';
		}

		return styles;
	};

	const validateSubmit = () => {
		if (formContext && Object.keys(formContext).length && !checkbox) {
			if (formContext.valid || ignoreValidation) {
				return handleClick();
			}

			return formContext.validateAllFields();
		}

		return handleClick();
	};

	return (
		<button
			className={getButtonStyles()}
			disabled={isDisabled}
			onClick={validateSubmit}
			type={submit ? 'submit' : 'button'}
		>
			<span className="flex flex-row items-center justify-center">
				{children}
			</span>
		</button>
	);
};

export default CustomButton;
