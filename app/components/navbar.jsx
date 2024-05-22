import { GiHamburgerMenu } from "react-icons/gi";
import { RxHamburgerMenu } from "react-icons/rx";
import { MobileSidebar } from "./mobileSidebar";
import { Sidebar } from "./sidebar";



export const Navbar = () => {

  return (
      <div className="h-12 bg-[#4C956C]">
        <div className="drawer md:hidden">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
              <RxHamburgerMenu size="1.6rem" className="text-gray-100" />
            </label>
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