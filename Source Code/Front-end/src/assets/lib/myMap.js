var map;
var directionsDisplay;
var directionsService;
var geocoder;
var addressList;
console.log("myMAP111");
// Get Direction from Current Location to Marker
function calculateAndDisplayRoute (directionsService, directionsDisplay, pointA, pointB) {
    var request = {
        origin: pointA.position,
        destination: pointB.position,
        avoidTolls: true,
        avoidHighways: false,
        travelMode: 'DRIVING'
    };
    directionsService.route(request, function(result, status) {
        if (status == 'OK') {
              directionsDisplay.setDirections(result);
        }
    });
};
// // Get Address List from API 
// function getAddressList(addressListFromHttpRequest) {
//     //To Do
//     console.log("getAddressList in myMap.js works");
//     console.log(addressListFromHttpRequest);
//     if(addressListFromHttpRequest != null) {
//         addressList = addressListFromHttpRequest;
//     }
//     console.log("addressList: ", addressList);
// }

////////////////////////////
// Initiallize Map Object 
var mapObject = (function() {
    return {    
        initMap1: function() {
            // For Geocoding Service
            geocoder = new google.maps.Geocoder();
            /////////////////////////
            var broadway = {
                info: '<strong>The Coffee House</strong><br>\
                249 Lý Thường Kiệt, Phường 15, Quận 10, Hồ Chí Minh, Vietnam<br>\
                            <a href="https://goo.gl/maps/LcwmVgE5j7o">Get Directions</a>',
                lat: 10.7718488,
                long: 106.6554608
            };

            var belmont = {
                info: '<strong>Urban Station Bàu Cát</strong><br>\
                172 Bàu Cát, phường 14, Tân Bình, phường 14 Tân Bình Hồ Chí Minh, Vietnam<br>\
                            <a href="https://goo.gl/maps/Jmgg7QaRFqQ2">Get Directions</a>',
                lat: 10.7918265,
                long: 106.6413898
            };

            var sheridan = {
                info: '<strong>Coffee Mộc Cửu Long</strong><br>\r\
                B7 bis Cửu Long, Phường 15, Quận 10, Hồ Chí Minh, Vietnam<br>\
                            <a href="https://goo.gl/maps/JbcioQwFyco">Get Directions</a>',
                lat: 10.7824929,
                long: 106.6594821
            };
            var locations = [];
            locations = [
                [broadway.info, broadway.lat, broadway.long, 0],
                [belmont.info, belmont.lat, belmont.long, 1],
                [sheridan.info, sheridan.lat, sheridan.long, 2],
            ];
            // addressList.forEach(element => {
            //     locations.push(element);
            // });
            // console.log(locations);
            
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 11,
                center: new google.maps.LatLng(10.7718488, 106.6554608),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            
            var infoWindow = new google.maps.InfoWindow({});
            var marker, i, y;
            /////////////////////////////////////////
            // Try HTML5 geolocation.
            var currentMarker;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                // infoWindow.setPosition(pos);
                // infoWindow.setContent('Vị Trí của Bạn');
                // infoWindow.open(map);
                // Current Location
                var pinCurrentLocationImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + "4db8ff");
                currentMarkerTemp = new google.maps.Marker({
                    position: new google.maps.LatLng(pos.lat, pos.lng),
                    // position: new google.maps.LatLng(10.7684461, 106.6476876),
                    map: map,
                    icon: pinCurrentLocationImage,
                    animation: google.maps.Animation.DROP,
                }); 

                currentMarker = currentMarkerTemp;
               
                // google.maps.event.addListener(marker, 'click', (function (marker, i) {
                //     return function () {
                //         //infoWindow.setContent(locations[i][0]);
                //         //infoWindow.open(map, marker);
                //     }
                // })(marker, i));

                map.setCenter(pos);
                }, function() {
                     handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
                alert("Browser doesn't support Geolocation");
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }
            ///////////////////////////////////////
            // Direction Service
            var directionsDisplay = new google.maps.DirectionsRenderer({map: map});
            var directionsService = new google.maps.DirectionsService();
            //////////////////////////
            //addressList.forEach(element => {
                // GeoCoding
                
                // geocoder.geocode( { 'address': element}, function(results, status) {
                //     if (status == 'OK') {
                //         console.log("44444");

                //       //map.setCenter(results[0].geometry.location);
                //       marker = new google.maps.Marker({
                //             map: map,
                //             position: results[0].geometry.location,
                //             animation: google.maps.Animation.DROP,
                //       });
                //     } else {
                //       alert('Geocode was not successful for the following reason: ' + status);
                //     }
                //   });
//            });
            // console.log()
            // google.maps.event.addListener(marker, 'click', (function (marker, i) {
            //     return function () {
            //          // get route from A to B
            //         calculateAndDisplayRoute(directionsService, directionsDisplay, marker, currentMarker);
            //         infoWindow.setContent(locations[i][0]);
            //         infoWindow.open(map, marker);
            //     }
            // })(marker, i));
            for(y = 0; y < addressList.length; y++) {
                geocoder.geocode( { 'address': addressList[y]}, function(results, status) {
                    if (status == 'OK') {
                        marker = new google.maps.Marker({
                                map: map,
                                position: results[0].geometry.location,
                                animation: google.maps.Animation.DROP,
                        });
                        
                        google.maps.event.addListener(marker, 'click', (function (marker, y) {
                            return function () {
                                 // get route from A to B
                                calculateAndDisplayRoute(directionsService, directionsDisplay, marker, currentMarker);
                               infoWindow.setContent(results[0].formatted_address);
                               infoWindow.open(map, marker);
                            }
                        })(marker, y));

                    } else {
                      alert('Geocode was not successful for the following reason: ' + status);
                    }
            });
            //for (i = 0; i < locations.length; i++) {
                // GeoCoding
                // geocoder.geocode( { 'address': locations[i]}, function(results, status) {
                //     if (status == 'OK') {
                //       //map.setCenter(results[0].geometry.location);
                //       var marker = new google.maps.Marker({
                //             map: map,
                //             position: results[0].geometry.location,
                //             animation: google.maps.Animation.DROP,
                //       });
                //       console.log(results);
                //     } else {
                //       alert('Geocode was not successful for the following reason: ' + status);
                //     }
                //   });

                // marker = new google.maps.Marker({
                //     position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                //     map: map,
                //     animation: google.maps.Animation.DROP,
                // });

                
                //console.log("marker: ",marker);
                ///////////////
                // console.log("i trong for: ", i);
                // google.maps.event.addListener(marker, 'click', (function (marker, i) {
                //     return function () {
                //          // get route from A to B
                //          console.log("Marker: ", marker);
                //          console.log("i:  ", i);
                //         calculateAndDisplayRoute(directionsService, directionsDisplay, marker, currentMarker);
                //         infoWindow.setContent(locations[i][0]);
                //         infoWindow.open(map, marker);
                //     }
                // })(marker, i));
            }
        },
        // Get Address Array from Service 
        getAddressList: function(addressListFromHttpRequest) {
            //To Do
            console.log("addressListFromHttpRequest: ", addressListFromHttpRequest);
            addressList = [];
            if(addressListFromHttpRequest != null) {
                addressListFromHttpRequest.forEach(element => {
                   addressList.push(element.address);
                });
            }
        }
    }
})(mapObject || {})

