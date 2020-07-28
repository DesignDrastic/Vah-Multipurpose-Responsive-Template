/*
* Template Name: Vah - Multipurpose HTML5 Responsive Template
  Version: 1.0.0
  Author: Techmate Softtech LLP
*/

// Pre loader js
$(window).on('load', function(){
  setTimeout(function(){
    $('.pre-loader').fadeOut();
    $('.vah-theme').fadeIn('slow');
    // For call Vah animated class
    $(window).scroll();
  }, 250);
});

// Global variables
// Animate numbers(flag)
var numberAnimated = false;
var rangeAnimated = false;
// For sticky elements(flag)
var is_not_sticky = true;

// Vah carousel slider
$.fn.vahSlider = function(conf) {
  var slider = this;
  slider.moveLock = false;
  // consider blank conf
  slider.conf = $.extend({
    'in': '',
    'out': ''
  }, conf);
  // Rotation function
  var rotateSlide = function(direction) {
    var set = {
      'next': {
        'ref': "last",
        'target': "first",
        'newSlide': function(ele) {
          return $(ele).next();
        }
      },
      'prev': {
        'ref': "first",
        'target': "last",
        'newSlide': function(ele) {
          return $(ele).prev();
        }
      }
    };
    if(slider.moveLock) return;
    var currentActive = $(".vah-slider-slide.active");
    if($(currentActive).length == 0) {
      $(".vah-slider-slide:first").addClass('active');
    } else {
      var refSlide = $(".vah-slider-slide:" + set[direction]['ref']);
      var newSlide = null;
      if(currentActive[0] == refSlide[0]) {
        newSlide = $(".vah-slider-slide:" + set[direction]['target']);
      } else {
        newSlide = set[direction]['newSlide'](currentActive);
      }
      var maxCount = 2
      var count = 0;
      var callback = function(enableFun) {
        count++;
        if (maxCount == count) enableFun();
      }
      slider.moveLock = true;
      $(newSlide).addClass('active').addClass(slider.conf.in).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $(newSlide).removeClass(slider.conf.in);
        callback(function() { slider.moveLock = false });
      });
      $(currentActive).addClass(slider.conf.out).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $(currentActive).removeClass('active').removeClass(slider.conf.out);
        callback(function() { slider.moveLock = false });
      });
    }
  }

  var slideNext = function() { rotateSlide('next'); };
  var slidePrev = function() { rotateSlide('prev'); };
  // Attach next and previous events
  $(".vah-slider-next-btn", ".vah-slider-actions").on('click', slideNext);      
  $(".vah-slider-prev-btn", ".vah-slider-actions").on('click', slidePrev);      
  // Initialize with image as background
  $(".vah-slider-slide").each(function(i, slide) {
    $(slide).css('background-image', "url(" + $(slide).data('vah-slider-image') + ")");
  });
  slideNext();
};

