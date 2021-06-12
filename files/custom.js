//#main-slider
// var slideHeight = $(window).height();
// $('#home-slider .item').css('height',slideHeight);

// $(window).resize(function(){'use strict',
//     $('#home-slider .item').css('height',slideHeight);
// });

// $('.carousel').carousel({
//     pause: "false"
// });

//  $('.carousel').carousel();


// product slider
$(document).ready(function () {

    $('.service-lists').mouseover(function (event) {
        $(this).css({'z-index': '1', '-webkit-filter': 'grayscale(0)', 'filter': 'grayscale(0)', 'opacity': '1'});
    //        $(this).unbind(event);
    });
    $('.service-lists').mouseout(function (event) {
        $(this).css({'z-index': '0', '-webkit-filter': 'grayscale(1)', 'filter': 'grayscale(1)', 'opacity': '0.5'});
    //        $(this).unbind(event);
    });
    $("#owl-demo").owlCarousel({

        autoPlay: 4000, //Set AutoPlay to 3 seconds

        items: 3,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3]

    });
    $('#endone').click(function () {
        $('#date-errorone').hide();
    });
    $('#startone').click(function () {
        $('#date-errorone').hide();
    });
    $('#startone').change(function (e) {
        var currentDate = new Date();
        var currentDate2 = new Date().setHours(0, 0, 0, 0);
        var day = 0;
        var month = 0;
        var year = 0;
        if ($('#startone').val()) {
            var start = new Date($('#startone').val());
            var start2 = new Date($('#startone').val()).setHours(0, 0, 0, 0);
            if (start2 < currentDate2) {
                $('#date-msgone').text('Please select the date from today onwards');
                $('#startone').val('');
                $('#endone').val('');
                $('#date-errorone').show();
                e.preventDefault();
            } else {
                day = start.getDate() + 1;
                month = start.getMonth() + 1;
                year = start.getFullYear();
                if (day < 10) {
                    day = '0' + day
                }

                if (month < 10) {
                    month = '0' + month
                }

                var now = start;
                var totalDays = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
                var today = Number(start.getDate());
                var currentMonth = Number(start.getMonth() + 1);
                if (today == totalDays) {
                    day = '0' + 1;
                    if (currentMonth == 12) {
                        month = '0' + 1;
                        year = start.getFullYear() + 1;
                    } else {
                        month = '0' + ((start.getMonth() + 1) + 1);
                    }
                }
                var new_date = month + '/' + day + '/' + year;
                $('#endoneone').val(new_date);
                $('#date-errorone').hide();
            }
        }
    });
    $('#endone').change(function () {
        var currentDate = new Date().setHours(0, 0, 0, 0);
        $('#date-errorone').hide();
        if ($('#endone').val()) {
            if ($('#startone').val()) {
                var start = new Date($('#startone').val()).setHours(0, 0, 0, 0);
                var end = new Date($('#endone').val()).setHours(0, 0, 0, 0);
                if (end < currentDate) {
                    $('#date-msgone').text('Checkout date must be greater than ' + $('#startone').val());
                    $('#endone').val('');
                    $('#date-errorone').show();
                }
                if (start >= end) {
                    $('#date-msgone').text('Checkout date must be greater than ' + $('#startone').val());
                    $('#endone').val('');
                    $('#date-errorone').show();
                }

            } else {
                $('#date-msgone').text('Please select Checkin date first');
                $('#endone').val('');
                $('#date-errorone').show();
            }
        }
    });
    $('#bookRoomFormOne').submit(function (e) {
        if (!($('#endone').val()) & !($('#startone').val())) {
            $('#date-msgone').text('Please select Checkin and Checkout date before submission');
            $('#date-errorone').show();
            e.preventDefault();
        }
    });
});

