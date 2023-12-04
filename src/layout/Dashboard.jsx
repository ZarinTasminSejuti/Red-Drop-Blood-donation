import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaMicroblog, FaUsers } from "react-icons/fa";
import { BiSolidDonateHeart } from "react-icons/bi";
import { MdOutlineContentPaste } from "react-icons/md";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "react-query";

import AdminHome from "../pages/Dashboard/AdminHome";
import DonorHome from "../pages/Dashboard/DonorHome";
import VolunteerHome from "../pages/Dashboard/VolunteerHome";

const Dashboard = () => {
  const { userDetails } = useContext(AuthContext);
  const [changeDashLayout, setChangeDashLayout] = useState(null);

  const axiosSecure = useAxiosSecure();

  const { data: users = [] } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allUsers");
      return res.data;
    },
  });

  const adminFilter = users?.filter(
    (user) => userDetails.email === user?.email
  );

  const roleFound = adminFilter[0]?.role;

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
          {roleFound === "admin" ? (
            <>
              <li onClick={() => setChangeDashLayout(false)}>
                <NavLink to="/dashboard">
                  <FaHome></FaHome>Admin Home
                </NavLink>
              </li>

              <li onClick={() => setChangeDashLayout(true)}>
                <NavLink to="/dashboard/allUsers">
                  <FaUsers />
                  All Users
                </NavLink>
              </li>

              <li onClick={() => setChangeDashLayout(true)}>
                <NavLink to="/dashboard/all-blood-donation-request">
                  <BiSolidDonateHeart />
                  Donation Requests
                </NavLink>
              </li>

              <li onClick={() => setChangeDashLayout(true)}>
                <NavLink to="/dashboard/contentManagement">
                  <MdOutlineContentPaste />
                  Content Management
                </NavLink>
              </li>
            </>
          ) : roleFound === "donor" ? (
            <>
              <li onClick={() => setChangeDashLayout(false)}>
                <NavLink to="/dashboard">
                  <FaHome></FaHome>Donor Home
                </NavLink>
              </li>

              <li onClick={() => setChangeDashLayout(true)}>
                <NavLink to="/dashboard/createDonation">
                  <BiSolidDonateHeart />
                 Create Donation Requests
                </NavLink>
                </li>
                <li onClick={() => setChangeDashLayout(true)}>
                <NavLink to="/dashboard/my-donation-requests">
                  <BiSolidDonateHeart />
                 My Donation Requests
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li onClick={() => setChangeDashLayout(false)}>
                <NavLink to="/dashboard">
                  <FaHome></FaHome>Volunteer Home
                </NavLink>
              </li>

              <li onClick={() => setChangeDashLayout(true)}>
                <NavLink to="/dashboard/all-blood-donation-request">
                  <BiSolidDonateHeart />
                  Donation Requests
                </NavLink>
              </li>
            </>
          )}

          {/* shared navlinks */}

          <div className="divider"></div>

          <li>
            <NavLink to="/">
              <FaHome></FaHome>Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/blog">
              <FaMicroblog></FaMicroblog>Blog
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="flex-1 bg-slate-100 pt-32 p-14">
        {roleFound === "admin" && changeDashLayout === null &&  changeDashLayout === false ? (
          <>
            <AdminHome></AdminHome>
          </>
        ) : roleFound === "donor" && changeDashLayout === null &&  changeDashLayout === false ? (
          <>
            <DonorHome></DonorHome>
          </>
        ) : roleFound === "volunteer" && changeDashLayout === null &&  changeDashLayout === false ? (
          <>
            <VolunteerHome></VolunteerHome>
          </>
        ) : null}

        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
