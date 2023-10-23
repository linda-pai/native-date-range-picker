import { useState } from "react";
import PropTypes from "prop-types";
import { getDateISO } from "../utils/calendar";
import Calendar from "./Calendar";
import { ReactComponent as CalendarIcon } from "../images/calendar-svgrepo-com.svg";
//Cross Months
function DateRangePicker(props: { onDateChanged: any }) {
  const [dateState, setDateState] = useState(null as any);
  const [calendarOpen, setCalendarOpen] = useState(false);


  const handleDateChange = (date: Date) => {
    const newDate = date ? getDateISO(date) : null;
    if (dateState !== newDate) {
      setDateState(newDate);
      props.onDateChanged(dateState);
    }
  };

  const toggleCalendar = () => {
    setCalendarOpen(!calendarOpen);
  };

  return (
    <>
      <div className="cursor-pointer" onClick={toggleCalendar}>
        <CalendarIcon
          className="w-20 mb-4"
        />
         {!calendarOpen && (<div className="animate-bounce text-sm">點我選日期</div>)}
      </div>
      <div className={`w-[350px] h-[240px] text-[16px] transition-all duration-500 ease ${calendarOpen ? "max-h-[240px] overflow-visible" :"max-h-0 overflow-hidden"}`}>
          <Calendar
            onDateChanged={handleDateChange}
            // defaultDate={new Date("2023-10-10")}
          />
      </div>
    </>
  );
}

export default DateRangePicker;

DateRangePicker.propTypes = {
  value: PropTypes.string,
  onDateChanged: PropTypes.func,
};
