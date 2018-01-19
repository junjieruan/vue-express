// sql语句
var sqlMap = {
    // 用户
    user: {
        add: 'insert into user(id, name, password) values (0, ?, ?)'
    },

    //登陆
    login:{
        select : 'select password from user where name = (?) and password = (?)'  
    },

    //新增订单
    order:{
        add:'insert into order_detail(act_id, act_name, act_area, act_tim, act_immediately, act_property, act_resource, act_type, act_status) values(?, ?, ?, ?, ?, ?, ?, ?, 0)',
        getList:'select * from order_detail where act_status = (?) ',
        getAllOrder:'select * from order_detail',
        getDetail:'select * from order_detail where act_id = (?)',
        claim:'update order_detail set act_status = 1 where act_id = (?)',
        execute:'update order_detail set act_status = 2 where act_id = (?)',
    }
}

module.exports = sqlMap;