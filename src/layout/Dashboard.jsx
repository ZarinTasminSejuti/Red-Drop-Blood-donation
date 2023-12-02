import { NavLink, Outlet } from "react-router-dom";
import { FaHome } from "react-icons/fa";
const Dashboard = () => {
  return (
    <div className="flex">
      <div className="w-64 bg-red-600 min-h-screen">
        <ul className="menu font-medium text-lg space-y-3 mt-10">
          <li>
            <NavLink to="/dashboard/donorHome"><FaHome></FaHome>Donor Home</NavLink>
                  </li>
                  
                  <li>
            <NavLink to="/dashboard/profile">Profile</NavLink>
                  </li>
                  

          <div className="divider"></div>

          <li>
            <NavLink to="/"><FaHome></FaHome>Home</NavLink>
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
