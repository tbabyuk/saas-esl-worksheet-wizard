import Image from "next/image";
import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";



export default function Home() {
  return (
    <>
        <div className="flex justify-end items-center mt-5 mr-5 absolute top-0 right-0">
            <Link href="/sign-up" className="btn btn-outline btn-sm btn-accent mr-4">Register</Link>
            <span className="text-wizard-white">OR</span>
            <Link href="/sign-in" className="btn btn-outline btn-sm btn-secondary text-wizard-white ms-4">Sign In</Link>
        </div>
        {/* HEADER SECTION */}
        <div className="hero bg-[url('/images/hero-bg-2.jpg')] bg-cover min-h-screen py-20">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="flex-1 grid place-items-center">
                    <img src="/images/pdf.png" className="w-[200px] md:w-[300px] rounded-lg" />
                </div>
                <div className="flex-1 px-5">
                    <h1 className="text-5xl leading-tight font-lora text-wizard-white">Generate customized, ready-to-teach ESL worksheets in seconds!</h1>
                    <ul className="text-md mb-4 py-6 font-roboto font-tight text-wizard-white font-light">
                        <li className="mb-3">1. Choose the type of exercise you want to create</li>
                        <li className="mb-3">2. Choose your options</li>
                        <li>3. Download and print your generated PDF!</li>
                    </ul>
                    <Link href="/sign-up" className="btn btn-lg btn-accent text-wizard-white">Get Started</Link>
                </div>
            </div>
        </div>

        {/* PRICING SECTION */}
        <div className="min-h-[90vh] py-20 md:px-12">
          <p className="text-center text-4xl mb-12">Choose Your Plan</p>
          <div className="flex justify-center flex-wrap gap-3">
                {/* {planOptions.map((plan, index) => <PriceCard key={index} name={plan.name} cost={plan.cost} features={plan.features} />)} */}
          </div>
        </div>

    </>
  );
}
