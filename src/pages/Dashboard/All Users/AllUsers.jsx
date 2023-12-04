import { BsThreeDotsVertical } from "react-icons/bs";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "react-query";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { userDetails } = useContext(AuthContext);
  const navigate = useNavigate();

  const [somethingHappend, setSomethingHappend] = useState(true);

  const { data: users = [] } = useQuery({
    queryKey: ["allUsers", somethingHappend],
    queryFn: async () => {
      const res = await axiosSecure.get("/allUsers");
      return res.data;
    },
  });

  const adminFilter = users?.filter(
    (user) =>
    userDetails.email === user?.email
  );

  const adminRoleFound = adminFilter[0]?.role === "admin" ? true : false;
  


  // Function to handle user deletion
  const handleDelete = (Id) => {
    console.log(Id);
    fetch(`https://red-drop-server-two.vercel.app/allUsers/${Id}`, {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          swal("Deleted!", "User has been deleted.", "success");
          setSomethingHappend(!somethingHappend);
          navigate("/dashboard/allUsers");
        }
      });
  };

  //Handle Block button
  //const handleEdit = (itemId) => {};

  //Handle MAdmin button
  const handleMAdmin = (user) => {
    const newUserInfo = {
      status: user.status,
      role: "admin",
    };

    fetch(`https://red-drop-server-two.vercel.app/updateUserInfo/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          swal("User Role Updated!", "Now You are Admin!", "success");
          setSomethingHappend(!somethingHappend);
          navigate("/dashboard/allUsers");
        }
      });
  };

  //Handle Block button
  const handleMVol = (user) => {
    const newUserInfo = {
      status: user.status,
      role: "volunteer",
    };

    fetch(`https://red-drop-server-two.vercel.app/updateUserInfo/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          swal("User Role Updated!", "Now You are volunteer!", "success");
          setSomethingHappend(!somethingHappend);
          navigate("/dashboard/allUsers");
        }
      });
  };

  //Handle MDonor button
  const handleMDonor = (user) => {
    const newUserInfo = {
      status: user.status,
      role: "donor",
    };

    fetch(`https://red-drop-server-two.vercel.app/updateUserInfo/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          swal("User Role Updated!", "Now You are Donor!", "success");
          setSomethingHappend(!somethingHappend);
          navigate("/dashboard/allUsers");
        }
      });
  };
  //Handle Block button
  const handleBlock = (user) => {
    const newUserInfo = {
      status: "block",
      role: user.role,
    };

    fetch(`https://red-drop-server-two.vercel.app/updateUserInfo/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          swal("Status Blocked!", "User is now blocked!", "success");
          setSomethingHappend(!somethingHappend);
          navigate("/dashboard/allUsers");
        }
      });
  };

  //Handle Active button
  const handleActive = (user) => {
    const newUserInfo = {
      status: "active",
      role: user.role,
    };

    fetch(`https://red-drop-server-two.vercel.app/updateUserInfo/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          swal("Status Active!", "User is now Active!", "success");
          setSomethingHappend(!somethingHappend);
          navigate("/dashboard/allUsers");
        }
      });
  };

  return (
    <div>
      <div className="my-5 p-10">
        <h2 className="text-2xl">Total Users: {users.length}</h2>
      </div>

      {/* user table */}
      <div className="p-10">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Serial
                </th>
                <th scope="col" className="px-4 py-3">
                  User Profile
                </th>
                <th scope="col" className="px-4 py-3">
                  Status
                </th>
                {/* <th scope="col" className="px-4 py-3">
                  Block/Unblock
                </th> */}
                <th scope="col" className="px-4 py-3">
                  Role
                </th>
                <th scope="col" className="px-4 py-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
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
                    <img
                      className="w-10 h-10 rounded-full"
                      src={user.image}
                      alt="profile image"
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">
                        {user.displayName || user.name}
                      </div>
                      <div className="font-normal text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {user.status === "active" ? (
                        <>
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                          <p>{user.status}</p>
                        </>
                      ) : (
                        <>
                          <div className="h-2.5 w-2.5 rounded-full bg-gray-500 me-2"></div>
                          <p>{user.status}</p>
                        </>
                      )}
                    </div>
                  </td>

                  {/* <td className="px-6 py-4 ">
                          <div className="flex gap-3">
                          <button className="btn btn-error btn-xs">Block</button>
                          <button className="btn btn-success btn-xs">Unblock</button>
                         </div>
                  </td> */}
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="pr-6 py-4">
                    <div className="flex justify-evenly items-center text-xl">
                      <a
                        href="#"
                        className="text-red-600"
                        onClick={() => handleDelete(user._id)}
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

                      {adminRoleFound ? (
                        <>
                          <div className="dropdown dropdown-bottom dropdown-end">
                            <div tabIndex={0} role="button" className=" m-1">
                              <BsThreeDotsVertical />
                            </div>
                            <ul
                              tabIndex={0}
                              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                            >
                              <li>
                                <a onClick={() => handleMAdmin(user)}>
                                  Make Admin
                                </a>
                              </li>
                              <li>
                                <a onClick={() => handleMVol(user)}>
                                  Make Volunteer
                                </a>
                              </li>
                              <li>
                                <a onClick={() => handleMDonor(user)}>
                                  Make Donor
                                </a>
                              </li>
                              <li>
                                <a onClick={() => handleBlock(user)}>Block</a>
                              </li>
                              <li>
                                <a onClick={() => handleActive(user)}>Active</a>
                              </li>
                            </ul>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* pagination */}
          <nav
            className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
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
    </div>
  );
};

export default AllUsers;
