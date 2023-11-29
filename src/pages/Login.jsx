import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Login = () => {
  const { signIn, signInGoogle } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const email = form.get("email");
    const password = form.get("password");

    signIn(email, password)
    .then(() => {
      swal("You're logged in!", "Login Successful!", "success");
      e.target.reset();
      navigate("/");
    })
    .catch(() => {
      swal(
        "Login Failed!",
        "Wrong credentials! Please login again.",
        "error"
      );
    });
};


const handleGoogle = () => {
  signInGoogle()
    .then(() => {
      swal("You're logged in!", "Login Successful!", "success");
      navigate("/");
    })
    .catch((error) => {
      console.log(error);
      swal(
        "Login Failed!",
        "Wrong credentials! Please login again.",
        "error"
      );
    });
};

  return (
    <div className="my-20 min-h-screen">
      <div className="text-center">
        <h1 className="text-5xl text-blue-600 font-bold">Login now!</h1>
        <p className="py-2 my-4 text-black font-medium px-4 rounded-xl">
          Please log in to access your account and explore our services.
        </p>
      </div>

      <div className=" w-full max-w-sm mx-auto p-7 shadow-xl bg-base-100">
        <form onSubmit={handleLogin} className="space-y-4 w-full">
          <input
            label="Email"
           
            color="primary"
            type="text"
            placeholder="Enter your email address..."
            name="email"
            required
           
          />

          {/* password  */}
          <input
            className=""
            label="Password"
          
            color="primary"
            type="password"
            placeholder="Enter your password..."
            name="password"
            required
            
          />

          {/* login button */}
          <div className=" text-center">
            <button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:bg-gradient-to-l hover:from-blue-600 hover:to-cyan-500" type="submit">Login</button>
          </div>
        </form>

        <p className="mt-4 text-center text-gray-500">or login with</p>

        {/* google button */}
        <p className="text-center my-2">
          {" "}
          <button
            onClick={handleGoogle}
           
           
          >
            {/* <GoogleIcon></GoogleIcon>Google */}
          </button>
        </p>

        <p className="text-center">
          Do not have an account?{" "}
          <Link to="/registration" className="text-red-600 font-semibold">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;