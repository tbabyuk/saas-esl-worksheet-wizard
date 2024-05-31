"use client"
import Link from "next/link"
import Image from "next/image"
import { IoSettingsOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { TiArrowShuffle } from "react-icons/ti";
import { FaListUl } from "react-icons/fa";
import { LuCheckSquare } from "react-icons/lu";
import { MdOutlineFileDownloadDone } from "react-icons/md";



const routes = [
  {
    label: "Dashboard",
    icon: <LuLayoutDashboard className="h-[18px] w-[18px] mr-3" />,
    href: "/dashboard",
  },
  {
    label: "Matching",
    icon: <TiArrowShuffle className="h-5 w-5 mr-3" />,
    href: "/worksheets/matching",
    color: "text-violet-500"
  },
  {
    label: "Multiple Choice",
    icon: <FaListUl className="h-4 w-4 mr-4" />,
    href: "/worksheets/multiple-choice",
    color: "text-pink-700"
  },
  {
    label: "Fill in the blanks",
    icon: <MdOutlineFileDownloadDone className="h-5 w-5 mr-3" />,
    href: "/worksheets/fill-in-the-blanks",
    color: "text-orange-700"
  },
  {
    label: "Grammar Correction",
    icon: <LuCheckSquare className="h-4 w-4 mr-4" />,
    href: "/worksheets/grammar-correction",
    color: "text-emerald-500"
  },
  {
    label: "Settings",
    icon: <IoSettingsOutline className="h-5 w-5 mr-3" />,
    href: "/settings"
  },
]


export const Sidebar = () => {

  return (
        <aside className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
          <div className="px-3 py-2 flex-1">
            <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                <div className="relative w-5 h-5 mr-2">
                  <Image
                    fill
                    alt="logo"
                    src="/images/logo.png"
                    className="w-2"
                  />
                </div>
                <h1 className="text-sm font-semibold">ESL Worksheet Wizard</h1>
            </Link>
            <div className="space-y-1">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="text-sm group flex p-3 w-full justify-start cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition"
                >
                  <div className="flex items-center flex-1">
                    <span className={`${route.color}`}>{route.icon}</span>
                    {route.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>    
  )
}