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
    conn.query(sql, [params.username, params.password], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//用户登录操作
router.get('/userLogin',(req,res)=>{
    var sql = $sql.login.select;
    var username = req.param('username');
    var password = req.param('password');
    conn.query(sql,[username,password],function(err,result){
        if (err) {
            console.log(err);
        }
        if (result) {
            if(result.length == 0){
                res.json({
                    errcode: 1,
                    message:"登录失败"
                });
            }else{
                res.json({
                    errcode: 0,
                    message:"登录成功"
                });
            }
        }
    })
})

module.exports = router;