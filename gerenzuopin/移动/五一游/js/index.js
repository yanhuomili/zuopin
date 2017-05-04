function id(obj) {
    return document.querySelector('#'+obj);
}
function bind(obj, ev, fn) { 
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function() {
            fn.call(obj);
        });
    }
}
function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}
function addClass(obj, sClass) { 
    var aClass = obj.className.split(' '); 
    if (!obj.className) {
        obj.className = sClass;
        return;
    }
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return;
    }
    obj.className += ' ' + sClass;
}

function removeClass(obj, sClass) { 
    var aClass = obj.className.split(' ');
    if (!obj.className) return;
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) {
            aClass.splice(i, 1);
            obj.className = aClass.join(' ');
            break;
        }
    }
}
//进来的画面
function fnWelcome(){
	var we = id('welcome');
	var index = id('index');
	var arr=['img/tree.jpg','img/title.png','img/title2.png','img/logo.png','../img/cloud.png','../img/shake.png']
	var num = 0;
	var oldTime = new Date().getTime();
	var oIamge = true;
	var oTime = false;
	var timer = 0;
	addClass(index,'show');
	//判断资源是否加载完
//	for(var i=0;i<arr.length;i++){
//		var imgs = new Image();
//		imgs.src = arr[i];
//		imgs.onload = function(){
//			num++;
//			if(num==arr.length){
//				oIamge = true;
//			}
//		}
//	}
	
	//判断资源加载完后6秒就跳到下一屏
	timer = setInterval(function(){
		if(new Date().getTime()-oldTime >=6000){
			oTime = true;
		}
		
		if(oIamge&&oTime){
			clearInterval(timer);
			we.style.opacity=0;
		}
	},100)
	
	bind(we, 'transitionend', end);
	bind(we, 'WebkitTransitionEnd', end);
	function end(){
		removeClass(we, 'show');
		fnTab();
	}
}
//轮播图
function fnTab(){
	var pic = id('pic');
	var list = pic.getElementsByTagName('ul')[0];
	var lis = list.getElementsByTagName('li');
	var oAs = pic.getElementsByTagName('a');
	var num=0;
	var iW = view().w;
	var iNow = 0;
	var startX = 0;
	var endX = 0;
	var timer = 0;
	//对景区评价
	fnScore();
	//自动轮播
	auto();
	function auto(){
		timer=setInterval(function(){
			num++;
			num = num%lis.length;
			tab();
		},2000)
	}
	
	
	//对轮播图绑定三个事件
	bind(list,'touchstart',start);
	bind(list,"touchmove",move);
	bind(list,'touchend',end);
	
	function start(ev){
		list.style.transition='none';
		ev = ev.changedTouches[0];
		clearInterval(timer);
		startX = ev.pageX;
		endX = iNow;
	}
	function move(ev){
		ev = ev.changedTouches[0];
		var disx = ev.pageX - startX;
		if(disx>0){
			//向右滑轮播图的时候阻止浏览器默认行为，否则会推出页面
			$(document).on('touchmove',def);
		}
		iNow = disx + endX;
		console.log(iNow)
		list.style.webkitTransform =list.style.transform ='translateX('+iNow+'px)';
	}
	function end(ev){
		ev = ev.changedTouches[0];
		num = iNow/iW;
		num = -Math.round(num);
		if(num<=0){
			num=0;
		}
		if(num>=lis.length-1){
			num=lis.length-1;
		}
		tab();
		auto();
		$(document).off('touchmove')
		
		
	}
	function tab(){
		iNow = -num*iW;
		list.style.transition='.5s';
		list.style.webkitTransform =list.style.transform ='translateX('+iNow+'px)';
		
		for(var i=0;i<oAs.length;i++){
			removeClass(oAs[i], 'active')
		}
		addClass(oAs[num],'active');
		
	}
	function def(ev){
		preventDefault(ev);
	}
	
	
	
	
}
//阻止默认事件
function preventDefault (ev) {
	var ev = ev || event;
	if (ev.preventDefault) {
		ev.preventDefault()
	} else{
		ev.returnValue = false;
	}
}
function fnScore(){
	var index = id('index');
	var btn = id('btn');
	var score = index.getElementsByClassName('score')[0];
	var info = index.getElementsByClassName('info')[0];
	var tags = index.getElementsByClassName('tags')[0];
	var lis = score.getElementsByTagName('li');
	var arr = ['非常糟糕','没有想象中的差','一般','良好','棒极了']
	
	for(var i=0;i<lis.length;i++){
		getScore(lis[i])
	}
	
	function getScore(obj){
		var oAs = obj.getElementsByTagName('a');
		var oInput = obj.getElementsByTagName('input')[0];
		for(var i=0;i<oAs.length;i++){
			oAs[i].index = i;
			bind(oAs[i],'touchend',function(){
				for(var i=0;i<oAs.length;i++){
					if(i<=this.index){
						oAs[i].style.background="url(img/star.png)no-repeat 0 0";
					}else{
						oAs[i].style.background="url(img/star.png)no-repeat -38px 0";
					}
				}
				oInput.value = arr[this.index];
				fnBtn();//点击了评分就把按钮的颜色变深
			})
		}
		
	}
	
	bind(btn,'touchend',function(){
		var b = allInput();
		var t = allTags();
		if(b){
			if(t){
				//alert('可以提交')
				Mask();
			}else{
				fnInfo(info,'给景区添加标签')
				
			}
			
		}else{
			fnInfo(info,'给景区评分')
		}
		
	})
	
	function fnInfo(obj,value){
		obj.innerHTML = value;
		obj.style.WebkitTransform = obj.style.WebkitTransform ='translateY(-40px)';
		obj.style.opacity = 1;
		obj.style.WebkitTransform = obj.style.WebkitTransform = 'scale(1)';
		setTimeout(function(){
			obj.style.WebkitTransform = obj.style.WebkitTransform ='translateY(0px)';
			obj.style.opacity = 0;
			obj.style.WebkitTransform = obj.style.WebkitTransform = 'scale(0)';
		},2000)
	}
	
	function allTags(){
		var aInput = tags.getElementsByTagName('input');
		for(var i=0;i<aInput.length;i++){
			if(aInput[i].checked){
				return true;
			}
		}
		return false;
	}
	function allInput(){
		var aInput = score.getElementsByTagName('input');
		console.log(aInput)
		for(var i=0;i<aInput.length;i++){
			if(aInput[i].value == '0'){
				return false;
			}
		}
		return true;
	}
	
	
	function fnBtn(){
		removeClass(btn,'btn');
		addClass(btn,'submit');
	}
}


