//获取非行间样式
function getStyle(obj,name)
{
	if(obj.currentStyle)
	{
		//IE
		return obj.currentStyle[name];
	}
	else
	{
		//FF、Chrome
		return getComputedStyle(obj,false)[name];
	}
}
//基本运动
function Move(obj, attr, iTarget, fnEnd)
{

	clearInterval(obj.timer);

	obj.timer = setInterval(function(){
		var cur = 0;
		var speed;
		if(attr == 'opacity')
		{
			cur = Math.round(parseFloat(getStyle(obj,attr))*100);
			speed =(iTarget - cur)/10;
		}
		else
		{
			cur = parseInt(getStyle(obj,attr));
			speed =(iTarget - cur)/2;
		}
		
		

		speed = speed>0?Math.ceil(speed):Math.floor(speed);

		if(iTarget == cur)
		{
			clearInterval(obj.timer);
			if(fnEnd)fnEnd();
		}
		else
		{	
			if(attr == 'opacity')
			{

				obj.style.filter = 'alpha(opacity = ' + (cur + speed) + ')';//IE
				obj.style.opacity = (cur + speed)/100; //chrome FF
			}
			else
			{
				obj.style[attr] = cur + speed + 'px';
			}		
		}
	},30)
}
//获取类名class
function getClass(oParent, sClass)
{
	var aEle = oParent.getElementsByTagName('*');
	var aResult = [];
	
	for(var i=0; i<aEle.length; i++)
	{
		if(aEle[i].className == sClass)
		{
			aResult.push(aEle[i]);
		}
	}
	
	return aResult;
}

//!!!阻止事件冒泡
function isMouseLeaveOrEnter(e, handler) {   
    if (e.type != 'mouseout' && e.type != 'mouseover') return false;   
    var reltg = e.relatedTarget ? e.relatedTarget : e.type == 'mouseout' ? e.toElement : e.fromElement;   
    while (reltg && reltg != handler)   
        reltg = reltg.parentNode;   
    return (reltg != handler);   
}   

//!!!


