export default {
  width: 300,
  height: 300,
  left: 0,
  top: 0,
  series: {
    type: "gauge",
  },
  title: {
    show: true,
    text: "Km/h",
    textStyle: {
      color: "#5171fd",
      fontSize: 18,
    },
    left: "center",
    top: "30%",
  },
  data: [
    {
      name: "值",
      value: 85,
      id: 1,
    },
  ],
};
