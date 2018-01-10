function toggleRoomView(checked, roomid, hotelid)
{
    var viewId = "view-" + hotel + "-" + room;
    if (false == checked) {
        $('#' + viewId).remove();
        $('#rooms-selected').text(parseInt($('#rooms-selected').text()) - 1);
    } else {
        var hotel = hotelHash.hotels[hotelid];
        var room  = hotelHash.rooms[roomid];
        var html = '<div class="popup__rooms_item" id="' + viewId + '">';
        html += '<section class="popup__rooms_info">';
        html += '<h4>' + room.name + ' | ' + hotel.name + '</h4>';
        html += '<div class="popup__rooms_slider">';
        html += '<div class="swiper-wrapper">';
        $(room.gallery).each(function (id, image) {
            html += '<div class="swiper-slide slide">';
            html += '<img src="' + image + '" alt="">';
            html += '</div>';
        });
        html += '</div>';
        if (room.gallery.length > 1) {
            html += '<div class="main__slider-button-prev">';
            html += '<i></i>';
            html += '</div>';
            html += '<div class="main__slider-button-next"></div>';
        }
        html += '</div>';
        html += '</section>';

        // rooms qnty
        html += '<ul class="popup__rooms_number clearfix">';
        html += '<li class="popup__rooms_number-title">Количество номеров</li>';
        html += '<li class="popup__rooms_number-select">';
        html += '<i class="minus disabled"></i>';
        html += '<input type="number" class="no-spinners" value="1" readonly="" />';
        html += '<i class="plus"></i>';
        html += '</li>';
        html += '</ul>';

        // details
        html += '<div class="popup__rooms_number-details">';
        html += '<div class="show-details">Подробнее</div>';
        html += '<div class="price">' + room.price + ' грн/ночь</div>';
        html += '<div class="details-descr">';
        
        // bad type
        html += '<section class="bedtype">';
        html += '<h4>Тип кровати</h4>';
        html += '<ul class="bedtype__list clearfix double">';
        html += '<li class="double">';
        html += '<input checked="" data-type="double" type="radio" name="'+roomid+'bedtype" id="'+roomid+'-double" />';
        html += '<label for="'+roomid+'-double">Double</label>';
        html += '</li>';
        html += '<li class="twin">';
        html += '<input checked="" data-type="twin" type="radio" name="'+roomid+'bedtype" id="'+roomid+'-twin" />';
        html += '<label for="'+roomid+'-twin">Twin</label>';
        html += '</li>';
        html += '</ul>';
        html += '</section>';
        
        // options
        html += '<section class="addoptions">';
        html += '<h4>Дополнительные опции</h4>';
        for (var id in hotelHash.options) {
            var opt = hotelHash.options[id];
            html += '<div class="addoptions__item">';
            html += '<input type="checkbox" name="opt-'+roomid+'-'+id+'" id="opt-'+roomid+'-'+id+'" />';
            html += '<label for="opt-'+roomid+'-'+id+'">'+opt.name+'</label>';
            html += '</div>';
        };
        html += '</section>';
        
        // descr
        html += '<section>';
        html += '<h4>Описание номера</h4>';
        html += '<div class="details-text">' + room.description + '</div>'
        html += '</section>';
        html += '</div>';

        $('#room-info-holder').append($(html));
        $('#rooms-selected').text(parseInt($('#rooms-selected').text()) + 1);
    }
}