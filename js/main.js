


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
			parallax : true,
			loop : true,
      		navigation: {      			
        		nextEl: '.swiper-button-next',
        		prevEl: '.swiper-button-prev',
      		},
    	});
	}
}


app.init();