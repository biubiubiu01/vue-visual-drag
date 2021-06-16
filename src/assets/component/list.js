import bar from "./config/bar";
import line from "./config/line";
import pie from "./config/pie";
import liquid from "./config/liquid";
import gauge from "./config/gauge";
import word from "./config/word";
import radar from "./config/radar";
import tree from "./config/tree";

export default [
  {
    icon: "echarts",
    children: [
      {
        component: "barChart",
        title: "柱状图",
        img: require("./img/bar.png"),
        config: bar,
      },
      {
        component: "lineChart",
        title: "折线图",
        img: require("./img/line.png"),
        config: line,
      },
      {
        component: "pieChart",
        title: "饼图",
        img: require("./img/pie.png"),
        config: pie,
      },
      {
        component: "liquidChart",
        title: "水球图",
        img: require("./img/liquid.png"),
        config: liquid,
      },
      {
        component: "gaugeChart",
        title: "仪表盘",
        img: require("./img/gauge.png"),
        config: gauge,
      },
      {
        component: "wordChart",
        title: "词云图",
        img: require("./img/word.png"),
        config: word,
      },
      {
        component: "radarChart",
        title: "雷达图",
        img: require("./img/radar.png"),
        config: radar,
      },
      {
        component: "treeChart",
        title: "矩形树图",
        img: require("./img/tree.png"),
        config: tree,
      },
    ],
  },
  {
    icon: "map",
    children: [
      {
        id: "seriesMap",
        title: "分布图",
        img: require("../background/a13.jpg"),
      },
      {
        id: "scatterMap",
        title: "散点图",
        img: require("../background/a13.jpg"),
      },
      {
        id: "hotMap",
        title: "热力图",
        img: require("../background/a13.jpg"),
      },
      {
        id: "lineMap",
        title: "航线图",
        img: require("../background/a13.jpg"),
      },
    ],
  },
  {
    icon: "table",
    children: [
      {
        title: "Table表",
        img: require("../background/a13.jpg"),
      },
      {
        name: "滚动Table",
        img: require("../background/a13.jpg"),
      },
    ],
  },
];
