"use strict"
$('.loader-box').show()

var surfBackscreen = $("#surf-backscreen"),
    container = $("#container"),
    filterContainer = $("#filter-container"),
    musicianSurfSort = $("#musician-surf-sort")

displaySurfEventList()
HandlebarsIntl.registerWith(Handlebars);
getLocation()
filter()
filterMajor()
filterGenre()

function displaySurfEventList() {
  $.getJSON('/event/listSurf.json', function(result) {
    var templateFn = Handlebars.compile($('#event-surf-template').text())
    var generatedHTML = templateFn(result.data)
    var container = $('#event-surf-container')
    var html = container.html()
    $('.loader-box').fadeOut(300)
    container.html(html + generatedHTML).hide().fadeIn(700)
    $('.event-surf').on('click', function() {
    	location.href = '/mobile/musimode/event/detail.html?no=' + $(this).attr('data-no')
	})
  })
}
$('body').on('click', ".filterBtn", function() {
  surfBackscreen.css('display', 'block')
  container.css('position', 'fixed')
  filterContainer.toggle('display', 'block')
  $("#location-check-btn").toggle('display', 'block')
})

$('body').on('click', "#location-check-cancel", function() {
  surfBackscreen.css('display', 'none')
  container.css('position', 'relative')
  filterContainer.toggle('display', 'none')
  $("#location-check-btn").toggle('display', 'none')
})

$('body').on('click', "#location-check-check", function() {
  $("#filter-select-text").html("")
  $("input[name=location]:checked").each(function() {
    locationName = $("label[for='"+$(this).attr('id') +"']").text()
    $("#filter-select-text").append("<span class='selectSpan'>" + locationName + "</span>")
  });

  surfBackscreen.css('display', 'none')
  container.css('position', 'relative')
  filterContainer.toggle(0)
  $("#location-check-btn").toggle(0)
})


$('#filter-theme').click(function() {
  $('#main-surf').on('scroll touchmove mousewheel', function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
 });
  $('#filter-thm-backscreen').css('display','block')
  $('#filter-thm-toggle').css('visibility','visible')
})

$('#filter-thm-backscreen').click(function() {
  $('#main-surf').off('scroll touchmove mousewheel')
  $('#filter-thm-backscreen').css('display','none')
  $('#filter-thm-toggle').css('visibility','hidden')
})

$('#filter-major').click(function() {
  $('#main-surf').on('scroll touchmove mousewheel', function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
 });
  $('#filter-mjr-backscreen').css('display','block')
  $('#filter-mjr-toggle').css('visibility','visible')
})

$('#filter-mjr-backscreen').click(function() {
  $('#main-surf').off('scroll touchmove mousewheel')
  $('#filter-mjr-backscreen').css('display','none')
  $('#filter-mjr-toggle').css('visibility','hidden')
})

$('#filter-genre').click(function() {
  $('#main-surf').on('scroll touchmove mousewheel', function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
 });
  $('#filter-gen-backscreen').css('display','block')
  $('#filter-gen-toggle').css('visibility','visible')
})

$('#filter-gen-backscreen').click(function() {
  $('#main-surf').off('scroll touchmove mousewheel')
  $('#filter-gen-backscreen').css('display','none')
  $('#filter-gen-toggle').css('visibility','hidden')
})

function getLocation() {
  $.getJSON('/category/listLocationType.json', function(result) {
//    console.log(result)
    var templateFn = Handlebars.compile($('#location-type-template').text())
    var generatedHTML = templateFn(result.data)
    var container = $("#filter-container")
    var html = container.html()
    container.html(html + generatedHTML)
})
}


