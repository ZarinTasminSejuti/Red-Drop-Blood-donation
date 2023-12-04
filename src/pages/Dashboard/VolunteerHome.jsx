import Profile from "./Profile";
import { FaUser} from "react-icons/fa";
import { BiSolidDonateHeart } from "react-icons/bi";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "react-query";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
const VolunteerHome = () => {
    const { userDetails } = useContext(AuthContext);
    const [AllData, setAllData] = useState([]);
 
    const axiosSecure = useAxiosSecure();

  const { data: users = [] } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allUsers");
      return res.data;
    },
  });





  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/CreateDonation");
        const data = await response.json();
        setAllData(data);
       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(AllData?.length);
    return (
        <div>
            <div className="">
                <h2 className="text-3xl text-center">Welcome Volunteer! {userDetails?.displayName }</h2>
                <div className="flex items-center gap-12 p-3">
        <div className="card w-1/2 bg-base-100 shadow-md">
          <div className="card-body items-center text-left">
            <h2 className="card-title"><FaUser />Total Users</h2>
            <p className="text-xl">{users?.length}</p>
           
          </div>
          </div>
          
          <div className="card w-1/2 bg-base-100 shadow-md">
          <div className="card-body items-center text-center">
            <h2 className="card-title"><BiSolidDonateHeart />Total Donation Request {AllData?.length}</h2>
            <p className="text-xl"></p>
           
          </div>
        </div>
        </div>
                <Profile></Profile>
            </div>
        </div>
    );
};

export default VolunteerHome;