// For Geocoding Service
// function codeAddress() {
//     var address = document.getElementById('address').value;
//     geocoder.geocode( { 'address': address}, function(results, status) {
//         console.log("aaaaa");
//       if (status == 'OK') {
//         console.log("bbbbbb");
//         // map.setCenter(results[0].geometry.location);
//         var marker = new google.maps.Marker({
//             map: map,
//             position: results[0].geometry.location
//         });
//         console.log("ccccc");
//       } else {
//         console.log("ddddd");
//         alert('Geocode was not successful for the following reason: ' + status);
//       }
//     });
//   }
///////////////////////
function handleLocationError (browserHasGeolocation, infoWindow, pos) {
    console.log("handleLocationError works");
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                  'Error: The Geolocation service failed.' :
                  'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);    
}
// function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
//     console.log("calculate");
//     var request = {
//         origin: pointA,
//         destination: pointB,
//         avoidTolls: true,
//         avoidHighways: false,
//         travelMode: google.maps.TravelMode.DRIVING
//     };
//     console.log(request);
//     directionsService.route(request, function (response, status) {
        
//         if (status == google.maps.DirectionsStatus.OK) {
//             directionsDisplay.setDirections(response);
//         } else {
//             window.alert('Directions request failed due to ' + status);
//         }
//     });
// }

// function handleLocationError (browserHasGeolocation, infoWindow, pos) {
    
//     infoWindow.setPosition(pos);
//     infoWindow.setContent(browserHasGeolocation ?
//                   'Error: The Geolocation service failed.' :
//                   'Error: Your browser doesn\'t support geolocation.');
//     infoWindow.open(map);    
// }

// function initMap() {
//     alert("initMapavwâ function works");
//     var broadway = {
//         info: '<strong>Chipotle on Broadway</strong><br>\
//                     5224 N Broadway St<br> Chicago, IL 60640<br>\
//                     <a href="https://goo.gl/maps/jKNEDz4SyyH2">Get Directions</a>',
//         lat: 41.976816,
//         long: -87.659916
//     };

//     var belmont = {
//         info: '<strong>Chipotle on Belmont</strong><br>\
//                     1025 W Belmont Ave<br> Chicago, IL 60657<br>\
//                     <a href="https://goo.gl/maps/PHfsWTvgKa92">Get Directions</a>',
//         lat: 41.939670,
//         long: -87.655167
//     };

//     var sheridan = {
//         info: '<strong>Chipotle on Sheridan</strong><br>\r\
//                     6600 N Sheridan Rd<br> Chicago, IL 60626<br>\
//                     <a href="https://goo.gl/maps/QGUrqZPsYp92">Get Directions</a>',
//         lat: 42.002707,
//         long: -87.661236
//     };
    
//     var locations = [
//         [broadway.info, broadway.lat, broadway.long, 0],
//         [belmont.info, belmont.lat, belmont.long, 1],
//         [sheridan.info, sheridan.lat, sheridan.long, 2],
//         ];
//     console.log("1111");
//     var map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 13,
//         center: new google.maps.LatLng(41.976816, -87.659916),
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//     });
//     console.log("22222");
    
//     var infowindow = new google.maps.InfoWindow({});

//     var marker, i;
//     console.log("3333");

//     for (i = 0; i < locations.length; i++) {
//         marker = new google.maps.Marker({
//             position: new google.maps.LatLng(locations[i][1], locations[i][2]),
//             map: map
//         });

//         google.maps.event.addListener(marker, 'click', (function (marker, i) {
//             return function () {
//                 infowindow.setContent(locations[i][0]);
//                 infowindow.open(map, marker);
//             }
//         })(marker, i));
//     }
//     console.log("44444");
    
// }