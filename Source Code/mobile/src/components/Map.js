import { View, Image } from 'react-native';
import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import imageDefault from '../assets/constants/global';

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
      markers: []
    };
  }

  componentDidMount() {
    console.log('Map ComponentIdMount work. This.props.items is: ', this.props.items);
    this.setState({ markers: this.props.items });
  }


  componentWillReceiveProps = () => {
    console.log('componentWillReceiveProps works. newProps is; ', this.props);
    this.setState({ markers: this.props.items });
  }

  onMapLayout = () => {
    this.setState({ isMapReady: true });
  }

  render() {
    console.log('inside Map render component. This.state ', this.state.markers);
    return (
      <View style={styles.containerStyle}>
        <MapView
          initialRegion={{
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.09,
            longitudeDelta: 0.09,
          }}
          region={this.state.region}
          style={styles.mapStyle}
        >

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
