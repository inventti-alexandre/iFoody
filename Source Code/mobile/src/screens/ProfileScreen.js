import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Profile from '../../src/components/Profile';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    console.log('constructor in Profilescreen. this.props is:', this.props);
    this.state = {
      user: this.props.user,
      isLoggedIn: false
    };
  }

  handler = (value) => {
    console.log('handler in ProfileScreen. Value is: ', value);
    this.setState({
       isLoggedIn: value.isLoggedIn,
       user: value
      });
    this.props.handler(value);
  }

  render() {
    console.log('ProfileScreen. this.state is: ', this.state);
    return (
      <View style={styles.container}>
        <Profile handler={this.handler} user={this.state.user} />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