// DOM Ready
$(document).ready(function(){
  $('body').fadeIn();
  // Smooth scrolling to id
  $('a[class="vah-smooth-link"]').on('click',function (e) {
    var target = this.hash;
    var $target = $(target);
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top
    }, 900, function () {
        // window.location.hash = target;
    });
  });

  // Smooth scroll to about section 
  $('.header-arrow-mouse a').click(function(e){
    if( $('#navbar').hasClass('vah-navbar-stick') ) {
      $('html, body').stop().animate({
        'scrollTop': $('#about').offset().top - Number($('.vah-navbar').height())
      }, 900, function () {
      });
    }
  });
  /* Alertbox scripts */
  //  Close alert-box
  $('[data-alert-close] .alert-close').click(function(){
    $(this).parent().slideUp();
  });
  /* Pre header scripts */
  // Pre-header forms (Signup | Login) toggle
  $('[data-target]').click(function() {
    $('.pre-header .pre-header-btn').removeClass('btn-active');
    $(this).addClass('btn-active');
    var existing_active = $('.pre-header-form.active', '.pre-header-form-container');
    var action_btn_id = $(this).data('target');
    if($(action_btn_id).attr('id') != $(existing_active).attr('id')) {
      $(existing_active).removeClass('active').slideToggle();
      $(action_btn_id).addClass('active').slideToggle();
    } else {
      $(this).removeClass('btn-active');
      $(existing_active).removeClass('active').slideUp();
    }
  });
  // Closing
  $('.pre-header-close-btn i').click(function() {
    $('.pre-header-btn').removeClass('btn-active');
    var existing_active = $('.pre-header-form.active', '.pre-header-form-container');
    $(existing_active).removeClass('active').slideUp();
  });

  // Adjust slider / carousel(height/width)
  adjustCarousel();

  /* Menu scripts
  */
  // Menu toggle
  $('#menu-toggle-btn').click(function() {
    $('#menu').slideToggle();
  });
  $('.scroll-to-top').click(function(event) {
    event.preventDefault();
    $('html, body').stop().animate({
      'scrollTop': 0
    }, 900, function () {
        // window.location.hash = target;
    });
  });

  // Submenu toggle script for mobile
  $(".vah-navbar .main-menu .menu-items li").click(function(event) {
    // Prevent for dropdown menu click
    $(".vah-navbar .submenu .menu-dropdown a").click(function() {
      return false;
    });

    // Toggle menu for small screen
    if( $(window).width() < 768) {
      var submenu = $("ul.submenu", this);
      if($(submenu).hasClass('active')) {
        $(submenu).removeClass('active').hide();
      } else {
        $(".vah-navbar .main-menu .menu-items li ul.submenu.active").removeClass('active').hide();
        $(submenu).addClass('active').show();
      }
    }
  });

  // Dropdown menu toggle
  var is_dropdown_open = false;
  if( $(window).width() <= 768 ) {
    $(".vah-navbar .submenu .menu-dropdown a").click(function(event){
      event.preventDefault();
      if( !is_dropdown_open ) {
        $('.menu-dropdown .menu-dropdown-list').slideDown();
        is_dropdown_open = true;
      } else {
        $('.menu-dropdown .menu-dropdown-list').slideToggle();
      }
    });
    // Redirect to page for small device
    $('.vah-navbar .submenu .menu-dropdown .menu-dropdown-list li a').click(function(e){
      window.location.href = $(this).attr('href');
    });

  }



  // Accordian
  // Collapse single row(Accordian type 1)
  $('[data-accordian-collapse=single] [data-accordian]').on('click', function(e){
    var existing_active = $('.vah-accordian-row.accordian-active.accordian-active-single', '.vah-accordian');
    var action_btn_id = $(this).attr('data-accordian');
    if(action_btn_id != $(existing_active).attr('id')) {
      $('#'+action_btn_id).slideDown();
      $('#'+action_btn_id).parent().addClass('accordian-active accordian-active-single');
      $(existing_active).find('.vah-accordian-content').slideToggle();
      $(existing_active).removeClass('accordian-active accordian-active-single');
    } else {
      $(existing_active).slideUp();
      $(existing_active).parent().removeClass('accordian-active accordian-active-single');
    }
  });

  if ( $('[data-accordian]').parent().hasClass('accordian-active-default') ) {
    $('.accordian-active-default .vah-accordian-title').trigger('click');
  }

  // Collapse all(Accordian type 2)
  $('[data-accordian-collapse=all] [data-accordian]').on('click', function(e){
    var accordian_row = $(this).attr('data-accordian');
    $('#'+accordian_row).slideToggle();
    $('#'+accordian_row).parent().toggleClass('accordian-active');
  });

  // Tabs
  $('[data-tab]').on('click', function(){
    $('.vah-tabs .vah-tab-list li').removeClass('tab-active');
    $(this).toggleClass('tab-active');
    var tab_id = $(this).attr('data-tab');
    var existing_active = $('.vah-tab-content.tab-active', '.vah-tab-body');
    if(tab_id != $(existing_active).attr('id')) {
      $(existing_active).removeClass('tab-active').slideToggle('fast');
      $('#'+tab_id).addClass('tab-active').slideToggle('fast');
    } else {
      $(existing_active).removeClass('tab-active').slideUp('fast');
    }
    $('.vah-tab-body .vah-tab-content.tab-content-active').slideUp('fast').promise().done(function(){
      $(this).removeClass('tab-content-active');
    });
  });

  // Portfolio
  // Clicked the tags.
  $('[data-id]').click(function(){
    var tag = $(this).attr('data-id');
    window.location.href = '#'+tag;
    // activeTagList(tag);
    $('.portfolio-tag-list li').each(function(){
      $(this).removeClass('active');
    });
    // Count is used to display label if there is no portfolio items
    var count = 0;
    $(this).addClass('active');
    $('#list-portfolio .card').each(function(key, val){
      $('#no-items').hide();
      $(this).hide().removeClass('animated animPort active');
      if( tag == '*' ) {
        $(this).show().addClass('animated animPort active');
      } else {
        var arr = $(this).attr('data-tags').split(",").map(function(s) { return s.trim(); });
        if(arr.indexOf(tag) != -1) {
          count++;
          $(this).show().addClass("animated animPort active");
        } else {
          if($(this).hasClass("active")) $(this).removeClass("animated animPort active");
        }
        if( count == 0 ) {
          $('#no-items').addClass('animated animPort').show();
        }
      }
    });
  });

  $('.portfolio-close-container').click(function() {
    $('.portfolio-img-container').fadeOut();
  });

  $('[data-portfolio-src]').click(function(e) {
    $('.portfolio-img-container img').remove();
    $('.portfolio-img-container').fadeIn().append("<img class='vah-relative-center' src='"+$(this).attr('data-portfolio-src')+"'>");
  });
});

