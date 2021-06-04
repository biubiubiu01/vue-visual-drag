import { uniqueArr, deepClone } from "@/utils";

describe("Test uniqueArr", () => {
  it("test not is  array", () => {
    expect(uniqueArr("123")).toBe("123");
  });
  it("test array unique", () => {
    expect(uniqueArr([1, 1, 1, 2, 2, 3])).toEqual([1, 2, 3]);
  });
});

describe("Test deepClone", () => {
  it("test params not is Object", () => {
    expect(deepClone(null)).not.toBe(null);
  });

  it("test Array not use deepClone ", () => {
    const arr = [1, 2, 3, 4, 5];
    const arr2 = arr;
    arr2[0] = 99;
    expect(arr).toEqual([99, 2, 3, 4, 5]);
  });

  it("test Array use deepClone ", () => {
    const arr = [1, 2, 3, 4, 5];
    const arr2 = deepClone(arr);
    arr2[0] = 99;
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });

  it("test ArrayObject use deepClone ", () => {
    const arr = [
      {
        name: "张三",
        value: "5",
      },
      {
        name: "李四",
        value: "4",
      },
    ];
    const arr2 = deepClone(arr);
    arr2[0].value = 999;
    expect(arr).toEqual([
      {
        name: "张三",
        value: "5",
      },
      {
        name: "李四",
        value: "4",
      },
    ]);
  });

  it("test Object use deepClone", () => {
    const obj = {
      name: "11",
      count: 456,
    };
    const obj2 = deepClone(obj);
    obj2.name = "777";
    expect(obj).toEqual({
      name: "11",
      count: 456,
    });
  });
});
