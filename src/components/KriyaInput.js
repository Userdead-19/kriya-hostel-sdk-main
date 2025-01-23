import React, { useState } from "react";
import OtpInput from "react-otp-input";

const KriyaInput = ({ value, handleChange }) => {
  return (
    <div className="flex flex-col justify-center lg:justify-start lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 lg:items-end mt-4">
      <p className="tracking-widest text-4xl font-semibold text-amber-600">
        KRIYA
      </p>
      <OtpInput
        value={value}
        onChange={(val) => handleChange(val)}
        numInputs={4}
        separator={<span></span>}
        isInputNum
        inputStyle={{
          width: "4rem",
          height: "4rem",
          borderRadius: "1rem",
          border: "2px solid #F59E0C",
          margin: "0 0.5rem",
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#D97708",
        }}
        focusStyle={{
          border: "2px solid #D97708",
          outline: "none",
        }}
        shouldAutoFocus
        containerStyle={{}}
      />
    </div>
  );
};

export default KriyaInput;
