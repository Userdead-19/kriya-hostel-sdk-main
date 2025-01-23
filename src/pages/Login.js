import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Heading from "../components/Heading";
import TextInput from "../components/TextInput";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
    if (username === "hostel" && password === "houseim23") {
      toast.success("Logged in successfully");
      navigate("/");
      localStorage.setItem("token", "dharmanaprodhan");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <main className="w-screen h-screen bg-gradient-to-br from-amber-600 to-amber-100 flex items-center justify-center">
      <div className="w-5/6 lg:w-[400px] h-fit bg-white rounded-lg p-8 shadow-lg">
        <Heading>Login</Heading>
        <TextInput
          className="mt-8"
          valueState={[username, setUsername]}
          placeholder="Enter Username"
          title="Username"
        />
        <TextInput
          className="mt-4"
          valueState={[password, setpassword]}
          placeholder="Enter Password"
          title="Password"
          type="password"
        />
        <Button text="Login" className="mt-8" handleClick={handleClick} />
      </div>
    </main>
  );
};

export default Login;
