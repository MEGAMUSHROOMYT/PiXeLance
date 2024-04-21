Cookie = {
  isSupported: function() {
    return !!navigator.cookieEnabled;
  },
  exists: function(name) {
    return document.cookie.indexOf(name + "=") + 1;
  },
  write: function(name, value, expires, path, domain, secure) {
    expires instanceof Date ? expires = expires.toGMTString()
            : typeof(expires) == 'number' && (expires = (new Date(+(new Date) + expires * 1e3)).toGMTString());
    var r = [name + "=" + escape(value)], s, i;
    for (i in s = {
    expires: expires,
            path: path,
            domain: domain
    })
      s[i] && r.push(i + "=" + s[i]);
    return secure && r.push("secure"), document.cookie = r.join(";"), true;
  },
  read: function(name) {
    var c = document.cookie, s = this.exists(name), e;
    return s ? unescape(c.substring(s += name.length, (c.indexOf(";", s) + 1 || c.length + 1) - 1)) : "";
  },
  remove: function(name, path, domain) {
    return this.exists(name) && this.write(name, "", new Date(0), path, domain);
  }
};
var TNK_visit = 1;
var TNKD = new Date();
var TNK_exp = 60 * 60 * 24 * 365;
var TNK_visit_date = TNKD.getFullYear() + '-' + ('0' + TNKD.getMonth()).slice(-2) + '-' + ('0' + TNKD.getDate()).slice(-2);
if (Cookie.exists('TNK_visit') && Cookie.exists('TNK_visit_date')) {
  if (TNK_visit_date != Cookie.read('TNK_visit_date')) {
    TNK_visit += Cookie.read('TNK_visit');
  }
}
Cookie.write('TNK_visit', TNK_visit, TNK_exp, '/', '.tankionline.com');
Cookie.write('TNK_visit_date', TNK_visit_date, TNK_exp, '/', '.tankionline.com');

var bMSIE = jQuery.browser.msie;
var bMVER = jQuery.browser.version.split('.')[0] * 1;
var bDAMN = (bMSIE && bMVER < 8);

var tnk_btl_bth = {};
var tnk_btl_over = {};
var tnk_btl_obj = {};
var tnk_btl_cnt = {};
function tnkCenterOverlay() {
  tnk_btl_cnt.css("position", "absolute");
  tnk_btl_cnt.css("top", (($(window).height() - tnk_btl_cnt.height()) / 2) + "px");
  tnk_btl_cnt.css("left", (($(window).width() - tnk_btl_cnt.width()) / 2) + "px");
}
function tnkBattleInit() {
  jQuery(window).resize(function() {
    tnkCenterOverlay();
  });
  tnk_btl_bth = jQuery('#tnk_battle');
  tnk_btl_over = jQuery('#tnk_overlay');
  tnk_btl_cnt = jQuery('#tnk_btl_cnt');
  if (bMSIE && bMVER < 9) {
    tnk_btl_over.addClass('old_ie');
    tnk_btl_obj = window["tnk_animation"];
  } else {
    tnk_btl_obj = document["tnk_animation"];
  }
  tnk_btl_bth.click(function() {
    if (tnk_btl_bth.hasClass('active')) {
      tnk_btl_bth.removeClass('active');
      tnkHideAnimation();
    } else {
      tnk_btl_bth.addClass('active');
      tnkShowAnimation();
    }
  });
}
function tnkPlayAnimation() {
  tnk_btl_obj.tnk_start_anim();
}
function tnkStartAnimation() {
  _gaq.push(['_trackEvent', 'Animation', 'Start', 'Playback begins']);
}
function tnkStopAnimation() {
  _gaq.push(['_trackEvent', 'Animation', 'Stop', 'Playback ends']);
}
function tnkShowAnimation() {
  tnkCenterOverlay();
  tnk_btl_over.fadeIn(300, function() {
    tnkPlayAnimation();
    _gaq.push(['_trackEvent', 'Animation', 'Show', 'Show animation layer']);
  });
}
function tnkHideAnimation() {
  tnk_btl_over.fadeOut(300, function() {
    tnk_btl_bth.removeClass('active');
    _gaq.push(['_trackEvent', 'Animation', 'Hide', 'Hide animation layer']);
  });
}

