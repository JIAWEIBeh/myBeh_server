var express = require('express');
var router = express.Router();
var util = require('./mBehutil.js');
var alertHtml = require('./alert.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.all('/get', function(req, res, next) {
	if(util.getReqStrByKey(req,'name')=='alert'){
		res.send(alertHtml.alertHtml);
	}else{
		res.render('error',{error:{stack:'404 NOT FOUND !'}})
	}
});

router.all('/getdata', function(req, res, next) {
	//console.log(util.getReqStrByKey(req,['pid','name']));
	if(util.getReqStrByKey(req,'pid')==2217){
		util.query('select * from zhihuperson limit 100',[],function(err,results,fields){
			util.returnRES(res,results);
		})
	}else{
		res.render('error',{error:{stack:'404 NOT FOUND !'}})
	}
});

function insertSql(tablename,fieldarr,valuearr){
	if(typeof fieldarr=='object'&&fieldarr.length>=1&&typeof valuearr=='object'&&valuearr.length>=1&&valuearr.length==fieldarr.length){
		var sql = "insert into "+tablename+" (";
		var field = "";
		var value = "";
		new Array(fieldarr.length).find(function(x,y){
			if(y<(fieldarr.length-1)){
				field+=fieldarr[y]+",";
				value+=valuearr[y]+",";
			}else{
				field+=fieldarr[y]+")";
				value+=valuearr[y]+")";
			}
		})
		return sql+field+" values ("+value;
	}else{
		return new Error('参数不合法');
	}
}

router.post('/setOneArticle', function(req, res, next) {
	
	var reqData = util.getReqStrByKey(req,['title','isshow','isimg','content'])
	var id = util.getCode(6);

	var data = [id,
	reqData.title,
	reqData.isshow?reqData.isshow:'是',
	new Date(),
	reqData.isimg?reqData.isimg:'否']
	var sql = insertSql('beh_article',['beh_id','beh_title','beh_isshow','beh_createtime','beh_isimg'],['?','?','?','?','?']);//'insert into beh_article (beh_id,beh_title,beh_isshow,beh_createtime,beh_isimg) values (?,?,?,?,?)';
	if(util.getReqStrByKey(req,'pid')==2217){
		util.query(sql,data,function(err,results,fields){
			if(err){
				util.returnRES(res,{success:false,massage:err});
			}else{
				util.query(insertSql('beh_article_content',['beh_pid','beh_content'],['?','?']),[id,reqData.content?reqData.content:''],function(err1,results1,fields1){
					if(err){
						util.returnRES(res,{success:false,massage:err1});
					}else{
						util.returnRES(res,{success:true,massage:results1});
					}
				})
			}
		})
	}else{
		res.render('error',{error:{stack:'404 NOT FOUND !'}})
	}
});


module.exports = router;
