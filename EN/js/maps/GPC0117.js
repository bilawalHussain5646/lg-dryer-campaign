$(document).ready(function() {
	if(!document.querySelector('.GPC0117')) return false;

	// navigation ui
	var tabNavi = {
		el: $(".floating-wrap"),
		containerHeight: $(".floating-wrap").closest(".component-wrap").outerHeight(true),
		offsetTop: null,
		bottomCut: null,
		winScrTop: $(window).scrollTop(),
		pageScrHeight : $(document).height(), 
		tabActive: false,
		tabActiveIndex: NaN,
		stickyClass: "fixed",
		// 20200601 START 박지영 - id 입력 대신 URL도 추가할 수 있도록 수정
		isHaveTabPanel: null,
		// 20200601 END
		init: function () {
			var activate = function(){
				// 20200601 START 박지영 - 링크 추가할 수 있도록 수정
				var signal = false;
				$.each(tabNavi.el.find('.tab'), function(idx, elem){
					var tgValue = $(elem).attr("href");
					if(tgValue.indexOf('#') >= 0) {
						if( tgValue.length > 0 ){
							signal = true;
						}
					}
				});
				// 20200601 END
				return signal;
			}

			// 20200601 START 박지영 - id 입력 대신 URL도 추가할 수 있도록 수정
			tabNavi.isHaveTabPanel = activate();
			//tabNavi.isHaveTabPanel = false; // for test

			if(tabNavi.isHaveTabPanel){
				this.register(this.el);
				this.panelMatch(this.winScrTop);
				mql.maxSm.addListener(this.reset);
			}else{
				this.register(this.el);
				var currURL = window.location.href;
				$.each(tabNavi.el.find('.tab'), function(idx, elem){
					var tgValue = $(elem).attr("href").replace('./', '').replace('../', '');
					if(currURL.endsWith(tgValue)) {// CNXSUPPORT-1534
						$(elem).addClass('active');
						$(elem).closest("li").addClass('active');// LGEGMC-1940
						var menuTxt = $(elem).text();
						tabNavi.el.find('.anchor-floating-menu .extra-area .title-mob').text(menuTxt);
					}
				});
				return;
			}
			// 20200601 END
		},
		reset : function(e){
			if (e.matches) {
				tabNavi.containerHeight = tabNavi.el.height();
				return;
			} else {
				tabNavi.containerHeight = tabNavi.el.height();

				tabNavi.tabActive = false;
				tabNavi.el.find("ul").removeClass("active")
				.siblings(".extra-area").find(".btn-drop-menu-mob").attr("aria-expanded", false);
			}
		},
		register: function (elem) {
			var _t = this; 
			var clickCount = 0;
			
			elem.find(".btn-drop-menu-mob").on("click", function () {
				_t.folding();
			});
			// 20200601 START 박지영 - 링크 추가할 수 있도록 수정, 20210908 LGEGMC-2233 김건휘 START
			elem.find("ul a:not(.linktab), a.title-mob").on("click", function (e) {
			// 20200601 END, 20210908 LGEGMC-2233 김건휘 END
				e.preventDefault();

				var screenWidth = $(window).width();
				
				var $this = $(this);
				var $this_idx = $this.parent("li").index();
				var $tgTabPanel = $($this.attr("href"));

				/* LGEGMC-2368 Start */
				if(!(!!$tgTabPanel.length)){
					_t.scrolling(0);
					return;
				}
				/* LGEGMC-2368 End */
				var imgLoader = null;
				var loadCount = 0;
				var loaded = 0;
				var targetImgCount = 0;
				// LGEITF-428 start
				var checkImgNum = 0;
				var imgConuntChecker = function(){
//					targetImgCount = $('img.lazyloaded').length - $('.slick-active').length;
//					loaded = $('img[data-loaded="true"]').length + $('.slick-active:visible').not('.slick-cloned').length;
//					loadCount++;
//					// console.log(loadCount, loaded, targetImgCount);
//					if ((targetImgCount - 0) <= loaded || loadCount >= 20 || clickCount > 2) {	// clear by over count, 1000ms.
//						return true;
//					} else {
//						return false;
//					}
					
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
					//console.log(cntLoad, cntLoaded, checkImgNum);
					if((cntLoad <= cntLoaded) || checkImgNum >= 20) { // Maximum of 2 seconds
						return true;
					} else {
						return false;
					}
				};
				// LGEITF-428 end

				var getScrollPostion = function(tg, index){
					var offsetTop = Math.round(tg.offset().top - tabNavi.containerHeight);
					if( 
						tg.hasClass("iw_placeholder") || 
						tg.find(".iw_placeholder").length > 0 || 
						tg.closest(".iw_placeholder").length > 0 
					){
						if( index === 0){
							offsetTop = offsetTop + 2;
						} else {
							offsetTop = offsetTop + 1;
						}
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
						_t.scrolling(destination);
						if (screenWidth < 768) {
							/*20210908 LGEGMC-2233 START */
							if (_t.el.find(".btn-drop-menu-mob").attr("aria-expanded") == "true"){
								_t.el.find(".btn-drop-menu-mob").attr("aria-expanded", false);
								_t.el.find("ul").removeClass("active");
								_t.tabActive = false;
							}
							/*20210908 LGEGMC-2233 END */
						}
					}, 100);
				}

				if ($('img.lazyload:visible').not('[data-src=""]').length > 0) {
					// lazyload unlock
					// console.log("non-loading: ", $('img.lazyload:visible').not('[data-src=""]'));
					pre_event();
					imgLoader = setInterval(function(){
						var loadComplete = imgConuntChecker();
						if(loadComplete){
							clearInterval(imgLoader);
							excute_event(getScrollPostion($tgTabPanel, $this_idx));
						}
					}, 100); // LGEITF-428
				} else {
					excute_event(getScrollPostion($tgTabPanel, $this_idx));
				}
				clickCount++;
				// console.log(clickCount);
			});
			$(window).on("resize", function () {
				var pageHeight = $(document).height();
				if(pageHeight !== tabNavi.pageScrHeight){
					// console.log("change scr height");
					clickCount = 0;	// refresh as resize;
					tabNavi.pageScrHeight = pageHeight;
					return tabNavi.pageScrHeight;
				}
			});
			
			$(window).on("scroll", function () {
				// controlStickyElements 는 common.js 참고 - 박지영
				var defaultPos = parseInt(controlStickyElements.pos.GPC0117);
				_t.winScrTop = $(this).scrollTop() + defaultPos; 
				_t.offsetTop = _t.el.parent().offset().top;
				_t.bottomCut = parseInt($('.footer-box').offset().top);

				// 20200601 START 박지영 - id 입력 대신 URL도 추가할 수 있도록 수정, LGEGMC-1940 start
				if(tabNavi.isHaveTabPanel){
					_t.el.find("ul").find("a").removeClass("active").attr("aria-selected", false);
					_t.el.find("ul").find("li").removeClass("active");
				}
				// 20200601, LGEGMC-1940 END

				if (_t.winScrTop >= _t.offsetTop && _t.winScrTop < _t.bottomCut - _t.containerHeight) {	// contents
					_t.el.addClass(_t.stickyClass);
					if(parseInt(_t.el.css('top') )< defaultPos) _t.el.css("top", defaultPos);
					// 20220322 START 박지영 - Cookie가 존재하는 경우, floating 되는 순간 sticky-cookie-bg가 보이도록 수정
					if($('.sticky-cookie-bg').length > 0) $('.sticky-cookie-bg').show();
					// console.log(_t.el.css('top') < defaultPos, _t.el.css('top'), defaultPos);
					/* GPC0117 20211110 s*/
					// top 값은 comon.js의 controlStickyElements 에서 처리함 - PJTQUICKWIN 박지영
					// if(typeof ePrivacyCookies=='undefined' || ePrivacyCookies.get('LGCOM_IMPROVEMENTS')) {
					// 	if($(".eprivacy-cookie").hasClass('cookie-eu') && $('.cookie-banner').hasClass('ready')){
					// 		if($('.eprivacy-cookie').css('display') == 'none' ){
					// 			$(".cookie-eu-get-height").css("height","0");
					// 			_t.el.css("top","0");
					// 		} else{
					// 			_t.el.css("top",$(".cookie-eu-get-height").height());
					// 		}
					// 	} else {
					// 		_t.el.css("top","0");
					// 	}
					// }
					/* GPC0117 20211110 e*/
					// 20200601 START 박지영 - id 입력 대신 URL도 추가할 수 있도록 수정
					if(tabNavi.isHaveTabPanel) _t.panelMatch(_t.winScrTop);
					// 20200601 END
				} else if (_t.winScrTop >= _t.bottomCut - _t.containerHeight){	// footer
					_t.el.removeClass(_t.stickyClass);
				} else {
					_t.el.removeClass(_t.stickyClass);
				}
			})
		},
		// common event
		panelMatch: function (windowScrollTop) {
			// 20200601 START 박지영 - 링크 추가할 수 있도록 수정
			var _this = tabNavi.el.find("ul").find("a:not(.linktab)");
			// 20200601 END
			$.each(_this, function (i) {
				var tabMenuName = $(this).children("span").text();
				//LGEGMC-1576
				var selectTabMenuName = tabNavi.el.find(".menuName").val();
				var matchTarget = $(this).attr("href");
				/* LGEGMC-2368 Start */
				var matchTargetTop = 0;
				if(!!$(matchTarget).length) matchTargetTop = Math.round($(matchTarget).offset().top - tabNavi.containerHeight);
				/* LGEGMC-2368 End */

				if (windowScrollTop >= tabNavi.offsetTop && windowScrollTop >= matchTargetTop) {
					tabNavi.tabActiveIndex = i;
					_this.removeClass("active").attr("aria-selected", false);
					_this.closest("li").removeClass("active");// LGEGMC-1940
					_this.eq(tabNavi.tabActiveIndex).addClass("active").attr("aria-selected", true);
					_this.eq(tabNavi.tabActiveIndex).closest("li").addClass("active");// LGEGMC-1940
					if (tabNavi.el.hasClass(tabNavi.stickyClass)) {
						//LGEGMC-1576
						if(selectTabMenuName != undefined){
						tabNavi.el.find(".title-mob").text(selectTabMenuName);
						} else{
							//LGEGMC-2233 210902 START
							//if(tabNavi.tabActiveIndex == 0){								
							//tabNavi.el.find('li').eq(0).addClass('is_current');								
							//}
							//LGEGMC-2233 210902 END
						tabNavi.el.find(".title-mob").text(tabMenuName);
						//LGEGMC-2233 210902 START
						tabNavi.el.find(".title-mob").attr("href", matchTarget);
						//LGEGMC-2233 210902 END
						}
					} else {
						return;
					}
				} else {
					return;
				}
			})
		},
		// desktop event
		scrolling: function (pos) {
			$('html, body').animate({
				scrollTop: pos
			//}, "fast");
			},{duration:500});// LGEITF-428
		},
		// mobile event
		folding: function () {
			if (this.tabActive) {
				this.el.find(".btn-drop-menu-mob").attr("aria-expanded", false);
				this.el.find("ul").removeClass("active");
				this.tabActive = false;
			} else {
				this.el.find(".btn-drop-menu-mob").attr("aria-expanded", true);
				this.el.find("ul").addClass("active");
				this.tabActive = true;
			}
		}
	}
	tabNavi.init();

	// Make it easier to find ID values ​​in the teamsite edit screen
	window.Clipboard = (function (window, document, navigator) {
		var textArea,
			copy;

		function isOS() {
			return navigator.userAgent.match(/ipad|iphone/i);
		}

		function createTextArea(text) {
			textArea = document.createElement('textArea');
			textArea.value = text;
			textArea.style.position = 'fixed';
			textArea.style.top = '0';
			textArea.style.left = '0';
			textArea.style.opacity = '0.0001';
			textArea.style.width = '100%';
			textArea.style.height = '100%';
			textArea.style.padding = '0';
			textArea.style.pointerEvents = "none";
			textArea.style.fontSize = '16px';
			document.body.appendChild(textArea);
		}

		function selectText() {
			var range,
				selection;

			if (isOS()) {
				range = document.createRange();
				range.selectNodeContents(textArea);
				selection = window.getSelection();
				selection.removeAllRanges();
				selection.addRange(range);
				textArea.setSelectionRange(0, 999999);
			} else {
				textArea.select();
			}
		}

		function copyToClipboard() {
			document.execCommand('copy');
			document.body.removeChild(textArea);
		}

		copy = function (text) {
			createTextArea(text);
			selectText();
			copyToClipboard();
		};
		return {
			copy: copy
		};
	})(window, document, navigator);
	if($('body').hasClass('iw-fullscreen-edit')) {
		$('.component-wrap').each(function() {
			$obj = $(this).parent();
			if($obj.is('.iw_component')) {
				var iwid = $obj.attr('id');
				if(iwid) {
					$obj.find('.component-wrap').append('<a href="#" class="btn copy-myid" style="position:absolute;left:0;top:0;background:#d9ffde;opacity:0.5;text-transform:none;color:#000;z-index:1000;">'+iwid+'</a>');
				}
			}
		});
		$('body').on('click', 'a.copy-myid', function(e) {
			e.preventDefault();
			var iwid = $(this).text();
			Clipboard.copy(iwid);
			$(this).append('<div id="copyedText" style="font-size:13px;">Copied!</div>');
			setTimeout(function() {
				$('#copyedText').remove();
			}, 1500);
		});
	};
});