<template>
  <div
    class="preview"
    :style="{ backgroundImage: 'url(' + background + ')' }"
    ref="preview"
  >
    <div class="all-container"></div>
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
