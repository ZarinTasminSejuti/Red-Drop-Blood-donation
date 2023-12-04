import { useLoaderData } from "react-router-dom";

const DonationDetails = () => {
  const allDonationCollection = useLoaderData();
  console.log(allDonationCollection);

  return (
    <div className="min-h-screen">

          <div className="p-10">
          <h2 className="text-2xl mt-32 text-center">All Blood Donation Details</h2>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {allDonationCollection.map((singleDonationData, index) => (
            <div
              key={singleDonationData + 1}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <p>{index + 1}</p>
                </div>
              </td>

              {/* user profile with map function */}
              <th
                scope="row"
                className="flex items-center pl-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <div className="p-3">
                  <div className="text-base font-semibold">
                    {singleDonationData.recipientName}
                  </div>
                  <div className="flex  flex-col gap-1 font-normal text-gray-500">
                    <p> Upazilla: {singleDonationData.recipientUpazila}</p>
                    <p> District: {singleDonationData.recipientDistrict}</p>
                  </div>
                </div>
              </th>

              <td className="px-6 py-4 ">
                <p>{singleDonationData.donationDate}</p>
              </td>

              <td className="px-6 py-4"></td>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonationDetails;
