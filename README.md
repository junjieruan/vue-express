# project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## 安装配置mysql：

``` bash
# 将mysql安装包解压缩,在bin目录下执行
mysqld -install

# 参考：https://www.cnblogs.com/dichters/p/5929209.html
# 若已在其他安装包中安装过，需要先删除mysql，执行sc query mysql查看名为mysql的服务，执行sc delete mysql删除
sc query mysql
sc delete mysql

# 目录中的data和my.ini先删除，执行mysqld --initialize-insecure --user=mysql初始化mysql，此时会自动生成data文件夹
mysqld --initialize-insecure --user=mysql

# 修改my-default.ini中的basedir和datadir
设置mysql的安装目录
basedir=E:\Program Files\mysql\mysql-5.7.17-winx64
设置mysql数据库的数据的存放目录
datadir=E:\Program Files\mysql\mysql-5.7.17-winx64\data

# 执行net start mysql启动mysql，不需要加入my.ini
net start mysql

# 执行mysql -u root -p即可登陆mysql，第一次登陆没密码
mysql -u root -p

# 
然后可以在navicat中操作数据库
```

## 新建并配置项目：

``` bash
# 新建项目，路径下执行npm install cnpm -g --registry=https://registry.npm.taobao.org安装cnpm镜像
npm install cnpm -g --registry=https://registry.npm.taobao.org

# 执行cnpm install -g vue-cli安装vue-li脚手架
cnpm install -g vue-cli

# 执行vue init webpack my-project新建了一个基于webpack的vue项目my-project
vue init webpack my-project

# 安装 vue-resource依赖,先在package.json中对应地方添加,然后执行cnpm install
  "dependencies": {
      "vue": "^2.1.0",
      "vue-router": "^2.0.3",
      "vue-resource": "^1.0.3"
  }
  
# 进入my-project，执行cnpm install安装依赖；执行npm run dev进行开发调试
cnpm install
npm run dev
 ```
## 添加Express服务端目录
``` bash
# 在项目根文件夹下创建一个server文件夹。然后里面创建下面三个文件：

# db.js----用来添加mysql配置
  // 数据库连接配置
  module.exports = {
      mysql: {
          host: 'localhost',
          user: 'root',
          password: '',
          database: 'test',
          port: '3306'
      }
  }

# index.js----Express服务器入口文件
  // node 后端服务器

  const userApi = require('./api/userApi');
  const fs = require('fs');
  const path = require('path');
  const bodyParser = require('body-parser');
  const express = require('express');
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));

  // 后端api路由
  app.use('/api/user', userApi);

  // 监听端口
  app.listen(3000);
  console.log('success listen at port:3000......');

# sqlMap.js----SQL语句映射文件，以供api逻辑调用
  // sql语句
  var sqlMap = {
      // 用户
      user: {
          add: 'insert into user(id, name, age) values (0, ?, ?)'
      }
  }

# api/userApi.js ---- 测试用api示例
  var models = require('../db');
  var express = require('express');
  var router = express.Router();
  var mysql = require('mysql');
  var $sql = require('../sqlMap');

  // 连接数据库
  var conn = mysql.createConnection(models.mysql);

  conn.connect();
  var jsonWrite = function(res, ret) {
      if(typeof ret === 'undefined') {
          res.json({
              code: '1',
              msg: '操作失败'
          });
      } else {
          res.json(ret);
      }
  };

  // 增加用户接口
  router.post('/addUser', (req, res) => {
      var sql = $sql.user.add;
      var params = req.body;
      console.log(params);
      conn.query(sql, [params.username, params.age], function(err, result) {
          if (err) {
              console.log(err);
          }
          if (result) {
              jsonWrite(res, result);
          }
      })
  });

  module.exports = router;

# 在项目根目录下安装依赖cnpm install express mysql body-parser;
cnpm install express mysql body-parser;

# 在server文件夹下执行node index
node index

# 安装流程参考
参考：https://segmentfault.com/a/1190000008176208

```
## 编写vue测试文件
``` bash

# 这里只是为了测试，所以直接在vue-cli生成的Hello.vue中编写即可
  <template>
    <div class="hello">
      <h1>{{ msg }}</h1>
      <form>
        <input type="text" name="username" v-model="userName"> <br>
        <input type="text" name="age" v-model="age"> <br>
        <a href="javascript:;" @click="addUser">提交</a>
      </form>
    </div>
  </template>

  <script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        userName: '',
        age: ''
      }
    },
    methods: {
      addUser() {
        var name = this.userName;
        var age = this.age;
        this.$http.post('/api/user/addUser', {
          username: name,
          age: age
        },{}).then((response) => {
          console.log(response);
        })
      }
    }
  }
  </script>
```

