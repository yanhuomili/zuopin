//回到顶部:js方法
var time=null;
var time2=null;
//var letgo=document.getElementById("letgo");
//letgo.onclick=function(){
//	time=setInterval(function(){
//		window.scrollBy(0,-80);
//		if(document.body.scrollTop<=0){
//			clearInterval(time)
//		}
//	},20)
//}
$(function(){
	$(window).scroll(function(){
//		顶部绝对定位
		if(!($(window).scrollTop()>400)){
			$('#yincang').hide()
		}else{
			$('#yincang').show()
		}
	})
//	底部绝对定位
	$('#del').click(function(){
		$('.show-bot').hide()
		$('.tou').hide()
	})
//	回到顶部
	$(window).scroll(function(){
		if(!($(window).scrollTop()>200)){
			$('.go-top').hide()
		}else{
			$('.go-top').show()
		}
	})
//	点击回到顶部:动画方法
//	$('#letgo').click(function(){
//		$('body').animate({'scrollTop':'0'},400)
//	})
	//点击回到顶部:jQ计时器方法
	$('.go-top li').css({'transform':'rotateZ(-90deg)'})
	$('#letgo').click(function(){
		time=setInterval(function(){
			$(window).get(0).scrollBy(0,-80)
			if($(document.body).get(0).scrollTop<=0){
				clearInterval(time)
			}
		},20)
	})
//	右图小点轮播
	$('.xiaodian li').hover(function(){
		$(this).attr('id','active').siblings().attr('id','')
		$('.bannerR img').eq($(this).index()).fadeIn(300).siblings('img').fadeOut(300)
	})
	
//	左图轮播
	var num=0;
//	var time=null;
//	var dianji=false;
//	time=setInterval(run,2000)
//	function run(){
//		num++;
//		if(num>=$('.bannerL img').length){
//			num=0
//		}
//		$('.bannerL img').eq(num).show().siblings('img').hide()
//		
//	}
//	点击轮播
//	上一张：
//	$('#prev').click(function(){
//		dianji=true;
//		clearInterval(time);//点击时候停止计时器
//		num--;
//		if(num<0){
//			num=2;
//		}
//		$('.bannerL img').eq(num).show().siblings('img').hide()
//		//当点击了按钮的时候，鼠标移出去的时候启动计时器
//		$('#prev').mouseleave(function(){
//			if(dianji){
//				time=setInterval(run,2000)
//				dianji=false;
//			}
//		})
//	})
//	下一张：
//	$('#next').click(function(){
//		dianji=true;
//		clearInterval(time);//点击时候停止计时器
//		num++;
//		if(num==$('.bannerL img').length){
//			num=0;
//		}
//		$('.bannerL img').eq(num).show().siblings('img').hide()
//		//当点击了按钮的时候，鼠标移出去的时候启动计时器
//		$('#next').mouseleave(function(){
//			if(dianji){
//				time=setInterval(run,2000)
//				dianji=false;
//			}
//		})
//	})
//	无缝轮播
	var	dianji=false;
	time=setInterval(fun1,2500)//默认情况下启用的向下轮播
	function fun(){ 
		$('.bannerL>div').stop().animate({'margin-top':'-520px'},500,function(){
			$('.bannerL>div img').last().prependTo($('.bannerL>div'))
			$('.bannerL>div').css({'margin-top':'-780px'})
		})
	}
//	time2=setInterval(fun,2500)
	function fun1(){ 
		$('.bannerL>div').stop().animate({'margin-top':'-1040px'},500,function(){
			$('.bannerL>div img').first().appendTo($('.bannerL>div'))
			$('.bannerL>div').css({'margin-top':'-780px'})
		})
	}
	$('.bannerL div').html($('.bannerL div').html()+$('.bannerL div').html())
	$('.bannerL div').height('1560px')
//	向下
	$('#prev').click(function(){
		dianji=true;
		console.log(dianji)
		$('.bannerL>div').stop().animate({'margin-top':'-520px'},500,function(){
			$('.bannerL>div img').last().prependTo($('.bannerL>div'))
			$('.bannerL>div').css({'margin-top':'-780px'})
		})
		clearInterval(time)
		clearInterval(time2)
		$('#prev').mouseleave(function(){
			if(dianji==true){
				time2=setInterval(fun,2000)
				dianji=false;
			}
			
		})
		
	})
//	向上
	$('#next').click(function(){
		dianji=true;
		
		$('.bannerL>div').stop().animate({'margin-top':'-1040px'},500,function(){
			$('.bannerL>div img').first().appendTo($('.bannerL>div'))
			$('.bannerL>div').css({'margin-top':'-780px'})
		})
		clearInterval(time)
		clearInterval(time2)
		$('#next').mouseleave(function(){
			if(dianji==true){
				time=setInterval(fun1,2000)
				dianji=false;
			}
		})
	})
	
	
	
	$('.navHover').hover(function(){
		$(this).children().eq(0).show()
		$(this).addClass('aaa').css({'background':'white','border-left':'1px solid #DFDFDF',
	'border-right':'1px solid #DFDFDF','height':'36px'}).find('i').css({'transform': 'rotateZ(180deg)'})
	},function(){
		$(this).children().eq(0).hide()
		$(this).removeClass('aaa').css({'background':'#FAFAFA','border-left':'1px solid rgba(0,0,0,0)',
	'border-right':'1px solid rgba(0,0,0,0)','height':'35px'}).find('i').css({'transform': 'rotateZ(0deg)'})
	})

	
	
	
	
	
	
	
	
	
	
//	全部美食
	$('.fenleiL li').hover(function(){
		$(this).css({'background':'white'})
	},function(){
		$(this).css({'background':'#F9F9F9'})
	})
	
	
	
	
//	滑进显示定位
	$('.allFood>li').hover(function(){
		
		$(this).find('.position').stop().fadeIn(300)
	},function(){
		$(this).find('.position').stop().fadeOut(300)
	})
	
	
//	底部热门商场
	$('.clMune>li').hover(function(){
		$(this).addClass('gray').siblings().removeClass('gray')
		$('.classify').find('div').eq($(this).index()).show().siblings('div').hide()
	})
	
	
	
})
