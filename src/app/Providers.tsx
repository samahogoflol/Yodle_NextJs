"use client";

import { ReactNode } from "react";
import { BookingProvider } from "../store/BookingDetailsContext";

export const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <BookingProvider>
            {children}
        </BookingProvider>
    );
};