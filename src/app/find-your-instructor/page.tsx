"use client"

import { useState, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation"; 
import { useBookingDetails } from "@/src/components/features/marketing/hooks/useBookingDetails";

import { INSTRUCTORS_MOCK_DATA } from "@/src/mock/instructorList";
import { SortCriteria } from "@/src/mock/filterOptions";
import { InstructorsProps } from "@/src/types/instructor";

import CalculateParticipants from "@/src/lib/utils/calculateParticioants";
import InstructorCard from "@/src/components/features/find-instructor/InstructorCard";
import SelectYourInstructor from "@/src/components/features/find-instructor/SelectYourInstructor";
import SummaryBlock from "@/src/components/features/SummaryBlock";
import TimeAndDuration from "@/src/components/features/find-instructor/TimeAndDuration";
import BigSnow from "@/src/components/ui/icons/BigSnow";
import ButtonSearchInstructor from "@/src/components/ui/ButtonSearchInstructor";

const sortInstructors = (
    data: InstructorsProps[], 
    criteria: SortCriteria 
): InstructorsProps[] => {
    const sortedData = [...data]; 

    let sortKey: keyof InstructorsProps | null = null;
    let direction: 'asc' | 'desc' = 'asc';

    switch (criteria) {
        case "RATING_DESC":
            sortKey = 'rating';
            direction = 'desc'; 
            break;
        case "EXPERIENCE_DESC":
            sortKey = 'experience';
            direction = 'desc'; 
            break;
        case "PRICE_INC":
            sortKey = 'price';
            direction = 'asc'; 
            break;
        case "PRICE_DESC":
            sortKey = 'price';
            direction = 'desc'; 
            break;
        default:
            return sortedData;
    }

    if (sortKey) {
        sortedData.sort((a, b) => {
            const valA = a[sortKey] ?? 0; 
            const valB = b[sortKey] ?? 0;

            if (direction === 'asc') {
                return valA - valB;
            } else {
                return valB - valA;
            }
        });
    }

    return sortedData;
};

const FindYourInstructorContent = () => {

    const { bookingDetails } = useBookingDetails();
    
    const [filterCriteria, setFilterCriteria] = useState<SortCriteria>("RATING_DESC");
    const [showErrors, setShowErrors] = useState(false);

    const searchParams = useSearchParams();
    const router = useRouter(); 
    const pathname = usePathname(); 

    const currentStep = Number(searchParams.get("step")) || 1;

    const handleNext = () => {
        if (currentStep === 1) {
            const isTimeMissing = !bookingDetails.bookingStartTime;
            const isDurationMissing = !bookingDetails.lessonTime;

            if (isTimeMissing || isDurationMissing) {
                setShowErrors(true);
                return; 
            }
        }

        if (currentStep === 2) {
            const isInstructorMissing = !bookingDetails.instructor;

            if (isInstructorMissing) {
                setShowErrors(true)
                return
            }
        }
        setShowErrors(false);

        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set("step", String(currentStep + 1));
        
        router.push(`${pathname}?${newParams.toString()}`);
    };

    const handleDesktopNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const isTimeMissing = !bookingDetails.bookingStartTime;
        const isDurationMissing = !bookingDetails.lessonTime;
        const isInstructorMissing = !bookingDetails.instructor;

        if (isTimeMissing || isDurationMissing || isInstructorMissing) {
            e.preventDefault(); 
            setShowErrors(true);
            return;
        }

        setShowErrors(false);
    };

    const handleFilterUpdate = (newCriteria : SortCriteria) => {
        setFilterCriteria(newCriteria)
    }

    const workingInstructors = INSTRUCTORS_MOCK_DATA.filter(item => item.isWorking);

    const instructorsToDisplay = sortInstructors(
        workingInstructors, 
        filterCriteria
    );

    return (
        <div className="mb-16 mt-20 relative z-10">
            <h1 className="text-center text-[38px] md:text-[56px] font-medium md:font-semibold mt-12 md:mt-30 mb-[30px] md:mb-20">Find Your Instructor</h1>
            <div className="hidden md:block">
                <div className="grid grid-cols-3 px-[85px] gap-7 z-10">
                    <div className="flex flex-col col-span-2 z-10 gap-y-7">
                        <div>
                            <TimeAndDuration
                                timeError={showErrors && !bookingDetails.bookingStartTime}
                                durationError={showErrors && !bookingDetails.lessonTime}
                            />
                        </div>
                        <div>
                            <CalculateParticipants/>
                            {showErrors && !bookingDetails.instructor && (
                                <p className="text-red-600 text-center mt-5">
                                    Please, select an instructor
                                </p>
                            )}
                        </div>
                        <div className="bg-[#80AAEF]">
                            <SelectYourInstructor
                                sortCriteria={filterCriteria}
                                onFilterChange={handleFilterUpdate}
                            />
                            <div className="flex flex-col gap-4 md:px-7 md:pb-7">
                                {instructorsToDisplay.map((instructor) => (
                                    <InstructorCard 
                                        key={instructor.id} 
                                        instructor={instructor} 
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="z-10">
                        <SummaryBlock 
                            showDataAndTime={true}
                            showInstructor={true}
                            showLocation={true}
                            showParticipants={true}
                            showType={true}
                            buttonText="Proceed to Checkout"
                            totalPriceStyles="flex text-[26px] font-semibold justify-between w-full px-4"
                            linkButtonTo="/secureCheckout"
                            onClick={handleDesktopNext}
                            isSticky={true}
                        />
                    </div>
                </div>
                <div className="absolute top-[88vw] right-0">
                    <BigSnow width="64px" height="64px" viewBox="0 0 574 640" />
                </div>
                <div className="absolute top-[22vw] right-[7vw] rotate-60">
                    <BigSnow width="64px" height="64px" viewBox="0 0 574 640" />
                </div>
                <div className="absolute top-[10vw] left-[9vw] rotate-60">
                    <BigSnow width="64px" height="64px" viewBox="0 0 574 640" />
                </div>
            </div>

            <div className="block md:hidden px-4 z-10">
                <div className="absolute top-10 right-1">
                    <BigSnow width="44px" height="44px" viewBox="0 0 574 640" />
                </div>
                
                {currentStep === 1 && (
                    <div className="animate-fade-in relative">
                        <TimeAndDuration 
                            timeError={showErrors && !bookingDetails.bookingStartTime}
                            durationError={showErrors && !bookingDetails.lessonTime}
                        />
                        <CalculateParticipants />
                        <ButtonSearchInstructor 
                            onClick={handleNext}
                            name="Search Instructor"
                            className="w-full mt-5 flex items-center justify-center"  
                        />
                        <div className="absolute">
                            <BigSnow width="90px" height="90px" viewBox="0 0 640 640" />
                        </div>
                    </div>
                )}
                
                {currentStep === 2 && (
                    <div className="">
                        <SelectYourInstructor 
                            sortCriteria={filterCriteria}
                            onFilterChange={handleFilterUpdate}
                        />
                        <div className="flex flex-col gap-4 mt-[-2px] bg-[#80AAEF] px-4 pb-7 rounded-b max-h-[50vh] overflow-y-auto">
                            {instructorsToDisplay.map((instructor) => (
                                <InstructorCard 
                                    key={instructor.id} 
                                    instructor={instructor} 
                                />
                            ))}
                        </div>
                        {showErrors && !bookingDetails.instructor && (
                            <p className="text-red-500 text-center mt-4 text-[16px] font-medium">
                                Please, select an instructor
                            </p>
                        )}
                        <ButtonSearchInstructor 
                            onClick={handleNext}
                            name="Book lesson"
                            className="w-full mt-5 flex items-center justify-center"  
                        />
                    </div>
                )}
                
                {currentStep === 3 && (
                    <div className="animate-fade-in">
                        <SummaryBlock 
                            showDataAndTime={true}
                            showInstructor={true}
                            showLocation={true}
                            showParticipants={true}
                            showType={true}
                            buttonText="Proceed to Checkout"
                            totalPriceStyles="flex text-[22px] md:text-[26px] font-medium md:font-semibold justify-between w-full md:p-4 opacity-70 md:opacity-100"
                            linkButtonTo="/secureCheckout"
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

const FindYourInstructor = () => {
    return (
        <Suspense fallback={<div className="text-center mt-30 text-xl">Loading... ⏳</div>}>
            <FindYourInstructorContent />
        </Suspense>
    );
};

export default FindYourInstructor;