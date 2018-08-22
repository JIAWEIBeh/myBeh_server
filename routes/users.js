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

module.exports = router;
