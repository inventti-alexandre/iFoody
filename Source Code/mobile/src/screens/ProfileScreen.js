import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Profile from '../../src/components/Profile';

export default class ProfileScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Profile />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
