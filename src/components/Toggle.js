import React, { useEffect, useState } from "react";

const Toggle = ({
  options = [],
  amount = [],
  title = "",
  className = "",
  buttonClassName = "",
  valueState = ["", (v) => { }],
  icons = [],
  subtext = "",
  noRadioButton = false,
}) => {
  const [value, setValue] = valueState;

  useEffect(() => {
    value && value.length <= 0 && setValue(options[0]);
  }, []);

  return (
    <div className={`${className}`}>
      <p className="font-poppins text-[#181818] mb-2">{title}</p>
      <p className="font-poppins text-[#181818] text-sm mb-4">{subtext}</p>
      <div className="grid grid-cols-2 gap-4 lg:flex lg:space-x-4 min-h-24 justify-items-stretch">
        {options.map((item, idx) => (
          <ToggleItem
          key={idx}
            handleSelect={() => {
              setValue(item);
            }}
            isSelected={item === value}
            text={item}
            amount={amount[idx]}
            icon={icons[idx]}
            className={buttonClassName}
            noRadioButton={noRadioButton}
          />
        ))}
      </div>
    </div>
  );
};

const ToggleItem = ({
  isSelected,
  text,
  amount,
  handleSelect,
  className = "",
  icon,
  noRadioButton = false,
  key=null
}) => {
  return (
    <button
      onClick={handleSelect}
      className={`${className} h-full relative  border-[#C80067] ${isSelected && "bg-[#fee7f3]"
        } border-2  rounded-lg p-4 px-6 space-y-2 flex-1 flex flex-col items-start text-left`}
        key={key}
    >
      {!noRadioButton &&
        <div className="rounded-full h-6 w-6 aspect-square p-1 border-[#C80067] border">
          <div
            className={`${isSelected ? "bg-[#C80067]" : ""
              } rounded-full h-full w-full`}
          ></div>
        </div>
      }
      <p className="font-poppins text-[#181818] ">{text}</p>
      <p className="font-poppins text-[#181818] font-semibold">{amount}</p>
      <p>
        {icon &&
          React.cloneElement(icon, {
            className:
              "hidden lg:block text-[#C80067] absolute top-[50%] right-2 -translate-y-[50%] opacity-[50%]",
            size: 64,
          })}
      </p>
    </button>
  );
};

export default Toggle;
