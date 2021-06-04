<template>
  <div class="page-container relative">
    <el-row
      class="header-container"
      type="flex"
      justify="center"
      align="middle"
    >
      <el-tooltip effect="dark" content="预览" placement="bottom-start">
        <svg-icon icon="preview" :size="18" class="svgSpace pointer white" />
      </el-tooltip>

      <el-tooltip effect="dark" content="清除" placement="bottom-start">
        <svg-icon icon="clear" :size="18" class="svgSpace pointer white" />
      </el-tooltip>
      <el-tooltip effect="dark" content="生成项目" placement="bottom-start">
        <svg-icon icon="export" :size="18" class="svgSpace pointer white" />
      </el-tooltip>

      <el-tooltip effect="dark" content="导出图片" placement="bottom-start">
        <svg-icon icon="exportImg" :size="18" class="svgSpace pointer white" />
      </el-tooltip>
    </el-row>
    <div class="main-container flex">
      <div class="left flex">
        <div class="left-list">
          <div v-for="item in leftList" :key="item.icon">222</div>
        </div>
        <div class="component-list">
          <div v-for="item in componentList" :key="item.id">1111</div>
        </div>
      </div>
      <div
        class="center flex-sub"
        :style="{ backgroundImage: 'url(' + background + ')' }"
      ></div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
import leftList from "@/assets/component/list";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      currentIcon: "echarts",
    };
  },
  computed: {
    background() {
      return this.$store.state.background;
    },
    leftList() {
      return leftList;
    },
    componentList() {
      let index = this.leftList.findIndex(
        (item) => item.icon == this.currentIcon
      );
      return this.leftList[index].children;
    },
  },
};
</script>
<style lang="scss" scoped>
.page-container {
  background: rgb(20, 20, 20);
  width: 100%;
  height: 100%;
  .header-container {
    height: 42px;
    line-height: 40px;
    position: relative;
    background: #1b1b20;
    border-bottom: 2px solid #000;
    .svgSpace {
      margin-left: 25px;
    }
  }
  .main-container {
    width: 100%;
    height: calc(100% - 44px);
    position: relative;
    .left {
      height: 100%;
      .left-list {
        width: 48px;
        height: 100%;
      }
      .component-list {
        box-sizing: border-box;
        width: 256px;
        padding: 16px;
        height: 100%;
        background: rgb(27, 27, 32);
      }
    }
    .center {
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .right {
      width: 340px;
      height: 100%;
    }
  }
}
</style>
