// Modal Login, SignUp
function modalOpen() {
    $document.find('body').addClass('modal-open');
}

$(document).on("hidden.bs.modal",".sub-modal.modal", function () {
    $("body").addClass("modal-open");
});
console.log("LIB");

// Active Class in All navbar
$(document).ready(function() {
  console.log("readt");
  $(".nav a").on("click", function(){
    console.log("okkkk");
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
  if($(event.target).parents('.parents-well').length > 0) {
    //event.stopPropagation();
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
var ratingObject1 = (function() {
  return {
    removeBorderLineReview: function() {
      $('.ratingReview').find("span").attr("style","outline: none !important");
    }
  }
})(ratingObject1 || {})
// Not used yet
// var searchObject = (function() {
//     return {
//       popoverType: function() {
//         $('#popover').popover({ 
//             html : true,
//             title: function() {
//               return $("#popover-head").html();
//             },
//             content: function() {
//               return $("#popover-content").html();
//             }
//         });
//       },
//       hideSearchType: function() {
//         var divToHide = document.getElementsByClassName('well-lg');
//         document.onclick = function(e){
//             if(e.target.class !== 'well-lg'){
//               //element clicked wasn't the div; hide the div
//               divToHide.style.display = 'none';
//             }
//           };
//       }
//     }
  
//   })(searchObject||{})

  