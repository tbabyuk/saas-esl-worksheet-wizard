import { RxHamburgerMenu } from "react-icons/rx";
import { Sidebar } from "./Sidebar";
import { UserButton } from "@clerk/nextjs";


export const Navbar = () => {

  return (
      <div className="h-[45px] bg-wizard-dark-blue">
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content text-white relative">
            {/* Page content here */}
            <label htmlFor="my-drawer" className="btn btn-ghost drawer-button md:hidden">
              <RxHamburgerMenu size="1.6rem" className="text-gray-100" />
            </label>
            <div className="absolute top-2.5 right-3"><UserButton afterSignOutUrl="/"  /></div>
          </div> 
          <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-0 w-[210px] min-h-full bg-[#111827] text-base-content">
              {/* Sidebar content here */}
              <Sidebar />
            </ul>
          </div>
        </div>
      </div>
  )
}