import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Banner = () => {
  const { userDetails } = useContext(AuthContext);
  return (
    <div className="relative">
      <div className=" text-center absolute  w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <p className="text-red-600 text-4xl font-bold my-6 w-full">
          Share Life Through Blood Donation
        </p>

        <div className=" flex justify-around w-1/2  mx-auto">
          {userDetails ? (
            <>
              <Link to="/">
                <button className="btn text-white bg-red-600 border-none hover:text-white hover:bg-black">
                  Search Donor
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/registration">
                <button className="btn text-white bg-red-600 border-none hover:text-white hover:bg-black">
                  Join as a Donor
                </button>
              </Link>

              <Link to="/">
                <button className="btn text-white bg-red-600 border-none hover:text-white hover:bg-black">
                  Search Donor
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
      <Carousel className="text-center">
        <div className="h-[600px]">
          <img src=" https://i.ibb.co/XY1hrmK/banner0.jpg" className="h-full" />
        </div>

        <div className="h-[600px]">
          <img src="https://i.ibb.co/Gxtq6h5/banner1.jpg" className="h-full" />
        </div>

        <div className="h-[600px]">
          <img src="https://i.ibb.co/VT6Vh8R/banner4.jpg" className="h-full" />
        </div>
        <div className="h-[600px]">
          <img src="https://i.ibb.co/1QY2MZf/banner3.jpg" className="h-full" />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