// gallery
(function ($) {

    $.fn.extend({
        sdFilterMe: function (options) {
            if (options && typeof (options) == 'object') {
                options = $.extend({}, $.sdFilterMe.defaults, options);
            }

            if ($(this).length == 1) {
                new $.sdFilterMe(this, options);
            }

            return this;
        }
    });
    $.layout = [];
    $.sdFilterMe = function (el, options) {
        var $el = $(el);
        $(window).on('load', function () {

            $el = $.sdFilterMe.buildLayout(el, options);
            $.layout = $.sdFilterMe.storeCoordinates($el);
            $(window).on('resize', function () {
                $.layout = $.sdFilterMe.storeCoordinates($el);
            });
            var $boxes = $el.find('> .sdfm-inner-wrapper');
            // Triggering events


            $(options.filterSelector).css('cursor', 'pointer').on('click', function (e) {
                e.preventDefault();
                $.sdFilterMe.filterBoxes($el, $(this).attr('data-filter'), options);
            });
            $(options.orderSelector).css('cursor', 'pointer').on('click', function (e) {
                e.preventDefault();
                $.sdFilterMe.sortBoxes($boxes, $(this).attr('data-order'), options);
            });
            if (options.hoverEffect) {
                $.sdFilterMe.hoverEffect($el, options);
            }
        });
    };
    $.sdFilterMe.buildLayout = function (el, options) {

        var $el = $(el)
                , $lis = $el.find('> li')
                , widths = []
                , heights = []
                , clones = []
                , maxWidth
                , maxHeight
                , outerWrapperId = 'sdfm-wrapper'
                , $outerWrapper = $('<div />')
                .attr('id', outerWrapperId)
                .css({
                    'vertical-align': 'top',
                    'display': 'block',
                    'margin': 'auto'
                });
        $el.css({
            'list-style-type': 'none'
        }).wrap($outerWrapper);
        $lis.css({
            'display': 'inline-block'
        }).each(function (i) {
            widths[i] = $(this).outerWidth() + options.css.border.width * 2;
            heights[i] = $(this).outerHeight() + options.css.border.width * 2;
            clones[i] = $(this).children().clone();
        });
        maxWidth = Math.max.apply(Math, widths);
        maxHeight = Math.max.apply(Math, heights);
        $wrapper = $('<div />')
                .width(maxWidth)
                .height(maxHeight)
                .css({
                    // Setting transitions
                    '-webkit-transition': 'all ' + options.duration + 'ms ' + options.animation,
                    '-moz-transition': 'all ' + options.duration + 'ms ' + options.animation,
                    '-ms-transition': 'all ' + options.duration + 'ms ' + options.animation,
                    '-o-transition': 'all ' + options.duration + 'ms ' + options.animation,
                    'transition': 'all ' + options.duration + 'ms ' + options.animation,
                    // Others properties
                    'float': 'left',
                    'display': 'inline-block',
                    'padding': 0,
                    'position': 'relative',
                    'border': options.css.border.width + 'px solid ' + options.css.border.color,
                    'margin': options.css.margin
                });
        if (options.css.pointer) {
            $wrapper.css('cursor', 'pointer');
        }


        for (var i = 0; i < clones.length; ++i) {
            var title = $lis.eq(i).data('title')
                    , link = $lis.eq(i).data('link')
                    , order = $lis.eq(i).data('order')
                    , $wrapperClone = $wrapper
                    .clone()
                    .attr('data-id', i)
                    .html(clones[i])
                    .attr({
                        'class': 'sdfm-inner-wrapper ' + $lis.eq(i).attr('class')
                    });
            if (typeof (title) !== 'undefined') {
                $.sdFilterMe.addOverlayTitles($wrapperClone, title, options, maxWidth, maxHeight);
            }

            if (typeof (link) !== 'undefined') {
                $.sdFilterMe.addLink($wrapperClone, link, options);
            }

            if (typeof (order) !== 'undefined') {
                $wrapperClone.attr('data-order', order);
            }

            $lis.eq(i).remove();
            $('#' + outerWrapperId).append($wrapperClone);
        }

        $outerWrapper = $('#' + outerWrapperId);
        $outerWrapper.before($el.clone(true)).find('> .sdfm-inner-wrapper').on('click', function () {
            $('#' + outerWrapperId).prev('ul').trigger('fm.boxClicked', [$(this).index(), $(this).attr('data-order')]);
        });
        $el.remove();
        return $outerWrapper;
    };
    $.sdFilterMe.storeCoordinates = function ($el) {

        var layout = {};
        $el.find('> .sdfm-inner-wrapper').each(function (i) {

            layout[i] = {
                origPosX: this.offsetLeft,
                origPosY: this.offsetTop,
                newPosX: this.offsetLeft,
                newPosY: this.offsetTop
            };
        });
        return layout;
    };
    $.sdFilterMe.addOverlayTitles = function ($box, title, options, maxWidth, maxHeight) {

        var backgroundColor = options.css.overlay.background;
        $overlay = $('<div />')
                .addClass('sdfm-overlay')
                .css({
                    'background-color': 'rgba(' + backgroundColor.r + ', ' + backgroundColor.v + ', ' + backgroundColor.b + ', ' + options.css.overlay.opacity + ')',
                    'position': 'absolute',
                    'top': 0,
                    '-webkit-transition': 'all ' + options.css.overlay.duration + 'ms ' + options.animation,
                    '-moz-transition': 'all ' + options.css.overlay.duration + 'ms ' + options.animation,
                    '-ms-transition': 'all ' + options.css.overlay.duration + 'ms ' + options.animation,
                    '-o-transition': 'all ' + options.css.overlay.duration + 'ms ' + options.animation,
                    'transition': 'all ' + options.css.overlay.duration + 'ms ' + options.animation,
                    'text-align': 'center',
                    'left': 0,
                    'width': maxWidth - options.css.border.width * 2,
                    'height': maxHeight - options.css.border.width * 2
                });
        $title = $('<span />')
                .css({
                    'margin': 'auto',
                    'text-transform': 'uppercase',
                    'display': 'inline-block',
                    'padding': '5px',
                    'width': 'auto',
                    'height': '50px',
                    'top': '50%',
                    'margin-top': '25px',
                    'color': options.css.overlay.color,
                    'font-size': '2em',
                    'border': options.css.overlay.border,
                    'font-weight': 'bold'
                }).html(title);
        $box.append($overlay.append($title));
    };
    $.sdFilterMe.translateBox = function ($box, target, options, hide) {

        if (!$.layout[$box.index()]) {
            console.error('Error: can\'t read value for ' + $box.index() + ' in $.layout[].');
            return;
        }

        var i = $box.index()
                , top = $.layout[i].origPosY
                , left = $.layout[i].origPosX
                , origPosX = $.layout[target].origPosX
                , origPosY = $.layout[target].origPosY
                , translateX = origPosX - left
                , translateY = origPosY - top
                , cssValue = 'translate(' + translateX + 'px, ' + translateY + 'px)';
        if (options.sortedOut == 'disappear' && hide === true) {
            cssValue += ' scale(0, 0)';
            $box.addClass('sdfm-box-hidden');
        } else if (options.sortedOut == 'disappear' && hide === false) {
            cssValue += ' scale(1, 1)';
            $box.removeClass('sdfm-box-hidden');
        } else {
            $box.removeClass('sdfm-box-hidden');
        }


        $.sdFilterMe.applyTransform($box, cssValue);
        $.layout[i].newPosX = origPosX;
        $.layout[i].newPosY = origPosY;
    };
    $.sdFilterMe.nothingToShow = function ($wrapper, options) {
        $nothingToShow = $('<h3 />')
                .addClass('sdfm-nothing')
                .css({
                    'font-size': '4em',
                    'color': options.nothingToShow.color,
                    'height': '0px',
        //                'display': 'none',
                    'position': 'relative',
                    'margin': 0,
                    'transform': 'scale(0,0)',
        //                'margin-bottom': '-125px',
                    'width': '100%',
                    'text-align': 'center',
        //                'top': '50px',
                    // Setting transitions
                    '-webkit-transition': 'all ' + options.duration + 'ms ' + options.animation,
                    '-moz-transition': 'all ' + options.duration + 'ms ' + options.animation,
                    '-ms-transition': 'all ' + options.duration + 'ms ' + options.animation,
                    '-o-transition': 'all ' + options.duration + 'ms ' + options.animation,
                    'transition': 'all ' + options.duration + 'ms ' + options.animation
                }).html(options.nothingToShow.text);
        if (!$wrapper.prev('h3').hasClass('sdfm-nothing')) {
            $wrapper.before($nothingToShow);
        }

        window.setTimeout(function () {
            $.sdFilterMe.applyTransform($nothingToShow, 'scale(1, 1)');
        }, options.duration / 2);
    };
    $.sdFilterMe.filterBoxes = function ($el, filter, options) {

        var j = 0
                , $boxes = $el.find('> .sdfm-inner-wrapper')
                , k = $boxes.length - 1
                , nothing = []
                , l = 0;
        $boxes.each(function () {

            if ($(this).hasClass(filter) || filter === '*') {

                if (options.sortedOut == 'opacity') {
                    $(this).animate({opacity: 1}, {duration: options.duration});
                }

                $.sdFilterMe.translateBox($(this), j++, options, false);
            } else {

                nothing[l] = true;
                if (options.sortedOut == 'opacity') {
                    $(this).animate({opacity: 0.25}, {duration: options.duration});
                }
                $.sdFilterMe.translateBox($(this), k--, options, true);
                ++l;
            }
        });
        if (nothing.length == $boxes.length) {
            $.sdFilterMe.nothingToShow($el, options);
        } else {
            $.sdFilterMe.applyTransform($el.prev('.sdfm-nothing'), 'scale(0, 0)', options, function () {
                $el.prev('.sdfm-nothing').remove();
            });
        }



    };
    $.sdFilterMe.applyTransform = function ($box, value, options, callback) {
        $box.css({
            '-webkit-transform': value,
            '-moz-transform': value,
            '-o-transform': value,
            '-ms-transform': value,
            'transform': value
        });
        if (callback) {
            window.setTimeout(function () {
                callback();
            }, options.duration)
        }
    };
    $.sdFilterMe.hoverEffect = function ($el, options) {

        $el.find('> .sdfm-inner-wrapper').hover(function () {

            $(this).find('> .sdfm-overlay').fadeOut(options.css.overlay.duration).css({
                'transform': 'scale(0, 0)'
            });
        }, function () {

            $(this).find('> .sdfm-overlay').fadeIn(options.css.overlay.duration).css({
                'transform': 'scale(1, 1)'
            });
        })
    };
    $.sdFilterMe.addLink = function ($box, link, options) {

        $box.on('click', function () {
            document.location = link;
        });
    };
    $.sdFilterMe.sortBoxes = function ($boxes, sorting, options) {
        var k = $boxes.length - 1;
        $boxes.each(function (index, elem) {

            if (sorting == 'asc') {
                $.sdFilterMe.translateBox($(elem), $(elem).attr('data-order'), options, false);
            } else if (sorting == 'desc') {
                $.sdFilterMe.translateBox($(elem), k - $(elem).attr('data-order'), options, false);
            }

            $.sdFilterMe.applyTransform($boxes.parent().prev('.sdfm-nothing'), 'scale(0, 0)', options, function () {
                $boxes.parent().prev('.sdfm-nothing').remove();
            });
        });
    };
    $.sdFilterMe.defaults = {
        filterSelector: '.sorter',
        orderSelector: '.orderer',
        duration: 1000,
        animation: 'ease',
        hoverEffect: true,
        sortedOut: 'disappear',
        css: {
            overlay: {
                background: {
                    r: 0,
                    v: 0,
                    b: 0
                },
                width: 200,
                duration: 250,
                color: 'white',
                opacity: 0.5
            },
            border: {

            },
            pointer: true
        },
        nothingToShow: {
            text: 'Nothing to show'
        }
    };
})(jQuery);
jQuery(function ($) {
    $('#sort-me').sdFilterMe({
        filterSelector: '.sorter',
        orderSelector: '.orderer',
        duration: 1000,
        animation: 'ease',
        hoverEffect: true,
        sortedOut: 'disappear',
        nothingToShow: {
            text: 'Nothing to show',
            color: '#ccc'
        }
    }).on('fm.boxClicked', function (e, position, order) {
        // console.log('Box position is ' + position);
        // console.log('Box sort order is ' + order);
    });
});

