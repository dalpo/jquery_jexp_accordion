(function($){

  $.jExpAccordion = {

    //default settings
    defaults: {
      beforeLoad: function() {},
      afterLoad: function() {},
      accordionButtonSelector: ".jExpButton",
      contentClass: "jexp-content",
      headerClass: "jexp-header",
      exploded: false,
      slideUpSpeed: "normal",
      slideDownSpeed: "normal",
      showAllLabel: "Show All",
      hideAllLabel: "Hide All",
      currentSelector: "li.current"
    }

  };

  $.fn.extend({
    jExpAccordion: function(config) {

      //hide accordion while loading...
      $(this).hide();

      //merge default options
      config = $.extend({}, $.jExpAccordion.defaults, config);

      config.beforeLoad();

      var accordionReference = $(this);

      $(config.accordionButtonSelector).html(config.showAllLabel);

      if($(this).data('accordiated')) {
        return false;
      }//????


      //hide all content elements on startup
      $.each($(this).find('ul.nested , li > .' + config.contentClass), function(){
        $(this).data('accordiated', true);//????
        $(this).hide();
      });

      $.each($(this).find('.' + config.headerClass), function(){
        //accordion element click
        $(this).click(function(e) {
          activate(e.target);
//          return false;
        });
      });

      //on jExpButton click:
      $(config.accordionButtonSelector).click(function() {
        if(config.exploded) {
          hideAll();
        } else {
          explodeAll();
        }
        return false;
      });

      var active = false;
      active = $(this).find(config.currentSelector + ' .' + config.contentClass)[0];
      if(active) {
        activate(active, 'toggle');
        $(active).parents().show();
      }

      function activate(el,effect) {
        if(config.exploded) {
          $(el).parents('li').siblings().removeClass('active').children('.' + config.contentClass).hide(config.slideUpSpeed);
          $(config.accordionButtonSelector).html(config.showAllLabel);
          config.exploded = false;
        } else {
          $(el).parents('li').toggleClass('active').siblings().removeClass('active').children('ul.nested, .' + config.contentClass).hide(config.slideUpSpeed);
          $(el).parents('li').children('.' + config.contentClass)[(effect || 'slideToggle')]((!effect)?'fast':null);
        }
      }

      function hideAll() {
        accordionReference.children('li').removeClass("active").children("."+config.contentClass).hide(config.slideUpSpeed);
        $(config.accordionButtonSelector).html(config.showAllLabel);
        config.exploded = false;
      }

      function explodeAll() {
        var list = false;
        list = accordionReference.children('li.active').siblings();
        if(!list[0]) {
          list = accordionReference.children('li').siblings();
        }
        list.addClass("active").children("."+config.contentClass).show(config.slideDownSpeed);

        $(config.accordionButtonSelector).html(config.hideAllLabel);
        config.exploded = true;
      }

      $(this).fadeIn('slow', function(){
          config.afterLoad();
      });

      

      return false;

    }

  });

})(jQuery);
