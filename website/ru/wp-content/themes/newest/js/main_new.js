tanki = {};
containerWidth = null;
windowWidth = null;
windowHeight = null;
newsCount = 3;
playersReady = false;
globalOverlay = false;
window.onload = function () {
    playersReady = true;
};
var oldIE = false;
var visualIntervalID = false;
function log(data) {
    if (window.console) {
        console.log(data);
    }
}
var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    Width: function () {
        return ($(window).width() <= 768);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows() || isMobile.Width());
    }
};
var OSName = false;
if (navigator.appVersion.indexOf("Win") != -1) {
    OSName = "Win";
}
if (navigator.appVersion.indexOf("Mac") != -1) {
    OSName = "Mac";
}
/*
 if (navigator.appVersion.indexOf("X11") != -1)
 OSName = "UNIX";
 if (navigator.appVersion.indexOf("Linux") != -1)
 OSName = "Linux";
 */
tanki.checkDimensions = {
    $window: null,
    $body: null,
    init: function () {
        var self = this;
        tanki.servers.getData();
        self.checkSizes();
        $(window).resize(function () {
            self.checkSizes();
        });
    },
    checkSizes: function () {
        var $window = $(window);
        var $paging = $('.wp-polls-paging-pages');
        var $visualWrapper = $('#js-visual').find('.js-wrapper');

        windowWidth = $window.width();
        windowHeight = $window.height();

        if ($visualWrapper.length) {
            // tanki.visual.reset();
        }
        if (oldIE) {
            if (windowWidth < 1360) {
                if (tanki.social.layer) {
                    tanki.social.layer.hide();
                }
            } else {
                if (tanki.social.layer) {
                    tanki.social.layer.show();
                }
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
        } else if (windowWidth < 480) {
            containerWidth = 300;
            newsCount = 1;
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
        if (windowWidth <= 1370) {
            $('.main-header__social').hide();
            $('.main-header__support').hide();
        } else {
            $('.main-header__social').show();
            $('.main-header__support').show();
        }
    }
};
tanki.social = {
    layer: null,
    _show: true,
    init: function () {
        var self = this;
        self._lang = tankiGlobalLang || 'en';
        self.layer = $('.main-header__social');
        switch (self._lang) {
            case "ru":
                //vk
                $.cachedScript("//vk.com/js/api/share.js?90").done(function () {
                    self.layer.children('#vk_w').html(VK.Share.button({
                        url: "//tankionline.com",
                        title: "Танки Онлайн",
                        description: "Вступай в наш клан в \"Танках Онлайн\". Всех порвём! Заходи на //tankionline.com.",
                        noparse: true,
                        image: "//tankionline.com/images/logosmall.jpg"
                    }, {type: "button", text: "Мне нравится"}));
                    self.layer.children('#vk_w').show();
                });

                //fb
                self.layer.children('#fb_w').html('<iframe src="//www.facebook.com/plugins/like.php?locale=ru_RU&amp;href=http%3A%2F%2Ftankionline.com&amp;layout=button_count&amp;show_faces=true&amp;width=100&amp;action=like&amp;colorscheme=light&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:21px;" allowTransparency="true"></iframe>').show();

                //ok
                $.cachedScript("//connect.ok.ru/connect.js").done(function () {
                    OK.CONNECT.insertShareWidget("ok_w", "//tankionline.com", "{width:170,height:20,st:'rounded',sz:20,ck:2}");
                    self.layer.children('#ok_w').show();
                });

                //mm
                self.layer.children('#mm_w').html('<a target="_blank" class="mrc__plugin_uber_like_button" href="//connect.mail.ru/share?share_url=http%3A%2F%2Ftankionline.com" data-mrc-config="{\'cm\' : \'1\', \'sz\' : \'24\', \'st\' : \'2\', \'tp\' : \'mm\'}">Нравится</a>');
                $.cachedScript("//cdn.connect.mail.ru/js/loader.js").done(function () {
                    self.layer.children('#mm_w').show();
                });
                break;
            case "en":

                //fb
                self.layer.children('#fb_w').html('<iframe src="//www.facebook.com/plugins/like.php?locale=en_US&amp;href=http%3A%2F%2Ftankionline.com&amp;layout=button_count&amp;show_faces=true&amp;width=100&amp;action=like&amp;colorscheme=light&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:21px;" allowTransparency="true"></iframe>').show();

                //tw
                self.layer.children('#tw_w').html("<a href='//twitter.com/share' class='twitter-share-button' data-hashtags='tankionline' data-lang='en' data-related='tankionlineen'  data-count='horisontal' data-url='//tankionline.com' data-text=\"I play Tanki Online, a free MMO action game! Let's fight together!\">Tweet</a>");
                $.cachedScript("//platform.twitter.com/widgets.js").done(function () {
                    self.layer.children('#tw_w').show();
                });

                //gp
                self.layer.children('#gp_w').html('<div class="g-plusone" data-size="medium" data-annotation="inline" data-width="120" data-href="//tankionline.com/"></div>');
                window.___gcfg = {
                    lang: 'en-US'
                };
                $.cachedScript("//apis.google.com/js/plusone.js").done(function () {
                    self.layer.children('#gp_w').show();
                });
                break;
            case "fa":

                //fb
                self.layer.children('#fb_w').html('<iframe src="//www.facebook.com/plugins/like.php?locale=en_US&amp;href=http%3A%2F%2Ftankionline.com&amp;layout=button_count&amp;show_faces=true&amp;width=100&amp;action=like&amp;colorscheme=light&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:21px;" allowTransparency="true"></iframe>').show();

                //tw
                self.layer.children('#tw_w').html("<a href='//twitter.com/share' class='twitter-share-button' data-hashtags='tankionline' data-lang='en' data-related='tankionlineen'  data-count='horisontal' data-url='//tankionline.com' data-text=\"I play Tanki Online, a free MMO action game! Let's fight together!\">Tweet</a>");
                $.cachedScript("//platform.twitter.com/widgets.js").done(function () {
                    self.layer.children('#tw_w').show();
                });

                //gp
                self.layer.children('#gp_w').html('<div class="g-plusone" data-size="medium" data-annotation="inline" data-width="120" data-href="//tankionline.com/"></div>');
                window.___gcfg = {
                    lang: 'en-US'
                };
                $.cachedScript("//apis.google.com/js/plusone.js").done(function () {
                    self.layer.children('#gp_w').show();
                });
                break;
            case "de":

                //fb
                self.layer.children('#fb_w').html('<iframe src="//www.facebook.com/plugins/like.php?locale=de_DE&amp;href=http%3A%2F%2Ftankionline.com&amp;layout=button_count&amp;show_faces=true&amp;width=100&amp;action=like&amp;colorscheme=light&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:21px;" allowTransparency="true"></iframe>').show();

                //tw
                self.layer.children('#tw_w').html("<a href='//twitter.com/share' class='twitter-share-button' data-hashtags='tankionline' data-lang='de' data-related='TankiOnlineGer'  data-count='horisontal' data-url='//tankionline.com' data-text=\"Ich zocke &quot;Tanki Online&quot; - ein kostenloses Browserspiel! Spiel mit!\">Tweet</a>");
                $.cachedScript("//platform.twitter.com/widgets.js").done(function () {
                    self.layer.children('#tw_w').show();
                });

                //gp
                self.layer.children('#gp_w').html('<div class="g-plusone" data-size="medium" data-annotation="inline" data-width="120" data-href="//tankionline.com/"></div>');
                window.___gcfg = {
                    lang: 'de'
                };
                $.cachedScript("//apis.google.com/js/plusone.js").done(function () {
                    self.layer.children('#gp_w').show();
                });
                break;

            case "pl":

                //fb
                self.layer.children('#fb_w').html('<iframe src="//www.facebook.com/plugins/like.php?locale=pl_PL&amp;href=http%3A%2F%2Fwww.facebook.com%2FtankionlinePL&amp;layout=button_count&amp;show_faces=true&amp;width=100&amp;action=like&amp;colorscheme=light&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:21px;" allowTransparency="true"></iframe>').show();

                //tw
                self.layer.children('#tw_w').html("<a href='//twitter.com/share' class='twitter-share-button' data-hashtags='tankionline' data-lang='pl' data-related='tankionline_pl'  data-count='horisontal' data-url='//tankionline.com' data-text=\"Gram w Tanki Online, darmową grę akcji MMO! Powalczmy razem!\">Tweet</a>");
                $.cachedScript("//platform.twitter.com/widgets.js").done(function () {
                    self.layer.children('#tw_w').show();
                });

                //gp
                self.layer.children('#gp_w').html('<div class="g-plusone" data-size="medium" data-annotation="inline" data-width="120" data-href="//tankionline.com/"></div>');
                window.___gcfg = {
                    lang: 'pl-PL'
                };
                $.cachedScript("//apis.google.com/js/plusone.js").done(function () {
                    self.layer.children('#gp_w').show();
                });
                break;

            case "pt":

                //fb
                self.layer.children('#fb_w').html('<iframe src="//www.facebook.com/plugins/like.php?locale=pt_BR&amp;href=http%3A%2F%2Fwww.facebook.com%2Ftankionlineptbr&amp;layout=button_count&amp;show_faces=true&amp;width=100&amp;action=like&amp;colorscheme=light&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:21px;" allowTransparency="true"></iframe>').show();

                //tw
                self.layer.children('#tw_w').html("<a href='//twitter.com/share' class='twitter-share-button' data-hashtags='tankionline' data-lang='pt' data-related='tankionlinebr'  data-count='horisontal' data-url='//tankionline.com' data-text=\"Eu jogo Tanki Online, um jogo de ação para multidões on-line! Vamos batalhar juntos!\">Tweet</a>");
                $.cachedScript("//platform.twitter.com/widgets.js").done(function () {
                    self.layer.children('#tw_w').show();
                });

                //gp
                self.layer.children('#gp_w').html('<div class="g-plusone" data-size="medium" data-annotation="inline" data-width="120" data-href="//tankionline.com/"></div>');
                window.___gcfg = {
                    lang: 'pt-BR'
                };
                $.cachedScript("//apis.google.com/js/plusone.js").done(function () {
                    self.layer.children('#gp_w').show();
                });
                break;

            case "es":

                //fb
                self.layer.children('#fb_w').html('<iframe src="//www.facebook.com/plugins/like.php?locale=pt_BR&amp;href=http%3A%2F%2Fwww.facebook.com%2FTankiOnlineLATAM&amp;layout=button_count&amp;show_faces=true&amp;width=100&amp;action=like&amp;colorscheme=light&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:21px;" allowTransparency="true"></iframe>').show();

                //tw
                self.layer.children('#tw_w').html("<a href='//twitter.com/share' class='twitter-share-button' data-hashtags='tankionline' data-lang='es' data-related='tankionline_lat'  data-count='horisontal' data-url='//tankionline.com' data-text=\"¡Yo juego Tanki Online, un juego de acción MMO gratuito! ¡Vamos a combatir juntos!\">Tweet</a>");
                $.cachedScript("//platform.twitter.com/widgets.js").done(function () {
                    self.layer.children('#tw_w').show();
                });

                //gp
                self.layer.children('#gp_w').html('<div class="g-plusone" data-size="medium" data-annotation="inline" data-width="120" data-href="//tankionline.com/"></div>');
                window.___gcfg = {
                    lang: 'es'
                };
                $.cachedScript("//apis.google.com/js/plusone.js").done(function () {
                    self.layer.children('#gp_w').show();
                });
                break;

            case "zh":
                self.layer.children('#zh_w').show();
                break;

        }
    }
};
tanki.visual = {
    _slide: 1,
    _slidesQuantity: null,
    _objects: null,
    _interval: 4000,
    _direction: 'next',
    init: function () {
        var self = this;
        var $visual = $('#js-visual');
        var $buttonPrev = $visual.find('.js-button-prev');
        var $buttonNext = $visual.find('.js-button-next');
        var $wrapper = $visual.find('.js-wrapper');
        var $image = $wrapper.find('.js-image:visible');
        var left = -(self._slide - 1) * (containerWidth - 4);

        self._objects = {
            visual: $visual,
            buttonPrev: $buttonPrev,
            buttonNext: $buttonNext,
            wrapper: $wrapper,
            images: $image
        };
        self._slidesQuantity = $image.length;
        self._objects['wrapper'].css({left: left});
        self.bind();
        $(window).resize(function () {
            self.reset();
        });
        if (self._slidesQuantity > 1) {
            if (visualIntervalID == false) {
                visualIntervalID = window.setInterval(function () {
                    self.autoSlide();
                }, self._interval);
            }
            self._objects['buttonNext'].removeClass('hidden');
        }

    },
    autoSlide: function () {
        var self = this;
        if (self._direction === 'next') {
            if (self._slide < self._slidesQuantity) {
                self.show('next', 700);
            } else {
                self._direction = 'prev';
                self.autoSlide();
            }
        } else if (self._direction === 'prev') {
            if (self._slide > 1) {
                self.show('prev', 700);
            } else {
                self._direction = 'next';
                self.autoSlide();
            }
        }
    },
    show: function (destination, speed) {
        var self = this;
        self.unbind();
        var animationTime = speed || 400;
        var left = self._objects['wrapper'].css('left').replace('px', '') * 1;
        if (destination === 'next') {
            self._slide += 1;
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
            left -= (containerWidth - 4);
        } else if (destination === 'prev') {
            left += (containerWidth - 4);
        }
        self._objects['wrapper'].animate({left: left}, animationTime, function () {
            self.bind();
        });
    },
    reset: function () {
        var self = this;
        self.unbind();
        self._slide = 1;
        self._objects['buttonPrev'].addClass('hidden');
        self._objects['buttonNext'].addClass('hidden');
        self.init();
        clearInterval(visualIntervalID);
    },
    bind: function () {
        var self = this;
        self._objects['buttonPrev'].bind('click', function () {
            self.unbind();
            self.show('prev');
            clearInterval(visualIntervalID);
        });
        self._objects['buttonNext'].bind('click', function () {
            self.unbind();
            self.show('next');
            clearInterval(visualIntervalID);
        });
    },
    unbind: function () {
        var self = this;
        self._objects['buttonPrev'].unbind('click');
        self._objects['buttonNext'].unbind('click');
    }
};
tanki.news = {
    _slide: 1,
    _blocksQuantity: null,
    _slidesQuantity: null,
    _blockWidth: null,
    _objects: null,
    _addon: 0,
    pieIt: function () {
        if (window.PIE) {
            $('.news-block__block, .news-block__image, .news-block__text').each(function () {
                PIE.attach(this);
            });
        }
    },
    init: function () {

        var self = this;
        var $newsBlock = $('#js-news-block');
        var $buttonPrev = $newsBlock.find('.js-button-prev');
        var $buttonNext = $newsBlock.find('.js-button-next');
        var $wrapper = $newsBlock.find('.js-wrapper');
        //var $wrapper = $newsBlock.find('#js-news-inner');
        var $blocks = $wrapper.find('.js-block');
        self._objects = {
            newsBlock: $newsBlock,
            buttonPrev: $buttonPrev,
            buttonNext: $buttonNext,
            wrapper: $wrapper,
            blocks: $blocks
        };
        self._addon = 4;
        if (oldIE) {
            self._addon = 0;
        }
        self._blockWidth = $blocks.width() + self._addon + 10;
        self._blocksQuantity = newsData.totalCount;

        self._slidesQuantity = Math.ceil(self._blocksQuantity / newsCount);
        self.bind();
        if (self._slidesQuantity > 1) {
            self._objects['buttonNext'].removeClass('hidden');
        }
        $(window).resize(function () {
            self.reset();
            self._blockWidth = $blocks.width() + self._addon + 10;
            self._blocksQuantity = newsData.totalCount;
            self._slidesQuantity = Math.ceil(self._blocksQuantity / newsCount);
            if (self._slide > self._slidesQuantity) {
                self._slide = self._slidesQuantity;
            }
            var left = ((self._slide - 1) * containerWidth);
            if (left !== 0) {
                left += 10;
            }

            self._objects['wrapper'].css({right: -left});

            if (self._slidesQuantity > 1) {
                self._objects['buttonNext'].removeClass('hidden');
            }

        });

        self.pieIt();

    },
    show: function (destination) {
        var self = this;
        var animationTime = 300;
        var left = self._objects['wrapper'].css('left').replace('px', '') * 1;
        self._blockWidth = self._objects['blocks'].width() + self._addon;
        if (destination === 'next') {
            self._slide += 1;
            if (self._slide * newsCount + 15 > newsData.data[newsCurrent].countTo && newsData.data[newsCurrent + 1]) {
                newsCurrent++;
                $.getJSON(newsData.data[newsCurrent].url + '?' + Math.random(), function (data) {
                    for (var i in data) {
                        var node = data[i];
                        var item = $('<a>');
                        item.attr('href', node.l).attr('class', 'news-block__block js-block').append('<img class="news-block__image" src="' + (node.i ? newsDefaultPath + node.i : newsDefaultImage) + '" alt="' + node.t + '"/>' +
                            '<span class="news-block__text">' +
                            '<time class="time" datetime="' + node.d.Y + '-' + node.d.m + '-' + node.d.d + '">' + node.d.d + '.' + node.d.m + '.' + node.d.Y + '</time>' +
                            '<span class="title">' + node.t + '</span>' +
                            '</span>');

                        newsContainer.append(item);

                    }
                    self.pieIt();
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

        self._objects['wrapper'].animate({left: left}, animationTime, function () {
            self.bind();
        });
    },
    reset: function () {
        var self = this;
        self.unbind();
        self._slide = 1;
        self._objects['buttonPrev'].addClass('hidden');
        self._objects['buttonNext'].addClass('hidden');
        self._objects['wrapper'].css({left: 0});
        self.bind();
    },
    bind: function () {
        var self = this;
        self._objects['buttonPrev'].bind('click', function () {
            self.unbind();
            self.show('prev');
        });
        self._objects['buttonNext'].bind('click', function () {
            self.unbind();
            self.show('next');
        });
    },
    unbind: function () {
        var self = this;
        self._objects['buttonPrev'].unbind('click');
        self._objects['buttonNext'].unbind('click');
    }
};
tanki.servers = {
    _stat: {nodes: {}},
    _objects: null,
    _interval: 10 * 1000, //10 seconds
    _online: false,
    _nodeNames: nodeNames,
    _minFill: 99,
    _active: 1,
    _blinkSpeed: 700,
    _blinkFadeSpeed: 200,
    _currentCluster: 'eu',
    init: function () {
        var self = this;
        self._lang = tankiGlobalLang || 'en';
        if (self._lang == 'pt' || self._lang == 'es') {
            self._currentCluster = 'us';
        }
        if (window.tankiGlobalFill) {
            self._minFill = tankiGlobalFill;
        }
        var $wrapperActive = $('.main-header__server-active');
        var $wrapperInactive = $('.main-header__server-inactive');
        var $onlineNow = $('#onlineNow');
        var $fightBtn = $('#fight');
        var $fightActive = $('#fightActive');
        var $fightInactive = $('#fightInactive');
        var $downloadBtn = $('#download');
        var $downloadActive = $('#downloadActive');
        var $downloadInactive = $('#downloadInactive');
        self._objects = {
            wrapperActive: $wrapperActive,
            wrapperInactive: $wrapperInactive,
            onlineNow: $onlineNow,
            fightBtn: $fightBtn,
            fightActive: $fightActive,
            fightInactive: $fightInactive,
            downloadBtn: $downloadBtn,
            downloadActive: $downloadActive,
            downloadInactive: $downloadInactive
        };

        if (OSName) {
            $downloadBtn.attr('href', tankiGlobalURL[OSName]);
        } else {
            $downloadBtn.hide();
        }

        if (isMobile.any()) {
            $fightBtn.hide();
            $downloadBtn.hide();
        } else {
            self.buttonAnimate();
            self.buttonAnimateHover();
            setTimeout(function () {
                self.buttonAnimate2();
                self.buttonAnimateHover2();
            }, 500);
        }
        self.getData(true);
        setInterval(function () {
            self.getData();
        }, self._interval);

    },
    buttonAnimate: function () {
        var self = this;
        self._objects.fightActive.animate({
            opacity: 1.0
        }, self._blinkSpeed, function () {
            self._objects.fightActive.animate({
                opacity: 0.0
            }, self._blinkSpeed, function () {
                self.buttonAnimate();
            });
        });
    },
    buttonAnimateHover: function () {
        var self = this;
        self._objects.fightBtn.hover(function () {
            self._objects.fightActive.stop(true).animate({
                opacity: 1.0
            }, self._blinkFadeSpeed);
        }, function () {
            self._objects.fightActive.animate({
                opacity: 0.0
            }, self._blinkFadeSpeed, function () {
                self.buttonAnimate();
            });
        });
    },
    buttonAnimate2: function () {
        var self = this;
        self._objects.downloadActive.animate({
            opacity: 1.0
        }, self._blinkSpeed, function () {
            self._objects.downloadActive.animate({
                opacity: 0.0
            }, self._blinkSpeed, function () {
                self.buttonAnimate2();
            });
        });
    },
    buttonAnimateHover2: function () {
        var self = this;
        self._objects.downloadBtn.hover(function () {
            self._objects.downloadActive.stop(true).animate({
                opacity: 1.0
            }, self._blinkFadeSpeed);
        }, function () {
            self._objects.downloadActive.animate({
                opacity: 0.0
            }, self._blinkFadeSpeed, function () {
                self.buttonAnimate2();
            });
        });
    },
    /*
     * Getting data from server
     *
     * @param {bool} first
     * @returns {undefined}
     */
    getData: function (first) {
        var self = this;
        $.getJSON("/s/status" + (self._currentCluster == 'us' ? "_us" : "") + ".js?rnd=" + Math.random(), function (data) {
            self._stat = data;
            if (first) {
                self.updateNodes();
            }
            self.update();
        });
    },
    getObjectByID: function (id) {
        var self = this;
        if (self._nodeNames[id]) {
            var obj = self._stat.nodes[self._nodeNames[id].name];
            if (obj) {
                return obj;
            }
        }
        return false;
    },
    update: function () {
        var self = this;
        self.updateNodes();
        self._online = false;
        for (var i in self._nodeNames) {
            var obj = self.getObjectByID(i);
            if (obj) {
                self._online = true;
            }
        }
        var total = 0;
        var stat = self._stat;
        for (var i in stat['nodes']) {
            var n = stat.nodes[i];
            if (n.online) {
                total = total + n.online * 1;
            }
        }
        if (total) {
            self._objects.onlineNow.html(self.formatNumbers(total));
        }
        if (self._online) { //хоть один в онлайне
            self._objects.wrapperInactive.hide();
            self._objects.wrapperActive.show();
        } else {
            self._objects.wrapperActive.hide();
            self._objects.wrapperInactive.show();
        }
    },
    updateNodes: function () {

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
                    self._stat.nodes[nodeHost[1]] = cNode;
                    delete self._stat.nodes[node];
                }
            }
        }
        return self._online;
    },
    formatNumbers: function (s) {
        s = new String(s);
        s = s.replace(/(?=([0-9]{3})+$)/g, " ");
        return s;
    }
};
$.fn.customRadio = function () {
    return this.each(function () {
        var $this = $(this);
        var init = function () {
            var $radios = $this.find('.js-radio');
            var $inputs = $this.find('input[type="radio"]');
            $radios.bind('click', function () {
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
$.fn.customCheckbox = function () {
    return this.each(function () {
        var $this = $(this);
        var init = function () {
            var $checkboxes = $this.find('.js-checkbox');
            $checkboxes.bind('click', function () {
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
$.fn.customSelect = function () {
    return this.each(function () {
        var $this = $(this);
        var $active = $this.find('.js-active');
        var $options = $this.find('.js-options');
        var openOptions = function () {
            globalOverlay.height($.getDocHeight()).show();
            $options.fadeIn('fast');
            $this.addClass('active');
        };
        var closeOptions = function () {
            globalOverlay.hide();
            $options.fadeOut('fast');
            $this.removeClass('active');
        };
        var init = function () {
            $(document).keyup(function (e) {
                if (e.keyCode == 27) {
                    closeOptions();
                }
            });
            $active.bind('click', function () {
                if ($this.hasClass('active')) {
                    closeOptions();
                } else {
                    openOptions();
                }
            });
            $options.on('click', '.js-option', function () {
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

$.fn.tankiVideo = function (arr) {
    return this.each(function () {
        var $this = $(this);
        $this._slide = 1;
        $this._videosQuantity = null;
        $this._objects = null;
        $this._videos = [];
        $this._player = null;
        $this.videoIds = arr;
        $this.identify = null;
        var init = function () {
            var $videoBlock = $this;
            var $buttonPrev = $videoBlock.find('.js-button-prev');
            var $buttonNext = $videoBlock.find('.js-button-next');
            var $wrapper = $videoBlock.find('.js-wrapper');
            $this._objects = {
                videoBlock: $videoBlock,
                buttonPrev: $buttonPrev,
                buttonNext: $buttonNext,
                wrapper: $wrapper
            };
            $this._videosQuantity = $this.videoIds.length;
            $this.identify = $("#ytc1");

            var wrapper = 'https://www.youtube.com/embed/{VIDEO_ID}?wmode=opaque';

            if ($this.videoIds[0].indexOf("www.twitch.tv") > -1) {
                wrapper = '//{VIDEO_ID}/embed';
            }
            if (tankiGlobalLang == 'zh') {
                wrapper = '//player.youku.com/embed/{VIDEO_ID}';
            }
            $this.identify.html('<iframe height="610" width="1006"  class="video-block__youtube-container loading"  src="' +
                wrapper.replace('{VIDEO_ID}', $this.videoIds[0]) +
                '" frameborder="0" allowfullscreen="1"></iframe>');
            if ($this._videosQuantity == 1) {
                $this._objects['buttonNext'].addClass('hidden');
                $this._objects['buttonPrev'].addClass('hidden');
            } else {
                $this._objects['buttonNext'].removeClass('hidden');
            }
            bind();
        };
        var show = function (destination) {
            if (destination === 'next') {
                $this._slide += 1;
            } else if (destination === 'prev') {
                $this._slide -= 1;
            }

            if ($this._slide >= $this._videosQuantity) {
                $this._objects['buttonNext'].addClass('hidden');
                $this._slide = $this._videosQuantity;
            } else {
                $this._objects['buttonNext'].removeClass('hidden');
            }
            if ($this._slide <= 1) {
                $this._objects['buttonPrev'].addClass('hidden');
                $this._slide = 1;
            } else {
                $this._objects['buttonPrev'].removeClass('hidden');
            }


            var wrapper = 'https://www.youtube.com/embed/{VIDEO_ID}?wmode=opaque';

            if ($this.videoIds[$this._slide - 1].indexOf("www.twitch.tv") > -1) {
                wrapper = '//{VIDEO_ID}/embed';
            }
            if (tankiGlobalLang == 'zh') {
                wrapper = '//player.youku.com/embed/{VIDEO_ID}';
            }
            $this.identify.html('<iframe height="610" width="1006"  class="video-block__youtube-container loading"  src="' +
                wrapper.replace('{VIDEO_ID}', $this.videoIds[$this._slide - 1]) +
                '" frameborder="0" allowfullscreen="1"></iframe>');

            bind();
        };
        var bind = function () {
            $this._objects['buttonPrev'].bind('click', function () {
                unbind();
                show('prev');
            });
            $this._objects['buttonNext'].bind('click', function () {
                unbind();
                show('next');
            });
        };
        var unbind = function () {
            $this._objects['buttonPrev'].unbind('click');
            $this._objects['buttonNext'].unbind('click');
        };
        init();
        return $this;
    });
};

jQuery.cachedScript = function (url, options) {
    options = $.extend(options || {}, {
        dataType: "script",
        cache: true,
        url: url
    });
    return jQuery.ajax(options);
};
(function ($) {
    $.fn.touchwipe = function (settings) {
        var config = {
            min_move_x: 20,
            min_move_y: 20,
            wipeLeft: function () {
            },
            wipeRight: function () {
            },
            wipeUp: function () {
            },
            wipeDown: function () {
            },
            preventDefaultEvents: true
        };

        if (settings) {
            $.extend(config, settings);
        }

        this.each(function () {
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
                        } else {
                            config.wipeRight();
                        }
                    } else if (Math.abs(dy) >= config.min_move_y) {
                        cancelTouch();
                        if (dy > 0) {
                            config.wipeDown();
                        } else {
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
            'max-height': windowHeight * 0.9 - 40
            /*'height': 'auto'*/
        });
        var csh = 0;
        if ($cboxExtra.length) {
            csh = $cboxExtra.height();
            $cboxNext.css({'margin-top': (-24 - (csh / 2)) + 'px'});
            $cboxPrevious.css({'margin-top': (-24 - (csh / 2)) + 'px'});
        }
        $cboxContent.width($cboxPhoto.width());
        if ($cboxExtra.length) {
            $.colorbox.resize({width: $cboxPhoto.width(), innerHeight: $cboxPhoto.height() + csh - 10});
        } else {
            $.colorbox.resize({width: $cboxPhoto.width()});
        }
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
    isSupported: function () {
        return !!navigator.cookieEnabled;
    },
    exists: function (name) {
        return document.cookie.indexOf(name + "=") + 1;
    },
    write: function (name, value, expires, path, domain, secure) {
        expires instanceof Date ? expires = expires.toGMTString()
            : typeof (expires) == 'number' && (expires = (new Date(+(new Date) + expires * 1e3)).toGMTString());
        var r = [name + "=" + escape(value)], s, i;
        for (i in s = {
            expires: expires,
            path: path,
            domain: domain
        })
            s[i] && r.push(i + "=" + s[i]);
        return secure && r.push("secure"), document.cookie = r.join(";"), true;
    },
    read: function (name) {
        var c = document.cookie, s = this.exists(name), e;
        return s ? unescape(c.substring(s += name.length, (c.indexOf(";", s) + 1 || c.length + 1) - 1)) : "";
    },
    remove: function (name, path, domain) {
        return this.exists(name) && this.write(name, "", new Date(0), path, domain);
    }
};
var lastWidth = 0;

function getLang() {
    if (tankiGlobalLang) {
        return tankiGlobalLang;
    }
    var lang = (navigator.language || navigator.systemLanguage || navigator.userLanguage).substr(0, 2).toLowerCase();
    return lang;
}

tanki.twitter = {
    locales: {
        ru: {
            id: '413618183036092416',
            login: 'TankiOnline',
            text: 'Твиты'
        },
        en: {
            id: '437912634256412672',
            login: 'TankiOnlineEN',
            text: 'Tweets by'
        },
        de: {
            id: '437913286990774272',
            login: 'TankiOnlineGER',
            text: 'Tweets von'
        },
        pl: {
            id: '660029471425216512',
            login: 'TankiOnline_PL',
            text: 'Tweety'
        },
        pt: {
            id: '455600216058503168',
            login: 'TankiOnlineBR',
            text: 'Tweets de'
        },
        es: {
            id: '712226750583930880',
            login: 'TankiOnline_LATAM',
            text: 'Tweets por'
        }
    },
    template: function (lang, limit) {
        return '<h3>{%TEXT%} @<a class="twitter-anywhere-user" href="//twitter.com/{%LOGIN%}">{%LOGIN%}</a></h3>\
            <a class="twitter-timeline loading" style="height: 100px; display: block;" data-link-color="#eeeeee" data-chrome="noheader nofooter transparent noborders"\
            href="https://twitter.com/{%LOGIN%}" data-widget-id="{%ID%}" data-tweet-limit="{%LIMIT%}" lang="{%LANG%}"></a>'.replace(/{%ID%}/g, this.locales[lang].id).replace(/{%LOGIN%}/g, this.locales[lang].login).replace(/{%TEXT%}/g, this.locales[lang].text).replace(/{%LANG%}/g, lang).replace(/{%LIMIT%}/g, limit);
    },
    pushScript: function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https';
        if (!d.getElementById(id)) {
            js = d.createElement(s);
            js.id = id;
            js.src = p + "://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);
        }
    },
    render: function ($object, lang, limit) {
        if (!limit) {
            if ($(window).width() >= 760) {
                var $main = $('.content__main');
                var $side = $('.content__side');
                var diff = $main.height() - $side.height();
                if (diff < 150) {
                    $('#tweets').hide();
                    return;
                } else {
                    limit = Math.floor(diff / 150);
                }
            } else {
                limit = 5;
            }
        }
        $object.html(this.template(lang, limit));
        this.pushScript(document, "script", "twitter-wjs");
    }
};
jQuery.fn.outerHTML = function () {
    return (this[0]) ? this[0].outerHTML : '';
};

$(function () {
    var search = document.location.search.substr(1);
    var hash = document.location.hash.substr(1);
    if ((search || hash) && (Cookie.read('TNK_args') == 0)) {
        var data = search;
        if (data && hash) {
            data += '&' + hash;
        } else {
            data += hash;
        }
        Cookie.write('TNK_args', data, 60 * 60 * 24, '/', tankiGlobalDomain);
    }
    Cookie.write('TNK_visit', 1, 60 * 60 * 24 * 365, '/', tankiGlobalDomain);
    $('body').append('<div id="globalOverlay" style="display:none;"></div>');

    globalOverlay = $('#globalOverlay');

    tanki.servers.init();

    tanki.servers._prefered = preferedNodes[tankiGlobalLang];

    if ($('html').hasClass('lt-ie9')) {
        oldIE = true;
    }


    if (window.PIE) {
        $('.interview__button, #serversList, .custom-select, .visual__container, .visual__image, .visual__wrapper, .tops-block__column-wide, .tops-block__column, .content__inner, .content__right, .main-footer__container, .tops-block__column-wide, .tops-block__column, .content__inner, .video-block__container, .custom-select__options, .main-header__social, .side__search, .side_current .side_item, .main-header__support').each(function () {
            PIE.attach(this);
        });
    }

    if ($('body').hasClass('home')) {

        tanki.visual.init();
        newsCurrent = 0;
        newsContainer = $('#js-news-inner');
        if (newsData) {
            $.getJSON(newsData.data[newsCurrent].url + '?' + Math.random(), function (data) {
                newsContainer.html('');
                for (var i in data) {
                    var node = data[i];
                    var item = $('<a>');
                    item.attr('href', node.l).attr('class', 'news-block__block js-block').append('<img class="news-block__image" src="' + (node.i ? newsDefaultPath + node.i : newsDefaultImage) + '" alt="' + node.t + '"/>' +
                        '<span class="news-block__text">' +
                        '<time class="time" datetime="' + node.d.Y + '-' + node.d.m + '-' + node.d.d + '">' + node.d.d + '.' + node.d.m + '.' + node.d.Y + '</time>' +
                        '<span class="title">' + node.t + '</span>' +
                        '</span>');

                    newsContainer.append(item);

                }
                tanki.news.init();
            }, 'html');
        } else {
            $('js-news-block').hide();
        }

        if (jQuery.browser.msie) {
            setTimeout(function () {
                if (window['videoIds']) {
                    jQuery('#js-video-block').tankiVideo(videoIds);
                }
            }, 1500);
        } else {
            if (window['videoIds']) {
                jQuery('#js-video-block').tankiVideo(videoIds);
            }
        }
    }
    tanki.checkDimensions.init();

    $('#langs').customSelect();

    globalOverlay.bind('click', function () {
        var $langs = $('#langs');
        var $opts = $langs.find('.js-options');
        if ($opts.is(':visible')) {
            globalOverlay.hide();
            $opts.fadeOut('fast');
            $langs.removeClass('active');
        }
        globalOverlay.hide();
    });

    tanki.social.init();
    if (displayOutdated) {
        if (!Cookie.exists('hideWarning')) {
            var $chromeframe = $('.chromeframe');
            $chromeframe.slideDown();
            $('#chf_close').bind('click', function () {
                $chromeframe.slideUp();
                Cookie.write('hideWarning', data, 60 * 60 * 24 * 3, '/', tankiGlobalDomain);
            });
        }
    }
    var twi = $('#tweets');
    if (twi.length) {
        tanki.twitter.render(twi, tankiGlobalLang, 5);
    }


    if (!Cookie.exists('cookiePolicy')) {
        var $cookiePolicy = $('.cookie-policy');
        var $pageFooter = $('.page-footer');
        $cookiePolicy.show();
        $pageFooter.css('margin-bottom', $cookiePolicy.height() + 'px');
        $('.cookie-ok').bind('click', function () {
            $cookiePolicy.hide();
            $pageFooter.css('margin-bottom', '0px');
            Cookie.write('cookiePolicy', 'true', 60 * 60 * 24 * 365, '/', tankiGlobalDomain);
        });
    }


});

$.getDocHeight = function () {
    return Math.max(
        $(document).height(),
        $(window).height(),
        /* For opera: */
        document.documentElement.clientHeight
    );
};
var tnk_wp_polls_links = {};

function poll_ie_goodies() {
    if (window.PIE) {
        $('.interview__button, .interview-info__scale, .interview-info__scale .bg, .interview-info__scale .bg .fill').each(function () {
            PIE.attach(this);
        });
    }
}

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
    poll_ie_goodies();
}
function postToWb() {
    var _url = encodeURIComponent(document.location);
    var _assname = encodeURI("tank_3d");
    var _appkey = encodeURI("801004332");
    var _pic = encodeURI('');
    var _t = '3D坦克是一款基于网页的3D对战游戏，游戏拥有与CS媲美的对战模式和3D的视觉体验。人与人之间可以组成战队，也可以加入混战地图进行对战。任何玩家将从“新兵”级别加入游戏，通过不断升级，可以获得上尉、少校、中将、元帅等军衔，通过团队配合，您将获得更快的提升。';
    if (_t.length > 120) {
        _t = _t.substr(0, 117) + '...';
    }
    _t = encodeURI(_t);
    var _u = '//share.v.t.qq.com/index.php?c=share&a=index&url=' + _url + '&appkey=' + _appkey + '&pic=' + _pic + '&assname=' + _assname + '&title=' + _t;
    window.open(_u, '', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no');
}