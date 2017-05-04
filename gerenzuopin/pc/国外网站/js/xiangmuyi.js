$(function(){
	var num=0;
	$('.headerFocus>.left').click(function(){
		num++
		if(num>3){
			num=0
		}
		$('.headerFocus img').hide()
		$('.headerFocus img').eq(num).show()
		$('.headerFocus div').fadeOut()
		$('.headerFocus div').eq(num).slideDown(500)
	})
	$('.headerFocus>.right').click(function(){
		num--
		if(num<0){
			num=3
		}
		$('.headerFocus img').hide()
		$('.headerFocus img').eq(num).show()
		$('.headerFocus div').fadeOut()
		$('.headerFocus div').eq(num).slideDown(500)
	})
	
	$('.hNright>li').hover(function(){
		console.log($(this).siblings().length)
		$(this).children('ul').stop().slideDown(500).siblings().stop().children('ul').slideUp()
	},function(){
		$(this).children('ul').stop().slideUp()
	})
	var a=0;
	
	$('.goUp').click(function(){
		a++
		var b=a%2;
		console.log(b)
		$('#content').slideToggle(1500,function(){
			$('.goUp').css({'transform':'rotateZ('+(b*180)+'deg)'})
		});
		
	})
})
