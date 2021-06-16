<template>
  <div ref="wordChart"></div>
</template>

<script>
import resize from "@/mixins/resize";
import echarts from "echarts";
require("echarts-wordcloud");
import defaultSetting from "@/components/Charts/common";
const colorList = ["#4FD8FF", "#C15FFF", "#FF5F55", "#FFC935", "#767BFB"];

export default {
  name: "wordChart",
  props: {
    config: {
      type: Object,
    },
  },
  mixins: [resize],
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      this.initEchart();
    });
  },
  methods: {
    initEchart() {
      const { data, title } = defaultSetting(this.config);
      this.myChart = echarts.init(this.$refs.wordChart);
      this.myChart.setOption(
        {
          tooltip: {},
          title,
          series: [
            {
              type: "wordCloud",
              sizeRange: [12, 35],
              rotationRange: [0, 0],
              width: "100%",
              shape: "cardioid",
              gridSize: 11,
              top: 0,
              textStyle: {
                normal: {
                  fontFamily: "sans-serif",
                  color: () => {
                    return colorList[
                      Math.floor(Math.random() * colorList.length)
                    ];
                  },
                },
              },
              data: data,
            },
          ],
        },
        true
      );
      this.myChart.off("click");
      this.myChart.on("click", (params) => {
        this.$message.success("点击了" + params.name);
      });
    },
  },
  watch: {
    config: {
      handler() {
        this.initEchart();
      },
      deep: true,
    },
  },
};
</script>
