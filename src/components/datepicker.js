import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarDays } from 'lucide-react';

const Input = ({ label, register, name, errors }) => {
    const [startDate, setStartDate] = useState(null);

    return (
        <div className="form-control w-full max-w-md">
            <label className="label-text text-green-500">{label}</label>
            <div className="relative mt-1">
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    placeholderText="Select a date"
                    className="input input-bordered bg-white w-full pr-12" // Adjust padding to accommodate the icon
                    {...register(name, { required: `${label} is required` })}
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <CalendarDays className="text-gray-500" />
                </div>
            </div>
            {errors[name] && (
                <span className="label-text-alt text-red-500">{errors[name]?.message}</span>
            )}
        </div>
    );
};

export default Input;
