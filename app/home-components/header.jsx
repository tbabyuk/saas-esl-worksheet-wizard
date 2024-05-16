



export const HeaderSection = () => {
    
  return (
        <header className="w-[100%] lg:h-[95vh] pt-14 md:pt-0 pb-64 px-5 md:px-12 xl:px-32 bg-[url('/images/hero-bg-3.jpg')] bg-cover flex flex-col-reverse lg:flex-row relative">
            <div className="w-full lg:w-1/2 text-gray-100 lg:pt-32 px-5 xl:px-16">
            <h1 className="text-[2.5rem] mb-2 text-4xl font-lora leading-tight">Generate customized, ready-to-teach ESL worksheets in minutes.</h1>
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
    )
}