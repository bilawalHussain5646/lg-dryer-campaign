$(document).ready(function() {
	if(!document.querySelector('.GPC0063')) return false;

	var $obj = $('.GPC0063');
	var waNumber = 0;
	$obj.each(function() {
		var $target;
		if($(this).find('.title') && !$(this).find('.title').is(':empty')) {
			$target = $(this).find('.title');
		}
		if($target) {
			$target.attr('id', 'waGPC0063_'+waNumber);
			$(this).find('a.btn').attr('aria-describedby', 'waGPC0063_'+waNumber);
			$(this).find('a.link-text').attr('aria-describedby', 'waGPC0063_'+waNumber);
			waNumber++;
		}
	});
		
	/* LGEGMC-2177 End */
	$obj.find(".cta a").on("click", function (e) {
		var $this = $(this);
		target="_blank"
		if(!$this.attr('href').startsWith('#') || $this.attr('target') == '_blank') return;
				
		e.preventDefault();
		
		var screenWidth = $(window).width();
		var $tgTabPanel = $($this.attr("href"));
		var imgLoader = null;
		var loadCount = 0;
		var loaded = 0;
		var targetImgCount = 0;
		var checkImgNum = 0;
		var imgConuntChecker = function(){				
			var cntLoad = 0,
			cntLoaded = 0;
			$('.component').each(function() {
				if($(this).find('.slick-initialized ').length==0) {
					cntLoad = cntLoad + $(this).find('img.lazyloaded').length;
					cntLoaded = cntLoaded + $(this).find('img[data-loaded=true]').length;
				} else {
					cntLoad = cntLoad + parseInt($(this).find('.slick-active').length);
					cntLoaded = cntLoaded + parseInt($(this).find('.slick-active').length);
				}
			});
			checkImgNum ++;
			if((cntLoad <= cntLoaded) || checkImgNum >= 20) { // Maximum of 2 seconds
				return true;
			} else {
				return false;
			}
		};

		var getScrollPostion = function(tg){
			var GPC0117height = $(".floating-wrap").closest(".component-wrap").outerHeight(true) ? $(".floating-wrap").closest(".component-wrap").outerHeight(true) : 0;
			var offsetTop = Math.round(tg.offset().top - GPC0117height);
			if( 
				tg.hasClass("iw_placeholder") || 
				tg.find(".iw_placeholder").length > 0 || 
				tg.closest(".iw_placeholder").length > 0 
			){
				
				offsetTop = offsetTop + 1;
				
			}
			return offsetTop;
		};

		var pre_event = function(){
			$('img.lazyload:visible').each(function () {
				var srcStr = $(this).attr('data-src');
				if($.trim(srcStr) !== ''){
					$(this).attr('src', srcStr).removeClass('lazyload').addClass('lazyloaded');
				}
			});
		}

		var excute_event = function(destination){
			setTimeout(function(){
				scrolling(destination);					
			}, 100);
		}
		
		

		if ($('img.lazyload:visible').not('[data-src=""]').length > 0) {
			// lazyload unlock
			pre_event();
			imgLoader = setInterval(function(){
				var loadComplete = imgConuntChecker();
				if(loadComplete){
					clearInterval(imgLoader);
					excute_event(getScrollPostion($tgTabPanel));
				}
			}, 100);
		} else {
			excute_event(getScrollPostion($tgTabPanel));
		}
	});
	
	// desktop event
	function scrolling(pos) {
		$('html, body').animate({
			scrollTop: pos
		},{duration:500});
	}
	/* LGEGMC-2177 Start */
});