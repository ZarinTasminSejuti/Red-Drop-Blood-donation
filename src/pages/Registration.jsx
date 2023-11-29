import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import swal from "sweetalert";


const Register = () => {
  const { signUp, logOut, setNameAndPhoto } = useContext(AuthContext);

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
        swal("You're registered!", "Registration Successful!", "success");

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
      <div className="my-20 min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl mt-16 text-blue-600 font-bold">
            Create a new account
          </h1>
          <p className="py-5">Enter your information to setup a new account</p>
        </div>

        <div className="rounded-lg w-full mx-auto max-w-sm p-7 shadow-xl bg-base-100">
          <form
           
            className="space-y-4 w-full"
            onSubmit={handleRegister}
          >
            
            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Your Name *</span>
                                </label>
                                <input type="text" placeholder="Enter your name..." name="name" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Profile Photo URL</span>
                                </label>
                                <input type="text" placeholder="Enter photo url..." name="photo" className="input input-bordered" required />
                                </div>
                                

                                <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email *</span>
                                </label>
                                <input type="email" placeholder="Enter your email address..." name="email" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password *</span>
                                </label>
                                <input type="password" placeholder="Enter new password..." className="input input-bordered" name="password" required />

                            </div>
                            <div className="form-control mt-6">
                                <button className="btn text-white border-none bg-red-600 hover:text-white hover:bg-red-700" type="submit">Register</button>
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
    </div>
  );
};

export default Register;