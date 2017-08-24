"use strict"
var rendercount = 0;

$(document).ready(function() {
  $(".animsition").animsition({
    inClass: 'fade-in-up',
    outClass: 'fade-out-down',
    inDuration: 500,
    outDuration: 700,
    linkElement: '.animsition-link',
    // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
    loading: false,
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
});


displayRecruitingEventList()


function displayRecruitingEventList() {
  $.getJSON('/event/listRecruiting.json', function(result) {
    if(result.status != 'success') {
      console.error("getJSON() 실패: ", result.status)
      return;
    }

    var templateFn = Handlebars.compile($('#recruiting-event-template').text())
    var generatedHTML = templateFn(result.data)
    var container = $('#recruiting-event-container')
    var html = container.html()
    container.html(html + generatedHTML)
    readyBtns()
  }, function(err) {
    console.log(err)
  })
}//displayRecruitingEventList()


function readyBtns() {

  $('.recruiting-applicant-open-btn').on('click', function(e) {
    displayAppyMusicians($(this))
  })

  $('.recruiting-callee-open-btn').on('click', function(e) {
    displayPrMusicians($(this))
  })

  $('.event-box').on('click', function(e) {
    location.href = 'detail.html?no=' + $(this).attr('data-no')
  })

}//readyBtns()



function displayAppyMusicians(pressedBtn) {
  var eventNo = pressedBtn.parent('.recruiting-musibox').attr('data-eventno')

  if(pressedBtn.attr('data-fill') == "false") {
    pressedBtn.attr('data-fill', true)

    $.getJSON('/musician/listAppy.json',
        {'eventNo': eventNo},
        function(result) {
          if(result.status != 'success') {
            console.error("getJSON() 실패: ", result.status)
            return;
          }
          
          $.each(result.data.listAppy, function(i, item) {
            var starInteger = parseInt(item.score),
            starRealNumber = item.score - starInteger;
            starAdd(starInteger, starRealNumber, item)
            heartAdd(item)
          });

          var templateFn = Handlebars.compile($('#recruiting-appy-open-template').text())
          var generatedHTML = templateFn(result.data)
          var container = pressedBtn.next().children('.recruiting-appy-open-container')
          var html = container.html()
          container.html(html + generatedHTML)

          setRejectBtns(eventNo)
          setMatchBtns(eventNo)
          setFoldBtns(pressedBtn)
        }, function(err) {
          console.log(err)
        })//getJson()
  } else {//if()
    setFoldBtns(pressedBtn)
  }//else()
}//displayAppyMusicians()


function displayPrMusicians(pressedBtn) {
  var eventNo = pressedBtn.parent('.recruiting-musibox').attr('data-eventno');

  if(pressedBtn.attr('data-fill') == "false") {
    pressedBtn.attr('data-fill', true)

    $.getJSON('/musician/listPr.json',
        {'eventNo': eventNo},
        function(result) {
          if(result.status != 'success') {
            console.error("getJSON() 실패: ", result.status)
            return;
          }

          $.each(result.data.listPr, function(i, item) {
            var starInteger = parseInt(item.score),
            starRealNumber = item.score - starInteger;
            starAdd(starInteger, starRealNumber, item)
            heartAdd(item)
          });

          var templateFn = Handlebars.compile($('#recruiting-pr-open-template').text())
          var generatedHTML = templateFn(result.data)
          var container = pressedBtn.next().children('.recruiting-pr-open-container')
          var html = container.html()
          container.html(html + generatedHTML)
          
          setCancelBtns(eventNo, pressedBtn)
          setFoldBtns(pressedBtn)
        }, function(err) {
          console.log(err)
        })//getJson()
  } else {//if()
    setFoldBtns(pressedBtn)
  }//else()
}//displayPrMusicians()





function setRejectBtns(eventNo) {
  $('.reject-btn').on('click', function() {
    var musicianNo = $(this).attr('data-no')
    swal({
      title: "이 뮤지션의 매칭요청을 \n\n거절하시겠어요?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8069ef",
      confirmButtonText: "네",
      closeOnConfirm: true,
      cancelButtonText: "아니요"
    },
    function(){//확인 버튼 누르면 실행
      $.post('/event/rejectAppy.json', {
        'musicianNo' : musicianNo,
        'eventNo' : eventNo
      }, function(result) {
        if(result.status != 'success') {
          console.error("JSON 요청 실패: ", result.status)
          return;
        }
        
        if(result.data == 'canceled') {//이미 취소된 appy인 경우 실행
          swal({
            title: "이미 뮤지션이 \n\n지원을 취소하였습니다.",
            type: "warning",
            showCancelButton: false,
            confirmButtonColor: "#8069ef",
            confirmButtonText: "확인",
            customClass: "checkSwal"
          },
          function(){
            location.reload()
          })//swal()
        } else {//성공적으로 거절 완료한 경우 실행
          location.reload()
        }
      }, 'json')
    });//swal()
  })//click event
}//setRejectBtns()


function setMatchBtns(eventNo) {
  $('.decide-btn').on('click', function() {
    var musicianNo = $(this).attr('data-no')
    swal({
      title: "매칭 후에는 취소가 불가해요. \n\n매칭을 확정하시겠어요?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8069ef",
      confirmButtonText: "네",
      closeOnConfirm: true,
      cancelButtonText: "아니요"
    },
    function(){//확인 버튼 누르면 실행
      $.post('/event/acceptAppyAndPr.json', {
        'musicianNo' : musicianNo,
        'eventNo' : eventNo
      }, function(result) {
        if(result.status != 'success') {
          console.error("JSON 요청 실패: ", result.status)
          return;
        }
        
        if(result.data != 'success') {
          swal({
            title: "매칭에 실패했습니다. \n\n다시 시도해주세요.",
            type: "warning",
            showCancelButton: false,
            confirmButtonColor: "#8069ef",
            confirmButtonText: "확인",
            customClass: "checkSwal"
          },
          function(){
            location.reload()
          })//swal()
        } else {//성공적으로 매칭 완료한 경우 실행
          var newLocation = location.href + '?tab=ongoing'
          location.href = newLocation
        }
      }, 'json')
    });//swal()
  })//click event
}//setMatchBtns()


function setCancelBtns(eventNo, pressedBtn) {
  $('.cancel-btn').on('click', function() {
    var musicianNo = $(this).attr('data-no')
    swal({
      title: "\n매칭요청을 취소하시겠어요?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8069ef",
      confirmButtonText: "네",
      closeOnConfirm: true,
      cancelButtonText: "아니요"
    },
    function(){
      $.post('/event/cancelPr.json', {
        'musicianNo' : musicianNo,
        'eventNo' : eventNo
      }, function(result) {
        if(result.status != 'success') {
          console.error("JSON 요청 실패: ", result.status)
          return;
        }
        
        location.reload()
      }, 'json')
    });//swal()
  })//click event
}//setCancelBtns()



function setFoldBtns(pressedBtn) {
  if(pressedBtn.attr('data-open') == "true") {
    pressedBtn.html('펼치기 <i class="fa fa-angle-down" aria-hidden="true"></i>')
    .attr('data-open', false)
    offMusicianClickEvents()
    setMusicianClickEvents()
  } else {
    pressedBtn.html('접기 <i class="fa fa-angle-up" aria-hidden="true"></i>')
    .attr('data-open', true)
    offMusicianClickEvents()
    setMusicianClickEvents()
  }
  pressedBtn.siblings('.recruiting-musibox-open-container').toggle( "fold", 500 );
}




function starAdd(starInteger, starRealNumber, item) {
  item.score = "";

  for (var i = 1; i <= starInteger; i++) {
    item.score += "<i class='fa fa-star' aria-hidden='true'></i>"
  }

  if(starInteger >= 5) {
    return;
  }

  if(starRealNumber >= 0.8) {
    item.score += "<i class='fa fa-star' aria-hidden='true'></i>"
  } else if(starRealNumber <= 0.3) {
    item.score += "<i class='fa fa-star-o' aria-hidden='true'></i>"
  } else {
    item.score += "<i class='fa fa-star-half-o' aria-hidden='true'></i>"
  }

  if(starInteger < 4) {
    for (var i = 1; i <= 4 - starInteger; i++) {
      item.score += "<i class='fa fa-star-o' aria-hidden='true'></i>"
    }
  }

  return item;
}


function heartAdd(item) {
  if (item.isFavorite == 1) {
    item.isFavorite = '<i class="fa fa-heart" aria-hidden="true"></i>'
  } else {
    item.isFavorite = '<i class="fa fa-heart-o" aria-hidden="true"></i>'
  }
}



function heartChange(isFavorite, pressedBtn) {
  if (isFavorite == '<i class="fa fa-heart" aria-hidden="true"></i>') {
    isFavorite = '<i class="fa fa-heart-o" aria-hidden="true"></i>'
      $.post('/musician/favorRemove.json', {
        'no': pressedBtn.attr('data-no')
        }, function(result) {
          if(result.status == 'error') {
            
          }
        }, 'json')
  } else {
    isFavorite = '<i class="fa fa-heart" aria-hidden="true"></i>'
    $.post('/musician/favorAdd.json', {
      'no': pressedBtn.attr('data-no')
      }, function(result) {}, 'json')
  }
  return isFavorite;
}


function setMusicianClickEvents() {
  $('.musician-click').on('click', function() {
    location.href = '../musi-info/index.html?no=' + $(this).attr('data-no')
  })
  
  $('.favor-click').on('click', function() {
    var pressedBtn = $(this);
    var isFavorite = heartChange(pressedBtn.html(), pressedBtn)
    pressedBtn.html(isFavorite)
  })
}

function offMusicianClickEvents() {
  $('.musician-click').off('click')
  $('.favor-click').off('click')
}





function displayOngoing() {
  var param = decodeURIComponent(location.href).split('?')[1]
  if(!param) return;

  var tab = param.split('=')[1]
  if(tab == 'ongoing') $('#event-type-ongoing-btn').trigger("click");
  
  window.history.replaceState(null, null, window.location.href.split("?")[0]);
}//displayTab()
