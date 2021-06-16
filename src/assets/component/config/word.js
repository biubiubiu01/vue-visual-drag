export default {
  width: 300,
  height: 300,
  left: 0,
  top: 0,
  series: {
    type: "word",
  },
  title: {
    show: false,
    text: "",
    textStyle: {
      color: "#f1f1f1",
      fontSize: 16,
    },
    left: "",
    top: "",
  },
  data: [
    {
      name: "热干面",
      value: Math.random(0.1, 1) * 70,
    },
    {
      name: "生煎包",
      value: Math.random(0.1, 1) * 70,
    },
    {
      name: "可乐鸡翅",
      value: Math.random(0.1, 1) * 70,
    },
    {
      name: "麻辣烫",
      value: Math.random(0.1, 1) * 70,
    },
    {
      name: "过桥米线",
      value: Math.random(0.1, 1) * 70,
    },
    {
      name: "大盘鸡",
      value: Math.random(0.1, 1) * 70,
    },
    {
      name: "鸡公煲",
      value: Math.random(0.1, 1) * 70,
    },
  ],
};
