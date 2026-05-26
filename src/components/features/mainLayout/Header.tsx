"use client"; 

import Link from "next/link"; 
import { usePathname, useRouter } from "next/navigation"; 
import { useState } from "react";

import { HeaderCompanyLogo } from "../../ui/icons/HeaderCopmanyLogo";
import { BurgerMenuIcon } from "../../ui/icons/BurgerMenuIcon";
import { BurgerMenu } from "../../BurgerMenu";
import { PersonIcon } from "../../ui/icons/PersonIcon";
import { ArrowBack } from "../../ui/icons/ArrowBackIcon";
import RegisterForm from "../auth/RegisterForm/RegisterForm";
import LoginForm from "../auth/LoginForm/LoginForm";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState<"login" | "register" | null>(null);
    
    const pathname = usePathname(); 
    const router = useRouter();
    const isMainPage = pathname === "/";

    const closeModal = () => setModalType(null);

    return (
        <header id="header" className="flex items-center justify-between px-4 md:px-10 leading-[130%] bg-white w-full relative">
            <div className="block md:hidden">
                {isMainPage ? (
                    <>
                        <button 
                            className={`${isOpen ? "text-[#2E78E5]" : ""}`}
                            onClick={() => setIsOpen(!isOpen)}>
                            <BurgerMenuIcon />
                        </button>
                        <BurgerMenu
                            isOpen={isOpen}
                            onClose={() => setIsOpen(false)}
                        />
                    </>
                ) : (
                    <button 
                        className="flex items-center justify-center p-1 cursor-pointer"
                        onClick={() => router.back()} 
                    >
                        <ArrowBack width="30" height="30" />
                    </button>
                )}
            </div>

            <div className="text-[#2E78E5]">
                <Link href="/">
                    <HeaderCompanyLogo/>
                </Link>
            </div>
            
            <div 
                className="block md:hidden text-black cursor-pointer"
                onClick={() => {
                    setModalType("register");
                    setIsOpen(false);
                }}
            >
                <PersonIcon height="25px" width="25px" viewBox="0 0 20 20" />
            </div>
            
            <nav className="hidden md:flex">
                <ul className="flex gap-6">
                    <Link href="/#our-instructors">
                        <li className="cursor-pointer hover:text-[#2E78E5]">Our instructors</li>    
                    </Link>
                    <Link href="/#how-to-book">
                        <li className="cursor-pointer hover:text-[#2E78E5]">How to book</li>
                    </Link>
                    <Link href="/#partners">
                        <li className="cursor-pointer hover:text-[#2E78E5]">Partners</li>
                    </Link>
                    <Link href="/#reviews">
                        <li className="cursor-pointer hover:text-[#2E78E5]">Reviews</li>
                    </Link>
                </ul>
            </nav>
            
            <div className="hidden md:flex items-center justify-end gap-10">
                <a className="hover:text-blue-400" href="tel:+4408762122213">+1 916 690 1778</a>
                <button
                    type="button" 
                    onClick={() => setModalType("register")}
                    className="hidden md:block text-black cursor-pointer">
                    <PersonIcon height="25px" width="25px" viewBox="0 0 20 20" />
                </button>
            </div>

            {modalType === "register" && (
                <RegisterForm 
                    onSuccess={(email) => {
                        console.log("Registered:", email);
                        closeModal();
                    }}
                    onClose={closeModal}
                    onSwitchMode={() => setModalType("login")}
                />
            )}

            {modalType === "login" && (
                <LoginForm 
                    onSuccess={(email) => {
                        console.log("Logged in:", email);
                        closeModal();
                    }}
                    onClose={closeModal}
                    onSwitchMode={() => setModalType("register")}
                />
            )}
        </header>
    );
};

export default Header;