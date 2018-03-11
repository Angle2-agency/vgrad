function toggleRoomView(checked, roomid, hotelid)
{
    var viewId = "view-" + hotel + "-" + room;
    if (false == checked) {
        $('#' + viewId).remove();
        $('#rooms-selected').text(parseInt($('#rooms-selected').text()) - 1);
        removeFromBasket(roomid);
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
        if (lang == 'ru') {
            html += '<li class="popup__rooms_number-title">Количество номеров</li>';    
        } else if (lang == 'en') {
            html += '<li class="popup__rooms_number-title">Rooms quantity</li>';
        } else {
            html += '<li class="popup__rooms_number-title">Кількість номерів</li>';
        }
        
        html += '<li class="popup__rooms_number-select" data-room="' + roomid + '">';
        html += '<i class="minus disabled"></i>';
        html += '<input type="number" class="no-spinners" value="1" readonly="" />';
        html += '<i class="plus"></i>';
        html += '</li>';
        html += '</ul>';

        // details
        html += '<div class="popup__rooms_number-details">';
        if (lang == 'ru') {
            html += '<div class="show-details">Подробнее</div>';    
            html += '<div class="price">' + room.price + ' грн/ночь</div>';
        } else if (lang == 'en') {
            html += '<div class="show-details">More</div>';
            html += '<div class="price">' + room.price + ' uah/night</div>';
        } else {
            html += '<div class="show-details">Детальніше</div>';    
            html += '<div class="price">' + room.price + ' грн/ночь</div>';
        }
        
        html += '<div class="details-descr">';
        
        // bad type
        html += '<section class="bedtype">';
        if (lang == 'ru') {
            html += '<h4>Тип кровати</h4>';    
        } else if (lang == 'en') {
            html += '<h4>Bed type</h4>';    
        } else {
            html += '<h4>Тип ліжка</h4>';    
        }
        
        html += '<ul class="bedtype__list clearfix double">';
        html += '<li class="double">';
        html += '<input checked="checked" onclick="basket.rooms['+roomid+'].bed = \'Double\'; renderBasket();" data-type="double" type="radio" name="'+roomid+'bedtype" id="'+roomid+'-double" />';
        html += '<label for="'+roomid+'-double">Double</label>';
        html += '</li>';
        html += '<li class="twin">';
        html += '<input checked="" onclick="basket.rooms['+roomid+'].bed = \'Twin\'; renderBasket();" data-type="twin" type="radio" name="'+roomid+'bedtype" id="'+roomid+'-twin" />';
        html += '<label for="'+roomid+'-twin">Twin</label>';
        html += '</li>';
        html += '</ul>';
        html += '</section>';
        
        // options
        html += '<section class="addoptions">';
        if (lang == 'ru') {
            html += '<h4>Дополнительные опции</h4>';
        } else if (lang == 'en') {
            html += '<h4>Additional options</h4>';
        } else {
            html += '<h4>Додаткові опції</h4>';
        }
        for (var id in hotelHash.options) {
            var opt = hotelHash.options[id];
            html += '<div class="addoptions__item">';
            html += '<input onclick="$(this).is(\':checked\') ? addOptionToBasket('+roomid+', '+id+') : removeOptionFromBasket('+roomid+', '+id+');" type="checkbox" name="opt-'+roomid+'-'+id+'" id="opt-'+roomid+'-'+id+'" />';
            html += '<label for="opt-'+roomid+'-'+id+'">'+opt.name+'</label>';
            html += '</div>';
        };
        html += '</section>';
        
        // descr
        html += '<section>';
        if (lang == 'ru') {
            html += '<h4>Описание номера</h4>';    
        } else if (lang == 'en') {
            html += '<h4>Room description</h4>';    
        } else {
            html += '<h4>Опис номера</h4>';    
        }
        
        html += '<div class="details-text">' + room.description + '</div>'
        html += '</section>';
        html += '</div>';

        $('#room-info-holder').append($(html));
        $('#rooms-selected').text(parseInt($('#rooms-selected').text()) + 1);
        // init slider for image
        app.spaservicesSlider = new Swiper('.popup__rooms_slider', {
           speed : 700,
           parallax : false,
           //loop : true,
                navigation: {         
                  nextEl: '.main__slider-button-next',
                  prevEl: '.main__slider-button-prev',
                }
             });
        addToBasket(roomid);
    }
}

var basket = {
    rooms: {},
    total: 0,
    nights: 1,
};

function setDates()
{
    var from = new Date($('#date-from').val());
    var to = new Date($('#date-to').val());

    basket.nights = Math.abs(to - from) / 86400000;
    renderBasket();
}

function addToBasket(roomid)
{
    var room = hotelHash.rooms[roomid];
    basket.rooms[roomid] = {
        room: hotelHash.rooms[roomid],
        qty: 1,
        options: {},
        total: room.price,
        bed: 'Twin'
    };
    renderBasket();
}

function isInBasket(roomid)
{
    return obj.hasOwnProperty(roomid);
}

function removeFromBasket(roomid)
{
    basket.rooms[roomid] = null;
    delete basket.rooms[roomid];
    renderBasket();
}

