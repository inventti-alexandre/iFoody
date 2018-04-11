var currentPositionGlobal;
// Modal Login, SignUp
var currentLocationGlobal;

function modalOpen() {
    $document.find('body').addClass('modal-open');
}

$(document).on("hidden.bs.modal",".sub-modal.modal", function () {
    $("body").addClass("modal-open");
});

// Active Class in All navbar
$(document).ready(function() {
  // console.log("document ready");
  // if (navigator.geolocation) {
  //   console.log("in if navigator");
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     console.log("in getCurrentPosition");
  //     var pos = {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude
  //   };
  //   currentPositionGlobal = pos;
  //   console.log(pos);})
  // }
  // console.log('afterloading' ,currentPositionGlobal);
  
  $(".nav a").on("click", function(){
    $(".nav").find(".active").removeClass("active");
    $(this).parent().addClass("active");
  });
})

// Initiallize Type and Area Search -> Hidden first
var searchObject = (function() {
  return {
    hide: function() {
      $('.well-search-type').hide();
      $('.well-search-area').hide();
      $('.well-search-name').hide();
    }
  }
})(searchObject || {})

// For Collapse Search with Checkbox
$(document).click(function(event) {
  if($(event.target).parents('.parents-well').length > 0 && $(event.target).closest('#searchNameBarParents').length == 0) {
    //event.stopPropagation();
    console.log("aaaaaaaaa");
    return;
  }
  // For Search Type
  if($(event.target).closest('#searchTypeParents').length != 0) {
    if($('.well-search-type').css('display') == 'none' || $('.well-search-type').css('display') == '') {
      $('.well-search-type').show();
    }
    else {
      $('.well-search-type').hide();
    }
  }
  if($(event.target).closest('#searchTypeParents').length  == 0 ) {
    $('.well-search-type').hide();
  }

  //For Search Bar Area (Location)
  if($(event.target).closest('#searchLocationBarParents').length != 0 && !$(event.target).is(".glyphicon-search")) {
    if($('.well-search-area').css('display') == 'none' || $('.well-search-area').css('display') == '' ) {
      // if(!$(event.target).is(".searchBar__byName")) {
        $('.well-search-area').show();
      // }
    }
    else {
      $('.well-search-area').hide();
    }
  }
  if($(event.target).closest('#searchLocationBarParents').length == 0) {
    $('.well-search-area').hide();
  }

  // For Search Bar Name
  if($(event.target).closest('#searchNameBarParents').length != 0 && !$(event.target).is(".glyphicon-search")) {
    if($('.well-search-name').css('display') == 'none' || $('.well-search-name').css('display') == '' ) {
      // if(!$(event.target).is(".searchBar__byName")) {
        $('.well-search-name').show();
      // }
    }
    else {
       $('.well-search-name').hide();
    }
  }
  if($(event.target).closest('#searchNameBarParents').length == 0) {
    $('.well-search-name').hide();
  }
});

// For Rating Component
var ratingObject = (function() {
  return {
    removeBorderLine: function() {
      $('.sr-only').remove();
      $('.ratingElement').find("span").attr("style","outline: none !important");
    }
  }
})(ratingObject || {})

// Use both ratingObject and ratingObject1
var ratingObject1 = (function() {
  return {
    removeBorderLineReview: function() {
      $('.ratingReview').find("span").attr("style","outline: none !important");
    }
  }
})(ratingObject1 || {})

var favoriteObject = (function() {
  return {
    removeHTML: function(parent, id) {
      $(".favoriteList").find('#'+ id).remove();
    }
  }
})(favoriteObject || {})

var deleteImageObject = (function() {
  return {
    deleteImage: function(parent, id) {
        let newFileUpload = $('.image file-upload:last').clone();
        $(newFileUpload).attr("style", "display: block !important");
        // $(newFileUpload).insertBefore($('.image file-upload:last'));
        $(newFileUpload).insertBefore($('#' + id));
        $('.'+ parent).children('#' + id).remove();
    }
  }
})(deleteImageObject || {})

var currentLocationObject = (function() {
  return {
    get: function() {
      console.log("get current location in LIB.JS");
      if (navigator.geolocation) {
        console.log("navigator.geolocation ok");
        navigator.geolocation.getCurrentPosition(success, error);
        console.log("currentLocationGlobal -", currentLocationGlobal, "-123");
        return currentLocationGlobal;
      }
      else {
        console.log("ko vao navigator.geolocation");
      }
    }
  }
})(currentLocationObject || {})

function success(position) {
  $.ajax({
    success: setTimeout(function() {
      console.log("in callback function");
      var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        currentLocationGlobal = pos;
        console.log("pos ne: ", pos);
        return pos;
      }, 0)
    })
}

function error() {
  console.log("error");
}
