import { View, Image, Alert, Platform, Dimensions } from 'react-native';
import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import imageDefault from '../assets/constants/global';

const GOOGLE_MAPS_APIKEY = 'AIzaSyAqVJqCbRycAE2hj4WydsoTMJ30oOJJAb4';

class Map extends Component {
  constructor(props) {
    super(props);
    console.log('Map componnent. this.props is: ', this.props);
    this.state = {
      isMapReady: false,
      region: {
        latitude: 10.7734674,
        longitude: 106.6610249,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
      },
      markers: [],
      coordinates: [
        {
          latitude: global.currentLocation.latitude,
          longitude: global.currentLocation.longitude,
        },
      ],
    };
    this.mapView = null;
  }

  componentDidMount() {
    this.setState({ markers: this.props.items });
  }


  componentWillReceiveProps = () => {
    console.log('MAP componentWillReceiveProps. this.props.items is: ', this.props);
    this.setState({ markers: this.props.items });
    this.props.items.map((item) => {
      if (item.latlng !== null && item.latlng !== {} && item.latlng.latitude !== 0) {
        this.setState({
          coordinates: [
            ...this.state.coordinates,
            item.latlng
          ],
        });
      }
      return true;
    }
    );
  }

  onMapLayout = () => {
    this.setState({ isMapReady: true });
  }
  setRegion(value) {
      if (this.state.ready) {
        setTimeout(() => (function () {
          this.map.mapview.animateToRegion(value);
        })
        , 10);
      }
      //this.setState({ region });
    }
  onMapPress = (e) => {
      this.setState({
        coordinates: [
          ...this.state.coordinates,
          e.nativeEvent.coordinate,
        ],
      });
    }

  render() {
    console.log('Map Render. this.state.coordinates : ', this.state.coordinates);
    return (
      <View style={styles.containerStyle}>
        <MapView
          showsUserLocation
          initialRegion={{
            latitude: 10.7734674,
            longitude: 106.6610249,
            latitudeDelta: 0.09,
            longitudeDelta: 0.09,
          }}
          ref={c => { this.mapView = c; }}
          style={styles.mapStyle}
          onPress={this.onMapPress}
        >
        <MapViewDirections
                   origin={this.state.coordinates[0]}
                   destination={this.state.coordinates[1]}
                   apikey={GOOGLE_MAPS_APIKEY}
                   strokeWidth={3}
                   strokeColor="violet"
        />

        {this.state.markers.map((marker, key) => (
          <Marker
            key={key}
            coordinate={marker.latlng}
            title={marker.title}
            description={`${marker.description} - ${marker.price}`}
          >
          <Image
            source={{ uri:
              marker.images.length > 0
              ? marker.images[0].path
              : imageDefault
             }}
            style={{ width: 50, height: 50 }}
          />
          </Marker>
      ))}

        </MapView>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
   position: 'relative',
   top: 0,
   left: 0,
   right: 0,
   bottom: 0,
   alignItems: 'center',
   height: 300
 },
 mapStyle: {
   position: 'absolute',
   top: 0,
   left: 0,
   right: 0,
   bottom: 0,
 },
 markerStyle: {
   width: 22,
   height: 15
 }
};

export default Map;
