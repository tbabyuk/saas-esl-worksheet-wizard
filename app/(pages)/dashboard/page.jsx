import { TiArrowShuffle } from "react-icons/ti";
import { FaListUl } from "react-icons/fa";
import { LuCheckSquare } from "react-icons/lu";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { ApiCountDisplay } from "../../components/ApiCountDisplay";
import { Suspense } from "react";
import Loading from "../loading";
import Link from "next/link";


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
    
  return (
    <div className="py-16">
      <div className="mb-16">
        <h2 className="text-2xl md:text-3xl mb-5 font-bold text-center">Create Amazing ESL Worksheets in Seconds with the help of AI!</h2>
        <Suspense fallback={<Loading />}>
          <ApiCountDisplay />
        </Suspense>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-6">
        {tools.map((tool, index) => (
          <Link
            key={index}
            href={tool.href}
            className="border-2 border-gray-100 shadow rounded-md flex justify-between items-center hover:shadow-lg hover:bg-gray-100 cursor-pointer p-3"
          >
            <div className="flex items-center">
              <div className={`bg-gray-200 p-3 rounded mr-3 ${tool.bgColor} ${tool.color}`}>{tool.icon}</div>
              <div>{tool.label}</div>
            </div>
            <div><FaArrowRight className="text-gray-400" /></div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage;