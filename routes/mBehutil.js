var mysql = require('mysql');
var bodyParser = require('body-parser');

var codeType = "1234567890abcddefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

var connection = mysql.createPool({
  host : '112.74.184.106',
  user : 'root',
  password : '123456',
  database : 'rooti'
});
 
module.exports = {
	query:function(sql,options,success){
		connection.getConnection(function(err,conn){  
	        if(err){  
	            success(err,null,null);  
	        }else{  
	            conn.query(sql,options,function(err,results,fields){  
	                //释放连接  
	                conn.release();  
	                //事件驱动回调  
	                success(err,results,fields);
	            });  
	        }  
	    });  
	},
	getOneCode:function(){
		return codeType.split("")[Math.round(Math.random()*62)];
	},
	getCode:function(num){
		var code = "";
		for(let i=0;i<num;i++){
			code+=this.getOneCode();
		}
		if(code.length>0){
			return code;
		}
		return null;
	},
	getReqStrByKey:function(req,key){
		if(typeof key=='string'){
			if(req.body[key]){
				return req.body[key];
			}else if(require('url').parse(req.url, true).query[key]){
				return require('url').parse(req.url, true).query[key]
			}else{
				return null;
			}
		}else if(typeof key=='object'&&key.length>=1){
			var rus = {};
			for(var i in key){
				if(req.body[key[i]]){
					rus[key[i]]=req.body[key[i]];
				}else if(require('url').parse(req.url, true).query[key[i]]){
					rus[key[i]]=require('url').parse(req.url, true).query[key[i]]
				}else{
					
				}
			}
			return rus;
		}
	},
	returnRES:function(res,obj){
		res.send(obj);
	},
	POST:function(app,url,success){
		app.post(url,bodyParser.json(),function({body},res,nex){
			success(body,res,nex)
		})
	}
}