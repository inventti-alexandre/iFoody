import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Login from '../../src/components/Login';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    console.log('constructor in LoginScreen');
    this.state = {
      isLoggedIn: false
    };
  }

  handler = (value) => {
    console.log('handler in LoginScreen. Value is: ', value);
    this.setState({ isLoggedIn: value });
    this.props.handler(value);
  }

  render() {
    return (
      <View style={styles.container}>
        <Login handler={this.handler} />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
