import React, { useContext, useEffect, useMemo, useState } from 'react';

import CheckIcon from '../icons/CheckIcon';
import CustomButton from './CustomButton';
import CustomLabel from './CustomLabel';
import { FormContext } from './FormContextProvider';

type CustomCheckboxType = {
	handleUpdateInput: (value: string) => void;
	label: string;
	rules?: Record<string, string> | string[];
	checked: string;
};

const CustomCheckbox: React.FC<CustomCheckboxType> = ({
	handleUpdateInput,
	label,
	rules = [],
	checked,
}) => {
	const formContext = useContext(FormContext);
	const [labelId, setLabelId] = useState('');

	useEffect(() => {
		if (label && !!formContext) {
			setLabelId(formContext.setupForm(label, rules));
			formContext.validateField(labelId, checked, true);
		}
	}, []);

	const error = useMemo(() => {
		if (formContext && formContext.formElements[labelId]) {
			return formContext.formElements[labelId].error;
		}

		return null;
	}, [formContext]);

    const updateValue = () => {
        const value = checked === 'checked' ? '' : 'checked';
        if (FormContext) {
            formContext.validateField(labelId, value);
        }
        handleUpdateInput(value);
    };

	return (
		<div className="flex flex-row items-center">
			{checked !== 'checked' && (
				<CustomButton checkbox handleClick={updateValue}>
					<CheckIcon className="w-4 h-4 text-white" />
				</CustomButton>
			)}
			{checked === 'checked' && (
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
