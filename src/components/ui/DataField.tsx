"use client"; 

import React, { forwardRef } from 'react'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import { format, isPast, isToday } from "date-fns";
import { CalendarIcon } from './icons/CalendarIcon';

interface DataFieldProps {
    data: Date | null; 
    onSelect: (data: Date | null) => void;
    className?: string;
}

interface CustomInputProps {
    value?: string;
    onClick?: () => void;
    className?: string;
}

const CustomInput = forwardRef<HTMLDivElement, CustomInputProps>(
    ({ value, onClick, className, ...props }, ref) => (
        <div 
            onClick={onClick}   
            ref={ref}           
            {...props}          
            className={`${className} w-full p-3 border border-white text-white outline-none cursor-pointer 
            group-hover:border-black 
            ${value ? "bg-[#2E78E5] border-0" : ""}
            ${!value ? "group-hover:border-black" : ""}`}
        >
            <div className="flex items-center justify-between w-full"> 
                <input
                    value={value}
                    placeholder="Select a Date"
                    className="w-full bg-transparent outline-none placeholder-white cursor-pointer group-hover:placeholder-black group-hover:text-white"
                    readOnly 
                />
                <CalendarIcon />
            </div>
        </div>
    )
);

CustomInput.displayName = "CustomInput";

const DateField: React.FC<DataFieldProps> = ({ data, onSelect }) => {
    const isDateValid = (date: Date) => {
        return !isPast(date) || isToday(date);
    };
    
    const formattedDate = data ? format(data, 'MM/dd/yyyy') : '';

    return (
        <div className="w-full group">
            <div className={`${!formattedDate ? " group-hover:text-black " : ""} group flex items-center text-white gap-2 mb-3 group `}>
                <CalendarIcon />
                <p>Date</p>
            </div>
            <DatePicker
                selected={data}
                onChange={(date: Date | null) => onSelect(date)} 
                filterDate={isDateValid}
                placeholderText="Select a Date"
                dateFormat="MM/dd/yyyy"
                calendarClassName="custom-calendar-popup"
                customInput={
                    <CustomInput 
                        value={formattedDate}
                    />
                }
            />
        </div>
    );
};

export default DateField;