import Image from "next/image";

export default function Home() {
  return (
      <header className="w-[100%] lg:h-[95vh] pt-14 md:pt-0 pb-64 px-5 md:px-12 xl:px-32 bg-[url('/images/hero-bg-3.jpg')] bg-cover flex flex-col-reverse lg:flex-row relative">
        <div className="w-full lg:w-1/2 text-gray-100 lg:pt-32 px-5 xl:px-16">
          <h1 className="text-[2.5rem] mb-6 text-4xl font-lora leading-normal">Generate customized and ready-to-teach ESL worksheets in minutes.</h1>
          <p className="text-lg mb-10 py-12 lg:py-0 font-roboto font-light leading-loose">Stop spending countless hours preparing for your class and take advantage of the power of PDF Worksheet Wizard!</p>
          <button className="btn btn-accent btn-lg text-gray-100 block mx-auto">Get Started</button>
        </div>
        <div className="w-full lg:w-1/2 pb-14 md:pt-20 lg:pt-32">
          <img src="/images/pdf.png" alt="English Teacher" className="object-cover w-[200px] md:w-[300px] mx-auto hover:rotate-6" />
        </div>
        <img src="/images/demo.png" alt="esl worksheet wizard demo" className="absolute bottom-0 left-[50%] animate-bounce h-[12%]" />
      </header>
  );
}
