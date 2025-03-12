import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Dropdown from "../components/Dropdown";
import Inputfield from "../components/TextInput";
import Row from "../components/Row";
import Button from "../components/Button";
import { toast } from "react-hot-toast";
import { fetchAccommodationDetailsbyEmail, fetchAccPaid, fetchAccommodationDetailsbyKriyaId, fetchUpdateAccommodation } from "../API/calls";
import KriyaInput from "../components/KriyaInput";
import axios from "axios";



const VacateUsers = () => {
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

    const handleVacated = () => {
        if (room === "") {
            toast.error("Please enter a valid room number");
            return;
        }

        toast.promise(fetchUpdateAccommodation(data.email, {
            vacated: true,
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

    const handleUnVacated = () => {
        toast.promise(fetchUpdateAccommodation(data.email, {
            vacated: false,
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
                    <p><b className="font-semibold">Meals:</b> {data.dinner1 && "23th Dinner, "}{data.breakfast1 && "24th Breakfast, "}{data.dinner2 && "24th Dinner, "}{data.breakfast2 && "25th Breakfast, "}{data.dinner3 && "25th Dinner, "}{data.breakfast3 && "26th Breakfast"}</p>
                    <p><b className="font-semibold">Amenities Required:</b> {data.amenities}</p>
                    <p className="text-xl"><b className="font-semibold">Total Amount:</b> ₹ {data.amount}</p>
                    <p className="text-xl"><b className="font-semibold">Payment Status: {data.payment ? <span className="text-amber-500">Paid</span> : <span className="text-red-500">Not Paid</span>}</b></p>
                    <p className="text-xl"><b className="font-semibold">Vacated Status: {data.vacated ? <span className="text-amber-500">Vacated</span> : <span className="text-red-500">Not Vacated</span>}</b></p>

                    {/* Room Number Dropdown */}
                    <div className="my-4">
                        <label htmlFor="roomDropdown" className="block text-xl font-medium text-gray-700 mb-2">
                            Room Number : {data.room}
                        </label>
                    </div>


                    <div className="flex flex-row space-x-4">
                        <Button handleClick={handleVacated} text="Mark as Vacated" className="w-1/2" />
                        <Button handleClick={handleUnVacated} text="Mark as Not Vacated" className="w-1/2" />
                    </div>
                </div>
            )}

            {data === null && (
                <div className="bg-white rounded-md p-4 flex flex-col space-y-4">
                    {/* <h1 className="text-xl font-bold">No Details Found</h1> */}
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
                            <p className="hidden lg:block w-[20%] font-semibold cursor-pointer" onClick={() => handleSort({ key: "roomType" }, setMaleSortConfig, male, setMale)}>Room Type</p>
                            <p className="hidden lg:block w-[10%] font-semibold">Days</p>
                            <p className="hidden lg:block w-[10%] font-semibold">Amenities</p>
                            <p className="hidden lg:block w-[10%] font-semibold">Meals</p>
                            <p className="w-[20%] lg:w-[10%] font-semibold">Amount</p>
                            <p className="w-[20%] lg:w-[10%] font-semibold cursor-pointer" onClick={() => handleSort({ key: "room" }, setMaleSortConfig, male, setMale)}>Room</p>
                        </div>
                        {male && filterList(male, maleSearch).filter(item => item.vacated).map((item, index) => (
                            <div key={item.email} className="flex flex-row text-sm text-center py-2 border-b border-gray-500">
                                <p className="w-[10%] lg:w-[5%]">{index + 1}.</p>
                                <p className="w-[50%] lg:w-[20%]">{item.name}</p>
                                <p className="hidden lg:block w-[10%]">{item.kriyaId}</p>
                                <p className="hidden lg:block w-[20%] px-2">{item.roomType}</p>
                                <p className="hidden lg:block w-[10%] font-semibold">{item.days} {item.days === 1 ? "Day" : "Days"}</p>
                                <p className="hidden lg:block w-[10%]">{item.amenities}</p>
                                <p className="hidden lg:block w-[10%]">{item.breakfast1 + item.breakfast2 + item.breakfast3 + item.dinner1 + item.dinner2 + item.dinner3}</p>
                                <p className="w-[20%] lg:w-[10%] font-semibold">Rs. {item.amount}</p>
                                <p className="w-[20%] lg:w-[10%] font-semibold">{item.room}</p>
                            </div>
                        ))}
                        {male && (
                            <p className="text-lg mt-2">Total Payment Rs. {male.filter(item => item.vacated).reduce((acc, curr) => acc + Number(curr.amount), 0)}</p>
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
                            <p className="hidden lg:block w-[20%] font-semibold cursor-pointer" onClick={() => handleSort({ key: "roomType" }, setFemaleSortConfig, female, setFemale)}>Room Type</p>
                            <p className="hidden lg:block w-[10%] font-semibold">Days</p>
                            <p className="hidden lg:block w-[10%] font-semibold">Amenities</p>
                            <p className="hidden lg:block w-[10%] font-semibold">Meals</p>
                            <p className="w-[20%] lg:w-[10%] font-semibold">Amount</p>
                            <p className="w-[20%] lg:w-[10%] font-semibold cursor-pointer" onClick={() => handleSort({ key: "room" }, setFemaleSortConfig, female, setFemale)}>Room</p>
                        </div>
                        {female && filterList(female, femaleSearch).filter(item => item.vacated===true).map((item, index) => (
                            <div key={item.email} className="flex flex-row text-sm text-center py-2 border-b border-gray-500">
                                <p className="w-[10%] lg:w-[5%]">{index + 1}.</p>
                                <p className="w-[50%] lg:w-[20%]">{item.name}</p>
                                <p className="hidden lg:block w-[10%]">{item.kriyaId}</p>
                                <p className="hidden lg:block w-[20%] px-2">{item.roomType}</p>
                                <p className="hidden lg:block w-[10%] font-semibold">{item.days} {item.days === 1 ? "Day" : "Days"}</p>
                                <p className="hidden lg:block w-[10%]">{item.amenities}</p>
                                <p className="hidden lg:block w-[10%]">{item.breakfast1 + item.breakfast2 + item.breakfast3 + item.dinner1 + item.dinner2 + item.dinner3}</p>
                                <p className="w-[20%] lg:w-[10%] font-semibold">Rs. {item.amount}</p>
                                <p className="w-[20%] lg:w-[10%] font-semibold">{item.room}</p>
                            </div>
                        ))}
                        {female && (
                            <p className="text-lg mt-2">Total Payment Rs. {female.filter(item => item.vacated).reduce((acc, curr) => acc + Number(curr.amount), 0)}</p>
                        )}
                    </div>


                </div>
            )}
            
        </Layout>
    );
};

export default VacateUsers;
