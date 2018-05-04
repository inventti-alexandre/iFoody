import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animation from 'lottie-react-native';
import anim from '../assets/externals/airbnb/noodles.json';

class Welcome extends Component {

  componentDidMount() {
    this.animation.play();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>iFoody</Text>
        <Text style={styles.welcome}>Tìm Kiếm Địa Điểm Ăn Uống</Text>
        <View>
          <Animation
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 160,
              height: 110
            }}
            loop
            source={anim}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    textAlign: 'center',
    fontSize: 20,
    color: 'orange',
    fontFamily: 'Iowan Old Style'
  }
});

export default Welcome;
