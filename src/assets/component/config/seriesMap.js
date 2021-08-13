export default {
  width: 600,
  height: 600,
  left: 0,
  top: 0,
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
  series: {
    type: "seriesMap",
    label: {
      show: true,
      color: "#f1f1f1",
      fontSize: 14,
    },
  },
  data: [
    {
      name: "上海市",
      value: 75,
      id: 0,
    },
    {
      name: "湖北省",
      value: 60,
      id: 1,
    },
    {
      name: "浙江省",
      value: 40,
      id: 2,
    },
    {
      name: "江苏省",
      value: 150,
      id: 3,
    },
  ],
};
