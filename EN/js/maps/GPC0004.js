// LGEITF-811 .GPC0004 => GPC0004[name="GPC0004MainPage"] GPC0004에서만 작동하도록 변경
var GPC0004;
var vipCheckGPC0004;
$(document).ready(function() {
	if(!document.querySelector('.GPC0004')) return false;
	
	var $obj=$('.GPC0004[name="GPC0004MainPage"]'); 
		
	GPC0004 = {
		el: null,
		tab : null,
		opt: {
			infinite: false,
			slidesToShow: 4,
			slidesToScroll: 4,
			arrows : true,
			dots: true,
			listStyle: true, // WA-GPC0004-02 - List
			responsive: [{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					arrows : true
				}
			}, {
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					arrows : false
				}
			}],
			prevArrow: carouselOptions.bigAnglePrev, // common.js variable
			nextArrow: carouselOptions.bigAngleNext // common.js variable
		},
		template: null,
		priceTemplateGPC004: null, //LGEITF-604
		init: function(){
			var _this = GPC0004;
			var els = document.querySelectorAll('.GPC0004[name="GPC0004MainPage"]');
			/* LGEITF-604 Start */
			_this.priceTemplateGPC004 = $('#priceSyncTemplateGPC0004').clone().html();
			$('#priceSyncTemplateGPC0004').remove();
			/* //LGEITF-604 End */

			for (var i = 0; i < els.length; i++) {
				_this.el = els[i];
				_this.tab = _this.el.querySelector('.tabs-type-liner');
				if($(_this.el).find('.contents-template').length>0) _this.template = $(_this.el).find('.contents-template').clone();
				$(_this.el).find('.contents-template').remove();

				// get Recently products
				var _recentlyModelsList = _this.el.querySelector('input[name="recentlyModelsList"]');
				if(_recentlyModelsList) {
					var $nav = $('.navigation');
					var list = ($nav && $nav.hasClass('b2b')) ? getCookie("LG5_B2B_RecentlyView") : getCookie("LG5_RecentlyView"),
						$content = $(_recentlyModelsList).closest(".tabs-cont");
					_recentlyModelsList.value = list ? list : "";

					if(typeof ePrivacyCookies=='undefined' || ePrivacyCookies.get('LGCOM_IMPROVEMENTS')) {
						if(list == undefined) {
							$content.find("form").remove();
						}else {
							$content.find(".no-content").remove();
						}
					} else {
						ePrivacyCookies.view('load', '', $content);
					}

				}

				_this.addEvent();

				if(_this.tab && !$(_this.tab.querySelector('a')).is('.active')) {
					$(_this.tab.querySelector('a')).trigger('click');
				}

				if (_this.tab != null){
					console.log(_this.tab)
					var fid = $(_this.tab.querySelector('a.active')).attr('href').split('#')[1];				
					if($('#'+fid).length > 0) { 
						runBVStaticPLP($('#'+fid)); 
						/* LGEGMC-1528 : 20210421 add */ 
						setTimeout(function() { 
							$('#'+fid).find('.rating[data-modelid]').each(function() { 
								$(this).find('a.bv-rating-stars-container').attr('data-link-area', 'selective_offering-product_list').attr('data-link-name', $(this).data('modelname'));			
							}); 
						}, 3000); 
						/*// LGEGMC-1528 : 20210421 add */ 
					} 
				}
				/* LGEGMC-1528 : 20210421 add */ 
				if(!!$(_this.el).find('.rating[data-bv-show=inline_rating]')){ 				
					setTimeout(function() { 
						$(_this.el).find('.rating[data-bv-show=inline_rating]').each(function() { 
							$(this).find('a').attr('data-link-area', 'selective_offering-product_list').attr('data-link-name', $(this).data('modelname'));				
						}); 
					}, 3000); 
				} 
				/*// LGEGMC-1528 : 20210421 add */ 
			}
			// 20200406 START 이상현 - tab ui의 관계 정보 추가
			_this.addAriaRelationship(els);
			// 20200406 END
			scrollDesign();
		},
		addAriaDescribedby: function(){
			var els = document.querySelectorAll('.GPC0004[name="GPC0004MainPage"]');
			var waNumber = 0;
			$(els).find('.unit-list .item').each(function() {
				var $target;
				if($(this).find('.model-name a') && !$(this).find('.model-name a').is(':empty')) {
					$target = $(this).find('.model-name a');
				}
				if($target) {
					$target.attr('id', 'waGPC0004_'+waNumber);
					$(this).find('a.btn').attr('aria-describedby', 'waGPC0004_'+waNumber);
					$(this).find('a.js-compare').attr('aria-describedby', 'waGPC0004_'+waNumber).attr('role', 'button');
					waNumber++;
				}
			});
		},
		// 20200406 START 이상현 - tab ui의 관계 정보 추가
		addAriaRelationship : function(tg){
			if($(tg).find('.js-tab').length > 0){
				$(tg).find('.js-tab').find('[role="tab"]').each(function(idx) {
					$(this).attr('id', 'tabLabel_' + (idx+1));
					$(tg).find('[role="tabpanel"]').eq(idx).attr('aria-labelledby', 'tabLabel_' + (idx+1));
				});
			}
		},
		// 20200406 END
		createProductItem: function(productList, productMessages, membershipFlagData){
			var html = [];
			for (var i = 0; i < productList.length; i++) {
				var p = productList[i],
					template = $(GPC0004.template).clone().html();
				//PJTGADL-2 
				var priceValue = "";
				if(p.rPromoPrice != null && p.rPromoPrice != "" && p.rPromoPrice != 'null'){
					priceValue = p.rPromoPrice+"."+nvl(p.rPromoPriceCent,'00');
				} else{
					priceValue = nvl(p.rPrice,'')+"."+nvl(p.rPriceCent,'00');
				}
				//PJTMEMBERSHIP-8 START
				var membershipPriceValue = "";
				if(p.rMembershipPrice != null && p.rMembershipPrice != "" && p.rMembershipPrice != 'null'){
					membershipPriceValue = nvl(p.rMembershipPrice,'')+"."+nvl(p.rMembershipPriceCent,'00');
				}
				//LGEGMC-2592
				var externalLinkTarget = '';
				if(p.externalLinkTarget != null && p.externalLinkTarget != ""){
					externalLinkTarget = p.externalLinkTarget.toLowerCase();
				}
				//PJTMEMBERSHIP-8 END

				const btnColorChange = ( nvl(p.obsLoginFlag,'') == 'T' || nvl(p.obsLoginFlag,'') == 'N') && nvl(p.buyNowUseFlag,'') == 'N' && nvl(p.addToCartFlag,'') == 'N' && nvl(p.resellerBtnFlag,'') == 'N' && nvl(p.buyNowFlag,'') == 'N' && nvl(p.productSupportFlag,'') == 'N' ? true : false; // LGEITF-877

				template = template.replace(/\*modelId\*/g, p.modelId)
								.replace(/\*modelName\*/g, p.modelName)
								.replace(/\*modelName_toLowerCase\*/g, p.modelName.toLowerCase())
								.replace(/\*imageAltText\*/g, (p.imageAltText != null) ? p.imageAltText : '')
								// 20200325 START 박지영 - ufn 따옴표 처리
								// 20200512 START 박지영 - ufn null 처리
								.replace(/\*userFriendlyName\*/g, p.userFriendlyName == null ? '' : p.userFriendlyName.replace(/\"/g, "''"))
								// 20200512 END
								// 20200325 END
								.replace(/\*salesModelCode\*/g, p.salesModelCode)
								.replace(/\*modelUrlPath\*/g, p.modelUrlPath)
								.replace(/\*mediumImageAddr\*/g, p.mediumImageAddr)
								.replace(/\*smallImageAddr\*/g, p.smallImageAddr)
								.replace(/\*productTag1\*/g, p.productTag1)
								.replace(/\*productTag2\*/g, p.productTag2)
								.replace(/\*productTag1UserType\*/g, p.productTag1UserType) // LGEIS-800
								.replace(/\*productTag2UserType\*/g, p.productTag2UserType) // LGEIS-800
								.replace(/\*whereToBuyUrl\*/g, p.whereToBuyUrl)
								.replace(/\*inquiryToBuyUrl\*/g, p.inquiryToBuyUrl)
								.replace(/\*findTheDealerUrl\*/g, p.findTheDealerUrl)
								.replace(/\*promotionText\*/g, p.promotionText ? p.promotionText : "")
								//LGEGMC-2592
								.replace(/\*promotionLinkUrl\*/g, p.promotionLinkUrl ? p.promotionLinkUrl : "")
								.replace(/\*externalLinkTarget\*/g, externalLinkTarget == 'self' ? '_self' : '_blank')
								// PJTOBS 20200703 Start 
								.replace(/\*reStockAlertUrl\*/g, p.reStockAlertUrl ? p.reStockAlertUrl : "")
								// PJTOBS 20200703 End
								// 20200316 START 박지영 : price format 함수 적용
								.replace(/\*rPrice\*\.\*rPriceCent\*/g, p.rPrice ? changeFormatFullPrice(p.rPrice, p.rPriceCent) : 'null')
								// 20200421 START 박지영 : 오타 수정
								.replace(/\*rPromoPrice\*\.\*rPromoPriceCent\*/g, p.rPromoPrice ? changeFormatFullPrice(p.rPromoPrice, p.rPromoPriceCent) : 'null')
								// 20200421 END
								// 20200316 END
								.replace(/\*rPrice\*/g, p.rPrice ? changeFormatPrice(p.rPrice) : 'null')
								.replace(/\*rPromoPrice\*/g, p.rPromoPrice ? changeFormatPrice(p.rPromoPrice) : 'null')
								// 20200325 START 박지영 : price format 수정
								.replace(/\*rPriceCent\*/g, p.rPriceCent ? (p.rPriceCent) : 'null')
								.replace(/\*rPromoPriceCent\*/g, p.rPromoPriceCent ? (p.rPromoPriceCent) : 'null')
								// 20200325 END
								/* in-house review rating add */
								.replace(/\*sRating2\*/g, p.sRating2)
								.replace(/\*pCount\*/g, p.pCount)
								.replace(/\*ratingPercent\*/g, p.ratingPercent)
								/* // in-house review rating add */
								.replace(/\*siblingType\*/g, p.siblingType)
								.replace(/\*discountedRate\*/g, p.discountedRate)
								.replace(/\*retailerPricingText\*/g, p.retailerPricingText)
								.replace(/\*salesSuffixCode\*/g, (p.salesSuffixCode || '')) /* LGEGMC-455 20200717 add */
								.replace(/\*modelYear\*/g, (nvl(p.modelYear,'') || '')) /* LGEGMC-1279 : 2021.03.12 add */
								.replace(/\*buName1\*/g, (p.buName1 || ''))
								.replace(/\*buName2\*/g, (p.buName2 || ''))
								.replace(/\*buName3\*/g, (nvl(p.buName3,'') || ''))
								.replace(/\*bizType\*/g, (p.bizType || ''))
								.replace(/\*superCategoryName\*/g, p.superCategoryName)
								.replace(/\*priceValue\*/g, priceValue)/* LGEGMC-712 20201102 ADD */
								//PJTOBSB2E-3 Start
								.replace(/\*obsPreOrderStartDate\*/g, p.obsPreOrderStartDate)
								.replace(/\*obsPreOrderEndDate\*/g, p.obsPreOrderEndDate)
								//PJTOBSB2E-3 End
								.replace(/\*msrp\*/g, nvl(p.msrp,'0'))
								//PJTOBSEMI-4-num2 Start
								.replace(/\*emiMsg\*/g, p.obsEmiMsgFlag == 'Y' && p.emiMsg != null && p.emiMsg != '' ? p.emiMsg : '')
								//PJTOBSEMI-4-num2 End
								//LGEAU-378 START
								.replace(/\*afterPayInstallMent\*/g, p.obsEmiMsgFlag == 'Y' && p.emiMsg != null && p.emiMsg != '' && (p.afterPay <= 3000 && p.afterPay > 0) ? 'afterpay-installment" href="#modal-afterpay' : '" style="display:none;')
								//LGEAU-378 END
								//LGEGMC-2202 START
								.replace(/\*wtbClass\*/g, (p.wtbExternalLinkUseFlag =="Y" && p.wtbExternalLinkUrl != null && p.wtbExternalLinkUrl != '' && p.wtbExternalLinkName != null && p.wtbExternalLinkName != '') ? 'in-buynow' : 'where-to-buy')
								//LGEGMC-2202
								// LGEITF-877 Start
								.replace(/\*btnColorChangeATC\*/g, btnColorChange ? 'btn-outline-secondary' : 'btn-primary')
								.replace(/\*btnColorChangeWTB\*/g, btnColorChange ? 'btn-primary' : 'btn-outline-secondary')
								// LGEITF-877 End
								//PJTMEMBERSHIP-8 START
								.replace(/\*obsMembershipLinkUrl\*/g, membershipFlagData.obsMembershipLinkUrl)
								.replace(/\*obsMembershipLinkTarget\*/g, membershipFlagData.obsMembershipLinkTarget)
								.replace(/\*membershipPriceValue\*/g, membershipPriceValue)
								.replace(/\*obsPartnerUrl\*/g, nvl(p.obsPartnerUrl, '')) //LGEEG-154
								.replace(/\*zipPayInstallMent\*/g, p.obsEmiMsgFlag == 'Y' && (p.afterPay > 0 && p.afterPay <= 5000) ? 'afterpay-installment" href="#modal-afterpay' : '" style="display:none;')/* LGEGMC-3167 add */
								.replace(/\*orZipPay\*/g, p.obsEmiMsgFlag == 'Y' && (p.afterPay > 0 && p.afterPay <= 3000) ? 'or ' : '')/* LGEGMC-3167 add */
								.replace(/\*calculatorSalesCode\*/g, (p.salesModelCode != null && p.salesModelCode != "") && (p.salesSuffixCode != null && p.salesSuffixCode != "") ? p.salesModelCode+"."+p.salesSuffixCode : p.salesModelCode) //LGEITF-708
								;
								//PJTMEMBERSHIP-8 END
				//LGEGMC-383
				var pdfDownloadFile = $obj.find('input[name="pdfDownloadFile"]').val();
				var productFicheDownload = $obj.find('input[name="productFicheDownload"]').val();
				//LGESR-72
				var rsProductFicheDownload = $obj.find('input[name="rsProductFicheDownload"]').val();
				var rsUseFlag = p.rsUseFlag;
				if(rsUseFlag == "Y"){
					productFicheDownload = rsProductFicheDownload;
				}
				//LGEGMC-3921
				var productFichehtml = '';
            	if(p.washTowerFlag=="Y"){
            		if( p.productFicheFileName !="" && p.productFicheOriginalName !="" && p.productFicheFileName != null && p.productFicheOriginalName !=null && p.productFicheDocId !=null && p.productFicheDocId !="" && p.secondProductFicheFileName !="" && p.secondProductFicheOriginalName !="" && p.secondProductFicheFileName != null && p.secondProductFicheOriginalName !=null && p.secondProductFicheDocId !=null && p.secondProductFicheDocId !=""){
            			productFichehtml += "<div class='energy-label-wrap'><a href='#' adobe-click='pdp-file-down-click' data-doc='"+ p.productFicheDocId +  "' data-file='" + p.productFicheFileName + "' data-original='" + p.productFicheOriginalName + "' data-category='' class='link-text text-tooltip' title='" + pdfDownloadFile + "'>"
            			+ "<span class='fiche type-product'>" + productFicheDownload + "</span>"
            			+ "</a>"+ "<div class='tooltip-link'><div class='tolltip-inner'>";
            			productFichehtml += "<a href='#' adobe-click='pdp-file-down-click' data-doc='"+p.productFicheDocId+ "' data-sku= '" + p.modelName + "' data-model-id= '" + p.modelId  +"'  data-file='"+p.productFicheFileName+"' data-original='"+p.productFicheOriginalName+"' data-category='' class='link-text link-text-uk' title='" + pdfDownloadFile +"("+p.productFicheproductLeve1Code+")"+ "'>"+p.productFicheproductLeve1Code+"</a>";
						productFichehtml += "<a href='#' adobe-click='pdp-file-down-click' data-doc='" + p.secondProductFicheDocId + "' data-file='" + p.secondProductFicheFileName + "' data-original='" + p.secondProductFicheOriginalName + "'  data-category='' class='link-text link-text-eu' title='" + pdfDownloadFile +"("+p.secondProductFicheproductLeve1Code+")"+ "'>"+p.secondProductFicheproductLeve1Code+"</a>"
						+ "</div></div></div>";
            		}else{
            			if(p.productFicheFileName !="" && p.productFicheOriginalName !="" && p.productFicheFileName != null && p.productFicheOriginalName !=null && p.productFicheDocId !=null && p.productFicheDocId !=""  ){
            				productFichehtml += "<a href='#' adobe-click='pdp-file-down-click' data-doc='"+ p.productFicheDocId + "' data-file='" + p.productFicheFileName + "' data-original='" + p.productFicheOriginalName + "' data-category='' class='link-text' title='" + pdfDownloadFile +"("+p.productFicheproductLeve1Code+")"+ "'>"
                 			+ "<span class='fiche type-product'>" + productFicheDownload + "</span>"
                 			+ "</a>";
	                	}
            		}
            	}else{
            		if(p.productFicheFileName !="" && p.productFicheOriginalName !="" && p.productFicheFileName != null && p.productFicheOriginalName !=null && p.productFicheDocId !=null && p.productFicheDocId !=""  ){
        				productFichehtml += "<a href='#' adobe-click='pdp-file-down-click' data-doc='"+ p.productFicheDocId + "' data-file='" + p.productFicheFileName + "' data-original='" + p.productFicheOriginalName + "' data-category='' class='link-text' title='" + pdfDownloadFile +"("+p.productFicheproductLeve1Code+")"+ "'>"
             			+ "<span class='fiche type-product'>" + productFicheDownload + "</span>"
             			+ "</a>";
                	}
            	}
            	//LGEGMC-3921
				/*LGEGMC-1035 start*/
				if($('html').attr('data-countrycode') == 'uk'){
					if(p.energyLabel != "" && p.energyLabel != "N" && p.energyLabel != null && p.energyLabelDocId !=null && p.energyLabelDocId !="" && p.energyLabelFileName != null && p.energyLabelFileName != "" && p.energyLabelOriginalName !=null
							&& p.energyLabelOriginalName !="" && p.energyLabelImageAddr !=null && p.energyLabelImageAddr !="" && p.energyLabelName !=null && p.energyLabelName !="" && p.fEnergyLabelFileName!= null && p.fEnergyLabelDocId!= null && p.fEnergyLabelDocId!= ""&&p.fEnergyLabelFileName!='' && p.fEnergyLabelOriginalName !=null&& p.fEnergyLabelOriginalName !=''){
						var energyLabelhtml = "<div class='energy-label-wrap'><a href='#' class='label-link'><span class='label'><img src='"+ p.energyLabelImageAddr +"' alt='"+ p.energyLabelName +"'></span></a>"
						var energyLabelImagehtml = "<div class='tooltip-link'><div class='tolltip-inner'>";
						if(p.fEnergyLabelFileName!= null && p.fEnergyLabelDocId!= null && p.fEnergyLabelDocId!= ""&&p.fEnergyLabelFileName!='' && p.fEnergyLabelOriginalName !=null&& p.fEnergyLabelOriginalName !=''){
							energyLabelImagehtml += "<a href='#' class='link-text link-text-uk' adobe-click='pdp-file-down-click' data-doc='" + p.fEnergyLabelDocId + "' data-file='" + p.fEnergyLabelFileName + "' data-original='" + p.fEnergyLabelOriginalName + "'  data-category='' title='" + pdfDownloadFile +"("+p.fenergyLabelproductLeve1Code+")"+ "'>"+$("#pdfDownloadFileUk").val()+"</a>";
						}
					energyLabelImagehtml += "<a href='#' class='link-text link-text-eu' adobe-click='pdp-file-down-click' data-doc='" + p.energyLabelDocId + "' data-file='" + p.energyLabelFileName + "' data-original='" + p.energyLabelOriginalName + "'  data-category='' title='" + pdfDownloadFile +"("+p.energyLabelproductLeve1Code+")"+ "'>"+$("#pdfDownloadFileEu").val()+"</a></div></div></div>"
					}else{
						var energyLabelhtml = "<a href='#' adobe-click='pdp-file-down-click' data-doc='" + p.energyLabelDocId + "' data-file='" + p.energyLabelFileName + "' data-original='" + p.energyLabelOriginalName + "' class='link-text' data-category='' title='" + pdfDownloadFile +"("+p.energyLabelproductLeve1Code+")"+ "'>"
						+ "<span class='label type-none'>";
						var energyLabelImagehtml = "<img src='"+ p.energyLabelImageAddr +"' alt='"+ p.energyLabelName +"'></span></a>";
					}
				}else{
					var energyLabelhtml = "<a href='#' adobe-click='pdp-file-down-click' data-doc='" + p.energyLabelDocId + "' data-file='" + p.energyLabelFileName + "' data-original='" + p.energyLabelOriginalName + "' class='link-text' data-category='' title='" + pdfDownloadFile +"("+p.energyLabelproductLeve1Code+")"+ "'>"
					+ "<span class='label type-none'>";
					var energyLabelImagehtml = "<img src='"+ p.energyLabelImageAddr +"' alt='"+ p.energyLabelName +"'></span></a>";
				}
				/*LGEGMC-1035 end*/
				//LGEGMC-3921
			if(p.washTowerFlag=="Y"){
				if($('html').attr('data-countrycode') == 'uk'){
					if(p.secondEnergyLabel != "" && p.secondEnergyLabel != "N" && p.secondEnergyLabel != null && p.secondEnergyLabelDocId !=null && p.secondEnergyLabelDocId !="" && p.secondEnergyLabelFileName != null && p.secondEnergyLabelFileName != "" && p.secondEnergyLabelOriginalName !=null
							&& p.secondEnergyLabelOriginalName !="" && p.secondEnergyLabelImageAddr !=null && p.secondEnergyLabelImageAddr !="" && p.secondEnergyLabelName !=null && p.secondEnergyLabelName !="" && p.secondFEnergyLabelFileName!= null && p.secondFEnergyLabelDocId!= null && p.secondFEnergyLabelDocId!= ""&&p.secondFEnergyLabelFileName!='' && p.secondFEnergyLabelOriginalName !=null&& p.secondFEnergyLabelOriginalName !=''){
						var secondEnergyLabelhtml = "<div class='energy-label-wrap'><a href='#' class='label-link'><span class='label'><img src='"+ p.secondEnergyLabelImageAddr +"' alt='"+ p.secondEnergyLabelName +"'></span></a>"
						var secondEnergyLabelImagehtml = "<div class='tooltip-link'><div class='tolltip-inner'>";
						secondEnergyLabelImagehtml += "<a href='#' class='link-text link-text-uk' adobe-click='pdp-file-down-click' data-doc='" + p.secondFEnergyLabelDocId + "' data-file='" + p.secondFEnergyLabelFileName + "' data-original='" + p.secondFEnergyLabelOriginalName + "'  data-category='' title='" + pdfDownloadFile +"("+p.secondFEnergyLabelproductLeve1Code+")"+ "'>"+$("#pdfDownloadFileUk").val()+"</a>";
						secondEnergyLabelImagehtml += "<a href='#' class='link-text link-text-eu' adobe-click='pdp-file-down-click' data-doc='" + p.secondEnergyLabelDocId + "' data-file='" + p.secondEnergyLabelFileName + "' data-original='" + p.secondEnergyLabelOriginalName + "'  data-category='' title='" + pdfDownloadFile +"("+p.secondEnergyLabelproductLeve1Code+")"+ "'>"+$("#pdfDownloadFileEu").val()+"</a></div></div></div>"
					}else{
						var secondEnergyLabelhtml = "<a href='#' adobe-click='pdp-file-down-click' data-doc='" + p.secondEenergyLabelDocId + "' data-file='" + p.secondEnergyLabelFileName + "' data-original='" + p.secondEnergyLabelOriginalName + "' class='link-text' data-category='' title='" + pdfDownloadFile +"("+p.secondEnergyLabelproductLeve1Code+")"+ "'>"
						+ "<span class='label type-none'>";
						var secondEnergyLabelImagehtml = "<img src='"+ p.secondEnergyLabelImageAddr +"' alt='"+ p.secondEnergyLabelName +"'></span></a>";
					}
				}else{
					var secondEnergyLabelhtml = "<a href='#' adobe-click='pdp-file-down-click' data-doc='" + p.secondEenergyLabelDocId + "' data-file='" + p.secondEnergyLabelFileName + "' data-original='" + p.secondEnergyLabelOriginalName + "' class='link-text' data-category='' title='" + pdfDownloadFile +"("+p.secondEnergyLabelproductLeve1Code+")"+ "'>"
					+ "<span class='label type-none'>";
					var secondEnergyLabelImagehtml = "<img src='"+ p.secondEnergyLabelImageAddr +"' alt='"+ p.secondEnergyLabelName +"'></span></a>";
				}
			}	
			//LGEGMC-3921
				if(p.productFicheFileName !="" && p.productFicheOriginalName !="" && p.productFicheFileName != null && p.productFicheOriginalName !=null && p.productFicheDocId !=null && p.productFicheDocId != ""){
					template = template.replace(/\*productFileName\*/g,productFichehtml);
						ynEnergyLabel = "Y";
				} else{
					template = template.replace(/\*productFileName\*/g,"");
				}
				if(p.energyLabel != "" && p.energyLabel != "N" && p.energyLabel != null && p.energyLabelDocId !=null && p.energyLabelDocId !="" && p.energyLabelFileName != null && p.energyLabelFileName != "" && p.energyLabelOriginalName !=null
						&& p.energyLabelOriginalName !="" && p.energyLabelImageAddr !=null && p.energyLabelImageAddr !="" && p.energyLabelName !=null && p.energyLabelName !=""){
					template = template.replace(/\*energyLabel\*/g,energyLabelhtml);
					template = template.replace(/\*energyLabelImage\*/g,energyLabelImagehtml);
						ynEnergyLabel = "Y";
				} else{
					template = template.replace(/\*energyLabelImage\*/g, "");
					template = template.replace(/\*energyLabel\*/g,"");
				} 
				
				if(p.secondEnergyLabel != "" && p.secondEnergyLabel != "N" && p.secondEnergyLabel != null && p.secondEnergyLabelDocId !=null && p.secondEnergyLabelDocId !="" && p.secondEnergyLabelFileName != null && p.secondEnergyLabelFileName != "" && p.secondEnergyLabelOriginalName !=null
						&& p.secondEnergyLabelOriginalName !="" && p.secondEnergyLabelImageAddr !=null && p.secondEnergyLabelImageAddr !="" && p.secondEnergyLabelName !=null && p.secondEnergyLabelName !=""){
				template = template.replace(/\*secondEnergyLabel\*/g,secondEnergyLabelhtml);
				template = template.replace(/\*secondEnergyLabelImage\*/g,secondEnergyLabelImagehtml);
					ynEnergyLabel = "Y";
			    } else{
					template = template.replace(/\*secondEnergyLabel\*/g, "");
					template = template.replace(/\*secondEnergyLabelImage\*/g,"");
				} 

				//LGEFR-640
				var repairabilityArea = $(template).find('.repairability-index');
				var repairabilityMsg = repairabilityArea.attr('data-repairability-msg');
				var targetBlankMsg = repairabilityArea.attr('data-target-blank-msg');
				
				if(p.labelRepairMap.length > 0){	
					var repairMapData = p.labelRepairMap[0];
					var repairAbilityHtml  = "<div class='score'>";
					    repairAbilityHtml  += "<span class='txt'>"+repairabilityMsg+"</span>";
					if(repairMapData.linkUrl != 'null' && repairMapData.linkUrl != ''){
						repairAbilityHtml  += "<a href='"+repairMapData.linkUrl+"'";
						if(repairMapData.linkOpt =='S'){
							repairAbilityHtml  += " target='_self'";
						}else if(repairMapData.linkOpt =='B'){
							repairAbilityHtml  += " target='_blank'";
						}
						repairAbilityHtml  += " title='"+targetBlankMsg+"' class='link-pdf'>";
					}else{
                        repairAbilityHtml += "<span class='link-pdf'>";
                    }
					if(repairMapData.imagePathAddr != 'null' && repairMapData.imagePathAddr != ''){
						repairAbilityHtml  += "<img src='"+repairMapData.imagePathAddr+"' alt='"+repairMapData.altText+"' area-hidden='true' />";
					}
					if(repairMapData.linkUrl != 'null' && repairMapData.linkUrl != ''){
						repairAbilityHtml  += "</a></div>";
					}else{
                        repairAbilityHtml  += "</span></div>";
                    }
					template = template.replace(/\*repairabilityIndex\*/g, repairAbilityHtml);
				}else{
					template = template.replace(/\*repairabilityIndex\*/g, "");
				}
				//LGEFR-640
				var $template = $(template),
					$keyBlocks = $template.find('*[data-key]');

				for (var i1 = 0; i1 < $keyBlocks.length; i1++) {
					var $currentKeyBlock = $keyBlocks.eq(i1),
						key = $currentKeyBlock.get(0).getAttribute('data-key'),
						val = p[key];
					if(!val || (val == null || val == "N")) {
						if($currentKeyBlock.is('.btn')) {
							$currentKeyBlock.removeClass('active');
						}else {
						 	$currentKeyBlock.remove();
						}
						//$currentKeyBlock.remove();
					}else {
						if($currentKeyBlock.is('.btn')) {
							$currentKeyBlock.addClass('active');
						}
					}
					if((p.obsLimitSale == 'Y' && p.limitSaleUseFlag == 'Y') || (p.obsPreOrderFlag == "Y" || p.obsPreOrderRSAFlag == "Y")){
						$keyBlocks.closest('span').addClass('flag-imp');
						if(p.vipPriceFlag != 'Y' && p.obsLimitSale == 'Y' && p.limitSaleUseFlag == 'Y') {
							$template.find('.price-vip').text(p.limitSaleTitle);
						}
					}
				}
				
				//PJTPDR-1 START
				var pdrCompareUseFlag = p.pdrCompareUseFlag;
				if(pdrCompareUseFlag == 'N'){
					$template.find('.wishlist-compare').hide();
				}
				//PJTPDR-1 END

				// in-house reivew rating star - ie fix
				$template.find('.carmine-star').css({
					width: p.reviewRatingPercent+"%"
				});

				// price setting
				$priceArea = $template.find('.price-area.total');
				if($priceArea.length!=0) {
					$priceArea.removeClass('type-none type-default type-msrp type-promotion type-text');
					if(p.modelStatusCode=='DISCONTINUED') {
						// do nothing
					} else if(p.retailerPricingFlag == "Y") {
						// type text
						$priceArea.addClass('type-text');
						$priceArea.find('.text').text(p.retailerPricingText);
					// 20200514 START 박지영 : 조건문에서 promotionPrice 제거
					} else if(p.rPromoPrice != null && p.rPrice != null && p.rPromoPrice != '' && p.rPrice != '') {
					// 20200514 END
						// type promotion
						$priceArea.addClass('type-promotion');
						var price = changeFormatFullPrice(p.rPromoPrice, p.rPromoPriceCent);
						var pricePromo = changeFormatFullPrice(p.rPrice, p.rPriceCent);
						$priceArea.find('.purchase-price .price .number').text(price);
						$priceArea.find('.product-price .price .number').text(pricePromo);
						$priceArea.find('.product-price .legal').html(p.discountMsg == null ? '' : p.discountMsg.replace(/&lt;/gi, '<').replace(/&gt;/gi, '>'));		// LGEIS-229 change how discounts are shown
					} else {
						if(p.bizType=="B2B") {
							if(p.rPrice != null && p.rPrice != '') {
								// type b2b
								var price = changeFormatFullPrice(p.rPrice, p.rPriceCent);
								$priceArea.addClass('type-msrp');
								$priceArea.find('.purchase-price .price .number').text(price);
							}
						} else {
							if(p.rPrice != null && p.rPrice != '') {
								// type default
								var price2 = changeFormatFullPrice(p.rPrice, p.rPriceCent);
								$priceArea.addClass('type-default');
								$priceArea.find('.purchase-price .price .number').text(price2);
							}
						}
					}
					// PJTOBS-32 Start
					if(ISVIP) $priceArea.parents(".model-buy").addClass('has-topInfo');
					//PJTLIMITQTY_EXTEND
					var limitSaleConditionFlag =  p.vipPriceFlag == 'N' && p.obsLimitSale == 'Y' && p.limitSaleUseFlag == 'Y' ? 'Y' : 'N';
					if(p.vipPriceFlag == 'Y') {
						var priceOrg = changeFormatFullPrice(p.rPrice, p.rPriceCent);
						var pricePromo = changeFormatFullPrice(p.rPromoPrice, p.rPromoPriceCent);
						var legal = p.discountMsg == null ? '' : p.discountMsg.replace(/&lt;/gi, '<').replace(/&gt;/gi, '>');		// LGEIS-229 change how discounts are shown
						var vipPriceText = productMessages.vipPriceMessage;
						var previousPriceText = productMessages.previousPriceText;
						// PJTOBSEMI-4-num2 Start
						var emiMsgText = p.obsEmiMsgFlag == 'Y' && p.emiMsg != null && p.emiMsg != '' ? p.emiMsg : '';

						setVipPrice($priceArea, priceOrg, pricePromo, legal, vipPriceText, previousPriceText, p.modelId + '/' + 'GPC0004.js',emiMsgText,p.afterPay, limitSaleConditionFlag, p.limitSaleTitle);
						// PJTOBSEMI-4-num2 End
					}else{
						//PJTLIMITQTY_EXTEND
						if(p.obsLimitSale == 'Y' && p.limitSaleUseFlag == 'Y'){
							$template.find('.price-vip').text(productMessages.limitSaleTitle);
						}else{
							$template.find('.price-vip').text('');
						}
						//PJTLIMITQTY_EXTEND
					}
					// PJTOBS-32 End
					// PJTMEMBERSHIP-8 Start
					var $membershipPrices = $template.find('.member-text');
					if(p.membershipDisplayFlag=='Y' && $membershipPrices.length > 0) {
						$template.find('.model-buy').addClass('has-member');
					}else{
						$membershipPrices.filter('.member-text').remove();
					}
					// PJTMEMBERSHIP-8 End

					if(p.obsLowestPriceFlag != 'Y') $template.find('.lowest-price').filter('.lowest-price').remove(); // LGECZ-402
				}

				// sibling target check
				if(p.target && p.target.toUpperCase() == "SELF") {
					$template.filter('.item.js-model').addClass('self');
				}else {
					$template.filter('.item.js-model').removeClass('self');
				}

				// siblingModels
				var $sibling = $template.find('.model-group .inner');
				var siblingTypeclass;
				if(p.siblingType && p.siblingType != null) {
					siblingTypeclass = (p.siblingType.toLowerCase() == "color") ? "color" : "size";
				}else {
					siblingTypeclass = null;
				}
				var havSiblingModels = p.siblingModels && p.siblingModels.length > 0;
				if((havSiblingModels && siblingTypeclass != null) && $sibling.get(0)) {
					var siblingItem = $template.find('.model-group .'+siblingTypeclass).clone().html(),
						siblingAriaTxt = $template.find('.model-group .'+siblingTypeclass).clone().attr('aria-label'),
						siblingMarkup = [];

					for (var _j = 0; _j < p.siblingModels.length; _j++) {
						var sbModel = p.siblingModels[_j];
						var item = siblingItem.replace(/\*siblingCode\*/g, sbModel.siblingCode)
											.replace(/\*siblingValue\*/g, sbModel.siblingValue)
											.replace(/\*subModelId\*/g, sbModel.modelId);
						if(sbModel.modelId != p.modelId) {
							item = item.replace('active', '');
						}else {
							var $item = $(item);
							$item.attr('aria-checked', true);
							item = $item.get(0).outerHTML;
						}
						siblingMarkup += item;
					}
					$sibling.append(siblingMarkup);
					$template.find('.model-group .inner').attr('aria-label', siblingAriaTxt);
				// 20200316 START 박지영 : aria 오류 방지
				} else {
					$sibling.removeAttr('role');
				// 20200316 END
				}

				// rolling image
				if(p.modelRollingImgList && p.modelRollingImgList != null) {
					$template.find('.visual img.pc').addClass('js-thumbnail-loop').attr('data-img-list', p.modelRollingImgList);
				}

				// PJTOBS 20200703 Start
				//PJTLIMITQTY_EXTEND
				var $stockArea = $template.find('.stock-area');
				if((!p.reStockAlertFlag || p.reStockAlertFlag!='Y') && $stockArea.length>0) {
					if( p.limitSaleUseFlag == 'Y' && p.obsLimitSale == 'Y'){
						if(p.obsInventoryFlag == 'Y'){
							$stockArea.removeClass('out-of-stock').empty();
						}else{
							$stockArea.find('.text').text(productMessages.limitSaleSoldOutText);
						}
					}else{
						$stockArea.removeClass('out-of-stock').empty();
					}
				}else{
					if(p.limitSaleUseFlag == 'Y' && p.obsLimitSale == 'Y'){
						$stockArea.find('.text').text(productMessages.limitSaleSoldOutText);
					}
				}
				// PJTOBS 20200703 End

				// buttons
				// PJTOBS 20200703 Start
				if($template.find('.button a.re-stock-alert').length>0) {
					if((!p.reStockAlertFlag || p.reStockAlertFlag!='Y')) {
						$template.find('.button a.re-stock-alert').removeClass('active');
					} else {
						$template.find('.button a.re-stock-alert').addClass('active');
					}
				}
				// PJTOBS 20200703 End
				// LGEVN-80
				var obsBuynowFlag = $obj.find('input[name="obsBuynowFlag"]').val();
				if(p.obsPreOrderFlag =="Y"){ //PJTOBS/2020/PJTOBSB2E-6 GILS
					if(obsBuynowFlag == 'Y'){
						$template.find('.button a.add-to-cart').addClass('active').data('model-id', p.modelId).attr('href', p.modelUrlPath).text(productMessages.preOrderBtnNm).removeAttr('target, title')
						.addClass('pre-order').attr('data-obs-pre-order-start-date',p.obsPreOrderStartDate).attr('data-obs-pre-order-end-date',p.obsPreOrderEndDate)
						;						
					}else{
						$template.find('.button a.add-to-cart').addClass('active').data('model-id', p.modelId).attr('href', '#').text(productMessages.preOrderBtnNm).attr('role', 'button').removeAttr('target, title')
						.addClass('pre-order').attr('data-obs-pre-order-start-date',p.obsPreOrderStartDate).attr('data-obs-pre-order-end-date',p.obsPreOrderEndDate)
						;
					}
				}else if(p.addToCartFlag!="N") {
					if(p.addToCartFlag == 'Y') {
						if(obsBuynowFlag == 'Y'){
							// 통합 OBS
							var buynow = $obj.find('input[name="buynow"]').val();
							$template.find('.button a.add-to-cart').addClass('active').data('model-id', p.modelId).attr('href', p.modelUrlPath).text(buynow).removeAttr('target, title');
						} else{
							// 통합 OBS
							$template.find('.button a.add-to-cart').addClass('active').data('model-id', p.modelId).attr('href', '#').text(productMessages.addToCartBtnNm).attr('role', 'button').removeAttr('target, title');
						}
					} else if(p.addToCartFlag == 'S') {
						// Standalone OBS
						$template.find('.button a.add-to-cart').addClass('active').data('model-id', p.modelId).attr('href', '#').text(productMessages.addToCartBtnNm).attr('role', 'button').removeAttr('target, title');
					}
				} else if(p.buyNowFlag=="Y" || p.buyNowFlag=="L") {
					if(p.ecommerceTarget == '_blank') {
						$template.find('.button a.add-to-cart').addClass('active').addClass('in-buynow').data('model-id', p.modelId).attr('href', p.buyNowUrl).text(productMessages.buyNowBtnNm).removeAttr('role').attr('target', '_blank').attr('title', productMessages.btnNewLinkTitle);//LGEGMC-1567
					}else {
						$template.find('.button a.add-to-cart').addClass('active').addClass('in-buynow').data('model-id', p.modelId).attr('href', p.buyNowUrl).text(productMessages.buyNowBtnNm).removeAttr('role').removeAttr('target, title');//LGEGMC-1567
					}
				// 20200506 START 박지영 - flag 명 변경
				} else if (p.resellerBtnFlag=="Y") {
				// 20200506 END
					$template.find('.button a.add-to-cart').addClass('active').data('model-id', p.modelId).attr('href', p.resellerLinkUrl).text(productMessages.resellerBtnNm).removeAttr('role').attr('target', '_blank').attr('title', productMessages.btnNewLinkTitle);
				} else if (p.productSupportFlag=="Y") {
					$template.find('.button a.add-to-cart').addClass('active').data('model-id', p.modelId).attr('href', p.productSupportUrl).text(productMessages.productSupportBtnNm).removeAttr('role').removeAttr('target, title');
				} else {
					$template.find('.button a.add-to-cart').removeClass('active');
				}
				// WTB btn
				if(p.whereToBuyFlag=="Y" && p.whereToBuyUrl != null && p.whereToBuyUrl != '') {
					// go to pdp page
					$template.find('.button a.where-to-buy').addClass('active').attr('href', p.whereToBuyUrl).text(productMessages.whereToBuyBtnNm);
					$template.find('.button a.where-to-buy').removeAttr('target, title');
				// 20200410 START 박지영 - wtb external link 변경
				} else if(p.wtbExternalLinkUseFlag=="Y" && p.wtbExternalLinkUrl != null && p.wtbExternalLinkUrl != '' && p.wtbExternalLinkName != null && p.wtbExternalLinkName != '') {
					// go to external link
					//LGEGMC-2202 START
					$template.find('.button a.in-buynow').addClass('active').attr('href', p.wtbExternalLinkUrl).text(p.wtbExternalLinkName).attr('data-link-name', 'buy_now').removeAttr('data-sc-item');;
					if(p.wtbExternalLinkSelfFlag == 'Y') {
						$template.find('.button a.in-buynow').removeAttr('target, title');
					} else {
						$template.find('.button a.in-buynow').attr('target', '_blank').attr('title', productMessages.btnNewLinkTitle);
					}
					//LGEGMC-2202 END
				// 20200410 END
				} else {
					$template.find('.button a.where-to-buy').removeClass('active');
				}
				//LGEEG-154
				if(p.buyNowUnionStoreBtnFlag !="Y"){
					$template.find('.button a.buyNowUnionBtn').remove();
				}
				// Find a dealer btn
				if(p.findTheDealerFlag=="Y" && p.findTheDealerUrl != null && p.findTheDealerUrl != '') {
					$template.find('.button a.find-a-dealer').addClass('active').attr('href', p.findTheDealerUrl).text(productMessages.findTheDealerBtnNm);
				} else {
					$template.find('.button a.find-a-dealer').removeClass('active');
				}
				// inquiry to buy btn
				if(p.inquiryToBuyFlag=="Y" && p.inquiryToBuyUrl != null && p.inquiryToBuyUrl != '') {
					$template.find('.button a.inquiry-to-buy').addClass('active').attr('href', p.inquiryToBuyUrl).text(productMessages.inquiryToBuyBtnNm);
				} else {
					$template.find('.button a.inquiry-to-buy').removeClass('active');
				}

				// 20200511 START 박지영 - 3번, 4번 컴포넌트 버튼 색상 변경
				// button - change color (Changing button color to JavaScript is only the GPC0003 and GPC0004 components.)
				if((OBS_LOGIN_FLAG=='N' || OBS_LOGIN_FLAG == 'T') && p.buyNowUseFlag == 'N' && p.resellerBtnFlag == 'N' && p.productSupportFlag == 'N') {
					// change color (No red button) 
					if($template.find('.button a.add-to-cart').length>0) $template.find('.button a.add-to-cart').removeClass('btn-primary').addClass('btn-outline-secondary');
					if($template.find('.button a.where-to-buy').length>0) $template.find('.button a.where-to-buy').addClass('btn-primary').removeClass('btn-outline-secondary');
				}
				// 20200511 END
				/** LGEITF-764 Start */
				$template.find('.tag-content').find('[data-user-type=""]').removeClass('d-none');
				$template.find('.tag-content').find('[data-user-type="ALL"]').removeClass('d-none');
				if(SIGN_IN_STATUS == 'Y' && ISVIP){
					$template.find('.tag-content').find('[data-user-type=VIP]').removeClass('d-none');
				}else {
					$template.find('.tag-content').find('[data-user-type=NON_VIP]').removeClass('d-none');
				}
				/** LGEITF-764 End */

				$template.find('template').remove();
				template = $template.get(0).outerHTML;
				html += template;
			}

			return html;
		},
		addEvent: function(){
			var _this = GPC0004;
			$(_this.el).on({
				submit: function(e){
					e.preventDefault();
					var isExpander = $(e.delegateTarget).data('focus') == true;
					var url = e.currentTarget.action,
						param = encodeURI(xssfilter($(e.currentTarget).serialize()));
					var $target = $(e.currentTarget).siblings('.list-contents-wrap');
					var $form = $(e.currentTarget);

					ajax.noCacheCall(url, param, 'json', function(d){
						var data, html;
						if(d && d.data) data = d.data instanceof Array ? d.data[0] : d.data;

						if(d.status == "success" && (data && (data.productList && data.productList.length > 0))) {
							//PJTMEMBERSHIP-8 Start
							var membershipFlagData = {};
							membershipFlagData.obsMembershipLinkUseFlag = data.obsMembershipLinkUseFlag;
							membershipFlagData.obsMembershipLinkUrl = data.obsMembershipLinkUrl;
							membershipFlagData.obsMembershipLinkTarget = data.obsMembershipLinkTarget;
							//PJTMEMBERSHIP-8 End
							// making markup
							html = GPC0004.createProductItem(data.productList, data.productMessages, membershipFlagData); //PJTMEMBERSHIP-8 membershipFlagData추가

							if($target.find('.unit-list').is('.slick-initialized')) {
								$target.find('.unit-list').slick('unslick');
							}
							
							$target.find('.unit-list').html(html);
							if($target.hasClass('initialized')) {
								$('html, body').animate({
									scrollTop: $target.closest('.component').offset().top
								});
							}

							$target.find('.unit-list').slick(GPC0004.opt);
							$target.addClass('initialized');
							_this.addAriaDescribedby();
							bindImgError();
							runBVStaticPLP($target);
							/* LGEGMC-1528 : 20210421 add */ 
							setTimeout(function() { 
								$target.find('.rating[data-modelid]').each(function() { 
									$(this).find('a.bv-rating-stars-container').attr('data-link-area', 'selective_offering-product_list').attr('data-link-name', $(this).data('modelname'));				
								}); 
							}, 3000); 
							 
							if(!!$target.find('.rating[data-bv-show=inline_rating]')){		 					
								setTimeout(function() { 
									$target.find('.rating[data-bv-show=inline_rating]').each(function() { 
										$(this).find('a').attr('data-link-area', 'selective_offering-product_list').attr('data-link-name', $(this).data('modelname'));			 			
									}); 
								}, 3000);	  
							} 
							/*// LGEGMC-1528 : 20210421 add */ 
							if(typeof renderListingInlineRatingsRU != 'undefined') renderListingInlineRatingsRU(getProductsNameRU());

							$form.trigger('ajaxLoadEnd');
						}else {
							$target.closest(".tab-cont").removeClass("active");
							$target.closest(".component").find(".no-content-wrap").addClass("active");

							$form.trigger('ajaxLoadEnd');
						}
					});
				}
			}, 'form');

			// tab click
			$(_this.tab).on({
				click: function(e){
					e.preventDefault();
					var target = $(e.currentTarget.getAttribute('href')).get(0),
						targetForm = target.querySelector('form');

					// hide no-content area
					$(target).closest(".component").find(".no-content-wrap").removeClass("active");
					
					if($(targetForm).length>0) {
						if(!$(target.querySelector('.list-contents-wrap')).is('.initialized')) {
							if($(targetForm).find('input[name=type][value=EO]').length>0 || $(targetForm).find('input[name=type][value=YMAL]').length>0) {
								if(typeof OBS.init == 'function') {
									OBS.init($(target));
								} else {
									$(targetForm).submit();
								}
							} else {
								$(targetForm).submit();
							}
						}
					} else {
						if(!$(target).hasClass('active')) {
							$(target).addClass('active');
						}
						if(!$(target.querySelector('.list-contents-wrap')).find('.unit-list').hasClass('slick-initialized')) {
							setTimeout(function() {
								$(target.querySelector('.list-contents-wrap')).find('.unit-list').slick(GPC0004.opt);
								runBVStaticPLP($(target));
								/* LGEGMC-1528 : 20210421 add */ 
								setTimeout(function() { 
									$(target).find('.rating[data-modelid]').each(function() { 
										$(this).find('a.bv-rating-stars-container').attr('data-link-area', 'selective_offering-product_list').attr('data-link-name', $(this).data('modelname'));	 					
									}); 
								}, 3000); 
								/*// LGEGMC-1528 : 20210421 add */
								/* LGEITF-604 Start */
								if(e.originalEvent != undefined){
									if (!!!vipCheckGPC0004 || vipCheckGPC0004 == 'false' || $obj.attr('data-is-vip') == 'NULL') {
										priceSyncGPC0004.init(target);
									} else {
										$('.GPC0004[name="GPC0004MainPage"]').find('.products-info .model-buy').find('.price-vip-Installment, .price-area, .member-text').removeClass('d-none');
									}
								}else{
									if($obj.find('input[name=priceSyncLazyload]').val() == 'N') priceSyncLazyloadGPC0004();
								}
								/* //LGEITF-604 End */
							}, 100); 
						} 
						/* LGEGMC-1528 : 20210421 add */ 
						if(!!$(target).find('.rating[data-bv-show=inline_rating]')){		 					
							setTimeout(function() { 
								$(target).find('.rating[data-bv-show=inline_rating]').each(function() { 
									$(this).find('a').attr('data-link-area', 'selective_offering-product_list').attr('data-link-name', $(this).data('modelname')); 						
								}); 
							}, 3000);	 
						} 
						/*// LGEGMC-1528 : 20210421 add */ 
					}
				}
			}, 'a');
		}
	};
	
	//LGEGMC-383
	//file download
	var fileDownload = function($link) {
		if($('form#formDown').length>0) $('form#formDown').remove();

		var fileBox = $link.closest('[data-file-download]');
		var flag = (fileBox.data('flag') || '').toUpperCase();
		var downtime = fileBox.data('downtime') || null;
		var opentime = fileBox.data('opentime') || null;

		if(flag=='Y') {
			// downtime error
			var $errorPop = $('#htmlOpenError');
			if($errorPop.length>0) {
				$errorPop.modal();
				$errorPop.find('.htmldowntime').text(downtime);
				$errorPop.find('.htmlopentime').text(opentime);
			} else {
				console.log('#htmlOpenError is required in HTML');
			}
		} else {

			var doc = $link.data('doc'),
				file = $link.data('file'),
				original = $link.data('original'),
				category = $link.data('category');

			var input = '<input type="hidden" id="DOC_ID" name="DOC_ID" value="' + doc +'" />';
			input += '<input type="hidden" id="ORIGINAL_NAME_b1_a1" name="ORIGINAL_NAME_b1_a1" value="' + original +'" />';
			input += '<input type="hidden" id="FILE_NAME" name="FILE_NAME" value="' + file +'" />';
			input += '<input type="hidden" id="TC" name="TC" value="DwnCmd" />';
			input += '<input type="hidden" id="GSRI_DOC" name="GSRI_DOC" value="GSRI" />'
			input += '<input type="hidden" id="SPEC_DOWNLOAD" name="SPEC_DOWNLOAD" value="N" />';

			/*LGEGMC-1035 start*/
            var openlocale="|AT|BE_FR|BG|CH_DE|CH_FR|CZ|DE|DK|EE|ES|FI|FR|GR|HR|HU|IT|LT|LV|NL|NO|PL|PT|RO|RS|SE|SK|UK|";
            var _target="_self";
            if((original.toLowerCase().indexOf('.pdf')>-1 || original.toLowerCase().indexOf('.bmp')>-1 || original.toLowerCase().indexOf('.jpg')>-1 || original.toLowerCase().indexOf('.jpeg')>-1||original.toLowerCase().indexOf('.png')>-1) && openlocale.indexOf("|"+COUNTRY_CODE.toUpperCase()+"|")>-1){
            	_target="_blank";
            }
            
			var form = $('<form />').attr({
				id: 'formDown',
				method: 'get',
				action: fileBox.data('action'),
				target: _target
			}).append(input);
			$('body').append(form);
			/*LGEGMC-1035 end*/

			$('#formDown').submit();
		}
	}
	//LGEGMC-712
	function nvl(str, defaultStr){
		var check = str+"";
		var result = "";
		check = check.trim()
		if(check=="" || check==null || check == "null" || check=="undefined"){
			result = defaultStr;
		}else{
			result = check;
		}
		return result ;
	}
	
	
	$obj.on('click','.file-list a.link-text',function(e){
		e.preventDefault();
		fileDownload($(this));
	});

	GPC0004.init();

	
});