//加载事件
window.onload = function()
{
	//1.导航栏实现二级菜单显示隐藏功能	
	var navsBox = document.getElementById('navs_box');//获取相关元素
	var navsUl = document.getElementById('navs_ul');
	var oLis = navsUl.children;

	//给一级li（导航栏）添加鼠标移入移出事件
	for(var i=0; i<oLis.length; i++)
	{		
			oLis[i].onmouseover = function()
			{	//显示二级菜单背后的蓝色div
				navsBox.style.display = "block";
							
				//显示二级菜单
				for(var j=0; j<oLis.length; j++)
				{
					var oUls = oLis[j].getElementsByTagName('ul');
					oUls[0].className = "on";
				}
			}

			oLis[i].onmouseout = function()
			{	//隐藏二级菜单背后的蓝色div
				navsBox.style.display = "none";

				//隐藏二级菜单
				for(var j=0; j<oLis.length; j++)
				{
					var oUls = oLis[j].getElementsByTagName('ul');
					oUls[0].className = "";
				}
			}
	}
	
	//2.广告窗口关闭
	var k = document.getElementById('ad_hide');//获取相关元素
	var kk = document.getElementById('ad');
	//'关闭'点击事件
	k.onclick = function()
	{
		kk.style.display = "none";
	}
	


	
	//3.第二列 图片新闻/媒体聚焦 切换功能
	var oNews = document.getElementById('news');  //获取相关元素
	var dIVS = oNews.children;   //数组!
	var news_top_ul = document.getElementById('news_top_ul');
	var list = news_top_ul.getElementsByTagName('li'); //数组!

	for (var i=0, len1=list.length-1; i<len1; ++i)
	{
		list[i].index = i; 
		list[i].onmouseover = function()
		{
			for (var n=0; n<len1; ++n)
			{
				list[n].className="";
				dIVS[n].className="news_hide";  
			}

			this.className="news_on" + this.index;	//对应div显示
			dIVS[this.index].className="";	//其余div隐藏
		};
	} 

	//4.第三列 切换功能，新闻显现
	var oTitle_manages_box = document.getElementById('title_manages_box');  	//获取相关元素
	var oDivs = oTitle_manages_box.children;   //数组!
	var oTitle_manages_top_ul = document.getElementById('title_manages_top_ul');
	var oTitle_manages_top_ul_li = oTitle_manages_top_ul.getElementsByTagName('li'); //数组!

	for (var j=0, len2=oTitle_manages_top_ul_li.length; j<len2; ++j)
	{
		oTitle_manages_top_ul_li[j].index = j; 
		oTitle_manages_top_ul_li[j].onmouseover = function()
		{
			for (var m=0; m<len2; ++m)
			{
				oTitle_manages_top_ul_li[m].className="";
				oDivs[m].className="manages_hide";
				// oDivs[m].style.opacity = 0;
				// oDivs[m].style.filter = "alpha(opacity = 0)";
			}

			Move(oDivs[this.index],'opacity',100);

			this.className="manages_on";
			oDivs[this.index].className="";
		};

	}
	//5.回到顶部
	var oReturnTop = document.getElementById('returnTop');
	var oReturnTop_a = oReturnTop.getElementsByTagName('a')[0]; //获取箭头元素
	var judge = true; //判断是否认为滚动滚动条
	var topScroll = null;

	oReturnTop_a.onclick = function()
	{
		if(topScroll !=null) //防止多次点击按钮导致重叠效果
		{
			return ;
		}
		topScroll = setInterval(function()
			{
				var scrTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
				if(scrTop == 0)
				{
					clearInterval(topScroll);
					topScroll = null;
				}
				else
				{
					judge = true;
					scrollBy(0,-Math.ceil((scrTop+1)/5));				
				}
				
			},10)
		
	}
	//滚动事件
	window.onscroll = function()
	{
		if(judge == false)
		{
			clearInterval(topScroll);//人为滚动立即停止
			topScroll = null;
		}

		judge = false;
		var scrTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		if(scrTop >= 100)	//if..else 使得'回到顶部'图标在页面滚动到一定距离后再显示
		{
			oReturnTop.style.display = "block";
		}
		else
		{
			oReturnTop.style.display = "none";
		}
		
	}

	//6.导航栏下拉
	var oNavs = document.getElementById('navs');

	navsUl.onmouseover = function()
	{
		if (isMouseLeaveOrEnter(event,this))
		{	
			var oNavs_ul_li = this.children;
			for(var i=0; i<oNavs_ul_li.length; i++)
			{	//将二级菜单的高度变成0，再运动到214px;
				oNavs_ul_li[i].children[1].style.height = '0';
				Move(oNavs_ul_li[i].children[1], 'height', 214);
			}
			//将蓝色div的高度变成0，再运动到214px;
			navsBox.style.height = "0";
			Move(navsBox, 'height', 214);
		}
	}

	//7.幻灯片
	var oPlays = document.getElementById('plays');	//获取相关元素
	var oBtn_prev = document.getElementById('p_prev');	//左按钮
	var oBtn_next = document.getElementById('p_next');	//右按钮
	var oImg_ul = oPlays.getElementsByTagName('ul')[0];
	var oImg_li = oImg_ul.getElementsByTagName('li');
	
	var judge2 = false; //用于后面按钮判断，防止切图过程中鼠标多次点击
	var ofLeft = -2040; //运动初始值

	//按钮渐显渐隐
	oBtn_prev.onmouseover = function()
	{
		Move(this, 'opacity', 100);
	};
	oBtn_prev.onmouseout = function()
	{
		Move(this, 'opacity', 90);
	};
	oBtn_next.onmouseover = function()
	{
		Move(this, 'opacity', 100);
	};
	oBtn_next.onmouseout = function()
	{
		Move(this, 'opacity', 90);
	};

	//点击播放下张图片函数
	function AutoPlay()
	{
		if(judge2)
		{
			judge2 = false;
			return;
		}
		else
		{
			ofLeft -= 1020;
			
			judge2 = true;

			Move(oImg_ul, 'left', ofLeft, function(){
				if(ofLeft == -11220)
				{
					oImg_ul.style.left = '-2040px';
					ofLeft = -2040;
				}
				judge2 = false;
			});						
		}
	}
	//上一张图片按钮
	oBtn_prev.onclick = function()
	{	
		if(judge2)
		{
			judge2 = false;
			return;
		}	
		else
		{
			ofLeft += 1020;
			
			judge2 = true;

			Move(oImg_ul, 'left', ofLeft, function(){
				if(ofLeft == -1020)
				{
					oImg_ul.style.left = '-10200px';
					ofLeft = -10200;
				}
				judge2 = false;
			});
		}
	}
	//下一张图片按钮
	oBtn_next.onclick = function()
	{
		AutoPlay();
	}
	//自动播放幻灯片
	setInterval(AutoPlay,5000);
}




