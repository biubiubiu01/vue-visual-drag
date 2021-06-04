import { getDate, getTime, getAroundDay } from "@/utils/date";

describe("Test getDate", () => {
  it("get local date", () => {
    expect(getDate()).toBe("2021-05-19");
  });
});

describe("Test getTime", () => {
  it("get local time", () => {
    expect(getTime().slice(0, 5)).toBe("15:26");
  });
});

describe("Test getAroundDay", () => {
  it("get local aroundDay time", () => {
    expect(getAroundDay(-3)).toBe("2021-05-16");
  });
});