var theme = $('.thm'), major= $('.mjr'), genre= $('.gen')
var thmno=3000, mjrno=3000,gnrno=3000;
var indexT=1, 
indexM=1, indexG =1;
function filter() {
  $.getJSON('/category/listEventTheme.json', function(result) {
    var templateFn = Handlebars.compile($('#theme-template').text())
    var generatedHTML = templateFn(result.data)
    var container = $('#filter-thm-tab')
    var html = container.html()
    container.html(html + generatedHTML)
    
    var xScroll = new jindo.m.Scroll("filter-thm-tab", {
          bUseHScroll: true,
          bUseVScroll: false,
          bUseMomentum: false,
          nHeight: 104,
          nWidth: 980
        });
    subcon()
    function subcon() {
//      $('#filter-thm-tab:first-child').find(">:first-child").addClass('on')
      $.getJSON('/category/listEventTheme.json', function(result) {
        var templateFn = Handlebars.compile($('#theme-sub-template').text())
        var generatedHTML = templateFn(result.data)
        var container = $('#filter-thm-content')
        var html = container.html()
        container.html(html + generatedHTML)
        $(".filter-thm-sub-con").css('display','none')
//        $('.thm').first().addClass('on2').html('<img class="check-img check3" src="/image/icon/tick.png">&nbsp;'+ $('.thm').first().text())
        $('.filter-thm-sub-tab').click(function() {
          $('.filter-thm-sub-tab').removeClass('on')
          $(this).addClass('on')
          var find = $('.filter-thm-sub-con').attr('data-no')
          find = $(this).attr('data-no')
          $(".filter-thm-sub-con").css('display','none')
          $(".filter-thm-sub-con[data-no="+find+"]").css('display','table')
          indexT= find
        })
        $('#resetT').click(function() {
          if(mjrno ==3000)
            mjrno=2000
          if(gnrno ==3000)
            gnrno=2000
          thmno = $(this).attr('data-no')
//          console.log('thmno=',thmno,'mjrno=',mjrno,'gnrno=',gnrno,indexT,indexM,indexG)
          $.post('/event/searchEvent.json',
              {'thmno':thmno,
                'mjrno':mjrno, 
                'gnrno':gnrno, 
                'indexT':indexT, 
                'indexM':indexM, 
                'indexG':indexG,
                'locFilter':locFilter}, function(result) {
//                  console.log(result.data)
                  handleList(result)
              $('.event-surf').on('click', function() {
    	location.href = '/mobile/musimode/event/detail.html?no=' + $(this).attr('data-no')
	})
                },'json')
              $('.check3').remove()
              $('.thm').removeClass('on2')
        })
        $('.thm').click(function() {
          if(mjrno ==3000)
            mjrno=2000
          if(gnrno ==3000)
            gnrno=2000
          thmno = $(this).attr('data-no')
//          console.log('thmno=',thmno,'mjrno=',mjrno,'gnrno=',gnrno,indexT,indexM,indexG)
          $.post('/event/searchEvent.json',
              {'thmno':thmno,
                'mjrno':mjrno, 
                'gnrno':gnrno, 
                'indexT':indexT, 
                'indexM':indexM, 
                'indexG':indexG,
                'locFilter':locFilter}, function(result) {
//                  console.log(result.data)
                  handleList(result)
                  $('.event-surf').on('click', function() {
    	location.href = '/mobile/musimode/event/detail.html?no=' + $(this).attr('data-no')
	})
                },'json')
          $('.check3').remove()
          $('.thm').removeClass('on2')
          $(this).html('<img class="check-img check3" src="/image/icon/tick.png">'+ $(this).text())
          $(this).addClass('on2')
        })
      })
    }
  })
}

