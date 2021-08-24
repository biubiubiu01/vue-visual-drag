export default {
  width: 400,
  height: 230,
  left: 0,
  top: 0,
  series: {
    type: "table",
    align: "center",
    indexShow: true,
    stripe: false,
    mode: "dark",
  },
  data: `{
    "tableHead":[
      {"label":"日期", "value":"date" },
      {"label":"支出", "value":"count" },
      {"label":"较昨日增长", "value":"scale" }
    ],
    "tableData":[
      {"date":"8月15日","count":"45","scale":"+15%"},
      {"date":"8月16日","count":"30","scale":"-16%"},
      {"date":"8月17日","count":"20","scale":"+4%"}
    ]
  }`,
};
