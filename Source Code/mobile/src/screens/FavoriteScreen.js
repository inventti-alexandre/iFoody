import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import StoreItem from '../../src/components/StoreItem';

export default class FavoriteScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StoreItem />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
