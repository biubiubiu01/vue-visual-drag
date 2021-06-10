/**
 * 公共图表配置
 * Created by Lzy on 2021/6/8.
 */
import echarts from "echarts";

export default function defaultSetting(config) {
  const { title, grid } = config;
  const legend = getLegend(config);
  const xAxis = getXAxis(config);
  const yAxis = getYAxis(config);
  const dataZoom = getDataZoom(config);
  let series = [];
  if (config.series.type == "bar") {
    series = getBarSeries(config);
  }
  return {
    title,
    legend,
    grid,
    xAxis,
    yAxis,
    dataZoom,
    series,
  };
}

function getLegend(config) {
  const { scroll, ...rest } = config.legend;
  return {
    type: scroll ? "scroll" : "plain",
    ...rest,
  };
}

function getXAxis(config) {
  const { axisLine, axisTick, axisLabel, splitLine } = config.xAxis;
  const { data } = config;
  const { orient } = config.series;
  const { interval, ...rest } = axisLabel;
  return {
    type: orient == "vertical" ? "category" : "value",
    data: orient == "vertical" ? data.map((item) => item.name) : [],
    axisLine,
    axisTick,
    axisLabel: { interval: interval ? 0 : "auto", ...rest },
    splitLine,
  };
}

function getYAxis(config) {
  const { orient } = config.series;
  const { data } = config;
  return {
    type: orient == "vertical" ? "value" : "category",
    data: orient == "vertical" ? [] : data.map((item) => item.name),
    ...config.yAxis,
  };
}

function getDataZoom(config) {
  const { dataZoom } = config;
  if (dataZoom.show) {
    return [
      {
        type: dataZoom.type,
      },
    ];
  }
  return [];
}

function getBarSeries(config) {
  const { series, data } = config;
  const {
    name,
    type,
    orient,
    barWidth,
    barBorderRadius,
    gradual,
    gradualColor,
    color,
  } = series;

  return [
    {
      name,
      type,
      data: data,
      barWidth,
      itemStyle: {
        normal: {
          barBorderRadius: parseInt(barBorderRadius),
          color: gradual
            ? new echarts.graphic.LinearGradient(
                0,
                0,
                orient == "vertical" ? 0 : 1,
                orient == "vertical" ? 1 : 0,
                [
                  {
                    offset: 0,
                    color: gradualColor[0],
                  },
                  {
                    offset: 1,
                    color: gradualColor[1],
                  },
                ]
              )
            : color,
        },
      },
    },
  ];
}
