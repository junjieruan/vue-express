<template>
  <div class="mainPage">
    <el-container>
      <el-header class="header">资源预订平台<i class="el-icon-error" @click="logOut"></i></el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title" @click="sendBooking">发起预订</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单列表</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1" @click="groupWait">本组待办</el-menu-item>
                <el-menu-item index="2-2" @click="personWait">我的待办</el-menu-item>
                <el-menu-item index="2-3" @click="personFinish">我的已办</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <span slot="title" @click="allOrder">查看全部</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
                <router-view/>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "mainPage",
  data() {
    return {
      msg: "Welcome to Your Vue.js App6666ee"
    };
  },
  methods: {
    //发起预订
    sendBooking() {
      this.$router.push({ path: "/sendBooking" });
    },
    //订单列表-本组待办
    groupWait() {
      this.$router.push({ path: "/orderEntry/groupWait" });
    },
    //订单列表-我的待办
    personWait() {
      this.$router.push({ path: "/orderEntry/personWait" });
    },
    //订单列表-我的已办
    personFinish() {
      this.$router.push({ path: "/orderEntry/personFinish" });
    },
    //订单列表-查看全部订单
    allOrder() {
      this.$router.push({ path: "/orderEntry/allOrder" });
    },
    //注销
    logOut() {
      this.$confirm("是否注销?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
                this.$message({
                  type: "success",
                  message: "注销成功!"
                });
                //跳回到登录页
                this.$router.push({ path: "/" });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消注销操作"
          });
        });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style>
.mainPage .header {
  background-color: #409eff;
  color: #ffffff;
  line-height: 60px;
}

.mainPage .header i {
  float: right;
  line-height: 60px;
}
</style>
