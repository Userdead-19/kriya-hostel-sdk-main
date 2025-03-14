import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { toast } from "react-hot-toast";
import {
  fetchAccPaid,
  fetchUpdateAccommodation,
} from "../API/calls";

const AccPaid = () => {
  const [male, setMale] = useState(null);
  const [female, setFemale] = useState(null);
  const [maleSearch, setMaleSearch] = useState(""); // Search state for boys
  const [femaleSearch, setFemaleSearch] = useState(""); // Search state for girls
  const [maleSortConfig, setMaleSortConfig] = useState(null);
  const [femaleSortConfig, setFemaleSortConfig] = useState(null);

  useEffect(() => {
    toast.promise(
      fetchAccPaid(),
      {
        loading: "Fetching Details",
        success: (res) => {
          setMale(res.data.malePaid);
          setFemale(res.data.femalePaid);
          console.log(res.data.malePaid);
          return "Details Fetched";
        },
      },
      {
        error: "Error Fetching Details",
      }
    );
  }, []);

  const handleCheckbox = (email) => {
    toast.promise(fetchUpdateAccommodation(email, { vacated: true }), {
      loading: "Updating Details",
      success: (res) => {
        console.log(res.data);
      },
    }, {
      error: "Error Updating Details"
    });
  };

  const filterList = (list, searchTerm) => {
    return list.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.roomType.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const sortList = (list, key, direction) => {
    return [...list].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
  };

  const handleSort = (config, setConfig, list, setList) => {
    let direction = "ascending";
    if (config && config.key === config.key && config.direction === "ascending") {
      direction = "descending";
    }
    const sortedList = sortList(list, config.key, direction);
    setConfig({ key: config.key, direction });
    setList(sortedList);
  };

  return (
    <Layout title={"Accommodation Paid Users"} className={"space-y-6"}>
      {/* Boys Section */}
      <div className={""}>
        <p className="text-2xl font-bold pb-4">Boys</p>
        <input
          type="text"
          placeholder="Search Boys by Name, Room No, or Room Type"
          className="mb-4 p-2 border rounded w-full"
          value={maleSearch}
          onChange={(e) => setMaleSearch(e.target.value)}
        />
        <div className="flex flex-row text-center">
          <p className="w-[10%] lg:w-[5%] font-semibold">No.</p>
          <p className="w-[50%] lg:w-[20%] font-semibold">Name</p>
          <p className="hidden lg:block w-[10%] font-semibold">Kriya Id</p>
          <p
            className="hidden lg:block w-[20%] font-semibold cursor-pointer"
            onClick={() =>
              handleSort(
                { key: "roomType" },
                setMaleSortConfig,
                male,
                setMale
              )
            }
          >
            Room Type
          </p>
          <p className="hidden lg:block w-[10%] font-semibold">Days</p>
          <p className="hidden lg:block w-[10%] font-semibold">Amenities</p>
          <p className="hidden lg:block w-[10%] font-semibold">Meals</p>
          <p className="w-[20%] lg:w-[10%] font-semibold">Amount</p>
          <p
            className="w-[20%] lg:w-[10%] font-semibold cursor-pointer"
            onClick={() =>
              handleSort(
                { key: "room" },
                setMaleSortConfig,
                male,
                setMale
              )
            }
          >
            Room
          </p>
          <p className="hidden lg:block w-[5%] font-semibold">Vacated</p>
        </div>
        {male &&
          filterList(male, maleSearch).filter(item => item.vacated === false).map((item, index) => (
            <div
              key={item.email}
              className="flex flex-row text-sm text-center py-2 border-b border-gray-500"
            >
              <p className="w-[10%] lg:w-[5%]">{index + 1}.</p>
              <p className="w-[50%] lg:w-[20%]">{item.name}</p>
              <p className="hidden lg:block w-[10%]">{item.kriyaId}</p>
              <p className="hidden lg:block w-[20%] px-2">{item.roomType}</p>
              <p className="hidden lg:block w-[10%] font-semibold">
                {item.days} {item.days === 1 ? "Day" : "Days"}
              </p>
              <p className="hidden lg:block w-[10%]">{item.amenities}</p>
              <p className="hidden lg:block w-[10%]">
                {/* {
                
                item.breakfast1===true?1+"bre":0 +
                  item.breakfast2===true?1:0 +
                  item.breakfast3===true?1:0 +
                  item.dinner1==true?1:0 +
                  item.dinner2==true?1:0 +
                  item.dinner3==true?1:0} */}
                {
                  (() => {
                    const breakfastCount =
                      (item.breakfast1 ? 1 : 0) +
                      (item.breakfast2 ? 1 : 0) +
                      (item.breakfast3 ? 1 : 0);

                    const dinnerCount =
                      (item.dinner1 ? 1 : 0) +
                      (item.dinner2 ? 1 : 0) +
                      (item.dinner3 ? 1 : 0);

                    return `${breakfastCount} Bre, ${dinnerCount} Din`;
                  })()
                }
              </p>
              <p className="w-[20%] lg:w-[10%] font-semibold">
                Rs. {item.amount}
              </p>
              <p className="w-[20%] lg:w-[10%] font-semibold">{item.room}</p>
              <input
                type="checkbox"
                className="hidden lg:block w-[5%]"
                checked={item.vacated}
                onClick={() => {
                  const updatedList = male.map((up) => {
                    if (up.email === item.email) {
                      return { ...up, vacated: true };
                    }
                    return { ...up };
                  });
                  setMale(updatedList);
                  handleCheckbox(item.email);
                }}
              />
            </div>
          ))}
        {male && (
          <p className="text-lg mt-2">
            Total Payment Rs. {" "}
            {male.reduce(
              (accumulator, currentValue) =>
                accumulator + Number(currentValue.amount),
              0
            )}
          </p>
        )}
      </div>

      {/* Girls Section */}
      <div className={"pt-16"}>
        <p className="text-2xl font-bold pb-4">Girls</p>
        <input
          type="text"
          placeholder="Search Girls by Name, Room No, or Room Type"
          className="mb-4 p-2 border rounded w-full"
          value={femaleSearch}
          onChange={(e) => setFemaleSearch(e.target.value)}
        />
        <div className="flex flex-row text-center">
          <p className="w-[10%] lg:w-[5%] font-semibold">No.</p>
          <p className="w-[50%] lg:w-[20%] font-semibold">Name</p>
          <p className="hidden lg:block w-[10%] font-semibold">Kriya Id</p>
          <p
            className="hidden lg:block w-[20%] font-semibold cursor-pointer"
            onClick={() =>
              handleSort(
                { key: "roomType" },
                setFemaleSortConfig,
                female,
                setFemale
              )
            }
          >
            Room Type
          </p>
          <p className="hidden lg:block w-[10%] font-semibold">Days</p>
          <p className="hidden lg:block w-[10%] font-semibold">Amenities</p>
          <p className="hidden lg:block w-[10%] font-semibold">Meals</p>
          <p className="w-[20%] lg:w-[10%] font-semibold">Amount</p>
          <p
            className="w-[20%] lg:w-[10%] font-semibold cursor-pointer"
            onClick={() =>
              handleSort(
                { key: "room" },
                setFemaleSortConfig,
                female,
                setFemale
              )
            }
          >
            Room
          </p>
          <p className="hidden lg:block w-[5%] font-semibold">Vacated</p>
        </div>
        {female &&
          filterList(female, femaleSearch).filter(item => item.vacated === false).map((item, index) => (
            <div
              key={item.email}
              className="flex flex-row text-sm text-center py-2 border-b border-gray-500"
            >
              <p className="w-[10%] lg:w-[5%]">{index + 1}.</p>
              <p className="w-[50%] lg:w-[20%]">{item.name}</p>
              <p className="hidden lg:block w-[10%]">{item.kriyaId}</p>
              <p className="hidden lg:block w-[20%] px-2">{item.roomType}</p>
              <p className="hidden lg:block w-[10%] font-semibold">
                {item.days} {item.days === 1 ? "Day" : "Days"}
              </p>
              <p className="hidden lg:block w-[10%]">{item.amenities}</p>
              <p className="hidden lg:block w-[10%]">
                {item.breakfast1 +
                  item.breakfast2 +
                  item.breakfast3 +
                  item.dinner1 +
                  item.dinner2 +
                  item.dinner3}
              </p>
              <p className="w-[20%] lg:w-[10%] font-semibold">
                Rs. {item.amount}
              </p>
              <p className="w-[20%] lg:w-[10%] font-semibold">{item.room}</p>
              <input
                type="checkbox"
                className="hidden lg:block w-[5%]"
                checked={item.vacated}
                onClick={() => {
                  const updatedList = female.map((up) => {
                    if (up.email === item.email) {
                      return { ...up, vacated: true };
                    }
                    return { ...up };
                  });
                  setFemale(updatedList);
                  handleCheckbox(item.email);
                }}
              />
            </div>
          ))}
        {female && (
          <p className="text-lg mt-2">
            Total Payment Rs. {" "}
            {female.reduce(
              (accumulator, currentValue) =>
                accumulator + Number(currentValue.amount),
              0
            )}
          </p>
        )}
      </div>
    </Layout>
  );
};

export default AccPaid;