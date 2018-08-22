function alerts(op = {},success){
		if(document.querySelector('#coverAlert')){
			$('#coverAlert').remove();
		}
		var option = {
			width:op.width?op.width:300,
			height:op.height?op.height:200,
			title:op.title?op.title:'',
			content:op.content?op.content:'',
			isClickBlackClose:op.isClickBlackClose
		}
		$('body').attr('oncontextmenu','return false;');
		$('body').attr('onselectstart','return false;');
		$('body').append("<div id='coverAlert' style='width: 100%;height: "+window.innerHeight+"px;position: fixed;top: 0;left: 0;text-align:center;z-index:99999'></div>");
		
		$('#coverAlert').html('<div id="coverClick" style="width: 100%;height: '+window.innerHeight+'px;z-index:9999;background-color:#05080645;"></div>\
			<div id="alertBody" style="width:'+option.width+'px;height:'+option.height+'px;z-index:10000;position: absolute;top:'+(window.innerHeight/2-option.height/2)+'px;left:'+(window.innerWidth/2-option.width/2)+'px;box-shadow: 1px 1px 50px rgba(0,0,0,.3);border-radius: 2px;">\
			<div id="alertTab" style="background-color: #D5D5D5;height: 25%;position: relative;left: 0;top: 0;width: 100%;cursor: move;">\
				<div style="text-align: left;line-height: '+option.height*0.25+'px;margin-left: 10px;">'+option.title+'</div></div>\
			<div id="closeType" class="closeType">\
				<div></div>\
				<div></div>\
			</div>\
			<div style="background-color: #fff;height: 75%;position: relative;left: 0;top: 0;width: 100%;">\
				<div id="content" style="text-align: left;">'+option.content+'</div>\
			</div>\
			</div>');

		
		if(option.isClickBlackClose){
			$('#coverClick').on('click',function(){
				$('#coverAlert').fadeOut(500);
				$('body').attr('oncontextmenu','');
				$('body').attr('onselectstart','');
			})
		}
		$('#closeType').on('click',function(){
			$('#coverAlert').fadeOut(500);
			$('body').attr('oncontextmenu','');
			$('body').attr('onselectstart','');
		})
		litenerAlert()//时间监听
		success?success():'';
	}

	function litenerAlert(){
		$('#alertTab').on('mousedown',function(e){
			mouse._thist = true;
			if(!mouse.downx||!mouse.downy){
				mouse.downx = e.offsetX;
				mouse.downy = e.offsetY;
			}
		});
		$(document).on('mouseup',function(e){
			mouse._thist = false;
			delete mouse.downx;
			delete mouse.downy;
		});
		var mouse = {};
		mouse._thist = false;
		$(document).on('mousemove',function(e){
			if(mouse._thist){
				let tabwidth = $('#alertBody')[0].clientWidth+($('#alertBody')[0].clientLeft*2);
				let tabheight = $('#alertBody')[0].clientHeight+($('#alertBody')[0].clientTop*2);
				let x_t = (e.pageX-mouse.downx);
				let y_t = (e.pageY-mouse.downy);
				if(y_t>=0&&x_t>=0&&(y_t+tabheight)<window.innerHeight&&(x_t+tabwidth)<window.innerWidth){
					$('#alertBody').css('top',y_t+'px');
					$('#alertBody').css('left',x_t+'px');
				}else{
					if(x_t>=0&&y_t<0&&(x_t+tabwidth)<=window.innerWidth){
						$('#alertBody').css('top',0+'px');
						$('#alertBody').css('left',x_t+'px');
					}else if(y_t>=0&&x_t<=0&&(y_t+tabheight)<window.innerHeight){
						$('#alertBody').css('top',y_t+'px');
						$('#alertBody').css('left',0+'px');
					}else if(x_t>=0&&y_t>0&&(x_t+tabwidth)<=window.innerWidth){
						$('#alertBody').css('top',window.innerHeight-tabheight+'px');
						$('#alertBody').css('left',x_t+'px');
					}else{
						if((y_t+tabheight)>=window.innerHeight){
							$('#alertBody').css('top',window.innerHeight-tabheight+'px');
						}else{
							$('#alertBody').css('top',0+'px');
						}
						if((x_t+tabwidth)>window.innerWidth){
							$('#alertBody').css('left',window.innerWidth-tabwidth+'px');
						}else{
							$('#alertBody').css('left',0+'px');
						}
						if(y_t>=0&&(x_t+tabwidth)>=window.innerWidth&&(y_t+tabheight)<=window.innerHeight){
							$('#alertBody').css('left',window.innerWidth-tabwidth+'px');
							$('#alertBody').css('top',y_t+'px');
						}
					}

				}
				
			}
		})
	}
	function arrRemoveMore(arr){
		if(typeof arr=='object'&&arr.length>0){
			var indexarr = [];
			var resultarr = [];
			for(var i =0,l=arr.length;i<l;i++){
				if(indexarr.indexOf(JSON.stringify(arr[i]))<0){
					indexarr.push(JSON.stringify(arr[i]));
					resultarr.push(arr[i]);
				}
			}
			return resultarr;
		}
	}

	function maxstr(str){
		var hash = {};
		str.split('').map((x,y)=>{
			if(typeof hash[x]=="number"){
				hash[x]=hash[x]+1;
			}else{
				hash[x]=0;
			}
		})
		var x = 0,yy="";;
		for(i in hash){
			if(hash[i]>x){
				x = hash[i];
				yy=i;
			}
		}
		return yy;
	}
	alerts({
		title:'标题',
		isClickBlackClose:true,
		content:`<button id="dsa" style="background-color:#ff0;width:50px;height:35px;border: 2px solid #ff0;">ok</button>
			<input id="inputs" style="height:30px;"></input>
			<div id="cubu" style="width:50px;height:50px;background-color:#52dc50;position: relative;top: 10px;left: 55px;transition:all 1.5s;"></div>
			`
	},function(){
		dsa.addEventListener('click',function(){
			inputs.value = 'rotate';
			$('#inputs').trievent('input');
		})
		inputs.addEventListener('input',function(){
			if(inputs.value=="rotate"){
				$('#cubu').css('transform','rotate(360deg)')
			}else if(inputs.value=="translateX"){
				$('#cubu').css('transform','translateX(100px)')
			}else if(inputs.value=="rotate3d"){
				$('#cubu').css('transform','rotate3d(1,1,1,270deg)')
			}else{
				$('#cubu').css('transform','')
			}
		})
	})
	$('#contents > img').click(function(){//点击图片
		alerts({
			title:'标题',
			isClickBlackClose:true,
			content:`<button id="dsa" style="background-color:#ff0;width:50px;height:35px;border: 2px solid #ff0;">ok</button>
			<button id="rotate" style="background-color:#ff0;width:50px;height:35px;border: 2px solid #ff0;">rotate</button>
				<input id="inputs" style="height:30px;"></input>
				<div id="cubu" style="width:50px;height:50px;background-color:#52dc50;position: relative;top: 10px;left: 55px;transition:all 1.5s;"></div>
				`
		},function(){
			dsa.addEventListener('click',function(){
				inputs.value = 'rotate';
				$('#inputs').trievent('input');
			})
			rotate.addEventListener('click',function(){
				inputs.value = 'rotate3d';
				$('#inputs').trievent('input');
			})
			inputs.addEventListener('input',function(){
				if(inputs.value=="rotate"){
					$('#cubu').css('transform','rotate(360deg)')
				}else if(inputs.value=="translateX"){
					$('#cubu').css('transform','translateX(100px)')
				}else if(inputs.value=="rotate3d"){
					$('#cubu').css('transform','rotate3d(1,1,1,270deg) scale3d(4,4,4)')
				}else{
					$('#cubu').css('transform','')
				}
			})
		})
	})
	$.fn.extend({
		trievent:function(event){
			let ev = document.createEvent("HTMLEvents");  
	        ev.initEvent(event, false, true);  
	        document.querySelector(this.selector).dispatchEvent(ev);  
		}
	})