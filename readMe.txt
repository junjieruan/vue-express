1.将mysql安装包解压缩,在bin目录下执行mysqld -install
2.若已在其他安装包中安装过，需要先删除mysql，执行sc query mysql查看名为mysql的服务，执行sc delete mysql删除
参考：https://www.cnblogs.com/dichters/p/5929209.html
3.目录中的data和my.ini先删除，执行mysqld --initialize-insecure --user=mysql初始化mysql，此时会自动生成data文件夹
4.修改my-default.ini中的basedir和datadir
5.执行net start mysql启动mysql，不需要加入my.ini
6.执行mysql -u root -p即可登陆mysql，第一次登陆没密码
7.然后可以在navicat中操作数据库


1.新建项目，路径下执行npm install cnpm -g --registry=https://registry.npm.taobao.org安装cnpm镜像
2.执行cnpm install -g vue-cli安装vue-li脚手架
3.执行vue init webpack my-project新建了一个基于webpack的vue项目my-project
4.进入my-project，执行cnpm install安装依赖；执行npm run dev进行开发调试
5.参照：https://segmentfault.com/a/1190000008176208 的安装流程
6.在server文件夹下执行node index时出错，cannot find module 'xxx'。解决：删除node_modules下的所有文件夹，重新执行cnpm install 和cnpm install express mysql body-parser都执行一下
7.提交操作时报错：HelloWorld.vue?18db:25 Uncaught TypeError: Cannot read property 'post' of undefined，解决：在main.js中添加import VueResource from 'vue-resource';Vue.use(VueResource);
8.提交时报错：POST http://localhost:8080/api/user/addUser 504 (Gateway Timeout) 解决：启动dev项目的同时也要启动server文件夹中的index文件，进入server文件夹执行node index 。 参考：https://segmentfault.com/a/1190000011288053

9.express后台代码断点调试，在launch.json中设置如下："program": "${workspaceRoot}/server/api\\index.js"，index.js为入口文件，然后启动调试即可。参考：http://cnodejs.org/topic/58f376fec749f63d48fe9548

10.执行npm i element-ui -S安装element-ui,并在main.js中加入：import ElementUI from 'element-ui'；import 'element-ui/lib/theme-default/index.css'；Vue.use(ElementUI)；即可使用