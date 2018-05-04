import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Welcome from '../../src/components/Welcome';

export default class DetailProductScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Welcome />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
