import React from 'react';

const InputMask = () => {
    const [value, setValue] = React.useState('');

    const formatPhoneNumber = (input: string) => {
        // Remove all non-numeric characters
        const numbers = input.replace(/\D/g, '');

        // Format the number as (XXX) XXX-XXXX
        if (numbers.length <= 3) return numbers;
        if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
        return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setValue(formatPhoneNumber(input));
    };

    return (
        <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="(123) 456-7890"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            maxLength={14}
        />
    );
};

export default function Project11() {
    return (
        <div className="max-w-7xl mx-auto p-4 pt-6">
            <div className="max-w-md mx-auto">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Phone Number
                </label>
                <InputMask />
            </div>
        </div>
    );
}
