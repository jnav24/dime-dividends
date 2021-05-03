import React, {
	BaseSyntheticEvent,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';

import CustomLabel from './CustomLabel';
import { FormContext } from './FormContextProvider';

export type HandleInputType = {
    event: 'change' | 'blur' | 'select';
    value: string;
};

type CustomInputProps = {
	handleUpdateInput: (obj: HandleInputType) => void;
	label: string;
	rules?: Record<string, string> | string[];
	type?: string;
	value: string;
	readOnly?: boolean;
	validateOnInit?: boolean;
	ignoreAutoComplete?: boolean;
};

const CustomInput: React.FC<CustomInputProps> = ({
	handleUpdateInput,
	label,
	rules,
	type = 'text',
	value,
	readOnly = false,
	validateOnInit = false,
	ignoreAutoComplete = false,
}) => {
	const formContext = useContext(FormContext);
	const [labelId, setLabelId] = useState('');

	const error = useMemo(() => {
		if (
			formContext &&
			Object.keys(formContext).length &&
			formContext.formElements[labelId]
		) {
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
			formContext.validateField(labelId, value, validateOnInit);
		}
	}, [labelId]);

	const updateValue = (event: 'change' | 'blur', inputValue: BaseSyntheticEvent) => {
		if (formContext && !!Object.keys(formContext).length) {
			formContext.validateField(labelId, inputValue.target.value, true);
		}
		handleUpdateInput({ event, value: inputValue.target.value });
	};

	return (
		<div className="mb-4">
			<CustomLabel error={error} labelId={labelId} label={label} />
			<input
				id={labelId}
				className={`w-full p-2 mt-2 border rounded outline-none ${
					readOnly ? 'bg-gray-200 text-gray-500' : 'bg-white'
				} ${
					!error
						? 'border-gray-300 focus:border-primary'
						: 'border-red-600'
				}`}
				type={type}
				value={value}
				autoComplete={
					type === 'password' || ignoreAutoComplete ? 'off' : 'on'
				}
				aria-labelledby={labelId}
				onBlur={(e) => updateValue('blur', e)}
				onChange={(e) => updateValue('change', e)}
				readOnly={readOnly}
			/>
			{error && <span className="text-sm text-red-600">{error}</span>}
		</div>
	);
};

export default CustomInput;
