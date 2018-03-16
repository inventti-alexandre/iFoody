// Modal Login, SignUp
function modalOpen() {
    $document.find('body').addClass('modal-open');
}

$(document).on("hidden.bs.modal",".sub-modal.modal", function () {
    $("body").addClass("modal-open");
});

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
console.log("lib.js");
// For Collapse Search with Checkbox 
$(document).click(function(event) { 
  console.log("111");
  if($(event.target).parents('.parents-well').length > 0) {
  console.log("222");
    //event.stopPropagation();
    
    return;
  }
  // For Search Type
  if($(event.target).closest('#searchTypeParents').length != 0) {
  console.log("333");
    if($('.well-search-type').css('display') == 'none' || $('.well-search-type').css('display') == '') {
      $('.well-search-type').show();
  console.log("444");
      
    }
    else {
      console.log("555");
      $('.well-search-type').hide();
    }
  } 
  if($(event.target).closest('#searchTypeParents').length  == 0 ) {
    console.log("666");
    $('.well-search-type').hide();
  }

  //For Search Bar Area (Location)
  if($(event.target).closest('#searchLocationBarParents').length != 0 && !$(event.target).is(".glyphicon-search")) {
    if($('.well-search-area').css('display') == 'none' || $('.well-search-area').css('display') == '' ) {
      // if(!$(event.target).is(".searchBar__byName")) {
        console.log("test");
        $('.well-search-area').show();
      // }
    }
    else {
      $('.well-search-area').hide();
    }
  } 
  if($(event.target).closest('#searchLocationBarParents').length == 0) {
    console.log("hide!!!");
    $('.well-search-area').hide();
  }

  // For Search Bar Name
  if($(event.target).closest('#searchNameBarParents').length != 0 && !$(event.target).is(".glyphicon-search")) {
    if($('.well-search-name').css('display') == 'none' || $('.well-search-name').css('display') == '' ) {
      // if(!$(event.target).is(".searchBar__byName")) {
        console.log("test Name");
        $('.well-search-name').show();
      // }
    }
    else {
      $('.well-search-name').hide();
    }
  } 
  if($(event.target).closest('#searchNameBarParents').length == 0) {
    console.log("hide Name!!!");
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

  