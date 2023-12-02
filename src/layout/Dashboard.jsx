import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaMicroblog, FaUsers } from "react-icons/fa";
import { BiSolidDonateHeart } from "react-icons/bi";
import { MdOutlineContentPaste } from "react-icons/md";
const Dashboard = () => {

  const isAdmin = true;


  return (
    <div className="flex">
      <div className="w-64 bg-red-300 min-h-screen">
        <div className="px-4 pt-8">
        <img
            src="https://i.ibb.co/Gx4MtqY/logo.png"
            alt="logo"
            className="w-full text-2xl"
          />
       
        </div>
        <div className="divider px-3"></div>
        <ul className="menu font-medium text-lg space-y-3">
          {
            isAdmin ? <>
            
            <li>
            <NavLink to="/dashboard/adminHome"><FaHome></FaHome>Admin Home</NavLink>
                  </li>
                  
                  <li>
            <NavLink to="/dashboard/allUsers"><FaUsers />All Users</NavLink>
                  </li>
            
                  <li>
            <NavLink to="/dashboard/all-blood-donation-request"><BiSolidDonateHeart />Donation Requests</NavLink>
              </li>
              
              <li>
            <NavLink to="/dashboard/contentManagement"><MdOutlineContentPaste />Content Management</NavLink>
                  </li>
                  
            </>
              :
              <>
              <li>
            <NavLink to="/dashboard/donorHome"><FaHome></FaHome>Donor Home</NavLink>
                  </li>
                  
                  <li>
            <NavLink to="/dashboard/profile">Profile</NavLink>
                  </li>
              
              
              </>
          }
                  
          

          {/* shared navlinks */}

          <div className="divider"></div>

          <li>
            <NavLink to="/"><FaHome></FaHome>Home</NavLink>
          </li>
          
          <li>
            <NavLink to="/blog"><FaMicroblog></FaMicroblog>Blog</NavLink>
                  </li>
        </ul>
      </div>
      <div className="flex-1  bg-slate-100">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
