import ForYouBlock from "@/src/components/features/marketing/components/ForYouBlock/ForYouBlock";
import HeroSection from "@/src/components/features/marketing/components/HeroSection/HeroSection";
import { HowToBookBlock } from "@/src/components/features/marketing/components/HowToBookBlock/HowToBookBlock";
import { OurPartnersBlock } from "@/src/components/features/marketing/components/OurPartnersBlock/OurPartnersBlock";
import { ReviewsSwiper } from "@/src/components/features/marketing/components/ReviewsSwiper/ReviewsSwiper";

export default function Home() {
  return (
    <div>
      <HeroSection/>
      <ForYouBlock/>
      <HowToBookBlock/>
      <OurPartnersBlock/>
      <ReviewsSwiper/>
    </div>
  );
}
