"use client"

import { useState, useMemo } from "react"; 
import { useRouter } from "next/navigation";
import { searchInstructorSchema } from "./schemas/searchInstructorSchema";
import { RESORTS_BY_STATE } from "@/src/mock/resortList";
import { useBookingDetails } from "./hooks/useBookingDetails";

import Checkbox from "../../ui/Checkbox";
import Location from "../../ui/icons/LocationIcon";
import DateField from "../../ui/DataField";
import Dropdown from "../../ui/Dropdown";
import ButtonSearchInstruktor from "../../ui/ButtonSearchInstructor";
import { ResortIcon } from "../../ui/icons/ResortIcon";

type SportType = 'Skiing' | 'Snowboarding' | 'Guiding' | null;

const ALL_RESORTS_TO_STATE = Object.entries(RESORTS_BY_STATE).reduce((acc, [stateKey, resorts]) => {
    const StateName = stateKey.charAt(0).toUpperCase() + stateKey.slice(1); 
    resorts.forEach(resort => {
        acc[resort] = StateName;
    });
    return acc;
}, {} as Record<string, string>);

export const SearchInstructors = () => {

    const {bookingDetails, setBookingDetails} = useBookingDetails();

    const [errors, setErrors] = useState<Record<string,string>>({});
    const router = useRouter()

    const currentSport = (bookingDetails.typeOfSport as SportType) || null;
    const currentStateValue = bookingDetails.location || null;
    const currentResort = bookingDetails.resort || null;
    const currentDate = bookingDetails.date;

    const currentStateKey = currentStateValue?.toLowerCase();
    
    const allResortNames = useMemo(() => {
        return Object.values(RESORTS_BY_STATE).flat();
    }, []);

    const resortOptions = currentStateKey
        ? RESORTS_BY_STATE[currentStateKey as keyof typeof RESORTS_BY_STATE] || []
        : allResortNames; 

    const handleChange = (key: 'sport' | 'state' | 'resort' | 'date', value: string | Date | null) => {

        setErrors(prev => {
            if (!prev[key]) return prev;
            const updated = { ...prev };
            delete updated[key];
            return updated;
        });

        setBookingDetails(prevDetails => {
            const newState = { ...prevDetails };
            
            if (key === 'state') {
                newState.location = (value as string) || '';
                newState.resort = ''; 
            } 
            else if (key === 'resort') {
                const selectedResort = (value as string) || '';
                newState.resort = selectedResort;

                if (selectedResort) {
                    const correspondingState = ALL_RESORTS_TO_STATE[selectedResort];
                    if (correspondingState) {
                        newState.location = correspondingState;
                    }
                }
            }
            else if (key === 'date') {
                newState.date = value as Date | null;
            } 
            else if (key === 'sport') {
                newState.typeOfSport = (value as string) || '';
            }

            return newState;
        });
    };

    const handleSportChange = (sport: SportType) => {
        const newValue = currentSport === sport ? null : sport;
        handleChange("sport", newValue);
    };

    const handleSubmit = () => {
        const dataToValidate = {
            sport: currentSport,
            state: currentStateValue,
            resort: currentResort,
            date: currentDate,
        };

        const result = searchInstructorSchema.safeParse(dataToValidate);

        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            result.error.issues.forEach(err => {
                const field = err.path[0] as string;
                fieldErrors[field] = err.message;
            });

            setErrors(fieldErrors);
            return; 
        }
        setErrors({});
        router.push("/findYourInstructor")
    };


    return (
        <div className={`z-50 p-5 w-full bg-[#80AAEF] leading-[130%] ${errors.sport ? "pt-1 pl-5" : ""}`}>
            {errors.sport && (
                <p className="text-red-500 text-sm">{errors.sport}</p>
            )}
            <div className={`flex gap-6 md:gap-8 ${errors.sport ? "animate-shake" : ""}`}>
                <Checkbox 
                    label={"Skiing"}
                    checked = {currentSport === 'Skiing'}
                    onChange={() => handleSportChange("Skiing")}
                    className={`${currentSport === "Skiing" ? "text-white hover:text-white" :  "" } hover:text-black `}
                />
                <Checkbox 
                    label={"Snowboarding"}
                    checked = {currentSport === 'Snowboarding'}
                    onChange={() => handleSportChange("Snowboarding")}
                    className={`${currentSport === "Snowboarding" ? "text-white hover:text-white" :  "" } hover:text-black `}
                />
                <Checkbox 
                    label={"Guiding"}
                    checked = {currentSport === "Guiding"}
                    onChange={() => handleSportChange("Guiding")}
                    className={`${currentSport === "Guiding" ? "text-white hover:text-white" :  "" } hover:text-black `}
                />
            </div>
            <div className="flex flex-col md:grid md:grid-cols-[1.32fr_2fr_1.1fr] px-5 md:px-0 gap-6 md:gap-5">
                <div className={`group`}>
                    <div className={`${currentStateValue ? "group-hover:text-white" : ""} text-white flex items-center mt-6 gap-2 mb-2.5 md:mb-3 group-hover:text-black `}>
                        <Location/>
                        <p>State</p>
                    </div>
                    <Dropdown
                        options={["California", "Oregon", "Washington" ]}
                        value={currentStateValue}
                        placeholder="Choose the State"
                        onChange={(newValue) => handleChange("state", newValue)}
                        className={` ${currentStateValue ? "bg-[#2E78E5] border-none group-hover:text-white" : ""} 
                        border-1 border-white text-white group-hover:text-black group-hover:border-black w-full 
                        ${ errors.state ? "border-red-500 text-red-600" : "border-white text-white w-full" }`}
                        isFilterBtn={false}
                    />
                    {errors.state && (
                        <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                    )}
                </div>
            <div className={`group`}>
              <div className={` ${currentResort ? "group-hover:text-white" : ""} text-white flex items-center md:mt-6 gap-2 mb-2.5 md:mb-3 group-hover:text-black`}>
                <ResortIcon/>
                <p>Resort</p>
              </div>
                <Dropdown
                    options={resortOptions}
                    value={currentResort}
                    placeholder="Choose the Resort"
                    onChange={(newValue) => handleChange("resort", newValue)}
                    className={` ${currentResort ? "bg-[#2E78E5] border-none group-hover:text-white" : ""}  border-1 border-white text-white group-hover:text-black group-hover:border-black`}
                    isFilterBtn={false}
               />
               {errors.resort && (
                    <p className="text-red-500 text-sm mt-1">{errors.resort}</p>
                )}
                
            </div>
            <div className={`group`}>
                <div className="md:mt-6">
                    <DateField
                        data={currentDate}
                        onSelect={(newValue) => handleChange("date", newValue)}
                    />
                    {errors.date && (
                        <p className="text-red-500 text-sm mt-1 mb-3">{errors.date}</p>
                    )}
                </div>
            </div>
            </div>
            <div className={`flex md:justify-end px-5 md:px-0`}>
                    <ButtonSearchInstruktor
                        name={"Search instructor"}
                        onClick={handleSubmit}
                        className={`${errors.state || errors.resort || errors.date ? "mt-0" : "mt-6 md:mt-5"} w-full md:w-2/9` }
                    />
            </div>
        </div>
    )
}
