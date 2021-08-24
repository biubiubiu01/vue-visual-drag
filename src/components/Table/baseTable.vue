<template>
  <Common-table
    v-bind="option"
    :option="option"
    :id="config.series.mode"
  ></Common-table>
</template>

<script>
import CommonTable from "../CommonTable/index.vue";
export default {
  props: {
    config: {
      type: Object,
    },
  },
  components: { CommonTable },
  data() {
    return {
      option: {},
    };
  },
  created() {
    this.getOpiton();
  },

  methods: {
    getOpiton() {
      let data = JSON.parse(this.config.data);
      this.option = {
        tableHead: data.tableHead,
        tableData: data.tableData,
        indexShow: this.config.series.indexShow,
        align: this.config.series.align,
        stripe: this.config.series.stripe,
      };
    },
  },
  watch: {
    config: {
      handler() {
        this.getOpiton();
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../styles/darkTable.scss";
</style>