/* LGEITF-604 Start */
let priceSyncGPC0004 = {
		init: function($target){
			let _this = this;
			_this.getPrice($target);
			
		},
		getPrice: function($target){
			var $obj=$('.GPC0004[name="GPC0004MainPage"]');
			let arrModelId = new Array();
			const $targetSelector = $($target.querySelector('.list-contents-wrap')); 
			$targetSelector.find('input[name=bestActionAreaModelId]').each(function(idx) {
				arrModelId[idx] = $(this).val();
			});
			
			const _this = this,
				url = $obj.data('baa-price-sync-url'),
				param = {
					modelList: arrModelId.length > 0 ? arrModelId.join() :'',
					componentId: $obj.data('component-id'),
					type: $(GPC0004.tab.querySelector('a.active')).data('nba-type'),
					bizType: $obj.data('biz-type')
				};
				
			if (!!param.modelList) {
				ajax.noCacheCall(url, param, 'json', function(data){
					if(data.status == 'success' && data.data){
						let comonData = {};
						comonData.emiPopupUrl = data.data[0].emiPopupUrl;
						comonData.obsMembershipLinkUrl = data.data[0].obsMembershipLinkUrl;
						comonData.obsMembershipLinkTarget = data.data[0].obsMembershipLinkTarget;
						comonData.obsMembershipLinkUseFlag = data.data[0].obsMembershipLinkUseFlag;
						comonData.limitSaleTitle = data.data[0].productMessages.limitSaleTitle;
						
						for(var i=0; i<data.data[0].productList.length; i++){
							const p = data.data[0].productList[i],
								priceSyncHtml = GPC0004.priceTemplateGPC004;
							
							if (priceSyncHtml) {
								const $template = _this.makePriceSyncHtml(p, comonData, priceSyncHtml);
								const scop = $targetSelector.find('.unit-list .slick-track .item').find('.products-info[data-model-id='+p.modelId+']');
								scop.find('.price-vip-Installment, .price-area, .member-text, .lowest-price').remove(); // LGECZ-402
								scop.find('.model-buy').append($template);
							}
						}
					}
				});
			}
		},
		makePriceSyncHtml : function(p, comonData, template){
			var $obj=$('.GPC0004[name="GPC0004MainPage"]');
			if (template) {
				const emiMsgFlag = !!p.obsEmiMsgFlag && p.obsEmiMsgFlag == 'Y',
					afterPay = p.afterPay,
					obsMembershipLinkTarget = comonData.obsMembershipLinkTarget,
					obsMembershipLinkUrl = comonData.obsMembershipLinkUrl,
					rPrice = p.rPrice,
					rPriceCent = p.rPriceCent,
					rPromoPrice = p.rPromoPrice,
					rPromoPriceCent = p.rPromoPriceCent,
					discountMsg = p.discountMsg,
					bizType = p.bizType,
					obsLoginFlag = !!p.obsLoginFlag && p.obsLoginFlag ? 'Y' : 'N',
					modelStatusCode = p.modelStatusCode,
					recommendedRetailRriceInfo = $obj.data('recommended-retail-price-info'),
					title = obsMembershipLinkTarget == '_blank' ? $('.GPC0004[name="GPC0004MainPage"] > input#openTarget').val() : '';
					
				let priceType,
					tempPrice = '',
					tempPromoPrice = '',
					tempLegal = ''
					obsMemberShipLinkStartHtml = '',
					obsMemberShipLinkEndHtml = '';
				
				if (!!p.retailerPricingFlag && p.retailerPricingFlag == 'Y') {
					priceType = 'type-text';
				} else if (!!rPromoPrice) {
					priceType = 'type-promotion';
				} else if (bizType == 'B2B') {
					priceType = 'type-msrp';
				} else if (!!rPrice) {
					priceType = 'type-default';
				} else {
					priceType = 'type-none';
				}
				
				if (!!obsMembershipLinkUrl && p.membershipDisplayFlag == 'Y') {
					obsMemberShipLinkStartHtml = "<a href='"+ obsMembershipLinkUrl +"' target='"+ obsMembershipLinkTarget +"' title='" +title+ "'>";
					obsMemberShipLinkEndHtml = "</a>"
				} 
				
				template = template.replace(/\*modelId\*/g, p.modelId)
				.replace(/\*retailerPricingText\*/g, !!p.retailerPricingText ? p.retailerPricingText : '')
				.replace(/\*emiPopUrl\*/g, !!comonData.emiPopupUrl ? comonData.emiPopupUrl : '')
				.replace(/\*emiMsg\*/g, emiMsgFlag ? p.emiMsg : '')
				.replace(/\*display\*/g, emiMsgFlag && (afterPay > 0 && afterPay <= 3000) ? '' : 'style="display:none;"')
				.replace(/\*zipdisplay\*/g, emiMsgFlag && (afterPay > 0 && afterPay <= 5000) ? '' : 'style="display:none;"')
				.replace(/\*orZipPay\*/g, emiMsgFlag && (afterPay > 0 && afterPay <= 3000) ? 'or ' : '')
				.replace(/\*msrp\*/g, nvl(p.msrp,'0'))
				.replace(/\*obsMembershipLinkUrl\*/g, !!obsMembershipLinkUrl ? comonData.obsMembershipLinkUrl : '')
				.replace(/\*obsMembershipLinkTarget\*/g, !!obsMembershipLinkTarget ? obsMembershipLinkTarget : '')
				.replace(/\*obsMembershipPrice\*/g, !!p.rMembershipPriceCent ? changeFormatFullPriceSync(p.rMembershipPrice, p.rMembershipPriceCent) : (!!p.rMembershipPrice ? changeFormatPriceSync(p.rMembershipPrice) : ''))
				.replace(/\*priceType\*/g, priceType)
				.replace(/\*obsMemberShipLinkStart\*/g,obsMemberShipLinkStartHtml)
				.replace(/\*obsMemberShipLinkEnd\*/g,obsMemberShipLinkEndHtml)
				.replace(/\*calculatorSalesCode\*/g, (p.salesModelCode != null && p.salesModelCode != "") && (p.salesSuffixCode != null && p.salesSuffixCode != "") ? p.salesModelCode+"."+p.salesSuffixCode : p.salesModelCode) //LGEITF-708
				.replace(/\*lowestPrice\*/g, !!p.obsLowestPrice && p.obsLowestPrice > 0 ? changeFormatFullPrice(p.obsLowestPrice, p.obsLowestPriceCent) : '') // LGECZ-402, LGECZ-421, LGECZ-429
				;
				
				// Price
				if (modelStatusCode == 'ACTIVE') {
					if (!!rPromoPriceCent) {
						tempPrice = changeFormatFullPriceSync(rPromoPrice, rPromoPriceCent);
						tempPromoPrice = changeFormatFullPriceSync(rPrice, rPriceCent);
						tempLegal = discountMsg;
					} else if (!!rPromoPrice) {
						tempPrice = changeFormatFullPriceSync(rPromoPrice);
						tempPromoPrice = changeFormatFullPriceSync(rPrice);
						tempLegal = discountMsg;
					} else if (!!rPriceCent) {
						tempPrice = changeFormatFullPriceSync(rPrice, rPriceCent);
					} else if (!!rPrice) {
						tempPrice = changeFormatFullPriceSync(rPrice);
					}
				}
				
				let $html = $(template);
				
				// Delete
				if (bizType == 'B2B' && obsLoginFlag == 'Y' && !!rPrice) {
					$html.find('.price-area > div.msrp').remove();
				}
				if (!!p.membershipDisplayFlag && p.membershipDisplayFlag != 'Y') {
					$html.find('.member-text').remove();
				}

				if (!!p.obsLowestPriceFlag && p.obsLowestPriceFlag != 'Y') $html.find('.lowest-price').remove(); // LGECZ-402

				if (!!!rPrice || !!!rPromoPrice) {
					$html.find('.recommended-retail-price').remove();
				}
				if (modelStatusCode != 'ACTIVE') {
					$html.find('.purchase-price, .product-price').remove();
				}
				if (!!p.retailerPricingFlag && p.retailerPricingFlag != 'Y') {
					$html.find('.price-area > div.text').remove();
				}
				if (recommendedRetailRriceInfo != 'Y' ||  (recommendedRetailRriceInfo != 'Y' && !!!rPrice && !!!rPromoPrice)) {
					$html.find('.recommended-retail-price').remove();
				}
				if (afterPay <= 0 || p.obsInventoryFlag != 'Y') {
					$html.find('.price-vip-Installment > a.afterpay-installment').remove();
				}
				
				// Setting
				if (modelStatusCode == 'ACTIVE') {
					$html.find('.purchase-price .number').text(tempPrice);
					$html.find('.product-price .number').text(tempPromoPrice);
					$html.find('.product-price .legal').text(tempLegal);
				}
				if (!!p.limitSaleUseFlag && p.limitSaleUseFlag == 'Y' && !!p.obsLimitSale && p.obsLimitSale == 'Y') {
					$html.find('.price-vip-Installment .price-vip').text(comonData.limitSaleTitle);
				}
				
				return $html.html();
			}
		}
}
/* //LGEITF-604, LGCOMSPEED-6(6th) End */
function priceSyncLazyloadGPC0004(){
	if(!document.querySelector('.GPC0004[name="GPC0004MainPage"]')) return false;
	var $obj=$('.GPC0004[name="GPC0004MainPage"]');
	
	/* LGEITF-604 Start */
	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			if (mutation.attributeName === 'data-is-vip') {
				vipCheckGPC0004 = mutation.target.getAttribute('data-is-vip');
				priceSyncSet(mutation.target.getAttribute('data-is-vip'));
				observer.disconnect();
			}
		});
	});
	observer.observe(document.querySelector('.GPC0004[name="GPC0004MainPage"]'), {
		attributes: true, childList: false, characterData: false
	});
	
	if($obj.attr('data-is-vip') != 'NULL'){
		vipCheckGPC0004 = $obj.attr('data-is-vip');
		priceSyncSet($obj.attr('data-is-vip'));
		observer.disconnect();		
	}
	
	function priceSyncSet(flag){
		if(flag == 'false'){
			let timer = null;
			
			function checkGPC0004() {
				if (typeof GPC0004 === 'undefined') {
					timer = setTimeout(checkGPC0004, 100);
				} else {
					if(timer !== null) clearTimeout(timer);
					$obj.each(function(){
						priceSyncGPC0004.init($(this).find('.products-list-group')[0]);
					});
				}
			}
			checkGPC0004();
		} else {
			$obj.find('.products-info .model-buy').find('.price-vip-Installment, .price-area, .member-text').removeClass('d-none');
		}
	}
}
if(document.readyState == 'complete') {
	if($('.GPC0004[name="GPC0004MainPage"]').find('input[name=priceSyncLazyload]').val() !== 'N') priceSyncLazyloadGPC0004();
}
window.addEventListener("load", function(){
	if($('.GPC0004[name="GPC0004MainPage"]').find('input[name=priceSyncLazyload]').val() !== 'N') priceSyncLazyloadGPC0004();	
});
/* //LGEITF-604, LGCOMSPEED-6(6th) End */