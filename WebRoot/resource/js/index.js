/*
//检测首页是否手动进入并且是从正确的父页面进入
var referStr=document.referrer;
//var searchStr="";//生产项目域名
var searchStr="http://oatestwx.taikang.com/outoa";//测试项目域名
var parUrlStr="http://epsout.life.taikang.com/tkyc/";//eps域名字符串
function safeIn(){
		if(!(referStr&&(referStr.indexOf(searchStr)==0)||(referStr.indexOf(parUrlStr)==0))){
			window.location.href="http://epsout.life.taikang.com/tkyc/error.html";
	}
}
safeIn();
window.onload=function(){
	safeIn();
}
*/
//功能区	
var mySwiper = new Swiper('.mainSlideBox .swiper-container',{
	  slidesPerView : 'auto',
	  centeredSlides : true,
	  watchSlidesProgress: true,
	  pagination : '.mainSlideBox .swiper-pagination',
	  paginationClickable: true,
      paginationBulletRender: function (index, className) {//主功能分页图标文字
			switch (index) {
  			case 0: name='审批';break;
			  case 1: name='评标';break;
			  case 2: name='帮助';break; 
			  default: name='';
	  		}

      		return '<li class="'+className+'"><span></span><br />'+name+'</li>';
      },
      
	  onProgress: function(swiper){
	  	//alert(swiper.slides.length)
        for (var i = 0; i < swiper.slides.length; i++){
          var slide = swiper.slides[i];
          var progress = slide.progress;
		  scale = 1 - Math.min(Math.abs(progress * 0.2), 1);
         es = slide.style;
		 es.opacity = 1 - Math.min(Math.abs(progress/1.5),1);
				es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d(0,0,'+(-Math.abs(progress*250))+'px)';

        }
      },

     onSetTransition: function(swiper, speed) {
      	for (var i = 0; i < swiper.slides.length; i++) {
				es = swiper.slides[i].style;
				es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = speed + 'ms';
		}

      }
  });	
 

//bannerswiper
(function(){
	var indexbanner=new Swiper(".index-banner",{//轮播图
		loop:true, 
		autoplay:3000,
		autoplayDisableOnInteraction: false,
		pagination : '.index-banner .swiper-pagination', 
	});
})();



