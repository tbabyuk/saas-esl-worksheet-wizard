import Image from "next/image";

import { HeaderSection } from "./home-components/Header";
import { PricingSection } from "./home-components/Pricing";

export default function Home() {
  return (
    <>
      {/* HEADER SECTION */}
      <header className="w-[100%] lg:h-[95vh] pt-14 md:pt-0 pb-64 px-5 md:px-12 xl:px-32 bg-[url('/images/hero-bg-3.jpg')] bg-cover flex flex-col-reverse lg:flex-row relative">
            <div className="w-full lg:w-1/2 text-gray-100 lg:pt-32 px-5 xl:px-16">
            <h1 className="text-[2.5rem] mb-2 text-4xl font-lora leading-tight">Generate customized, ready-to-teach ESL worksheets in seconds!</h1>
            <ul className="text-md mb-4 py-6 font-roboto font-light">
                <li className="mb-3">1. Choose the topic you want to focus on</li>
                <li className="mb-3">2. Select the type of worksheet you want (e.g. matching, fill-in-the-blanks, multiple choice, etc.)</li>
                <li>3. Download and print your generated PDF!</li>
            </ul>
            <button className="btn btn-accent btn-lg text-gray-100 block">Get Started</button>
            </div>
            <div className="w-full lg:w-1/2 pb-14 md:pt-20 lg:pt-32">
            <img src="/images/pdf.png" alt="English Teacher" className="object-cover w-[200px] md:w-[300px] mx-auto hover:rotate-6" />
            </div>
        </header>

        {/* PRICING SECTION */}
        <div className="min-h-[90vh] py-20 px-5 md:px-12">
          <p className="text-center text-4xl mb-12">Choose Your Plan</p>
          <div className="flex justify-center flex-wrap gap-3">
              <div className="bg-primary-light rounded-md shadow-md h-[400px] w-[90%] max-w-[280px] p-4 grid place-items-center cursor-pointer hover:bg-[#142766] hover:scale-110">
                  <div className="flex flex-col">
                      <span className="font-roboto font-light text-gray-200 text-2xl mb-10 text-center">1 - Day Pass</span>
                      <span className="font-roboto font-bold text-gray-200 text-4xl text-center">$5.00</span>
                      <hr className="my-8"></hr>
                      <span className="text-lg text-gray-200 text-center">Unlimited Downloads</span>
                      <hr className="my-8"></hr>
                      <button className="btn btn-accent text-gray-200">CHOOSE PLAN</button>
                  </div>
              </div>
              <div className="bg-primary-light rounded-md shadow-md h-[400px] w-[90%] max-w-[280px] p-4 grid place-items-center cursor-pointer hover:bg-[#142766] hover:scale-110">
                  <div className="flex flex-col">
                      <span className="font-roboto font-light text-gray-200 text-2xl mb-10 text-center">7 - Day Pass</span>
                      <span className="font-roboto font-bold text-gray-200 text-4xl text-center">$10.00</span>
                      <hr className="my-8"></hr>
                      <span className="text-lg text-gray-200 text-center">Unlimited Downloads</span>
                      <hr className="my-8"></hr>
                      <button className="btn btn-accent text-gray-200">CHOOSE PLAN</button>
                  </div>
              </div>
              <div className="bg-primary-light rounded-md shadow-md h-[400px] w-[90%] max-w-[280px] p-4 grid place-items-center cursor-pointer hover:bg-[#142766] hover:scale-110">
                  <div className="flex flex-col">
                      <span className="font-roboto font-light text-gray-200 text-2xl mb-10 text-center">14 - Day Pass</span>
                      <span className="font-roboto font-bold text-gray-200 text-4xl text-center">$15.00</span>
                      <hr className="my-8"></hr>
                      <span className="text-lg text-gray-200 text-center">Unlimited Downloads</span>
                      <hr className="my-8"></hr>
                      <button className="btn btn-accent text-gray-200">CHOOSE PLAN</button>
                  </div>
              </div>
              <div className="bg-primary-light rounded-md shadow-md h-[400px] w-[90%] max-w-[280px] p-4 grid place-items-center cursor-pointer hover:bg-[#142766] hover:scale-110">
                  <div className="flex flex-col">
                      <span className="font-roboto font-light text-gray-200 text-2xl mb-10 text-center">30 - Day Pass</span>
                      <span className="font-roboto font-bold text-gray-200 text-4xl text-center">$25.00</span>
                      <hr className="my-8"></hr>
                      <span className="text-lg text-gray-200 text-center">Unlimited Downloads</span>
                      <hr className="my-8"></hr>
                      <button className="btn btn-accent text-gray-200">CHOOSE PLAN</button>
                  </div>
              </div>
          </div>
        </div>

    </>
  );
}
