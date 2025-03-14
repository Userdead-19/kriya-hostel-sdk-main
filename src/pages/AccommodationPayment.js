import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Dropdown from "../components/Dropdown";
import Inputfield from "../components/TextInput";
import Row from "../components/Row";
import Button from "../components/Button";
import { toast } from "react-hot-toast";
import { fetchAccommodationDetailsbyEmail, fetchAccommodationDetailsbyKriyaId, fetchUpdateAccommodation } from "../API/calls";
import KriyaInput from "../components/KriyaInput";
import axios from "axios";

const AccommodationPayment = () => {
  const [type, setType] = useState("KRIYA ID");
  const [id, setId] = useState("");
  const [kriyaId, setKriyaId] = useState("");
  const [data, setData] = useState(null);
  const [room, setRoom] = useState("");
  const [roomData, setRoomData] = useState([]); // Store room data here
  const [block, setBlock] = useState("");

  // Fetch room data from API
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("https://kriyabackend.psgtech.ac.in/api/acc/ListofRooms");
        console.log(response.data);
        setRoomData(response.data); // Set the room data in state
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);

  const handleChange = (val) => {
    setKriyaId(val);
    if (val.length >= 4) {
      setTimeout(() => {
        toast.promise(fetchAccommodationDetailsbyKriyaId(`KRIYA${val}`), {
          loading: "Fetching Details",
          success: (res) => {
            setData(res.data.accommodations);
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
          return "Details Fetched";
        }
      },
      {
        error: "Error Fetching Details"
      }
    );
  };

  useEffect(() => {
    if (data) {
      setRoom(data.room);
    }
  }, [data]);

  const handlePaid = () => {
    if (room === "") {
      toast.error("Please enter a valid room number");
      return;
    }

    toast.promise(fetchUpdateAccommodation(data.email, {
      room: room,
      payment: true,
    }), {
      loading: "Updating Details",
      success: (res) => {
        setData(null);
        return "Details Updated";
      }
    },
      {
        error: "Error Updating Details"
      }
    );
  };

  const handleUnPaid = () => {
    toast.promise(fetchUpdateAccommodation(data.email, {
      payment: false,
    }), {
      loading: "Updating Details",
      success: (res) => {
        setData(null);
        return "Details Updated";
      }
    },
      {
        error: "Error Updating Details"
      }
    );
  };

  return (
    <Layout title={"Accommodation Payment"} className={"space-y-6"}>
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
          <p><b className="font-semibold">Name:</b> {data.name}</p>
          <p><b className="font-semibold">Email:</b> {data.email}</p>
          <p><b className="font-semibold">Kriya ID:</b> {data.kriyaId}</p>
          <p><b className="font-semibold">College:</b> {data.college}</p>
          <p><b className="font-semibold">Phone:</b> {data.phone}</p>
          <p><b className="font-semibold">Gender:</b> {data.gender}</p>
          <p><b className="font-semibold">Room Type:</b> {data.roomType}</p>
          <p><b className="font-semibold">No. of Days:</b> {data.days} Days</p>
          <p><b className="font-semibold">From Date:</b> {data.from}</p>
          <p><b className="font-semibold">To Date:</b> {data.to}</p>
          <p><b className="font-semibold">Meals:</b> {data.dinner1 && "13th Dinner, "}{data.breakfast1 && "14th Breakfast, "}{data.dinner2 && "14th Dinner, "}{data.breakfast2 && "15th Breakfast, "}{data.dinner3 && "15th Dinner, "}{data.breakfast3 && "16th Breakfast"}</p>
          <p><b className="font-semibold">Amenities Required:</b> {data.amenities}</p>
          <p className="text-xl"><b className="font-semibold">Total Amount:</b> ₹ {data.amount}</p>
          <p className="text-xl"><b className="font-semibold">Payment Status: {data.payment || data.amount===0? <span className="text-amber-500">Paid</span> : <span className="text-red-500">Not Paid</span>}</b></p>

          {/* Room Number Dropdown */}
          {data.gender==="Male"?
          <div className="my-4">
            <label htmlFor="roomDropdown" className="block text-sm font-medium text-gray-700 mb-2">
              Room Number
            </label>
            <select
              id="roomDropdown"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" disabled>Select a room</option>
              {roomData.map((roomItem) => (
                <option key={roomItem.RoomName} value={roomItem.RoomName}>
                  Room {roomItem.RoomName} - {roomItem.noOfpersons} People  - (Capacity : {roomItem.Capacity})
                </option>
              ))}
            </select>
          </div>:""
          }
          {/* <Inputfield
            valueState={[block, setBlock]}
            title="Block"
          /> */}

          <div className="flex flex-row space-x-4">
            <Button handleClick={handlePaid} text="Mark as paid" className="w-1/2" />
            <Button handleClick={handleUnPaid} text="Mark as unpaid" className="w-1/2" />
          </div>
        </div>
      )}

      {data === null && (
        <div className="bg-white rounded-md p-4 flex flex-col space-y-4">
          <h1 className="text-xl font-bold">No Details Found</h1>
        </div>
      )}
    </Layout>
  );
};

export default AccommodationPayment;
