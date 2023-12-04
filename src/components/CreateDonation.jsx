import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { AuthContext } from "../providers/AuthProvider";

const CreateDonation = () => {
  const navigate = useNavigate();
  const { userDetails } = useContext(AuthContext);

  // Initial form data
  const initialFormData = [
    { label: "Requester Name", type: "text", name: "requesterName", value: "" },
    {
      label: "Requester Email",
      type: "email",
      name: "requesterEmail",
      value: "",
    },
    { label: "Recipient Name", type: "text", name: "recipientName", value: "" },
    {
      label: "Recipient District",
      type: "text",
      name: "recipientDistrict",
      value: "",
    },
    {
      label: "Recipient Upazila",
      type: "text",
      name: "recipientUpazila",
      value: "",
    },
    { label: "Hospital Name", type: "text", name: "hospitalName", value: "" },
    { label: "Full Address", type: "textarea", name: "fullAddress", value: "" },
    { label: "Donation Date", type: "date", name: "donationDate", value: "" },
    { label: "Donation Time", type: "time", name: "donationTime", value: "" },
    {
      label: "Request Message",
      type: "textarea",
      name: "requestMessage",
      value: "",
    },
  ];

  // State to manage form data
  const [formData, setFormData] = useState(
    Object.fromEntries(
      initialFormData.map((field) => [field.name, field.value])
    )
  );

  // Event handler for form submission
  const submitForm = (event) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    event.preventDefault();

    const form = event.target;
  const requesterName = form.requesterName?.value || "";
  const requesterEmail = form.requesterEmail?.value || "";
  const recipientName = form.recipientName?.value || "";
  const recipientDistrict = form.recipientDistrict?.value || "";
  const recipientUpazila = form.recipientUpazila?.value || "";
  const hospitalName = form.hospitalName?.value || "";
  const fullAddress = form.fullAddress?.value || "";
  const donationDate = new Date().toLocaleString("en-US", options);
  const donationTime = form.donationTime?.value || "";
  const requestMessage = form.requestMessage?.value || "";
    // setFormData(Object.fromEntries(initialFormData.map((field) => [field.name, ''])));

    const createNewDonationRequest = {
      requesterName,
      requesterEmail,
      recipientName,
      recipientDistrict,
      recipientUpazila,
      hospitalName,
      fullAddress,
      donationDate,
      donationTime,
      requestMessage,
    };

    //send data to the server
    fetch("http://localhost:5000/CreateDonation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(createNewDonationRequest),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.insertedId) {
          swal(
            "Request Added!",
            "New Donation Request added Successfully!",
            "success"
          );
          form.reset();
          navigate("/dashboard/my-donation-requests");
        }
      })
      .catch(() => {
        swal("Failed!", "Wrong credentials! Please Add again.", "error");
      });
  };
  return (
    <div>
      <div className="max-w-screen-xl mx-auto pt-28  text-center">
        <h2 className="text-2xl font-semibold">Create New Donation Request</h2>
        <form onSubmit={submitForm} className="space-y-4 w-3/4 mx-auto my-14">
          {initialFormData.map((field) => (
            <div key={field.name} className="form-control">
              <label className="label">
                <span className="label-text">{field.label}:</span>
              </label>

              {field.name === "requesterName" ? (
                <p className="text-left italic ml-5">
                  {userDetails?.displayName}
                </p>
              ) : field.name === "requesterEmail" ? (
                <p className="text-left italic ml-5">{userDetails?.email}</p>
                ) : field.type === "text" &&
  (field.name !== "requesterName" || field.name !== "requesterEmail") ? (
  <input
    type={field.type}
    name={field.name}
    value={formData[field.name]}
    placeholder={`Enter ${field.label}`}
    className="input input-bordered"
    onChange={(e) =>
      setFormData({ ...formData, [field.name]: e.target.value })
    }
    required
  />
) : field.type === "textarea" ? (
  <textarea
    id={field.name}
    name={field.name}
    value={formData[field.name]}
    onChange={(e) =>
      setFormData({ ...formData, [field.name]: e.target.value })
    }
    placeholder={`Enter ${field.label}`}
    className="input input-bordered h-16"
    required
  ></textarea>
) : field.type === "date" ? (
  <input
    id={field.name}
    name={field.name}
    value={formData[field.name]}
    onChange={(e) =>
      setFormData({ ...formData, [field.name]: e.target.value })
    }
    placeholder="Example: 2015-03-25"
    className="input input-bordered"
    required
  ></input>
) : field.type === "time" ? (
  <input
    id={field.name}
    name={field.name}
    value={formData[field.name]}
    onChange={(e) =>
      setFormData({ ...formData, [field.name]: e.target.value })
    }
    placeholder="Example: 9:30Pm"
    className="input input-bordered"
    required
  ></input>
) : null}
            </div>
          ))}
          <button
            className="btn text-white btn-primary border-none hover:text-white hover:bg-black"
            type="submit"
          >
            Create Request Donation
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDonation;