function getLastNews(count) {
  var yqlURL = "//query.yahooapis.com/v1/public/yql?q=select%20title%2C%20origLink%2C%20pubDate%20from%20rss%20where%20url%3D%22http%3A%2F%2Ffeeds.feedburner.com%2Ftankionline%2Fmain%22%20LIMIT%20" + count + "&format=json&callback=";
  jQuery('.ton').after('<div id="newsbox" style="display:none"></div>');
  jQuery.getJSON(yqlURL, function(msg) {
    if (msg.query.count) {
      var $nb = jQuery('#newsbox');
      jQuery.each(msg.query.results.item, function() {
        var i = jQuery('<div class="item newsfeed">');
        var D = new Date(this.pubDate);
        i.append(
                '<table><tbody><tr><td>' +
                '<div class="news-date"><em class="date">' +
                ('0' + D.getDate()).slice(-2) + '.' + ('0' + (D.getMonth() + 1)).slice(-2) + '.' + D.getFullYear() +
                '</em></div>' +
                '<div class="news-title noimg">' +
                '<a href="' + this.origLink +
                '" target="_blank">' + this.title +
                '</a></div>' +
                '</td></tr></tbody></table>'
                );
        $nb.append(i);
      });
      jQuery('#news-load').hide(1);
      $nb.append('<a href="//news.tankionline.com/" class="readall" target="_blank">Читать все записи</a>').slideDown(300);
    }
  });
  jQuery('#news-load').hide(1);
}

jQuery(document).ready(function() {

  if (window.navigator.appVersion.match(/Chrome/)) {
    jQuery('object').each(function() {
      jQuery(this).css('display', 'block');
    });
  }

  getLastNews(5);

  tnkBattleInit();

  jQuery('.iconlink').hover(function() {
    jQuery(this).parent().addClass('hover');
  },
          function() {
            jQuery(this).parent().removeClass('hover');
          });

  var cbs = jQuery('#cBannerHolder DIV');
  if (cbs.length) {
    jQuery(cbs[0]).addClass('active');
    if (cbs.length > 1) {
      setInterval("slideSwitch()", 5000);
    }
  }/*
   placeFooter();
   jQuery('body').resize(function(){
   placeFooter();
   });*/
});
function stripslashes(str) {  // Un-quote string quoted with addslashes()
  return str.replace('/\0/g', '0').replace('/\(.)/g', '$1');
}
// возвращает cookie если есть или undefined
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
          ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// уcтанавливает cookie
