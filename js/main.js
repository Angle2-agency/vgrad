


var app = {
	data : {
		topSlider : null,
		roomselectSlider : null,
		spaservicesSlider : null,
		ourclientsSlider : null,
		reviewsSlider : null,
		map : null
	},
	init : function() {
		app.slidersInit();
		app.mapInit();		
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
					console.log(this.slides);

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
					console.log(this.slides.length);
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
					console.log(this.slides.length);
					var length = this.slides.length;
					$(this.$el).find('.spaservices__slider-pagination span.current').html('01');
					$(this.$el).find('.spaservices__slider-pagination span.length').html(length < 10 ? '0'+length : length);
				},
				slideChange : function(){
					var slide = this.activeIndex + 1;
					$(this.$el).find('.spaservices__slider-pagination span.current').html(slide < 10 ? '0'+slide : slide);
					console.log(this.slides);

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
					console.log(this.slides.length);
					var length = this.slides.length;
					$(this.$el).find('.reviews__slider-pagination span.current').html('01');
					$(this.$el).find('.reviews__slider-pagination span.length').html(length < 10 ? '0'+length : length);
				},
				slideChange : function(){
					var slide = this.activeIndex + 1;
					$(this.$el).find('.reviews__slider-pagination span.current').html(slide < 10 ? '0'+slide : slide);
					console.log(this.slides);

				}
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
		console.log(title);
		var imgX = e.pageX - img.offset().left;
		var imgY = e.pageY - img.offset().top;
		var titleX = e.pageX - title.offset().left;
		var titleY = e.pageY - title.offset().top;
		TweenMax.to(img, 1, {
			x: (imgX - img.width()/2) / img.width() * 40,
			y: (imgY - img.height()/2) / img.height() * 40
		});
		TweenMax.to(title, 1, {
			x: (titleX - title.width()/2) / title.width() * 50,
			y: (titleY - title.height()/2) / title.height() * 50
		});
	}
}


app.init();