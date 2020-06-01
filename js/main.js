$(function(){

  ////リサイズセット
  resize()
  $(window).load(function(){
	$("#cover").fadeOut(1000)
	$(".heroarea .heroarea_bg").css("transform","scale(1.1)")
	$(".heroarea .heroarea_text").css("opacity","0")
	  TweenMax.to($(".heroarea .heroarea_bg"), 3, {scale: 1});
	  TweenMax.to($(".heroarea .heroarea_text"),1.8, {opacity: 1,delay:0.8});
	resize()
  })
  $(window).resize(function(event) {
	 resize()
  });

	$('.menu-btn').on('click', function(){
		$('.menu_sp').toggleClass('active');
		$('.menu-btn').toggleClass('active');
	});

	$('.nav').on('click', function() {
		$(".menu").toggleClass('active');
		$('.menu-btn').toggleClass('active');
	});

	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var $target = $(this.hash);
			$target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
			if ($target.length) {
				if ($(this).parents('.menuBox').length) {
					setTimeout(function() {
						var targetOffset = $target.offset().top;
						$('html,body').animate({ scrollTop: targetOffset }, 1000);
					}, 100);
				} else {
					var targetOffset = $target.offset().top;
					$('html,body').animate({ scrollTop: targetOffset }, 1000);
				}
				return false;
			}
		}
	});
	scroll()
});


//////リサイズ関数
var winW, winH
function resize() {
	winW = $(window).width()
	winH = $(window).height()
}


function scroll(){

  var controller = new ScrollMagic.Controller();
  $(".section_title").each(function(i){
	var $elm = $(this)
	$elm.lettering()
	$elm.find("span").css("opacity",0)
	$elm = $(this)
	var scene = new ScrollMagic.Scene({reverse:false,triggerElement: $(this).get(0),offset:(-winH/2)+50})
		.on("enter", function (event) {
		   $elm.find("span").each(function(i){
			 TweenLite.to($(this), 0, {y:10});
			 TweenLite.to($(this), 1+(i*0.04), {y:0,delay:(i*0.01), ease:Power3.easeOut});
			 TweenLite.to($(this), 1+(i*0.04), {delay:(i*0.01), opacity: 1, ease:Power3.easeInOut});
		   })

		})
		.setClassToggle($(this).get(0),"on")
		.addTo(controller);
  })

  $(".concept_image").css("opacity",0)
  var scene = new ScrollMagic.Scene({reverse:false,triggerElement: $(".concept_image").get(0),offset:(-winH/2)+50})
	  .on("enter", function (event) {
		   TweenLite.to($(".concept_image"), 1.2, {opacity: 1, ease:Power3.easeInOut});
	  })
	  .setClassToggle($(this).get(0),"on")
	  .addTo(controller);

	$(".concept_text").css("opacity",0)
	var scene = new ScrollMagic.Scene({reverse:false,triggerElement: $(".concept_text").get(0),offset:(-winH/2)+50})
		.on("enter", function (event) {
	   TweenLite.to($(".concept_text"), 0, {opacity: 0,y:20});
	   TweenLite.to($(".concept_text"), 1.2, {y:0,opacity: 1, ease:Power3.easeOut});
	})
	.setClassToggle($(".concept_text").get(0),"on")
	.addTo(controller);

	$(".contact_container").css("opacity",0)
	var scene = new ScrollMagic.Scene({reverse:false,triggerElement: $(".contact_container").get(0),offset:(-winH/2)+50})
		.on("enter", function (event) {
	   TweenLite.to($(".contact_container"), 0, {opacity: 0,y:20});
	   TweenLite.to($(".contact_container"), 1.2, {y:0,opacity: 1, ease:Power3.easeOut});
	})
	.setClassToggle($(".contact_container").get(0),"on")
	.addTo(controller);


  $(".card").each(function(i){
	var $elm = $(this)
	TweenLite.to($elm.find(".card_description"), 0, {opacity: 0,y:20});
	TweenLite.to($elm.find(".card_image"), 0, {opacity: 0});

	var scene = new ScrollMagic.Scene({reverse:false,triggerElement: $(this).get(0),offset:(-winH/2)+50})
		.on("enter", function (event) {
			TweenLite.to($elm.find(".card_description"), 2, {opacity: 1,y:0, ease:Power3.easeOut});
			TweenLite.to($elm.find(".card_image"), 2.2, {delay:0.2,opacity: 1, ease:Power3.easeOut});

		})
		.setClassToggle($(this).get(0),"on")
		.addTo(controller);
  })



}

////headerスクロールアニメーション

var ScrollChange = new Object();
ScrollChange = {
	/**********************
	 * Settings
	 **********************/
	// Target class name
	target_name:'active-func',

	// Add class name
	active_class_name:'active',

	// Scroll offset
	header_offset:100,

	// 検出位置の差分（大きいほどターゲットより下にActive変更ポイントが来る）
	// 0は正しく動作しません。
	header_offset2:0,

	// Smooth scroll setting(On:1 Off:0)
	smooth_scroll:1,

	// Scroll speed
	scroll_speed:800,
	/**********************
	 * End settings
	 **********************/

	CheckActiveClass:function(ei){
	  // 現状 activeが付与されているかどうかチェック
	  if($('.'+this.active_class_name+':eq(0)') == undefined){
		  // ターゲットにクラス付与
		  this.AddClass(ei);
	  }else{
		  // 現在のactiveを削除後、クラス付与
		  this.RemoveClass().AddClass(ei);
	  }
	},
	RemoveClass:function(){
		// activeが存在したら、クラスを削除
		$('.'+this.active_class_name).removeClass(this.active_class_name);
		return this;
	},
	AddClass:function(sp){
		// スクロールポイントのIDを取得する sp:スクロールポイント
		var target_class= 'a[href*="' + sp + '"]';
		// ターゲットのDOMを取得し、クラス追加
		$(target_class).addClass(this.active_class_name);

	}
}

$(function(){
	// active-funcが付いている箇所をn個取得する
	var w = $('.' + ScrollChange.target_name);
	var offset2 = ScrollChange.header_offset-ScrollChange.header_offset2;
	// active-funcの回数分ループ
	for (var i = 0; i < w.length; i++) {
	  new Waypoint({
		element: w[i],
		handler: function() {
			ScrollChange.CheckActiveClass(this.element.id);
		},offset:ScrollChange.header_offset
	  });
	  new Waypoint({
		element: w[i],
		handler: function() {
			ScrollChange.CheckActiveClass(this.element.id);
		},offset:offset2
	  });
	}

});
