import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Dropdown from "../components/Dropdown";
import Inputfield from "../components/TextInput";
import Row from "../components/Row";
import Button from "../components/Button";
import Toggle from "../components/Toggle";
import { toast } from "react-hot-toast";
import { fetchAccommodationDetailsbyEmail, fetchAccommodationDetailsbyKriyaId, fetchUpdateAccommodation } from "../API/calls";
import { FiCheck } from "react-icons/fi";
import KriyaInput from "../components/KriyaInput";

const AccommodationEdit = () => {
  const [type, setType] = useState("KRIYA ID");
  const [id, setId] = useState("");
  const [kriyaId, setKriyaId] = useState("");
  const [data, setData] = useState(null);

  const [roomType, setRoomType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [amenities, setAmenities] = useState("");
  const [breakfast1, setBreakfast1] = useState(false);
  const [breakfast2, setBreakfast2] = useState(false);
  const [breakfast3, setBreakfast3] = useState(false);
  const [dinner1, setDinner1] = useState(false);
  const [dinner2, setDinner2] = useState(false);
  const [dinner3, setDinner3] = useState(false);
  const [room, setRoom] = useState("0");
  const [nights, setNights] = useState("0");
  const [mornings, setMornings] = useState("0");
  const [totalCost, setTotalCost] = useState(0);

  // Room costs definition - consolidated into a single object
  const roomCosts = {
    "PSG IMSR": 0,
    "PSG IMSR Refreshment": 0,
    "PSG Tech Hostel": 350,
    "Common Free Hall": 0,
    "Two Sharing": 150,
    "4 / 6 Sharing with common bathroom": 150,
    "2 Sharing with attached bathroom": 600,
  };

  const fromDates = [
    "13th March Night",
    "14th March Morning",
    "14th March Night",
    "15th March Morning",
    "15th March Night",
    "16th March Morning",
  ];

  const toDates = [
    "14th March Morning",
    "14th March Night",
    "15th March Morning",
    "15th March Night",
    "16th March Morning",
    "16th March Evening",// Added missing last option
  ];

  // Calculate the number of days based on selected dates
  const calculateDays = () => {
    if (!fromDate || !toDate) return 0;

    const fromIndex = fromDates.indexOf(fromDate);
    const toIndex = toDates.indexOf(toDate);

    // Return 0 if any date is invalid or if toDate comes before fromDate
    if (fromIndex === -1 || toIndex === -1) return 0;

    // Calculate actual days based on time intervals
    // Each day has 2 time slots (Morning and Night)
    // We divide by 2 and round up for partial days
    return Math.ceil((toIndex + 1) / 2);
  };
  // Calculate number of days for cost purposes
  const calculateStayDuration = () => {
    if (roomType === "PSG Tech Hostel") {
      return Math.max(Number(nights) || 0, Number(mornings) || 0);
    }
    return calculateDays();
  };

  // Effect to calculate total cost whenever relevant state changes
  useEffect(() => {
    if (!roomType) return;

    const stayDuration = calculateStayDuration();
    const roomCost = stayDuration * (roomCosts[roomType] || 0);

    const mealsCount =
      (breakfast1 ? 1 : 0) +
      (breakfast2 ? 1 : 0) +
      (breakfast3 ? 1 : 0) +
      (dinner1 ? 1 : 0) +
      (dinner2 ? 1 : 0) +
      (dinner3 ? 1 : 0);

    const mealsCost = 50 * mealsCount;

    const newTotalCost = roomCost + mealsCost;
    setTotalCost(newTotalCost);

  }, [
    roomType,
    fromDate,
    toDate,
    nights,
    mornings,
    breakfast1,
    breakfast2,
    breakfast3,
    dinner1,
    dinner2,
    dinner3,
  ]);

  const handleChange = (val) => {
    setKriyaId(val);
    if (val.length >= 4) {
      setTimeout(() => {
        toast.promise(fetchAccommodationDetailsbyKriyaId(`KRIYA${val}`), {
          loading: "Fetching Details",
          success: (res) => {
            setData(res.data.accommodations);
            setRoomType(res.data.accommodations.roomType);
            setFromDate(res.data.accommodations.from);
            setToDate(res.data.accommodations.to);
            setAmenities(res.data.accommodations.amenities);
            setBreakfast1(res.data.accommodations.breakfast1);
            setBreakfast2(res.data.accommodations.breakfast2);
            setBreakfast3(res.data.accommodations.breakfast3);
            setDinner1(res.data.accommodations.dinner1);
            setDinner2(res.data.accommodations.dinner2);
            setDinner3(res.data.accommodations.dinner3);
            setRoom(res.data.accommodations.room);
            return "Details Fetched";
          },
          error: (err) => {
            setKriyaId("");
            console.log(err);
            return "Error";
          },
        });
      }, 100);
    }
  };

  const handleFetchData = () => {
    if (id === "") {
      toast.error("Please enter a valid ID");
      return;
    }
    toast.promise(
      fetchAccommodationDetailsbyEmail(id),
      {
        loading: "Fetching Details",
        success: (res) => {
          setData(res.data.accommodations);
          setRoomType(res.data.accommodations.roomType);
          setFromDate(res.data.accommodations.from);
          setToDate(res.data.accommodations.to);
          setAmenities(res.data.accommodations.amenities);
          setBreakfast1(res.data.accommodations.breakfast1);
          setBreakfast2(res.data.accommodations.breakfast2);
          setBreakfast3(res.data.accommodations.breakfast3);
          setDinner1(res.data.accommodations.dinner1);
          setDinner2(res.data.accommodations.dinner2);
          setDinner3(res.data.accommodations.dinner3);
          setRoom(res.data.accommodations.room);
          return "Details Fetched";
        },
        error: "Error Fetching Details"
      }
    );
  };

  const handleUpdate = () => {
    const days = calculateDays();

    // Use toast.promise to handle the async operation
    toast.promise(
      fetchUpdateAccommodation(data.email, {
        roomType,
        from: fromDate,
        to: toDate,
        amenities,
        breakfast1,
        breakfast2,
        breakfast3,
        dinner1,
        dinner2,
        dinner3,
        room,
        days: days,
        amount: totalCost,
      }),
      {
        loading: "Updating Details",
        success: (res) => {
          setData(null); // Clear the data
          return "Details Updated";
        },
        error: "Error Updating Details",
      }
    );
  };

  const resetForm = () => {
    setId("");
    setKriyaId("");
    setData(null);
    setRoomType("");
    setFromDate("");
    setToDate("");
    setAmenities("");
    setBreakfast1(false);
    setBreakfast2(false);
    setBreakfast3(false);
    setDinner1(false);
    setDinner2(false);
    setDinner3(false);
    setRoom("0");
    setNights("0");
    setMornings("0");
    setTotalCost(0);
  };

  return (
    <Layout title={"Edit Accommodation Details"} className={"space-y-6"}>
      <Row>
        <Dropdown
          valueState={[type, setType]}
          options={["KRIYA ID", "EMAIL"]}
          title="Fetch Details From"
          className="w-1/2"
        />
        {
          type === "KRIYA ID" ?
            <KriyaInput value={kriyaId} handleChange={handleChange} /> :
            <Inputfield
              valueState={[id, setId]}
              title={"Email (Eg. abc@gmail.com)"}
            />
        }
      </Row>
      {
        type === "EMAIL" &&
        <Button handleClick={handleFetchData} text="Fetch Data" outlined className="w-1/2" />
      }

      {data && (
        <div className="bg-white rounded-md p-4 flex flex-col space-y-4">
          <h1 className="text-xl font-bold">Details</h1>
          <p className=""><b className="font-semibold">Name:</b> {data.name}</p>
          <p className=""><b className="font-semibold">Email:</b> {data.email}</p>
          <p className=""><b className="font-semibold">Kriya ID:</b> {data.kriyaId}</p>
          <p className=""><b className="font-semibold">College:</b> {data.college}</p>
          <p className=""><b className="font-semibold">Phone:</b> {data.phone}</p>
          <p className=""><b className="font-semibold">Gender:</b> {data.gender}</p>
          <p className=""><b className="font-semibold">Room:</b> {data.room}</p>
          <p className=""><b className="font-semibold">Payment Status:</b> {data.payment ? "Paid" : "Not Paid"}</p>

          {data.gender === "Male" ? (
            <div className="flex flex-col gap-6 mt-8">
              <h1 className="mt-1 text-2xl font-semibold">
                Boys Accomodation
              </h1>
              <div className="flex flex-col lg:flex-row gap-6">
                <Toggle
                  title="Room Type"
                  valueState={[roomType, setRoomType]}
                  options={["PSG IMSR", "PSG IMSR Refreshment", "PSG Tech Hostel"]}
                  amount={["₹ 250", "₹ 125", "₹ 350"]}
                  className="w-full"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6 mt-8">
              <h1 className="mt-1 text-2xl font-semibold">
                Girls Accomodation
              </h1>
              <div className="flex flex-col lg:flex-row gap-6">
                <Toggle
                  title="Room Type"
                  valueState={[roomType, setRoomType]}
                  options={[
                    "PSG IMSR",
                    "PSG IMSR Refreshment",
                  ]}
                  amount={["₹ 250", "₹ 150"]}
                  className="w-full"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row space-x-4 w-full justify-center">
            <Dropdown
              title="From"
              valueState={[fromDate, setFromDate]}
              options={fromDates}
            />
            <Dropdown
              title="To"
              valueState={[toDate, setToDate]}
              options={toDates}
            />
          </div>
          <p className="mt-2 pl-2">
            No. of days: <b className="font-semibold">{calculateDays()}</b>
          </p>

          {(data.gender === "Male" && roomType === "PSG Tech Hostel") ? (
            <div className="flex flex-col items-center justify-center p-6 space-y-4 w-full">
              <h2 className="text-2xl font-semibold">Enter no of nights/morning</h2>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col">
                  <label className="font-medium">Number of Nights</label>
                  <input
                    type="number"
                    min="0"
                    value={nights}
                    onChange={(e) => setNights(e.target.value)}
                    className="border p-2 rounded-lg w-40 text-center"
                    placeholder="Enter nights"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-medium">Number of Mornings</label>
                  <input
                    type="number"
                    min="0"
                    value={mornings}
                    onChange={(e) => setMornings(e.target.value)}
                    className="border p-2 rounded-lg w-40 text-center"
                    placeholder="Enter mornings"
                  />
                </div>
              </div>
            </div>
          ) : null}
          {(data.gender === "Male" && roomType === "PSG Tech Hostel")?
          <div className="w-full">
            <h1 className="mt-1 text-lg font-semibold">Meals</h1>
            <h1 className="mt-1 text-sm">
              Amount - <b className="font-semibold">Rs.50</b> per meal
            </h1>

            <div className="flex flex-row mt-4 w-full font-semibold">
              <p className="w-1/3">Date</p>
              <p className="w-1/3 flex justify-center">Breakfast</p>
              <p className="w-1/3 flex justify-center">Dinner</p>
            </div>
            <div className="flex flex-row mt-4 w-full items-center">
              <p className="w-1/3">13th March</p>
              <div className="w-1/3 flex justify-center">
              </div>
              <div className="w-1/3 flex justify-center">
                <button
                  className={`${dinner1 ? "bg-[#C80067]" : ""} border-2 border-[#C80067] text-white rounded-lg font-poppins flex items-center`}
                  onClick={() => {
                    setDinner1(!dinner1);
                  }}
                >
                  <FiCheck className="w-8 h-8" />
                </button>
              </div>
            </div>
            <div className="flex flex-row mt-4 w-full items-center">
              <p className="w-1/3">14th March</p>
              <div className="w-1/3 flex justify-center">
                <button
                  className={`${breakfast1 ? "bg-[#C80067]" : ""} border-2 border-[#C80067] text-white rounded-lg font-poppins flex items-center`}
                  onClick={() => {
                    setBreakfast1(!breakfast1);
                  }}
                >
                  <FiCheck className="w-8 h-8" />
                </button>
              </div>
              <div className="w-1/3 flex justify-center">
                <button
                  className={`${dinner2 ? "bg-[#C80067]" : ""} border-2 border-[#C80067] text-white rounded-lg font-poppins flex items-center`}
                  onClick={() => {
                    setDinner2(!dinner2);
                  }}
                >
                  <FiCheck className="w-8 h-8" />
                </button>
              </div>
            </div>
            <div className="flex flex-row mt-4 w-full items-center">
              <p className="w-1/3">15th March</p>
              <div className="w-1/3 flex justify-center">
                <button
                  className={`${breakfast2 ? "bg-[#C80067]" : ""} border-2 border-[#C80067] text-white rounded-lg font-poppins flex items-center`}
                  onClick={() => {
                    setBreakfast2(!breakfast2);
                  }}
                >
                  <FiCheck className="w-8 h-8" />
                </button>
              </div>
              <div className="w-1/3 flex justify-center">
                <button
                  className={`${dinner3 ? "bg-[#C80067]" : ""} border-2 border-[#C80067] text-white rounded-lg font-poppins flex items-center`}
                  onClick={() => {
                    setDinner3(!dinner3);
                  }}
                >
                  <FiCheck className="w-8 h-8" />
                </button>
              </div>
            </div>
            <div className="flex flex-row mt-4 w-full items-center">
              <p className="w-1/3">16th March</p>
              <div className="w-1/3 flex justify-center">
                <button
                  className={`${breakfast3 ? "bg-[#C80067]" : ""} border-2 border-[#C80067] text-white rounded-lg font-poppins flex items-center`}
                  onClick={() => {
                    setBreakfast3(!breakfast3);
                  }}
                >
                  <FiCheck className="w-8 h-8" />
                </button>
              </div>
              <div className="w-1/3 flex justify-center">
              </div>
            </div>
          </div>
          :null
          }

          <div className="flex flex-row w-1/2 items-center border-t border-b pb-2 border-black pt-2">
            <p className="w-1/2 text-lg">New Total</p>
            <p className="text-xl font-semibold w-1/2 flex justify-end">
              ₹ {totalCost}
            </p>
          </div>

          <div className="flex flex-row space-x-4">
            <Button handleClick={handleUpdate} text="Update Data" className="w-1/2 mt-4" />
            <Button handleClick={resetForm} text="Cancel" className="w-1/2 mt-4" />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AccommodationEdit;