// Scroll events
$(window).scroll(function(e){

  // Vah animated on scroll
  var window_scroll_top = $(this).scrollTop();
  $.each($('.vah-animated'), function(i, val){
    if( window_scroll_top >= Number( $(this).offset().top - $(window).height() / 1.2 ) ) {
      var object = { 'visibility': 'visible' };
      var object_duration = ( $(this).attr("data-animated-duration") ? {
        'animation-duration': $(this).attr('data-animated-duration') + 's',
        '-webkit-animation-duration': $(this).attr('data-animated-duration') + 's'
      }: {});
      var object_delay = ( $(this).attr("data-animated-delay") ? {
        'animation-delay': $(this).attr('data-animated-delay') + 's',
        '-webkit-animation-delay': $(this).attr('data-animated-delay') + 's'
      }: {});

      $.extend( object, object_delay, object_duration );
      $(this).css(object).addClass('animated ' + $(this).attr('data-animated-class'));
    }
  });

  // Toggle got to top button
  if ($(this).scrollTop() > 150) {
    $('.scroll-to-top').fadeIn();
  } else {
    $('.scroll-to-top').fadeOut();
  }
  // Menu transparent class toggle
  if( $('#navbar').hasClass('navbar-transparent') ) {
    var nav_id = $("#navbar");
    var pos = nav_id.position();
    $(window).scroll(function() {
      var windowpos = $(window).scrollTop();
      if (windowpos > pos.top ) {
        nav_id.removeClass("navbar-transparent");
      } else {
        nav_id.addClass("navbar-transparent");
      }
    });
  }

  // e.preventDefault();
  if( $('#numbers').hasClass('vah-numbers-animate') ) {
    var numberTop = $("#numbers").offset().top - Number( $(window).height() / 1.2);
    // console.log($("#numbers").scrollTop());
    if ($(this).scrollTop() > numberTop && !numberAnimated) {
      numberAnimated = true;
      $('.animate-counter').each(function () {
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        }, {
            duration: 2000,
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
      });
    }
  }

  // Range Slider
  if( $('.vah-progress').hasClass('vah-progress-active') ) {
    var scroll_top = $(".vah-progress").offset().top - Number( $(window).height() / 1.2);
    if ($(this).scrollTop() > scroll_top && !rangeAnimated) {
      rangeAnimated = true;
      $.each($('.vah-progress-bars'), function(i, ele){
        var skil_percent = $(this).attr('data-range-value') + '%';
        var delay = $(this).attr('data-range-delay');
        // $(this).css('width', $(this).attr('data-range')+'%');
        $(this).text(skil_percent);
        $(this).delay(delay).animate({
          width: skil_percent,
        }, 500, function(){
        });
      });
    }
  }

  // Service page stick sidebar
  if( $('body').find($('.vah-service-tabs')).length != 0 ) {
    var service_bar_nav_id = $("#service-tab");
    // Padding in each section of service content
    var pos = service_bar_nav_id.position();
    var is_sidebar_fixed = false;
    var windowpos = $(window).scrollTop();
    if (windowpos >= $('#service1').offset().top) {
      service_bar_nav_id.addClass("servicebar-stick");
      $('#service-tab a').each(function () {
        $(this).attr('data-tooltip-placement', 'right');
      });
      $('#service-tab').addClass('service-box-shadow');
      $('#service-content').css('margin-top', '50px');
      // Apply margin when navbar is fixed / sticky
      if( $('#navbar').hasClass('vah-navbar-stick') ) {
        $('#service-tab').css('margin-top', $('#navbar').height());
      }
    } else {
      service_bar_nav_id.removeClass("servicebar-stick");
      $('#service-tab').removeClass('service-box-shadow');
      $('#service-content').css('margin-top', 'inherit');
      $('#service-tab a').each(function () {
        $(this).attr('data-tooltip-placement', 'bottom');
      });
      // Remove service tab margin
      if( $('#navbar').hasClass('vah-navbar-stick') ) {
        $('#service-tab').css('margin-top', '0');
      }
    }

    // On scroll fixed service page sidebar
    var service_bar_nav_id = $("#service-tab");
    var scrollPos = $(document).scrollTop() + service_bar_nav_id.height();
    $('#service-tab a').each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
        $('#service-tab a').removeClass("active");
        currLink.addClass("active");
      }
      else{
        currLink.removeClass("active");
      }
    });
  }

  // Stick navbar class toggle
  if( $('#navbar').hasClass('vah-navbar-stick') ) {
    var nav_id = $("#navbar");
    var pos = nav_id.position();
    $(window).scroll(function() {
      var windowpos = $(window).scrollTop();
      if( $('#navbar').hasClass('vah-navbar-fixed') ) {
        var menu_animated_class = "";
        var navbar_height = 0;
      } else {
        var menu_animated_class = "animated slideInDown";
        navbar_height = Number($('#navbar').height() + 20);
      }
      if ( windowpos  >  Number( pos.top ) + navbar_height ) {
        if( is_not_sticky ) {
          nav_id.addClass("stick "+ menu_animated_class);
          // $('.pre-header').slideUp();
          is_not_sticky = false;
        }
      } else {
        nav_id.removeClass("stick "+ menu_animated_class);
        // $('.pre-header').slideDown();
        is_not_sticky = true;
      }
    });
  }
});

