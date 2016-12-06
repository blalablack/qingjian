	/************banner轮播***************/
	var aa=(function lunBo(){
		var i=0;
		var timer;
		
		function time(){
			var imgs=$("#h3 .banner img");
			var spans=$(".control span");
			var span_active=$(".control span[class='b_active']");
			$(imgs[i]).animate({"opacity":".6"},500,function(){
				$(this).attr("class","");
				if(i==5){
					i=-1;
				}	$(imgs[i+1]).attr("class","on");
					$(imgs[i+1]).css({"display":"block"});
					$(this).css("display","none");
					//下边span的切换
					span_active.attr("class","");
					$(spans[i+1]).attr("class","b_active");

					$(imgs[i+1]).animate({"opacity":"1"},200,function(){
					});
					i++;
			});
		}
		function start(){
			 timer=setInterval(time,2000);
		}
		function stop(){
			clearInterval(timer);
		    timer=null;
		}
		function spanClick(){
			var spans=$(".control span");
			spans.each(function(){
				$(this).click(function(){
					var span_active=$(".control span[class='b_active']");
					var nub=this.innerHTML-1;
					i=nub;
					span_active.attr("class","");
					$(spans[nub]).attr("class","b_active");
					var img_active=$("#h3 .banner .on");
					img_active.css({"display":"none","opacity":".6"});
					var imgs=$("#h3 .banner img");
					$(imgs[nub]).css({"opacity":1,"display":"block"});
					$(imgs[nub]).attr("class","on");
				});
				
			});
		}
		return {
			t:start,
			p:stop,
			c:spanClick,
		}
	})();
	function h3Hover(){
		var h3=$("#h3");
		h3.mouseenter(function(){
			aa.p();

		});
		h3.mouseleave(function(){
			aa.t();
		});
	}
	
	/************首页滚动*****************/
	function gunDong(){
		var speed=20; //数字越大速度越慢
		var tab=document.getElementById("demo");
		var tab1=document.getElementById("demo1");
		var tab2=document.getElementById("demo2");
		tab2.innerHTML=tab1.innerHTML;
		
		function Marquee(){
			if(tab2.offsetWidth<=tab.scrollLeft){
				tab.scrollLeft-=tab1.offsetWidth
			}else{
				tab.scrollLeft++;
			}
		}
		var MyMar=setInterval(Marquee,speed);
		tab.onmouseover=function() {clearInterval(MyMar)};
		tab.onmouseout=function() {MyMar=setInterval(Marquee,speed)};
	}
	/******网页内容弹出隐藏 ,用的是jquery*/
	function show(e){
		var td=$(e).parent();
		var div=td.siblings("td").children(".content");
		var dataHeight=div.attr("data-height");
		var height=div.height();
			if(div.css("display")=="none"){
				div.css({"height":"0","display":"block"});
				if(!dataHeight){
					$(div).animate({"height":height},500);
				}else{
					$(div).animate({"height":dataHeight},500);
				}
			}else{
				$(div).attr("data-height",div.height());
				$(div).animate({"height":0},500,function(){
					div.css("display","none");
				});
			}		
	}
	/******图片按钮切换*****/
	/*var STEP=0;
	function moveRight(e){
		var tu=$(e).parent().siblings(".kuang").children(".tu");
		var imgs=tu.children();
		var n=imgs.length-5;
		
		if(STEP>-135*n){
			tu.css({"marginLeft":STEP-=135});
		}	
	}
	function moveLeft(e){
		 var tu=$(e).parent().siblings(".kuang").children(".tu");
		  if(STEP<=-135){
			tu.css({"marginLeft":STEP+=135});
		 }
	}*/
	/********加入收藏*******/
	function addFav(title,url){
		if(document.all){
			window.external.addFavorite(url,title);
		}else if(false){
			 window.sidebar.makeUp(title, url,'');
		}else{
			alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要用ctrl+D将【"+url+"】设置为首页。");
		}
	}
	/**********精品工程禁用滚轮**********/
	function wheel(e){
				//计算鼠标滚轮滚动的距离
				//一格是3行，但是要注意，这里和像素不同的是它是负值
				var v=-e.detail/3;
				window.innerHTML=window.innerHTML+v;
				//阻止浏览器默认方法
				e.preventDefault();
				}
	function jinyong(e){
		var isFF=/FireFox/i.test(navigator.userAgent);
		if(e){
			if(!isFF){
				window.onmousewheel=document.onmousewheel=function(){return false;}
			}else{
				
				window.addEventListener("DOMMouseScroll",wheel,false);
				
			}
		}else if(!e){
			if(!isFF){
				window.onmousewheel=document.onmousewheel=function(){return true;}
			}else{
				window.removeEventListener("DOMMouseScroll",wheel,false);
			}
		}
	}
	/***********精品工程展示恢复图片*************/
	function showPicture(){
		var h8=$("#h8");
		var h7=$("#h7");
		h7.css({display:"block"});
		h8.css({"top":-h8.height()+"px","display":"block"});
		h8.animate({"top":"20px"},500);
	}
	function huiFu(){
		jinyong(false);
		var h7=$("#h7");
		var h8=$("#h8");
		h8.animate({"top":-h8.height()},150,function(){
			h7.css({"display":"none"});
			h8.css({"display":"none"});
		});
	}
	/*******************************/
	
	
	
	
	function inatial(){
		/**************精品工程图片的hover****************/
		var skuang=$(".skuang");
		skuang.mouseenter(function(){
			var mask=$(this).children("#mask");
			var bg=mask.children(".bg");
			bg.stop();
			mask.stop();
			bg.animate({opacity:.8});
			mask.animate({top:10},300);	
		});
		skuang.mouseleave(function(){
			var mask=$(this).children("#mask");
			var bg=mask.children(".bg");
			bg.stop();
			mask.stop();
			bg.animate({opacity:1});
			mask.animate({top:156},300);	

		});
		/***************nav*****************/
		var a=$("#h2 ul a:not('.xuanzhong')");
		a.each(function(){
			$(this).mouseenter(function(){
				var height=$(this).attr('data-height');
				$(this).css({"background":"#3D3D3D"});
				$(this).children(".pop").css({"display":"block"});
				$(this).children(".pop").animate({'height':height},250);
			})
			$(this).mouseleave(function(){
				$(this).children(".pop").stop(true,true)
				$(this).css({"background":""});
				$(this).children(".pop").css({"height":"0","display":"none"});	
			});
		})
	};
	/******************精品工程内容ul的hover，click*******/
	$("#h5 ul li").mouseenter(function(){
		$(this).css({borderColor:"#22CCB3"});
		
	});
	$("#h5 ul li").mouseleave(function(){
		$(this).css({borderColor:"#aaa"});
		
	});
	$("#h5 ul li").click(function(){
		//*********样式的切换*********/
		$(this).attr("data-class","visited");
		var lion=$(this).siblings("[data-class=visited]");
		lion.css({borderColor:"#aaa",backgroundColor:"#fff"});
		lion.children("a").css({color:"#333"});
		$(this).css({borderColor:"#22CCB3",backgroundColor:"#22CCB3"});
		$(this).children("a").css({color:"#fff"});
		/*******内容的切换*******/
		var nub=$(this).attr("data-nub");
		$("#h5 .kuang").each(function(i){
			if(i!=nub){
				$(this).css({display:"none"});
			}else{
				$(this).css({display:"block"});
			}
		});
	});