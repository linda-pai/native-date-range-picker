// Pads a string value with leading zeroes(0) until length is reached
// ex: zeroPad(5, 2) => "05"
export const zeroPad = (value: number, length: number) => {
    return `${value}`.padStart(length, "0");
  };