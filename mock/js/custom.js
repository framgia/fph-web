"use strict";

jQuery(document).ready(function(){
    var fph = function(){};

    fph.prototype.init = function() {
        this.owlLife = jQuery(".owl-life");
        this.owlScale1 = jQuery(".owl-scale.s1");
        this.owlScale2 = jQuery(".owl-scale.s2");
        this.bindEvents();
    };

    fph.prototype.bindEvents = function() {
        this.bindCarousel();
    };

    fph.prototype.bindCarousel = function() {
        var self = this;

        // owl carousle career
        self.owlLife.each(function() {
            var config = {
                singleItem: $(this).data("singleitem"),
                items: $(this).data("items"),
                itemsDesktop: [1400,3],
                itemsTablet: [799,4],
                itemsTabletSmall: [768,2],
                itemsMobile: [480,1],
                pagination: $(this).data("pagination"),
                navigation: $(this).data("navigation"),
                navigationText: $(this).data("navigationtext"),
                autoPlay: $(this).data("autoplay"),
                slideSpeed: $(this).data("slidep peed")
            };
            jQuery(this).owlCarousel(config);
        });

        // owl carousel scale 1 - about page
        self.owlScale1.each(function() {
            jQuery(this).owlCarousel({
                singleItem: true,
                pagination: true,
                paginationNumbers: true,
                navigation: false,
                navigationText: false,
                autoPlay: true,
                slideSpeed: 800,
                addClassActive: true,
                afterMove: function() {
                    var $this = jQuery(".owl-scale.s1");
                    $this.find(".owl-item").removeClass("beforeActive");
                    $this.find(".owl-item").removeClass("afterActive");
                    $this.find(".owl-item.active").prev().addClass("beforeActive");
                    $this.find(".owl-item.active").next().addClass("afterActive");
                }
            });
        });
        self.owlScale1.trigger("owl.next");

        // owl carousel scale 2 - career page
        var customPagination = jQuery(".owl-controls.customize");
        var pages = customPagination.find(".owl-page");
        self.owlScale2.each(function() {
            jQuery(this).owlCarousel({
                singleItem: true,
                pagination: true,
                paginationNumbers: true,
                navigation: false,
                navigationText: false,
                autoPlay: true,
                slideSpeed: 800,
                addClassActive: true,
                afterMove: function() {
                    var $this = jQuery(".owl-scale.s2");
                    $this.find(".owl-item").removeClass("beforeActive");
                    $this.find(".owl-item").removeClass("afterActive");
                    $this.find(".owl-item.active").prev().addClass("beforeActive");
                    $this.find(".owl-item.active").next().addClass("afterActive");
                    var activeIndex = $this.find(".owl-item.active").index();
                    var singleContent = jQuery(".career-content .single-content");
                    singleContent.removeClass("active");
                    singleContent.eq(activeIndex).addClass("active");
                    pages.removeClass("active");
                    pages.eq(activeIndex).addClass("active");
                }
            });
        });
        self.owlScale2.trigger("owl.next");
        pages.on("click", function() {
            pages.removeClass("active");
            jQuery(this).addClass("active");
            var itemIndex = jQuery(this).data("index");
            jQuery(this).closest(".wrapper").find(".owl-carousel").trigger("owl.goTo",itemIndex);
        });

    };

    var appObj = new fph();
    appObj.init();

    // Scroll to anchor
    var anchor = 0;
    $(window).scroll(function () {
        if ( anchor == 0 ){
            $('html,body').animate({
              scrollTop: jQuery("#anchor").offset().top
            }, 700);
            anchor++;
        }
    });

    // match height
    $.fn.matchHeight = function() {
        var maxHeight = -1;
        var item = this.find(".match-item");
        item.each(function() {
            maxHeight = maxHeight > $(this).outerHeight() ? maxHeight : $(this).outerHeight();
        })
        item.each(function() {
            $(this).outerHeight(maxHeight);
        })
    };

    if(jQuery(".match-wrapper").length) {
        jQuery(this).each(function() {
            jQuery(this).matchHeight();
        });
    };

     // Google map
    var map;
    if (jQuery(".fph-map").length) {
        var id_map = jQuery(".fph-map").attr("id");
        var lat = parseFloat(jQuery(".fph-map").attr("data-latitude"));
        var lng = parseFloat(jQuery(".fph-map").attr("data-longitude"));
        var place = jQuery(".fph-map").attr("data-place");

        map = new GMaps({
            el: "#" + id_map,
            lat: lat,
            lng: lng,
            zoomControl: true,
            zoomControlOpt: {
                style: "SMALL",
                position: "TOP_LEFT"
            },
            panControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            overviewMapControl: false
        });
        map.addMarker({
            lat: lat,
            lng: lng,
            title: place
        });
    };

    // Back to top
    // hide #back-top first
    $("#back-top").hide();

    // fade in #back-top
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $("#back-top").fadeIn();
            } else {
                $("#back-top").fadeOut();
            }
        });

        // scroll body to 0px on click
        $("#back-top").click(function () {
            $("body,html").animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });
});



