/*
//�����ҳ�Ƿ��ֶ����벢���Ǵ���ȷ�ĸ�ҳ�����
var referStr=document.referrer;
//var searchStr="";//������Ŀ����
var searchStr="http://oatestwx.taikang.com/outoa";//������Ŀ����
var parUrlStr="http://epsout.life.taikang.com/tkyc/";//eps�����ַ���
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
//������	
var mySwiper = new Swiper('.mainSlideBox .swiper-container',{
	  slidesPerView : 'auto',
	  centeredSlides : true,
	  watchSlidesProgress: true,
	  pagination : '.mainSlideBox .swiper-pagination',
	  paginationClickable: true,
      paginationBulletRender: function (index, className) {//�����ܷ�ҳͼ������
			switch (index) {
  			case 0: name='����';break;
			  case 1: name='����';break;
			  case 2: name='����';break; 
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
	var indexbanner=new Swiper(".index-banner",{//�ֲ�ͼ
		loop:true, 
		autoplay:3000,
		autoplayDisableOnInteraction: false,
		pagination : '.index-banner .swiper-pagination', 
	});
})();



