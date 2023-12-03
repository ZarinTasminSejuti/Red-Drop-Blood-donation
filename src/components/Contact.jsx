import swal from "sweetalert";

const Contact = () => {
  const handleContact = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    const contactObj = {
      name,
      email,
      message,
    };

    //send data to the server
    fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactObj),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.insertedId) {
          swal(
            "Your Information has Received!",
            "Thanks for contacting us!",
            "success"
          );
          form.reset();
        }
      })
      .catch(() => {
        swal("Failed!", "Please try again.", "error");
      });
  };

  return (
    <div className="bg-cover mt-72 bg-no-repeat bg-red-600">
      <div
        className="max-w-screen-xl mx-auto flex justify-between py-20 text-center  h-[150px]  items-center mb-16 lg:mb-[380px]"
        
      >
        <div className="">
          <p className="text-7xl text-white font-semibold">Contact us</p>
        </div>
     

      






      {/* contact us field  */}
      <div className="text-center w-full lg:w-1/2 mb-10 lg:mb-0 lg:p-20 rounded text-white bg-slate-50 top-0 right-0 shadow-md">
        <form onSubmit={handleContact}>
          {/* <header className="footer-title text-slate-100">Any Suggestion</header> */}
          <fieldset className="form-control ">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="Full name"
                className="input input-bordered w-full pr-16 bg-slate-100 text-black"
              />
            </div>
          </fieldset>

          <fieldset className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="youremail@email.com"
                className="input input-bordered w-full pr-16 bg-slate-100 text-black"
              />
            </div>
          </fieldset>

          <fieldset className="form-control">
            <label className="label">
              <span className="label-text">Your Message</span>
            </label>
            <label>
              <textarea
                type="text"
                name="message"
                placeholder="Your Massage ..."
                className="input input-bordered w-full resize-y h-28 bg-slate-100 text-black"
              ></textarea>
            </label>
            <button className="py-3 mt-4 rounded-lg text-white hover:text-white bg-gradient-to-r from-red-600 to-red-500 hover:bg-gradient-to-l hover:from-red-600 hover:to-red-500">
              Send now
            </button>
          </fieldset>
        </form>
      </div>
      </div>
      
      </div>
  );
};

export default Contact;