// Resize events
$(window).resize(function(e){
  adjustCarousel();
  if( $(window).width() > 768 ) {
    $('.vah-navbar .main-menu').slideDown();
  }
});

// Adjust slider / carousel(width/height)
function adjustCarousel() {  
  if( $(window).width() < 1024 && $(window).height() < 600 ) {
    $('.vah-slider-slides .vah-slider-slide').css('background-size', '100% auto');
  }

  if( $(window).height() > $(window).width() ) {
    $('.vah-slider-slides .vah-slider-slide').css('background-size', 'auto 100%');
  }
}

// Smooth scroll(Page scroll plugin)

/*
 * LucidScroll
 * 
 * Created by Shikkediel (c) 2013-2015 http://ataredo.com
 * 
 * Version: 2.5.5 Alpha
 *
 * Requires:
 * jQuery 1.8.0+
 * mousewheel.js
 * easing.js
 *
 */

// (function($) {$.fn.impulse = function(options) {
//   var gate = $(window),
//   set = $.extend(true, {
//   target: $(),
//   delay: false
//   }, $.fn.impulse.default, options),

//   selector = this, object = set.target, gist, area = {}, edge = [],
//   annul, entity, brink = [], outset = [], halt = [], flow, turned = 0,
//   interrupt, kinetic, morph = [], hit, way, speed, destination = [],
//   momentum, initial, bound;

//   if (window.requestAnimationFrame) var neoteric = true;
//   elementAnalysis();
//   detectOverflow();

//   selector.each(function(index) {

//     $(this).mousewheel(function(ambit, delta) {

//       if (annul) return false;
//       else if (set.delay == true) annul = true;

//       hit = index;

//       if (gist && selector.length > 1) {
//       entity = $(this);
//       brink[0] = edge[hit];
//       }
//       else {
//       entity = object;
//       brink = edge;
//       }

//       entity.each(function(cue) {
//       var genesis = outset[cue] = $(this).scrollTop();
//       if (delta == 1 && genesis == 0 || delta == -1 && genesis == brink[cue]) halt[cue] = true;
//       else halt[cue] = false;
//       });

//       if (ceaseOperation()) {
//       annul = false;
//       if (set.propagate == true) return;
//       else return false;
//       }

//       if (flow != delta) turned = 1;
//       else turned = Math.min(set.constrain, turned+1);

