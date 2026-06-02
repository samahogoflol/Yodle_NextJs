import { InstructorsProps } from "./instructor";

export interface BookingDetailsProps {
    instructor : InstructorsProps;
    bookingStartTime : string;
    bookingEndTime : string;
    lessonTime : string;
    numberOfParticipants : number;
}