<template>
  <div class="hello">
    <img src=".././assets/logo.png">
    <h1>{{ msg }}</h1>
    <el-form :model="submit" status-icon label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名">
        <el-input type="text" v-model="submit.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="submit.password" auto-complete="off"></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary"  @click="addUser">注册</el-button>
      </el-form-item>
    </el-form>
   

    <el-form :model="login" status-icon label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名">
        <el-input type="text" v-model="login.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="login.password" auto-complete="off"></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary"  @click="userLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      submit:{
        username:'',
        password:'',
      },
      login:{
        username:'',
        password:'',
      }
    }
  },
  methods: {
    //注册
    addUser() {
      var name = this.submit.username;
      var password = this.submit.password;
      this.$http.post('/api/user/addUser', {
        username: name,
        password: password
      },{}).then((response) => {
        console.log(response);
      })
    },
    //登陆
    userLogin(){
      var name = this.login.username;
      var password = this.login.password;
      this.$http.get('/api/user/userLogin?username='+name+'&password='+password).then((response) => {
        console.log(response);
        if(response.body.errcode == 0){
          alert("登录成功");
          this.$router.push({path:'/index'});
        }else{
          alert("登录失败")
        }
      })
    }
  }
}
</script>
<style>
  .hello form.demo-ruleForm{
    width: 20%;
    position: relative;
    left: 40%;
  }
</style>
