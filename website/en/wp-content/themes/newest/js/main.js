
tanki = {};
containerWidth = null;
windowWidth = null;
newsCount = 3;
playersReady = false;
globalOverlay = false;
window.onload = function() {
  playersReady = true;
};
var oldIE = false;
function log(data) {
  if (window.console) {
    console.log(data);
  }
}

tanki.checkDimensions = {
  $window: null,
  $body: null,
  init: function() {
    var self = this;
    tanki.servers.getData();
    self.checkSizes();
    $(window).resize(function() {
      self.checkSizes();
    });
  },
  checkSizes: function() {
    var self = this;
    var $window = $(window);
    var $body = $('body');
    var $footer = $('.main-footer');
    var $paging = $('.wp-polls-paging-pages');
    var $visualWrapper = $('#js-visual').find('.js-wrapper');
    var $newsWrapper = $('#js-news-block').find('.js-wrapper');

    windowWidth = $window.width();
    tanki.servers._columns = 3;

    if ($visualWrapper.length) {
      tanki.visual.reset();
    }
    if ($newsWrapper.length) {
      //  tanki.news.reset();
    }
    if (oldIE) {
      if (windowWidth < 1360) {
        tanki.social.layer.hide();
      } else {
        tanki.social.layer.show();
      }
    }

    if (windowWidth >= 1170) {
      containerWidth = 1010;
      newsCount = 3;
    } else if (windowWidth >= 1000 && windowWidth < 1170) {
      containerWidth = 980;
      newsCount = 3;
    } else if (windowWidth >= 760 && windowWidth < 1000) {
      containerWidth = 740;
      newsCount = 3;
    } else if (windowWidth >= 480 && windowWidth < 760) {
      containerWidth = 460;
      newsCount = 2;
      tanki.servers._columns = 2;
    } else if (windowWidth < 480) {
      containerWidth = 300;
      newsCount = 1;
      tanki.servers._columns = 2;
    }
    if ($paging.length) {
      if ($paging.width() > containerWidth) {
        $paging.width('').css({float: 'left'});
      } else {
        $paging.width($paging.width() + 2).css({float: 'none'});
      }
    }
    tanki.servers.getData();
    if (globalOverlay.is(':visible')) {
      globalOverlay.height($.getDocHeight());
    }
  }
};
tanki.social = {
  layer: null,
  _show: true,
  init: function() {
    var self = this;
    self._lang = tankiGlobalLang || 'ru';
    self.layer = $('.main-header__social');
    switch (self._lang) {
      case "ru":
        //vk
        $.cachedScript("//vk.com/js/api/share.js?90").done(function() {
          self.layer.children('#vk_w').html(VK.Share.button({url: "//tankionline.com/", title: "Танки Онлайн", description: "Вступай в наш клан в \"Танках Онлайн\". Всех порвем! Заходи на //tankionline.com.", noparse: false}, {type: "button", text: "Мне нравится"}));
          self.layer.children('#vk_w').show();
        });

        //ok
        $.cachedScript("//connect.ok.ru/connect.js").done(function() {
          OK.CONNECT.insertShareWidget("ok_w", "//tankionline.com", "{width:170,height:20,st:'rounded',sz:20,ck:2}");
          self.layer.children('#ok_w').show();
        });

        //mm
        self.layer.children('#mm_w').html('<a target="_blank" class="mrc__plugin_uber_like_button" href="//connect.mail.ru/share?share_url=http%3A%2F%2Ftankionline.com" data-mrc-config="{\'cm\' : \'1\', \'sz\' : \'24\', \'st\' : \'2\', \'tp\' : \'mm\'}">Нравится</a>');
        $.cachedScript("//cdn.connect.mail.ru/js/loader.js").done(function() {
          self.layer.children('#mm_w').show();
        });
        break;
      case "en":

        //fb
        self.layer.children('#fb_w').html('<iframe src="//www.facebook.com/plugins/like.php?locale=en_US&amp;href=http%3A%2F%2Fwww.facebook.com%2FTankiOnline.en&amp;layout=button_count&amp;show_faces=true&amp;width=100&amp;action=like&amp;colorscheme=light&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:21px;" allowTransparency="true"></iframe>').show();

        //tw
        self.layer.children('#tw_w').html("<a href='//twitter.com/share' class='twitter-share-button' data-hashtags='tankionline' data-lang='en' data-related='tankionline_en'  data-count='horisontal' data-url='//tankionline.com' data-text=\"I play Tanki Online, a free MMO action game! Let's fight together!\">Tweet</a>");
        $.cachedScript("//platform.twitter.com/widgets.js").done(function() {
          self.layer.children('#tw_w').show();
        });

        //gp
        self.layer.children('#gp_w').html('<div class="g-plusone" data-size="medium" data-annotation="inline" data-width="120" data-href="//tankionline.com/"></div>');
        window.___gcfg = {
          lang: 'en-US'
        };
        $.cachedScript("https://apis.google.com/js/plusone.js").done(function() {
          self.layer.children('#gp_w').show();
        });
        break;
      case "de":

        //fb
        self.layer.children('#fb_w').html('<iframe src="//www.facebook.com/plugins/like.php?locale=de_DE&amp;href=http%3A%2F%2Fwww.facebook.com%2FTankiOnline.de&amp;layout=button_count&amp;show_faces=true&amp;width=100&amp;action=like&amp;colorscheme=light&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:21px;" allowTransparency="true"></iframe>').show();

        //tw
        self.layer.children('#tw_w').html("<a href='//twitter.com/share' class='twitter-share-button' data-hashtags='tankionline' data-lang='de' data-related='tankionline_de'  data-count='horisontal' data-url='//tankionline.com' data-text=\"Ich zocke &quot;Tanki Online&quot; - ein kostenloses Browserspiel! Spiel mit!\">Tweet</a>");
        $.cachedScript("//platform.twitter.com/widgets.js").done(function() {
          self.layer.children('#tw_w').show();
        });

        //gp
        self.layer.children('#gp_w').html('<div class="g-plusone" data-size="medium" data-annotation="inline" data-width="120" data-href="//tankionline.com/"></div>');
        window.___gcfg = {
          lang: 'de'
        };
        $.cachedScript("https://apis.google.com/js/plusone.js").done(function() {
          self.layer.children('#gp_w').show();
        });
        break;
      case "zh":
        break;

    }
    //self.layer.show();
  }
};
tanki.visual = {
  _slide: 1,
  _slidesQuantity: null,
  _objects: null,
  _timeout: null,
  _timeoutTime: 5000,
  init: function() {
    var self = this;
    var $visual = $('#js-visual');
    var $paginator = $visual.find('.js-paginator');
    var $wrapper = $visual.find('.js-wrapper');
    var $image = $wrapper.find('.js-image');
    self._objects = {
      visual: $visual,
      paginator: $paginator,
      wrapper: $wrapper,
      images: $image
    };
    self._slidesQuantity = $image.length;
    self.bind();
    self.timeout();
    $(window).resize(function() {
      var left = (self._slide - 1) * containerWidth;
      self._objects['wrapper'].css({left: -left});
    });
  },
  show: function(slide) {
    var self = this;
    self.unbind();
    var animationTime = 400;
    var left;
    if (slide < 1) {
      slide = self._slidesQuantity;
    }

    if (slide > self._slidesQuantity) {
      slide = 1;
    }

    left = -(slide - 1) * (containerWidth - 4);
    self._slide = slide;
    self._objects['paginator'].filter('.active').removeClass('active');
    self._objects['paginator'].filter('[data-id="' + slide + '"]').addClass('active');
    self._objects['wrapper'].animate({left: left}, animationTime, function() {
      self.bind();
      self.timeout();
    });
  },
  reset: function() {
    var self = this;
    self.unbind();
    self._slide = 1;
    self._objects['paginator'].filter('.active').removeClass('active');
    self._objects['paginator'].filter('[data-id="' + self._slide + '"]').addClass('active');
    self._objects['wrapper'].css({left: 0});
    self.bind();
    self.timeout();
  },
  timeout: function() {
    var self = this;
    self._timeout = setTimeout(function() {
      var slide = self._slide + 1;
      self.show(slide);
    }, self._timeoutTime);
  },
  bind: function() {
    var self = this;
    clearTimeout(self._timeout);
    self._objects['paginator'].bind('click', function() {
      var $this = $(this);
      if (!$this.hasClass('active')) {
        self.show($this.data('id'));
      }
    });
  },
  unbind: function() {
    var self = this;
    self._objects['paginator'].unbind('click');
  }
};
tanki.news = {
  _slide: 1,
  _blocksQuantity: null,
  _slidesQuantity: null,
  _blockWidth: null,
  _objects: null,
  init: function() {

    var self = this;
    var $newsBlock = $('#js-news-block');
    var $buttonPrev = $newsBlock.find('.js-button-prev');
    var $buttonNext = $newsBlock.find('.js-button-next');
    var $wrapper = $newsBlock.find('.js-wrapper');
    var $blocks = $wrapper.find('.js-block');
    self._objects = {
      newsBlock: $newsBlock,
      buttonPrev: $buttonPrev,
      buttonNext: $buttonNext,
      wrapper: $wrapper,
      blocks: $blocks
    };
    self._blockWidth = $blocks.width() + 4 + 10;
    self._blocksQuantity = newsData.totalCount;

    self._slidesQuantity = Math.ceil(self._blocksQuantity / newsCount);
    self.bind();
    if (self._slidesQuantity > 1) {
      self._objects['buttonNext'].removeClass('hidden');
    }
    $(window).resize(function() {
      self.reset();
      self._blockWidth = $blocks.width() + 4 + 10;
      self._blocksQuantity = newsData.totalCount;
      self._slidesQuantity = Math.ceil(self._blocksQuantity / newsCount);
      if (self._slide > self._slidesQuantity) {
        self._slide = self._slidesQuantity;
      }
      var left = ((self._slide - 1) * containerWidth);
      if (left !== 0) {
        left += 10;
      }

      self._objects['wrapper'].css({left: -left});
    });
  },
  show: function(destination) {
    var self = this;
    var animationTime = 400;
    var left = self._objects['wrapper'].position().left;
    self._blockWidth = self._objects['blocks'].width() + 4;
    if (destination === 'next') {
      self._slide += 1;
      if (self._slide * newsCount + 20 > newsData.data[newsCurrent].countTo && newsData.data[newsCurrent + 1]) {
        newsCurrent++;
        $.getJSON(newsData.data[newsCurrent].url + '?' + Math.random(), function(data) {
          for (var i in data) {
            var node = data[i];
            var item = $('<a>');
            item.attr('href', node.l).
                    attr('class', 'news-block__block js-block').
                    append('<img class="news-block__image" src="' + (node.i ? newsDefaultPath + node.i : newsDefaultImage) + '" alt="' + node.t + '"/>' +
                    '<span class="news-block__text">' +
                    '<time class="time" datetime="' + node.d.Y + '-' + node.d.m + '-' + node.d.d + '">' + node.d.d + '.' + node.d.m + '.' + node.d.Y + '</time>' +
                    '<span class="title">' + node.t + '</span>' +
                    '</span>');

            newsContainer.append(item);

          }
        });
      }
    } else if (destination === 'prev') {
      self._slide -= 1;
    }

    if (self._slide >= self._slidesQuantity) {
      self._objects['buttonNext'].addClass('hidden');
      self._slide = self._slidesQuantity;
    } else {
      self._objects['buttonNext'].removeClass('hidden');
    }

    if (self._slide <= 1) {
      self._objects['buttonPrev'].addClass('hidden');
      self._slide = 1;
    } else {
      self._objects['buttonPrev'].removeClass('hidden');
    }

    if (destination === 'next') {
      if (self._slide >= self._slidesQuantity) {
        left = -((self._blocksQuantity - newsCount) * self._blockWidth) - ((self._blocksQuantity - newsCount) * 10);
      } else {
        left -= containerWidth + 10;
      }
    } else if (destination === 'prev') {
      if (self._slide <= 1) {
        left = 0;
      } else {
        left += containerWidth + 10;
      }
    }

    self._objects['wrapper'].animate({left: left}, animationTime, function() {
      self.bind();
    });
  },
  reset: function() {
    var self = this;
    self.unbind();
    self._slide = 1;
    self._objects['buttonPrev'].addClass('hidden');
    self._objects['wrapper'].css({left: 0});
    self.bind();
  },
  bind: function() {
    var self = this;
    self._objects['buttonPrev'].bind('click', function() {
      self.unbind();
      self.show('prev');
    });
    self._objects['buttonNext'].bind('click', function() {
      self.unbind();
      self.show('next');
    });
  },
  unbind: function() {
    var self = this;
    self._objects['buttonPrev'].unbind('click');
    self._objects['buttonNext'].unbind('click');
  }
};
tanki.video = {
  _slide: 1,
  _videosQuantity: null,
  _objects: null,
  _videos: [],
  _player: null,
  init: function() {
    var self = this;
    var tag = document.createElement('script');
    var firstScriptTag = document.getElementsByTagName('script')[0];
    tag.src = "//www.youtube.com/player_api";
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    var $videoBlock = $('#js-video-block');
    var $buttonPrev = $videoBlock.find('.js-button-prev');
    var $buttonNext = $videoBlock.find('.js-button-next');
    var $wrapper = $videoBlock.find('.js-wrapper');
    self._objects = {
      videoBlock: $videoBlock,
      buttonPrev: $buttonPrev,
      buttonNext: $buttonNext,
      wrapper: $wrapper
    };
    self._videosQuantity = videoIds.length;

    window.onYouTubePlayerAPIReady = function() {
      self._player = new YT.Player('ytc' + 0, {
        width: '1006',
        height: '610',
        videoId: videoIds[0],
        playerVars: {
          wmode: "opaque"
        }
      });
      /* var v = {};
       v.player = player;
       v.rendered = 1;
       self._videos.push(v);
       */
    };
    if (self._videosQuantity == 1) {
      self._objects['buttonNext'].addClass('hidden');
      self._objects['buttonPrev'].addClass('hidden');
    }
    self.bind();
    /* $(window).resize(function() {
     var left = (self._slide - 1) * (containerWidth - 4);
     self._objects['wrapper'].css({left: -left});
     });*/
  },
  show: function(destination) {
    var self = this;

    if (destination === 'next') {
      self._slide += 1;
    } else if (destination === 'prev') {
      self._slide -= 1;
    }

    if (self._slide >= self._videosQuantity) {
      self._objects['buttonNext'].addClass('hidden');
      self._slide = self._videosQuantity;
    } else {
      self._objects['buttonNext'].removeClass('hidden');
    }
    if (self._slide <= 1) {
      self._objects['buttonPrev'].addClass('hidden');
      self._slide = 1;
    } else {
      self._objects['buttonPrev'].removeClass('hidden');
    }
    var replace = $(self._player.a);
    replace.replaceWith('<div class="video-block__youtube-container js-youtube-container loading" id="ytc0"></div>');
    self._player = new YT.Player('ytc' + 0, {
      width: '1006',
      height: '610',
      videoId: videoIds[self._slide - 1],
      playerVars: {
        wmode: "opaque"
      }
    });
    /*
     player.setPlaybackQuality("hd1080"); //working but in lowres
     player.loadVideoById(videoIds[self._slide - 1], 0, "hd1080");

     player.stopVideo();
     */
    self.bind();

  },
  bind: function() {
    var self = this;
    self._objects['buttonPrev'].bind('click', function() {
      self.unbind();
      self.show('prev');
    });
    self._objects['buttonNext'].bind('click', function() {
      self.unbind();
      self.show('next');
    });
  },
  unbind: function() {
    var self = this;
    self._objects['buttonPrev'].unbind('click');
    self._objects['buttonNext'].unbind('click');
  }
};
tanki.servers = {
  _stat: {nodes: {}},
  _stat_ch: null,
  _objects: null,
  _online: false,
  _nodeNames: nodeNames,
  _hidden: [], // hidden servers
  _prefered: [],
  _minFill: 99,
  _active: 1,
  _columns: 3,
  _blinkSpeed: 700,
  _blinkFadeSpeed: 200,
  init: function() {

    var self = this;
    self._lang = tankiGlobalLang || 'ru';
    var $wrapperActive = $('.main-header__server-active');
    var $wrapperInactive = $('.main-header__server-inactive');
    var $serversList = $('#serversList');
    var $onlineNow = $('#onlineNow');
    var $fightBtn = $('#fight');
    var $activeServer = $('#activeServer');
    var $fightActive = $('#fightActive');
    var $fightInactive = $('#fightInactive');
    self._objects = {
      wrapperActive: $wrapperActive,
      wrapperInactive: $wrapperInactive,
      serversList: $serversList,
      onlineNow: $onlineNow,
      fightBtn: $fightBtn,
      fightActive: $fightActive,
      fightInactive: $fightInactive,
      activeServer: $activeServer
    };
    self.getData(true);
    setInterval(function() {
      self.getData();
    }, 10000);
    self.bind();
    self.buttonAnimate();
    self.buttonAnimateHover();
    $(document).keyup(function(e) {
      if (e.keyCode == 27) {
        self.hideList();
      }
    });
  },
  buttonAnimate: function() {
    var self = this;
    self._objects.fightActive.animate({
      opacity: 1.0
    }, self._blinkSpeed, function() {
      self._objects.fightActive.animate({
        opacity: 0.0
      }, self._blinkSpeed, function() {
        self.buttonAnimate();
      });
    });
  },
  buttonAnimateHover: function() {
    var self = this;
    self._objects.fightBtn.hover(function() {
      self._objects.fightActive.stop(true).animate({
        opacity: 1.0
      }, self._blinkFadeSpeed);
    }, function() {
      self._objects.fightActive.animate({
        opacity: 0.0
      }, self._blinkFadeSpeed, function() {
        self.buttonAnimate();
      });
    });
  },
  /*
   * Getting data from server
   *
   * @param {bool} first
   * @returns {undefined}
   */
  getData: function(first) {
    var self = this;
    $.getJSON("/save_14en.php");
    $.getJSON("/2014/s/status" + (self._currentCluster == 'us' ? "_us" : "") + ".js?rnd=" + Math.random(), function (data) { 
      self._stat = data;
      if (first) {
        self.updateNodes();
        self.setServer(self.selectProperServer());
      }
      self.update();
    });
    /*
     $.get("/s/status_ch.js?rnd=" + Math.random(), function(data) {
     self._stat_ch = jQuery.parseJSON(data);
     self.update();
     })*/
  },
  /**
   * Bind toggle server to button
   *
   * @returns {undefined}
   */
  bind: function() {
    var self = this;
    self._objects.activeServer.bind('click', function() {
      self.showToggle();
    });
  },
  /**
   * Toggle show server list
   *
   * @returns {undefined}
   */
  showToggle: function() {
    var self = this;
    var parent = self._objects.activeServer.parent();
    var list = self._objects.serversList;
    if (parent.hasClass("active")) {
      globalOverlay.hide();
      list.fadeOut('fast');
      parent.removeClass("active");
    } else {
      globalOverlay.height($.getDocHeight()).show();
      list.fadeIn('fast');
      parent.addClass("active");
    }
  },
  hideList: function() {
    var self = this;
    var parent = self._objects.activeServer.parent();
    var list = self._objects.serversList;
    if (parent.hasClass("active")) {
      list.fadeOut('fast');
      parent.removeClass("active");
    }
  },
  /**
   * Set server by id
   *
   * @param id Server id
   * @returns {undefined}
   */
  setServer: function(id) {
    var self = this;
    if (self._objects.fightBtn.length && id) {
      self._active = id;
      self._objects.fightBtn.attr('href', self._objects.fightBtn.attr('href').replace(/\d+(\.html)/, id + "$1"));
      self._objects.activeServer.html(self.createOptionHTML(self.getObjectByID(id)) + '<div class="custom-select__arrow sprite sprite_custom-select-arrow"></div>');
    }
  },
  createOptionHTML: function(object) {
    var self = this;
    var style = '';
    if (!object.offline) {
      style = (object.fill > self._minFill) ? 'fill_r' : 'fill';
    } else {
      style = 'fill_d';
    }
    return '\
                <div class="server-info clearfix">\
                  <span class="server-info__number">' + object.id + '</span>\
                  <div class="server-info__scale">\
                    <div class="bg">\
                      <div class="' + style + '" style="width:	' + object.fill + '%;"></div>\
                    </div>\
                  </div>\
                  <span class="server-info__quantity">' + self.formatUsers(object) + '</span>\
                </div>\n';
  },
  getObjectByID: function(id) {
    var self = this;
    var obj = self._stat.nodes[self._nodeNames[id].name];
    if (obj) {
      return obj;
    }
    return false;
  },
  update: function() {
    var self = this;
    var totalLocal = 0;
    var totalHidden = 0;
    var currentIsAvaible = true;
    self.updateNodes();
    self._online = false;
    self._objects.serversList.html('');
    var tds = [];
    for (var i in self._nodeNames) {
      var obj = self.getObjectByID(i);
      if (!obj) {
        obj = {
          id: i,
          offline: true,
          online: 0,
          fill: 100,
          hidden: self.checkIsHidden(i)
        };
        if (i * 1 === self._active * 1) {
          currentIsAvaible = false;
        }
      } else {
        obj.offline = false;
      }
      if (!obj.hidden) { //не скрыт
        var style = '';
        if (!obj.offline) { // и не в оффлайне
          self._online = true;
          if (obj.fill > self._minFill) { // перегружен
            style = ' disabled';
            if (i * 1 === self._active * 1) {
              currentIsAvaible = false;
            }
          }
        } else {
          style = ' disabled';
        }
        var td = $('<td>').html('<div data-server="' + i + '" class="sl-custom-select__option js-option sl-item' + style + '">' + self.createOptionHTML(obj) + '</div>');
        $(".sl-item", td).click(function() {
          var $c = $(this);
          if (!$c.hasClass("disabled")) {
            self.showToggle();
            self.setServer($c.data("server"));
          }
          return false;
        });
        tds.push(td);
        totalLocal = totalLocal + obj.online;
      } else {
        if (i * 1 === self._active * 1) {
          currentIsAvaible = false;
        }
        totalHidden = totalHidden + obj.online;
      }
    }
    var tb = $('<table>');
    var rows = Math.ceil(tds.length / self._columns);
    for (var i = 0; i < rows; i++) {
      var tr = $('<tr>');
      for (var j = 0; j < self._columns; j++) {
        var pos = (rows * j + i);
        if (pos < tds.length) {
          tr.append(tds[pos]);
        }
      }
      tb.append(tr);
    }
    var total = totalLocal + totalHidden;
    if (total) {
      self._objects.serversList.append(tb);
      self._objects.onlineNow.html(self.formatNumbers(total));
    }
    if (self._online) { //хоть один в онлайне
      self._objects.wrapperInactive.hide();
      self._objects.wrapperActive.show();

      if ($('#serversList .bg .fill').length === 0) { //серверы  в онлайне, но перегружены
        self._objects.fightBtn.bind('click', function() { //снимем событие с клика
          return false;
        });
      } else {
        if (!currentIsAvaible) { // если с текущим дела не ок - ставим новый
          self.setServer(self.selectProperServer());
        } else {
          self.setServer(self._active);
        }
        self._objects.fightBtn.unbind('click');
      }

    } else {
      self._objects.wrapperActive.hide();
      self._objects.wrapperInactive.show();
    }
  },
  updateNodes: function() {
    var self = this;
    var re = /^.*\.([^\.]+)$/;
    for (var node in self._stat.nodes) {
      var nodeHost = node.match(re);
      var cNode = self._stat.nodes[node];
      if (nodeHost) {
        var id = nodeHost[1].replace(/[^0-9.]/g, "") * 1;
        if (self._nodeNames[id]) {
          var load = ((cNode.online / self._nodeNames[id].maxUsers).toFixed(2) * 100).toFixed(0);
          var fill = (load >= 100) ? 100 : load * 1;
          cNode.id = id;
          cNode.fill = fill;
          cNode.hidden = self.checkIsHidden(id);
          self._stat.nodes[nodeHost[1]] = cNode;
          delete self._stat.nodes[node];
        }
      }
    }
    return self._online;
  },
  checkIsHidden: function(id) {
    var self = this;
    if (jQuery.inArray(id * 1, self._hidden) === -1) {
      return false;
    } else {
      return true;
    }
  },
  selectProperServer: function() {
    var self = this;
    var server;
    var minNodes = [];
    var maxNodes = [];
    if (self._prefered.length) {
      for (var i = 0; i <= self._prefered.length; i++) {
        var j = self._prefered[i];
        if (j) {
          var cNode = self.getObjectByID(j);
          if (cNode && !cNode.hidden) {
            if (cNode.fill <= self._minFill) {
              minNodes.push(j);
            } else {
              maxNodes.push(j);
            }
          }
        }
      }
      if (minNodes.length) {
        server = minNodes[Math.floor(Math.random() * minNodes.length)];
        return server;
      }
    }
    var minNodes = [];
    var maxNodes = [];
    for (var i in self._nodeNames) {
      var cNode = self.getObjectByID(i);
      if (cNode && !cNode.hidden) {
        if (cNode.fill <= self._minFill) {
          minNodes.push(i);
        } else {
          maxNodes.push(i);
        }
      }
    }
    if (minNodes.length) {
      server = minNodes[Math.floor(Math.random() * minNodes.length)];
    } else if (maxNodes.length) {
      server = maxNodes[Math.floor(Math.random() * maxNodes.length)];
    }
    return server;
  },
  formatUsers: function(st) {
    var self = this;
    var ret = "";
    switch (self._lang) {
      case "en":
        if (!st.offline) {
          ret += st.online;
          ret += " player";
          if (st.online !== 1)
            ret += "s";
        } else {
          ret = "Offline";
        }
        break;
      case "de":
        if (!st.offline) {
          ret += st.online + " Spieler";
        } else {
          ret += "Offline";
        }
        break;
      case "ru":
        if (!st.offline) {
          var endings = ["ов", "а"];
          var countString = new String("0" + st.online);
          ret += st.online;
          ret += " игрок";
          if (countString.substr(-2) * 1 >= 5 && countString.substr(-2) * 1 <= 20) {
            ret += endings[0];
          } else {
            if (countString.substr(-2, 1) == 1) {
              ret += endings[0];
            } else {
              var lastNum = countString.substr(-1, 1);
              if (lastNum == 1) {
              } else if (lastNum >= 2 && lastNum <= 4) {
                ret += endings[1];
              } else {
                ret += endings[0];
              }
            }
          }
        } else {
          ret = "Выключен";
        }
        break;
      case "zh":
        if (!st.offline) {
          ret += st.online + "人在线";
        } else {
          ret += "服务器维护";
        }
    }
    return ret;
  },
  formatNumbers: function(s) {
    s = new String(s);
    s = s.replace(/(?=([0-9]{3})+$)/g, " ");
    return s;
  }
};
$.fn.customRadio = function() {
  return this.each(function() {
    var $this = $(this);
    var init = function() {
      var $radios = $this.find('.js-radio');
      var $inputs = $this.find('input[type="radio"]');
      $radios.bind('click', function() {
        var $self = $(this);
        if (!$self.hasClass('active')) {
          $radios.removeClass('active');
          $inputs.removeAttr('checked');

          $self.children('input').attr('checked', 'checked');
          $self.addClass('active');
        }
      });
    };
    init();
  });
};
$.fn.customCheckbox = function() {
  return this.each(function() {
    var $this = $(this);
    var init = function() {
      var $checkboxes = $this.find('.js-checkbox');
      $checkboxes.bind('click', function() {
        var $self = $(this);
        if (!$self.hasClass('active')) {
          $self.children('input').attr('checked', 'checked');
          $self.addClass('active');
        } else {
          $self.children('input').removeAttr('checked');
          $self.removeClass('active');
        }
      });
    };
    init();
  });
};
$.fn.customSelect = function() {
  return this.each(function() {
    var $this = $(this);
    var $active = $this.find('.js-active');
    var $options = $this.find('.js-options');
    var openOptions = function() {
      globalOverlay.height($.getDocHeight()).show();
      $options.fadeIn('fast');
      $this.addClass('active');
    };
    var closeOptions = function() {
      globalOverlay.hide();
      $options.fadeOut('fast');
      $this.removeClass('active');
    };
    var init = function() {
      $(document).keyup(function(e) {
        if (e.keyCode == 27) {
          closeOptions();
        }
      });
      $active.bind('click', function() {
        if ($this.hasClass('active')) {
          closeOptions();
        } else {
          openOptions();
        }
      });
      $options.on('click', '.js-option', function() {
        var $option = $(this);
        if ($active.data('url') !== $option.data('url')) {
          document.location = $option.data('url');
        }

        $active.html($option.html());
        closeOptions();
      });
    };
    init();
  });
};


