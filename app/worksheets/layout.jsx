





import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";



export default function WorksheetsLayout({ children }) {
    // hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900
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