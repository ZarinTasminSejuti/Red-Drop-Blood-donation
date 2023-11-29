import campaign from "../campaign.json"


const Donation = () => {
    return (
        <div className="max-w-screen-xl mx-auto my-28">
            <h1 className="text-black text-center text-5xl font-semibold mb-8">DONATION CAMPAIGNS</h1>
            <p className="text-center mb-14 text-xl">Campaigns to encourage new donors to join and existing to continue to give blood.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

         
            {
                campaign.map((element, index) => (
                    <div className="flex h-[300px]  bg-slate-100" key={index}>
                        <img src={element.image} alt="donation photo" className="w-[250px]" />
                        <div className="p-5">
                            <p className="text-white py-1 px-3 w-fit bg-slate-700 ">{element.date}</p>
                            <h3 className="text-2xl text-red-500 my-3 font-medium">{element.title}</h3>
                            <p className="text-slate-700">{element.description}</p>
                            <p className="mt-3 text-gray-500">{element.time} | {element.location}</p>

</div>
                        </div>
                 ))
                }
                   </div>
        </div>
    );
};

export default Donation;