1.��mysql��װ����ѹ��,��binĿ¼��ִ��mysqld -install
2.������������װ���а�װ������Ҫ��ɾ��mysql��ִ��sc query mysql�鿴��Ϊmysql�ķ���ִ��sc delete mysqlɾ��
�ο���https://www.cnblogs.com/dichters/p/5929209.html
3.Ŀ¼�е�data��my.ini��ɾ����ִ��mysqld --initialize-insecure --user=mysql��ʼ��mysql����ʱ���Զ�����data�ļ���
4.�޸�my-default.ini�е�basedir��datadir
5.ִ��net start mysql����mysql������Ҫ����my.ini
6.ִ��mysql -u root -p���ɵ�½mysql����һ�ε�½û����
7.Ȼ�������navicat�в������ݿ�


1.�½���Ŀ��·����ִ��npm install cnpm -g --registry=https://registry.npm.taobao.org��װcnpm����
2.ִ��cnpm install -g vue-cli��װvue-li���ּ�
3.ִ��vue init webpack my-project�½���һ������webpack��vue��Ŀmy-project
4.����my-project��ִ��cnpm install��װ������ִ��npm run dev���п�������
5.���գ�https://segmentfault.com/a/1190000008176208 �İ�װ����
6.��server�ļ�����ִ��node indexʱ����cannot find module 'xxx'�������ɾ��node_modules�µ������ļ��У�����ִ��cnpm install ��cnpm install express mysql body-parser��ִ��һ��
7.�ύ����ʱ����HelloWorld.vue?18db:25 Uncaught TypeError: Cannot read property 'post' of undefined���������main.js�����import VueResource from 'vue-resource';Vue.use(VueResource);
8.�ύʱ����POST http://localhost:8080/api/user/addUser 504 (Gateway Timeout) ���������dev��Ŀ��ͬʱҲҪ����server�ļ����е�index�ļ�������server�ļ���ִ��node index �� �ο���https://segmentfault.com/a/1190000011288053

9.express��̨����ϵ���ԣ���launch.json���������£�"program": "${workspaceRoot}/server/api\\index.js"��index.jsΪ����ļ���Ȼ���������Լ��ɡ��ο���http://cnodejs.org/topic/58f376fec749f63d48fe9548

10.ִ��npm i element-ui -S��װelement-ui,����main.js�м��룺import ElementUI from 'element-ui'��import 'element-ui/lib/theme-default/index.css'��Vue.use(ElementUI)������ʹ��