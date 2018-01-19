<template>
  <div class="orderDetail">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="订单号：">
        <el-tag>{{form.act_id}}</el-tag>
      </el-form-item>
      <el-form-item label="活动名称：">
        <el-tag>{{form.act_name}}</el-tag>
      </el-form-item>
      <el-form-item label="活动区域：">
        <el-tag>{{form.act_area}}</el-tag>
      </el-form-item>
      <el-form-item label="即时配送:">
        <el-tag>{{form.immediately}}</el-tag>
      </el-form-item>
      <el-form-item label="活动性质：">
        <el-tag>{{form.act_property}}</el-tag>
      </el-form-item>
      <el-form-item label="特殊资源：">
        <el-tag>{{form.act_resource}}</el-tag>
      </el-form-item>
      <el-form-item label="活动形式：">
        <el-tag>{{form.act_type}}</el-tag>
      </el-form-item>
      <el-form-item label="订单状态：">
        <el-tag>{{form.status}}</el-tag>
      </el-form-item>
    </el-form>
    <el-button type="button" @click="claim" v-show="this.form.act_status == 0">签收</el-button>
    <el-button type="button" @click="execute" v-show="this.form.act_status == 1">办理</el-button>
  </div>
</template>

<script>
export default {
  name: "orderDetail",
  data() {
    return {
      form: {
        act_id: "",
        act_name: "",
        act_area: "",
        act_tim: "",
        act_immediately: "",
        immediately: "",
        act_property: "",
        act_resource: "",
        act_type: "",
        act_status: "",
        status: ""
      }
    };
  },
  created() {
    console.log(this.$route.params.id);
    //初始加载页面时加载订单详情
    this.$http
      .get("/api/order/getDetail?id=" + this.$route.params.id)
      .then(response => {
        if (response.body.errcode == 0) {
          var data = response.body.data;
          console.log(data);

          //判断是否即时配送
          data.act_immediately == 0
            ? (data.immediately = "否")
            : (data.immediately = "是");
          //判断当前状态
          if (data.act_status == 0) {
            data.status = "待签收";
          } else if (data.act_status == 1) {
            data.status = "待办理";
          }else{
            data.status = "已办理";
          }

          this.form = data;
        }
      });
  },
  methods: {
    //签收订单
    claim() {
      this.$confirm("是否签收此订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //签收操作
          this.$http
            .get("/api/order/claim?id=" + this.$route.params.id)
            .then(response => {
              console.log(response);
              if (response.body.errcode == 0) {
                this.$message({
                  type: "success",
                  message: "签收成功!"
                });
                //跳回到列表页
                this.$router.push({ path: "/orderEntry/groupWait" });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消签收"
          });
        });
    },
    //办理订单
    execute() {
      this.$confirm("是否办理此订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //签收操作
          this.$http
            .get("/api/order/execute?id=" + this.$route.params.id)
            .then(response => {
              console.log(response);
              if (response.body.errcode == 0) {
                this.$message({
                  type: "success",
                  message: "办理成功!"
                });
                //跳回到列表页
                this.$router.push({ path: "/orderEntry/groupWait" });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消办理"
          });
        });
    }
  }
};
</script>
<style>
.orderDetail {
  width: 20%;
}
</style>