function Mask(){
	var index = id('index');
	var mask = id('Mask');
	var news = id('news');
	
	addClass(mask,'show');
	index.style.filter=index.style.webkitFilter="blur(5px)";
	setTimeout(function(){
		mask.style.opacity=1;
		mask.style.zIndex=11;
	},15)
	
	setTimeout(function(){
		removeClass(mask,'show');
		removeClass(index,'show');
		index.style.filter=index.style.webkitFilter="blur(0px)";
		mask.style.opacity=0;
		mask.style.zIndex=2;
		addClass(news,'show');
		fnNews();
	},3000)
}

//上传资料
function fnNews(){
	var news = id('news');
	var form = id('form');
	var labels = news.getElementsByTagName('label');
	var aInput = news.getElementsByTagName('input');
	var btn = id('btn1');
	addClass(form,'show');
	
	bind(btn,'touchend',function(){
		if(aInput[0].files[0]){
			var type1 = aInput[0].files[0].type.split('/')[0];
		}
		if(aInput[1].files[0]){
			var type2 = aInput[1].files[0].type.split('/')[0];
			console.log(aInput[1].files[0])
		}
		
		if(type1 == 'video'){
			//alert('视频')
		}
		if(type2 == 'image'){
			//alert('照片')
		}
	
		if(type1||type2){
			//alert('可以跳转')
			removeClass(news,'show');
			addClass(form,'show');
			fnForm();
			aInput[0].value='';
			aInput[1].value='';
		}
	})
	
}

function fnForm(){
	var form = id('form');
	var btn = id('btn2');
	var Reset = id('reset');
	var onoff = false;
	var labels = form.getElementsByTagName('label');
	
	for(var i=0;i<labels.length;i++){
		bind(labels[i],'touchend',function(){
			addClass(btn,'submit');
			onoff = true;
		})
	}
	bind(btn,'touchend',function(){
		if(onoff){
			
			//alert('可以提交')
			removeClass(form,"show");
			addClass(Reset,'show');
			fnReset();
		}
	})
	
}
//重新评价
function fnReset(){
	var Reset = id('reset');
	var btn = id('btn3');
	var index = id('index');
	
	bind(btn,'touchend',function(){
		removeClass(Reset,'show');
		addClass(index,'show');
	})
}