$(document).ready(function () {
    policy=$('.policy');
    policy_title=$('#policy-title');
    policy_msg=$('#refundable_policy');

        policy_msg.css('border-radius','12px');
        policy_msg.css('padding-left','5px');
        policy_msg.css('font-size','12px');
        policy_msg.css('font-family','initial');
        policy_msg.css('font-style','oblique');
        // policy_msg.css('opacity','0.5');
        policy_msg.css('background-color','#eae2d5');

    $("#nonrefundable_what").hover(function () {
        policy_title.text('Non-refundable policy');
        policy_msg.text(policy_msg.attr('data-nrf'));
        policy.css('visibility', "visible");
        policy.css('height', "auto");
    },function () {
        policy.css('visibility', "hidden");
        policy.css('height', "0px");
    });

    $("#refundable_what").hover(function () {
        policy_title.text('Refundable policy');
        policy_msg.text(policy_msg.attr('data-rf'));
        policy.css('visibility', "visible");
        policy.css('height', "auto");
    }, function () {
        policy.css('visibility', "hidden");
        policy.css('height', "0px");
    });

    $("#extra_bed").bind('keyup mouseup', function () {
        var max = $(this).attr('max');
        var value = $(this).val();
        if (value > max) {
            $('.msg').text('The no of bed you entered is greatee than '+max);
            $('#myModal').modal('show');
            $(this).val('');
        }
    });

    $("#no_of_room").bind('keyup mouseup', function () {
        var max = $(this).attr('max');
        var value = $(this).val();
        if (value > max) {
            $('.msg').text('The no of room you entered is greater than '+max);
            $('#myModal').modal('show');

            $(this).val('');
        }
    });


    $(window).scroll(function () {
        if ($(window).scrollTop() >= 2280) {
            if (scroll) {
                var top = $(window).scrollTop() - 600;
                $('.fdivs.floatingdiv').css('top', top + 'px');
                $('.fdivs').removeClass('floatingdiv');
            }
        } else if ($(window).scrollTop() >= 550) {
            $('.fdivs').addClass('floatingdiv');
        } else {
            $('.fdivs').removeClass('floatingdiv');
            $('.fdivs').css('top', '0px');
        }
        $(window).scrollTop()
        // console.log($(window).scrollTop());
    });

    // add and remove packages
    var additional_pkg = [];
    $('.add_aditional_pkgs').click(function () {
        var bed_rate=Number($('#bed_rate').val());

        var no_of_extra_bed=0;
        $('.extra_bed').each(function(){
            no_of_extra_bed+=Number($(this).val());
        });

        var grand_total=room_rate=price=Number($('input[name="price"]:checked').attr('data-room-rate'));

        var no_of_days=Number($('.no-of-days').text());

        var no_of_room=$('#no_of_room').val();

        // var offer_amount=$('#offer_amount').val();
        var offer_percent=Number($('.offer-percent').text());
        var offer_amount=(offer_percent/100)*room_rate;
        $('#offer_amount').val(offer_amount);

        var current_total=$('#grand_total').val();

        var discount = Number($('#discount').text());

        var discount_amount =0;

        var room_rate_type=$('input[name="price"]:checked').attr('id');

        var pid = parseInt($(this).data('pkgid'));

        if (additional_pkg.indexOf(pid) <= -1) {
            additional_pkg.push(pid);

            discount = Number($('#discount').text());

            discount_amount =((price * discount) / 100);

            $('#remove_aditional_' + pid).addClass('added-packages');

            var added_packages=0;
            $('.added-packages').each(function(){
                added_packages+=Number($(this).data('pkgamt'));
            });

            var pamount = $(this).data('pkgamt');
            var title = $(this).data('pkgtitle');
            var code = $(this).data('pkgcode');
            $('#additional_' + pid).prop('checked', true);
            var add_content = '<li class="additional-'+pid +'">' + title ;
            add_content +='<span style="float: right; font-weight: bold;">' + code + '</span>';
            add_content +='<span style="margin-right:5px; float:right;" class="additional_pkg_amount"> ' + pamount + '</span>';
            add_content +='</li>';

            $('#additionalpkg').show();
            $('#additionaltab').append(add_content);

            if (discount!= 0) {
                // $('.offer-percent').text(0);
                grand_total = price-discount_amount;

                grand_total+=added_packages;

                grand_total*=no_of_room;

                grand_total+=(no_of_extra_bed*bed_rate);

                grand_total*=no_of_days;     

                $('#sub-total').text(room_rate);
                $('.current_total').text(grand_total);
                $('#grand_total').val(grand_total);
            } else {
                // if(room_rate_type=='non-refundable'){
                    grand_total-=offer_amount;
                // }

                grand_total+=added_packages;

                grand_total*=no_of_room;

                grand_total+=(no_of_extra_bed*bed_rate);

                grand_total*=no_of_days;

                $('#sub-total').text(room_rate);
                $('.current_total').text(grand_total);
                $('#grand_total').val(grand_total);
            }

            $(this).css('display', 'none');          
            $('#remove_aditional_' + pid).attr('style', 'display:initial;');

        } else {
            var i = "add_aditional_" + pid;
            additional_pkg.splice($.inArray(pid, additional_pkg), 1);
            $('#additional_' + pid).prop('checked', false);


            var element = document.getElementById(i);
            element.style.display = "initial";
            $(this).attr('style', 'display:none;');
            $('.additional-' + pid).remove();
            $('#remove_aditional_' + pid).removeClass('added-packages');

            var added_packages=0;

            $('.added-packages').each(function(){
                added_packages+=Number($(this).data('pkgamt'));
            });

            discount = Number($('#discount').text());

            discount_amount =((price * discount) / 100);

            if (discount!= 0) {
                // $('.offer-percent').text(0);
                grand_total = price-discount_amount;
                grand_total+=added_packages;
                grand_total*=no_of_room;
                grand_total+=(no_of_extra_bed*bed_rate);
                grand_total*=no_of_days;
                $('#sub-total').text(room_rate);
                $('.current_total').text(grand_total);
                $('#grand_total').val(grand_total);
            } else {
                // if(room_rate_type=='non-refundable'){
                    grand_total-=offer_amount;
                // }

                grand_total+=added_packages;              
                grand_total*=no_of_room;
                grand_total+=(no_of_extra_bed*bed_rate);
                grand_total*=no_of_days;

                $('#sub-total').text(room_rate);
                $('.current_total').text(grand_total);
                $('#grand_total').val(grand_total);
            }

        }
        return false;
    });

});

