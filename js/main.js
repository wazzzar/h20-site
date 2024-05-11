$(document).ready(function() {
	var attr = $("head #mobyMenuWidth").attr("media");
	attr = attr.replace(/[a-z \-\:\(\)]{1,}/g,"");
	// меню в нормальном виде и текущем составе влезает в экран от 840
	function isToShort(){ return $(window).width() < attr; }
	
	function updateMenu(){
		var st = $(document).scrollTop();
		if( st > 100 ){
			$("header").addClass("transfered");
			//$("main section:first").css("margin-top", "99px"); // костыль
			$("header div.logo img").addClass("hover");
		}else{
			$("header").removeClass("transfered");
			//$("main section:first").css("margin-top", "0px"); // костыль
			$("header div.logo img").removeClass("hover");
		}
		$("body main section").each(function(){
		   var sect = $(this).offset().top;
		   if( sect - st < 200 ){
		       $("nav.menu ul li.active").removeClass("active");
               $("nav.menu ul li[data-menuanchor="+$(this).attr("data-target")+"]").addClass("active");
		   }
		});
	}
	
	var goTime = 700, goOffset = 40;
	function goToSection(name){
	    var ofst = $("main section[data-target='"+name+"']").offset().top - goOffset;
	    if( !$("header").hasClass("transfered") ) ofst -= 99; // костыль
        $("html,body").stop().animate({ "scrollTop": ofst+"px" }, goTime, function(){
        		updateMenu();
        		//ofst = $("main section[data-target='"+name+"']").offset().top - goOffset;
        		//if( ofst > $("html,body").scrollTop() ) goToSection(name);
        });
	}
	
	function onResize(){
	    var ih = window.innerHeight;
		if( isToShort() ){
			$("nav.menu").addClass("mobyStyle").css("display", "none");
		}else{
			$("nav.menu").removeClass("mobyStyle");
			if( $("nav.menu").css("display") == "none" ) $("nav.menu").slideDown(500);
		}
		
		var iw = $("div#featured img").width();
		var ih = $("div#featured img").height();
		var sw = $("div.slider").width();
		$("div.slider").css("height", ih/(iw/sw)+"px" );
		
		updateMenu();  
	}
	
	$("header div.logo img").on("click", function(){
		if( $(this).hasClass("hover") ) goToSection("start");
	});
	
	$("div.downArrow").on("click", function(){ goToSection("uslugi"); });
	
	var showTime = 500;
	$("#clickHere").on("click", function(event){
		event.stopPropagation();
		var ww = $(window).width();
		var fw = $("#modalForm").width()
		var pos = ( ww - fw )/2;
		$("#modalForm").animate({ "opacity": 1, "left": pos-25+"px" }, showTime);
	});
	
	$("#modalForm").on("click", function(event){
		event.stopPropagation();
	});
	
	$("div.menu").on("click", function(event){
		event.stopPropagation();
		$("nav.menu").slideToggle(500);
	});
	
	$("body").on("click", function(){
		if( $("nav.menu").hasClass("mobyStyle") ) $("nav.menu").slideUp(500);
		$("#modalForm").animate({ "opacity": 0, "left": "-1000px" }, showTime);
	});
	
	$("nav.menu ul li").on("click", function(event){
		event.stopPropagation();
		if( $(this).hasClass("active") ) return;
		if( $("nav.menu").hasClass("mobyStyle") ) $("nav.menu").slideUp(500);
		goToSection( $(this).attr("data-menuanchor") );
	});
	
	$(window).on("resize", onResize);
	$(window).triggerHandler("resize");
	
	$("body").on("wheel", updateMenu);
	$("body").triggerHandler("wheel");
	
	$(window).on("scroll", updateMenu);
	
	$("div#featured").orbit({ "timer" : true, "controls" : true, "animation" : "horizontal-slide" });
});