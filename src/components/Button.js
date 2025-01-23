import React from "react";

const Button = ({ handleClick, text, className, outlined = false }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleClick(e);
      }}
      className={`${className} ${outlined ? "text-amber-600 bg-white " : "bg-amber-600 text-white"
        } border-2  border-amber-600 font-semibold text-lg w-full px-4 py-2 rounded-lg shadow-lg`}
    >
      {text}
    </button>
  );
};

export default Button;
