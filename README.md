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

# 进入my-project，执行cnpm install安装依赖；执行npm run dev进行开发调试
cnpm install
npm run dev

# 安装流程参考
参考：https://segmentfault.com/a/1190000008176208

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
    //进入订单详情页
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

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
