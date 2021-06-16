<template>
  <div ref="radarChart"></div>
</template>

<script>
import resize from "@/mixins/resize";
import echarts from "echarts";
import defaultSetting from "@/components/Charts/common";
export default {
  name: "radarChart",
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
      const { keyData, data1, data2, title } = defaultSetting(this.config);
      let maxData = data1.map((item) => {
        return {
          name: item.name,
          value: 100,
        };
      });
      this.myChart = echarts.init(this.$refs.radarChart);
      this.myChart.setOption(
        {
          title,
          color: ["#FF9E8C", "#00D2C9"],
          tooltip: {
            trigger: "item",
          },
          legend: {
            icon: "circle",
            show: true,
            right: "5",
            top: "10",
            itemWidth: 10,
            itemHeight: 11,
            textStyle: {
              color: "#f1f1f1",
            },
            data: keyData,
          },
          radar: {
            center: ["48%", "50%"],
            radius: "60%",
            nameGap: 15,
            startAngle: 90,
            splitNumber: 4,
            name: {
              textStyle: {
                color: "#f1f1f1",
                fontSize: 14,
              },
            },
            shape: "circle",
            splitArea: {
              areaStyle: {
                color: ["transparent"],
              },
            },
            axisLabel: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(63,133,247,0.3)",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(63,133,247,0.3)",
              },
            },
            indicator: maxData,
          },
          series: [
            {
              name: keyData[1],
              type: "radar",
              symbolSize: 0,
              areaStyle: {
                normal: {
                  shadowBlur: 13,
                  shadowColor: "rgba(0,0,0,.2)",
                  shadowOffsetX: 0,
                  shadowOffsetY: 10,
                  opacity: 1,
                },
              },
              itemStyle: {
                normal: {
                  shadowColor: "rgb(58,115,192)",
                  shadowBlur: 15,
                },
              },
              data: [
                {
                  value: data2.map((item) => item.value),
                  name: keyData[1],
                },
              ],
            },
            {
              name: keyData[0],
              type: "radar",
              symbolSize: 0,
              areaStyle: {
                normal: {
                  shadowBlur: 13,
                  shadowColor: "rgba(0,0,0,.2)",
                  shadowOffsetX: 0,
                  shadowOffsetY: 10,
                  opacity: 1,
                },
              },
              itemStyle: {
                normal: {
                  shadowColor: "rgb(58,115,192)",
                  shadowBlur: 15,
                },
              },
              data: [
                {
                  value: data1.map((item) => item.value),
                  name: keyData[0],
                },
              ],
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
