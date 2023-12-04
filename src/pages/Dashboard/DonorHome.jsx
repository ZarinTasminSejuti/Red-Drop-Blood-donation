import Profile from "./Profile";

import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import RecentDonation from "../../components/RecentDonation";


const DonorHome = () => {
  

    const { userDetails } = useContext(AuthContext);


    return (
        <div>
            <div className="">
                <h2 className="text-3xl text-center">Welcome Donor! {userDetails.displayName }</h2>
                <div className="flex items-center gap-12 p-3">
        
        </div>
          <Profile></Profile>
          <RecentDonation></RecentDonation>
            </div>
        </div>
    );
};

export default DonorHome;