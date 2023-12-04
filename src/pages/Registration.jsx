import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import swal from "sweetalert";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Register = () => {
  const { signUp, logOut, setNameAndPhoto } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [district, setDistrict] = useState([]);
  const [upazila, setUpazila] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [districtResponse, upazilaResponse] = await Promise.all([
          fetch("https://red-drop-server-two.vercel.app/district").then((response) =>
            response.json()
          ),
          fetch("https://red-drop-server-two.vercel.app/upazila").then((response) =>
            response.json()
          ),
        ]);

        setDistrict(districtResponse);
        setUpazila(upazilaResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const bloodGroup = ["A+", "A-", "B+", "B-", "AB+", "AB-", " O+", "O-"];
  //navigate after login
  const navigate = useNavigate();

  //form submit function
  const handleRegister = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const name = form.get("name");
    const photo = form.get("photo");
    const email = form.get("email");
    const password = form.get("password");
    const bloodGroup = form.get("bloodGroup");
    const district = form.get("district");
    const upazila = form.get("upazila");

    const nameAndEmail = {
      displayName: name,
      email: email,
      image: photo,
      bloodGroup: bloodGroup,
      district: district,
      upazila: upazila,
      status: "active",
      role: "donor",
    };

    //checking password validation
    if (password.length < 6) {
      swal("Failed!", "Password should be at least 6 Characters", "error");
      return;
    } else if (!/^(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-]).{8,}$/.test(password)) {
      swal("Failed!", "Password need a special Characters", "error");
      return;
    } else if (!/[A-Z]/.test(password)) {
      swal("Failed!", "Password need a Capital Letter", "error");
      return;
    }

    // create a new user with firebase
    signUp(email, password)
      .then(() => {
        //create user entry in the database
        axiosPublic.post("/users", nameAndEmail).then((res) => {
          if (res.data.insertedId) {
            console.log("user added to db");
            // reset();
            swal("You're registered!", "Registration Successful!", "success");
          }
        });

        logOut()
          .then(() => {
            // Sign-out and navigate to login
            navigate("/login");
          })
          .catch((error) => {
            // An error happened.
            console.log(error);
          });
      })
      .catch(() => {
        swal("Failed!", "Email is already used", "error");
      });

    // update new user name and photo
    setNameAndPhoto({
      displayName: name,
      photoURL: photo,
    });
  };

  return (
    <div>
      
   
     
        <div className="max-w-screen-xl mx-auto pt-36 text-center">
          <h1 className="text-4xl text-blue-600 font-bold">
            Create a new account
          </h1>
          <p className="py-5">Enter your information to setup a new account</p>
        </div>

        <div className="rounded-lg w-full mx-auto max-w-sm p-7 shadow-xl bg-base-100">
          <form className="space-y-4 w-full" onSubmit={handleRegister}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Name *</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name..."
                name="name"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Profile Photo URL</span>
              </label>
              <input
                type="text"
                placeholder="Enter photo url..."
                name="photo"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email *</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email address..."
                name="email"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password *</span>
              </label>
              <input
                type="password"
                placeholder="Enter new password..."
                className="input input-bordered"
                name="password"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Blood Group</span>
              </label>
              <label>
                <select
                  name="bloodGroup"
                  id="select"
                  className="select bg-white input-bordered rounded-md w-full"
                  required
                >
                  <option disabled>Select your blood group...</option>
                  {bloodGroup.map((bloodType) => {
                    return (
                      <option key={bloodType} value={bloodType}>
                        {bloodType}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>

            <div className="form-control ">
              <label className="label">
                <span className="label-text">District</span>
              </label>
              <label>
                <select
                  name="district"
                  id="select1"
                  className="select bg-white input-bordered rounded-md w-full"
                  required
                >
                  <option disabled>Select your district...</option>
                  {district[0]?.data.map((district, index) => {
                    return (
                      <option key={index} value={district.name}>
                        {district.name}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>

            <div className="form-control ">
              <label className="label">
                <span className="label-text">Upazila</span>
              </label>
              <label>
                <select
                  name="upazila"
                  id="select111"
                  className="select bg-white input-bordered rounded-md w-full"
                  required
                >
                  <option disabled>Select your upazila...</option>
                  {upazila[0]?.data.map((upazila, index) => {
                    return (
                      <option key={index} value={upazila.name}>
                        {upazila.name}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>

            <div className="form-control mt-6">
              <button
                className="btn text-white border-none bg-red-600 hover:text-white hover:bg-red-700"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-7 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
       </div>
     
  );
};

export default Register;
