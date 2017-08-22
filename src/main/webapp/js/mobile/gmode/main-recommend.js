"use strict"

var noEventView = $('.rec-no-event'),
yesEventView = $('.rec-yes-event'),
noMemberView = $('.rec-no-member'),
noDataView = $('.rec-no-data');

var isRecommandEvent = true;

showRecommandList();
displayRecommandByEventMusiList();
displayBestReviewMusiList();
displayPopularMusiList();
displayMostPopularCategoryList();

function displayRecommandByEventMusiList() {
  $.getJSON('/musician/listRecommand.json', function(result) {
    if(result.status != 'success') {
      console.error("getJSON() 실패: ", result.status)
      return;
    }

    if(result.data == "browse" || result.data == "noEvent") {
      hideRecommandList(result.data)
      return;
    }
    
    $.each(result.data.listRecommand, function(i, item) {
      var starInteger = parseInt(item.score),
      starRealNumber = item.score - starInteger;
      starAdd(starInteger, starRealNumber, item)
      heartAdd(item)
    });

    var templateFn = Handlebars.compile($('#rec-by-event-musi-template').text())
    var generatedHTML = templateFn(result.data)
    var container = $('#rec-by-event-musi-container')
    var html = container.html()
    container.html(html + generatedHTML)

    $('.rec-by-event-musi-click').on('click', function() {
      location.href = 'musi-info/index.html?no=' + $(this).attr('data-no')
    })
    
    $('.rec-by-event-musi-fav').on('click', function() {
      var isFavorite = heartChange($(this).html())
      $(this).html(isFavorite)
    })
    
    /*initialize swiper when document ready*/
    $(document).ready(function () {
      var mySwiper = new Swiper ('.swiper-container', {
        pagination: '.swiper-pagination',
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 30,
        slidesPerView: 'auto',
        cssWidthAndHeight: true,
        paginationType: 'bullets',
        paginationElement: 'span'
      });
    });//initialize swiper ended
  }, function(err) {
    console.log(err)
  })
}


function showRecommandList() {
  noEventView.hide()
  yesEventView.show()
}
function hideRecommandList(state) {
  yesEventView.hide()
  
  if(state == "browse") noMemberView.show()
  else if(state == "noEvent") noDataView.show()
}


function displayBestReviewMusiList() {
  $.getJSON('/musician/listBestReview.json', function(result) {
    if(result.status != 'success') {
      console.error("getJSON() 실패: ", result.status)
      return;
    }
    
    $.each(result.data.listBestReview, function(i, item) {
      var starInteger = parseInt(item.score),
      starRealNumber = item.score - starInteger;
      starAdd(starInteger, starRealNumber, item)
    });
    
    var templateFn = Handlebars.compile($('#rec-best-review-musi-template').text())
    var generatedHTML = templateFn(result.data)
    var container = $('#rec-best-review-musi-container')
    var html = container.html()
    container.html(html + generatedHTML)
    
    $('.rec-best-review').on('click', function() {
      location.href = 'musi-info/index.html?no=' + $(this).attr('data-no')
    })
  }, function(err) {
    console.log(err)
  })
}

function displayMostPopularCategoryList() {
  $.getJSON('/category/listTop10.json', function(result) {
    if(result.status != 'success') {
      console.error("getJSON() 실패: ", result.status)
      return;
    }
    
    var templateFn = Handlebars.compile($('#rec-most-popular-category-template').text())
    var generatedHTML = templateFn(result.data)
    var container = $('#rec-most-popular-category-container')
    var html = container.html()
    container.html(html + generatedHTML)
    
    console.log(result.data)
  }, function(err) {
    console.log(err)
  })
}

function displayPopularMusiList() {
  $.getJSON('/musician/listPopular.json', function(result) {
    if(result.status != 'success') {
      console.error("getJSON() 실패: ", result.status)
      return;
    }
    
    $.each(result.data.listPopular, function(i, item) {
      var starInteger = parseInt(item.score),
      starRealNumber = item.score - starInteger;
      starAdd(starInteger, starRealNumber, item)
      heartAdd(item)
    });
    
    var templateFn = Handlebars.compile($('#rec-popular-musi-template').text())
    var generatedHTML = templateFn(result.data)
    var container = $('#rec-popular-musi-container')
    var html = container.html()
    container.html(html + generatedHTML)
    
        
    $('.rec-popular-musi').on('click', function() {
      location.href = 'musi-info/index.html?no=' + $(this).attr('data-no')
    })
  }, function(err) {
    console.log(err)
  })
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


function heartChange(isFavorite) {
  if (isFavorite == '<i class="fa fa-heart" aria-hidden="true"></i>') {
    isFavorite = '<i class="fa fa-heart-o" aria-hidden="true"></i>'
  } else {
    isFavorite = '<i class="fa fa-heart" aria-hidden="true"></i>'
  }
  return isFavorite;
}