function card_validation(el){
    
    if ($('#offer_amount').val() > 0 ) {
        return false;
    }
    
    var url = $("#base_url").text();
    var email = ($('#book-email').val() != "") ? $('#book-email').val() : null;
    var card_number = ($('#discount-card').val() != "") ? $('#discount-card').val() : 0;

    var grand_total=room_rate=price=Number($('input[name="price"]:checked').attr('data-room-rate'));

    var room_rate_type=$('input[name="price"]:checked').attr('id');

    var no_of_days=Number($('.no-of-days').text());

    var no_of_room=$('#no_of_room').val();

    // var offer_amount=$('#offer_amount').val();
    var offer_percent=Number($('.offer-percent').text());
    var offer_amount=(offer_percent/100)*room_rate;
        $('#offer_amount').val(offer_amount);

    var current_total=$('#grand_total').val();

    var added_packages=0;
    $('.added-packages').each(function(){
        added_packages+=Number($(this).data('pkgamt'));
    });

    var bed_rate=Number($('#bed_rate').val());

    var no_of_extra_bed=0;
    $('.extra_bed').each(function(){
        no_of_extra_bed+=Number($(this).val());
    });

    if (card_number != 0) {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: url + 'rooms/card_validation',
            data: {'card_number': card_number, 'email': email},
            success: function (res) {
                if (res.length == 1){
                    $('.discount-msg').css('color', 'green');
                    var discount = res[0]['discount'];
                    $('#discount_percent').val(discount);
                    $('#discount').text(discount);

                    var discount_amount =((discount / 100) * price);

                    grand_total -=discount_amount;

                    grand_total+=added_packages;

                    grand_total*=no_of_room;

                    grand_total+=(no_of_extra_bed*bed_rate);

                    grand_total*=no_of_days;

                    $('.sub-total').text(room_rate);
                    $('.current_total').text(grand_total);
                    $('#grand_total').val(grand_total);

                    $('.discount-msg').text('');
                    $('.discount-msg').addClass("glyphicon glyphicon-ok-circle");
                    $('.pay-btn').removeAttr('disabled');
                    $("#card_status").val(1);
                } else {
                    grand_total+=added_packages;
                    grand_total*=no_of_room;
                    grand_total+=(no_of_extra_bed*bed_rate);
                    grand_total*=no_of_days;

                    $('.sub-total').text(room_rate);
                    $('.current_total').text(grand_total);
                    $('#grand_total').val(grand_total);

                    $('.discount-msg').text('');
                    $('.discount-msg').addClass("glyphicon glyphicon-ok-circle");
                    $('.pay-btn').removeAttr('disabled');
                    $("#card_status").val(1);
                    $('#discount_percent').val(0);
                    $('#discount').text('0');
                    $('.discount-msg').css('color', 'red');
                    $("#card_status").attr('value', 0);

                    if ($('#discount-card').val() == "") {
                        $('.discount-msg').removeClass("glyphicon glyphicon-ok-circle");
                        $('.discount-msg').removeClass("glyphicon glyphicon-remove-circle");
                        $('.discount-msg').text(" ");
                        $('.pay-btn').removeAttr('disabled');
                    } else if ($('#book-email').val() == "") {
                        $('.discount-msg').removeClass("glyphicon glyphicon-remove-circle");
                        $('.discount-msg').removeClass("glyphicon glyphicon-ok-circle");
                        $('.discount-msg').text(" |no email|");
                        $('.pay-btn').attr('disabled', 'disabled');
                    } else {
                        $('.discount-msg').removeClass("glyphicon glyphicon-ok-circle");
                        $('.discount-msg').addClass("glyphicon glyphicon-remove-circle");
                        $('.discount-msg').text("");
                        $('.pay-btn').attr('disabled', 'disabled');

                        $('#discount').text(0);
                    }

                }
            }
        });
    }else{
        // if(room_rate_type=='non-refundable'){
            grand_total-=offer_amount;
        // }

        grand_total+=added_packages;

        grand_total*=no_of_days;

        $('.sub-total').text(room_rate);
        $('.current_total').text(grand_total);
        $('#grand_total').val(grand_total);

        $('.discount-msg').removeClass("glyphicon glyphicon-ok-circle");
        $('.discount-msg').removeClass("glyphicon glyphicon-remove-circle");
        $('.discount-msg').text("");
         $('#discount').text(0);
        $('.pay-btn').removeAttr('disabled');
    }
}

