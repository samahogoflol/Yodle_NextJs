"use client"

import { useContext } from "react";
import { BookingContext } from "@/src/store/BookingDetailsContext";
import { BookingContextType } from "@/src/store/BookingDetailsContext";

export const useBookingDetails = (): BookingContextType => {
    const context = useContext(BookingContext);

    if (context === undefined || context === null) {
        throw new Error("useBookingDetails must be used within a BookingProvider");
    }
    return context; 
};