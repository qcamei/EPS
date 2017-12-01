
var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset= 0;

function pullDownAction () {
	setTimeout(function () {// <-- Simulate network congestion, remove setTimeout from production!
		window.location.reload();
		myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 500);	// <-- Simulate network congestion, remove setTimeout from production!
}

function pullUpAction () {
	setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
		myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
}

function loaded() {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');	
	pullUpOffset = pullUpEl.offsetHeight;
	
	myScroll = new iScroll('wrapper', {
		useTransition: true,
		topOffset: pullDownOffset,
		//ˢ�µ�ʱ�򣬼��س�ʼ��ˢ�¸������ʾdiv
		onRefresh: function () {
			if(this.maxScrollY >-40){
				pullUpEl.style.display = 'none';
			}else{
				pullUpEl.style.display = 'block';
				if (pullDownEl.className.match('loading')) {
					pullDownEl.style.display = 'block';
					pullDownEl.className = '';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '�����ͷ�ˢ��';
				} else if (pullUpEl.className.match('loading')) {
					pullUpEl.className = '';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
				}
			}
		},
		//�϶�������λ���ж�
		onScrollMove: function () {
			if (this.y > 5 && !pullDownEl.className.match('flip')) {//�ж��Ƿ�����������5,���⣺�����λ������px
				pullDownEl.style.display = 'block';

				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '�����ͷ�ˢ��';
				this.minScrollY = 0;
			} else if (this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '�����ͷ�ˢ��';
				this.minScrollY = -pullDownOffset;
			} else if (this.maxScrollY<0 && this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.style.display = 'block';
				pullUpEl.querySelector("span").className = 'pullUpIcon';
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to load more...';
				this.maxScrollY = this.maxScrollY;
			} else if (this.maxScrollY<0 && this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.style.display = 'block';
				pullUpEl.querySelector("span").className = 'pullUpIcon';
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () {
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '������...';				
				pullDownAction();	// Execute custom function (ajax call?)
			} else if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';				
				pullUpAction();	// Execute custom function (ajax call?)
			}
		}
	});
	
	setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
