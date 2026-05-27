import Link from "next/link";
import { FooterCompanyLogo } from "../../ui/icons/FooterCompanyLogo";

const Footer = () => {
return (
    <div className="pb-15 md:pb-0 text-center md:text-left bg-white flex flex-col md:grid md:grid-cols-4 w-full leading-[130%]" >
        <div id="header" className= "flex justify-center md:justify-start mt-15.5 md:mt-[150px] mb-5 md:mb-[150px] md:pl-12 text-[#2E78E5]">
            <Link href="/#header">
               <FooterCompanyLogo/>
            </Link>
        </div>
        <div className="md:hidden">
            <ul className="flex flex-col gap-2">
                <li>
                    <a href="tel:+4408762122213" className="block  hover:text-[#2E78E5]"> +1 916 690 1778</a>
                </li>
                <li className="mb-5">
                    <a href="mailto:yodle.info@gmail.com &body=Your text" className="hover:text-[#2E78E5] cursor-pointer">yodle.info@gmail.com</a>   
                </li>
            </ul>
        </div>  
        <div className="md:mt-30">
            <nav>
                <ul className="flex flex-col gap-2">
                    <li>
                        <Link className="cursor-pointer hover:text-blue-400" href="/#our-instructors">
                            Our instructors
                        </Link>
                    </li>    
                    <li>
                        <Link className="cursor-pointer hover:text-blue-400" href="/#how-to-book">
                            How to book
                        </Link>
                    </li>
                    
                    <li>
                        <Link className=" cursor-pointer hover:text-blue-400" href="/#partners">
                            Partners
                        </Link>
                    </li>
                    <li>
                        <Link className="cursor-pointer hover:text-blue-400" href="/#reviews">
                            Reviews
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
        <div className="mt-5 md:mt-30 flex justify-center md:justify-start">
            <nav>
                <ul className="flex flex-col gap-2">
                    <li>
                        <Link href="/privacy-policy" className="hover:text-[#2E78E5]">
                            Privacy Policy
                        </Link>
                    </li>
                    <li>
                        <Link href="/public-offer" className="hover:text-[#2E78E5] ">
                            Public Offer 
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
        <div className="hidden md:block mt-30">
            <nav>
                <ul className="flex flex-col gap-2">
                    <li>
                        <a href="tel:+4408762122213" className="hover:text-[#2E78E5] cursor-pointer">+1 916 690 1778 </a>   
                    </li>
                     <li className="mb-[29px]">
                        <a href="mailto:yodle.info@gmail.com &body=Your text" className="hover:text-[#2E78E5] cursor-pointer">yodle.info@gmail.com</a>   
                    </li>
                </ul>
            </nav>
        </div>     
    </div>
    )
}

export default Footer;