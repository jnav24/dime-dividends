import React from 'react';

type Props = {}

const CustomRadio: React.FC<Props> = () => {
    return (
        <div className="flex flex-row justify-items-start cursor-pointer items-center">
            <div className="hover:bg-opacity-30 hover:bg-gray-600 p-2 rounded-full transition duration-100">
                <div className={`border-2 border-gray-600 rounded-full w-6 h-6 flex flex-row items-center justify-center`}>
                    <div className="bg-gray-600 w-4 h-4 rounded-full" />
                </div>
            </div>
            <span className="text-gray-500">Some Label</span>
        </div>
    );
};

export default CustomRadio;
