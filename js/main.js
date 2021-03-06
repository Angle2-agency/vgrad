


var app = {
	data : {
		topSlider : null,
		roomselectSlider : null,
		spaservicesSlider : null,
		ourclientsSlider : null,
		reviewsSlider : null,
		map : null,
		pickFrom : null,
		pickTo : null,
		animDone : {
			castle : false,
			surrounding : false,
			roomselect : false,
			spaservices : false,
			uniqueoffers : false,
			ourclients : false,
			subscribe : false,
			walking : false,
			reviews : false,
			enjoy : false
		}
	},

	init : function() {		
		app.animate.start();		
		app.computed.init();
		SmoothScroll({ stepSize: 65});
	},

	animate : {
		start : function(){
			var opacityList = [
				'.castle__photo',
				'.castle__text h3',
				'.castle__text_desc',
				'.surrounding h2',
				'.surrounding ul',
				'.roomselect__description h2',
				'.roomselect__description_text',
				'.roomselect__description_title',
				'.roomselect__description_button',
				'.roomselect__slider',
				'.spaservices__description h2',				
				'.spaservices__slider',
				'.uniqueoffers h2',
				'.uniqueoffers ul li',
				'.ourclients h2',
				'.ourclients__text',
				'.ourclients__slider_output',
				'article.subscribe',
				'.walking__photo',
				'.walking__descr h2',
				'.walking__descr_text',
				'.reviews__descr h2',
				'.reviews__descr_text',
				'.reviews__slider',
				'.enjoy'
			];
			TweenMax.set(opacityList, {opacity : 0});
			TweenMax.fromTo('#loader .logo', 0.7, {opacity : 0, scale : 0.5}, {opacity : 1, scale : 1})
			TweenMax.to('#loader', 1, {x : '-200%', ease: Power2.easeIn, delay : 1})
			TweenMax.fromTo('.topslider', 1, {opacity : 0, x : '100%'},{opacity : 1, x : '0%', ease: Power2.easeOut, delay : 2, onComplete : function(){				
				app.slidersInit();
				TweenMax.to('.topslider-button-prev, .topslider-button-next', 0.7, {opacity : 1, y : 0, ease: Power2.easeIn});
				TweenMax.to('.header__reservation', 0.7, {opacity : 1, y : 0, ease: Power2.easeIn, onComplete : function(){
					app.eventsInit();
					TweenMax.fromTo('.header__contacts', 0.5, {opacity : 0, x : 300}, {opacity : 1, x : 0});
					TweenMax.fromTo('.header__contacts_social', 0.5, {opacity : 0, y : -300}, {opacity : 1, y : 0});
					if (need_to_show_success_modal) {
						$('#thankyou').fadeIn(300);
					}					
					TweenMax.to('.header__logo, .topslider-pagination', 0.7, {opacity : 1, delay : 0.5, onComplete : function(){						
						TweenMax.to('#scroll-down', 0.7, {opacity : 1, onComplete : function(){
							$('html').removeClass('start');
						}});
						app.mapInit();
						app.datePickerInit();
					}});
				}});				
			}});
		},
		castle : function(){
			TweenMax.fromTo('.castle__photo', 1.4, {opacity : 0, x : -150}, {opacity : 1, x : 0, ease: Power2.easeOut});
			TweenMax.staggerFromTo(['.castle__text h3', '.castle__text_desc'], 1, {opacity:0, y : 50}, {opacity:1, y : 0, ease: Back.easeInOut.config(2.5), delay : 0.1}, 0.15);
		},
		surrounding : function(){			
			TweenMax.staggerFromTo(['.surrounding h2', '.surrounding ul'], 1.3, {opacity:0, y : 50}, {opacity:1, y : 0, ease: Back.easeInOut.config(2.5)}, 0.2);
		},
		roomselect : function(){			
			TweenMax.fromTo('.roomselect__slider', 1.4, {opacity : 0, x : 150}, {opacity : 1, x : 0, ease: Power2.easeOut});
			TweenMax.staggerFromTo(['.roomselect__description h2', '.roomselect .roomselect__description_text', '.roomselect .roomselect__description_title', '.roomselect .roomselect__description_button'], 1.2, {opacity:0, y : 50}, {opacity:1, y : 0, ease: Back.easeInOut.config(2.5)}, 0.2);
		},
		spaservices : function(){			
			TweenMax.fromTo('.spaservices__slider', 1.4, {opacity : 0, x : -150}, {opacity : 1, x : 0, ease: Power2.easeOut});
			TweenMax.staggerFromTo(['.spaservices h2', '.spaservices .roomselect__description_text', '.spaservices .roomselect__description_title'], 1.2, {opacity:0, y : 50}, {opacity:1, y : 0, ease: Back.easeInOut.config(2.5)}, 0.2);
		},
		uniqueoffers : function(){			
			TweenMax.fromTo('.uniqueoffers h2', 1.4, {opacity : 0, x : 150}, {opacity : 1, x : 0, ease: Power2.easeOut});
			TweenMax.staggerFromTo('.uniqueoffers li', 1.2, {opacity:0, y : 80}, {opacity:1, y : 0, ease: Back.easeInOut.config(2.5)}, 0.2);
		},
		ourclients : function(){						
			TweenMax.staggerFromTo(['.ourclients h2', '.ourclients__text', '.ourclients__slider_output', '.subscribe'], 1.2, {opacity:0, y : 50}, {opacity:1, y : 0, ease: Back.easeInOut.config(2.5)}, 0.2);
		},
		walking : function(){						
			TweenMax.fromTo('.walking__photo', 1.4, {opacity : 0, x : -150}, {opacity : 1, x : 0, ease: Power2.easeOut});
			TweenMax.staggerFromTo(['.walking__descr h2', '.walking__descr_text'], 1, {opacity:0, y : 50}, {opacity:1, y : 0, ease: Back.easeInOut.config(2.5), delay : 0.1}, 0.15);
		},
		reviews : function(){						
			TweenMax.fromTo('.reviews__slider', 1.4, {opacity : 0, x : 150}, {opacity : 1, x : 0, ease: Power2.easeOut});
			TweenMax.staggerFromTo(['.reviews__descr h2', '.reviews__descr_text'], 1.2, {opacity:0, y : 50}, {opacity:1, y : 0, ease: Back.easeInOut.config(2.5)}, 0.2);
		},
		enjoy : function(){						
			TweenMax.fromTo('.enjoy', 2, {opacity : 0}, {opacity : 1});
		},
		

		

		
		
		
	},

	scroller : function(){
		var st = $(window).scrollTop();
		if(st > 0){
			$('.header__contacts').addClass('scroll');
		}else{
			$('.header__contacts').removeClass('scroll');
		}
		if(st > ($('article.castle').offset().top - ($(window).height() - ($(window).height() / 3))) && !app.data.animDone.castle){
			app.data.animDone.castle = true;			
			app.animate.castle();
		}
		if(st > ($('article.surrounding').offset().top - ($(window).height() - ($(window).height() / 3))) && !app.data.animDone.surrounding){
			app.data.animDone.surrounding = true;			
			app.animate.surrounding();
		}
		if(st > ($('article.roomselect').offset().top - ($(window).height() - ($(window).height() / 3))) && !app.data.animDone.roomselect){
			app.data.animDone.roomselect = true;			
			app.animate.roomselect();
		}
		if(st > ($('article.spaservices').offset().top - ($(window).height() - ($(window).height() / 3))) && !app.data.animDone.spaservices){
			app.data.animDone.spaservices = true;			
			app.animate.spaservices();
		}
		if(st > ($('article.uniqueoffers').offset().top - ($(window).height() - ($(window).height() / 3))) && !app.data.animDone.uniqueoffers){
			app.data.animDone.uniqueoffers = true;			
			app.animate.uniqueoffers();
		}
		if(st > ($('article.ourclients').offset().top - ($(window).height() - ($(window).height() / 3))) && !app.data.animDone.ourclients){
			app.data.animDone.ourclients = true;			
			app.animate.ourclients();
		}
		if(st > ($('article.walking').offset().top - ($(window).height() - ($(window).height() / 3))) && !app.data.animDone.walking){
			app.data.animDone.walking = true;			
			app.animate.walking();
		}
		if(st > ($('article.reviews').offset().top - ($(window).height() - ($(window).height() / 3))) && !app.data.animDone.reviews){
			app.data.animDone.reviews = true;			
			app.animate.reviews();
		}
		if(st > ($('article.enjoy').offset().top - ($(window).height() - ($(window).height() / 3))) && !app.data.animDone.enjoy){
			app.data.animDone.enjoy = true;			
			app.animate.enjoy();
		}		
	},
	eventsInit : function(){
		$(document).click(function(e) {
			if ($(e.target).closest(".popup__rooms_select").length || $(e.target).closest(".header__contacts li.lang").length) return;
			$('.popup__rooms_select ul').fadeOut(150);
			$('.header__contacts li.lang').removeClass('show');
			e.stopPropagation();
		});

		$(document).scroll(app.scroller);
		
		$(document).on('mouseenter', '.topslider-button-prev, .topslider-button-next', function(e){
			if(!$(this).hasClass('swiper-button-disabled'))$(this).closest('.swiper-container-horizontal').find('.topslider-button-prev i').hide();
		});
		$(document).on('mouseleave', '.topslider-button-prev, .topslider-button-next', function(e){			
			$(this).closest('.swiper-container-horizontal').find('.topslider-button-prev i').show();
		});
		$(document).on('mouseenter', '.main__slider-button-prev, .main__slider-button-next', function(e){
			if(!$(this).hasClass('swiper-button-disabled'))$(this).closest('.swiper-container-horizontal').find('.main__slider-button-prev i').hide();
		});
		$(document).on('mouseleave', '.main__slider-button-prev, .main__slider-button-next', function(e){			
			$(this).closest('.swiper-container-horizontal').find('.main__slider-button-prev i').show();
		});

		$(document).on('click', '.bedtype__list input', function(e){
			var type = $(this).attr('data-type');
			if(type == 'double'){
				$(this).closest('.bedtype__list').removeClass('twin').addClass('double');
			}else{
				$(this).closest('.bedtype__list').removeClass('double').addClass('twin');
			}
		});		

		$(document).on('click', '.popup__rooms_number-select i', function(e) {
			var input = $(this).closest('.popup__rooms_number-select').find('input');
			var val = Number(input.val());
			var roomid = $(this).closest('.popup__rooms_number-select').data('room');
			if($(this).hasClass('plus')){
				val++;
				input.val(val);
				$(this).closest('.popup__rooms_number-select').find('.minus').removeClass('disabled');				
				addQuantity(roomid);
			}
			if($(this).hasClass('minus') && !$(this).hasClass('disabled')){
				val--;				
				input.val(val);
				if(val == 1)$(this).addClass('disabled');
				removeQuantity(roomid);
			}
		});

		$('[data-target="popupform"]').click(function(e) {
			TweenMax.to('.popupform__animation', 0.8, {x : '-200%', ease: Power2.easeIn, onComplete : function(){				
				$('html, body').css({
					overflow : 'hidden'
				});
			}});
			TweenMax.to('#popupform', 0.8, {x : '-100%', ease: Power2.easeIn});
			return false;
		});
		$('.popupform__close').click(function(e) {
			TweenMax.to('.popupform__animation', 0.8, {x : '0%', ease: Power2.easeIn, onComplete : function(){				
				$('html, body').removeAttr('style');
			}});
			TweenMax.to('#popupform', 0.8, {x : '0%', ease: Power2.easeIn});
		});
		$(document).on('click', '.popup__rooms_number-details .show-details', function(e) {			
			var block = $(this).closest('.popup__rooms_number-details').find('.details-descr');
			if(block.is(':hidden')){
				$(this).addClass('show');
				block.slideDown(300);
			}else{
				$(this).removeClass('show');
				block.slideUp(300);
			}		
		});
		$('.uniqueoffers__descr_more').click(function(e) {
			var more = $(this).closest('.uniqueoffers__title_image').find('.uniqueoffers__descr');			
			var title = $(this).closest('li').find('.uniqueoffers__title');
			TweenMax.to($(this), 0.3, {y : '100%', ease: Power2.easeIn});
			TweenMax.to(title, 0.3, {opacity : 0, y : 30, ease: Power2.easeIn});
			TweenMax.to(more, 0.5, {y : '100%', ease: Power2.easeIn});
		});
		$('.uniqueoffers__descr_close').click(function(e) {			
			var more = $(this).closest('.uniqueoffers__descr');
			var moreBut = $(this).closest('.uniqueoffers__title_image').find('.uniqueoffers__descr_more');
			var title = $(this).closest('li').find('.uniqueoffers__title');			
			TweenMax.to(more, 0.5, {y : '0%', ease: Power2.easeIn});
			TweenMax.to(moreBut, 0.3, {y : '0%', ease: Power2.easeOut, delay : 0.4});
			TweenMax.to(title, 0.3, {opacity : 1, y : 0, ease: Power2.easeOut, delay : 0.4});
		});
		$('#to-map').click(function(e) {
			var y = $('footer .contacts__info').offset().top - (($(window).height() - $('footer .contacts__info').height()) / 2)
			console.log(y);
			var body = $("html, body");
			body.stop().animate({scrollTop:y}, 800, 'swing');
			$(document).scrollTop(y);
		});
		$('#langs').click(function(e) {
			if(!$(this).hasClass('show')){
				$(this).addClass('show');	
			}else{
				$(this).removeClass('show');	
			}
			
		});
	},

	slidersInit : function(){
		app.data.topSlider = new Swiper('.topslider', {
			speed : 400,
			parallax : false,
			//loop : true,
      		navigation: {      			
        		nextEl: '.topslider-button-next',
        		prevEl: '.topslider-button-prev',
      		},      		
			on: {
				init: function () {
					var length = this.slides.length;
					$(this.$el).find('.topslider-pagination span.current').html('01');
					$(this.$el).find('.topslider-pagination span.length').html(length < 10 ? '0'+length : length);
					$('.topslider__slide').mousemove(function(e){
						app.parallaxIt(e, $(this), -100);						
					});
				},
				slideChange : function(){
					var slide = this.activeIndex + 1;
					$(this.$el).find('.topslider-pagination span.current').html(slide < 10 ? '0'+slide : slide);
				}
			}
    	});

    	app.roomselectSlider = new Swiper('.roomselect__slider', {
			speed : 700,
			parallax : false,
			//loop : true,
      		navigation: {      			
        		nextEl: '.main__slider-button-next',
        		prevEl: '.main__slider-button-prev',
      		},      		
			on: {
				init: function () {					
					var length = this.slides.length;
					$(this.$el).find('.roomselect__slider-pagination span.current').html('01');
					$(this.$el).find('.roomselect__slider-pagination span.length').html(length < 10 ? '0'+length : length);
				},
				slideChange : function(){
					var type = $(this.slides[this.activeIndex]).attr('data-type');
					var typeBlock = $(this.$el).closest('.roomselect').find('.roomselect__description_title');
					var slide = this.activeIndex + 1;
					$(this.$el).find('.roomselect__slider-pagination span.current').html(slide < 10 ? '0'+slide : slide);
					if(type != typeBlock.text()){
						TweenMax.to(typeBlock, 0.5, {y:30, opacity : 0, ease: Power3.easeIn});
						setTimeout(function(){						
							typeBlock.html(type);
							TweenMax.fromTo(typeBlock, 0.5, {y : -30, opacity : 0}, {y : 0, opacity : 1, ease: Power3.easeOut});
						}, 500)					
					}					
				}
			}
    	});

    	app.spaservicesSlider = new Swiper('.spaservices__slider', {
			speed : 700,
			parallax : false,
			//loop : true,
      		navigation: {      			
        		nextEl: '.main__slider-button-next',
        		prevEl: '.main__slider-button-prev',
      		},      		
			on: {
				init: function () {					
					var length = this.slides.length;
					$(this.$el).find('.spaservices__slider-pagination span.current').html('01');
					$(this.$el).find('.spaservices__slider-pagination span.length').html(length < 10 ? '0'+length : length);
				},
				slideChange : function(){
					var slide = this.activeIndex + 1;
					$(this.$el).find('.spaservices__slider-pagination span.current').html(slide < 10 ? '0'+slide : slide);
				}
			}
    	});

    	app.ourclientsSlider = new Swiper('.ourclients__slider', {
			speed : 600,
			slidesPerView: $('body').width() > 1140 ? 5 : 3,
			spaceBetween: 0,
      		navigation: {      			
        		nextEl: '#ourclients__slider-button-next',
        		prevEl: '#ourclients__slider-button-prev',
      		}
    	});

    	app.spaservicesSlider = new Swiper('.reviews__slider', {
			speed : 700,
			parallax : false,
			//loop : true,
      		navigation: {      			
        		nextEl: '.main__slider-button-next',
        		prevEl: '.main__slider-button-prev',
      		},      		
			on: {
				init: function () {					
					var length = this.slides.length;
					$(this.$el).find('.reviews__slider-pagination span.current').html('01');
					$(this.$el).find('.reviews__slider-pagination span.length').html(length < 10 ? '0'+length : length);
				},
				slideChange : function(){
					var slide = this.activeIndex + 1;
					$(this.$el).find('.reviews__slider-pagination span.current').html(slide < 10 ? '0'+slide : slide);
				}
			}
    	});

    	app.spaservicesSlider = new Swiper('.popup__rooms_slider', {
			speed : 700,
			parallax : false,
			//loop : true,
      		navigation: {      			
        		nextEl: '.main__slider-button-next',
        		prevEl: '.main__slider-button-prev',
      		}
    	});
	},

	mapInit : function(){
		var mapOptions = {
	        // How zoomed in you want the map to start at (always required)
	        zoom: 13,
	        scrollwheel: false,
	        // The latitude and longitude to center the map (always required)
	        center: $('body').width() > 720 ? new google.maps.LatLng(50.59865227, 30.52307374) : new google.maps.LatLng(50.6002866, 30.4727769),
	        // How you would like to style the map. 
	        // This is where you would paste any style found on Snazzy Maps.
	        styles: [{"featureType":"all","elementType":"geometry.fill","stylers":[{"weight":"2.00"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"color":"#ededed"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#fff7ee"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#fff7ee"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#eeeeee"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#7b7b7b"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#ededed"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#070707"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]}]
	    };
	    // Get the HTML DOM element that will contain your map 
        // We are using a div with id="map" seen below in the <body>
        var mapElement = document.getElementById('map');
        // Create the Google Map using our element and options defined above
        var map = new google.maps.Map(mapElement, mapOptions);
        var image = {
            url : './img/icon_pin.svg',
            size : new google.maps.Size(28,34),
            anchor : new google.maps.Point(28,34),
            origin: new google.maps.Point(0, 0)
        };        
        new google.maps.Marker(
            {
                icon : image,
                position : new google.maps.LatLng(50.599370, 30.453973),
                map : map,
                title: 'ул.Спасская, 25, г. Вышгород'
            }
        );
        new google.maps.Marker(
            {
                icon : image,
                position : new google.maps.LatLng(50.592898, 30.485375),                                                
                map : map,
                title: 'ул.Шолуденко, 17а, г. Вышгород'
            }
        );
	},

	parallaxIt : function(e, target){
		var img = target.find('.topslider__slide_bg-img');
		var title = target.find('h1');		
		var imgX = e.pageX - img.offset().left;
		var imgY = e.pageY - img.offset().top;
		var titleX = e.pageX - title.offset().left;
		var titleY = e.pageY - title.offset().top;
		TweenMax.to(img, 1, {
			x: (imgX - img.width()/2) / img.width() * 40,
			y: (imgY - img.height()/2) / img.height() * 40
		});
		TweenMax.to(title, 1, {
			x: (titleX - title.width()/2) / title.width() * 25,
			y: (titleY - title.height()/2) / title.height() * 25
		});
	},

	datePickerInit : function(){
		$.extend( $.fn.pickadate.defaults, {
			monthsFull: [ 'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря' ],
			monthsShort: [ 'янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек' ],
			weekdaysFull: [ 'воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота' ],
			weekdaysShort: [ 'вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб' ],
			today: 'сегодня',
			clear: 'удалить',
			close: 'закрыть',
			firstDay: 1,
			format: 'd mmmm yyyy г.',
			formatSubmit: 'yyyy/mm/dd'
		});
		var pickFrom = $('#date-from').pickadate({
			format: 'yyyy-mm-dd',
			min: new Date(),
		});
		var pickTo = $('#date-to').pickadate({
			format: 'yyyy-mm-dd',
			min: new Date(),
		});
		app.data.pickFrom = pickFrom.pickadate('picker');
		app.data.pickTo = pickTo.pickadate('picker');
		app.data.pickFrom.set('select', new Date());
		app.data.pickTo.set('select', new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
	},




	computed : {
		init : function(){			
			setTimeout(function(){
				$('.typeofhotel__tabs li.line').width($('.typeofhotel__tabs li.standart').width());
			}, 100);			
		}
	}
}


setTimeout(function(){
	app.init();
}, 10);


