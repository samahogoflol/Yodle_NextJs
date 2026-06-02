"use client"

import { useForm, FormProvider } from 'react-hook-form';
import { useBookingDetails } from '@/src/components/features/marketing/hooks/useBookingDetails';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation'; 
import { fullCheckoutSchema } from '@/src/components/features/marketing/schemas/secureCheckoutSchema';
import { PromocodeButton } from '@/src/components/features/secureCheckout/PromocodeButton';
import ContactInfo from '@/src/components/features/secureCheckout/ContactInfo';
import Payment from '@/src/components/features/secureCheckout/Payment';
import SummaryBlock from '@/src/components/features/SummaryBlock';

const SecureCheckout = () => {

    const { bookingDetails } = useBookingDetails();

    const methods = useForm({
        resolver: zodResolver(fullCheckoutSchema),
        mode: 'onBlur',
        defaultValues: {
            firstName: bookingDetails.firstName || "",
            lastName: bookingDetails.lastName || "",
            email: bookingDetails.email || "",
            phoneNumber: bookingDetails.phoneNumber || "",
        }
    });

    const router = useRouter();

    const onSubmit = () => {
        router.push("/bookingConfirmed");
    };

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        void methods.handleSubmit(onSubmit)(e);
    };

    return (
        <FormProvider {...methods}>
            <div className="relative z-10 leading-[130%] mt-26 md:mt-40">
                <h1 className="text-[38px] md:text-[56px] md:font-semibold text-center leading-[100%]">Secure Checkout</h1>
                <form id="checkout-form" onSubmit={onFormSubmit}>
                    <div className="md:grid md:grid-cols-5 px-4 md:px-[189px] gap-7 z-10 pt-[30px] md:pt-[85px] pb-15 md:pb-[184px]">
                        
                        <div className="flex flex-col col-span-3 gap-5 md:gap-11">
                            <ContactInfo />
                            <Payment />
                            <div className="block md:hidden">
                                <PromocodeButton />
                            </div>
                        </div>
                        
                        <div className="col-span-2 z-10" >
                            <div className="hidden md:block mb-6">
                                <PromocodeButton />
                            </div>
                            <SummaryBlock
                                showLocation={true}
                                showDataAndTime={true}
                                showInstructor={true}
                                showParticipants={false}
                                showType={false}
                                buttonText="Place your order"
                                totalPriceStyles="flex text-[26px] font-semibold justify-between w-full p-4"
                                formId="checkout-form" 
                            />
                        </div> 
                    </div>
                </form>
            </div>
        </FormProvider>
    )  
}

export default SecureCheckout;