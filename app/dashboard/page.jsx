"use client"

import { TiArrowShuffle } from "react-icons/ti";
import { FaListUl } from "react-icons/fa";
import { LuCheckSquare } from "react-icons/lu";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { ApiCountBalance } from "../components/ApiCountDisplay";

const tools = [
  {
    label: "Create a Matching Worksheet",
    icon: <TiArrowShuffle className="h-5 w-5" />,
    href: "/worksheets/matching",
    bgColor: "bg-violet-500/10",
    color: "text-violet-500"
  },
  {
    label: "Create a Multiple Choice Worksheet",
    icon: <FaListUl className="h-5 w-5" />,
    href: "/worksheets/multiple-choice",
    bgColor: "bg-pink-700/10",
    color: "text-pink-700"
  },
  {
    label: "Create a Fill-In-The-Blanks Worksheet",
    icon: <MdOutlineFileDownloadDone className="h-5 w-5" />,
    href: "/worksheets/fill-in-the-blanks",
    bgColor: "bg-orange-700/10",
    color: "text-orange-700"
  },
  {
    label: "Create a Grammar Correction Worksheet",
    icon: <LuCheckSquare className="h-5 w-5" />,
    href: "/worksheets/grammar-correction",
    bgColor: "bg-emerald-500/10",
    color: "text-emerald-500"
  },
]


const DashboardPage = () => {

  const router = useRouter();
    
  return (
    <div className="py-20">
      <div className="space-y-6 pb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center">Create Amazing ESL Worksheets in Seconds with the help of AI!</h2>
        <ApiCountBalance />
        <p className="text-sm md:text-lg text-center text-gray-500">Choose the type of worksheet you wish to create:</p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-6">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="border-2 border-gray-100 shadow rounded-md flex justify-between items-center hover:shadow-lg hover:bg-gray-100 cursor-pointer p-3"
            onClick={() => router.push(tool.href)}
          >
            <div className="flex items-center">
              <div className={`bg-gray-200 p-3 rounded mr-3 ${tool.bgColor} ${tool.color}`}>{tool.icon}</div>
              <div>{tool.label}</div>
            </div>
            <div><FaArrowRight className="text-gray-400" /></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage;