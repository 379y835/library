const express=require('express');
const pool=require('../pool.js');
var router=express.Router();

//注册路由
router.post('/reg',function(req,res){
	var obj=req.body;
	//console.log(obj);
	if (!obj.uname){
		res.send({code:401,msg:'uname required'});
		return;
	    }
	if (!obj.upwd){
		res.send({code:402,msg:'upwd required'});
		return;
		}
    if (!obj.phone){
		res.send({code:403,msg:'phone required'});
		return;
		}
    if (!obj.email){
		res.send({code:404,msg:'email required'});
		return;
		}
	pool.query('INSERT INTO library_user SET ?',[obj],function(err,result){
		if (err) throw err;
		if (result.affectedRows>0){
		    res.send({code:200,msg:'reg suc'});
			}
		});    
	});

//登录路由
router.post('/login',function(req,res){
	var obj=req.body;
	console.log(obj);
	
	if (!obj.uname){
		res.send({code:401,msg:"uname required"});
	    return;
	}
	if (!obj.upwd){
		res.send({code:402,msg:"upwd required"});
	    return;
	}

	pool.query('SELECT * FROM library_user WHERE uname=? AND upwd=?',[obj.uname,obj.upwd],function(req,res){
		if (err) throw err;
		console.log(result);
		if(result.length>0){
			res.send({code:200,msg:'login suc'});
		}else{
			res.send({code:201,msg:'uname or upwd error'
		});
		}	
	});
});

//检索用户
router.get('/detail',function(req,res){
	var obj=req.query;

	consoleo.log(obj);
	if(!obj.uid){
		res.send({code:401,msg:'uid required'})
			return;
	}
	pool.query('SELECT * FROM library_user WHERE uid=?',[obj.uid],function(req,res){
		if (err) throw err;
		res.send(result);	
	});
}
);

//修改用户
router.post('/update',function(req,res){
	var obj=req.body;
	var i=400;
	for(var key in obj){
		i++;

		if(!obj[key]){
			res.send({code:i,msq:key+'required'});
        return;

		}
	}

	var uid=obj.uid;
	delete obj.uid;
    console.log(obj);
	pool.query('UPDATE library_user SET ? WHERE uid=?',[obj,uid],function(err,result){
		if (err) throw err;
		if (result.affectedRows>0){
			res.send({code:200,msg:'update suc'});		
		}else{
			res.send({code:201,msg:'update error'})	
		}
	});

});

//用户列表
  router.get('/list',function(req,res){
	  var obj=req.query;
	  console.log(obj);
	  var count=obj.count;
	  var pno=obj.pno;
	  if (!count){
		  count=2;
	  }
	  if (!pno){
		  pno=1; 
	  }
	  count=parseInt(count);
	  pno=parseInt(pno);
	  var start=(pno-1)*count;
	  pool.query('SELECT * FROM library_user LIMIT ?,?',[start,count],function(err,result){
		  if (err) throw err;
		  res.send(result);
	  });
  });

//删除用户
router.get('/delete',function(req,res){
	var obj=req.query;
	if(!obj.uid){
		res.send({code:401,msg:'uid required'});
		return;
	}
	pool.query('DELETE FROM library_user WHERE uid=?',[obj.uid],function(err,result){
		if (err) throw err;	
		if(result.affectedRows>0){
			res.send({code:200,msg:'del suc'});
		}else{
			res.send({code:201,msg:'del err'});
		
		}
	});
});
	module.exports=router;
