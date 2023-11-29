import { useState, useEffect } from "react";
import Profile from "../components/Profile";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [recentDonations, setRecentDonations] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = { name: "John Doe" };
      const recentDonations = [
        { id: 1, date: "2023-01-01", description: "Donation Request 1" },
        { id: 2, date: "2023-02-15", description: "Donation Request 2" },
        { id: 3, date: "2023-03-20", description: "Donation Request 3" },
      ];

      setUserName(user.name);
      setRecentDonations(recentDonations);
    };

    fetchUserData();
  }, []);

  return (
    <div className="bg-slate-100">
    <div className="py-44 max-w-screen-xl mx-auto">
      <h1 className="text-black text-center text-3xl font-semibold mb-7 p-7">
        Welcome, {userName}!
      </h1>

      <div className="w-full">
       
        <Profile></Profile>
      </div>

      <div className="flex flex-row gap-7 mt-7">
        <div className="w-3/4 bg-white p-5">
          <div className="text-center">
            <h2 className="mb-10">Your Recent Donation Requests</h2>
            <table className="border border-red-500 border-2 w-full">
              <thead>
                <tr>
                  <th className="border border-red-500 p-2">Sl. No</th>
                  <th className="border border-red-500 p-2">Date</th>
                  <th className="border border-red-500 p-2">Description</th>
                </tr>
              </thead>
              <tbody>
                {recentDonations.map((donation) => (
                  <tr key={donation.id}>
                    <td className="border border-red-500 p-2">{donation.id}</td>
                    <td className="border border-red-500 p-2">{donation.date}</td>
                    <td className="border border-red-500 py-2 px-5 text-left">
                      {donation.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="bg-blue-500 text-white mt-7 py-2 px-4 rounded-md cursor-pointer">
              View All Requests
            </button>
          </div>
        </div>
        <div className="w-1/4 h-96 bg-white">hello</div>
      </div>
    </div>
  </div>
);
};


export default Dashboard;
