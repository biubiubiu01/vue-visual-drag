export default {
  width: 300,
  height: 300,
  left: 0,
  top: 0,
  // 标题
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
  //图例
  legend: {
    show: false,
    textStyle: {
      color: "#f1f1f1",
      fontSize: 16,
    },
    left: "",
    top: "",
    icon: "circle",
    orient: "horizontal",
    scroll: false,
  },
  series: {
    name: "",
    type: "pie",
    center: ["48%", "55%"],
    radius: ["35%", "53%"],
    solidRadius: "53%",
    solid: true,
    label: {
      show: true,
      color: "",
      fontSize: 14,
      position: "outside",
    },
    roseType: false,
    smooth: false,
    labelLine: {
      show: true,
      length: 15,
      length2: 10,
    },
  },
  data: [
    {
      name: "Vue",
      value: 75,
      id: 0,
    },
    {
      name: "Echarts",
      value: 85,
      id: 1,
    },
    {
      name: "TypeScript",
      value: 70,
      id: 2,
    },
    {
      name: "Webpack",
      value: 75,
      id: 3,
    },
    {
      name: "Node",
      value: 45,
      id: 4,
    },
    {
      name: "jQuery",
      value: 65,
      id: 5,
    },
  ],
};
