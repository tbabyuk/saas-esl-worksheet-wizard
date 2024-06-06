import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";


export default function DashboardLayout({ children }) {
    
    return (
        <>
            <div className="hidden md:flex md:flex-col md:w-[210px] md:fixed md:inset-y-0 bg-gray-900">
                <Sidebar />
            </div>
            <div className="md:ml-[210px]">
                <Navbar />
                <main>
                    {children}
                </main>
            </div>
        </>
    )
  }