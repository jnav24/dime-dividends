import React, { useContext, useMemo, useState} from 'react';

import CheckIcon from '../icons/CheckIcon';
import CustomButton from './CustomButton';
import CustomLabel from './CustomLabel';
import { FormContext } from './FormContextProvider';

type CustomCheckboxType = {
    handleUpdateInput: (value: string) => void,
    label: string,
    rules?: Record<string, string> | string[],
    value: string,
};

const CustomCheckbox: React.FC<CustomCheckboxType> = ({ handleUpdateInput, label, rules = [], value}) => {
	const formContext = useContext(FormContext);
	const [labelId, setLabelId] = useState('');

	const error = useMemo(() => {
		if (formContext && formContext.formElements[labelId]) {
			return formContext.formElements[labelId].error;
		}

		return null;
	}, [formContext]);

    const updateValue = () => {
        if (formContext) {
            formContext.validateField(labelId, !value);
        }
        handleUpdateInput(!value);
    };

	return (
		<div className="flex flex-row items-center">
			{!value && (
				<CustomButton checkbox handleClick={updateValue}>
					<CheckIcon className="w-4 h-4 text-white" />
				</CustomButton>
			)}
			{value && (
				<CustomButton
					checkbox
					handleClick={updateValue}
					color="primary"
				>
					<CheckIcon className="w-4 h-4" />
				</CustomButton>
			)}
			<div className="ml-2">
				<CustomLabel error={error} labelId={labelId} label={label} />
			</div>
		</div>
	);
};

export default CustomCheckbox;
