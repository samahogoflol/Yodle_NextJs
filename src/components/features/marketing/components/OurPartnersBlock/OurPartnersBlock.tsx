import Image from "next/image"
import logo1 from "../../../../../../public/partners/mt_hood_logo.png"
import logo2 from "../../../../../../public/partners/Sugar_bowl_logo.png"
import logo3 from "../../../../../../public/partners/china_peak_logo.png"
import logo4 from "../../../../../../public/partners/MBSA_logo.png"
import mbsaMobile from "../../../../../../public/partners/MBSA_mobile.png"
import mtHoodMobile from "../../../../../../public/partners/mtHood_mobile.png"
import sugarBowlMobile from "../../../../../../public/partners/SugarBowl_mobile.png"

export const OurPartnersBlock = () => {
    return (
        <div id="partners" className="bg-white text-center py-15 md:py-25">
            <h2 className="text-[38px] md:text-[56px] font-medium md:font-semibold leading-[100%]">Reliable ski lesson partners for</h2>
            <div className="flex flex-col md:flex-row md:px-[146px] justify-between mt-10 md:mt-20">
                <Image className="hidden md:block" src={logo1} alt="MT. Hood Company" />
                <Image className="hidden md:block" src={logo2} alt="Sugar Bowl Company" />
                <Image className="hidden md:block" src={logo3} alt="China Peak Company" />
                <Image className="hidden md:block" src={logo4} alt="MT. Baker Company" />

                <div className="flex items-center justify-between px-15 mb-[40px] md:hidden ">
                    <Image className="md:hidden" src={mtHoodMobile} width={140} alt="MT. Hood Company" />
                    <Image className="md:hidden" src={sugarBowlMobile} width={70} alt="Sugar Bowl Company" />
                </div>
                <div className="flex items-center justify-between px-15 md:hidden ">
                    <Image className="md:hidden" src={mbsaMobile} width={80} alt="MT. Baker Company" />
                    <Image className="md:hidden" src={logo3} width={180} alt="China Peak Company" />
                </div>
            </div>
        </div>
    ) 
}