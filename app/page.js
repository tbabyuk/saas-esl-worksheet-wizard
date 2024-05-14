import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full h-[100vh]">
      <header className="w-[100%] h-[95%] md:px-12 bg-blue-950 flex flex-col md:flex-row">
        <div className="w-[50%] text-gray-100 pt-32 px-5 md:px-32">
          <h1 className="text-[2.5rem] mb-6">ESL Worksheet Wizard</h1>
          <p className="text-lg mb-10">Download and print full-customizable ESL Worksheets in minutes using the latest AI technology.</p>
          <button className="btn btn-secondary text-gray-100 btn-md">Get Started</button>
        </div>
        <div className="w-[50%] pt-32 overflow-hidden">
          <img src="/images/english-students.jpg" alt="English Teacher" className=" object-cover h-[60%] mx-auto" />
        </div>

      </header>
    </main>
  );
}
