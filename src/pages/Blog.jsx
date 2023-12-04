import { useLoaderData } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import { useState } from "react";

const Blog = () => {
  const blogCollection = useLoaderData();
 console.log(blogCollection);


  const [filteredBlog, setFilteredBlog] = useState(blogCollection);

 console.log(filteredBlog);
  

  //Category or type counts
  console.log(blogCollection);
  const countByType = blogCollection.reduce((acc, obj) => {
    const { type } = obj;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  //Get as object
  const resultArray = Object.keys(countByType).map((type) => ({
    type,
    count: countByType[type],
  }));

  //All blog count
  const allBlogCount = resultArray.reduce(
    (total, item) => total + item.count,
    0
  );

  //  //Handle All Button
  const handleAllButton = () => {
    setFilteredBlog(blogCollection);
  };

  return (
    <div className="px-2 lg:px-24 bg-slate-100">
      <div className="text-center py-44">
        {/* search field */}
        
        <div className="mb-10">
          <div className="justify-center flex flex-wrap w-full lg:w-4/5 mx-auto">
            <button
              onClick={() => handleAllButton()}
              className=" text-sm m-2 rounded-full py-2 px-4 w-fit flex items-center font-light bg-red-600 text-white"
            >
              Total Blogs
              <span className="bg-red-400 text-white  ml-2 rounded-full inline-block w-5 h-5">
                {allBlogCount}
              </span>
            </button>
          </div>
        </div>

        {/* All Blogs field */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 px-5 lg:px-0 mb-20">
          {blogCollection.map((blog, index) => (
            <div key={index + 1} className="mb-10 ">
              <PhotoProvider>
                <PhotoView src={blog.blog_img}>
                  <img
                    src={blog.blog_img}
                    alt="blog"
                    className="w-full h-[250px] bg-cover"
                  />
                </PhotoView>
              </PhotoProvider>
              <div className="h-[250px] flex flex-col justify-between py-2">
                <div className="text-justify h-full">
                  <h2 className="card-title my-2 text-black">
                    {blog.blog_title}
                   
                    {/* {
                      console.log(blog.blog_title)
                    } */}
                 
                  </h2>
                  
                  <p className="text-gray-500 pt-2 text-justify">
                    {blog.blog_description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
