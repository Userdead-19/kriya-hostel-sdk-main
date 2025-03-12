import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { toast } from "react-hot-toast";
import {
    fetchAccPaid,
    fetchUpdateAccommodation,
} from "../API/calls";
import axios from "axios";

const Defaulters = () => {
    const [data, setData] = useState(null);
    const fetchDefaulters = async () => {
        try {
            const response = await axios.get("https://kriyabackend.psgtech.ac.in/api/acc/defaulting-vacations");
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching defaulters:", error);
        }
    }
    useEffect(() => {
        fetchDefaulters();
    }, []);
    return (
        <Layout title={"Accommodation Defaulters"} className={"space-y-6"}>
            {/* Boys Section */}
            <div className={""}>
                <p className="text-2xl font-bold pb-4">Users</p>

                <div className="flex flex-row text-center">
                    <p className="w-[10%] lg:w-[5%] font-semibold">No.</p>
                    <p className="w-[50%] lg:w-[20%] font-semibold">Name</p>
                    <p className="hidden lg:block w-[10%] font-semibold">Kriya Id</p>
                    <p
                        className="hidden lg:block w-[20%] font-semibold cursor-pointer"

                    >
                        Room Type
                    </p>
                    <p className="hidden lg:block w-[10%] font-semibold">Days</p>
                    <p className="hidden lg:block w-[10%] font-semibold">Amenities</p>
                    <p className="hidden lg:block w-[10%] font-semibold">Meals</p>
                    <p className="w-[20%] lg:w-[10%] font-semibold">Amount</p>
                    <p
                        className="w-[20%] lg:w-[10%] font-semibold cursor-pointer"

                    >
                        Room
                    </p>
                    <p className="hidden lg:block w-[5%] font-semibold">Vacated</p>
                </div>
                {data &&
                    data.map((item, index) => (
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
                                    const updatedList = data.map((up) => {
                                        if (up.email === item.email) {
                                            return { ...up, vacated: true };
                                        }
                                        return { ...up };
                                    });
                                }}
                            />
                        </div>
                    ))}
                {data && (
                    <p className="text-lg mt-2">
                        Total Payment Rs. {" "}
                        {data.reduce(
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

export default Defaulters;