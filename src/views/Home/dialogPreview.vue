<template>
  <div
    class="preview"
    :style="{ backgroundImage: 'url(' + background + ')' }"
    ref="preview"
  >
    <svg-icon
      icon="return"
      class="returnIcon pointer"
      :size="26"
      @click.native="$emit('close')"
    ></svg-icon>

    <component
      v-for="item in list"
      :key="item.id"
      :is="item.component"
      :config="item.config"
      :style="getStyle(item.config)"
      class="absolute"
    ></component>
  </div>
</template>

<script>
import {
  barChart,
  lineChart,
  pieChart,
  liquidChart,
  gaugeChart,
  wordChart,
  radarChart,
  treeChart,
} from "@/components/Charts";
import { scatterMap, seriesMap } from "@/components/Map";
import DateComponent from "@/components/Date";
import html2canvas from "html2canvas";
import NumberComponent from "@/components/Number";
import BaseTable from "@/components/Table/baseTable";

export default {
  props: {
    list: {
      type: Array,
    },
    background: {
      type: String,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
  },
  components: {
    barChart,
    lineChart,
    pieChart,
    liquidChart,
    gaugeChart,
    wordChart,
    radarChart,
    treeChart,
    scatterMap,
    seriesMap,
    NumberComponent,
    DateComponent,
    BaseTable,
  },
  data() {
    return {};
  },

  methods: {
    getStyle(config) {
      const preWidth = window.innerWidth;
      const preHeight = window.innerHeight;
      return {
        left: (config.left / this.width) * preWidth + "px",
        top: (config.top / this.height) * preHeight + "px",
        width: (config.width / this.width) * preWidth + "px",
        height: (config.height / this.height) * preHeight + "px",
      };
    },
    exportImg() {
      const boxDom = this.$refs.preview;
      html2canvas(boxDom).then((res) => {
        var dataUrl = res.toDataURL("image/jpeg", 1.0);
        var a = document.createElement("a");
        a.href = dataUrl;
        a.download = `img_${new Date().getTime()}.png`;
        a.click();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.preview {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 99999;
  .returnIcon {
    position: absolute;
    right: 35px;
    top: 45px;
  }
}
</style>
