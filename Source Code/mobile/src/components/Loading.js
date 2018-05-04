import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Animation from 'lottie-react-native';

import anim from '../assets/externals/airbnb/continuous_wave_loader_2.json';

class Loading extends Component {
  componentDidMount() {
    this.animation.play();
  }

  render() {
    return (
      <View style={styles.container}>
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
    backgroundColor: '#ff751a',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }
});

export default Loading;
