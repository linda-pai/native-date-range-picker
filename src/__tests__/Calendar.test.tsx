import { render } from "@testing-library/react";
import Calendar from "../components/Calendar";
import "@testing-library/jest-dom";

test("default month is current month", () => {
  const { container } = render(
    <Calendar
      onDateChanged={function (date: Date): void {
        throw new Error("Function not implemented.");
      }}
    />
  );

  const currentMonth = new Date().getMonth() + 1 + "月";
  expect(container).toHaveTextContent(currentMonth);
});
