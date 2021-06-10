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
        <svg-icon
          icon="clear"
          :size="18"
          class="svgSpace pointer white"
          @click.native="drawingList = []"
        />
      </el-tooltip>
      <el-tooltip effect="dark" content="生成项目" placement="bottom-start">
        <svg-icon icon="export" :size="18" class="svgSpace pointer white" />
      </el-tooltip>

      <el-tooltip effect="dark" content="导出图片" placement="bottom-start">
        <svg-icon icon="exportImg" :size="18" class="svgSpace pointer white" />
      </el-tooltip>

      <el-tooltip effect="dark" content="数据来源" placement="bottom-start">
        <svg-icon
          icon="data"
          :size="18"
          class="svgSpace pointer white"
          @click.native="openDialog"
        />
      </el-tooltip>
    </el-row>
    <div class="main-container flex">
      <div class="left flex">
        <div class="left-list">
          <div
            v-for="item in leftList"
            :key="item"
            class="left-item pointer"
            @click="currentIcon = item"
            :class="{ active: currentIcon == item }"
          >
            <svg-icon :icon="item" :size="20"></svg-icon>
          </div>
        </div>
        <el-scrollbar
          style="width: 256px; height: 100%"
          class="component-list scrollbar-wrapper"
        >
          <draggable
            :group="{ name: 'componentDrag', pull: 'clone' }"
            :sort="false"
            animation="300"
            draggable=".components-item"
            @end="handleEnd"
            v-model="comList"
            :clone="cloneComponent"
          >
            <div
              v-for="item in comList"
              :key="item.id"
              style="padding: 10px 16px"
              class="boxder-box relative components-item"
            >
              <p class="text-center title">{{ item.title }}</p>
              <img :src="item.img" class="components-img" alt="" />
            </div>
          </draggable>
        </el-scrollbar>
      </div>
      <div
        class="center flex-sub relative"
        :style="{ backgroundImage: 'url(' + background + ')' }"
      >
        <draggable
          group="componentDrag"
          animation="340"
          v-model="drawingList"
          ghostClass="ghost"
        >
          <vue-drag-resize
            v-for="(item, index) in drawingList"
            :key="index"
            :x="parseFloat(item.config.left || 0)"
            :y="parseFloat(item.config.top || 0)"
            :w="parseFloat(item.config.width || 300)"
            :h="parseFloat(item.config.height || 300)"
            @resizestop="(e) => handleResizeStop(e, item)"
            @clicked="handleComponentClick(item)"
            @dragstop="(e) => handleDragStop(e, item)"
          >
            <component
              :is="item.component"
              class="chart-wrapper"
              :ref="item.id"
              :config="item.config"
            ></component>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              class="del-button"
              v-show="currentDel == item.id"
              @click="removeComponent(item.id)"
            ></el-button>
          </vue-drag-resize>
        </draggable>
      </div>
      <right-setting
        v-if="currentDel"
        :config="currentConfig"
        @changeSize="changeSize"
      >
      </right-setting>
    </div>

    <dialog-table
      :visible.sync="dialogTableShow"
      title="数据来源"
      :data="currentConfig.data"
      v-if="currentDel"
    >
    </dialog-table>
  </div>
</template>

<script>
import componentList from "@/assets/component/list";
import draggable from "vuedraggable";
import vueDragResize from "vue-drag-resize";
import { deepClone } from "@/utils/index.js";
import { barChart } from "@/components/Charts";
import rightSetting from "./rightSetting.vue";
import dialogTable from "./dialogTable";
export default {
  name: "Home",
  components: { draggable, vueDragResize, barChart, rightSetting, dialogTable },
  data() {
    return {
      currentIcon: "echarts",
      //当前拖拽的盒子
      currentMove: "",
      //画布盒子list
      drawingList: [],
      //当前显示的delete按钮
      currentDel: null,
      //当前配置项
      currentConfig: {},
      //数据来源dialog
      dialogTableShow: false,
    };
  },
  computed: {
    background() {
      return this.$store.state.background;
    },
    leftList() {
      return componentList.map((item) => item.icon);
    },
    comList() {
      let index = this.leftList.indexOf(this.currentIcon);
      if (index !== -1) {
        return componentList[index].children;
      }
      return [];
    },
  },
  methods: {
    //盒子移动到指定盒子
    handleEnd(e) {
      let { component, id, config } = this.currentMove;
      config.left = e.originalEvent.offsetX;
      config.top = e.originalEvent.offsetY;
      this.drawingList.push({
        component,
        id,
        config: deepClone(config),
      });
    },

    //克隆盒子
    cloneComponent(e) {
      this.currentMove = {
        id: "box_" + new Date().getTime(),
        ...e,
      };
    },

    //盒子自适应
    handleResizeStop(e, val) {
      this.$nextTick(() => {
        Object.assign(this.currentConfig, {
          width: e.width,
          height: e.height,
        });
        val.config.width = e.width;
        val.config.height = e.height;
        this.$refs[val.id][0].myChart.resize();
      });
    },

    handleDragStop(e, val) {
      Object.assign(this.currentConfig, {
        left: e.left,
        top: e.top,
      });
      val.config.left = e.left;
      val.config.top = e.top;
    },

    //删除当前图
    removeComponent(id) {
      this.drawingList = this.drawingList.filter((item) => item.id != id);
      this.currentDel = null;
      this.currentConfig = {};
    },

    //点击选中当前拖拽的组件
    handleComponentClick(item) {
      if (item.id == this.currentDel) return;
      this.currentDel = item.id;
      this.currentConfig = {
        id: item.id,
        ...item.config,
      };
    },

    //修改setting
    changeSize(key, value) {
      this.drawingList.forEach((item) => {
        if (item.id == this.currentDel) {
          item.config[key] = value;
        }
      });
    },

    openDialog() {
      if (this.currentDel) {
        this.dialogTableShow = true;
      } else {
        this.$message.warning("请先选中一个图形!");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.page-container {
  background: #121212;
  width: 100%;
  height: 100%;
  overflow: hidden;
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
        .left-item {
          width: 100%;
          height: 48px;
          line-height: 55px;
          text-align: center;
          position: relative;
          &:hover {
            background: rgba(111, 111, 245, 0.2);
          }
          &.active {
            background: rgba(111, 111, 245, 0.2);
          }
          &.active::before {
            content: "";
            width: 4px;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            background: linear-gradient(90deg, #5171fd, #c97afd);
          }
        }
      }
      .component-list {
        background: #1b1b20;

        .title {
          height: 42px;
          line-height: 40px;
          color: #fff;
          background: linear-gradient(#000, rgba(0, 0, 0, 0.2));
          position: absolute;
          top: 0;
          left: 16px;
          right: 16px;
        }
        .components-img {
          width: 100%;
          height: auto;
          border-radius: 4px;
          cursor: move;
        }
      }
    }
    .center {
      background-position: 50%;
      background-repeat: no-repeat;
      background-size: cover;

      .drag-box {
        width: 100%;
        height: 100%;
      }
      .del-button {
        position: absolute;
        right: 0;
        top: 0;
      }
      .ghost {
        opacity: 0;
      }
    }
  }
}
</style>
