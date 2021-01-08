import React, {BaseSyntheticEvent, useContext, useEffect, useMemo, useState} from 'react';

import CustomLabel from './CustomLabel';
import { FormContext } from './FormContextProvider';

type CustomInputProps = {
	handleUpdateInput: (value: string) => void;
	label: string;
	onBlur?: boolean,
	rules?: Record<string, string> | string[];
	type?: string;
	value: string;
};

const CustomInput: React.FC<CustomInputProps> = ({
	handleUpdateInput,
	label,
    onBlur = true,
	rules,
	type = 'text',
	value,
}) => {
	const formContext = useContext(FormContext);
    const [labelId, setLabelId] = useState('');

	const error = useMemo(() => {
        if (formContext && Object.keys(formContext).length && formContext.formElements[labelId]) {
            return formContext.formElements[labelId].error;
        }

		return null;
	}, [formContext]);

	useEffect(() => {
		if (label && !!formContext && Object.keys(formContext).length) {
            setLabelId(formContext.setupForm(label, rules));
		}
	}, []);

	useEffect(() => {
	    if (labelId.length) {
            formContext.validateField(labelId, value, true);
        }
    }, [labelId]);

	const updateValue = (inputValue: BaseSyntheticEvent) => {
		if (formContext && Object.keys(formContext).length) {
			formContext.validateField(labelId, inputValue.target.value);
		}
		handleUpdateInput(inputValue.target.value);
	};

	return (
		<div className="mb-4">
			<CustomLabel error={error} labelId={labelId} label={label} />
			<input
				id={labelId}
				className={`w-full p-2 mt-2 border rounded outline-none ${
					!error
						? 'border-gray-300 focus:border-primary'
						: 'border-red-600'
				}`}
				type={type}
				value={value}
				autoComplete={type !== 'password' ? 'on' : 'off'}
				aria-labelledby={labelId}
				onBlur={e => {
				    if (onBlur) {
                        return updateValue(e);
                    }

				    return null;
                }}
				onInput={updateValue}
			/>
			{error && <span className="text-sm text-red-600">{error}</span>}
		</div>
	);
};

export default CustomInput;
