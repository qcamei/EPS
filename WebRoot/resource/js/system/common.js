'use strict';
FastClick.attach(document.body);//生效fastclick

//var currentYhbh = 'ff80808136c556cb0136c56865d04cba';//当前用户//ff80808136c556cb0136c568d3295eb6/ff80808136c556cb0136c56865d04cba
//var connectPath = 'http://eps.taikang.com/epstk';//正式系统后台访问路径64.11:8080
//var currentYhbh = 'ff80808134d683bc0134e42d4c5f013c';//当前用户//ff80808136c556cb0136c568d3295eb6/ff80808136c556cb0136c56865d04cba//徐建国ff80808134d683bc0134e42d4c5f013c
var connectPath ='http://10.136.24.50:8080/eps-tkyc';//测试：http://epsout.life.taikang.com/epstk//佳杰：http://10.136.89.75:8888/eps-tkyc//'http://10.136.89.207:8080/eps-tkyc';//正式系统后台访问路径64.11:8080
var indexHref = 'http://tkvc.eps.group.taikang.com/tkyc/index.html';//正式系统H5主页路径64.11:8081
var iLoadJson={};
iLoadJson.iLoad0=0;//页面加载之前状态，加载成功后为1

//var sessionCzyid=sessionStorage.getItem('czyid');
//sessionStorage.setItem('czyid',currentYhbh);
$(function(){
	setTimeout(function(){
		if(iLoadJson.iLoad0==0){
			$('.loader').hide();
			layer.open({
				type: 1,
				area: ['200px', 'auto'], //宽高
				content: '<p style="line-height:80px;text-align:center;" onclick="location.reload();">加载失败，点击重试</p>'
			});
		}
	},15000)
});
//上下滑动下拉刷新
var stretchFn=function(){
	var $preLoad=$('.preloader')
	var swiper = new Swiper('.stretch-container', {
	    scrollbar: '.swiper-scrollbar',
	    direction: 'vertical',
	    slidesPerView: 'auto',
	    mousewheelControl: true,
	    freeMode: true,
	    onTouchMove:function(swiper){
	    	$preLoad.show();
	    	if(swiper.translate>50){
		    	$preLoad.html('下拉刷新');
	    	}
	    	if(swiper.translate>100){
	    		$preLoad.html('松手刷新');
	    	}
	    },
	    onTouchEnd:function(swiper){
	    	if(swiper.translate>100){
		    	$preLoad.html('刷新中');
		    	setTimeout(function(){
		    		location.reload();
		    	},800);
	    	}else{
	    		$preLoad.hide();
	    	}
	    }
	});
}