//       if (set.fluid && turned == 1) morph[hit] = 'curve';
//       else if (turned) morph[hit] = set.effect;

//       interrupt = false;
//       kinetic = delta;
//       way = -delta*set.range*Math.pow(set.leap, turned-1);
//       speed = set.tempo*Math.pow(set.sloth, turned-1);

//       entity.each(function(order) {
//       destination[order] = outset[order]+way;
//       });

//       if (neoteric) {
//       if (momentum) cancelAnimationFrame(momentum);
//       initial = Date.now();
//       momentum = requestAnimationFrame(streamCore);
//       }
//       else inciteSource();

//       return false;
//     });
//   });

//   gate.resize(function() {
//   clearTimeout(bound);
//   bound = setTimeout(detectOverflow, 100);
//   });

//   return this;

//   function streamCore() {
//   flow = kinetic;
//   var present = Date.now(),
//   elapsed = Math.min(present-initial, speed),
//   advance = elapsed/speed,
//   increase = $.easing[morph[hit]](advance, elapsed, 0, 1, speed);
//   entity.each(function(key) {
//   if (!halt[key]) {
//   var goal = outset[key]+increase*way;
//   $(this).scrollTop(goal);
//   checkLimits($(this), key, advance);
//   }
//   });
//   if (advance < 1 && !interrupt) momentum = requestAnimationFrame(streamCore);
//   else annul = false;
//   }

//   function inciteSource() {
//   flow = kinetic;
//   entity.each(function(beat) {
//   if (!halt[beat]) {
//   $(this).stop().animate({scrollTop: destination[beat]}, {
//   duration: speed,
//   easing: morph[hit],
//   progress: function(current, sequence) {checkLimits($(this), beat, sequence)},
//   complete: function() {annul = false}
//   });
//   }
//   });
//   }

//   function checkLimits(essence, rank, factor) {
//   if (100*factor >= set.reset) turned = 0;
//   if (onFringe(essence, rank)) {
//   halt[rank] = true;
//   if (!neoteric) essence.stop(true, true);
//   if (ceaseOperation()) {
//   interrupt = true;
//   turned = 0;
//   }
//   }
//   }

//   function onFringe(matter, cipher) {
//   var put = matter.scrollTop(),
//   above = put == 0 && destination[cipher] < 0,
//   below = put == brink[cipher] && destination[cipher] > brink[cipher];
//   return above || below;
//   }

//   function ceaseOperation() {
//   return halt.every(function(flag) {return flag});
//   }

//   function elementAnalysis() {
//   var item = $(), main;
//   if (!object.length) {
//   gist = true;
//   object = selector;
//   }
//   object.each(function() {
//   if (topLevel(this)) {
//   if (!main) {
//   if (neoteric) item = item.add(gate);
//   else item = item.add(baseTag());
//   main = true;
//   }
//   }
//   else item = item.add($(this));
//   });
//   set.target = object = item;
//   object.each(function(zest) {
//   if (topLevel(this)) area[zest] = 'hub';
//   else area[zest] = 'sub';
//   });
//   if (gist && selector.length != object.length) selector = object;
//   }

//   function topLevel(sample) {
//   var peak = [window,document,'HTML','BODY'];
//   return peak.indexOf(sample) > -1 || peak.indexOf(sample.tagName) > -1
//   }

//   function baseTag() {
//   var origin = gate.scrollTop();
//   gate.scrollTop(1);
//   if ($('html').scrollTop()) var root = $('html');
//   else if ($('body').scrollTop()) root = $('body');
//   else root = $('html, body');
//   if (origin) gate.scrollTop(origin);
//   else gate.scrollTop(0);
//   return root;
//   }

//   function detectOverflow() {
//   object.each(function(unit) {
//   if (area[unit] == 'hub') edge[unit] = $(document).height()-gate.height();
//   else edge[unit] = this.scrollHeight-$(this).height();
//   });
//   }
// };

// $.fn.impulse.default = {
//   range: 135,
//   leap: 1.35,
//   tempo: 500,
//   sloth: 1.1,
//   constrain: 5,
//   reset: 85,
//   effect: 'easeOutSine',
//   fluid: false,
//   propagate: true
// };
// }(jQuery));
// // Initiate smooth scroll
// $(window).on('load', function(){
//   $(this).impulse();
// });

// // For: call vah animated on load 
// $("html,body").animate({ scrollTop: "1" }, 500);