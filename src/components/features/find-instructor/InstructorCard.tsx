import { StarIcon } from "../../ui/icons/StarIcon";
import { InstructorsProps } from "@/src/types/instructor";
import { useBookingDetails } from "../marketing/hooks/useBookingDetails";
import Image from "next/image";

interface InstructorCardProps {
    instructor: InstructorsProps; 
}

const InstructorCard:React.FC<InstructorCardProps> = ({instructor}) => {

    const {bookingDetails, setBookingDetails} = useBookingDetails()

    const handleSelectInstructor = () => {
    setBookingDetails((prevState) => ({
        ...prevState, 
        instructor: instructor, 
    }));
    };

    const isSelected = bookingDetails.instructor?.id === instructor?.id;
    const selectedStyle = "bg-[#2E78E5] !bg-[#2E78E5] text-white";
    const hoverStyle = "hover:bg-[#2E78E5] hover:text-white";

    return (
        <div>
            <div
                onClick={handleSelectInstructor} 
                className={`${isSelected ? selectedStyle : hoverStyle} md:grid grid-cols-10 p-4 hidden md:p-6 gap-5 bg-[#D3DCF8] cursor-pointer `}
            > 
            <div className="col-span-1.5">
                <Image 
                    src={instructor?.photoMain || "/default-avatar.png"} 
                    alt={instructor?.name || "Instructor avatar"}
                    className={`w-15 h-15 object-cover rounded-[50%] ${instructor?.id === 4 ? "object-top" : null}`}
                />
            </div>
                <div className="col-span-9">
                    <div className="flex justify-between">
                        <p className="text-[26px] font-semibold">{instructor?.name}</p>
                        <p className="text-[26px] font-semibold">{instructor?.price} $ / hr</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <StarIcon/>
                        {instructor?.rating} ({instructor?.howManyFeedback})
                        <span className="ml-5">{instructor?.experience} years exp</span>
                    </div>
                    <div className="pt-5">{instructor?.aboutInstructor}</div>
                </div>
            </div>
            <div 
                onClick={handleSelectInstructor} 
                className={`${isSelected ? selectedStyle : hoverStyle} md:hidden bg-[#D3DCF8] p-4`}
            > 
                <div className="flex gap-4">
                    <Image 
                        src={instructor?.photoMain || "/default-avatar.png"} 
                        alt={instructor?.name || "Instructor avatar"}
                        className={`w-15 h-15 object-cover rounded-[50%] ${instructor?.id === 4 ? "object-top" : null}`}
                    />
                    <div className="flex flex-col justify-between">
                        <p className="text-[22px]">{instructor?.name}</p>
                        <p className="text-[22px]">{instructor?.price} $ / hr</p>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <StarIcon/>
                        {instructor?.rating} ({instructor?.howManyFeedback})
                    </div>
                    <span className="ml-5">{instructor?.experience} years exp</span>
                </div>
                <div className="pt-3">{instructor?.aboutInstructor}</div>
            </div>
        </div>
    );
}

export default InstructorCard;