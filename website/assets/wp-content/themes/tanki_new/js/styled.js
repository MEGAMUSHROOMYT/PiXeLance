document.write('<style type="text/css">/*input.styled { display: none; }*/ .disabled { opacity: 0.5; filter: alpha(opacity=50); }</style>');
var customInputs = [];
function customInputsF(cHeight){ 
  var inputs = jQuery('input.styled');

  for (var a = 0; a < inputs.length; a++) {
    var input = jQuery(inputs[a]);

    if (input.hasClass('styled') && customInputs[input.attr('id')] == undefined){
      input.css('display','none');
      input.parentLi = input.parent('li');
      input.type     = input.attr('type');
      input.cHeight  = cHeight || 20;
      input.group    = inputs;
      input.before('<span class="'+input.type+'"></span>');
      input.span     = input.parentLi.children('span');
      input.label    = input.parentLi.children('label');
      if (input.attr('checked') == 'checked') {
        input.span.css('backgroundPosition', '0 -' + input.cHeight*2 + 'px');
      }

      input.parentLi.wrapInner('<div style="display: inline;"/>');

      input.div = input.parent('div');
      input.unbind('change').change(function(){
        clear(this);
      });
      customInputs[input.attr('id')] = {};
      customInputs[input.attr('id')] = input;
      var ph = input.parentLi.height();
      var sh = input.span.height();
      if (ph > sh) {
        var dh = ph - sh - 4;
        input.span.css('margin-bottom', dh+'px');
      }
      if(!input.attr('disabled')) {
        input.div.unbind('mouseenter mouseleave').hover(function(){
          overed(this);
        }, function(){
          clear (this);
        });
        input.div.unbind('click').click(function(){
          check (this);
        });
      } else {
        input.span.addClass('disabled');
      }
    }
  }

  function getInput(obj){
    var id = jQuery(obj).children('input').attr('id') || false;
    return customInputs[id] || false;
  }

  function clear(obj){
    var input = getInput(obj);
    if (input) {
      if (input.attr('checked') == 'checked') {
        input.span.css('backgroundPosition','0 -' + input.cHeight*2 + 'px');
      } else {
        input.span.css('backgroundPosition','0 0');
      }
    }
  }

  function overed(obj){
    var input = getInput(obj);
    if (input.attr('checked') == 'checked') {
      input.span.css('backgroundPosition','0 -' + input.cHeight*3 + 'px');
    } else {
      input.span.css('backgroundPosition','0 -' + input.cHeight + 'px');
    }
  }
  function check(obj){
    var input = getInput(obj);
    if (input) {
      if(input.attr('checked') == 'checked' && input.type == 'checkbox') {
        input.span.css('backgroundPosition','0 0');
        input.attr('checked', false);
      } else {
        input.span.css('backgroundPosition','0 -' + input.cHeight*2 + 'px');
        input.attr('checked', 'checked');
        if (input.type == 'radio') {
          for(var a = 0; a < input.group.length; a++) {
            var inp =  jQuery(input.group[a]);
            if (inp.hasClass('styled') && inp.attr('id')!= input.attr('id')) {
              inp.parent('div').children('span').css('backgroundPosition','0 0');
              inp.attr('checked', false);
            }
          }
        }
      }
      customInputs[input.attr('id')] = input;
    }
  }
}