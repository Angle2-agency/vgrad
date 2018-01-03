


var app = {
	data : {
		topSlider : null
	},
	init : function() {
		app.topSliderInit();
	},
	topSliderInit : function(){
		app.data.topSlider = new Swiper('.swiper-container', {
			speed : 1000,
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
				},
				slideChange : function(){
					var slide = this.activeIndex + 1;
					$(this.$el).find('.topslider-pagination span.current').html(slide < 10 ? '0'+slide : slide);
					console.log(this.slides);

				}
			},
    	});
	}
}


app.init();