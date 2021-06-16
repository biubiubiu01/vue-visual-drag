<template>
  <div ref="treeChart"></div>
</template>

<script>
import resize from "@/mixins/resize";
import echarts from "echarts";
import defaultSetting from "@/components/Charts/common";
export default {
  name: "treeChart",
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
      const { title, data } = defaultSetting(this.config);
      this.myChart = echarts.init(this.$refs.treeChart);
      this.myChart.setOption(
        {
          title,
          color: [
            "#6FFFFF",
            "#FF9244",
            "#7155B7",
            "#0FE7E7",
            "#48C7F2",
            "#4490FF",
          ],
          tooltip: {},
          series: [
            {
              name: "矩形树图",
              type: "treemap",
              roam: false,
              label: {
                show: true,
                formatter: "{b}",
                fontSize: 14,
              },
              nodeClick: false,
              breadcrumb: {
                show: false,
              },
              itemStyle: {
                normal: {
                  show: true,
                  textStyle: {
                    color: "#666",
                    fontSize: 14,
                  },
                  borderWidth: 0,
                },
                emphasis: {
                  label: {
                    show: true,
                  },
                },
              },
              data: data,
            },
          ],
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
