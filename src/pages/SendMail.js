import React, { useState } from "react";
import Layout from "../components/Layout";
import Dropdown from "../components/Dropdown";
import Inputfield from "../components/TextInput";
import Row from "../components/Row";
import Button from "../components/Button";
import { toast } from "react-hot-toast";
import { fetchMailData, fetchSendMail } from "../API/calls";

const SendMail = () => {
  const [type, setType] = useState("TRANSACTION");
  const [id, setId] = useState("");

  const [data, setData] = useState(null);

  const handleFetchData = () => {
    toast.promise(fetchMailData(type, id), {
      loading: "Fetching Data",
      success: (res) => {
        console.log(res);
        setData(res.data);
        return "Data Fetched";
      },
      error: (err) => {
        console.log(err);
        return "Error Fetching Data";
      },
    });
  };

  const handleSendMail = () => {
    toast.promise(fetchSendMail(type, id), {
      loading: "Sending Mail",
      success: (res) => {
        console.log(res);
        return "Mail Sent";
      },
      error: (err) => {
        console.log(err);
        return "Error Sending Mail";
      },
    });
  };

  return (
    <Layout title={"Send Mail"} className={"space-y-6"}>
      <Row>
        <Dropdown
          valueState={[type, setType]}
          options={["TRANSACTION", "REGISTRATION"]}
          title="Type"
        />
        <Inputfield
          valueState={[id, setId]}
          title={
            type === "TRANSACTION"
              ? "Transaction Id (Eg. TXN_KRIYA_00000)"
              : "Kriya Id (Eg. KRIYA00000)"
          }
        />
      </Row>
      <Row>
        <Button handleClick={handleFetchData} text="Fetch Data" outlined />
        <Button handleClick={handleSendMail} text="Send Mail" />
      </Row>
      {data && (
        <div className="bg-white rounded-md p-4">
          <h1 className="text-xl font-bold">Mail Data</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </Layout>
  );
};

export default SendMail;
