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

// 新增订单接口
router.post('/addOrder', (req, res) => {
    var sql = $sql.order.add;
    var params = req.body;
    console.log(params);
    var typeString;
    for(index in params.type){
        typeString += ","+params.type[index];
    }
    var immediately;
    params.delivery?immediately = 1:immediately=0;
    var actId = getTime();
    conn.query(sql, [actId,params.name, params.region,params.date1,immediately,typeString,params.resource,params.desc], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            res.json({
                errcode:0,
                message:'SUCCESS'
            })
        }
    })
});

//查询订单列表接口
router.get('/getList', (req, res) => {
    var sql = $sql.order.getList;
    var type = req.param("type");
    // console.log(params);
    var searchStatus;
    if(type=="groupWait"){
        searchStatus = 0;
    }else if(type == "personWait"){
        searchStatus = 1;
    }else if(type=="personFinish"){
        searchStatus = 2;
    }
    conn.query(sql, [searchStatus], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            res.json({
                errcode:0,
                message:'SUCCESS',
                data:result
            })
        }
    })
});

//查询所有订单列表接口
router.get('/getAllOrder', (req, res) => {
    var sql = $sql.order.getAllOrder;
    var type = req.param("type");
    // console.log(params);
    conn.query(sql, [], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            res.json({
                errcode:0,
                message:'SUCCESS',
                data:result
            })
        }
    })
});

//查询订单详情接口
router.get('/getDetail',(req,res)=>{
    var sql = $sql.order.getDetail;
    var actId = req.param("id");
    conn.query(sql,[actId],function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            res.json({
                errcode:0,
                message:'SUCCESS',
                data:result[0]
            })
        }
    })
})

//签收订单接口
router.get('/claim',(req,res)=>{
    var sql = $sql.order.claim;
    var actId = req.param("id");
    conn.query(sql,[actId],function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            res.json({
                errcode:0,
                message:'SUCCESS',
            })
        }
    })
})

//办理订单接口
router.get('/execute',(req,res)=>{
    var sql = $sql.order.execute;
    var actId = req.param("id");
    conn.query(sql,[actId],function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            res.json({
                errcode:0,
                message:'SUCCESS',
            })
        }
    })
})
//获取当前时间作为订单id
function getTime(){
    var now = new Date();
    var year = now.getFullYear();
    var month =(now.getMonth() + 1).toString();
    var day = (now.getDate()).toString();
    var hour = (now.getHours()).toString();
    var minute = (now.getMinutes()).toString();
    var seconds = (now.getSeconds()).toString();
    if (month.length == 1) {
        month = "0" + month;
    }
    if (day.length == 1) {
        day = "0" + day;
    }
    if (hour.length == 1) {
        hour = "0" + hour;
    }
    if (minute.length == 1) {
        minute = "0" + minute;
    }
    if (seconds.length == 1) {
        seconds = "0" + seconds;
    }
    var dateTime = year + month +  day + hour + minute +seconds;
    return dateTime;
}



module.exports = router;