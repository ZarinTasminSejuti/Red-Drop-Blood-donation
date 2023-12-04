
import { useLoaderData } from "react-router-dom";


const DonationDetails = () => {
  const allDonationCollection = useLoaderData();
  
 


  return (
    <div className="min-h-screen">
      <div className="p-10">
        <h2 className="text-2xl mt-32 mb-10 text-center">
          All Blood Donation Details
        </h2>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-red-500 p-1 space-y-5">
          {allDonationCollection.map((singleDonationData, index) => (
            <div
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <div className="flex items-center p-3">
                <p>Details No. {index + 1}:</p>
              </div>

              <div
                scope="row"
                className="flex items-center pl-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <div className="p-3">
                  <div className="text-base font-semibold">
                    <p>Recipient Name: {singleDonationData.recipientName}</p>
                  </div>
                  <div className="flex  flex-col gap-1 font-normal text-gray-500">
                              <div className="">
                              <p>
                      Recipient Upazilla: {singleDonationData.recipientUpazila}
                    </p>
                    <p>
                      Recipient District: {singleDonationData.recipientDistrict}
                    </p>
                    </div>
                              <p>Donation Date: {singleDonationData.donationDate}</p>
                              <p>Hospital Name: {singleDonationData.hospitalName}</p>
                              <p>Full Address: {singleDonationData.fullAddress}</p>
                              <p>Request Message: {singleDonationData.requestMessage}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonationDetails;
