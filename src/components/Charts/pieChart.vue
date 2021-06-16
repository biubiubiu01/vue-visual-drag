<template>
  <div ref="pieChart"></div>
</template>

<script>
import resize from "@/mixins/resize";
import echarts from "echarts";
import defaultSetting from "@/components/Charts/common";

const colorList = [
  "#4FD8FF",
  "#C15FFF",
  "#FF5F55",
  "#FFC935",
  "#767BFB",
  "rgb(248,70,102)",
];
export default {
  name: "pieChart",
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
      const { title, legend, series } = defaultSetting(this.config);
      this.myChart = echarts.init(this.$refs.pieChart);
      this.myChart.setOption(
        {
          color: colorList,
          tooltip: {
            trigger: "item",
            formatter: (params) => {
              return (
                params.marker +
                " " +
                params.name +
                "：" +
                params.value +
                " (" +
                params.percent +
                "%)"
              );
            },
          },
          title,
          legend,
          series,
        },
        true
      );
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
