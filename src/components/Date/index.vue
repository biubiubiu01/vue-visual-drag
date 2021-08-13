<template>
  <div
    class="time"
    :style="{
      color: config.series.color,
      fontSize: config.series.fontSize + 'px',
    }"
  >
    {{ date }} {{ time }}
  </div>
</template>

<script>
import { getDate, getTime } from "@/utils/date.js";
export default {
  props: {
    config: {
      type: Object,
    },
  },
  data() {
    return {
      date: getDate(),
      time: getTime(),
    };
  },
  created() {
    setInterval(() => {
      this.getFullTime();
    }, 1000);
  },
  mounted() {},
  methods: {
    getFullTime() {
      this.date = getDate();
      this.time = getTime();
    },
  },
};
</script>
<style lang="scss" scoped>
.time {
  font-family: "Time Number";
  font-weight: bold;
}
</style>
