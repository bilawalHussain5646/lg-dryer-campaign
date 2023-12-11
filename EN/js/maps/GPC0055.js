$(document).ready(function() {
	if(!document.querySelector('.GPC0055')) return false;
	//$(".GPC0055").find('picture source').remove(); //LGCOMSPEED-6(7th)
    $(".GPC0055").find('.inside-component .component-wrap').wrap('<div class="inside-inner"></div>');
	var component55 = {
		$el : $('.GPC0055'),
		init : function() {
			this.$el.find('.carousel-wrap.type-hero').each(function() {
				if($(this).find('.carousel-box').length>1) {
					component55.runSlick($(this));
				} else {
					$(this).addClass('active');
				}
			});
			this.$el.find('.carousel-wrap.type-etc').each(function() {
				$(this).addClass('active');
			});
			/* LGEGMC-324 20200715 add */
			this.$el.find('.carousel-wrap').each(function() {
				var $target = $(this).find('video:visible[autoplay][muted]');
				if ($target.length) {
					setTimeout(function(){
						var targetVideo = $target[0];
						(targetVideo.paused && targetVideo.muted) && targetVideo.play();
					},300);
				}
				
			});
			/* //LGEGMC-324 20200715 add */
			this.addAriaDescribedby();
			/* LGEGMC-1528 : 20210423 add */
			this.clickEvt();
			/*// LGEGMC-1528 : 20210423 add */
		},
		runSlick: function($obj) {
			var fontColor = 'black';
			if($obj.find('.carousel-box').eq(0).hasClass('text-white')) {
				fontColor = 'white';
			}
			/* LGEGMC-2964 Start */
			// At the moment of request >> when before 'runslick' event
			var playSpeed = 8000, slideDirLtr = false,
				componentThis = $obj.closest('.GPC0055'),
				commonSpeed = componentThis.data('commonPlaySpeed'),
				commonLoopSlider = componentThis.data('commonLoopSlider');

			playSpeed = typeof commonSpeed != 'undefined' && commonSpeed != null && commonSpeed != '' ? commonSpeed : 8000;
			slideDirLtr = commonLoopSlider == 'startOver' ? true : false;
			/* //LGEGMC-2964 End */
			
			/* LGEITF-520 Start */
			var _this = $obj.closest('.GPC0055')[0];
			var primaryKey = $(_this).data('primarykey');
			
			var slider = new KeenSlider('#keen-slider-'+primaryKey, {
				loop : slideDirLtr,
				//slidesPerView : 1,
				arrows : true,
				dots: true,
				autoplay: true,
				autoplaySpeed: playSpeed,
				created: function (instance) {
					instance.settings(_this, instance);
					/* LGEITF-577 Start */
					$obj.siblings().find('.slide-pause').on('click',function(e){
						e.preventDefault();
						if ($(this).hasClass('pause')) {
							$(this).removeClass('pause').addClass('play');
							$(this).text($(this).attr('data-title-play'));
							instance.autoplay(false, instance);
						} else {
							$(this).removeClass('play').addClass('pause');
							$(this).text($(this).attr('data-title-stop'));
							instance.autoplay(true, instance);
						}
					});
					/* LGEITF-577 End */
				},
				slideChanged: function(instance) {
					instance.updateClasses(_this, instance);
				},
				prevArrow: carouselOptions.bigAnglePrev, // common.js variable
				nextArrow: carouselOptions.bigAngleNext, // common.js variable
				appendDots:$obj.siblings().find('.slick-dot-wrap')[0],
				duration: 1000,
				dragStart: function(instance){
				},
				dragEnd: function(instance){
					
				},
				beforeChange: function(instance){
				},
				afterChange: function(instance){				
					var currentSlide = instance.details().absoluteSlide;
					var nextSlide = instance.details().absoluteSlide + 1;
					if($obj.find('.slick-current').hasClass('text-white')) {
						fontColor = 'white';
					} else {
						fontColor = 'black';
					}
					$obj.removeClass('slick-white').removeClass('slick-black').addClass('slick-'+fontColor);
					
					$obj.find('.carousel-box[data-slick-index='+nextSlide+'] .visual-area img[data-src]').addClass('lazyload');
					
					var $currentvideo = $obj.find('.carousel-box[data-slick-index='+currentSlide+'] .animation-area video:visible');
					if($currentvideo.length && !(!!$currentvideo.find('source').attr('src'))){
						$currentvideo.find('source').attr('src', $currentvideo.find('source').data('src'))
						$currentvideo.get(0).load()
					}
					
					var $video = $obj.find('.carousel-box[data-slick-index='+nextSlide+'] .animation-area video:visible');
					if($video.length && !(!!$video.find('source').attr('src'))){
						$video.find('source').attr('src', $video.find('source').data('src'))
						$video.get(0).load()
					}
					
					/* LGECN-214 Start */
					if(lgCggroupName == 'home' && COUNTRY_CODE.toLowerCase() == 'cn' && typeof _hmt != 'undefined'){
						var _thisGPC0055 = $obj.find('.carousel-box[data-slick-index='+currentSlide+']')
			            var banner_rank = currentSlide + 1;
			            var banner_name = _thisGPC0055.find('.title').text();
			            var banner_url = _thisGPC0055.find('a').attr('href');
			            _hmt.push(['_trackCustomEvent', 'view_banne', {
			                'banner_location': 'Homepage_Top Banner',
			                'banner_rank': banner_rank, 
			                'banner_name': banner_name,
			                'banner_url': banner_url
			            }]);
					}
					/* LGECN-214 End */
				}
				
			});
			/* LGEITF-520 End */
			$obj.addClass('active');

			$obj.addClass('slick-'+fontColor);
			
			/* LGEITF-520 remove Start */
			/*$obj.slick({
				infinite: slideDirLtr, // WA-GPC0055-01, LGEIN-554
				listStyle: true, // WA-GPC0055-01
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows : true,
				dots: true,
				//adaptiveHeight: true,
				// lazyLoad: 'ondemand',
				autoplay: false, //LGEITF-424
				autoplaySpeed: playSpeed, // LGEBR-167
				prevArrow: carouselOptions.bigAnglePrev, // common.js variable
				nextArrow: carouselOptions.bigAngleNext, // common.js variable
				//appendDots:$obj.find('.slick-indicator .slick-dot-wrap')
				appendDots:$obj.siblings().find('.slick-dot-wrap')
			});*/			
			
			/*$obj.on('beforeChange', function(event, slick, currentSlide, nextSlide){
				$obj.find('.carousel-box[data-slick-index='+nextSlide+'] .visual-area img[data-src]').addClass('lazyload');
			});
			$obj.on('afterChange', function(event, slick, currentSlide){
				if($obj.find('.slick-current').hasClass('text-white')) {
					fontColor = 'white';
				} else {
					fontColor = 'black';
				}
				$obj.removeClass('slick-white').removeClass('slick-black').addClass('slick-'+fontColor);
			});
			$obj.siblings().find('.slide-pause').addClass('active').on('click',function(e){
				e.preventDefault();
				if ($(this).hasClass('pause')) {
					$(this).removeClass('pause').addClass('play');
					$(this).text($(this).attr('data-title-play'));
					$obj.slick('slickPause');
				} else {
					$(this).removeClass('play').addClass('pause');
					$(this).text($(this).attr('data-title-stop'));
					$obj.slick('slickPlay');
				}
			});*/
			//LGEITF-424 s
			/*setTimeout(function(){
				$obj.slick('slickPlay');
			}, 8000);*/
			//LGEITF-424 e
			// $obj.find('.slide-pause').trigger('click');
			/* LGEITF-520 remove End */
		},
		addAriaDescribedby: function(){
			var _this = component55;
			var waNumber = 0;
			$(_this.$el).find('.text-area').each(function() {
				var $target;
				if($(this).find('.title') && !$(this).find('.title').is(':empty')) {
					$target = $(this).find('.title');
				}
				if($target) {
					$target.attr('id', 'waGPC0055_'+waNumber);
					$(this).find('a.btn').attr('aria-describedby', 'waGPC0055_'+waNumber);
					$(this).find('a.link-text').attr('aria-describedby', 'waGPC0055_'+waNumber);
					waNumber++;
				}
			});
		},
		/* LGEGMC-1528 : 20210423 add */ 
		clickEvt : function(){ 
			var _this = component55; 
			$(_this.$el).find('.type-hero .cta a').off('click').on('click', function(e){ 
				var $btn = $(this); 
				adobeTrackEvent('hero_click', { 
					hero_key_subject : $btn.parents('.cta').siblings('.text-block').find('.title').text(), //hero ?�목 ??
					hero_key_order : $btn.parents('li.carousel-box').data('slick-index') + 1, //hero ?�번 ??
					//hero_key_upload_date : "20210125", //hero ?�로?�된 ?�짜 ??
					hero_key_btn_order : $btn.parent('span').index() + 1, //hero ??버튼 ?�번 ??
					hero_key_btn_title : $btn.text(),  // btn ?�?��? ??
					page_event : { 
						hero_click : true 
					} 
				}); 
			}) 
			
			/* LGECN-214 Start */
			if(lgCggroupName == 'home' && COUNTRY_CODE.toLowerCase() == 'cn' && typeof _hmt != 'undefined'){
			    $('.GPC0055').eq(0).find('a, button').on('click', function(){			        
			        if($(this).hasClass('slick-prev')){
			            console.log('[Baidu trackEvent] [Homepage_Top Banner] [Click Previous]', ', $lg_cggroup : '+ $lg_cggroup);
			            _hmt.push(['_trackEvent',$lg_cggroup,'Click Previous','Homepage_Top Banner']);
			        }else if($(this).hasClass('slick-next')){
			            console.log('[Baidu trackEvent] [Homepage_Top Banner] [Click Next]', ', $lg_cggroup : '+ $lg_cggroup);
			            _hmt.push(['_trackEvent',$lg_cggroup,'Click Next','Homepage_Top Banner']);
			        }else if(!!$(this).parents('.slick-dot-wrap').length){
			            console.log('[Baidu trackEvent] [Homepage_Top Banner] [Click Index]', ', $lg_cggroup : '+ $lg_cggroup);
			            _hmt.push(['_trackEvent',$lg_cggroup,'Click Index','Homepage_Top Banner']);
			        }else if($(this).hasClass('slide-pause') && $(this).hasClass('play')){
			        	console.log('[Baidu trackEvent] [Homepage_Top Banner] [Auto View_Off]', ', $lg_cggroup : '+ $lg_cggroup);
			            _hmt.push(['_trackEvent',$lg_cggroup,'Auto View_Off','Homepage_Top Banner']);
			        }else if($(this).hasClass('slide-pause') && $(this).hasClass('pause')){
			        	console.log('[Baidu trackEvent] [Homepage_Top Banner] [Auto View_On]', ', $lg_cggroup : '+ $lg_cggroup);
			            _hmt.push(['_trackEvent',$lg_cggroup,'Auto View_On','Homepage_Top Banner']);
			        }else if(!!$(this).parents('.carousel-box').length){
			            var banner_rank = $(this).parents('.carousel-box').index() + 1;
			            var banner_name = $(this).parents('.text-area').find('.title').text();
			            var banner_url = $(this).attr('href');
			            console.log('[Baidu trackEvent] [Homepage_Top Banner] [click_banner]', ', banner_rank : '+ banner_rank, ', banner_name : '+banner_name, ', banner_url : '+banner_url);
			            _hmt.push(['_trackCustomEvent', 'click_banne', {
			                'banner_location': 'Homepage_Top Banner',
			                'banner_rank': banner_rank, 
			                'banner_name': banner_name,
			                'banner_url': banner_url
			            }]);
			        }
			    });
			    
			    $('.GPC0055:gt(0)').find('.carousel-box').find('a, button').on('click', function(){
			    	var $clickContent = $(this).parents('.text-wrap').find('.title').text()
			    	console.log('[Baidu trackEvent] [Homepage_View More] ', ', $lg_cggroup : '+ $lg_cggroup, ', $clickContent : '+$clickContent);
			    	_hmt.push(['_trackEvent',$lg_cggroup,'Click '+$clickContent,'Homepage_View More']); 
			    });
			}
			/* LGECN-214 End */
		} 
		/*// LGEGMC-1528 : 20210423 add */ 
	};
	component55.init();
	
	$('.GPC0055').each(function(){
		var $iconblock = $(this).find('.GPC0088');
		if ($iconblock.length) {
			var componentCarouselSimple = {
				$el : null,
				init : function() {
					this.$el = $iconblock;
					this.$el.find('.spec-list').not('.none-slide').not('.slick-initialized').each(function(){
						if($(this).find('.item').length>1) {
							componentCarouselSimple.runSlick($(this));
							$(this).parents('.GPC0088').addClass('bindSlick');
						}
					});
					this.$el.find('.spec-list.none-slide').each(function(){
                        if($(this).find('.item').length>2) {
                            $(this).removeClass('none-slide');
                            componentCarouselSimple.runSlick($(this));
                            $(this).parents('.GPC0088').addClass('bindSlick');
                        } else{
                            $(this).addClass('none-slide');
                        }
                    });
				},
				runSlick: function($obj) {
					$obj.slick({
						appendDots:$obj.siblings('.slick-indicator').find('.slick-dot-wrap'),
						responsive: [
							{
								breakpoint: 9999,
								settings: 'unslick'
							},
							{
								breakpoint: 767,
								settings: {
									infinite: false,
									slidesToShow: 1,
									slidesToScroll: 1,
									arrows : false,
									dots: true,
								}
							}
						]
					});
					$obj.on('afterChange', function(event, slick, currentSlide){
						//console.log('..');
					});
					$obj.on('breakpoint', function(event, slick, breakpoint) {
						// console.log('breakpoint ' +  breakpoint);
						if( breakpoint === 767 ) {
							eventStopOn();
						}
						if ( breakpoint === 9999 ) {
							$obj.off('mousedown.stop touchstart.stop');
						}
					});
					$(window).on('resize',function(){
						$obj.slick('resize');
						if( ! mql.maxSm.matches) {
							$obj.find('.item').removeAttr('role id tabindex aria-describedby aria-hidden');
						}
					}).resize();
					function eventStopOn() {
						$obj.on('mousedown.stop touchstart.stop', function (e) {
							e.stopPropagation();
						});
					}
					if( mql.maxSm.matches) {
						eventStopOn();
					}
				}
			};
			componentCarouselSimple.init();
		}
	});
	function textAreaPosition() {
		component55.$el.each(function(){
			var $carouselBox = $(this).find('.carousel-box').not('.slick-slide');
			$carouselBox.each(function(){
				var $carouselBox = $(this);
				var $conArea = $carouselBox.find('.contents-area');
				var $visualArea = $carouselBox.find('.visual-area');
				var $textAreaL = $carouselBox.find('.text-area.align-left');
				var $textAreaR = $carouselBox.find('.text-area.align-right');
				var $textArea = $carouselBox.find('.text-area');
				var $mobileTop = $textArea.is('.align-mobile-top');
				if ( $carouselBox.parents('.carousel-wrap').is('.type-hero') ){
					return false;
				}
				if( $textAreaL.length || $textAreaR.length ) {
					if( mql.minMd.matches ) {
						var $textAreaClone = $textArea.clone(true, true);
						$textArea.remove();
						$conArea.prepend($textAreaClone);
						var $con = $conArea.detach();
						$carouselBox.append($con);
						//console.log('pc');
					}
					if ( mql.maxSm.matches ) {
						var $textAreaClone = $textArea.clone(true, true);
						$textArea.remove();
						if ( $mobileTop ){
							$carouselBox.prepend($textAreaClone);
						} else {
							$carouselBox.append($textAreaClone);
						}
						var $con = $conArea.detach();
						$visualArea.append($con);
						//console.log('mobile');
					}
				}
			});
		});
	}
	$(window).on('load resize',textAreaPosition).trigger('resize');	
	/* LGEPA-508, LGCOMSPEED-6 Start */
	var timer = null;
	function countDownTimer() {

		if ($(document).countdown === undefined) {
			timer = setTimeout(countDownTimer, 100); 
		} else {
			if(timer !== null) clearTimeout(timer);
			$(document).find('.GPC0055 .countdown-box .count-timer-box').each(function() {
				var $count_target = $(this);
				var $countdate = $count_target.data('countdown-date');
				/* LGEPA-789 Start */
				var $timeUtc = $count_target.data('time-utc');
				if($timeUtc !=='' && typeof $timeUtc !=='undefined'){ //LGEITF-914
					if(new Date().getTimezoneOffset()*60000 == $timeUtc){
						var iso = new Date(new Date($countdate).getTime() -540*60000)/1;
						var setDate =new Date(iso - new Date().getTimezoneOffset() * 60000);
					}else{
						var iso = new Date(new Date($countdate).getTime()- $timeUtc -540*60000)/1;
						var setDate =new Date(iso);
					} 
					var year = setDate.getFullYear();
					var month = ('0' + (setDate.getMonth() + 1)).slice(-2);
					var day = ('0' + setDate.getDate()).slice(-2);
					var hours = ('0' + setDate.getHours()).slice(-2); 
					var minutes = ('0' + setDate.getMinutes()).slice(-2);
		
					var timeString = hours + ':' + minutes;
					var dateString = year + '/' + month  + '/' + day;
					var setCountdownDate = dateString+' '+timeString;
					$count_target.attr('data-countdown-date',setCountdownDate);
					$count_target.data('countdown-date',setCountdownDate); 
				}
				/* LGEPA-789 End */
				/* LGEDE-629 Start */
				var labelsArr = ['Years', 'Months', 'Weeks', 'Days', 'Hours', 'Minutes', 'Seconds'];
				var labels1Arr = ['Year', 'Month', 'Week', 'Day', 'Hour', 'Minute', 'Second'];
				if($count_target.data('countdown-labels') && $count_target.data('countdown-labels') != 'component-countdown-labels'){
					labelsArr = $count_target.data('countdown-labels').split(',');
				}
				if($count_target.data('countdown-label-single') && $count_target.data('countdown-label-single') != 'component-countdown-label-single'){
					labels1Arr = $count_target.data('countdown-label-single').split(',');
				}
				$countdate = $count_target.data('countdown-date');
				$count_target.countdown({
					labels: labelsArr, 
					labels1: labels1Arr, 
					until: new Date($countdate),
					//timezone: +9, // seoul 기�?
					format: 'DHMS',
					padZeroes: true, // 00 ?�시
				});
				/* LGEDE-629 End */
			});
		}

	}
	if(!!document.querySelector('.GPC0055 .countdown-box')) countDownTimer();
	/* LGEPA-508, LGCOMSPEED-6 End */
	
	/* LGEITF-520 Start */
	$(window).resize(function(){
	    var $video = component55.$el.find('.carousel-box.slick-current .animation-area video:visible'); 
		if($video.length && !(!!$video.find('source').attr('src'))){
			$video.find('source').attr('src', $video.find('source').data('src'))				
			$video.get(0).load()
		}
	});
	/* LGEITF-520 End */
});

/* LGCOMSPEED-8 Start */
$(window).on('load', function() {
	$('.GPC0055').each(function() {
		$(this).find("> .carousel-wrap").css('min-height', 'auto');
	})
})

window.addEventListener('DOMContentLoaded', function() {
    function checkLoadImageInComponent(component) {
		var img = component.querySelector('.visual-area img')
		var wrapper = component.querySelector('.carousel-wrap')
		if (img) {
			if (img.complete) {
				if (img.hasAttribute('data-src') && !img.hasAttribute('src')) {
					$(img).on('load', function() {
						if (wrapper) {
							wrapper.style.minHeight = 'auto'
						}    
					})
				} else {
					if (wrapper) {
						wrapper.style.minHeight = 'auto'
					}    
				}
			} else {
				console.log('first image not complete')
				img.onload = function() {
					if (wrapper) {
						wrapper.style.minHeight = 'auto'
					}
				}
			}
			
		} else {
			if (wrapper) {
				wrapper.style.minHeight = 'auto'
			}
		}
	}
	document.querySelectorAll('.GPC0055').forEach(function(component) {
		checkLoadImageInComponent(component)
	})
})
/* LGCOMSPEED-8 End */