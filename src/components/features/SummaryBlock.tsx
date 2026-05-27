import Link from "next/link";

import { BookingDetailsProps } from "@/src/types/bookingDetails";
import { useBookingDetails } from "./marketing/hooks/useBookingDetails";
import { calculateBookingPrice } from "@/src/lib/utils/calculateBookingPrice";
import ButtonSearchInstructor from "../ui/ButtonSearchInstructor";
import LocationSummaryCard from "./find-instructor/LocationSummaryCard";
import DateAndTimeSummaryCard from "./find-instructor/DateAndTimeSummaryCard";
import TypeSummeryCard from "./find-instructor/TypeSummaryCard";
import ParticipantsSummaryCard from "./find-instructor/ParticipantsSummaryCard";
import InstructorsSummaryBlock from "./find-instructor/InstructorSummaryBlock";
import TotalPriceSummaryBlock from "./find-instructor/TotalPriceSummaryBlock";
import { useWindowWidth } from "@/src/lib/hooks/useWindowWith";

interface SummaryBlockProps {
    showLocation: boolean;
    showDataAndTime: boolean;
    showInstructor: boolean;
    showType : boolean;
    showParticipants : boolean;
    buttonText : string;
    totalPriceStyles : string;
    linkButtonTo?: string; 
    formId?: string;
    isSticky?: boolean;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void; 
}

const SummaryBlock:React.FC<SummaryBlockProps> = ({
    showLocation, showDataAndTime, showInstructor, showType, showParticipants, 
    buttonText, totalPriceStyles, linkButtonTo, formId, isSticky, onClick
}) => {

    const {isDesktop} = useWindowWidth();
    const {bookingDetails} = useBookingDetails();

    const finalPrice = bookingDetails.instructor 
    ? calculateBookingPrice(bookingDetails as BookingDetailsProps)
    : 0;

    const renderButton = () => (
        <div className="w-full mt-5 md:mt-0">
            {formId ? (
                <div className="flex justify-center">
                    <ButtonSearchInstructor
                        name={buttonText}
                        type="submit" 
                        form={formId}
                    />
                </div>
            ) : (
                <Link onClick={onClick} href={linkButtonTo || "#"}>
                    <div className="flex justify-center">
                        <ButtonSearchInstructor
                            name={buttonText}
                        />
                    </div>
                </Link>
            )}
        </div>
    );

    return (
        <div className={`h-fit ${isSticky ? "md:sticky md:top-2" : ""}`}>
             <div className="bg-[#80AAEF] rounded p-4 md:p-7 flex flex-col gap-4">
                <h2 className="text-[22px] md:text-[26px] md:font-semibold leading-[130%]">Summary</h2>
                
                {showType && (
                    <TypeSummeryCard typeOfSport={bookingDetails.typeOfSport} />
                )}
                {showLocation && (
                    <LocationSummaryCard resort={bookingDetails.resort} location={bookingDetails.location} />
                )}
                {showDataAndTime && (
                    <DateAndTimeSummaryCard
                        date={bookingDetails.date}
                        bookingEndTime={bookingDetails.bookingEndTime}
                        bookingStartTime={bookingDetails.bookingStartTime}
                        bookingDetails={bookingDetails.lessonTime}
                    />
                )}
                {showParticipants && (
                    <ParticipantsSummaryCard numberOfParticipants={bookingDetails.numberOfParticipants} />
                )}
                {showInstructor && (
                    <InstructorsSummaryBlock
                        instructorId={bookingDetails.instructor?.id}
                        instructorPhoto={bookingDetails.instructor?.photoMain}
                        instructorName={bookingDetails.instructor?.name}
                        instructorRating={bookingDetails.instructor?.rating}
                        instructorExperience={bookingDetails.instructor?.experience}
                        instructorTotalReviews={bookingDetails.instructor?.howManyFeedback}
                    />
                )}
                
                <div className="pt-3 ">
                    <TotalPriceSummaryBlock
                        finalPrice={finalPrice.toFixed(2)}
                        totalPriceStyles={totalPriceStyles}
                    />
                </div>
                {isDesktop && renderButton()}
            </div>
            {!isDesktop && renderButton()}
        </div>
    );
}

export default SummaryBlock;