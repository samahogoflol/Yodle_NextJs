import Link from "next/link";
import Image from "next/image";
import page404BG from "../../public/images/404BG.png";
import { Digit4Icon } from "@/src/components/ui/icons/Digits4Icon";
import { Snow404Icon } from "@/src/components/ui/icons/Snow404Icon";
import ButtonSearchInstructor from "@/src/components/ui/ButtonSearchInstructor";

const Page404 = () => {

    return (
        <>  
            <style>{`#global-footer { display: none !important; }`}</style>
            <div className="relative flex justify-center text-center leading-[130%]">
                <Image 
                    src={page404BG} 
                    className="w-full h-screen md:h-full object-cover " 
                    alt="That 404 page z-0" 
                    priority 
                />
                
                <div className="px-3.5 flex flex-col justify-center items-center absolute mt-[170px]"> 
                    <div className="flex items-center gap-1">
                        <div>
                            <Digit4Icon className="w-15 md:w-35" />
                        </div>
                        <div>
                            <Snow404Icon className="w-25 md:w-65" />
                        </div>
                        <div>
                            <Digit4Icon className="w-15 md:w-35" />
                        </div>
                    </div>
                    
                    <div className="flex flex-col md:gap-6">
                        <span className="md:hidden text-[38px] leading-[100%] mt-5">Oops!</span>
                        <span className="md:hidden text-[38px] leading-[100%] mb-5">You've gone off-piste!</span>
                        <span className="hidden md:block text-[56px] font-semibold leading-[100%]">Oops! You've gone off-piste!</span>
                        <span className="text-[22px] mb-5 md:mb-0 md:text-[26px] md:font-semibold leading-[120%]">Looks like this trail doesn't exist...</span>
                        <span className="px-9 md:px-0 text-[16px] md:text-[20px] leading-[120%]">The page you're looking for took a wrong turn down the mountain.</span>
                    </div>
                   
                   <Link href="/" className="w-full md:w-auto mt-7.5 block">
                        <ButtonSearchInstructor
                            name="Back to Home"
                            className="w-full mb-10"
                        />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Page404;