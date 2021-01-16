import useUtils from './useUtils';

class DimeError extends Error {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validateRequired(val: string | number): boolean {
    return !!val.toString().trim();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validateUpper(value: string): boolean {
    return /[A-Z]/.test(value);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validateLower(value: string): boolean {
    return /[a-z]/.test(value);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validateAlphaNumeric(value: string): boolean {
    return /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(value);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validateSpecialCharacters(value: string): boolean {
    return /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[-@./#&+])([a-zA-Z0-9-@./#&+]+)$/.test(
        value
    );
}

/**
 *
 * @param matchingValue; has the form rule `match`
 * @param value; regular form rule that `matchingValue` is getting matched to
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validateMatch(matchingValue: string, value: string): boolean {
    if (value.includes('|')) {
        return matchingValue === value.split('|')[1];
    }

    return matchingValue === value;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validateNumeric(value: string): boolean {
    return /^\d+$/.test(value);
}

function validateFunctionParam(fun: string, num: string) {
    if (!validateNumeric(num)) {
        throw new DimeError(
            `The param for the validation rule, ${fun}, must be numeric`
        );
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validateMax(value: string, characters: string) {
    validateFunctionParam('max', characters);
    return value.length <= Number(characters);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validateMin(value: string, characters: string) {
    validateFunctionParam('min', characters);
    return value.length >= Number(characters);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validateFloat(value: string, num: string) {
    validateFunctionParam('float', num);
    const regex = '^\\d+(\\.\\d{' + num + '})$';
    return new RegExp(regex).test(value);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validateGt(value: string, num: string) {
    validateFunctionParam('float', num);
    return Number(value) > Number(num);
}

export default function useFormValidation() {
    const defaultErrorMessages: Record<string, string> = {
        required: 'Field is required',
        email: 'Must be a valid email address',
        max: 'Field can not exceed ##REPLACE## characters',
        min: 'Field should be ##REPLACE## or more characters',
        'alpha-numeric': 'Field must contain letters and numbers',
        upper: 'Field must contain an uppercase letter',
        lower: 'Field must contain a lowercase letter',
        match: 'Field must match with `##REPLACE##`',
        numeric: 'Field can only contain numbers',
        float: 'Field must be numeric with ##REPLACE## decimals',
        gt: 'Field must be greater than ##REPLACE##',
    };

    const setMessage = (message: string, rep: string) => {
        if (rep.includes('|')) {
            return message.replace('##REPLACE##', rep.split('|')[0]);
        }

        return message.replace('##REPLACE##', rep);
    };

    const getTypeAndParam = (type: string): string[] => type.split(':');

    const validateInput = (type: string, value: string): boolean => {
        const [validationType, validationParam] = getTypeAndParam(type);
        const func: any = `validate${useUtils()
            .toTitleCase(validationType)
            .replace(/\s+/, '')}`;

        try {
            return validationParam
                ? eval(func)(value, validationParam)
                : eval(func)(value);
        } catch (err) {
            if (err instanceof DimeError) {
                throw err.message;
            }

            throw `Function for type '${validationType}', does not exist`;
        }
    };

    const validateRules = (
        inputValue: string,
        rules: Record<string, string>
    ): { error: null | string; valid: boolean } => {
        let tempValid = true;
        let error = null;

        if (
            !Object.values(rules).includes('required') &&
            !Object.keys(rules).includes('required') &&
            (!inputValue || !inputValue.toString().trim().length)
        ) {
            return { error, valid: tempValid };
        }

        for (const [key, value] of Object.entries(rules)) {
            const isNumeric = validateNumeric(key);
            const type = isNumeric ? value : key;
            const [validationType, validationParams] = getTypeAndParam(type);
            const message = isNumeric
                ? setMessage(
                    defaultErrorMessages[validationType] ??
                    defaultErrorMessages.required,
                    validationParams ?? ''
                )
                : value;
            const isValid = validateInput(type, inputValue);

            if (!tempValid) {
                continue;
            }

            if (!isValid && tempValid) {
                error = message;
                tempValid = false;
                continue;
            }

            error = null;
            tempValid = true;
        }

        return {
            error,
            valid: tempValid,
        };
    };

    return { validateInput, validateRules };
}
