import { zeroPad } from "../../utils/zeroPad";

describe("zeroPad function test", () => {
  test('(3, 2) should result in "zeroPad"', () => {
    expect(zeroPad(3, 2)).toBe("03");
  });

  test('(10, 2) should result in "zeroPad"', () => {
    expect(zeroPad(10, 2)).toBe("10");
  });

  test('(5, 1) should result in "zeroPad"', () => {
    expect(zeroPad(5, 1)).toBe("5");
  });
  
  test('(6, 3) should result in "zeroPad"', () => {
    expect(zeroPad(6, 3)).toBe("006");
  });
});
