var poll_id = 0, poll_answer_id = "", is_being_voted = false;
pollsL10n.show_loading = parseInt(pollsL10n.show_loading, 10);
pollsL10n.show_fading  = parseInt(pollsL10n.show_fading, 10);
function poll_vote(a) {

  if (is_being_voted) {
    alert(pollsL10n.text_wait);
  } else {
    set_is_being_voted(true);
    poll_id = a;
    poll_answer_id = "";
    poll_multiple_ans_count = poll_multiple_ans = 0;
    if (jQuery("#poll_multiple_ans_" + poll_id).length) {
      poll_multiple_ans = parseInt(jQuery("#poll_multiple_ans_" + poll_id).val(), 10);
    }
    jQuery("#polls_form_" + poll_id + " input:checkbox, #polls_form_" + poll_id + " input:radio").each(function(){
      if (jQuery(this).is(":checked"))if(poll_multiple_ans>0) {
        poll_answer_id = jQuery(this).val()+","+poll_answer_id;
        poll_multiple_ans_count++;
      } else  {
        poll_answer_id = parseInt(jQuery(this).val());
      }
    });
    if (poll_multiple_ans>0)if(poll_multiple_ans_count>0&&poll_multiple_ans_count<=poll_multiple_ans){
      poll_answer_id=poll_answer_id.substring(0,poll_answer_id.length-1);
      poll_process()
    }else if(poll_multiple_ans_count==0){
      set_is_being_voted(false);
      alert(pollsL10n.text_valid)
    }else{
      set_is_being_voted(false);
      alert(pollsL10n.text_multiple+" "+poll_multiple_ans)
    }else if(poll_answer_id>0)poll_process();
    else{
      set_is_being_voted(false);
      alert(pollsL10n.text_valid)
    }
  }
  
}
function polls_loading_show() { //jQuery("#polls-"+poll_id+"-loading").show()
  var inputs = jQuery('#polls-' + poll_id + '-ans').find('input');
  for (var a = 0; a < inputs.length; a++) {
    var input = jQuery(inputs[a]);
    delete customInputs[input.attr('id')];
  }
  var $pollDiv = jQuery("#polls-"+poll_id);
  var $loadImg = jQuery("#polls-"+poll_id+"-loading").children('img').attr('src');
  var h = $pollDiv.height();
  var w = $pollDiv.width();
  $pollDiv.html('').width(w).height(h).css('background', 'url( ' + $loadImg + ') center center no-repeat').css('opacity', 1);
  return true;
}
function poll_process(){
  if(pollsL10n.show_fading)jQuery("#polls-"+poll_id).fadeTo("def",0,function(){
    pollsL10n.show_loading&&polls_loading_show();
    jQuery.ajax({
      type:"POST",
      url:pollsL10n.ajax_url,
      data:"vote=true&poll_id="+poll_id+"&poll_"+poll_id+"="+poll_answer_id,
      cache:false,
      success:poll_process_success
    })
  });
  else{
    pollsL10n.show_loading&&polls_loading_show();
    jQuery.ajax({
      type:"POST",
      url:pollsL10n.ajax_url,
      data:"vote=true&poll_id="+poll_id+"&poll_"+poll_id+
      "="+poll_answer_id,
      cache:false,
      success:poll_process_success
    })
  }
}
function poll_result(a){
  var q = tnk_wp_polls_links[a];
  q.voted = getCookie(q.cname) == undefined ? 0 : 1;
  if (!q.voted) {
    var res = q.result.replace('pollQuestion', 'pollQuestion active').replace('class="wp-polls-ans"', 'class="wp-polls-ans" style="display:block;"');      
    jQuery("#polls-"+a).fadeTo(250,0,function(){
      jQuery("#polls-"+a).replaceWith(res);
      if (jQuery('#polls_list').length == 0) { // we're not in archive
        polls_slide();
      }
      jQuery("#polls-"+a+"-loading").replaceWith('');
      reform_ans('#polls-' + a + '-ans > ul > li > div.pollbar');
    });
    
  } else {  
    if(is_being_voted)alert(pollsL10n.text_wait);
    else{
      set_is_being_voted(true);
      poll_id=a;
      if(pollsL10n.show_fading)jQuery("#polls-"+poll_id).fadeTo("def",0,function(){
        pollsL10n.show_loading&&polls_loading_show();
        jQuery.ajax({
          type:"GET",
          url:pollsL10n.ajax_url,
          data:"pollresult="+poll_id,
          cache:false,
          success:poll_process_success
        })
      });
      else{
        pollsL10n.show_loading&&polls_loading_show();
        jQuery.ajax({
          type:"GET",
          url:pollsL10n.ajax_url,
          data:"pollresult="+
          poll_id,
          cache:false,
          success:poll_process_success
        })
      }
    }  
  }
}
function poll_booth(a){
  var q = tnk_wp_polls_links[a];
  q.voted = getCookie(q.cname) == undefined ? 0 : 1;
  if (!q.voted) {
    var res = q.vote.replace('pollQuestion', 'pollQuestion active').replace('class="wp-polls-ans"', 'class="wp-polls-ans" style="display:block;"');
    
    jQuery("#polls-"+a).fadeTo(250,0,function(){
      jQuery("#polls-"+a).replaceWith(res);
      if (jQuery('#polls_list').length == 0) { // we're not in archive
        polls_slide();
      }
      var inputs = jQuery('#polls-' + a + '-ans').find('input');
      for (var j = 0; j < inputs.length; j++) {
        var input = jQuery(inputs[j]);
        delete customInputs[input.attr('id')];
      }
      jQuery("#polls-"+a+"-loading").replaceWith('');      
      customInputsF(20); 
      if (bDAMN){      
        DD_belatedPNG.fix('*');
      }
    });
  } else {  
    if(is_being_voted)alert(pollsL10n.text_wait);
    else{
      set_is_being_voted(true);
      poll_id=a;
      if(pollsL10n.show_fading)jQuery("#polls-"+poll_id).fadeTo("def",0,function(){
        pollsL10n.show_loading&&polls_loading_show();
        jQuery.ajax({
          type:"GET",
          url:pollsL10n.ajax_url,
          data:"pollbooth="+poll_id,
          cache:false,
          success:poll_process_success
        })
      });
      else{
        pollsL10n.show_loading&&polls_loading_show();
        jQuery.ajax({
          type:"GET",
          url:pollsL10n.ajax_url,
          data:"pollbooth="+
          poll_id,
          cache:false,
          success:poll_process_success
        })
      }
    }
  }
}
function poll_process_success(a){
  var b = a.replace('pollQuestion', 'pollQuestion active').replace('class="wp-polls-ans"', 'class="wp-polls-ans" style="display:block;"');
  jQuery("#polls-"+poll_id).replaceWith(b);
  pollsL10n.show_loading&&jQuery("#polls-"+poll_id+"-loading").hide();
  pollsL10n.show_fading?jQuery("#polls-"+poll_id).fadeTo("def",1,function(){
    set_is_being_voted(false)
  }):set_is_being_voted(false);

  if (jQuery('#polls_list').length == 0) { // we're not in archive
    polls_slide();
  }
  customInputsF(20);
  if (bDAMN){      
    DD_belatedPNG.fix('*');
  }
  reform_ans('#polls-' + poll_id + '-ans > ul > li > div.pollbar');
}
function set_is_being_voted(a){
  is_being_voted=a
};