import React from 'react';

type AlertType = {
    errors: Array<string> | string,
    type: 'error' | 'info' | 'default' | 'success' | 'warn',
};

const Alert: React.FC<AlertType> = ({ errors, type }) => {
    const getTypeStyles = (): string => {
        const styles = 'rounded mx-2 sm:mx-auto px-4 py-3 border mb-4 flex flex-row justify-center items-center';

        const mapTypes: Record<string, string> = {
            error: 'bg-red-200 border-red-600 text-red-700',
            info: 'bg-blue-200 border-blue-600',
            success: 'bg-green-200 border-green-600 text-green-800',
            warn: 'bg-yellow-200 border-yellow-500',
        };

        return `${styles} ${mapTypes[type] ?? 'bg-gray-100 border-gray-400'}`;
    };

    return (
        <>
            {errors.length > 0 && (
                <div
                    className={getTypeStyles()}
                    role="alert"
                >
                    {Array.isArray(errors) && errors.map((error: string, int) => (<p key={int}>{error}</p>))}
                    {!Array.isArray(errors) && (<p>{errors}</p>)}
                </div>
            )}
        </>
    );
};

export default Alert;
