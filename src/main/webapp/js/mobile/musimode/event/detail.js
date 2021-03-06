"use strict"
HandlebarsIntl.registerWith(Handlebars);
displayEventDetail()
var eventNo = 0

function displayEventDetail() {
  $.getJSON('/event/detail.json', 
      { 
    "no" : location.href.split('?')[1].split('=')[1]
      },
      function(result) {
        var data = result.data.detail
        console.log(data)
        eventNo = data.no
        var templateFn = Handlebars.compile($('#select-event-template').text())
        var generatedHTML = templateFn(result.data)
        var container = $('#container')
        container.html(generatedHTML)

        rhsCheck(data.haveRehearsal)
        eventCheck(data)
        clickSetting()

      })
}

function rhsCheck(rhs) {
  if(rhs == false) {
    $("#event-detail-rehearsal").css('display', 'none')
    $("#event-rehearsal-container").css('display', 'none')
    return
  }

  if(rhs == true) {
    $("#event-detail-rehearsal").css('display', 'block')
    $("#event-rehearsal-container").css('display', 'block')
    return
  }
}

function eventCheck(event) {
  var prStatus = event.prStatus,
  prActive = event.prActive,
  appyStatus = event.appyStatus,
  appyActive = event.appyActive,
  btn = $(".btn"),
  eventDetail = $("#event-detail-display")

  if(appyStatus == "Z" && prStatus == "Z" && appyActive == "N" && prActive == "Z") {
    btn.addClass("acceptPrAndAppy")
    return;
  }
  
  if(appyStatus == "Z" && prStatus == "Z" && appyActive == "Z" && prActive == "Z") {
    btn.addClass("acceptPrAndAppy")
    return;
  }

  if(appyStatus == "Y") {
    btn.css("display","none")
    eventDetail.css("display", "block")
    eventDetail.append("<span class='event-display-hashtag'>매칭된 이벤트</span>")
    return
  }

  if(appyStatus == "N") {
    $(".btn").addClass("appyReject-btn")
    return
  }

  if(prStatus == "N") {
    $(".btn").addClass("prReject-btn")
    return
  }
  
  if(appyStatus == "Z" && prStatus == "Y" && appyActive == "Y" && prActive == "Y") {
    btn.html("지원<br>취소")
    btn.addClass("cancelAppy-btn")
    eventDetail.css("display", "block")
    eventDetail.append("<span class='event-display-hashtag'>지원한 이벤트</span>")
    eventDetail.append("<span class='event-display-hashtag'>지원받은 이벤트</span>")
    return;
  }
  
/*  if(appyStatus == "Z" && prStatus == "Y" && appyActive == "N" && prActive == "Y") {
    btn.addClass("acceptPrAndAppy")
    eventDetail.css("display", "block")
    eventDetail.append("<span class='event-display-hashtag'>지원받은 이벤트</span>")
    return;
  }*/

  if(prStatus == "Y" || appyActive == "Y") {
    btn.html("지원<br>취소")
    btn.addClass("cancelAppy-btn")
    eventDetail.css("display", "block")
    eventDetail.append("<span class='event-display-hashtag'>지원한 이벤트</span>")
  }

  if(prActive == "Y") { // 수락 거절 버튼 2개 뛰워야한다.
    btn.addClass("acceptPrAndAppy")
    btn.html("수락")
    $(".rejectPr").css("display", "block")
    eventDetail.css("display", "block")
    eventDetail.append("<span class='event-display-hashtag'>제안받은 이벤트</span>")
  }
  
}

