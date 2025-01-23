import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Dropdown from "../components/Dropdown";
import Inputfield from "../components/TextInput";
import Row from "../components/Row";
import Button from "../components/Button";
import { toast } from "react-hot-toast";
import { fetchAccommodationDetailsbyEmail, fetchAccommodationDetailsbyKriyaId, fetchUpdateAccommodation } from "../API/calls";
import KriyaInput from "../components/KriyaInput";

const AccommodationPayment = () => {
  const [type, setType] = useState("KRIYA ID");
  const [id, setId] = useState("");
  const [kriyaId, setKriyaId] = useState("");
  const [data, setData] = useState(null);
  const [room, setRoom] = useState("");

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
          <p className=""><b className="font-semibold">Name:</b> {data.name}</p>
          <p className=""><b className="font-semibold">Email:</b> {data.email}</p>
          <p className=""><b className="font-semibold">Kriya ID:</b> {data.kriyaId}</p>
          <p className=""><b className="font-semibold">College:</b> {data.college}</p>
          <p className=""><b className="font-semibold">Phone:</b> {data.phone}</p>
          <p className=""><b className="font-semibold">Gender:</b> {data.gender}</p>
          <p className=""><b className="font-semibold">Room Type:</b> {data.roomType}</p>
          <p className=""><b className="font-semibold">No. of Days:</b> {data.days} Days</p>
          <p className=""><b className="font-semibold">From Date:</b> {data.from}</p>
          <p className=""><b className="font-semibold">To Date:</b> {data.to}</p>
          <p className=""><b className="font-semibold">Meals:</b> {data.dinner1 && "23th Dinner, "}{data.breakfast1 && "24th Breakfast, "}{data.dinner2 && "24th Dinner, "}{data.breakfast2 && "25th Breakfast, "}{data.dinner3 && "25th Dinner, "}{data.breakfast3 && "26th Breakfast"}</p>
          <p className=""><b className="font-semibold">Amenities Required:</b> {data.amenities}</p>
          <p className="text-xl"><b className="font-semibold">Total Amount:</b> ₹ {data.amount}</p>
          <p className="text-xl"><b className="font-semibold">Payment Status: {data.payment ? <span className="text-amber-500">Paid</span> : <span className="text-red-500">Not Paid</span>}</b></p>
          <Inputfield
            valueState={[block, setBlock]}
            title="Block"
          />
          <Inputfield
            valueState={[room, setRoom]}
            title="Room Number"
          />

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