function filterMajor() {
  $.getJSON('/category/listEventMajor.json', function(result) {
    var templateFn = Handlebars.compile($('#major-template').text())
    var generatedHTML = templateFn(result.data)
    var container = $('#filter-mjr-tab')
    var html = container.html()
    container.html(html + generatedHTML)
    var xScroll = new jindo.m.Scroll("filter-mjr-tab", {
          bUseHScroll: true,
          bUseVScroll: false,
          bUseMomentum: false,
          nHeight: 104,
          nWidth: 980
        });
    subcon()

    function subcon() {
//      $('#filter-mjr-tab:first-child').find(">:first-child").addClass('on')
      $.getJSON('/category/listEventMajor.json', function(result) {
        var templateFn = Handlebars.compile($('#major-sub-template').text())
        var generatedHTML = templateFn(result.data)
        var container = $('#filter-mjr-content')
        var html = container.html()
        container.html(html + generatedHTML)
        $(".filter-mjr-sub-con").css('display','none')
//        $('.mjr').first().addClass('on2').html('<img class="check-img check1" src="/image/icon/tick.png">&nbsp;'+ $('.mjr').first().text())
        
        $('.filter-mjr-sub-tab').click(function() {
          $('.filter-mjr-sub-tab').removeClass('on')
          $(this).addClass('on')
          var find = $('.filter-mjr-sub-con').attr('data-no')
          find = $(this).attr('data-no')
          $(".filter-mjr-sub-con").css('display','none')
          $(".filter-mjr-sub-con[data-no="+find+"]").css('display','table')
          indexM= find
        })
        $('#resetM').click(function() {
          if(thmno ==3000)
            thmno=2000
          if(gnrno ==3000)
            gnrno=2000
          mjrno = $(this).attr('data-no')
//          console.log('thmno=',thmno,'mjrno=',mjrno,'gnrno=',gnrno,indexT,indexM,indexG)
          $.post('/event/searchEvent.json',
              {'thmno':thmno,
                'mjrno':mjrno, 
                'gnrno':gnrno, 
                'indexT':indexT, 
                'indexM':indexM, 
                'indexG':indexG,
                'locFilter':locFilter}, function(result) {
//                  console.log(result.data)
                  handleList(result)
              $('.event-surf').on('click', function() {
    	location.href = '/mobile/musimode/event/detail.html?no=' + $(this).attr('data-no')
	})
                },'json')
              $('.check1').remove()
              $('.mjr').removeClass('on2')
        })
        $('.mjr').click(function() {
          if(thmno ==3000)
            thmno=2000
          if(gnrno ==3000)
            gnrno=2000
          mjrno = $(this).attr('data-no')
//          console.log('thmno=',thmno,'mjrno=',mjrno,'gnrno=',gnrno,indexT,indexM,indexG)
          $.post('/event/searchEvent.json',
              {'thmno':thmno,
                'mjrno':mjrno, 
                'gnrno':gnrno, 
                'indexT':indexT, 
                'indexM':indexM, 
                'indexG':indexG,
                'locFilter':locFilter}, function(result) {
//                  console.log(result.data)
                  handleList(result)
              $('.event-surf').on('click', function() {
    	location.href = '/mobile/musimode/event/detail.html?no=' + $(this).attr('data-no')
	})
                },'json')
          $('.check1').remove()
          $('.mjr').removeClass('on2')
          $(this).html('<img class="check-img check1" src="/image/icon/tick.png">'+ $(this).text())
          $(this).addClass('on2')
        })
      })
    }
  })
}

