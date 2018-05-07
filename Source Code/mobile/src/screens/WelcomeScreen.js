import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Welcome from '../../src/components/Welcome';

export default class WelcomeScreen extends Component {
  componentWillMount() {
  }

  componentDidMount() {
       // Start counting when the page is loaded
       this.timeoutHandle = setTimeout(() => {
            // Add your logic for the tra nsition
            this.props.navigation.navigate('Home');
       }, 1500);
  }

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
