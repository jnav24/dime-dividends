import React, { createContext, useReducer } from 'react';
import useFormValidation from '../../../hooks/useFormValidation';

enum FormElement {
	ADD_FORM_ELEMENT = 'ADD_FORM_ELEMENT',
	UPDATE_FORM_ELEMENT = 'UPDATE_FORM_ELEMENT',
}

type FormElementValidationType = {
	valid: boolean;
	rules: Record<string, string>;
	error: string | null;
	value: string;
};

type FormElementsType = Record<string, FormElementValidationType>;

type FormContextType = {
	formElements: FormElementsType;
	setupForm: (label: string, rules: any) => string;
	validateField: (
		labelId: string,
		value: string,
		initialize?: boolean
	) => string | null;
};

type FormContextProviderProps = {
	handleUpdateValid: (val: boolean) => void;
	valid: boolean;
};

type FormElementAction =
	| { type: FormElement.ADD_FORM_ELEMENT; payload: FormElementsType }
	| {
			type: FormElement.UPDATE_FORM_ELEMENT;
			payload: Record<
				string,
				Partial<
					Record<
						keyof FormElementValidationType,
						boolean | string | null | Record<string, string>
					>
				>
			>;
	  };

export const FormContext = createContext({} as FormContextType);
const initialState = {} as FormElementsType;

function reducer(
	state: FormElementsType,
	action: FormElementAction
): FormElementsType {
	switch (action.type) {
		case FormElement.ADD_FORM_ELEMENT:
			return {
				...state,
				...action.payload,
			};
		case FormElement.UPDATE_FORM_ELEMENT:
			const [[key, value]]: any = Object.entries(action.payload);

			if (!state[key]) {
				return state;
			}

			return {
				...state,
				[key]: {
					...state[key],
					...value,
				},
			};
		default:
			return state;
	}
}

const FormContextProvider: React.FC<FormContextProviderProps> = ({
	children,
	handleUpdateValid,
	valid,
}) => {
	const { validateRules } = useFormValidation();

	let matchFields: Record<string, string> = {};
	const [formElements, dispatch] = useReducer(reducer, initialState);

	const setFormElement = (
		name: string,
		rules: Record<string, string>,
		value = ''
	): void => {
		dispatch({
			type: FormElement.ADD_FORM_ELEMENT,
			payload: {
				[name]: {
					rules,
					valid: !rules.length,
					error: null,
					value,
				},
			},
		});
	};

	const setFormId = (name: string): string =>
		name.toLowerCase().replace(/\s+/, '-');

	const getMatchId = (rules: Record<string, string>) => {
		let matchId: string | null = null;

		const keys = Object.keys(rules).filter((str) => str.includes('match'));
		const values = Object.values(rules).filter((str) =>
			str.includes('match')
		);

		if (keys.length && keys[0].includes(':')) {
			matchId = keys[0].split(':')[1];
		}

		if (values.length && values[0].includes(':')) {
			matchId = values[0].split(':')[1];
		}

		return matchId;
	};

	const setMatchFields = (labelId: string, rules: Record<string, string>) => {
		const result: Record<string, string> = {};
		const matchId = getMatchId(rules);

		if (matchId) {
			result[matchId] = labelId;
		}

		return result;
	};

	const setupForm = (label: string, rules: any) => {
		const labelId = setFormId(label);
		setFormElement(labelId, rules);
		matchFields = {
			...matchFields,
			...setMatchFields(labelId, rules),
		};
		return labelId;
	};

	const isFormValid = () => {
		const keys = Object.keys(formElements);
		const valid = Object.values(formElements).filter(
			(elem: { valid: boolean; rules: Record<string, string> }) =>
				elem.valid
		);
		handleUpdateValid(keys.length === valid.length);
	};

	const setMatchRules = (rules: Record<string, string>) => {
		const valuesIndex = Object.values(rules).findIndex((rule) =>
			rule.includes('match')
		);

		const matchKey = Object.keys(rules).filter((str) =>
			str.includes('match')
		);

		if (matchKey.length) {
			const result = { ...rules };
			const formName = matchKey[0].split(':')[1];
			delete result[matchKey[0]];
			return {
				...result,
				[`match:${formName}|${formElements[formName].value}`]: rules[
					matchKey[0]
				],
			};
		}

		if (valuesIndex > -1) {
			const result = { ...rules };
			const formName = result[valuesIndex].split(':')[1];
			result[
				valuesIndex
			] = `match:${formName}|${formElements[formName].value}`;
			return result;
		}

		return rules;
	};

	const validateField = (
		labelId: string,
		value: string,
		initialize = false
	): string | null => {
		if (!labelId || !labelId.length || !formElements[labelId]) {
			return null;
		}

		const { rules } = formElements[labelId];
		const { error, valid } = validateRules(value, setMatchRules(rules));
		dispatch({
			type: FormElement.UPDATE_FORM_ELEMENT,
			payload: {
				[labelId]: {
					valid,
					value,
				},
			},
		});

		if (!initialize) {
			dispatch({
				type: FormElement.UPDATE_FORM_ELEMENT,
				payload: {
					[labelId]: {
						error,
					},
				},
			});
		}

		if (matchFields[labelId] && formElements[matchFields[labelId]]) {
			validateField(
				matchFields[labelId],
				formElements[matchFields[labelId]].value
			);
		}

		isFormValid();
		return error;
	};

	return (
		<FormContext.Provider
			value={{
				validateField,
				setupForm,
				formElements,
			}}
		>
			{children}
		</FormContext.Provider>
	);
};

export default FormContextProvider;
