import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import calendar, {
  isDate,
  isSameDay,
  isSameMonth,
  getDateISO,
  getNextMonth,
  getPreviousMonth,
  CALENDAR_MONTHS,
} from "../utils/calendar";

interface CalendarProps {
  onDateChanged: (date: Date) => void;
  defaultDate?: Date;
}

function Calendar({ defaultDate, onDateChanged }: CalendarProps) {
  const [dateState, setDateState] = useState({
    from: null,
    to: null,
    value: [],
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  } as {
    from: Date | null;
    to: Date | null;
    month: number;
    year: number;
  });

  useEffect(() => {
    defaultDate && addDateToState(defaultDate);
  }, []);

  const gotoDate = (date: Date) => (evt: { preventDefault: () => any }) => {
    evt && evt.preventDefault();
    const { from, to } = dateState;

    if (from && to) {
      setDateState({
        from: date,
        to: null,
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      });
    } else if (from) {
      if (date < from) {
        setDateState({
          from: date,
          to: null,
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        });
      } else {
        setDateState({
          from,
          to: date,
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        });
      }
    } else {
      setDateState({
        from: date,
        to: null,
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      });
    }

  };

  const gotoPreviousMonth = () => {
    const { month, year } = dateState;
    const previousMonth = getPreviousMonth(month, year);
    setDateState(prev => ({
      ...prev,
      month: previousMonth.month,
      year: previousMonth.year,
      }));  
  };
  const gotoNextMonth = () => {
    const { month, year } = dateState;
    const nextMonth = getNextMonth(month, year);
    setDateState(prev => ({
      ...prev,
      month: nextMonth.month,
      year: nextMonth.year,
      }));  
  };

  const addDateToState = (date: Date) => {
    const isDateObject = isDate(date);
    const _date = isDateObject ? date : new Date();
    setDateState({
      from: _date,
      to: _date,
      month: +_date.getMonth() + 1,
      year: _date.getFullYear(),
    });
  };
  const getCalendarDates = () => {
    const { month, year } = dateState;

    const calendarMonth = month || new Date()?.getMonth() + 1;
    const calendarYear = year || new Date()?.getFullYear();
    return calendar(calendarMonth, calendarYear);
  };

  // Render 月份和年份
  const renderMonthAndYear = () => {
    const { month, year } = dateState;
    const monthname =
      Object.keys(CALENDAR_MONTHS)[Math.max(0, Math.min(month - 1, 11))];
    return (
      <div className="month-and-year flex justify-between h-[44px] mb-[16px]">
        <button
          onMouseDown={gotoPreviousMonth}
          title="Previous Month"
          className="w-[44px] bg-white hover:bg-[#e6e6e6] text-gray-700"
        >
          &lt;
        </button>
        <div className="flex flex-col justify-center">
          {year}年{monthname}月
        </div>
        <button
          onMouseDown={gotoNextMonth}
          title="Next Month"
          className="w-[44px] bg-white hover:bg-[#e6e6e6] font-medium text-gray-700"
        >
          &gt;
        </button>
      </div>
    );
  };

  // Render 日期
  const renderCalendarDate = (date: any, index: number) => {
    const { month, year } = dateState;
    const _date = new Date(date.join("-"));
    // Check if calendar date is same day as today
    const today = new Date();
    const isToday = isSameDay(_date, today);
    // Check if calendar date is same day as currently selected date
    const isFrom = dateState.from && isSameDay(_date, dateState.from);
    const isTo = dateState.to && isSameDay(_date, dateState.to);
    const isBetween =
      dateState.from &&
      dateState.to &&
      _date > dateState.from &&
      _date < dateState.to;

    const isCurrentMonth =
      month && year && isSameMonth(_date, new Date([year, month, 1].join("-")));

    const onClick = gotoDate(_date);
    const props = { index, onClick, title: _date.toDateString() };

    const DateStyle = isCurrentMonth
      ? isBetween
        ? "bg-blue-200"
        : isFrom || isTo
        ? "bg-[#006edc] text-white"
        : isToday
        ? "bg-[#ffff76]"
        : ""
      : isBetween
      ? "bg-blue-500 opacity-20"
      : "text-[#757575]";

    return (
      <div
        className={
          DateStyle +
          " w-[50px] h-[36px] flex items-center justify-center text-sm cursor-pointer hover:bg-[#e6e6e6]"
        }
        key={getDateISO(_date)}
        {...props}
      >
        {_date.getDate()}日
      </div>
    );
  };

  return (
    <div>
      {renderMonthAndYear()}
      <div>
        <div className="grid grid-cols-7 gap-2 text-end">
          {getCalendarDates().map(renderCalendarDate)}
        </div>
        <div className="text-xs text-slate-400 my-5">
          所選日期區間：
          {dateState.from && getDateISO(dateState.from)} -{" "}
          {dateState.to && getDateISO(dateState.to)}
        </div>
      </div>
    </div>
  );
}

export default Calendar;

Calendar.propTypes = {
  defaultDate: PropTypes.instanceOf(Date),
  onDateChanged: PropTypes.func,
};
