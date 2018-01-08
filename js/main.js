


var app = {
	data : {
		topSlider : null,
		roomselectSlider : null,
		spaservicesSlider : null,
		ourclientsSlider : null,
		reviewsSlider : null,
		map : null,
		pickFrom : null,
		pickTo : null
	},

	init : function() {		
		app.animate.start();		
		app.computed.init();		
	},

	animate : {
		start : function(){
			TweenMax.fromTo('#loader .logo', 0.7, {opacity : 0, scale : 0.5}, {opacity : 1, scale : 1})
			TweenMax.to('#loader', 1, {x : '-200%', ease: Power2.easeIn, delay : 1})
			TweenMax.fromTo('.topslider', 1, {opacity : 0, x : '100%'},{opacity : 1, x : '0%', delay : 1.8, onComplete : function(){				
				app.slidersInit();
				TweenMax.to('.topslider-button-prev, .topslider-button-next', 0.7, {opacity : 1, y : 0, ease: Power2.easeIn});
				TweenMax.to('.header__reservation', 0.7, {opacity : 1, y : 0, ease: Power2.easeIn, onComplete : function(){
					TweenMax.fromTo('.header__contacts', 0.5, {opacity : 0, x : 300}, {opacity : 1, x : 0});
					TweenMax.to('.header__logo, .topslider-pagination', 0.7, {opacity : 1, delay : 0.5, onComplete : function(){
						$('html').removeClass('start');
						app.mapInit();
						app.datePickerInit();
						app.eventsInit();
					}});
				}});				
			}});
		}
	},

	eventsInit : function(){
		$(document).click(function(e) {
			if ($(e.target).closest(".popup__rooms_select").length) return;
			$('.popup__rooms_select ul').fadeOut(150);			
			e.stopPropagation();
		});

		$('.typeofhotel__tabs li').click(function(e){
			var target = $(this).attr('class');			
			if(target == 'mini'){
				TweenMax.to('.typeofhotel__tabs li.line', 0.4, {
					ease: Power2.easeIn,
					width : 312,
					onComplete : function(){
						TweenMax.to('.typeofhotel__tabs li.line', 0.4, {
							ease: Power2.easeIn,
							x : $('.typeofhotel__tabs li.mini').position().left
						})
					}
				});
				TweenMax.to('.typeofhotel__tabs_body-slider', 0.4, {
					ease: Power2.easeIn,
					x : -312,
					delay : 0.4
				});
			}
			if(target == 'standart'){
				TweenMax.to('.typeofhotel__tabs li.line', 0.4, {
					ease: Power2.easeIn,
					x : 0,
					onComplete : function(){
						TweenMax.to('.typeofhotel__tabs li.line', 0.4, {
							ease: Power2.easeIn,
							width : $('.typeofhotel__tabs li.standart').width()
						});			
					}
				});
				TweenMax.to('.typeofhotel__tabs_body-slider', 0.4, {
					ease: Power2.easeIn,
					x : 0,
					delay : 0.4
				});
			}
		});

		$('.bedtype__list input').click(function(e){
			var type = $(this).attr('id');
			if(type == 'double'){
				$('.bedtype__list').removeClass('twin').addClass('double');
			}else{
				$('.bedtype__list').removeClass('double').addClass('twin');
			}
		});

		$('.popup__rooms_select span').click(function(e) {			
			if($('.popup__rooms_select ul').is(':hidden')){
				$('.popup__rooms_select ul').fadeIn(150);
			}else{
				$('.popup__rooms_select ul').fadeOut(150);
			}
		});

		$('.popup__rooms_select ul li').click(function(e) {
			var type = $(this).attr('data-target');
			$('.popup__rooms_select span b').html(type);
			$('.popup__rooms_select ul').fadeOut(150);
		});

		$('.popup__rooms_number-select i').click(function(e) {
			var input = $('.popup__rooms_number-select input');
			var val = Number(input.val());
			if($(this).hasClass('plus')){
				val++;
				input.val(val);
				$('.popup__rooms_number-select .minus').removeClass('disabled');
			}
			if($(this).hasClass('minus') && !$(this).hasClass('disabled')){
				val--;				
				input.val(val);
				if(val == 1)$(this).addClass('disabled');
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
	},

	slidersInit : function(){
		app.data.topSlider = new Swiper('.topslider', {
			speed : 700,
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
					var slide = this.activeIndex + 1;
					$(this.$el).find('.roomselect__slider-pagination span.current').html(slide < 10 ? '0'+slide : slide);
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
			slidesPerView: 5,
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
	        zoom: 17,
	        scrollwheel: false,
	        // The latitude and longitude to center the map (always required)
	        center: new google.maps.LatLng(50.606248, 30.469001),
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
        var marker = new google.maps.Marker(
            {
                icon : image,
                position : new google.maps.LatLng(50.606211, 30.466009),                                                
                map : map,
                title: 'Vishegrad'
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
			format: 'от dd.mm.yyyy',
			min: new Date()
		});
		var pickTo = $('#date-to').pickadate({
			format: 'до dd.mm.yyyy',
			min: new Date()
		});
		app.data.pickFrom = pickFrom.pickadate('picker');
		app.data.pickTo = pickTo.pickadate('picker');
		//app.data.pickFrom.set('select', new Date());
		//app.data.pickTo.set('select', new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
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