function check_card() {
    var card_number = ($('#discount-card').val() != "") ? $('#discount-card').val() : 0;
    if (card_number == 0) {
        return true;
    } else {
        var status = $("#card_status").val();
        if (parseInt(status) == 1) {
            return true;
        } else {
            $('.msg').text("Wrong discount card number");
            $('#myModal').modal('show');
            return false;
        }
    }
}

(function ($, window) {
    // Add a new validator
    $.formUtils.addValidator({
        name: 'even_number',
        validatorFunction: function (value, $el, config, language, $form) {
            return parseInt(value, 10) % 2 === 0;
        }

    });
    window.applyValidation = function (validateOnBlur, forms, messagePosition, xtraModule) {
        $.validate({

            lang: 'en',
            //sanitizeAll : 'trim', // only used on form C
            // borderColorOnError : 'purple',
            modules: 'security, sanitize, location, sweden, file,' +
                    ' uk, brazil' + (xtraModule ? ',' + xtraModule : ''),
            onModulesLoaded: function () {
                $('#country-suggestions').suggestCountry();
            },
            onValidate: function ($f) {

                // console.log('about to validate form ' + $f.attr('id'));
                var $callbackInput = $('#callback');
                if ($callbackInput.val() == 1) {
                    return {
                        element: $callbackInput,
                        message: 'This validation was made in a callback'
                    };
                }
            }

        });
    };
    $('#text-area').restrictLength($('#max-len'));
    window.applyValidation(true, '#bill', 'top');
})(jQuery, window);