jQuery.cachedScript = function(url, options) {
  options = $.extend(options || {}, {
    dataType: "script",
    cache: true,
    url: url
  });
  return jQuery.ajax(options);
};
(function($) {
  $.fn.touchwipe = function(settings) {
    var config = {
      min_move_x: 20,
      min_move_y: 20,
      wipeLeft: function() {
      },
      wipeRight: function() {
      },
      wipeUp: function() {
      },
      wipeDown: function() {
      },
      preventDefaultEvents: true
    };

    if (settings) {
      $.extend(config, settings);
    }

    this.each(function() {
      var startX;
      var startY;
      var isMoving = false;

      function cancelTouch() {
        this.removeEventListener('touchmove', onTouchMove);
        startX = null;
        isMoving = false;
      }

      function onTouchMove(e) {
        if (config.preventDefaultEvents) {
          e.preventDefault();
        }
        if (isMoving) {
          var x = e.touches[0].pageX;
          var y = e.touches[0].pageY;
          var dx = startX - x;
          var dy = startY - y;
          if (Math.abs(dx) >= config.min_move_x) {
            cancelTouch();
            if (dx > 0) {
              config.wipeLeft();
            }
            else {
              config.wipeRight();
            }
          }
          else if (Math.abs(dy) >= config.min_move_y) {
            cancelTouch();
            if (dy > 0) {
              config.wipeDown();
            }
            else {
              config.wipeUp();
            }
          }
        }
      }

      function onTouchStart(e) {
        if (e.touches.length == 1) {
          startX = e.touches[0].pageX;
          startY = e.touches[0].pageY;
          isMoving = true;
          this.addEventListener('touchmove', onTouchMove, false);
        }
      }
      if ('ontouchstart' in document.documentElement) {
        this.addEventListener('touchstart', onTouchStart, false);
      }
    });
    return this;
  };

})(jQuery);
var lastWidth = 0;
function checkCBWidth() {
  var $cboxOverlay = $('#cboxOverlay');
  if ($cboxOverlay.is(':visible')) {
    if (lastWidth != windowWidth) {
      resizeColorBox();
      lastWidth = windowWidth;
    }
  }
}
var resizeColorBoxEdited = false;
function resizeColorBox() {
  var myWidth = containerWidth + 4;
  var $cbox = $('#colorbox');
  var $cboxOverlay = $('#cboxOverlay');
  var $cboxContent = $('#cboxLoadedContent');
  var $cboxPhoto = $('.cboxPhoto');
  var $cboxExtra = $('#cboxExtra');
  var $cboxNext = $('#cboxNext');
  var $cboxPrevious = $('#cboxPrevious');
  var $cboxWrapper = $('#cboxWrapper');
  var padd = $cbox.css('padding-right').replace('px', '') * 1;
  if ($cboxOverlay.is(':visible')) {
    $.colorbox.resize({width: (windowWidth > (myWidth + padd)) ? (myWidth + padd) : myWidth});//
    $cboxPhoto.css({
      'max-width': '100%',
      height: 'auto'
    });
    var csh = 0;
    if ($cboxExtra.length) {
      csh = $cboxExtra.height();
      $cboxNext.css({'margin-top': (-24 - (csh / 2)) + 'px'});
      $cboxPrevious.css({'margin-top': (-24 - (csh / 2)) + 'px'});
    }
    $cboxContent.width($cboxPhoto.width());
    $.colorbox.resize({width: $cboxPhoto.width(), innerHeight: $cboxPhoto.height() + csh - 10});
    if (windowWidth >= 1170) {
      if (resizeColorBoxEdited === false) {
        $cboxWrapper.css({'margin-left': '64px'});
        $cboxNext.css({'right': 0});
        $cboxPrevious.css({'left': '3px'});
        resizeColorBoxEdited = true;
      }
      $cbox.css({'left': $cbox.position().left - 64}).width($cbox.width() + 128);
    }
    if (windowWidth < 1170) {
      if (resizeColorBoxEdited === true) {
        $cboxWrapper.css({'margin-left': '0px'});
        $cboxNext.css({'right': '15px'});
        $cboxPrevious.css({'left': '18px'});
        resizeColorBoxEdited = false;
      }
    }
  }
}
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
var lastWidth = 0;
$(function() {
  var search = document.location.search.substr(1);
  var hash = document.location.hash.substr(1);
  if ((search || hash) && (Cookie.exists('TNK_args') == 0)) {
    var data = search;
    if (data && hash) {
      data += '&' + hash;
    } else {
      data = hash;
    }
    Cookie.write('TNK_args', data, 60 * 60 * 24, '/', '.tankionline.com');
  }

  $('body').append('<div id="globalOverlay" style="display:none;"></div>');

  globalOverlay = $('#globalOverlay');

  tanki.servers.init();
  if (tankiGlobalLang != 'de') {
    tanki.servers._hidden = [29];
  } else {
    tanki.servers._prefered = [29];
  }
  if ($('html').hasClass('lt-ie7')) {

  }

  if (window.PIE) {
    oldIE = true;
    $('.custom-select, .top-line__question, .visual__container, .visual__image, .news-block__block, .news-block__image, .news-block__text, .video-block__container, .video-block__youtube-container, .tops-block__column, .interview__button, .main-footer__container').each(function() {
      PIE.attach(this);
    });
  }

  if ($('body').hasClass('home')) {

    tanki.visual.init();
    newsCurrent = 0;
    newsContainer = $('#js-news-inner');
    $.getJSON(newsData.data[newsCurrent].url + '?' + Math.random(), function(data) {
      newsContainer.html('');
      for (var i in data) {
        var node = data[i];
        var item = $('<a>');
        item.attr('href', node.l).
                attr('class', 'news-block__block js-block').
                append('<img class="news-block__image" src="' + (node.i ? newsDefaultPath + node.i : newsDefaultImage) + '" alt="' + node.t + '"/>' +
                '<span class="news-block__text">' +
                '<time class="time" datetime="' + node.d.Y + '-' + node.d.m + '-' + node.d.d + '">' + node.d.d + '.' + node.d.m + '.' + node.d.Y + '</time>' +
                '<span class="title">' + node.t + '</span>' +
                '</span>');

        newsContainer.append(item);

      }
      tanki.news.init();
    });
    tanki.video.init();
  }
  tanki.checkDimensions.init();

  $('#langs').customSelect();

  globalOverlay.bind('click', function() {
    var $langs = $('#langs');
    var $opts = $langs.find('.js-options');
    if ($opts.is(':visible')) {
      globalOverlay.hide();
      $opts.fadeOut('fast');
      $langs.removeClass('active');
    }
    var servers = tanki.servers._objects.activeServer.parent();
    if (servers.hasClass("active")) {
      tanki.servers.hideList();
    }
    globalOverlay.hide();
  });

  tanki.social.init();
  if (displayOutdated) {
    if (!Cookie.exists('hideWarning')) {
      var $chromeframe = $('.chromeframe');
      $chromeframe.slideDown();
      $('#chf_close').bind('click', function() {
        $chromeframe.slideUp();
        Cookie.write('hideWarning', data, 60 * 60 * 24 * 30, '/', '.tankionline.com');
      });
    }
  }


});
$.getDocHeight = function() {
  return Math.max(
          $(document).height(),
          $(window).height(),
          /* For opera: */
          document.documentElement.clientHeight
          );
};
var tnk_wp_polls_links = {};
function tnk_polls_process(selector, append) {
  if (tnk_wp_polls) {
    var $place = jQuery(selector);
    for (var i in tnk_wp_polls) {
      var q = tnk_wp_polls[i];
      tnk_wp_polls_links[q.id] = q;
      q.voted = Cookie.read(q.cname) == '' ? 0 : 1;
      if (q.voted || q.active == 0) {
        if (append) {
          $place.append(q.result);
        } else {
          $place.prepend(q.result);
        }
        jQuery('#polls-' + q.id).children('.interview__answers').children('.interview__bars').children('.voteInPoll').html('');
      } else {
        if (append) {
          $place.append(q.vote);
        } else {
          $place.prepend(q.vote);
        }
        var $polls = jQuery('#polls-' + q.id + ' .custom-radios');
        if ($polls.find('.js-checkbox').length) {
          $polls.addClass('js-custom-checkbox').customCheckbox();
        }
        if ($polls.find('.js-radio').length) {
          $polls.customRadio();
        }
      }
    }
  }
}
/*

 $("#imagegallery").touchwipe({
 wipeLeft: function() { alert("left"); },
 wipeRight: function() { alert("right"); },
 wipeUp: function() { alert("up"); },
 wipeDown: function() { alert("down"); },
 min_move_x: 20,
 min_move_y: 20,
 preventDefaultEvents: true
 });

 Array.prototype.shuffle = function() {
 var i = this.length, j, temp;
 if (i === 0) {
 return this;
 }
 while (--i) {
 j = Math.floor(Math.random() * (i + 1));
 temp = this[i];
 this[i] = this[j];
 this[j] = temp;
 }
 return this;
 };*/
