
import { useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import swal from "sweetalert";

const Navbar = () => {

 //navigate after logout
 const navigate = useNavigate();

 const { logOut,user,userDetails } = useContext(AuthContext);


 const handleLogOut = () => {
   logOut()
     .then(() => {
       swal("Logged Out successfully");
       navigate("/");
     })
     .catch((error) => {
       console.error(error);
     });
 };




  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/createDonation">Donation Request</Link>
      </li>
      <li>
        <Link to="/blog">Blog</Link>
      </li>
        <li>
          <Link to="/">Funding</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
    
    </>
  );

  return (
    <div className="w-full fixed z-40 bg-opacity-60 bg-black text-white">
      <div className="mx-auto max-w-screen-xl navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>

          <img
            src="https://i.ibb.co/Gx4MtqY/logo.png"
            alt="logo"
            className="w-1/3 h-1/2"
          />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>



      


      <div className="lg:w-1/2 flex flex-row justify-end text-white p-2 gap-2">
       {user ? (
         <>
           <img
             src={userDetails.photoURL}
             alt={userDetails.displayName}
             className="w-10 rounded "
           />

           <span className="text-white">{userDetails.displayName}</span>
           <button
             className="btn btn-ghost text-white hover:text-white hover:bg-red-600"
             onClick={handleLogOut}
           >
             Log Out
           </button>
         </>
       ) : (
         <>
              <Link to="/login">
                <button className="btn btn-ghost text-white hover:text-white hover:bg-black">
                  Login
                </button>
              </Link>
              <Link to="/registration">
                <button className="btn text-white btn-ghost hover:bg-black hover:text-white">
                  Register
                </button>
              </Link>
             </>
          )}  
      
         
        </div> 
        </div>
    </div>
  );
};

export default Navbar;