function discount(el) {
    var url = $("#base_url").text();
    var email = ($('#email').val() != "") ? $('#email').val() : null;
    var card_number = ($('#discount-card').val() != "") ? $('#discount-card').val() : 0;
    if (card_number != 0) {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: url + 'rooms/card_validation',
            data: {'card_number': card_number, 'email': email},
            success: function (res) {
                if (res.length == 1) {
                    $('.discount-msg').css('color', 'green');
                    var discount = res[0]['discount'];
                    $('#discount_percent').val( discount);
                    $('#discount').text(discount);                   
                    var discount_amount = offer_discount - ((discount / 100) * offer_discount);
                    $('#offer-discount').val(discount_rate);
                    $('.offer-discount').text(discount_rate);
                    $('#off-dis-label').text('Offer/Discount Rate');
                    $('#radio-price').attr('value', discount_rate);
                    $('.discount-msg').text('');
                    $('.discount-msg').addClass("glyphicon glyphicon-ok-circle");
                    $('.pay-btn').removeAttr('disabled');
                } else {
                    var r = $('#offer-nf-rf').val();
                    $('.offer-discount').text(r);
                    $('#radio-price').attr('value', r);
                    $('#discount_percent').val(0);
                    $('#discount').text('0');
                    $('.discount-msg').css('color', 'red');
                    if ($('#discount-card').val() == "") {
                        $('.discount-msg').removeClass("glyphicon glyphicon-ok-circle");
                        $('.discount-msg').removeClass("glyphicon glyphicon-remove-circle");
                        $('.discount-msg').text(" ");
                        $('.pay-btn').removeAttr('disabled');
                    } else if ($('#email').val() == "") {
                        $('.discount-msg').removeClass("glyphicon glyphicon-remove-circle");
                        $('.discount-msg').removeClass("glyphicon glyphicon-ok-circle");
                        $('.discount-msg').text(" |no email|");
                        $('.pay-btn').attr('disabled', 'disabled');
                    } else {
                        $('.discount-msg').removeClass("glyphicon glyphicon-ok-circle");
                        $('.discount-msg').addClass("glyphicon glyphicon-remove-circle");
                        $('.discount-msg').text("");
                        $('.pay-btn').attr('disabled', 'disabled');
                    }

                }
            }
        });
    }
}

