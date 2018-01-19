<template>
  <div class="orderList">
   <el-table
      :data="tableData"
      style="width: 100%"
      @row-click="orderDetail">
      <el-table-column
        prop="act_id"
        label="订单号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="act_name"
        label="活动名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="act_area"
        label="区域">
      </el-table-column>
      <el-table-column
        prop="act_tim"
        label="活动时间">
      </el-table-column>
      <el-table-column
        prop="immediately"
        label="即时配送">
      </el-table-column>
      <el-table-column
        prop="act_property"
        label="活动性质">
      </el-table-column>
      <el-table-column
        prop="act_resource"
        label="特殊资源">
      </el-table-column>
      <el-table-column
        prop="act_type"
        label="活动形式">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'orderList',
  data () {
    return {
      tableData: []
    }
  },
  created() {
    if(this.$route.params.type=="groupWait"){
      this.getOrderList("groupWait");
    }else if(this.$route.params.type=="personWait"){
      this.getOrderList("personWait");
    }else if(this.$route.params.type=="personFinish"){
      this.getOrderList("personFinish");
    }else if(this.$route.params.type=="allOrder"){
      this.getAllOrder();
    }
  },
  watch: {
    '$route' (to, from) {
      console.log(this.getStatus(this.$route.params))
    }
  },
  methods: {
    getStatus(params){
      if(params.type=="groupWait"){
        this.getOrderList("groupWait");
      }else if(params.type=="personWait"){
        this.getOrderList("personWait");
      }else if(params.type == "personFinish"){
        this.getOrderList("personFinish");
      }else if(params.type == "allOrder"){
        this.getAllOrder();
      }
    },
    //获取订单列表
    getOrderList(listType){
      
      this.$http.get("/api/order/getList?type="+listType).then((response)=>{
        console.log(response)
        if(response.body.errcode == 0){
          // alert("查询列表成功");
          var data = response.body.data;
          for(var i=0; i<data.length;i++){
            data[i].act_immediately == 0?data[i].immediately = "否":data[i].immediately = "是";
          }
          this.tableData = response.body.data;
        }
      })
    },
     //获取所有订单列表
    getAllOrder(){
      this.$http.get("/api/order/getAllOrder").then((response)=>{
        console.log(response)
        if(response.body.errcode == 0){
          // alert("查询列表成功");
          var data = response.body.data;
          for(var i=0; i<data.length;i++){
            data[i].act_immediately == 0?data[i].immediately = "否":data[i].immediately = "是";
          }
          this.tableData = response.body.data;
        }
      })
    },
    //进入订单详情页
    orderDetail(row){
      this.$router.push({path:"/orderDetail/"+row.act_id});
    }
  }
}
</script>
<style>
  .orderList th{
    text-align: center
  }
</style>
