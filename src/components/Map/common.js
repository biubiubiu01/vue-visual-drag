export default function defaultSetting(config) {
  let option = [];
  switch (config.series.type) {
    case "seriesMap":
      option = getSeriesOption(config);
      break;
    case "scatterMap":
      option = getScatterOption(config);
      break;
    default:
      break;
  }
  return option;
}

function getTile(config) {
  return config.title;
}

function getSeriesMap(series) {
  return {
    label: {
      normal: {
        show: series.label.show,
        color: series.label.color, //省份标签字体颜色
        fontSize: series.label.fontSize,
        formatter: (p) => {
          switch (p.name) {
            case "内蒙古自治区":
              p.name = "内蒙古";
              break;
            case "西藏自治区":
              p.name = "西藏";
              break;
            case "新疆维吾尔自治区":
              p.name = "新疆";
              break;
            case "宁夏回族自治区":
              p.name = "宁夏";
              break;
            case "广西壮族自治区":
              p.name = "广西";
              break;
            case "香港特别行政区":
              p.name = "香港";
              break;
            case "澳门特别行政区":
              p.name = "澳门";
              break;
            default:
              break;
          }
          return p.name;
        },
      },
      emphasis: {
        show: true,
        color: "#f75a00",
        fontSize: 14,
      },
    },
  };
}

function getSeriesOption(config) {
  const { data } = config;
  const title = getTile(config);
  const series = getSeriesMap(config.series);
  return {
    data,
    title,
    series,
  };
}

function getScatterOption(config) {
  const title = getTile(config);
  return {
    title,
  };
}
