import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Welcome from '../../src/components/Welcome';

class AllReviewScreen extends Component {
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

export default AllReviewScreen;
