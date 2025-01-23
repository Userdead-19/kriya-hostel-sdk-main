import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { fetchAccommodationDetails } from "../API/calls";
import Layout from "../components/Layout";

const Accommodation = () => {
  const [accommodation, setAccommodation] = useState(null);
  const [college, setCollege] = useState(false)

  useEffect(() => {
    toast.promise(fetchAccommodationDetails(), {
      loading: "Loading accommodation details...",
      success: (res) => {
        setAccommodation(res.data.accommodationDetails);
        return "Accommodation details loaded";
      },
      error: (err) => {
        console.log(err);
        return "Error loading accommodation details";
      },
    });
  }, []);

  return (
    <Layout title={"Accommodation Details"}>
      <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 w-full justify-around items-center pb-12">
        <div className="">Sort by</div>
        <button className={`px-6 py-2 rounded-full ${college ? "bg-[#3c3c3c] text-white" : "bg-[#eaeaea] text-[#303030]"} border-2 border-[#303030]`}
          onClick={() => {
            setCollege(true);

            let temp = accommodation;
            temp.sort((a, b) => a.college.localeCompare(b.college));
            setAccommodation(temp);
          }}
        >
          College
        </button>
      </div>
      <p className="text-xs text-right mb-6">*Tap on the number to make a call</p>
      <div className="space-y-4 px-4 lg:px-0">
        {accommodation?.map((acc, index) => (
          <div>
            <div className="flex items-center">
              <div className="text-lg mr-4 lg:mr-2 w-[5%]">{index + 1}</div>
              <div className="w-[50%] lg:w-[70%]">
                {/* <p className="text-xs">{acc.email}</p> */}
                <p className="">{acc.name}</p>
                <p className="text-xs">{acc.college}</p>
              </div>
              <button className="font-semibold w-[40%] lg:w-[25%] text-right"
                onClick={() => {
                  window.open(`tel:${acc.phone}`);
                }}
              >
                {acc.phone}
              </button>
            </div>
            <div className="w-full h-[1px] bg-gray-500 my-2"></div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Accommodation;
