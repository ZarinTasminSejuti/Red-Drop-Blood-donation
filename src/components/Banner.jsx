import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Banner = () => {
  return (
    <div>
          <Carousel className="text-center">
              
          <div className="h-[600px]">
          <img 
            src=" https://i.ibb.co/XY1hrmK/banner0.jpg" className="h-full" />
          
        </div>

         
              <div className="h-[600px]">
          <img 
            src="https://i.ibb.co/Gxtq6h5/banner1.jpg" className="h-full" />
          
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
