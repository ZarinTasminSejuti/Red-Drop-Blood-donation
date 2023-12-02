//import swal from "sweetalert";

const Profile = () => {
    return (
      <div className="max-w-screen-xl mx-auto px-28 pt-10">
        
  
        <div className="flex flex-row w-full gap-7 ">
          <div className="w-1/4 bg-white shadow-md rounded-xl flex items-center justify-center ">
            <img
              src="https://uxwing.com/wp-content/themes/uxwing/download/medical-science-lab/blood-drop-icon.png"
              alt="user category"
              className="w-1/4 "
            />
          </div>
  
          <div className=" w-3/4 py-5 px-10 leading-10 bg-white shadow-md rounded-xl flex flex-row justify-between items-center">
            <div>
              <h2>
                Name: <span className="text-xl font-semibold">Mahadi Hassan</span>
              </h2>
              <p>Address: Dhaka</p>
              <p>Blood Group: O+</p>
              <p>Email: mahadi.eete@gmail.com</p>
            </div>
            <img
              src="https://pbs.twimg.com/media/EanqDy8U0AUEl-u?format=jpg&name=large"
              alt="user"
              className="w-[120px] h-[120px] rounded-full ring-4 ring-blue-500 ring-offset-white ring-offset-4"
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default Profile;
  