function filterGenre() {
  $.getJSON('/category/listEventGenre.json', function(result) {
    var templateFn = Handlebars.compile($('#genre-template').text())
    var generatedHTML = templateFn(result.data)
    var container = $('#filter-gen-tab')
    var html = container.html()
    container.html(html + generatedHTML)
    $(".filter-gen-sub-tab[data-no=4]").text('재즈')
    
    var xScroll = new jindo.m.Scroll("filter-gen-tab", {
          bUseHScroll: true,
          bUseVScroll: false,
          bUseMomentum: false,
          nHeight: 104,
          nWidth: 980
        });
    subcon()

    function subcon() {
//      $('#filter-gen-tab:first-child').find(">:first-child").addClass('on')
      $.getJSON('/category/listEventGenre.json', function(result) {
        var templateFn = Handlebars.compile($('#genre-sub-template').text())
        var generatedHTML = templateFn(result.data)
        var container = $('#filter-gen-content')
        var html = container.html()
        container.html(html + generatedHTML)
        $(".filter-gen-sub-con").css('display','none')
//        $('.gen').first().addClass('on2').html('<img class="check-img check2" src="/image/icon/tick.png">&nbsp;'+ $('.gen').first().text())
        $('.event-surf').on('click', function() {
    	location.href = '/mobile/musimode/event/detail.html?no=' + $(this).attr('data-no')
	})
        $('.filter-gen-sub-tab').click(function() {
          $('.filter-gen-sub-tab').removeClass('on')
          $(this).addClass('on')
          var find = $('.filter-gen-sub-con').attr('data-no')
          find = $(this).attr('data-no')
          $(".filter-gen-sub-con").css('display','none')
          $(".filter-gen-sub-con[data-no="+find+"]").css('display','table')
          indexG = find
        })
        $('#resetG').click(function() {
          if(thmno ==3000)
            thmno=2000
          if(mjrno ==3000)
            mjrno=2000
          gnrno = $(this).attr('data-no')
//          console.log('thmno=',thmno,'mjrno=',mjrno,'gnrno=',gnrno,indexT,indexM,indexG)
          $.post('/event/searchEvent.json',
              {'thmno':thmno,
                'mjrno':mjrno, 
                'gnrno':gnrno, 
                'indexT':indexT, 
                'indexM':indexM, 
                'indexG':indexG,
                'locFilter':locFilter}, function(result) {
//                  console.log(result.data)
                  handleList(result)
              $('.event-surf').on('click', function() {
            	  location.href = '/mobile/musimode/event/detail.html?no=' + $(this).attr('data-no')
              })
                },'json')
              $('.check2').remove()
              $('.gen').removeClass('on2')
        })
        $('.gen').click(function() {
          if(thmno ==3000)
            thmno=2000
          if(mjrno ==3000)
            mjrno=2000
          gnrno = $(this).attr('data-no')
//          console.log('thmno=',thmno,'mjrno=',mjrno,'gnrno=',gnrno,indexT,indexM,indexG)
          $.post('/event/searchEvent.json',
              {'thmno':thmno,
                'mjrno':mjrno, 
                'gnrno':gnrno, 
                'indexT':indexT, 
                'indexM':indexM, 
                'indexG':indexG,
                'locFilter':locFilter}, function(result) {
//                  console.log(result.data)
                  handleList(result)
              $('.event-surf').on('click', function() {
    	location.href = '/mobile/musimode/event/detail.html?no=' + $(this).attr('data-no')
	})
                },'json')
          gnrno = $(this).attr('data-no')
          $('.check2').remove()
          $('.gen').removeClass('on2')
          $(this).html('<img class="check-img check2" src="/image/icon/tick.png">'+ $(this).text())
          $(this).addClass('on2')
        })
      })
    }
  })
}

var locFilter =["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"];
$('body').on('click', '#location-check-check', function() {
//  console.log($('input[name="location"]').val())
  locFilter= [];
  $('input:checkbox[name="location"]').each(function() {
    if(this.checked){ //checked 처리된 항목의 값
      locFilter.push(this.value)
    }
  });
  if(locFilter==false)
    locFilter =["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"];
//  console.log(locFilter)
//  console.log('thmno=',thmno,'mjrno=',mjrno,'gnrno=',gnrno,indexT,indexM,indexG)
  $.post('/event/searchEvent.json',
      {'thmno':thmno,
    'mjrno':mjrno, 
    'gnrno':gnrno, 
    'indexT':indexT, 
    'indexM':indexM, 
    'indexG':indexG,
    'locFilter':locFilter}, function(result) {
//            console.log(result.data)
      handleList(result)
    },'json')
});


function handleList(result) {
  $('.loader-box').show()
  if(result.data.listSurf==0){
    $('#no-result-view').css('display','block')
    $('#event-surf-container').css('min-height','0vh')
  } else {
    $('#no-result-view').css('display','none')
    $('#event-surf-container').css('min-height','100vh')
  }
  var templateFn = Handlebars.compile($('#event-surf-template').text())
    var generatedHTML = templateFn(result.data)
    var container = $('#event-surf-container')
    $('.loader-box').hide()
    container.html(generatedHTML).hide().fadeIn(700)
    surfBackscreen.css('display', 'none');
}


  