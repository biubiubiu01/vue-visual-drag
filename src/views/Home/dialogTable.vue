<template>
  <el-dialog
    v-bind="$attrs"
    width="720px"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <el-row :gutter="15" style="margin-bottom: 15px">
      <el-button
        type="primary"
        icon="el-icon-circle-plus"
        size="small"
        @click.native="handleAdd"
        :disabled="edit"
        >添加字段</el-button
      >
      <el-button
        type="primary"
        icon="el-icon-upload2"
        size="small"
        :disabled="edit"
        @click.native="uploadExcel"
        >导入Excel</el-button
      >
    </el-row>
    <Common-table
      :tableHead="tableHead"
      :tableData="tableData"
      :stripe="true"
      :indexShow="false"
      :editModel="true"
    >
      <template v-slot:operation="slotData">
        <el-button
          type="primary"
          icon="el-icon-edit"
          circle
          size="mini"
          @click.native="handleEdit(slotData.data)"
          v-show="!edit"
        ></el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          size="mini"
          v-show="!edit"
          @click.native="handleDelete(slotData.data.id)"
        ></el-button>

        <el-button
          size="mini"
          icon="el-icon-close"
          circle
          v-show="edit && slotData.data.show"
          @click.native="handleCancel(slotData.data)"
        ></el-button>
        <el-button
          type="success"
          size="mini"
          icon="el-icon-check"
          circle
          v-show="edit && slotData.data.show"
          @click.native="handleSure(slotData.data)"
        ></el-button>
      </template>
    </Common-table>
  </el-dialog>
</template>

<script>
import CommonTable from "@/components/CommonTable/index";
import { deepClone } from "@/utils/index.js";
export default {
  props: {
    data: {
      type: Array,
    },
  },
  components: { CommonTable },
  data() {
    return {
      tableHead: [
        {
          label: "字段",
          value: "name",
        },
        {
          label: "值",
          value: "value",
        },
        {
          label: "操作",
          slotName: "operation",
        },
      ],
      edit: false,
      currentEdit: {},
    };
  },
  computed: {
    tableData() {
      return deepClone(this.data);
    },
  },
  methods: {
    //修改和取消按钮
    handleEdit(data) {
      this.currentEdit = { ...data };
      this.$set(data, "show", true);
      this.edit = true;
    },

    //确认按钮
    handleSure(data) {
      if (data.name == "" || data.value == "") {
        this.$message.warning("不能为空哦！");
        return;
      }
      this.$set(data, "show", false);
      this.edit = false;

      this.data.forEach((item) => {
        if (item.id == data.id) {
          Object.assign(item, data);
        }
      });

      if (this.currentEdit.name == "" && this.currentEdit.value == "") {
        this.$message.success("新增成功");
      } else {
        this.$message.success("修改成功");
      }
      this.currentEdit = {};
    },

    //取消按钮
    handleCancel(data) {
      if (this.currentEdit.name == "" && this.currentEdit.value == "") {
        let index = this.data.findIndex(
          (item) => item.name == "" && item.value == ""
        );
        this.data.splice(index, 1);
        this.$message.info("已取消新增");
      } else {
        Object.assign(data, this.currentEdit);
        this.$message.info("已取消修改");
      }
      this.$set(data, "show", false);
      this.edit = false;
      this.currentEdit = {};
    },

    handleDelete(id) {
      let index = this.data.findIndex((item) => item.id == id);
      this.data.splice(index, 1);
      this.$message.success("删除成功");
    },

    handleClose() {
      this.$emit("update:visible", false);
    },

    //添加字段
    handleAdd() {
      this.edit = true;
      this.currentEdit = {
        name: "",
        value: "",
        id: "data-" + new Date().getTime(),
      };
      this.data.push({
        ...this.currentEdit,
        show: true,
      });
    },

    //导入excel
    uploadExcel() {
      this.$message.info("功能开发中...");
    },
  },
};
</script>
<style lang="scss" scoped></style>
