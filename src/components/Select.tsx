import { useState, useRef } from "react";
import { useClickOutsideCallback } from "../hooks";
import { Field, ErrorMessage } from "formik";

interface SelectProps {
  className?: string;
  label: string;
  itemName: string;
  itemValue: string;
  items: any[];
  value: any;
  setValue: (value: any) => void;
  name: string;
}
const Select = ({ className = "", label, itemName, itemValue, items, value, setValue, name }: SelectProps) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutsideCallback(ref, () => {
    setOpenDropDown(false);
  });

  const onClickSelect = (val: any) => {
    setValue(val);
    setOpenDropDown(false);
  };

  const selectedItemIndex = items.find((item) => item[itemValue] === value);

  const isSelected = (value: any) => {
    return selectedItemIndex && selectedItemIndex[itemValue] === value;
  };

  return (
    <div ref={ref} className={className + " relative"}>
      <label className="block font-normal text-gray-500 dark:text-gray-400 text-sm mt-3 mb-2">{label}</label>
      <Field
        readOnly
        name={name}
        className="mt-1 block w-full bg-white dark:bg-app-dark-5 rounded-md 
        border-gray-300 dark:border-gray-800  font-bold
        focus:border-purple focus:ring-1 focus:ring-purple text-gray-500 dark:text-gray-400"
        type="text"
        onClick={() => {
          setOpenDropDown(true);
        }}
        value={selectedItemIndex ? selectedItemIndex[itemName] : ""}
      />
      <ErrorMessage name={name}>{(msg) => <div className=" text-red-500 text-sm mt-3">{msg}</div>}</ErrorMessage>
      {openDropDown && (
        <div
          className="bg-white min-w-full dark:bg-app-dark-3 absolute text-base z-50 py-2 list-none text-left rounded shadow-lg mt-1 "
          id="dropdown-example-1"
        >
          {items.map((item, index) => (
            <div
              onClick={() => {
                onClickSelect(item[itemValue]);
              }}
              key={index}
              className={
                "text-sm py-4 dark:text-white font-bold px-4 block bg-transparent text-gray-700 hover:bg-gray-100 cursor-pointer dark:hover:bg-app-dark-4 " +
                (isSelected(item[itemValue]) ? " text-purple-light dark:text-purple-light" : "")
              }
            >
              {item[itemName] ? item[itemName] : ""}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