function price_option(el) {
    var grand_total=room_rate=price=Number($('input[name="price"]:checked').attr('data-room-rate'));

    var no_of_days=Number($('.no-of-days').text());

    var no_of_room=$('#no_of_room').val();

    // var offer_amount=$('#offer_amount').val();

    var offer_percent=Number($('.offer-percent').text());
    var offer_amount=(offer_percent/100)*room_rate;
        $('#offer_amount').val(offer_amount);

    var current_total=$('#grand_total').val();

    var room_rate_type=$(el).attr('id');

    var added_packages=0;
    $('.added-packages').each(function(){
        added_packages+=Number($(this).data('pkgamt'));
    });

    var bed_rate=Number($('#bed_rate').val());
    var no_of_extra_bed=0;
    $('.extra_bed').each(function(){
        no_of_extra_bed+=Number($(this).val());
    });

    var discount = Number($('#discount').text());

    var discount_amount =(discount/100)*price;

    if(discount != 0){
        grand_total-=discount_amount;
        grand_total+=added_packages;
        grand_total*=no_of_room;        
        grand_total+=(no_of_extra_bed*bed_rate);
        grand_total*=no_of_days;
        
        $('.sub-total').text(room_rate);
        $('.current_total').text(grand_total);
        $('#grand_total').val(grand_total);
    }else{
        // if(room_rate_type=='non-refundable'){
            grand_total-=offer_amount;
        // }
        grand_total+=added_packages;
        grand_total*=no_of_room;        
        grand_total+=(no_of_extra_bed*bed_rate);
        grand_total*=no_of_days;
        
        $('.sub-total').text(room_rate);
        $('.current_total').text(grand_total);
        $('#grand_total').val(grand_total);
    }
}