function setCookie(name, value, props) {
  props = props || {};
  var exp = props.expires;
  if (typeof exp == "number" && exp) {
    var d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }

  value = encodeURIComponent(value);
  var updatedCookie = name + "=" + value;
  for (var propName in props) {
    updatedCookie += "; " + propName;
    var propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

// удаляет cookie
function deleteCookie(name) {
  setCookie(name, null, {
    expires: -1
  });
}
function str_replace(search, replace, subject) {
  if (!(replace instanceof Array)) {
    replace = [replace];
    if (search instanceof Array) {
      while (search.length > replace.length) {
        replace[replace.length] = replace[0];
      }
    }
  }

  if (!(search instanceof Array))
    search = new Array(search);
  while (search.length > replace.length) {
    replace[replace.length] = '';
  }
  if (subject instanceof Array) {
    for (k in subject) {
      subject[k] = str_replace(search, replace, subject[k]);
    }
    return subject;
  }
  for (var k = 0; k < search.length; k++) {
    var i = subject.indexOf(search[k]);
    while (i > -1) {
      subject = subject.replace(search[k], replace[k]);
      i = subject.indexOf(search[k], i);
    }
  }

  return subject;

}
var tnk_wp_polls_links = {};
function tnk_polls_process() {
  if (tnk_wp_polls) {
    var $place = jQuery('#tnk_polls_head');
    for (var i in tnk_wp_polls) {
      var q = tnk_wp_polls[i];
      tnk_wp_polls_links[q.id] = q;
      q.voted = getCookie(q.cname) == undefined ? 0 : 1;
      if (q.voted || q.active == 0) {
        $place.before(q.result);
        jQuery('#polls-' + q.id + '-ans').children('p.voteInPoll').html('');
      } else {
        $place.before(q.vote);
      }
    }
  }
}

function slideSwitch() {
  var $active = jQuery('#cBannerHolder DIV.active');
  if ($active.length == 0) {
    $active = jQuery('#cBannerHolder DIV:last');
  }
  var $next = $active.next().length ? $active.next() : jQuery('#cBannerHolder DIV:first');

  // var $sibs  = $active.siblings();
  // var rndNum = Math.floor(Math.random() * $sibs.length );
  // var $next  = jQuery($sibs[rndNum]);

  $active.addClass('last-active');
  $next.css({
    opacity: 0.0
  }).addClass('active').animate({
    opacity: 1.0
  }, 1000, function() {
    $active.removeClass('active last-active').css({
      opacity: 0.0
    });
  });
}
function polls_slide() {
  /*
   jQuery('.pollQuestion').unbind('click').click(function(){
   var wasActive = jQuery(this).hasClass('active');
   jQuery('.pollQuestion').removeClass('active').parent().children('.wp-polls-ans').hide();
   if (!wasActive) {
   jQuery(this).addClass('active').parent().children('.wp-polls-ans').show();
   }
   });
   */
  jQuery('.pollQuestion').unbind('click').click(function() {
    var currentObj = jQuery(this);
    var slideSpeed = 150;
    var wasActive = currentObj.hasClass('active');
    jQuery('.pollQuestion').each(function() {
      var iterationObj = jQuery(this);
      if (currentObj.parent().attr('id') == iterationObj.parent().attr('id')) {
        if (wasActive) {
          iterationObj.removeClass('active').parent().children('.wp-polls-ans').slideUp(slideSpeed);
        } else {
          iterationObj.addClass('active').parent().children('.wp-polls-ans').slideDown(slideSpeed);
          reform_ans('#' + iterationObj.parent().attr('id') + '-ans > ul > li > div.pollbar');
        }
      } else {
        iterationObj.removeClass('active').parent().children('.wp-polls-ans').slideUp(slideSpeed);
      }
    });
  });
}
jQuery.fn.extend({
  disableSelection: function() {
    this.each(function() {
      this.onselectstart = function() {
        return false;
      };
      this.unselectable = "on";
      jQuery(this).css('-moz-user-select', 'none');
    });
  },
  enableSelection: function() {
    this.each(function() {
      this.onselectstart = function() {
      };
      this.unselectable = "off";
      jQuery(this).css('-moz-user-select', 'auto');
    });
  }
});
function reform_ans(sel) {
  var selector = (sel == undefined) ? 'div.wp-polls-ans > ul > li > div.pollbar' : sel;
  var ans = jQuery(selector);
  var maxW = 0;
  var maxC = {};
  var maxP = 0;
  var plls = {};
  for (var i = 0; i < ans.length; i++) {
    var c = jQuery(ans[i]);
    var perc = c.attr('rel') * 1;
    if (isNaN(perc)) { // ie
      perc = c.attr('style').replace('width: ', '').replace('%;', '') * 1;
      if (isNaN(perc)) { // IE
        perc = c.attr('style').replace('width: ', '').replace('%', '').replace('behavior: none; ', '') * 1;
      }
    }
    plls[i] = {};
    plls[i].object = ans[i];
    plls[i].percentage = perc;
    if (c.width() >= maxW) {
      maxW = c.width();
      maxC = c;
      maxP = plls[i].percentage;
    }
  }
  if (maxP == 0) {
    maxP = 100;
  }
  if (maxW > 0) {
    var newW = maxC.parent('LI').width() - maxC.parent('LI').children('DIV.paPV').width() - 10;
    var coef = 100 / maxP;
    maxC.width(newW);
    for (var j = 0; j < i; j++) {
      var o = jQuery(plls[j].object);
      var w = Math.round((newW * plls[j].percentage * coef) / 100);
      if (w > 0 && w < 5) {
        w = 5;
      }
      if (w % 5) {
        if (w % 5 > 2) {
          o.width(Math.ceil(w / 5) * 5);
        } else {
          o.width(Math.floor(w / 5) * 5);
        }
      } else {
        o.width(w);
      }
      if (w == 0) {
        o.hide();
      } else {
        o.show();
      }
    }
  }
}
function SSSliderUnbind() {
  jQuery('#prev').unbind('click');
  jQuery('#next').unbind('click');
}
function SSSliderBind() {
  jQuery('#prev').unbind('click').click(function() {
    SSSlider('prev');
  });
  jQuery('#next').unbind('click').click(function() {
    SSSlider('next');
  });
}
var weMove = 'dummy';
function SSSlider(mode) {
  SSSliderUnbind();
  var $screens = jQuery('#screens');
  var $nextBtn = jQuery('#next');
  var $prevBtn = jQuery('#prev');
  var sMax = sTotal - sOnPage;
  var sMin = 0;
  var aMode = '';
  var tStep = sStepPX;
  var sAnimate = {};
  var sPosition = 'dummy';
  var nextWill = 'dummy';
  $nextBtn.show();
  $prevBtn.show();
  /* it can be easier, but i'm too tired and this code works */
  switch (mode) {
    case 'prev':
      if (sCurrent > sMin) {
        sCurrent--;
      }
      if (sCurrent <= sMin) {
        sPosition = 'first';
        $screens.css('marginRight', '5px').css('marginLeft', '0px');
        $prevBtn.hide();
      }
      if (sCurrent - 1 <= sMin) {
        nextWill = 'first';
      }
      aMode = '+';
      break;
    case 'next':
      if (sCurrent < sMax) {
        sCurrent++;
      }
      if (sCurrent >= sMax) {
        sPosition = 'last';
        $screens.css('marginRight', '0px').css('marginLeft', '5px');
        $nextBtn.hide();
      }
      if (sCurrent + 1 >= sMax) {
        nextWill = 'last';
      }
      aMode = '-';
      break;
  }
  var currentOffset = jQuery('#screens').css('left').replace('px', '') * 1;
  var futureOffset = eval(currentOffset + aMode + tStep);
  /* hardcode fixing goddamn next/prev preview slides*/
  if ('dummy' == sPosition) {
    if ('prev' == mode && 'left' != weMove) {
      if ('dummy' != weMove) {
        tStep += 30;
      }
      weMove = 'left';
    }
    if ('next' == mode && 'right' != weMove) {
      if ('dummy' != weMove) {
        tStep += 30;
      }
      weMove = 'right';
    }
  } else {
    weMove = 'dummy';
  }
  /* god plz kill me, hardcode fix for fockin five-px offset */
  if ('right' == weMove) {
    $screens.css('marginRight', '5px').css('marginLeft', '0px');
  }
  if ('left' == weMove) {
    $screens.css('marginRight', '0px').css('marginLeft', '5px');
  }
  if ('first' == sPosition && 0 == (futureOffset % 30)) {
    tStep -= Math.abs(futureOffset);
  }
  if ('last' == sPosition && 0 == ((Math.abs(futureOffset) % tStep) % 30)) {
    tStep -= 30;
  }
  sAnimate = {
    left: aMode + '=' + tStep
  };

  $screens.animate(sAnimate, sSpeed, function() {
    SSSliderBind();
  });
  return false;
}

function placeFooter() {
  var mh = jQuery('#content').css('minHeight').replace('px', '') * 1;
  var b = jQuery('body').height();
  var f = (jQuery('#footer')[0].offsetTop + jQuery('#footer')[0].offsetHeight);
  alert(f + ' - ' + b);
  if (f < b) {
    var off = b - f;
    jQuery('#content').css('minHeight', (off + mh + 30) + 'px');
  }
}