## 设置代理与跨域
```bash

# vue-cli的config文件中有一个proxyTable参数，用来设置地址映射表，可以添加到开发时配置（dev）中
# 即请求/api时就代表http://127.0.0.1:3000/api/(这里要写ip，不要写localhost)
  dev: {
      // ...
      proxyTable: {
          '/api': {
              target: 'http://127.0.0.1:3000/api/',
              changeOrigin: true,
              pathRewrite: {
                  '^/api': ''
              }
          }
      },
      // ...
  }
```

## 问题汇总
```bash
# 问题1：在server文件夹下执行node index时出错，cannot find module 'xxx'。
# 解决：删除node_modules下的所有文件夹，重新执行cnpm install 和cnpm install express mysql body-parser都执行一下
cnpm install
cnpm install express mysql body-parser

# 问题2：post提交操作时报错：HelloWorld.vue?18db:25 Uncaught TypeError: Cannot read property 'post' of undefined
# 解决：在main.js中添加import VueResource from 'vue-resource';Vue.use(VueResource);
import VueResource from 'vue-resource';
Vue.use(VueResource);

# 问题3：提交时报错：POST http://localhost:8080/api/user/addUser 504 (Gateway Timeout)
# 参考：https://segmentfault.com/a/1190000011288053
# 解决：启动dev项目的同时也要启动server文件夹中的index文件，进入server文件夹执行node index 
npm run dev
node index 
```

## express后台代码调试：

``` bash
# express后台代码断点调试，在launch.json中设置如下：
"program": "${workspaceRoot}/server/api\\index.js"

# 以上即把index.js作为入口文件，然后启动调试即可。
# 参考：http://cnodejs.org/topic/58f376fec749f63d48fe9548
```
## 安装elementUI：
``` bash
# 执行cnpm i element-ui -S安装element-ui
cnpm i element-ui -S

#并在main.js中加入：import ElementUI from 'element-ui';import 'element-ui/lib/theme-chalk/index.css';Vue.use(ElementUI);
# 即可在页面中直接使用elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

# 若打开页面时出现依赖包的报错则把node_modules下的包全删了，重新执行cnpm isntall;cnpm install mysql;cnpm i element-ui -S即可
cnpm isntall;
cnpm install mysql;
cnpm i element-ui -S

```

## vue-router传参与接收参数：
``` bash
# 列表页进入详情页，id作为参数：
    orderDetail(row){
      this.$router.push({path:"/orderDetail/"+row.act_id});
    }

# 路由配置：
    {
       path:'/orderDetail/:id',
       component:OrderDetail
    }
    
# 详情页接收传过来的参数：
    created() {
      console.log(this.$route.params.id);
    }

```

## vue-router 多个路由地址绑定一个组件造成 created 不执行的解决方法：
``` bash
# 问题：给不同的路由复用了一个组件，打算在created()中判断路由传进来的参数从而调用不同的接口获取不同状态的订单的列表数据。问题：created只会执行一次，当点击了另一个路由的时候，created()不会再执行
# 描述1：复用了OrderList组件，区别在于传进去的type参数值
    {
        path:'/orderEntry/:type',
        component:OrderList
    }
# 描述2：主菜单选项选择后跳转到列表页组件：
   //订单列表-本组待办
    groupWait() {
      this.$router.push({ path: "/orderEntry/groupWait" });
    },
    //订单列表-我的待办
    personWait() {
      this.$router.push({ path: "/orderEntry/personWait" });
    }
   
# 问题症结：created()只会执行一次，切换路由时不会重复执行
  created() {
    if(this.$route.params.type=="groupWait"){
      this.getOrderList("groupWait");
    }else if(this.$route.params.type=="personWait"){
      this.getOrderList("personWait");
    }
  }
  
# 解决：用watch选项监听传过来的参数的变化，然后调相应的方法：
# watch解决了复用同一个组件之间的路由跳转，但是其他组件跳过来还是不能实现，还是要加上created()
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
        ... 
      }
    }
  }

```

## 项目展示

![Image text](https://github.com/junjieruan/vue-express/blob/master/img-folder/login.png)


![Image text](https://github.com/junjieruan/vue-express/blob/master/img-folder/index.png)


![Image text](https://github.com/junjieruan/vue-express/blob/master/img-folder/detail.png)


![Image text](https://github.com/junjieruan/vue-express/blob/master/img-folder/user.png)


![Image text](https://github.com/junjieruan/vue-express/blob/master/img-folder/order_detail.png)

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
