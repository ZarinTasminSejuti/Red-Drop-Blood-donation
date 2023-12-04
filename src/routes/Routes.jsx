import { createBrowserRouter } from "react-router-dom";
import CreateDonation from "../components/CreateDonation";
import Dashboard from "../layout/Dashboard";
import MainLayout from "../layout/MainLayout";
import Blog from "../pages/Blog";
import AddBlog from "../pages/Dashboard/AddBlog";
import AdminHome from "../pages/Dashboard/AdminHome";
import AllUsers from "../pages/Dashboard/All Users/AllUsers";
import ContentManagement from "../pages/Dashboard/ContentManagement";
import DonorHome from "../pages/Dashboard/DonorHome";
import MyDonation from "../pages/Dashboard/MyDonation";
import VolunteerHome from "../pages/Dashboard/VolunteerHome";
import DonationDetails from "../pages/DonationDetails";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import PrivateRoute from "../PrivateRoute";




const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/createDonation",
        element: <CreateDonation></CreateDonation>,
        
        
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/donationDetails",
        element: <DonationDetails></DonationDetails>,
        loader: () => fetch("http://localhost:5000/CreateDonation")
        
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
    path: "/dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      
//admin routes
      {
        path: "adminHome",
        element: <AdminHome></AdminHome>,
      },
      {
        path: "contentManagement",
        element: <ContentManagement></ContentManagement>,
      },
      {
        path: "createDonation",
        element: <CreateDonation></CreateDonation>,
        
      },
      {
        path: "contentManagement/addBlog",
        element: <AddBlog></AddBlog>,
      },
      {
        path: "allUsers",
        element: <AllUsers></AllUsers>,
  
      },


      //Donor Routes
      {
        path: "donorHome",
        element: <DonorHome></DonorHome>,
      },
      
      {
        path: "volunteerHome",
        element: <VolunteerHome></VolunteerHome>,
      },
      {
        path: "my-donation-requests",
        element: <MyDonation></MyDonation>,
        loader: () => fetch("http://localhost:5000/CreateDonation"),
      },
     
     
    ],
  },
]);

export default router;