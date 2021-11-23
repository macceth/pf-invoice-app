// Credits: https://tailwindcomponents.com/component/datepicker-with-tailwindcss-and-alpinejs

import { useState, useRef, useEffect } from "react";
import { useClickOutsideCallback } from "../hooks";
import { Field, ErrorMessage } from "formik";
import moment from "moment";

interface DatePickerProps {
  label: string;
  className?: string;
  name: string;
  value: string;
  setValue: (value: string) => void;
}

const DatePicker = ({ label, className = "", name, value, setValue }: DatePickerProps) => {
  const [showDatepicker, setShowDatePicker] = useState(false);
  const [month, setMonth] = useState(10);
  const [year, setYear] = useState(2021);
  const [blankDays, setBlankDays] = useState<number[]>([]);
  const [numberOfDays, setNumberOfDays] = useState<number[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  useClickOutsideCallback(ref, () => {
    setShowDatePicker(false);
  });

  const clickPrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else setMonth(month - 1);
  };
  const clickNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else setMonth(month + 1);
  };

  const isSelectedDay = (date: number) => {
    const lookingDate = moment().year(year).month(month).date(date);
    return value === lookingDate.format("YYYY-MM-DD");
  };

  const selectDate = (date: number) => {
    const selectedDate = moment().year(year).month(month).date(date);
    setValue(selectedDate.format("YYYY-MM-DD"));
    setShowDatePicker(false);
  };

  useEffect(() => {
    const dateObj = moment(value, "YYYY-MM-DD");
    setMonth(dateObj.month());
    setYear(dateObj.year());
  }, [value]);

  useEffect(() => {
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    let dayOfWeek = new Date(year, month).getDay();

    let blankdaysArray: number[] = [];
    for (let i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    let daysArray: number[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    setBlankDays(blankdaysArray);
    setNumberOfDays(daysArray);
  }, [month, year]);

  return (
    <div ref={ref} className={"relative " + className}>
      <label className="block font-normal text-gray-500 dark:text-gray-400 text-sm mt-3 mb-2">{label}</label>
      <Field
        readOnly
        name={name}
        className="mt-1 block w-full bg-white dark:bg-app-dark-5 rounded-md 
        border-gray-300 dark:border-gray-800  font-bold
        focus:border-purple focus:ring-1 focus:ring-purple text-gray-500 dark:text-gray-400"
        type="text"
        onClick={() => setShowDatePicker(true)}
      />
      <ErrorMessage name={name}>{(msg) => <div className=" text-red-500 text-sm mt-3">{msg}</div>}</ErrorMessage>
      {showDatepicker && (
        <div className="bg-white dark:bg-app-dark-3 mt-12 rounded-lg shadow p-4 absolute top-6 left-0 z-10 w-64">
          <div className="flex justify-between items-center mb-2">
            <button
              type="button"
              className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
              onClick={clickPrevMonth}
            >
              <img src={process.env.PUBLIC_URL + "/assets/icon-arrow-left.svg"} alt="icon-arrow-left" className="p-2" />
            </button>
            <div>
              <span className="text-lg font-bold text-gray-800 dark:text-white">
                {MONTH_NAMES[month]} {year}
              </span>
            </div>
            <button
              type="button"
              className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
              onClick={clickNextMonth}
            >
              <img src={process.env.PUBLIC_URL + "/assets/icon-arrow-right.svg"} alt="icon-arrow-right" className="p-2" />
            </button>
          </div>

          <div className="flex flex-wrap -mx-1">
            {blankDays.map((day) => (
              <div style={{ width: "14.26%" }} key={day} className="text-center border p-1 border-transparent text-sm"></div>
            ))}

            {numberOfDays.map((date) => (
              <div style={{ width: "14.26%" }} key={date} className="px-1 mb-1">
                <div
                  className={
                    "cursor-pointer text-center text-md font-bold text-gray-800 dark:text-white rounded-full leading-loose transition ease-in-out duration-100" +
                    (isSelectedDay(date) ? " text-purple-light dark:text-purple-light" : "")
                  }
                  onClick={() => {
                    selectDate(date);
                  }}
                >
                  {date}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
