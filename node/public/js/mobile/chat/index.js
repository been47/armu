"use strict"

HandlebarsIntl.registerWith(Handlebars);


$(document).ready(function() {
  $(".animsition").animsition({
    inClass: 'fade-in-up',
    outClass: 'fade-out-down',
    inDuration: 500,
    outDuration: 700,
    linkElement: '.animsition-link',
    // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
    loading: true,
    loadingParentElement: 'body', //animsition wrapper element
    loadingClass: 'animsition-loading',
    loadingInner: '', // e.g '<img src="loading.svg" />'
    timeout: false,
    timeoutCountdown: 5000,
    onLoadEvent: true,
    browser: [ 'animation-duration', '-webkit-animation-duration'],
    // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
    // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
    overlay : false,
    overlayClass : 'animsition-overlay-slide',
    overlayParentElement : 'body',
    transition: function(url){ window.location.href = url; }
  });

//	$('.chat-header-close-btn').click(function(){
//		parent.history.back();
//		return false;
//	});


// displayList()

});



function displayList() {

  $.getJSON('/chat/list.json', function(result) {
    if(result.status != 'success') {
      console.error("getJSON() 실패: ", result.status)
      return;
    }



    var totalUnread = 0;
    $.each(result.data.list, function(i, item) {
      totalUnread += item.unread
    });
    $('#total-unread').text(totalUnread + '개')
    var templateFn = Handlebars.compile($('#list-template').text())
    var generatedHTML = templateFn(result.data)
    var container = $('#list-container')
    var html = container.html()
    container.html(html + generatedHTML)
    container.listview("refresh")

    var chatList = $('.chat-list')

    $.each(chatList, function(i, item) {
      $(item).on('click', function() {
        location.href = $(item).attr('data-href')
      })
    })


  }, function(err) {
    console.log(err)
  })

}
