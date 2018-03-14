console.log("load LIB");
  $('.well-search-type').hide();
  $('.well-search-area').hide();

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
      console.log("hide JS works works");
      $('.well-search-type').hide();
      $('.well-search-area').hide();
    }
  }
})(searchObject || {})
// For Collapse Search with Checkbox 
$(document).click(function(event) { 
  console.log("click!!!!!");
  if($(event.target).parents('.parents-well').length > 0) {
    //event.stopPropagation();
    return;
  }
  // For Search Type
  if($(event.target).closest('#searchTypeParents').length != 0) {
    console.log('well-search-type display: ', $('.well-search-type').css('display'));
    if($('.well-search-type').css('display') == 'none' || $('.well-search-type').css('display') == '') {
      console.log('well-search-type: ', $('.well-search-type'));
      $('.well-search-type').show();
    }
    else {
      $('.well-search-type').hide();
    }
  } 
  if($(event.target).closest('#searchTypeParents').length  == 0 ) {
    $('.well-search-type').hide();
  }
  //For Search Bar
  if($(event.target).closest('#searchBarParents').length != 0 && !$(event.target).is(".glyphicon-search")) {
    if($('.well-search-area').css('display') == 'none' || $('.well-search-area').css('display') == '' ) {
      if(!$(event.target).is(".searchBar__byName")) {
        $('.well-search-area').show();
      }
    }
    else {
      $('.well-search-area').hide();
    }
  } 
  if($(event.target).closest('#searchBarParents').length == 0) {
    $('.well-search-area').hide();
  }
});

// For Rating Component
var ratingObject = (function() {
  return {
    removeBorderLine: function() {
      // console.log("removeBorderLine works");
      $('.sr-only').remove();
      // console.log($('.ratingElement'));
      $('.ratingElement').find("span").attr("style","outline: none !important");
    }
  }
})(ratingObject || {})

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

  