function change_services(el) {
    var id=$(el).attr('data-id');
    var img = 'service_img_' + id;
    var desc = 'description_' + id;
    var head = 'service_list_' + id;
    $('.img-services').css('display', 'none');
    $("#" + img).css('display', 'block');

    $('.desc-services').css('display', 'none');
    $('#' + desc).css('display', 'block');

    $('.service-lists').css('display', 'block');
    $('#' + head).css('display', 'none');
    var title=$(el).attr('data-title');
    var base_url=$(el).attr('data-base-url');
    $.ajax({
        url:$(el).attr('data-url'),        
        type:'POST',        
        dataType:'json',
        data:{'id':id,'content':$(el).attr('data-content')},
        success:function(data){
            if(data.length > 0){
                html='<div id="attachment_'+id+'">';
                html+='<h2 class="header-passenger-info">Downloads</h2>';
                html+='<ol>';
                for(i=0;i<data.length;i++){
                    html+='<li><a href="'+base_url+'uploads/services/'+data[i].attachment+'" target="_blank">'+title+'_'+i+'</a></li>';
                }
                html+='</ol>';
                html+='<div>';

                $('#attachment_'+id).replaceWith(html);

                // console.log(data[0].attachment);
            }
        }

    });

}

function change_css(id) {
    var ele = 'service_list_' + id;
    $('#' + ele).css({'z-index': '1', '-webkit-filter': 'grayscale(0)', 'filter': 'grayscale(0)', 'opacity': '1'});
    $(this).unbind(event);
}

function restore_css(id) {
    var ele = 'service_list_' + id;
    $('#' + ele).css({'z-index': '-1', '-webkit-filter': 'grayscale(1)', 'filter': 'grayscale(1)', 'opacity': '0.5'});
    $(this).unbind(event);
}
