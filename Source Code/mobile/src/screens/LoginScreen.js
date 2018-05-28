import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Login from '../../src/components/Login';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    console.log('constructor in LoginScreen');
    this.state = {
      userId: '',
      authToken: '',
      isLoggedIn: false,
      isLoading: false
    };
  }

  handler = (value) => {
    console.log('handler in LoginScreen. Value is: ', value);
    this.setState({
      isLoggedIn: value.isLoggedIn,
      authToken: value.authToken,
      userId: value.userId,
      isLoading: value.isLoading
     });
    this.props.handler(value);
    console.log('222222');
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

export default LoginScreen;
