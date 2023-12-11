$(document).ready(function() {
    if (!document.querySelector(".animation-box"))
        return !1;
    var a = {
        el: document.querySelectorAll(".animation-box"),
        init: function() {
            a.addEvent()
        },
        videoEvent: function(e) {
            var a = e.currentTarget
              , a = $(a).siblings(".controller-wrap");
            "ended" == e.type || "pause" == e.type ? a.find(".play").addClass("active").siblings().removeClass("active") : "play" != e.type && "playing" != e.type || a.find(".pause").addClass("active").siblings().removeClass("active")
        },
        addEvent: function() {
            var e = a.el;
            $(e).each(function() {
                var e = $(this).get(0);
                0 < $(this).closest(".carousel-wrap").length && (e = $(this).closest(".carousel-wrap")),
                $(e).on({
                    click: function(e) {
                        e.preventDefault();
                        var a = e.currentTarget
                          , e = $(a).closest(".animation-box").find("video:visible")[0];
                        "pause" == a.name ? e.pause() : "play" == a.name && e.play(),
                        setTimeout(function() {
                            $(a.parentElement).find("button:visible").focus()
                        })
                    }
                }, ".controller-wrap button"),
                $(e).find("video").on({
                    "play playing pause ended": a.videoEvent
                }),
                e != a.el && $(e).on({
                    init: function() {
                        $(e).find("video").on({
                            "play playing pause ended": a.videoEvent
                        })
                    }
                })
            })
        }
    };
    a.init()
});
var thumbnailLoop, compareCookie = {
    name: $(".navigation") && $(".navigation").hasClass("b2b") ? "LG5_B2B_CompareCart" : "LG5_CompareCart",
    cookie: null,
    add: function(e) {
        this.cookie = getCookie(this.name),
        this.cookie ? (this.cookie = 0 <= this.cookie.indexOf("|") ? this.cookie.split("|") : [this.cookie],
        this.cookie.indexOf(e) < 0 && this.cookie.unshift(e),
        this.cookie = this.cookie.join("|")) : this.cookie = e,
        "undefined" != typeof ePrivacyCookies && !ePrivacyCookies.get("LGCOM_IMPROVEMENTS") && "de" != COUNTRY_CODE.toLowerCase() && "it" != COUNTRY_CODE.toLowerCase() || setCookie(this.name, this.cookie, !0)
    },
    remove: function(e) {
        e ? (this.cookie = getCookie(this.name),
        this.cookie && (this.cookie = 0 <= this.cookie.indexOf("|") ? this.cookie.split("|") : [this.cookie],
        0 <= (e = this.cookie.indexOf(e)) && this.cookie.splice(e, 1),
        this.cookie = this.cookie.join("|"))) : this.cookie = "",
        "" != this.cookie && this.cookie ? "undefined" != typeof ePrivacyCookies && !ePrivacyCookies.get("LGCOM_IMPROVEMENTS") && "de" != COUNTRY_CODE.toLowerCase() && "it" != COUNTRY_CODE.toLowerCase() || setCookie(this.name, this.cookie, !0) : removeCookie(this.name, !0)
    }
};
$(document).ready(function() {
    tinyLayer.initModule(".swatch");
    var z = 0 < $(".cardlist-box").length ? "card" : "default";
    if (!document.querySelector(".js-model-switcher"))
        return !1;
    var K = {
        el: document.querySelectorAll(".js-model-switcher"),
        currentEl: null,
        formId: "sendSiblingModelForm",
        subModelId: "subModelId",
        itemSelector: ".js-model",
        $items: null,
        ajaxUrl: null,
        paramName: null,
        bizType: "B2C",
        init: function() {
            0 < $(".navigation").length && $(".navigation").hasClass("b2b") && (this.bizType = "B2B");
            for (var e = 0; e < K.el.length; e++)
                K.currentEl = K.el[e],
                K.$items = $(K.currentEl).find(K.itemSelector),
                K.ajaxUrl = K.currentEl.getAttribute("data-model-url"),
                K.paramName = K.currentEl.getAttribute("data-name"),
                K.addEvent()
        },
        addEvent: function() {
            $(K.currentEl).on({
                click: function(R) {
                    R.preventDefault();
                    var q = -1 < R.currentTarget.getAttribute("href").indexOf("#") ? R.currentTarget.getAttribute("data-href") : R.currentTarget.getAttribute("href")
                      , e = R.currentTarget.getAttribute("data-category")
                      , j = $(R.currentTarget).index()
                      , a = $(K.currentEl).data("ajaxMethod")
                      , t = {}
                      , r = $(R.currentTarget).closest(".js-model-switcher").attr("data-model-url");
                    t[K.paramName] = q,
                    t.bizType = K.bizType,
                    0 < $(".search-contents-area").length && (0 < $(R.currentTarget).closest(".business-product-list").length ? t.bizType = "B2B" : t.bizType = "B2C"),
                    0 < $(R.currentTarget).closest(".GPC0007").length && (t.categoryId = $(R.currentTarget).closest(".GPC0007").find("form input[name=categoryId]").val()),
                    e && (t.categoryId = e),
                    t.v = $("#v").val(),
                    $(R.currentTarget).closest(".GPC0004").length && (t.componentId = $(R.currentTarget).closest(".GPC0004").data("component-id")),
                    ajax.call(r, t, "json", function(e) {
                        if (e && "" != e) {
                            var a = $(R.currentTarget).closest(K.itemSelector);
                            if ("success" == e.status) {
                                var t = e.data[0]
                                  , r = ""
                                  , r = null != t.rPromoPrice && "" != t.rPromoPrice && "null" != t.rPromoPrice ? t.rPromoPrice + "." + V(t.rPromoPriceCent, "00") : V(t.rPrice, "") + "." + V(t.rPriceCent, "00")
                                  , e = a.closest("[data-wish-basic-info]");
                                e.data("adobe-salesmodelcode", t.salesModelCode),
                                e.data("adobe-salessuffixcode", t.salesSuffixCode),
                                e.data("adobe-modelname", t.modelName),
                                a.find(".tag-content").empty(),
                                0 < $(R.currentTarget).closest(".GPC0007,.GPC0026,.GPC0003").length ? 0 < $(R.currentTarget).closest(".GPC0007,.GPC0003").length ? "Y" == t.obsComTagShowFlag ? ("OBS" == t.productTag1Type ? null != t.productTag1 && "" != t.productTag1 && a.find(".tag-content").append('<p class="tag-imp d-none" data-user-type="' + t.productTag1UserType + '"><span>' + t.productTag1 + "</span></p>") : "COM" == t.productTag1Type && null != t.productTag1 && "" != t.productTag1 && a.find(".tag-content").append('<p class="d-none" data-user-type="' + t.productTag1UserType + '"><span>' + t.productTag1 + "</span></p>"),
                                "OBS" == t.productTag2Type ? null != t.productTag2 && "" != t.productTag2 && a.find(".tag-content").append('<p class="tag-imp d-none" data-user-type="' + t.productTag2UserType + '"><span>' + t.productTag2 + "</span></p>") : "COM" == t.productTag2Type && null != t.productTag2 && "" != t.productTag2 && a.find(".tag-content").append('<p class="d-none" data-user-type="' + t.productTag2UserType + '"><span>' + t.productTag2 + "</span></p>")) : ("Y" == t.obsPreOrderFlag || "Y" == t.obsPreOrderRSAFlag ? null != t.productTag1 && "" != t.productTag1 && a.find(".tag-content").append('<p class="tag-imp d-none" data-user-type="' + t.productTag1UserType + '"><span>' + t.productTag1 + "</span></p>") : null != t.productTag1 && "" != t.productTag1 && a.find(".tag-content").append('<p class="d-none" data-user-type="' + t.productTag1UserType + '"><span>' + t.productTag1 + "</span></p>"),
                                null != t.productTag2 && "" != t.productTag2 && a.find(".tag-content").append('<p class="d-none" data-user-type="' + t.productTag2UserType + '"><span>' + t.productTag2 + "</span></p>")) : (null != t.productTag1 && "" != t.productTag1 && a.find(".tag-content").append("<p><span>" + t.productTag1 + "</span></p>"),
                                null != t.productTag2 && "" != t.productTag2 && a.find(".tag-content").append("<p><span>" + t.productTag2 + "</span></p>")) : 0 < $(R.currentTarget).closest(".GPC0009,.GPC0004").length ? "Y" == t.obsComTagShowFlag ? ("OBS" == t.productTag1Type ? null != t.productTag1 && "" != t.productTag1 && a.find(".tag-content").append('<span class="flag-imp d-none" data-user-type="' + t.productTag1UserType + '">' + t.productTag1 + "</span>") : "COM" == t.productTag1Type && null != t.productTag1 && "" != t.productTag1 && a.find(".tag-content").append('<span class="d-none" data-user-type="' + t.productTag1UserType + '">' + t.productTag1 + "</span>"),
                                "OBS" == t.productTag2Type ? null != t.productTag2 && "" != t.productTag2 && a.find(".tag-content").append('<span class="flag-imp d-none" data-user-type="' + t.productTag2UserType + '">' + t.productTag2 + "</span>") : "COM" == t.productTag2Type && null != t.productTag2 && "" != t.productTag2 && a.find(".tag-content").append('<span class="d-none" data-user-type="' + t.productTag2UserType + '">' + t.productTag2 + "</span>")) : ("Y" == t.obsPreOrderFlag || "Y" == t.obsPreOrderRSAFlag ? null != t.productTag1 && "" != t.productTag1 && a.find(".tag-content").append('<span class="flag-imp d-none" data-user-type="' + t.productTag1UserType + '">' + t.productTag1 + "</span>") : null != t.productTag1 && "" != t.productTag1 && a.find(".tag-content").append('<span class="d-none" data-user-type="' + t.productTag1UserType + '">' + t.productTag1 + "</span>"),
                                null != t.productTag2 && "" != t.productTag2 && a.find(".tag-content").append('<span class="d-none" data-user-type="' + t.productTag2UserType + '">' + t.productTag2 + "</span>")) : "Y" == t.obsComTagShowFlag && 0 < $(R.currentTarget).closest(".search-result-products-wrap").length ? ("OBS" == t.productTag1Type ? null != t.productTag1 && "" != t.productTag1 && a.find(".tag-content").append('<span class="flag-imp">' + t.productTag1 + "</span>") : "COM" == t.productTag1Type && null != t.productTag1 && "" != t.productTag1 && a.find(".tag-content").append("<span>" + t.productTag1 + "</span>"),
                                "OBS" == t.productTag2Type ? null != t.productTag2 && "" != t.productTag2 && a.find(".tag-content").append('<span class="flag-imp">' + t.productTag2 + "</span>") : "COM" == t.productTag2Type && null != t.productTag2 && "" != t.productTag2 && a.find(".tag-content").append("<span>" + t.productTag2 + "</span>")) : (null != t.productTag1 && "" != t.productTag1 && a.find(".tag-content").append("<span>" + t.productTag1 + "</span>"),
                                null != t.productTag2 && "" != t.productTag2 && a.find(".tag-content").append("<span>" + t.productTag2 + "</span>")),
                                a.find("a.visual").is("[data-keyword-search-url]") ? (a.find("a.visual").attr("href", "#"),
                                a.find("a.visual").attr("data-keyword-search-url", t.modelUrlPath)) : a.find("a.visual").attr("href", t.modelUrlPath),
                                null != t.imageAltText && "" != t.imageAltText ? a.find("a.visual img").attr("alt", t.imageAltText) : a.find("a.visual img").attr("alt", ""),
                                bindImgError(),
                                a.find("a.visual img.pc").attr("src", t.mediumImageAddr).attr("data-src", t.mediumImageAddr),
                                a.find("a.visual img.mobile").attr("src", t.smallImageAddr).attr("data-src", t.smallImageAddr),
                                "card" != z && (null != t.modelRollingImgList && "" != t.modelRollingImgList ? a.find("a.visual img.pc").addClass("js-thumbnail-loop").attr("data-img-list", t.modelRollingImgList) : a.find("a.visual img.pc").removeClass("js-thumbnail-loop").removeAttr("data-img-list"),
                                a.find(".thumbnail-carousel").remove(),
                                thumbnailLoop && thumbnailLoop.mobileThumbnailCarouselSingle(a.find("a.visual img[data-img-list]").eq(0), !0)),
                                a.find(".model-group a").removeClass("active").eq(j).addClass("active"),
                                a.find(".model-name a").is("[data-keyword-search-url]") ? (a.find(".model-name a").attr("href", "#").html(null == t.userFriendlyName ? "" : t.userFriendlyName.replace(/\"/g, "''")),
                                a.find(".model-name a").attr("data-keyword-search-url", t.modelUrlPath)) : a.find(".model-name a").attr("href", t.modelUrlPath).html(null == t.userFriendlyName ? "" : t.userFriendlyName.replace(/\"/g, "''")),
                                null == t.modelUrlPath && (a.find(".model-name a").is("[data-keyword-search-url]") && a.find(".model-name a").removeAttr("data-keyword-search-url"),
                                a.find("a.visual").is("[data-keyword-search-url]") && a.find("a.visual").removeAttr("data-keyword-search-url"),
                                a.find("a.visual").removeAttr("href"),
                                a.find(".model-name a").removeAttr("href")),
                                null == t.userFriendlyName && a.find(".model-name a").html("");
                                e = null == t.modelName ? "" : t.modelName.replace(/\"/g, "''");
                                a.find(".sku").data("modelName", e),
                                a.find(".sku a:not(.copy-model-name)").is("[data-keyword-search-url]") ? (a.find(".sku a:not(.copy-model-name)").attr("href", "#").html(null == t.modelName ? "" : t.modelName.replace(/\"/g, "''")),
                                a.find(".sku a:not(.copy-model-name)").attr("data-keyword-search-url", t.modelUrlPath)) : a.find(".sku a:not(.copy-model-name)").attr("href", t.modelUrlPath).html(null == t.modelName ? "" : t.modelName.replace(/\"/g, "''"));
                                e = $("#copyModelNameText").val(),
                                e = "component-copyModelName" === e ? "Copy Model Name" : e;
                                a.find(".sku .copy-model-name").attr("title", e).text(e),
                                a.find(".ecorebates-div").attr("data-modelId", t.modelId),
                                0 < $("#search-keyword").length && (o = "",
                                l = V(t.salesModelCode, ""),
                                "" != (d = V(t.salesSuffixCode, "")) && (o = l + "." + d),
                                a.find("a.visual").attr("data-model-name", V(t.modelName)),
                                a.find("a.visual").attr("data-sales-model-code", V(o)),
                                a.find(".model-name a").attr("data-model-name", V(t.modelName)),
                                a.find(".model-name a").attr("data-sales-model-code", V(o, "")),
                                a.find(".sku a").attr("data-model-name", V(t.modelName)),
                                a.find(".sku a").attr("data-sales-model-code", V(o, "")));
                                var l = $("#specMsg").val();
                                a.find(".box-impInfo").html("Y" == t.specMsgFlag ? "<p>" + l + "</p>" : ""),
                                a.find(".file-list").html("");
                                var d = $("#pdfDownloadFile").val()
                                  , o = $("#productFicheDownload").val()
                                  , l = $("#rsProductFicheDownload").val();
                                "Y" == t.rsUseFlag && (o = l);
                                l = "";
                                "Y" == t.washTowerFlag && "" != t.productFicheFileName && "" != t.productFicheOriginalName && null != t.productFicheFileName && null != t.productFicheOriginalName && null != t.productFicheDocId && "" != t.productFicheDocId && "" != t.secondProductFicheFileName && "" != t.secondProductFicheOriginalName && null != t.secondProductFicheFileName && null != t.secondProductFicheOriginalName && null != t.secondProductFicheDocId && "" != t.secondProductFicheDocId ? (l += "<div class='energy-label-wrap'><a href='#' adobe-click='pdp-file-down-click' data-doc='" + t.productFicheDocId + "' data-file='" + t.productFicheFileName + "' data-original='" + t.productFicheOriginalName + "' data-category='' class='link-text text-tooltip' title='" + d + "'><span class='fiche type-product'>" + o + "</span></a><div class='tooltip-link'><div class='tolltip-inner'>",
                                l += "<a href='#' adobe-click='pdp-file-down-click' data-doc='" + t.productFicheDocId + "' data-sku= '" + t.modelName + "' data-model-id= '" + t.modelId + "'  data-file='" + t.productFicheFileName + "' data-original='" + t.productFicheOriginalName + "' data-category='' class='link-text link-text-uk' title='" + d + "(" + t.productFicheproductLeve1Code + ")'>" + t.productFicheproductLeve1Code + "</a>",
                                l += "<a href='#' adobe-click='pdp-file-down-click' data-doc='" + t.secondProductFicheDocId + "' data-file='" + t.secondProductFicheFileName + "' data-original='" + t.secondProductFicheOriginalName + "'  data-category='' class='link-text link-text-eu' title='" + d + "(" + t.secondProductFicheproductLeve1Code + ")'>" + t.secondProductFicheproductLeve1Code + "</a></div></div></div>") : "" != t.productFicheFileName && "" != t.productFicheOriginalName && null != t.productFicheFileName && null != t.productFicheOriginalName && null != t.productFicheDocId && "" != t.productFicheDocId && (l += "<a href='#' adobe-click='pdp-file-down-click' data-doc='" + t.productFicheDocId + "' data-file='" + t.productFicheFileName + "' data-original='" + t.productFicheOriginalName + "' data-category='' class='link-text' title='" + d + "(" + t.productFicheproductLeve1Code + ")'><span class='fiche type-product'>" + o + "</span></a>"),
                                "uk" == $("html").attr("data-countrycode") && "" != t.energyLabel && "N" != t.energyLabel && null != t.energyLabel && null != t.energyLabelDocId && "" != t.energyLabelDocId && null != t.energyLabelFileName && "" != t.energyLabelFileName && null != t.energyLabelOriginalName && "" != t.energyLabelOriginalName && null != t.energyLabelImageAddr && "" != t.energyLabelImageAddr && null != t.energyLabelName && "" != t.energyLabelName && null != t.fEnergyLabelFileName && null != t.fEnergyLabelDocId && "" != t.fEnergyLabelDocId && "" != t.fEnergyLabelFileName && null != t.fEnergyLabelOriginalName && "" != t.fEnergyLabelOriginalName ? (i = "<div class='energy-label-wrap'><a href='#' class='label-link'><span class='label'><img src='" + t.energyLabelImageAddr + "' alt='" + t.energyLabelName + "'></span></a><div class='tooltip-link'><div class='tolltip-inner'>",
                                null != t.fEnergyLabelFileName && null != t.fEnergyLabelDocId && "" != t.fEnergyLabelDocId && "" != t.fEnergyLabelFileName && null != t.fEnergyLabelOriginalName && "" != t.fEnergyLabelOriginalName && (i += "<a href='#' class='link-text link-text-uk' adobe-click='pdp-file-down-click' data-doc='" + t.fEnergyLabelDocId + "' data-file='" + t.fEnergyLabelFileName + "' data-original='" + t.fEnergyLabelOriginalName + "'  data-category='' title='" + d + "(" + t.fenergyLabelproductLeve1Code + ")'>" + $("#pdfDownloadFileUk").val() + "</a>"),
                                i += "<a href='#' class='link-text link-text-eu' adobe-click='pdp-file-down-click' data-doc='" + t.energyLabelDocId + "' data-file='" + t.energyLabelFileName + "' data-original='" + t.energyLabelOriginalName + "'  data-category='' title='" + d + "(" + t.energyLabelproductLeve1Code + ")'>" + $("#pdfDownloadFileEu").val() + "</a></div></div></div>") : i = "<a href='#' adobe-click='pdp-file-down-click' data-doc='" + t.energyLabelDocId + "' data-file='" + t.energyLabelFileName + "' data-original='" + t.energyLabelOriginalName + "'  data-category='' class='link-text' title='" + d + "(" + t.energyLabelproductLeve1Code + ")'><span class='label type-none'><img src='" + t.energyLabelImageAddr + "' alt='" + t.energyLabelName + "'></span></a>",
                                "Y" == t.washTowerFlag && ("uk" == $("html").attr("data-countrycode") && "" != t.secondEnergyLabel && "N" != t.secondEnergyLabel && null != t.secondEnergyLabel && null != t.secondEnergyLabelDocId && "" != t.secondEnergyLabelDocId && null != t.secondEnergyLabelFileName && "" != t.secondEnergyLabelFileName && null != t.secondEnergyLabelOriginalName && "" != t.secondEnergyLabelOriginalName && null != t.secondEnergyLabelImageAddr && "" != t.secondEnergyLabelImageAddr && null != t.secondEnergyLabelName && "" != t.secondEnergyLabelName && null != t.secondFEnergyLabelFileName && null != t.secondFEnergyLabelDocId && "" != t.secondFEnergyLabelDocId && "" != t.secondFEnergyLabelFileName && null != t.secondFEnergyLabelOriginalName && "" != t.secondFEnergyLabelOriginalName ? (F = "<div class='energy-label-wrap'><a href='#' class='label-link'><span class='label'><img src='" + t.secondEnergyLabelImageAddr + "' alt='" + t.secondEnergyLabelName + "'></span></a>",
                                F += "<div class='tooltip-link'><div class='tolltip-inner'>",
                                F += "<a href='#' class='link-text link-text-uk' adobe-click='pdp-file-down-click' data-doc='" + t.secondFEnergyLabelDocId + "' data-file='" + t.secondFEnergyLabelFileName + "' data-original='" + t.secondFEnergyLabelOriginalName + "'  data-category='' title='" + d + "(" + t.secondFEnergyLabelproductLeve1Code + ")'>" + $("#pdfDownloadFileUk").val() + "</a>",
                                F += "<a href='#' class='link-text link-text-eu' adobe-click='pdp-file-down-click' data-doc='" + t.secondEnergyLabelDocId + "' data-file='" + t.secondEnergyLabelFileName + "' data-original='" + t.secondEnergyLabelOriginalName + "'  data-category='' title='" + d + "(" + t.secondEnergyLabelproductLeve1Code + ")'>" + $("#pdfDownloadFileEu").val() + "</a></div></div></div>") : F = "<a href='#' adobe-click='pdp-file-down-click' data-doc='" + t.secondEnergyLabelDocId + "' data-file='" + t.secondEnergyLabelFileName + "' data-original='" + t.secondEnergyLabelOriginalName + "'  data-category='' class='link-text' title='" + d + "(" + t.secondEnergyLabelproductLeve1Code + ")'><span class='label type-none'><img src='" + t.secondEnergyLabelImageAddr + "' alt='" + t.secondEnergyLabelName + "'></span></a>"),
                                "" != t.productFicheFileName && "" != t.productFicheOriginalName && null != t.productFicheFileName && null != t.productFicheOriginalName && null != t.productFicheDocId && "" != t.productFicheDocId && a.find(".file-list").append($(l)),
                                "" != t.energyLabel && "N" != t.energyLabel && null != t.energyLabel && null != t.energyLabelDocId && "" != t.energyLabelDocId && null != t.energyLabelFileName && "" != t.energyLabelFileName && null != t.energyLabelOriginalName && "" != t.energyLabelOriginalName && null != t.energyLabelImageAddr && "" != t.energyLabelImageAddr && null != t.energyLabelName && "" != t.energyLabelName && a.find(".file-list").append($(i)),
                                "" != t.secondEnergyLabel && "N" != t.secondEnergyLabel && null != t.secondEnergyLabel && null != t.secondEnergyLabelDocId && "" != t.secondEnergyLabelDocId && null != t.secondEnergyLabelFileName && "" != t.secondEnergyLabelFileName && null != t.secondEnergyLabelOriginalName && "" != t.secondEnergyLabelOriginalName && null != t.secondEnergyLabelImageAddr && "" != t.secondEnergyLabelImageAddr && null != t.secondEnergyLabelName && "" != t.secondEnergyLabelName && null != t.secondFEnergyLabelFileName && null != t.secondFEnergyLabelDocId && "" != t.secondFEnergyLabelDocId && "" != t.secondFEnergyLabelFileName && null != t.secondFEnergyLabelOriginalName && "" != t.secondFEnergyLabelOriginalName && a.find(".file-list").append($(F)),
                                "N" == t.pdrCompareUseFlag && a.find(".wishlist-compare").hide(),
                                a.find(".rating").hasClass("inhouse-review") && t.target && "NEW" == t.target.toUpperCase() ? (Y = (Y = (Y = a.find(".rating.inhouse-review").data("pattern")) || "#1 out of 5 stars. #2 reviews.").replace(/\#1/g, t.reviewRatingStar2).replace(/\#2/g, t.reviewRating),
                                a.find(".star-area").attr("data-model-id", t.modelId).attr("data-sku", t.modelName).attr("data-model-name", t.modelName).attr("data-model-salesmodelcode", t.salesModelCode + "." + t.salesSuffixCode).attr("data-category-name", t.buName2).attr("data-sub-category-name", V(t.buName3, "") || "").attr("data-super-category-name", t.superCategoryName).attr("data-model-year", t.modelYear).attr("data-model-suffixcode", t.salesSuffixCode).attr("data-bu", t.buName1).attr("data-model-overallscore", t.reviewRatingStar2).attr("data-model-reviewCnt", t.reviewRating).attr("data-price"),
                                x = (x = "*modelUrlPath*#pdp_review").replace(/\*modelUrlPath\*/g, t.modelUrlPath),
                                a.find(".rating.inhouse-review > a").attr("href", x),
                                a.find(".rating.inhouse-review > a").attr("aria-label", Y).find(".review-number").text("(" + t.reviewRating + ")").siblings(".star").find(".bg-star .carmine-star").css("width", t.reviewRatingPercent + "%")) : ("BV" == t.reviewType && "B2C" == K.bizType && t.target && "NEW" == t.target.toUpperCase() && a.find(".rating").replaceWith('<div class="rating" data-bv-show="inline_rating" data-bv-product-id="' + t.modelId + '" data-bv-redirect-url="' + t.modelUrlPath + '#pdp_review"></div>'),
                                "BV2" == t.reviewType && "B2C" == K.bizType && (a.find(".rating").removeClass("loaded").attr("data-modelid", t.modelId).removeAttr("id").find("a").attr("href", t.modelUrlPath + "#pdp_review"),
                                runBVStaticPLP(a)),
                                "SP" == t.reviewType && (a.find(".rating span[data-shoppilot]").attr("data-shoppilot", t.modelName.toLowerCase()).empty(),
                                "undefined" != typeof renderListingInlineRatingsRU && renderListingInlineRatingsRU(getProductsNameRU())));
                                $("[data-countrycode]").attr("data-countrycode");
                                var n = a.find(".label-inner ul")
                                  , i = a.find(".model-brand");
                                if (n.empty(),
                                0 < $(".GPC0007").length || 0 < $(".GPC0026").length) {
                                    for (var s = t.labelIconMap, c = $("[data-component-installmessage]").attr("data-component-installmessage"), m = $("[data-component-warrantyMessage]").attr("data-component-warrantyMessage"), p = $("[data-component-deliveryMessage]").attr("data-component-deliveryMessage"), u = 0; u < s.length; u++) {
                                        var g, b, h = s[u], f = h.shortDescType, y = "", v = '<li data-adobe-tracking-wish="Y" data-page-event="plp_labelicon"><img src="{{imagePathAddr}}" alt="{{altText}}" aria-hidden="true"><p>{{shortDesc}}</p></li>', C = '<li data-adobe-tracking-wish="Y" data-page-event="plp_labelicon"><p>{{shortDesc}}</p></li>', T = "";
                                        "AWARD" == f || "FEATURE" == f ? (T = "Y" == h.cssFontBold && "Y" == h.cssFontItalic ? "<li data-adobe-tracking-wish='Y' data-page-event='plp_labelicon' class='text-all'>" : "Y" == h.cssFontBold ? "<li data-adobe-tracking-wish='Y' data-page-event='plp_labelicon' class='text-bold'>" : "Y" == h.cssFontItalic ? "<li data-adobe-tracking-wish='Y' data-page-event='plp_labelicon' class='text-italic'>" : "<li data-adobe-tracking-wish='Y' data-page-event='plp_labelicon'>",
                                        null != h.linkUrl && "" != h.linkUrl && (T = T + "<a href='" + h.linkUrl + "' ",
                                        "S" == h.linkOpt ? T += "target='_self' data-adobe-tracking-wish='Y' data-page-event='plp-labelicon'>" : "B" == h.linkOpt && (T += "target='_blank' data-adobe-tracking-wish='Y' data-page-event='plp-labelicon'>")),
                                        T = "" != h.imagePathAddr && null != h.imagePathAddr ? T + "<img src='" + h.imagePathAddr + "' alt='" + h.altText + "' aria-hidden='true'><p>" + h.shortDesc + "</p>" : T + "<p>" + h.shortDesc + "</p>",
                                        null != h.linkUrl && "" != h.linkUrl && (T += "</a>"),
                                        y = T += "</li>") : "DELIVERY" == f ? (g = a.closest(".result-box").data("deliveryIcon"),
                                        y = "vn" == $("html").attr("data-countrycode") ? (b = "",
                                        b = "Y" == t.obsLeadTimeFlag && "" != t.obsLeadTimeMin && "" != t.obsLeadTimeMax ? p.replace("{{obsLeadTimeMin}}", t.obsLeadTimeMin).replace("{{obsLeadTimeMax}}", t.obsLeadTimeMax) : c,
                                        v.replace("{{imagePathAddr}}", "/lg5-common-gp/images/common/icons/" + g + ".svg").replace("{{altText}}", "").replace("{{shortDesc}}", b)) : "au" == $("html").attr("data-countrycode") ? '<li class="free-delivery d-none" data-adobe-tracking-wish="Y" data-page-event="plp_labelicon"><img src="{{imagePathAddr}}" alt="{{altText}}" aria-hidden="true"><p>{{shortDesc}}</p></li>'.replace("{{imagePathAddr}}", "/lg5-common-gp/images/common/icons/" + g + ".svg").replace("{{altText}}", "").replace("{{shortDesc}}", c) : "in" == $("html").attr("data-countrycode") && "B2C" == t.userGroup && null != t.obsInstallmentMemberCashback1 && "" != t.obsInstallmentMemberCashback1 ? C.replace("{{shortDesc}}", t.obsInstallmentMemberCashback1) : "in" == $("html").attr("data-countrycode") && "B2C" != t.userGroup && null != t.obsInstallmentCashback1 && "" != t.obsInstallmentCashback1 ? C.replace("{{shortDesc}}", t.obsInstallmentCashback1) : v.replace("{{imagePathAddr}}", "/lg5-common-gp/images/common/icons/" + g + ".svg").replace("{{altText}}", "").replace("{{shortDesc}}", c)) : "WARRANTY" == f ? y = "in" == $("html").attr("data-countrycode") && "B2C" == t.userGroup && null != t.obsInstallmentMemberCashback2 && "" != t.obsInstallmentMemberCashback2 ? C.replace("{{shortDesc}}", t.obsInstallmentMemberCashback2) : "in" == $("html").attr("data-countrycode") && "B2C" != t.userGroup && null != t.obsInstallmentCashback2 && "" != t.obsInstallmentCashback2 ? C.replace("{{shortDesc}}", t.obsInstallmentCashback2) : v.replace("{{imagePathAddr}}", "/lg5-common-gp/images/common/icons/warranty.svg").replace("{{altText}}", "").replace("{{shortDesc}}", m) : "SHIPPINGFLAG" == f ? y = v.replace("{{imagePathAddr}}", "/lg5-common-gp/images/common/icons/free-shipping_de.svg").replace("{{altText}}", V(h.shortDesc, "")).replace("{{shortDesc}}", V(h.shortDesc, "")) : "DELIVERYFLAG" == f ? y = v.replace("{{imagePathAddr}}", "/lg5-common-gp/images/common/icons/delievery_de.svg").replace("{{altText}}", V(h.shortDesc, "")).replace("{{shortDesc}}", V(h.shortDesc, "")) : "INSTALLATIONFLAG" == f ? y = v.replace("{{imagePathAddr}}", "/lg5-common-gp/images/common/icons/installation_de.svg").replace("{{altText}}", V(h.shortDesc, "")).replace("{{shortDesc}}", V(h.shortDesc, "")) : "KEYFEATUREFLAG" == f ? y = T = "Y" == h.cssFontBold && "Y" == h.cssFontItalic ? "<li data-adobe-tracking-wish='Y' data-page-event='plp_labelicon' class='text-all'><p>" + V(h.shortDesc, "") + "</p></li>" : "Y" == h.cssFontBold ? "<li data-adobe-tracking-wish='Y' data-page-event='plp_labelicon' class='text-bold'><p>" + V(h.shortDesc, "") + "</p></li>" : "Y" == h.cssFontItalic ? "<li data-adobe-tracking-wish='Y' data-page-event='plp_labelicon' class='text-italic'><p>" + V(h.shortDesc, "") + "</p></li>" : "<li data-adobe-tracking-wish='Y' data-page-event='plp_labelicon'><p>" + V(h.shortDesc, "") + "</p></li>" : "REPAIRABILITY INDEX" != f && (y = C.replace("{{shortDesc}}", h.shortDesc)),
                                        n.append(y),
                                        "DELIVERY" == f && "au" == $("html").attr("data-countrycode") && ("B2E" == $(".navigation").attr("data-obs-group") ? $(".free-delivery").addClass("d-none") : $(".free-delivery").removeClass("d-none"));
                                        var k, w, N, L, P = a.find(".repairability-index");
                                        0 < t.labelRepairMap.length ? (k = t.labelRepairMap[0],
                                        w = P.attr("data-repairability-msg"),
                                        N = P.attr("data-target-blank-msg"),
                                        L = "<div class='score'>",
                                        L += "<span class='txt'>" + w + "</span>",
                                        "null" != k.linkUrl && "" != k.linkUrl ? (L += "<a href='" + k.linkUrl + "'",
                                        "S" == k.linkOpt ? L += " target='_self'" : "B" == k.linkOpt && (L += " target='_blank'"),
                                        L += " title='" + N + "' class='link-pdf'>") : L += "<span class='link-pdf'>",
                                        "null" != k.imagePathAddr && "" != k.imagePathAddr && (L += "<img src='" + k.imagePathAddr + "' alt='" + k.altText + "' area-hidden='true' />"),
                                        "null" != k.linkUrl && "" != k.linkUrl ? L += "</a></div>" : L += "</span></div>",
                                        P.html(L)) : P.html("")
                                    }
                                    "card" == z && (i = a.find(".model-brand-area"),
                                    "B2C" == t.bizType && "Y" == t.signatureFlag && (I = '<span class="brand-signature"><img src="/lg5-common-gp/images/products/brand-label/brand-sg.svg" alt="LG Signature"></span>',
                                    i.append(I)),
                                    "Y" == t.thinqFlag && (I = '<span class="brand-thinq"><img src="/lg5-common-gp/images/products/brand-label/brand-thinq.svg" alt="LG ThinQ"></span>',
                                    i.append(I))),
                                    0 < i.length && (i.empty(),
                                    "card" == z || ("B2C" == t.bizType && "Y" == t.signatureFlag && (I = '<a rel="nofollow" href="' + t.modelUrlPath + '"aria-hidden="true" tabindex="-1" data-link-area="product_list-model_list" data-link-name="' + t.modelName + '" data-adobe-modelname=" ' + t.modelName + '" data-adobe-salesmodelcode="' + t.salesModelCode + '" data-adobe-salessuffixcode="' + t.salesSuffixCode + ' data-adobe-tracking-wish="Y" data-page-event="plp-brand-flag">',
                                    I += '<span><img src="/lg5-common-gp/images/products/brand-label/brand-sg.svg" alt="LG Signature"></span> </a>',
                                    i.append(I)),
                                    "Y" == t.thinqFlag && (I = '<a rel="nofollow" href="' + t.modelUrlPath + '"aria-hidden="true" tabindex="-1" data-link-area="product_list-model_list" data-link-name="' + t.modelName + '" data-adobe-modelname=" ' + t.modelName + '" data-adobe-salesmodelcode="' + t.salesModelCode + '" data-adobe-salessuffixcode="' + t.salesSuffixCode + '">',
                                    I += '<span><img src="/lg5-common-gp/images/products/brand-label/brand-thinq.svg" alt="LG ThinQ"></span></a>',
                                    i.append(I))))
                                }
                                0 < (P = a.find(".repairability-index")).length && (0 < t.labelRepairMap.length ? (k = t.labelRepairMap[0],
                                w = P.attr("data-repairability-msg"),
                                N = P.attr("data-target-blank-msg"),
                                L = "<div class='score'>",
                                L += "<span class='txt'>" + w + "</span>",
                                "null" != k.linkUrl && "" != k.linkUrl ? (L += "<a href='" + k.linkUrl + "'",
                                "S" == k.linkOpt ? L += " target='_self'" : "B" == k.linkOpt && (L += " target='_blank'"),
                                L += " title='" + N + "' class='link-pdf'>") : L += "<span class='link-pdf'>",
                                "null" != k.imagePathAddr && "" != k.imagePathAddr && (L += "<img src='" + k.imagePathAddr + "' alt='" + k.altText + "' area-hidden='true' />"),
                                "null" != k.linkUrl && "" != k.linkUrl ? L += "</a></div>" : L += "</span></div>",
                                P.html(L)) : P.html("")),
                                "Y" != t.obsEmiMsgFlag && (t.emiMsg = ""),
                                a.find(".price-vip-Installment .price-vip").text(""),
                                "au" == COUNTRY_CODE.toLowerCase() ? ($emiMsgArea = a.find(".price-afterpay"),
                                $emiZipPayMsgArea = a.find(".price-zippay"),
                                $emiZipPayMsgArea.text("")) : $emiMsgArea = a.find(".price-installment, .price-installment-text"),
                                $emiMsgArea.text(""),
                                null != t.emiMsg && "" != t.emiMsg && "Y" == t.obsEmiMsgFlag && ("au" == COUNTRY_CODE ? t.afterPay <= 3e3 && 0 < t.afterPay ? ($emiMsgArea.prop("href", "#modal-afterPay").addClass("afterpay-installment").removeAttr("style").html(t.emiMsg),
                                $emiZipPayMsgArea.prop("href", "#modal-afterPay").addClass("afterpay-installment").removeAttr("style").html("or " + t.obsZipPayMsg)) : 3e3 < t.afterPay && t.afterPay <= 5e3 ? $emiZipPayMsgArea.prop("href", "#modal-afterPay").addClass("afterpay-installment").removeAttr("style").html(t.obsZipPayMsg) : ($emiMsgArea.removeAttr("href").removeClass("afterpay-installment").prop("style", "display:none;"),
                                $emiZipPayMsgArea.removeAttr("href").removeClass("afterpay-installment").prop("style", "display:none;")) : $emiMsgArea.text(t.emiMsg));
                                var F = function(e, a) {
                                    let t, r;
                                    switch (a) {
                                    case "lowest":
                                        t = "lowest-price",
                                        r = "has-lowPrice";
                                        break;
                                    case "membership":
                                        t = "member-text",
                                        r = "has-member"
                                    }
                                    a = e + " ." + t;
                                    $(a).length && $(e + " .model-buy").addClass(r)
                                };
                                $membershipArea = a.find("[data-sibling-membership-template]"),
                                $membershipArea.html("");
                                var x = $("#openTarget").val();
                                "_blank" == t.obsMembershipLinkTarget || (x = "");
                                var I, A, E, M, U, S, Y = "", i = "";
                                "Y" == t.membershipDisplayFlag && 0 < $membershipArea.length && ("" != t.obsMembershipLinkUrl && null != t.obsMembershipLinkUrl && (Y = "<a href='" + t.obsMembershipLinkUrl + "' target='" + t.obsMembershipLinkTarget + "' title='" + x + "'>",
                                i = "</a>"),
                                I = $membershipArea.attr("data-sibling-membership-template").replace("*siblingMembershipPrice*", changeFormatFullPrice(t.rMembershipPrice, t.rMembershipPriceCent)).replace("*obsMemberShipLinkStart*", Y).replace("*obsMemberShipLinkEnd*", i),
                                $membershipArea.html(I)),
                                $membershipTemplateArea = a.find(".member-text"),
                                $membershipTemplateArea.html(""),
                                a.find(".model-buy").hasClass("has-member") && a.find(".model-buy").removeClass("has-member"),
                                "Y" == t.membershipDisplayFlag && 0 < $membershipTemplateArea.length && ("" != t.obsMembershipLinkUrl && null != t.obsMembershipLinkUrl && (Y = "<a href='" + t.obsMembershipLinkUrl + "' target='" + t.obsMembershipLinkTarget + "' title='" + x + "'>",
                                i = "</a>"),
                                A = $("template.product-member-price").clone().html().replace("*siblingMembershipPrice*", changeFormatFullPrice(t.rMembershipPrice, t.rMembershipPriceCent)).replace("*obsMemberShipLinkStart*", Y).replace("*obsMemberShipLinkEnd*", i),
                                $membershipTemplateArea.html(A),
                                a.find(".model-buy").hasClass("has-member") || a.find(".model-buy").addClass("has-member")),
                                F(".GPC0007", "membership"),
                                $cheaperPriceArea = a.find("[data-sibling-cheaperPrice-template]"),
                                $cheaperPriceArea.html(""),
                                "Y" == t.cheaperPriceFlag && 0 < $cheaperPriceArea.length && (A = $cheaperPriceArea.attr("data-sibling-cheaperPrice-template").replace("*siblingCheaperPrice*", changeFormatFullPrice(t.cheaperPrice, t.cheaperPriceCent)),
                                $cheaperPriceArea.html(A)),
                                $lowestPriceArea = a.find("[data-sibling-lowestPrice-template]"),
                                $lowestPrice = a.find("[data-sibling-lowestPrice-template] .price"),
                                "Y" == t.obsLowestPriceFlag && 0 < $lowestPriceArea.length ? (E = $lowestPriceArea.attr("data-sibling-lowestPrice-template").replace("*siblingLowestPrice*", changeFormatFullPrice(t.obsLowestPrice, t.obsLowestPriceCent)),
                                $lowestPrice.html(E),
                                $lowestPriceArea.removeClass("d-none")) : $lowestPriceArea.addClass("d-none"),
                                $lowestPriceTemplateArea = a.find(".lowest-price"),
                                $lowestPriceTemplateArea.html(""),
                                a.find(".model-buy").hasClass("has-lowPrice") && a.find(".model-buy").removeClass("has-lowPrice"),
                                "Y" == t.obsLowestPriceFlag && 0 < $lowestPriceTemplateArea.length && (E = $("template.obs-lowest-price").clone().html().replace("*siblingLowestPrice*", changeFormatFullPrice(t.obsLowestPrice, t.obsLowestPriceCent)),
                                $lowestPriceTemplateArea.html(E),
                                a.find(".model-buy").hasClass("has-lowPrice") || a.find(".model-buy").addClass("has-lowPrice")),
                                F(".GPC0007", "lowest"),
                                $priceArea = a.find(".price-area.total"),
                                0 != $priceArea.length && ($priceArea.removeClass("type-none type-default type-msrp type-promotion type-text"),
                                "DISCONTINUED" == t.modelStatusCode || ("Y" == t.retailerPricingFlag ? ($priceArea.addClass("type-text"),
                                $priceArea.find(".text").text(t.retailerPricingText)) : null != t.rPromoPrice && null != t.rPrice && "" != t.rPromoPrice && "" != t.rPrice ? ($priceArea.addClass("type-promotion"),
                                $priceArea.find(".purchase-price .price .number").text(changeFormatFullPrice(t.rPromoPrice, t.rPromoPriceCent)),
                                $priceArea.find(".product-price .price .number").text(changeFormatFullPrice(t.rPrice, t.rPriceCent)),
                                $priceArea.find(".product-price .legal").html(null == t.discountMsg ? "" : t.discountMsg.replace(/&lt;/gi, "<").replace(/&gt;/gi, ">"))) : "B2B" == K.bizType && "Y" != t.obsLoginFlag ? null != t.rPrice && "" != t.rPrice ? ($priceArea.addClass("type-msrp"),
                                $priceArea.find(".purchase-price .price .number").text(changeFormatFullPrice(t.rPrice, t.rPriceCent))) : $priceArea.addClass("type-none") : null != t.rPrice && "" != t.rPrice ? ($priceArea.addClass("type-default"),
                                "Y" == $("#_fixSiblingPrice").val() && (M = $("#_currencyPosition").val(),
                                U = $("#_currnecySymbol").val(),
                                $priceArea.find(".purchase-price .price .number").length || (S = '<div class="purchase-price"><div class="price">',
                                S += "L" == M ? '<span class="unit">' + U + '</span><span class="number"></span>' : '<span class="number"></span><span class="unit">' + U + "</span>",
                                S += "</div></div>",
                                $priceArea.append(S))),
                                $priceArea.find(".purchase-price .price .number").text(changeFormatFullPrice(t.rPrice, t.rPriceCent))) : $priceArea.addClass("type-none")),
                                ISVIP && $priceArea.addClass("vip-price-area"),
                                O = "N" == t.vipPriceFlag && "Y" == t.obsLimitSale && "Y" == t.limitSaleUseFlag ? "Y" : "N",
                                "Y" == t.vipPriceFlag ? (E = changeFormatFullPrice(t.rPrice, t.rPriceCent),
                                F = changeFormatFullPrice(t.rPromoPrice, t.rPromoPriceCent),
                                M = null == t.discountMsg ? "" : t.discountMsg.replace(/&lt;/gi, "<").replace(/&gt;/gi, ">"),
                                U = t.productMessages.vipPriceMessage || "",
                                S = t.productMessages.previousPriceText || "",
                                D = "Y" == t.obsEmiMsgFlag && null != t.emiMsg ? t.emiMsg : "",
                                setVipPrice($priceArea, E, F, M, U, S, t.modelId + "/model-switcher.js", D, t.afterPay, O, t.limitSaleTitle)) : "Y" == SIGN_IN_STATUS && null != t.emiMemberMsg && "" != t.emiMemberMsg && 0 < $(".GPC0007,.GPC0009").length && setInstallmentMember($priceArea, t.emiMemberMsg),
                                0 < $(".GPC0007,.GPC0026,.GPC0132,.GPC0009").length && 0 < $priceArea.siblings(".price-vip-Installment,.price-pdp-Installment").length && $priceArea.removeClass("vip-price-area")),
                                null != t.promotionText && "" != t.promotionText ? a.find(".promotion-text").html("<p class='info-txt'><span>" + t.promotionText + "</span></p>") : a.find(".promotion-text").html(""),
                                a.find(".promotion-text").addClass("box-type");
                                var D = "";
                                null != t.externalLinkTarget && "" != t.externalLinkTarget && "it" == $("html").attr("data-countrycode") && (D = "self" == (D = t.externalLinkTarget.toLowerCase()) ? "_self" : "_blank");
                                var O = "<p class='info-txt'><a href='" + t.promotionLinkUrl + "' target = '" + D + "' >" + t.promotionText + "</a></p>";
                                null != t.promotionLinkUrl && "" != t.promotionLinkUrl && (a.find(".promotion-text").empty(),
                                a.find(".promotion-text").append($(O)));
                                D = $("#opensTarget").val();
                                t.externalLinkTarget && "New" == t.externalLinkTarget && a.find(".promotion-text a").attr("target", "_blank").attr("title", D);
                                O = a.find(".stock-area");
                                0 < O.length && ("Y" == t.reStockAlertFlag ? "Y" == t.limitSaleUseFlag && "Y" == t.obsLimitSale && "Y" != t.obsInventoryFlag ? O.addClass("out-of-stock").html(' <span class="icon" aria-hidden="true"></span> <span class="text">' + t.productMessages.limitSaleSoldOutText + "</span>") : O.addClass("out-of-stock").html(' <span class="icon" aria-hidden="true"></span> <span class="text">' + t.productMessages.outOfStockText + "</span>") : "Y" == t.limitSaleUseFlag && "Y" == t.obsLimitSale && "Y" != t.obsInventoryFlag ? O.addClass("out-of-stock").html(' <span class="icon" aria-hidden="true"></span> <span class="text">' + t.productMessages.limitSaleSoldOutText + "</span>") : O.removeClass("out-of-stock").empty()),
                                "Y" == t.obsComTagShowFlag ? (("Y" == t.limitSaleUseFlag && "Y" == t.obsLimitSale || "Y" == t.obsPreOrderFlag || "Y" == t.obsPreOrderRSAFlag) && 0 < a.find(".tag-content p").length && "Y" != t.vipPriceFlag && a.find(".price-vip-Installment .price-vip").text(t.limitSaleTitle),
                                ("Y" == t.limitSaleUseFlag && "Y" == t.obsLimitSale || "Y" == t.obsPreOrderFlag || "Y" == t.obsPreOrderRSAFlag) && 0 < a.find(".tag-content span").length && 0 == a.find(".tag-content p").length && "Y" != t.vipPriceFlag && a.find(".price-vip-Installment .price-vip").text(t.limitSaleTitle)) : (("Y" == t.limitSaleUseFlag && "Y" == t.obsLimitSale || "Y" == t.obsPreOrderFlag || "Y" == t.obsPreOrderRSAFlag) && 0 < a.find(".tag-content p").length && (a.find(".tag-content p").addClass("tag-imp"),
                                "Y" != t.vipPriceFlag && a.find(".price-vip-Installment .price-vip").text(t.limitSaleTitle)),
                                ("Y" == t.limitSaleUseFlag && "Y" == t.obsLimitSale || "Y" == t.obsPreOrderFlag || "Y" == t.obsPreOrderRSAFlag) && 0 < a.find(".tag-content span").length && 0 == a.find(".tag-content p").length && (a.find(".tag-content span").addClass("flag-imp"),
                                "Y" != t.vipPriceFlag && a.find(".price-vip-Installment .price-vip").text(t.limitSaleTitle))),
                                "card" == z ? (a.find(".area-top .tag-box").find('[data-user-type=""]').removeClass("d-none"),
                                a.find(".area-top .tag-box").find("[data-user-type=ALL]").removeClass("d-none"),
                                ("Y" == SIGN_IN_STATUS && ISVIP ? a.find(".area-top .tag-box").find("[data-user-type=VIP]") : a.find(".area-top .tag-box").find("[data-user-type=NON_VIP]")).removeClass("d-none")) : (a.find(".tag-content").find('[data-user-type=""]').removeClass("d-none"),
                                a.find(".tag-content").find("[data-user-type=ALL]").removeClass("d-none"),
                                ("Y" == SIGN_IN_STATUS && ISVIP ? a.find(".tag-content").find("[data-user-type=VIP]") : a.find(".tag-content").find("[data-user-type=NON_VIP]")).removeClass("d-none")),
                                "Y" == t.preOrderTagEnableFlag && a.find(".tag-content").empty(),
                                "card" == z ? (0 < a.find("a.re-stock-alert").length && (t.reStockAlertFlag && "Y" == t.reStockAlertFlag ? a.find("a.re-stock-alert").removeClass("hidden") : a.find("a.re-stock-alert").addClass("hidden")),
                                "Y" == t.addToCartFlag ? "Y" == t.obsBuynowFlag ? a.find("a.add-to-cart").addClass("hidden") : a.find("a.add-to-cart").removeClass("hidden").attr("data-model-id", t.modelId).attr("href", "#").text(t.productMessages.addToCartBtnNm).attr("role", "button").removeAttr("target title") : "S" == t.addToCartFlag ? a.find("a.add-to-cart").removeClass("hidden").attr("data-model-id", t.modelId).attr("href", "#").text(t.productMessages.addToCartBtnNm).attr("role", "button").removeAttr("target title") : a.find("a.add-to-cart").addClass("hidden"),
                                "Y" == t.installationFlag && null != t.installationFlag && "" != t.installationFlag ? a.find("js-installration").removeClass("hidden") : a.find("js-installration").addClass("hidden"),
                                "Y" == t.inquiryToBuyFlag && null != t.inquiryToBuyUrl && "" != t.inquiryToBuyUrl ? a.find("a.inquiry-to-buy").removeClass("hidden").attr("href", t.inquiryToBuyUrl).text(t.productMessages.inquiryToBuyBtnNm) : a.find("a.inquiry-to-buy").addClass("hidden"),
                                "Y" == t.whereToBuyFlag && null != t.whereToBuyUrl && "" != t.whereToBuyUrl ? (a.find("a.where-to-buy").attr("href", t.whereToBuyUrl).text(t.productMessages.whereToBuyBtnNm).parent().removeClass("hidden"),
                                a.find("a.where-to-buy").parent().removeAttr("target title")) : "Y" == t.wtbExternalLinkUseFlag && null != t.wtbExternalLinkUrl && "" != t.wtbExternalLinkUrl && null != t.wtbExternalLinkName && "" != t.wtbExternalLinkName ? (a.find("a.in-buynow:not(.add-to-cart)").attr("href", t.wtbExternalLinkUrl).text(t.wtbExternalLinkName).attr("data-link-name", "buy_now").removeAttr("data-sc-item").parent().removeClass("hidden"),
                                "Y" == t.wtbExternalLinkSelfFlag ? a.find("a.in-buynow:not(.add-to-cart)").removeAttr("target title") : a.find("a.in-buynow:not(.add-to-cart)").attr("target", "_blank").attr("title", productMessages.btnNewLinkTitle)) : a.find("a.where-to-buy").parent().addClass("hidden"),
                                "Y" == t.findTheDealerFlag && null != t.findTheDealerUrl && "" != t.findTheDealerUrl ? a.find("a.find-a-dealer").attr("href", t.findTheDealerUrl).text(t.productMessages.findTheDealerBtnNm).parent().removeClass("hidden") : a.find("a.find-a-dealer").parent().addClass("hidden")) : ("Y" == t.reStockAlertFlag ? (a.find(".button a.re-stock-alert").addClass("active").attr("data-model-id", t.modelId).attr("href", "#modal_re_stock_alert").attr("data-sku", t.modelName).attr("data-model-name", t.modelName).attr("data-model-salesmodelcode", t.salesModelCode + "." + t.salesSuffixCode).attr("data-category-name", t.buName2).attr("data-sub-category-name", V(t.buName3, "") || "").attr("data-super-category-name", t.superCategoryName).attr("data-model-year", t.modelYear).attr("data-model-suffixcode", t.salesSuffixCode).attr("data-bu", t.buName1),
                                a.find(".button a.add-to-cart").removeClass("active")) : a.find(".button a.re-stock-alert").removeClass("active"),
                                "Y" == t.obsPreOrderFlag ? ("Y" == t.obsBuynowFlag ? ("Y" == t.preOrderTagEnableFlag ? (a.find(".button a.add-to-cart").is("[data-keyword-search-url]") ? a.find(".button a.add-to-cart").addClass("active").attr("data-model-id", t.modelId).attr("href", "#").attr("data-keyword-search-url", t.modelUrlPath) : a.find(".button a.add-to-cart").addClass("active").attr("data-model-id", t.modelId).attr("href", t.modelUrlPath)).text(t.productMessages.customOrderBtnNm) : (a.find(".button a.add-to-cart").is("[data-keyword-search-url]") ? a.find(".button a.add-to-cart").addClass("active").attr("data-model-id", t.modelId).attr("href", "#").attr("data-keyword-search-url", t.modelUrlPath) : a.find(".button a.add-to-cart").addClass("active").attr("data-model-id", t.modelId).attr("href", t.modelUrlPath)).text(t.productMessages.preOrderBtnNm)).removeAttr("target title role").addClass("pre-order in-buynow") : ("Y" == t.preOrderTagEnableFlag ? a.find(".button a.add-to-cart").addClass("active").attr("data-model-id", t.modelId).attr("href", "#").text(t.productMessages.customOrderBtnNm) : a.find(".button a.add-to-cart").addClass("active").attr("data-model-id", t.modelId).attr("href", "#").text(t.productMessages.preOrderBtnNm)).attr("role", "button").removeAttr("target title").addClass("pre-order")).attr("data-obs-pre-order-start-date", t.obsPreOrderStartDate).attr("data-obs-pre-order-end-date", t.obsPreOrderEndDate) : "N" != t.addToCartFlag ? "Y" == t.addToCartFlag ? "Y" == t.obsBuynowFlag ? (B = $("#buynow").val(),
                                0 < a.find(".button a.in-buynow").length ? ((a.find(".button a.in-buynow").is("[data-keyword-search-url]") ? a.find(".button a.in-buynow").addClass("active").attr("href", "#").attr("data-keyword-search-url", t.modelUrlPath) : a.find(".button a.in-buynow").addClass("active").attr("href", t.modelUrlPath)).text(B).removeAttr("target title"),
                                a.find(".button a.in-buynow").attr("data-model-id", t.modelId).attr("data-sku", t.modelName).attr("data-model-salesmodelcode", t.salesModelCode + "." + t.salesSuffixCode).attr("data-buname-one", t.buName1).attr("data-buname-two", t.buName2).attr("data-buname-three", V(t.buName3, "") || "").attr("data-category-name", t.superCategoryName).attr("data-model-year", t.modelYear).attr("data-bu", t.buName1).attr("data-price", t.priceValue).attr("data-msrp", t.msrp)) : ((a.find(".button a.add-to-cart").is("[data-keyword-search-url]") ? a.find(".button a.add-to-cart").addClass("in-buynow").addClass("active").attr("href", "#").attr("data-keyword-search-url", t.modelUrlPath) : a.find(".button a.add-to-cart").addClass("in-buynow").addClass("active").attr("href", t.modelUrlPath)).text(B),
                                a.find(".button a.in-buynow").attr("data-model-id", t.modelId).attr("data-sku", t.modelName).removeAttr("role").attr("data-model-salesmodelcode", t.salesModelCode + "." + t.salesSuffixCode).attr("data-buname-one", t.buName1).attr("data-buname-two", t.buName2).attr("data-buname-three", V(t.buName3, "") || "").attr("data-category-name", t.superCategoryName).attr("data-model-year", t.modelYear).attr("data-bu", t.buName1).attr("data-price", t.priceValue).attr("data-msrp", t.msrp).text(t.productMessages.buyNowBtnNm2))) : a.find(".button a.add-to-cart").addClass("active").attr("data-model-id", t.modelId).attr("data-sku", t.modelName).attr("data-model-salesmodelcode", t.salesModelCode + "." + t.salesSuffixCode).attr("data-biztype", t.bizType).attr("data-buname-one", t.buName1).attr("data-buname-two", t.buName2).attr("data-buname-three", V(t.buName3, "") || "").attr("data-category-name", t.superCategoryName).attr("data-price", r).attr("data-msrp", t.msrp).attr("href", "#").text(t.productMessages.addToCartBtnNm).attr("role", "button").removeAttr("target title") : "S" == t.addToCartFlag && a.find(".button a.add-to-cart").addClass("active").attr("data-model-id", t.modelId).attr("data-sku", t.modelName).attr("data-model-salesmodelcode", t.salesModelCode + "." + t.salesSuffixCode).attr("data-biztype", t.bizType).attr("data-buname-one", t.buName1).attr("data-buname-two", t.buName2).attr("data-buname-three", V(t.buName3, "") || "").attr("data-category-name", t.superCategoryName).attr("data-price", r).attr("data-msrp", t.msrp).attr("href", "#").text(t.productMessages.addToCartBtnNm).attr("role", "button").removeAttr("target title") : "Y" == t.buyNowFlag || "L" == t.buyNowFlag ? ("_blank" == t.ecommerceTarget ? a.find(".button a.add-to-cart").addClass("active").attr("data-model-id", t.modelId).attr("href", t.buyNowUrl).text(t.productMessages.buyNowBtnNm).removeAttr("role").attr("target", "_blank").attr("title", t.productMessages.btnNewLinkTitle) : a.find(".button a.add-to-cart").addClass("active").attr("data-model-id", t.modelId).attr("href", t.buyNowUrl).text(t.productMessages.buyNowBtnNm).removeAttr("role").removeAttr("target title"),
                                a.find(".button a.add-to-cart").is("[data-keyword-search-url]") && a.find(".button a.add-to-cart").attr("href", "#").attr("data-keyword-search-url", t.buyNowUrl)) : "Y" == t.resellerBtnFlag ? (a.find(".button a.add-to-cart").is("[data-keyword-search-url]") ? a.find(".button a.add-to-cart").addClass("active").attr("data-model-id", t.modelId).attr("href", "#").attr("data-keyword-search-url", t.resellerLinkUrl) : a.find(".button a.add-to-cart").addClass("active").attr("data-model-id", t.modelId).attr("href", t.resellerLinkUrl)).text(t.productMessages.resellerBtnNm).removeAttr("role").attr("target", "_blank").attr("title", t.productMessages.btnNewLinkTitle) : "Y" == t.productSupportFlag ? (a.find(".button a.add-to-cart").is("[data-keyword-search-url]") ? a.find(".button a.add-to-cart").addClass("active").attr("data-model-id", t.modelId).attr("href", "#").attr("data-keyword-search-url", t.productSupportUrl) : a.find(".button a.add-to-cart").addClass("active").attr("data-model-id", t.modelId).attr("href", t.productSupportUrl)).text(t.productMessages.productSupportBtnNm).removeAttr("role").removeAttr("target title") : "N" == t.obsBuynowFlag ? a.find(".button a.add-to-cart").removeClass("in-buynow") : a.find(".button a.add-to-cart").removeClass("active"),
                                _ = "",
                                _ = 0 < a.find(".button a.where-to-buy").length ? "Y" == t.obsBuynowFlag ? a.find(".button .btn-outline-secondary.where-to-buy") : a.find(".button a.where-to-buy") : "Y" == t.obsBuynowFlag ? a.find(".button .btn-outline-secondary.in-buynow") : a.find(".button a.in-buynow"),
                                "Y" == t.whereToBuyFlag && null != t.whereToBuyUrl && "" != t.whereToBuyUrl ? ((_.is("[data-keyword-search-url]") ? _.addClass("active").addClass("where-to-buy").attr("href", "#").attr("data-keyword-search-url", t.whereToBuyUrl) : _.addClass("active").addClass("where-to-buy").attr("href", t.whereToBuyUrl)).text(t.productMessages.whereToBuyBtnNm).attr("data-link-name", "where-to-buy").attr("data-sc-item", "where-to-buy").removeClass("in-buynow"),
                                _.removeAttr("target title"),
                                _.attr("data-model-id", t.modelId).attr("data-sku", t.modelName).attr("data-model-salesmodelcode", t.salesModelCode + "." + t.salesSuffixCode).attr("data-buname-one", t.buName1).attr("data-buname-two", t.buName2).attr("data-buname-three", V(t.buName3, "") || "").attr("data-category-name", t.superCategoryName).attr("data-model-year", t.modelYear).attr("data-bu", t.buName1).attr("data-price", r).attr("data-msrp", t.msrp)) : "Y" == t.wtbExternalLinkUseFlag && null != t.wtbExternalLinkUrl && "" != t.wtbExternalLinkUrl && null != t.wtbExternalLinkName && "" != t.wtbExternalLinkName ? ((_.is("[data-keyword-search-url]") ? _.addClass("active").addClass("in-buynow").attr("href", "#").attr("data-keyword-search-url", t.wtbExternalLinkUrl) : _.addClass("active").addClass("in-buynow").attr("href", t.wtbExternalLinkUrl)).text(t.wtbExternalLinkName).attr("data-link-name", "buy_now").removeAttr("data-sc-item").removeClass("where-to-buy"),
                                "Y" == t.wtbExternalLinkSelfFlag ? _.removeAttr("target title") : _.attr("target", "_blank").attr("title", t.productMessages.btnNewLinkTitle)) : _.removeClass("active"),
                                $buyNowUnionStoreBtn = "",
                                "Y" == t.buyNowUnionStoreBtnFlag ? ($buyNowUnionStoreBtn = a.find(".button a.buyNowUnionBtn"),
                                $buyNowUnionStoreBtn.addClass("active"),
                                $buyNowUnionStoreBtn.attr("data-url", t.obsPartnerUrl)) : a.find(".button a.buyNowUnionBtn").removeClass("active"),
                                "Y" == t.findTheDealerFlag && null != t.findTheDealerUrl && "" != t.findTheDealerUrl ? (a.find(".button a.find-a-dealer").is("[data-keyword-search-url]") ? a.find(".button a.find-a-dealer").addClass("active").attr("href", "#").attr("data-keyword-search-url", t.findTheDealerUrl) : a.find(".button a.find-a-dealer").addClass("active").attr("href", t.findTheDealerUrl)).text(t.productMessages.findTheDealerBtnNm).attr("data-model-id", t.modelId).attr("data-sku", t.modelName).attr("data-model-name", t.modelName).attr("data-model-salesmodelcode", t.salesModelCode + "." + t.salesSuffixCode).attr("data-category-name", t.buName2).attr("data-sub-category-name", V(t.buName3, "") || "").attr("data-super-category-name", t.superCategoryName).attr("data-model-year", t.modelYear).attr("data-model-suffixcode", t.salesSuffixCode).attr("data-bu", t.buName1).attr("data-price", r).attr("data-msrp", t.msrp) : a.find(".button a.find-a-dealer").removeClass("active"),
                                "Y" == t.inquiryToBuyFlag && null != t.inquiryToBuyUrl && "" != t.inquiryToBuyUrl ? (a.find(".button a.inquiry-to-buy").is("[data-keyword-search-url]") ? a.find(".button a.inquiry-to-buy").addClass("active").attr("href", "#").attr("data-keyword-search-url", t.inquiryToBuyUrl) : a.find(".button a.inquiry-to-buy").addClass("active").attr("href", t.inquiryToBuyUrl)).text(t.productMessages.inquiryToBuyBtnNm).attr("data-model-id", t.modelId).attr("data-sku", t.modelName).attr("data-model-name", t.modelName).attr("data-model-salesmodelcode", t.salesModelCode + "." + t.salesSuffixCode).attr("data-category-name", t.buName2).attr("data-sub-category-name", V(t.buName3, "") || "").attr("data-super-category-name", t.superCategoryName).attr("data-model-year", t.modelYear).attr("data-model-suffixcode", t.salesSuffixCode).attr("data-bu", t.buName1).attr("data-price", r).attr("data-msrp", t.msrp) : a.find(".button a.inquiry-to-buy").removeClass("active")),
                                a.find(".wishlist-compare").length && (a.find(".wishlist-compare .js-compare").attr("data-model-id", t.modelId).attr("data-sku", t.modelName).attr("data-model-name", t.modelName).attr("data-model-salesmodelcode", t.salesModelCode + "." + t.salesSuffixCode).attr("data-category-name", t.buName2).attr("data-sub-category-name", V(t.buName3, "") || "").attr("data-super-category-name", t.superCategoryName).attr("data-model-year", t.modelYear).attr("data-model-suffixcode", t.salesSuffixCode).attr("data-bu", t.buName1).attr("data-price", r).attr("data-msrp", t.msrp),
                                null != getCookie(compareCookie.name) ? (t.modelId,
                                -1 != getCookie(compareCookie.name).indexOf(t.modelId) ? a.find(".wishlist-compare .js-compare").addClass("added") : a.find(".wishlist-compare .js-compare").removeClass("added")) : a.find(".wishlist-compare .js-compare").removeClass("added")),
                                t.target && "SELF" == t.target.toUpperCase() ? a.addClass("self") : a.removeClass("self"),
                                null != t.modelName && "" != t.modelName && "undefined" != t.modelName ? a.find("a.visual").data("adobe-modelname", t.modelName) : a.find("a.visual").data("adobe-modelname", ""),
                                null != t.salesModelCode && "" != t.salesModelCode && "undefined" != t.salesModelCode ? a.find("a.visual").data("adobe-salesmodelcode", t.salesModelCode) : a.find("a.visual").data("adobe-salesmodelcode", ""),
                                a.find("a.visual").data("adobe-salessuffixcode", t.salesSuffixCode || ""),
                                0 < $(".compare-wrap").length && 0 < $(".compare-sticky").length && (a.find(".button").attr("data-model-id", q),
                                $("#categoryFilterForm").trigger("appended"));
                                D = a.find(".pd-fav"),
                                O = a.find(".ico-fav");
                                a.find(".wish-num").text(t.wishTotalCnt),
                                a.find(".ico-fav").attr("data-model-id", t.modelId).attr("data-sku", t.modelName).attr("data-model-name", t.modelName).attr("data-model-salesmodelcode", t.salesModelCode + "." + t.salesSuffixCode).attr("data-category-name", t.buName2).attr("data-sub-category-name", V(t.buName3, "") || "").attr("data-super-category-name", t.superCategoryName).attr("data-model-year", t.modelYear).attr("data-model-suffixcode", t.salesSuffixCode).attr("data-bu", t.buName1).attr("data-price", r).attr("data-msrp", t.msrp);
                                var B = location.host
                                  , _ = location.protocol + "//"
                                  , r = _ + B + t.modelUrlPath
                                  , B = _ + B + t.mediumImageAddr;
                                a.find("[data-url]").attr("data-url", r),
                                a.find("a.re-stock-alert").attr("data-url", $("#reStockAlertUrl").val()),
                                a.find("[data-image]").attr("data-image", B),
                                a.find("[data-copy-url]").attr("data-copy-url", r),
                                a.find("[data-product-id]").attr("data-product-id", t.modelId),
                                a.find("[data-wish-model-id]").attr("data-wish-model-id", t.modelId),
                                D.removeClass("on"),
                                O.removeClass("on"),
                                "Y" == t.myWishCnt ? (D.addClass("on"),
                                O.addClass("on"),
                                O.attr("aria-checked", "true")) : (O.attr("aria-checked", "false"),
                                O.removeClass("on"),
                                D.removeClass("on")),
                                $buyNowUnionStoreBtn = "",
                                "Y" == t.buyNowUnionStoreBtnFlag ? ($buyNowUnionStoreBtn = a.find(".button a.buyNowUnionBtn"),
                                $buyNowUnionStoreBtn.addClass("active"),
                                $buyNowUnionStoreBtn.attr("data-url", t.obsPartnerUrl)) : a.find(".button a.buyNowUnionBtn").removeClass("active"),
                                "Y" == t.recommendedRetailRriceInfo && (t.rPromoPrice || t.rPrice) ? a.find(".recommended-retail-price").show() : a.find(".recommended-retail-price").hide(),
                                0 < $(R.currentTarget).closest(".GPC0007").length && "true" != $(".GPC0007.plp").attr("data-is-vip") && (a.find(".button a.add-to-cart").hasClass("active") || a.find(".button a.re-stock-alert").hasClass("active")) && "Y" == t.promotionTagTextFlag ? (a.find(".promotionTagText").removeClass("d-none"),
                                a.find(".promotionText").addClass("d-none"),
                                a.find(".promotionTagText").find(".info-txt").removeClass("d-none"),
                                a.find(".promotionText").find(".info-txt").addClass("d-none")) : 0 < $(R.currentTarget).closest(".GPC0007").length && (a.find(".promotionTagText").addClass("d-none"),
                                a.find(".promotionText").removeClass("d-none"),
                                a.find(".promotionTagText").find(".info-txt").addClass("d-none"),
                                a.find(".promotionText").find(".info-txt").removeClass("d-none"))
                            }
                        }
                        var G = $(".GPC0007 .model-button .button");
                        G.addClass("only-button"),
                        G.each(function() {
                            1 < $(this).find("a.active").length && G.removeClass("only-button")
                        })
                    }, a)
                }
            }, K.itemSelector + " .model-group a");
            var e = [K.itemSelector + ".self .model-name a", K.itemSelector + ".self a.visual", K.itemSelector + ".self a.btn.where-to-buy"];
            function V(e, a) {
                e += "";
                return "" == (e = e.trim()) || null == e || "null" == e || "undefined" == e ? a : e
            }
            $(K.currentEl).on({
                click: function(e) {
                    e.preventDefault();
                    var a = document.getElementById(K.formId)
                      , t = "#" != $(e.currentTarget).closest(K.itemSelector).find(".model-group .active").attr("href") ? $(e.currentTarget).closest(K.itemSelector).find(".model-group .active").attr("href") : $(e.currentTarget).closest(K.itemSelector).find(".model-group .active").attr("data-href");
                    a || ($("body").append("<form action='' id='" + K.formId + "' method='post'><input type='hidden' name='" + K.subModelId + "'></form>"),
                    a = document.getElementById(K.formId)),
                    a.action = e.currentTarget.href,
                    a[K.subModelId].value = t,
                    e.ctrlKey || e.metaKey || e.shiftKey ? a.target = "_blank" : a.target = "_self",
                    a.submit()
                }
            }, e.join(",")),
            $(".js-model-switcher").on("click", ".js-model.self .rating a.bv_main_container", function(e) {
                e.preventDefault();
                var a = document.getElementById(K.formId)
                  , t = "#" != $(e.currentTarget).closest(K.itemSelector).find(".model-group .active").attr("href") ? $(e.currentTarget).closest(K.itemSelector).find(".model-group .active").attr("href") : $(e.currentTarget).closest(K.itemSelector).find(".model-group .active").attr("data-href");
                a || ($("body").append("<form action='' id='" + K.formId + "' method='post'><input type='hidden' name='" + K.subModelId + "'></form>"),
                a = document.getElementById(K.formId)),
                a.action = e.currentTarget.href,
                a[K.subModelId].value = t,
                e.ctrlKey || e.metaKey || e.shiftKey ? a.target = "_blank" : a.target = "_self",
                a.submit()
            })
        }
    };
    K.init()
}),
$(document).ready(function() {
    (thumbnailLoop = {
        desktopList: "#resultProductList, .products-list-wrap, #resultAppendTarget, .search-result-products-wrap, .product-list-box, .business-product-list, .products-list-group, .products-list-group2, .products-box",
        mobileList: ".GPC0007 #resultAppendTarget, .GPC0026 #resultAppendTarget, .accessories-product #resultAppendTarget, .search-result-view-all .product-list-box, .search-result-view-all .business-product-list, .search-result-view-all .products-box, .search-result-products-wrap, .search-result-business-products-wrap",
        interval: null,
        idx: 1,
        loop: function(e, a) {
            var t = a[thumbnailLoop.idx];
            a.length - 1 > thumbnailLoop.idx ? thumbnailLoop.idx++ : thumbnailLoop.idx = 1,
            e.src = t
        },
        hover: function(e) {
            var a = e.currentTarget
              , t = a.getAttribute("data-img-list").split(",");
            clearInterval(thumbnailLoop.interval),
            1 < t.length ? thumbnailLoop.interval = setInterval(function() {
                thumbnailLoop.loop(a, t)
            }, 500) : a.src = a.getAttribute("data-src")
        },
        blur: function(e) {
            e = e.currentTarget,
            e.getAttribute("data-img-list").split(",");
            clearInterval(thumbnailLoop.interval),
            thumbnailLoop.idx = 1,
            e.src = e.getAttribute("data-src")
        },
        init: function() {
            0 < $(".navigation").length && $(".navigation").hasClass("mobile-device") ? this.addEventForMobile() : this.addEventForDesktop()
        },
        addEventForDesktop: function() {
            $(this.desktopList).on({
                "mouseenter focus": this.hover,
                "mouseleave focusout": this.blur
            }, ".js-thumbnail-loop")
        },
        addEventForMobile: function() {
            var e = this;
            $(e.mobileList).each(function() {
                $(this).on({
                    thumbnailCarousel: e.mobileThumbnailCarousel
                }),
                $(this).trigger("thumbnailCarousel")
            })
        },
        mobileThumbnailCarousel: function(e) {
            var a = $(e.currentTarget);
            setTimeout(function() {
                a.find("img[data-img-list]").each(function() {
                    thumbnailLoop.mobileThumbnailCarouselSingle($(this), !1)
                })
            }, 600)
        },
        mobileThumbnailCarouselSingle: function(e, a) {
            if (0 == $(".navigation").length || !$(".navigation").hasClass("mobile-device"))
                return !1;
            if (0 < e.closest(".slick-slider").length || 0 == e.closest(".visual").length || 0 < e.closest(".visual").find(".thumbnail-carousel").length)
                return !1;
            if (a) {
                for (var t = thumbnailLoop.mobileList.split(","), r = !1, l = 0; l < t.length; l++)
                    0 < e.parents($.trim(t[l])).length && (r = !0);
                if (!r)
                    return !1
            }
            var d = (e.attr("data-img-list") ? e : e.siblings("img.pc")).attr("data-img-list").split(",");
            if (1 < d.length) {
                var o = e.attr("data-src") ? e.attr("data-src") : e.attr("src")
                  , n = '<div class="thumbnail-carousel"><div class="imglist"><img src="' + o + '" alt="" /></div>'
                  , a = 5;
                o == d[0] && (a = 6);
                for (var i = d.length <= a ? d.length : a, l = 0; l < i; l++)
                    o != d[l] && (n += '<div class="imglist"><img src="' + d[l] + '" alt="" /></div>');
                n += "</div>",
                0 == e.closest(".visual").find(".thumbnail-carousel").length && ($(".visual").addClass("hasThumbnail"),
                e.closest(".visual").append(n).find(".thumbnail-carousel").slick({
                    arrows: !1,
                    dots: !0
                }),
                $(".btn-listChange").hasClass("act") && (console.log("slick refresh"),
                $(".thumbnail-carousel").slick("refresh")))
            }
        }
    }).init()
});
//# sourceMappingURL=maps/concat-common-component.min.js.map
