// import { Navbar } from "../components/Navbar";
// import { Sidebar } from "../components/Sidebar";

import { Topnav } from "../components/Topnav";
import { Sidenav } from "../components/Sidenav";

export default function WorksheetsLayout({ children }) {
    
    return (
        <>
            <div className="hidden md:flex md:flex-col md:w-[210px] md:fixed md:inset-y-0 bg-gray-900">
                <Sidenav />
            </div>
            <div className="md:ml-[210px]">
                <Topnav />
                <main>
                    {children}
                </main>
            </div>
        </>
    )
  }