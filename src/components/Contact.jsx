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
      <div className="my-24 bg-black">
           <div className="lg:relative">
      <div
        className="flex justify-between p-20 text-center bg-cover h-[400px]  items-center mb-16 lg:mb-[380px]"
        style={{
          backgroundImage: "url(https://i.ibb.co/zGngFFp/contact-us-xxxl.png)",
        }}
      ></div>

      {/* contact us field  */}
      <div className="text-center py-24 w-full lg:w-1/2 p-10 mb-10 lg:mb-0 lg:p-20 shadow-md rounded text-white bg-slate-50 lg:absolute top-0 lg:top-[620px] left-0 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 ">
        <form onSubmit={handleContact}>
          {/* <header className="footer-title text-slate-100">Any Suggestion</header> */}
          <fieldset className="form-control w-80">
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

          <fieldset className="form-control w-80">
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

          <fieldset className="form-control w-80">
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
            <button className="py-3 rounded-lg text-white hover:text-white bg-gradient-to-r from-red-600 to-red-500 hover:bg-gradient-to-l hover:from-red-600 hover:to-red-500">
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
