import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css"
import Header from "../components/features/mainLayout/Header";
import Footer from "../components/features/mainLayout/Footer";
import { Providers } from "./Providers";

const urbanist = Urbanist({
  subsets: ["latin"], 
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yodle | US Ski Resort & Instructor Booking",
  description: "Yodle is your ultimate guide to US ski resorts. Book the best mountain locations and find professional instructors for a perfect winter getaway.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className="scroll-smooth">
      <body className={urbanist.className}>
        <Providers> 
          <Header/>
          
          <main className="min-h-screen">
            {children}
          </main>

          <Footer/>
        </Providers>
      </body>
    </html>
  );
}