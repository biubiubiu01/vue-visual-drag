<template>
  <div class="relative">
    <div class="return" v-if="parentInfo.length > 1" @click="handleReturn">
      返回
    </div>
    <div class="chart-wrapper" ref="seriesMap"></div>
  </div>
</template>

<script>
import resize from "@/mixins/resize";
import echarts from "echarts";
import { getGeoJson } from "@/utils/index";
import defaultSetting from "@/components/Map/common";
import { deepClone } from "@/utils/index";
export default {
  name: "seriesMap",
  props: {
    config: {
      type: Object,
    },
  },
  mixins: [resize],
  data() {
    return {
      geoJson: {},
      parentInfo: [
        {
          cityName: "全国",
          code: 100000,
        },
      ],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getMapJson();
    });
  },
  methods: {
    //获取geoJson 地图   已封装好直接传citycode就行
    getMapJson() {
      getGeoJson(this.parentInfo[this.parentInfo.length - 1].code).then(
        (data) => {
          this.geoJson = data;
          this.initEchart();
        }
      );
    },
    initEchart() {
      const { title, data, series } = defaultSetting(this.config);
      this.myChart = echarts.init(this.$refs.seriesMap);
      //设置为 china 则显示南海诸岛 ，不需要可以去掉
      echarts.registerMap(
        this.parentInfo.length === 1 ? "china" : "map",
        this.geoJson
      ); //注册
      let max = 0,
        min = 0;
      console.log(data);
      if (data.length > 0) {
        const mapData = deepClone(data).sort((a, b) => {
          return b.value - a.value;
        });
        max = mapData[0].value;
        min = mapData[mapData.length - 1].value;
      }

      this.myChart.setOption(
        {
          title,
          tooltip: {},
          visualMap: {
            show: data.length > 0,
            min: min,
            max: max,
            left: "3%",
            bottom: "2%",
            calculable: true,
            inRange: {
              color: ["#24CFF4", "#2E98CA", "#1E62AC"],
            },
            textStyle: {
              color: "#24CFF4",
            },
          },
          series: [
            {
              name: "地图",
              type: "map",
              map: this.parentInfo.length === 1 ? "china" : "map",
              roam: false, //是否可缩放
              zoom: 1.22, //缩放比例
              data: data,
              label: series.label,
              itemStyle: {
                normal: {
                  areaColor: "#24CFF4",
                  borderColor: "#53D9FF",
                  borderWidth: 1.3,
                  shadowBlur: 15,
                  shadowColor: "rgb(58,115,192)",
                  shadowOffsetX: 7,
                  shadowOffsetY: 6,
                },
                emphasis: {
                  areaColor: "#8dd7fc",
                  borderWidth: 1.6,
                  shadowBlur: 25,
                },
              },
            },
          ],
        },
        true
      );

      this.myChart.off("click");
      this.myChart.on("click", (params) => {
        if (this.geoJson.features.length <= 1) return;
        const name = params.name;
        let code = "";
        this.geoJson.features.forEach((item) => {
          if (item.properties.name == name) {
            code = item.properties.adcode;
          }
        });
        if (!code) return;
        this.parentInfo.push({
          cityName: name,
          code: code,
        });
        this.getMapJson();
      });
    },

    handleReturn() {
      if (this.parentInfo.length === 1) {
        return;
      }
      this.parentInfo.pop();
      this.getMapJson();
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
<style lang="scss" scoped>
.return {
  position: absolute;
  left: 25px;
  top: 25px;
  color: rgb(179, 239, 255);
  font-size: 16px;
  cursor: pointer;
  z-index: 100;
}
</style>
