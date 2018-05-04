import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Login from '../../src/components/Login';

export default class LoginScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Login />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
