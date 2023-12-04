import { BsThreeDotsVertical } from "react-icons/bs";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { useQuery } from "react-query";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
// import swal from "sweetalert";
// import { useContext, useState } from "react";
// import { AuthContext } from "../../../providers/AuthProvider";

const MyDonation = () => {
    const navigate = useNavigate();
    const [somethingHappend, setSomethingHappend] = useState(true);
    const donationCollection = useLoaderData();
  const { userDetails } = useContext(AuthContext);
    
    const newCreateDonationCollection = donationCollection
    ?.filter((data) => data.requesterEmail === userDetails.email);


    // Function to handle user deletion
  const handleDelete = (Id) => {
    console.log(Id);
    fetch(`http://localhost:5000/deleteDonationData/${Id}`, {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          swal("Deleted!", "Donation Data has been deleted.", "success");
          setSomethingHappend(!somethingHappend);
          navigate("/dashboard/my-donation-requests");
        }
      });
  };
    
    
    
    return (
        <div>
            <div className="my-5 p-10 text-center">
        <h2 className="text-2xl">My Created All Donation Requests</h2>
        </div>
        {newCreateDonationCollection?.length === 0 ? <p className="text-slate-500 text-center">You do not have any donation request</p> :
          

          <div className="">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg pb-3">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        


                {/* table header */}
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Serial
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Recipient Profile
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Donation Date
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Donation Time
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Donation Status
                    </th>
               
               
                    <th scope="col" className="px-4 py-3">
                      Action
                    </th>
                  </tr>
                </thead>

                        



                {/* table body */}
                <tbody>
                  {newCreateDonationCollection.map((singleDonationData, index) => (
                    <tr
                      key={singleDonationData + 1}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <p>{index + 1}</p>
                        </div>
                      </td>

                      {/* user profile with map function */}
                      <th
                        scope="row"
                        className="flex items-center pl-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                      >
                    
                        <div className="p-3">
                          <div className="text-base font-semibold">
                            {singleDonationData.recipientName}
                          </div>
                          <div className="flex  flex-col gap-1 font-normal text-gray-500">
                            <p> Upazilla: {singleDonationData.recipientUpazila}</p>
                            <p> District: {singleDonationData.recipientDistrict}</p>
                          </div>
                        </div>
                      </th>
               

                      <td className="px-6 py-4 ">
                        <p>{singleDonationData.donationDate}</p>
                      </td>
                      <td className="px-6 py-4 ">
                        <p>{singleDonationData.donationTime}</p>
                      </td>
                      <td className="px-6 py-4">
                 
                        <div className="dropdown dropdown-bottom dropdown-end">
                          <div tabIndex={0} role="button" className=" m-1">
                            <button className=" rounded-md text-white font-bold bg-green-500 border-none btn-primary px-3 py-1"><BsThreeDotsVertical /></button>
                          </div>
                          <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                          >
                            <li>
                              <a>
                                Pending
                              </a>
                            </li>
                          
                            <li>
                              <a >
                                inprogress
                              </a>
                              {/* onClick={() => handleMVol(user)} */}
                            </li>
                            <li>
                              <a >Done</a>
                              {/* onClick={() => handleBlock(user)} */}
                            </li>
                            <li>
                              <a>Canceled</a>
                            </li>
                          </ul>
                        </div>
                   
                      </td>
                      {/* <td className="px-6 py-4">{user.role}</td> */}
                      <td className="pr-6 py-4">
                        <div className="flex justify-evenly items-center text-xl">
                          <a
                            href="#"
                            className="text-red-600"
                            onClick={() => handleDelete(singleDonationData._id)}
                          >
                            {" "}
                            <MdDelete />
                          </a>
                          <a
                            href="#"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            <FaEdit />
                          </a>

                      
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* pagination */}
              <nav
                className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 px-3 mt-20"
                aria-label="Table navigation"
              >
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                  Showing{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    1-10
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    1000
                  </span>
                </span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Previous
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      1
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      2
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      aria-current="page"
                      className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    >
                      3
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      4
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      5
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        }
        </div>
    );
};

export default MyDonation;