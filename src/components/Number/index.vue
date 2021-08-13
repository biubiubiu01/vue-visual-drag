<template>
  <countTo
    :startVal="config.series.start"
    :endVal="parseFloat(config.series.end)"
    :duration="parseInt(config.series.duration)"
    :decimals="parseInt(config.series.decimals)"
    :prefix="config.series.prefix"
    :suffix="config.series.suffix"
    :style="{
      color: config.series.color,
      fontSize: config.series.fontSize + 'px',
    }"
    :key="number"
    class="number"
  ></countTo>
</template>

<script>
import countTo from "vue-count-to";
export default {
  props: {
    config: {
      type: Object,
    },
  },
  components: { countTo },
  data() {
    return {
      number: Math.random() * 1000000,
    };
  },
  watch: {
    config: {
      handler(nl) {
        console.log(nl);
        this.number = Math.random() * 1000000;
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.number {
  font-family: "Time Number";
  font-weight: bold;
}
</style>