function clickSetting() {
	
	$("#event-detail-header-prev").on('click', function() {
		  window.history.go(-1);
	})
	
  
  // 2. 뮤지션이 홍보(PR) 거절하기
  $(".rejectPr").on('click', function() {
	    swal({
	        title: "\n참여 요청을 거절하시겠어요?",
	        type: "warning",
	        showCancelButton: true,
	        confirmButtonColor: "lightSeaGreen",
	        confirmButtonText: "네",
	        closeOnConfirm: true,
	        cancelButtonText: "아니요"
	      },
	      function(){//확인 버튼 누르면 실행
	        $.post('/event/rejectPr.json', { 
	          'eventNo': eventNo
	        }, function(result) {
	          if(result.status != 'success') {
	            console.log('json error')
	          }

	          if(result.data == 'canceled') {//이미 취소된 pr인 경우 실행
	            swal({
	              title: "이미 뮤지션이 취소하였습니다.",
	              type: "warning",
	              showCancelButton: false,
	              confirmButtonColor: "lightseagreen",
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
  })

  // 4. 뮤지션이 이벤트에 지원(APPY)하기 && 3. 홍보(pr) 수락하기
  $(".acceptPrAndAppy").on('click', function () {
    swal({
      title: "\n이벤트에 지원하시겠습니까?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "lightseagreen",
      confirmButtonText: "네",
      closeOnConfirm: false,
      cancelButtonText: "아니요"
    },function() {
      $.post('/event/acceptPrAndAppy.json', {
        'eventNo': eventNo
      }, function(result) {
        if(result.status != 'success') {
          console.log('json error')
        }

        if(result.data == 'canceled') {//이미 취소된 pr인 경우 실행
          swal({
            title: "요청을 취소하여 \n\n수락할 수 없는 상태입니다.",
            type: "warning",
            showCancelButton: false,
            confirmButtonColor: "lightseagreen",
            confirmButtonText: "확인",
            customClass: "checkSwal"
          },
          function(){
            location.reload()
          })//swal()
        } else {//성공적으로 거절 완료한 경우 실행
          swal({
            title: "\n이벤트에 지원하였습니다.\n\n 이벤트 목록에서 확인하세요!",
            type: "success",
            showCancelButton: false,
            confirmButtonColor: "lightseagreen",
            confirmButtonText: "확인",
            customClass: "acceptCheckSwal"
          },
          function(){
            location.reload()
          })//swal()
        }
        
        if(result.status == "success") {
        }
        
      }, 'json') // 이벤트 지원 이벤트
    }) // 지원 묻는 swal
  }) // .acceptPrAndAppy
  
  // 12. 뮤지션이 지원(Appy) 취소
  $(".cancelAppy-btn").on('click', function () {
	  swal({
	        title: "\n지원 요청을 취소하시겠어요?",
	        type: "warning",
	        showCancelButton: true,
	        confirmButtonColor: "lightSeaGreen",
	        confirmButtonText: "네",
	        closeOnConfirm: true,
	        cancelButtonText: "아니요"
	      },
	      function(){//확인 버튼 누르면 실행
	        $.post('/event/cancelAppy.json', { 
	          'eventNo': eventNo
	        }, function(result) {
	        	console.log(result)
	          if(result.status != 'success') {
	            console.log('json error')
	          }

	          if(result.data == 'rejected') {//이미 거절된 pr인 경우 실행
	            swal({
	              title: "이미 뮤지션이 거절하였습니다.",
	              type: "warning",
	              showCancelButton: false,
	              confirmButtonColor: "lightseagreen",
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
  })

  // 지원요청을 거절받았을때 상황
  $(".appyReject-btn").on('click', function() {
    swal({
      title: "지원요청을 거절받은 \n\n" +
      "이벤트입니다.",
      type: "warning",
      showCancelButton: false,
      confirmButtonColor: "lightseagreen",
      confirmButtonText: "확인",
      customClass: "checkSwal"
    })
  }) // .appyReject-btn

  // 매칭요청을 거절했을때 상황
  $(".prReject-btn").on('click', function() {
    swal({
      title: "매칭요청을 거절했던 \n\n" +
      "이벤트입니다.",
      type: "warning",
      showCancelButton: false,
      confirmButtonColor: "lightseagreen",
      confirmButtonText: "확인",
      customClass: "checkSwal"
    })
  }) // .appyReject-btn
  
  
  


}

