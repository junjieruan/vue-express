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
若已在其他安装包中安装过，需要先删除mysql，执行sc query mysql查看名为mysql的服务，执行sc delete mysql删除

# 
目录中的data和my.ini先删除，执行mysqld --initialize-insecure --user=mysql初始化mysql，此时会自动生成data文件夹

# 
修改my-default.ini中的basedir和datadir

# 
执行net start mysql启动mysql，不需要加入my.ini

# 
执行mysql -u root -p即可登陆mysql，第一次登陆没密码

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



For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
