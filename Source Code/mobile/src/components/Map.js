import { Text, View } from 'react-native';
import React, { Component } from 'react';
import MapView from 'react-native-maps';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMapReady: false,
      region: {
        latitude: 47.6062,
        longitude: 122.3321,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02
      }
    };
  }

  onMapLayout = () => {
    this.setState({ isMapReady: true });
  }
  render() {
    console.log('inside Map component');
    const { region } = this.props;
    console.log(region);

    return (
      <View style={styles.containerStyle}>
        <Text>MMAPPPPP</Text>
        <MapView
          initialRegion={{
            latitude: 10.7665088,
            longitude: 106.6517121,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.mapStyle}
        />
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
};

export default Map;
