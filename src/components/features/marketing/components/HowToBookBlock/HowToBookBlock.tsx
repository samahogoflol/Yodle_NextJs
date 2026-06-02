import { HowToBookCard } from "./HowToBookCard";
import BigSnow from "@/src/components/ui/icons/BigSnow";

export const HowToBookBlock = () => {
    return(
        <div id="how-to-book" className="relative pt-15 md:pt-30 pb-20 md:pb-30">
            <h1 className="hidden md:block md:text-[56px] text-center leading-[100%] pb-15">How to book your lesson</h1>
            <h1 className="md:hidden text-[38px] text-center leading-[100%] pb-10 md:pb-15">How to book <br/> your lesson</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5 md:px-15 mb-5">
                <HowToBookCard
                    title="Choose your location"
                    number="01"
                    subtitle="Select your favorite ski resort"
                />
                <HowToBookCard
                    title="Pick your date & time"
                    number="02"
                    subtitle="Choose date, time, and lesson duration"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5 md:px-15 mb-5">
                <div className="hidden md:block"></div>
               <HowToBookCard
                    title="Select your instructor"
                    number="03"
                    subtitle="Browse certified pros and check their ratings"
                />
                <HowToBookCard
                    title="Secure payment"
                    number="04"
                    subtitle="Book instantly with our secure checkout"
                /> 
            </div>
            <div className="hidden md:block absolute md:top-50 md:right-0">
                <BigSnow
                    width="580px"
                    height="580px"
                    viewBox="0 0 620 570"
                />
            </div>
            <div className="absolute top-25 md:top-115 md:left-105">
                <BigSnow
                    width="60px"
                    height="60px"
                    viewBox="0 0 620 570"
                />
            </div>
        </div>  
    )
}
