import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { fetchMasterAccommodation, fetchExcelSheet } from "../API/calls";
import Layout from "../components/Layout";

const AccommodationDetails = () => {
  const [accommodation, setAccommodation] = useState(null);

  useEffect(() => {
    toast.promise(fetchMasterAccommodation(), {
      loading: "Loading accommodation details...",
      success: (res) => {
        console.log(res.data);
        setAccommodation(res.data);
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
      <p className="text-2xl font-bold">Food Details</p>
      <div className="flex flex-col space-y-4 mt-8">
        <div className="flex flex-row items-center">
          <p className="text-sm w-1/4 flex justify-center">Date</p>
          <p className="text-sm w-1/4 flex justify-center">Boys</p>
          <p className="text-sm w-1/4 flex justify-center">Girls</p>
          <p className="text-sm w-1/4 flex justify-center">Total</p>
        </div>
        <div className="flex flex-row items-center border-b border-black pb-1">
          <p className="w-1/4 flex justify-center font-semibold">13th Dinner</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center">{accommodation?.dinner1?.find(i => i.gender === 'Male')?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center">{accommodation?.dinner1?.find(i => i.gender === 'Female')?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center">{accommodation?.dinner1?.find(i => i.gender === 'Male')?.count + accommodation?.dinner1?.find(i => i.gender === 'Female')?.count}</p>
        </div>
        <div className="flex flex-row items-center border-b border-black pb-1">
          <p className="w-1/4 flex justify-center font-semibold">14th Breakfast</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center">{accommodation?.breakfast1?.find(i => i.gender === 'Male')?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center">{accommodation?.breakfast1?.find(i => i.gender === 'Female')?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center">{accommodation?.breakfast1?.find(i => i.gender === 'Male')?.count + accommodation?.breakfast1?.find(i => i.gender === 'Female')?.count}</p>
        </div>
        <div className="flex flex-row items-center border-b border-black pb-1">
          <p className="w-1/4 flex justify-center font-semibold">14th Dinner</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center">{accommodation?.dinner2?.find(i => i.gender === 'Male')?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center">{accommodation?.dinner2?.find(i => i.gender === 'Female')?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center">{accommodation?.dinner2?.find(i => i.gender === 'Male')?.count + accommodation?.dinner2?.find(i => i.gender === 'Female')?.count}</p>
        </div>
        <div className="flex flex-row items-center border-b border-black pb-1">
          <p className="w-1/4 flex justify-center font-semibold">15th Breakfast</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center">{accommodation?.breakfast2?.find(i => i.gender === 'Male')?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center">{accommodation?.breakfast2?.find(i => i.gender === 'Female')?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center">{accommodation?.breakfast2?.find(i => i.gender === 'Male')?.count + accommodation?.breakfast2?.find(i => i.gender === 'Female')?.count}</p>
        </div>
        <div className="flex flex-row items-center border-b border-black pb-1">
          <p className="w-1/4 flex justify-center font-semibold">15th Dinner</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center">{accommodation?.breakfast3?.find(i => i.gender === 'Male')?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center">{accommodation?.breakfast3?.find(i => i.gender === 'Female')?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center">{accommodation?.breakfast3?.find(i => i.gender === 'Male')?.count + accommodation?.breakfast3?.find(i => i.gender === 'Female')?.count}</p>
        </div>
        <div className="flex flex-row items-center border-b border-black pb-1">
          <p className="w-1/4 flex justify-center font-semibold">16th Breakfast</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center">{accommodation?.dinner3?.find(i => i.gender === 'Male')?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center">{accommodation?.dinner3?.find(i => i.gender === 'Female')?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center">{accommodation?.dinner3?.find(i => i.gender === 'Male')?.count + accommodation?.dinner3?.find(i => i.gender === 'Female')?.count}</p>
        </div>
        <div className="flex flex-row items-center border-b border-black pb-1">
          <p className="w-1/4 flex justify-center font-semibold">16th Dinner</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center">{accommodation?.breakfast3?.find(i => i.gender === 'Male')?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center">{accommodation?.breakfast3?.find(i => i.gender === 'Female')?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center">{accommodation?.breakfast3?.find(i => i.gender === 'Male')?.count + accommodation?.breakfast3?.find(i => i.gender === 'Female')?.count}</p>
        </div>
      </div>

      <p className="text-2xl font-bold mt-16">Amenities Details</p>
      <div className="flex flex-col space-y-4 mt-8">
        <div className="flex flex-row items-center">
          <p className="text-sm w-1/3 flex justify-center">Boys</p>
          <p className="text-sm w-1/3 flex justify-center">Girls</p>
          <p className="text-sm w-1/3 flex justify-center">Total</p>
        </div>
        <div className="flex flex-row items-center">
          <p className="font-semibold text-2xl w-1/3 flex justify-center">{accommodation?.amenities?.find(i => i.gender === 'Male')?.count}</p>
          <p className="font-semibold text-2xl w-1/3 flex justify-center">{accommodation?.amenities?.find(i => i.gender === 'Female')?.count}</p>
          <p className="font-semibold text-2xl w-1/3 flex justify-center">{accommodation?.amenities?.find(i => i.gender === 'Male')?.count + accommodation?.amenities?.find(i => i.gender === 'Female')?.count}</p>
        </div>
        <p className="text-xl font-semibold pt-8">Day Wise Amenities Details - Boys</p>
        {
          accommodation?.maleAmenities?.map((item, index) => (
            <div className="flex flex-row items-center" key={index}>
              <p className="font-semibold text-sm w-1/2 flex justify-center text-center">{item?.from} - {item?.to}</p>
              <p className="font-semibold text-2xl w-1/2 flex justify-center text-center">{item?.count}</p>
            </div>
          ))
        }
        <p className="text-xl font-semibold pt-8">Day Wise Amenities Details - Girls</p>
        {
          accommodation?.femaleAmenities?.map((item, index) => (
            <div className="flex flex-row items-center" key={index}>
              <p className="font-semibold text-sm w-1/2 flex justify-center text-center">{item?.from} - {item?.to}</p>
              <p className="font-semibold text-2xl w-1/2 flex justify-center text-center">{item?.count}</p>
            </div>
          ))
        }
      </div>

      <p className="text-2xl font-bold mt-16">Room Details</p>
      <p className="text-lg font-semibold border-b border-black w-fit mt-2">Total - {accommodation?.totalRooms}</p>
      <p className="text-xl font-semibold mt-2">Boys</p>
      <div className="flex flex-col space-y-4 mt-4">
        <div className="flex flex-row items-center">
          <p className="text-sm w-1/2 flex justify-center">Room Type</p>
          <p className="text-sm w-1/2 flex justify-center">Count</p>
        </div>
        {
          accommodation?.maleStats?.map((item, index) => (
            <div className="flex flex-row items-center" key={index}>
              <p className="font-semibold w-1/2 flex justify-center text-center">{item?.roomType}</p>
              <p className="font-semibold text-2xl w-1/2 flex justify-center text-center">{item?.count}</p>
            </div>
          ))
        }
        <div className="flex flex-row items-center border-t border-black pt-2">
          <p className="font-semibold w-1/2 flex justify-center text-center">Total</p>
          <p className="font-semibold text-2xl w-1/2 flex justify-center text-center">{accommodation?.maleStats?.reduce((a, b) => a + b.count, 0)}</p>
        </div>
      </div>
      <p className="text-xl font-semibold mt-8">Girls</p>
      <div className="flex flex-col space-y-4 mt-4">
        <div className="flex flex-row items-center">
          <p className="text-sm w-1/2 flex justify-center">Room Type</p>
          <p className="text-sm w-1/2 flex justify-center">Count</p>
        </div>
        {
          accommodation?.femaleStats?.map((item, index) => (
            <div className="flex flex-row items-center" key={index}>
              <p className="font-semibold w-1/2 flex justify-center text-center">{item?.roomType}</p>
              <p className="font-semibold text-2xl w-1/2 flex justify-center text-center">{item?.count}</p>
            </div>
          ))
        }
        <div className="flex flex-row items-center border-t border-black pt-2">
          <p className="font-semibold w-1/2 flex justify-center text-center">Total</p>
          <p className="font-semibold text-2xl w-1/2 flex justify-center text-center">{accommodation?.femaleStats?.reduce((a, b) => a + b.count, 0)}</p>
        </div>
      </div>

      <p className="text-2xl font-bold mt-16">Date Wise Details</p>
      <div className="flex flex-col space-y-4 mt-2">
        <p className="text-lg mt-2 font-semibold">Boys - PSG IMSR</p>
        <div className="flex flex-row items-center text-center">
          <p className="text-sm w-1/4 flex justify-center">Date</p>
          <p className="text-sm font-semibold w-1/4 flex justify-center">14th March Night</p>
          <p className="text-sm font-semibold w-1/4 flex justify-center">15th March Night</p>
          <p className="text-sm font-semibold w-1/4 flex justify-center">16th March Evening</p>
        </div>

        <div className="flex flex-row items-center border-b border-black pb-1">
          <p className="text-sm font-semibold w-1/4 flex justify-center text-center">13th March Night</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.maleDetails?.find(i => i.from === "13th March Night" && i.to === "14th March Night" && i.roomType === "Common Free Hall")?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.maleDetails?.find(i => i.from === "13th March Night" && i.to === "15th March Night" && i.roomType === "Common Free Hall")?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.maleDetails?.find(i => i.from === "13th March Night" && i.to === "16th March Evening" && i.roomType === "Common Free Hall")?.count}</p>
        </div>

        <div className="flex flex-row items-center border-b border-black pb-1">
          <p className="text-sm font-semibold w-1/4 flex justify-center text-center">14th March Morning</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.maleDetails?.find(i => i.from === "14th March Morning" && i.to === "14th March Night" && i.roomType === "Common Free Hall")?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.maleDetails?.find(i => i.from === "14th March Morning" && i.to === "15th March Night" && i.roomType === "Common Free Hall")?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.maleDetails?.find(i => i.from === "14th March Morning" && i.to === "16th March Evening" && i.roomType === "Common Free Hall")?.count}</p>
        </div>

        <div className="flex flex-row items-center border-b border-black pb-1">
          <p className="text-sm font-semibold w-1/4 flex justify-center text-center">15th March Morning</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">-</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.maleDetails?.find(i => i.from === "15th March Morning" && i.to === "15th March Night" && i.roomType === "Common Free Hall")?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.maleDetails?.find(i => i.from === "15th March Morning" && i.to === "16th March Evening" && i.roomType === "Common Free Hall")?.count}</p>
        </div>

        <div className="flex flex-row items-center border-b border-black pb-1">
          <p className="text-sm font-semibold w-1/4 flex justify-center text-center">16th March Morning</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">-</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">-</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.maleDetails?.find(i => i.from === "16th March Morning" && i.to === "16th March Evening" && i.roomType === "Common Free Hall")?.count}</p>
        </div>
      </div>

      <div className="flex flex-col space-y-4 mt-8">
        <p className="text-lg mt-8 font-semibold">Boys - Two Sharing</p>
        <div className="flex flex-row items-center text-center">
          <p className="text-sm w-1/4 flex justify-center">Date</p>
          <p className="text-sm font-semibold w-1/4 flex justify-center">14th March Night</p>
          <p className="text-sm font-semibold w-1/4 flex justify-center">15th March Night</p>
          <p className="text-sm font-semibold w-1/4 flex justify-center">16th March Evening</p>
        </div>

        <div className="flex flex-row items-center border-b border-black pb-1">
          <p className="text-sm font-semibold w-1/4 flex justify-center text-center">13th March Night</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.maleDetails?.find(i => i.from === "13th March Night" && i.to === "14th March Night" && i.roomType === "Two Sharing")?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.maleDetails?.find(i => i.from === "13th March Night" && i.to === "15th March Night" && i.roomType === "Two Sharing")?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.maleDetails?.find(i => i.from === "13th March Night" && i.to === "16th March Evening" && i.roomType === "Two Sharing")?.count}</p>
        </div>

        <div className="flex flex-row items-center border-b border-black pb-1">
          <p className="text-sm font-semibold w-1/4 flex justify-center text-center">14th March Morning</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.maleDetails?.find(i => i.from === "14th March Morning" && i.to === "14th March Night" && i.roomType === "Two Sharing")?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.maleDetails?.find(i => i.from === "14th March Morning" && i.to === "15th March Night" && i.roomType === "Two Sharing")?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.maleDetails?.find(i => i.from === "14th March Morning" && i.to === "16th March Evening" && i.roomType === "Two Sharing")?.count}</p>
        </div>

        <div className="flex flex-row items-center border-b border-black pb-1">
          <p className="text-sm font-semibold w-1/4 flex justify-center text-center">15th March Morning</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">-</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.maleDetails?.find(i => i.from === "15th March Morning" && i.to === "15th March Night" && i.roomType === "Two Sharing")?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.maleDetails?.find(i => i.from === "15th March Morning" && i.to === "16th March Evening" && i.roomType === "Two Sharing")?.count}</p>
        </div>

        <div className="flex flex-row items-center border-b border-black pb-1">
          <p className="text-sm font-semibold w-1/4 flex justify-center text-center">16th March Morning</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">-</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">-</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.maleDetails?.find(i => i.from === "16th March Morning" && i.to === "16th March Evening" && i.roomType === "Two Sharing")?.count}</p>
        </div>
      </div>

      <div className="flex flex-col space-y-4 mt-8">
        <p className="text-lg mt-8 font-semibold">Girls - Common Free Hall</p>
        <div className="flex flex-row items-center">
          <p className="text-sm w-1/4 flex justify-center text-center">Date</p>
          <p className="text-sm font-semibold w-1/4 flex justify-center text-center">14th March Night</p>
          <p className="text-sm font-semibold w-1/4 flex justify-center text-center">15th March Night</p>
          <p className="text-sm font-semibold w-1/4 flex justify-center text-center">16th March Evening</p>
        </div>

        <div className="flex flex-row items-center border-b border-black pb-1">
          <p className="text-sm font-semibold w-1/4 flex justify-center text-center">13th March Night</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.femaleDetails?.find(i => i.from === "13th March Night" && i.to === "14th March Night" && i.roomType === "Common Free Hall")?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.femaleDetails?.find(i => i.from === "13th March Night" && i.to === "15th March Night" && i.roomType === "Common Free Hall")?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.femaleDetails?.find(i => i.from === "13th March Night" && i.to === "16th March Evening" && i.roomType === "Common Free Hall")?.count}</p>
        </div>

        <div className="flex flex-row items-center border-b border-black pb-1">
          <p className="text-sm font-semibold w-1/4 flex justify-center text-center">14th March Morning</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.femaleDetails?.find(i => i.from === "14th March Morning" && i.to === "14th March Night" && i.roomType === "Common Free Hall")?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.femaleDetails?.find(i => i.from === "14th March Morning" && i.to === "15th March Night" && i.roomType === "Common Free Hall")?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.femaleDetails?.find(i => i.from === "14th March Morning" && i.to === "16th March Evening" && i.roomType === "Common Free Hall")?.count}</p>
        </div>

        <div className="flex flex-row items-center border-b border-black pb-1">
          <p className="text-sm font-semibold w-1/4 flex justify-center text-center">15th March Morning</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">-</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.femaleDetails?.find(i => i.from === "15th March Morning" && i.to === "15th March Night" && i.roomType === "Common Free Hall")?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.femaleDetails?.find(i => i.from === "15th March Morning" && i.to === "16th March Evening" && i.roomType === "Common Free Hall")?.count}</p>
        </div>

        <div className="flex flex-row items-center border-b border-black pb-1">
          <p className="text-sm font-semibold w-1/4 flex justify-center text-center">16th March Morning</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">-</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">-</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.femaleDetails?.find(i => i.from === "16th March Morning" && i.to === "16th March Evening" && i.roomType === "Common Free Hall")?.count}</p>
        </div>
      </div>

      <div className="flex flex-col space-y-4 mt-8">
        <p className="text-lg mt-8 font-semibold">Girls - 4 / 6 Sharing with common bathroom</p>
        <div className="flex flex-row items-center">
          <p className="text-sm w-1/4 flex justify-center text-center">Date</p>
          <p className="text-sm font-semibold w-1/4 flex justify-center text-center">14th March Night</p>
          <p className="text-sm font-semibold w-1/4 flex justify-center text-center">15th March Night</p>
          <p className="text-sm font-semibold w-1/4 flex justify-center text-center">16th March Evening</p>
        </div>

        <div className="flex flex-row items-center border-b border-black pb-1">
          <p className="text-sm font-semibold w-1/4 flex justify-center text-center">13th March Night</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.femaleDetails?.find(i => i.from === "13th March Night" && i.to === "14th March Night" && i.roomType === "4 / 6 Sharing with common bathroom")?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.femaleDetails?.find(i => i.from === "13th March Night" && i.to === "15th March Night" && i.roomType === "4 / 6 Sharing with common bathroom")?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.femaleDetails?.find(i => i.from === "13th March Night" && i.to === "16th March Evening" && i.roomType === "4 / 6 Sharing with common bathroom")?.count}</p>
        </div>

        <div className="flex flex-row items-center border-b border-black pb-1">
          <p className="text-sm font-semibold w-1/4 flex justify-center text-center">14th March Morning</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.femaleDetails?.find(i => i.from === "14th March Morning" && i.to === "14th March Night" && i.roomType === "4 / 6 Sharing with common bathroom")?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.femaleDetails?.find(i => i.from === "14th March Morning" && i.to === "15th March Night" && i.roomType === "4 / 6 Sharing with common bathroom")?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.femaleDetails?.find(i => i.from === "14th March Morning" && i.to === "16th March Evening" && i.roomType === "4 / 6 Sharing with common bathroom")?.count}</p>
        </div>

        <div className="flex flex-row items-center border-b border-black pb-1">
          <p className="text-sm font-semibold w-1/4 flex justify-center text-center">15th March Morning</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">-</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.femaleDetails?.find(i => i.from === "15th March Morning" && i.to === "15th March Night" && i.roomType === "4 / 6 Sharing with common bathroom")?.count}</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.femaleDetails?.find(i => i.from === "15th March Morning" && i.to === "16th March Evening" && i.roomType === "4 / 6 Sharing with common bathroom")?.count}</p>
        </div>

        <div className="flex flex-row items-center border-b border-black pb-1">
          <p className="text-sm font-semibold w-1/4 flex justify-center text-center">16th March Morning</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">-</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">-</p>
          <p className="font-semibold text-2xl w-1/4 flex justify-center text-center">{accommodation?.femaleDetails?.find(i => i.from === "16th March Morning" && i.to === "16th March Evening" && i.roomType === "4 / 6 Sharing with common bathroom")?.count}</p>
        </div>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-8 rounded-md"
        onClick={() => fetchExcelSheet()} // Ensures function execution
      >
        Download Report
      </button>

    </Layout>
  );
};

export default AccommodationDetails;
