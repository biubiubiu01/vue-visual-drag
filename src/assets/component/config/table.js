export default {
  width: 400,
  height: 500,
  left: 0,
  top: 0,
  series: {
    type: "table",
    tableHead: [
      {
        label: "日期",
        value: "date",
      },
      {
        label: "支出",
        value: "count",
      },
      {
        label: "较昨日增长",
        value: "scale",
      },
    ],
    data: [
      {
        date: "8.15",
        count: 45,
        scale: 13,
      },
      {
        date: "8.16",
        count: 42,
        scale: 10,
      },
      {
        date: "8.16",
        count: 14,
        scale: 8,
      },
    ],
    align: "center",
    indexShow: true,
    stripe: false,
    mode: "dark",
  },
};
