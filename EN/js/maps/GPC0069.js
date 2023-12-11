$(document).ready(function() {
	if(!document.querySelector('.GPC0069')) return false;

	var $obj = $('.GPC0069');
	// LGECI-257 Start
	var waNumber = 0;
	$obj.find('.unit-box').each(function() {
		var $target;
		if($(this).find('.title') && !$(this).find('.title').is(':empty')) {
			$target = $(this).find('.title');
		}
		if($target) {
			$target.attr('id', 'waGPC0069_'+waNumber);
			$(this).find('a.btn').attr('aria-describedby', 'waGPC0069_'+waNumber);
			$(this).find('a.link-text').attr('aria-describedby', 'waGPC0069_'+waNumber);
			waNumber++;
		}
	});
	// LGECI-257 End
	
	// LGEIN-256 start
	if( $obj.find('a.link-text').length > 0 && $obj.find('a.link-text').data("link-area-flag") == "Y"){
		setDataLinkArea( $obj.find('a.link-text'));
	}
	if( $obj.find('a.btn').length > 0 && $obj.find('a.btn').data("link-area-flag") == "Y"){
		setDataLinkArea( $obj.find('a.btn'));
	}
	
	function setDataLinkArea( $objSet) {
		var pgUrlPath = document.location.pathname;
		var pgLinkData = $objSet.data("link-area-msg").split(",");
		var pgLinkSubData;
		
		for( var pgI=0; pgI<pgLinkData.length; pgI++){
			pgLinkSubData = pgLinkData[pgI].split(":");
			if( pgUrlPath == pgLinkSubData[0] ){
				$objSet.attr("data-link-area",pgLinkSubData[1]);
				break;
			}
		}
	}
	// LGEIN-256 end
});
