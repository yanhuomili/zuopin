var i = window.devicePixelRatio>1?1/window.devicePixelRatio:1;//查看像素比，用于页面缩放；
var meta =document.createElement("meta");
meta.name="viewport";
meta.content='width=device-width,user-scalable=no,initial-scale='+i+',minimum-scale='+i+',maximum-scale='+i;
document.getElementsByTagName("head")[0].appendChild(meta);//动态添加meta-viewport标签，设置好适配；

var html = document.getElementsByTagName("html")[0];
var iW =document.body.offsetWidth;
var scale=iW/720*100;
html.style.fontSize=scale+"px";//动态设置html根节点的font-size，用于rem布局；

window.onresize=function(){
	var html = document.getElementsByTagName("html")[0];
	var iW =document.body.offsetWidth;
	var scale=iW/720*100;
	html.style.fontSize=scale+"px";//动态设置html根节点的font-size，用于rem布局；
}
console.log(scale)