function addOptionToBasket(roomid, optionid)
{
    basket.rooms[roomid].options[optionid] = hotelHash.options[optionid];
    basket.rooms[roomid].total += hotelHash.options[optionid].price;
    renderBasket();
}

function removeOptionFromBasket(roomid, optionid)
{
    delete basket.rooms[roomid].options[optionid];
    basket.rooms[roomid].total -= hotelHash.options[optionid].price;   
    renderBasket();
}

function addQuantity(roomid)
{
    basket.rooms[roomid].qty = basket.rooms[roomid].qty + 1;
    basket.rooms[roomid].total  = basket.rooms[roomid].qty * basket.rooms[roomid].room.price;
    renderBasket();
}

function removeQuantity(roomid)
{
    basket.rooms[roomid].qty = basket.rooms[roomid].qty - 1;
    basket.rooms[roomid].total  = basket.rooms[roomid].qty * basket.rooms[roomid].room.price;
    renderBasket(roomid);
}

function renderBasket()
{
    var html = '';
    var holder = $('#basket-holder');
    holder.find('.popup__payment_basket-items').remove();
    holder.find('hr').remove();
    var orderTotal = 0;
    for (roomid in basket.rooms) {
        var oroom = basket.rooms[roomid];
        html += '<ul class="popup__payment_basket-items">';
        html += '<li>';
        if (lang == 'ru') {
            html += '<span class="fl">Тип номера</span>';
        } else if (lang == 'en') {
            html += '<span class="fl">Room type</span>';
        } else {
            html += '<span class="fl">Тип номера</span>';
        }
        html += '<b class="fr">' + oroom.room.name + ' ('+ oroom.qty +')</b>';
        html += '</li>';
        html += '<li>';
        if (lang == 'ru') {
            html += '<span class="fl">Тип кровати</span>';
        } else if (lang == 'en') {
            html += '<span class="fl">Bed type</span>';
        } else {
            html += '<span class="fl">Тип ліжка</span>';
        }
        html += '<b class="fr">' + oroom.bed + '</b>';
        html += '</li>';
        html += '<li>';
        if (lang == 'ru') {
            html += '<span class="fl">Стоимость доп.опций</span>';
        } else if (lang == 'en') {
            html += '<span class="fl">Additional options cost</span>';
        } else {
            html += '<span class="fl">Вартість доп.опцій</span>';
        }
        var optionsTotal = 0;
        for (oi in oroom.options) {
            optionsTotal += oroom.options[oi].price;
        }
        html += '<b class="fr">' + optionsTotal + ' грн</b>';
        html += '</li>';
        html += '<li>';
        if (lang == 'ru') {
            html += '<span class="fl">Общая стоимость</span>';
        } else if (lang == 'en') {
            html += '<span class="fl">Total</span>';
        } else {
            html += '<span class="fl">Загальна вартість</span>';
        }
        html += '<b class="fr">' + oroom.total + ' грн</b>';
        html += '</li>';   
        html += '</ul>';
        html += '<hr/>';
        orderTotal += oroom.total;
    }

    html += '<ul class="popup__payment_basket-items">';
    html += '<li>';
    if (lang == 'ru') {
        html += '<span class="fl">Общая стоимость (ночей: '+basket.nights+')</span>';    
        html += '<b class="fr">' + (orderTotal * basket.nights) + ' грн</b> <br/>';
        html += '<small>(Ваша оплата номера служит гарантией бронирования)</small>';
    } else if (lang == 'en') {
        html += '<span class="fl">Total (nights: '+basket.nights+')</span>';    
        html += '<b class="fr">' + (orderTotal * basket.nights) + ' uah</b> <br/>';
        html += '<small>(Your payment is guarantees your reservation)</small>';
    } else {
        html += '<span class="fl">Загальна вартість (ночей: '+basket.nights+')</span>';    
        html += '<b class="fr">' + (orderTotal * basket.nights) + ' грн</b> <br/>';
        html += '<small>(Ваша оплата номера є гарантією бронювання)</small>';
    }
    
    
    html += '</li>';   
    html += '</ul>';
    basket.total = orderTotal * basket.nights;
    holder.append($(html));
}

function placeOrder()
{
    $(['customer_name', 'customer_phone', 'customer_email']).each(function(i, f) {
        $('#' + f).removeClass('error');
    })
    var data = {
        name: $('#customer_name').val(),
        email: $('#customer_email').val(),
        phone: $('#customer_phone').val(),
        comment: $('#order_description').val(),
        basket: basket,
        from: $('#date-from').val(),
        to: $('#date-to').val()
    }
    
    $.ajax({
      type: "POST",
      url: '/book',
      data: data,
      success: function (data) {
        console.log(data);
        if (data.errors) {
            if (data.errors.indexOf('name') != -1) {
                $('#customer_name').addClass('error');
            }
            if (data.errors.indexOf('phone') != -1) {
                $('#customer_phone').addClass('error');
            }
            if (data.errors.indexOf('email') != -1) {
                $('#customer_email').addClass('error');
            }
        } else {
            document.location = data.goto;
        }
      },
      dataType: 'json'
    });
}