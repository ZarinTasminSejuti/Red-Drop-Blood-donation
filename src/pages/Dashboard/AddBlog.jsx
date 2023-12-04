import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { AuthContext } from "../../providers/AuthProvider";

const AddBlog = () => {
  const navigate = useNavigate();
  const { userDetails} = useContext(AuthContext);

  
  const handleSubmit = (event) => {
    event.preventDefault();

    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };

    const form = event.target;
    const blog_title = form.blog_title.value;
    const blog_description = form.blog_description.value;
    const blog_img
    = form.blog_img.value;
    const userEmail = userDetails.email;
    const blogPostDateTime = new Date().toLocaleString("en-US", options);
    const submitTime = Math.floor(Date.now() / 1000); //Time in seconds
    const userName = userDetails.displayName;
    const userImage = userDetails.photoURL

    const newBlog = {
      blog_title,
      blog_description,
      blog_img,
      userEmail,
      submitTime,
      blogPostDateTime,
      userName,
      userImage,
    };

    //send data to the server
    fetch("http://localhost:5000/addBlog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(newBlog),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.insertedId) {
          swal("Blog Added!", "New Blog added Successful!", "success");
          form.reset();
          navigate("/dashboard/contentManagement/addBlog");
         
        }
      })
      .catch(() => {
        swal("Failed!", "Wrong credentials! Please Add again.", "error");
      });
  };

  return (
    <div className="px-2 lg:px-24 bg-slate-100">
      <div className="py-10 text-black ">
        <p className="font-bold text-3xl">Add New
          Blog</p>
      </div>

      <div className=" w-full lg:w-[1280px] pt-10 pb-20">
       
        <form onSubmit={handleSubmit} className="p-4 lg:p-0">
         
          
            <div className="form-control md:w-1/2 lg:mr-5">
              <label className="label">
                <span className="label-text text-black font-bold">
                  Blog Title:
                </span>
              </label>
              <label>
                <input
                  type="text"
                  placeholder="Enter blog title..."
                  name="blog_title"
                  className="input input-bordered bg-white w-full rounded-md"
                  required
                />
              </label>
            </div>

            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text text-black font-bold">
                  Blog Image Url:
                </span>
              </label>
              <label>
                <input
                  type="text"
                  placeholder="Enter blog image..."
                  name="blog_img"
                  className="input input-bordered bg-white w-full rounded-md"
                  required
                />
              </label>
            </div>
         

     
          
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text text-black font-bold">
                  Blog Description:
                </span>
              </label>
              <label>
                <textarea
                  type="text"
                  placeholder="Enter long description..."
                  name="blog_description"
                  className="input rounded-md bg-white input-bordered resize-y h-28 w-full"
                ></textarea>
              </label>
            </div>
          

          {/* add blog button  */}
          <div className="my-10">
            <input
              type="submit"
              value="Add New Blog"
              className="btn text-white bg-blue-600 border-none hover:text-white hover:bg-blue-700"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;