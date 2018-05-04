var map;
var directionsDisplay;
var directionsService;
var geocoder;
var addressList;
var currentLocationImage = 'https://thumb.ibb.co/dj9Fbn/my_location_min.png';
var currentLocationGlobal;
var currentPositionGlobal;
var mainStoreImage;
var nameStore;
var addressStore;

$(document).ready(function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
      };
        currentLocationGlobal = pos;
        console.log('currentLocationGlobal', currentPositionGlobal);
      })
    }
})

// Initiallize Map Object
var mapObject = (function() {
    return {
        initMap1: function() {
            // For Geocoding Service
            geocoder = new google.maps.Geocoder();

            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 11,
                center: new google.maps.LatLng(10.761008, 106.670145),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                gestureHandling: 'greedy'
            });

            var infoWindow = new google.maps.InfoWindow({});
            var marker, i, y;

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
                    // var pinCurrentLocationImage = new google.maps.MarkerImage("https://thumb.ibb.co/dj9Fbn/my_location_min.png");
                    var pinCurrentLocationImage = new google.maps.MarkerImage(currentLocationImage);
                    currentMarker = new google.maps.Marker({
                        position: new google.maps.LatLng(pos.lat, pos.lng),
                        // position: new google.maps.LatLng(10.7684461, 106.6476876),
                        map: map,
                        icon: pinCurrentLocationImage,
                        animation: google.maps.Animation.DROP,
                    });

                    // currentMarker = currentMarkerTemp;

                    map.setCenter(new google.maps.LatLng(10.7610076, 106.6788873));
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
            
            for(y = 0; y < addressList.length; y++) {
                var myLatlng = new google.maps.LatLng(addressList[y].latitude,addressList[y].longitude);
                geocoder.geocode( { 'latLng': myLatlng}, function(results, status) {
                    if (status == 'OK') {
                            marker = new google.maps.Marker({
                                    map: map,
                                    // position: results[0].geometry.location,
                                    position: myLatlng,
                                    animation: google.maps.Animation.DROP,
                            });
                            google.maps.event.addListener(marker, 'click', (function (marker, y) {
                                return function () {
                                    // infoWindow.setContent();
                                    infoWindow.setContent(
                                        "<div style='height: 130px;width:110px;'><div style='text-align: center'><img style='height:60px;width: 100%;' src='" 
                                        + mainStoreImage + "'></div><br/><div><strong>" 
                                        + nameStore + "</strong></div><div>"
                                        + addressStore + "</div></div>"
                                    );
                                    infoWindow.open(map, marker);
                                    // get route from A to B
                                    calculateAndDisplayRoute(directionsService, directionsDisplay, marker, currentMarker);
                                }
                            })(marker, y));
                        };
                });
            }
        },
        // Get Address Array from Service
        getAddressList: function(addressListFromHttpRequest) {
            addressList = [];
            if(addressListFromHttpRequest != null) {
                addressListFromHttpRequest.forEach(element => {
                   addressList.push({latitude: parseFloat(element.latitude), longitude: parseFloat(element.longitude)});
                });
            }
        }
    }
})(mapObject || {})

// Get Direction from Current Location to Marker
function calculateAndDisplayRoute (directionsService, directionsDisplay, pointA, pointB) {
    var request = {
        origin: pointB.position,
        destination: pointA.position,
        avoidTolls: true,
        avoidHighways: false,
        travelMode: 'DRIVING'
    };
    directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            console.log("status OK");
            directionsDisplay.setDirections(result);
            directionsDisplay.setOptions( { suppressMarkers: true } );
                 
        }
    });
};

// Hangle Error
function handleLocationError (browserHasGeolocation, infoWindow, pos) {
    console.log("handleLocationError works");
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                  'Error: The Geolocation service failed.' :
                  'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
