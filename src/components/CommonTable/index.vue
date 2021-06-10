<template>
  <div class="dataTable" :key="number">
    <el-table
      :data="tableData"
      :stripe="stripe"
      :size="size"
      :border="border"
      :show-header="showHeader"
      :highlight-current-row="highlight"
      :height="tableHeight"
      :key="number"
      @row-click="(item) => $emit('handleRowClick', item)"
      @selection-change="(item) => $emit('handleSelectionChange', item)"
    >
      <el-table-column label="序号" type="index" width="50" v-if="indexShow">
        <template scope="scope">
          <span v-if="pageObj">{{
            (pageObj.currentPage - 1) * pageObj.size + scope.$index + 1
          }}</span>
          <span v-else>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column
        v-if="selectionShow"
        type="selection"
        width="55"
      ></el-table-column>

      <template v-for="item in tableHead">
        <el-table-column
          :key="item.value"
          :align="item.align"
          :sortable="item.sortable"
          :label="item.label"
          :prop="item.value"
          :width="item.width"
          :formatter="item.formatter"
          show-overflow-tooltip
          :min-width="fixWidth(item.label)"
          :fixed="item.fixed"
          v-if="item.slotName"
        >
          <template slot-scope="scope">
            <slot :name="item.slotName" :data="scope.row"></slot>
          </template>
        </el-table-column>

        <el-table-column
          :key="item.value"
          :align="item.align"
          :sortable="item.sortable"
          :label="item.label"
          :prop="item.value"
          :width="item.width"
          :formatter="item.formatter"
          show-overflow-tooltip
          :min-width="fixWidth(item.label)"
          :fixed="item.fixed"
          v-else
        >
          <template scope="scope" v-if="editModel">
            <el-input
              size="small"
              v-model="scope.row[item.value]"
              v-show="scope.row.show"
              placeholder="请输入内容"
            ></el-input>
            <span v-show="!scope.row.show">{{ scope.row[item.value] }}</span>
          </template>
        </el-table-column>
      </template>
      <div slot="empty">
        <Empty />
      </div>
    </el-table>
    <el-pagination
      class="pagination"
      v-if="pageObj"
      background
      layout="total, prev, pager, next"
      :page-size="pageObj.size"
      :total="pageObj.total"
      :current-page="pageObj.currentPage"
      @current-change="pageObj.func"
    >
    </el-pagination>
  </div>
</template>

<script>
import Empty from "../Empty/index";
export default {
  props: {
    //表头
    tableHead: {
      type: Array,
      default: () => {
        return [];
      },
    },
    //数据
    tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    //斑马纹
    stripe: {
      type: Boolean,
      default: false,
    },
    //边框
    border: {
      type: Boolean,
      default: false,
    },
    //大小
    size: {
      type: String,
      default: "",
    },
    //是否显示表头
    showHeader: {
      type: Boolean,
      default: true,
    },
    //选中高亮
    highlight: {
      type: Boolean,
      default: false,
    },
    //高度
    height: {
      type: String,
      default: "100%",
    },
    //分页
    pageObj: {
      type: Object | null | undefined,
    },
    //是否显示序号
    indexShow: {
      type: Boolean,
      default: true,
    },
    //是否显示多选框
    selectionShow: {
      type: Boolean,
      default: false,
    },
    editModel: {
      type: Boolean,
      default: false,
    },
  },
  components: { Empty },
  data() {
    return {
      number: Math.random() * 1000,
    };
  },
  computed: {
    tableHeight() {
      if (this.pageObj) {
        return `calc(${this.height} - 40px)`;
      }
      return this.height;
    },
  },
  methods: {
    fixWidth(val) {
      let length = 0;
      if (val.indexOf("(") != -1) {
        length = val.length * 16 + 10;
      } else {
        length = val.length * 20 + 10;
      }
      if (length < 80) {
        length = 80;
      }
      return length;
    },
  },
  watch: {
    tableData: {
      handler() {
        this.number = Math.random() * 1000;
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.dataTable {
  width: 100%;
  height: 100%;
  position: relative;
  .pagination {
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-top: 10px;
  }
  ::v-deep {
    .el-table::before {
      height: 0 !important;
    }
  }
}
</style>
