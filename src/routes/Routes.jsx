import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/Dashboard";
import MainLayout from "../layout/MainLayout";
import Blog from "../pages/Blog";
import AllUsers from "../pages/Dashboard/All Users/AllUsers";
import DonorHome from "../pages/Dashboard/DonorHome";
import Profile from "../pages/Dashboard/Profile";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import PrivateRoute from "../PrivateRoute";




const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
        loader: () => fetch("http://localhost:5000/blog"),
      },
     
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: "profile",
        element: <Profile></Profile>,
      },

      //admin routes
      {
        path: "allUsers",
        element: <AllUsers></AllUsers>,
  
      },


      //Donor Routes
      {
        path: "donorHome",
        element: <DonorHome></DonorHome>,
      },
     
     
    ],
  },
]);

export default router;