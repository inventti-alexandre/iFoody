import React, { Component } from 'react';
import { View } from 'react-native';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';


class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
    console.log('user constgructot');
  this.handler = this.handler.bind(this);
}

  handler = (e) => {
    console.log('handler method in User Component');
      e.preventDefault();
      this.setState({
        isLoggedIn: true
      });
    }

  render() {
    return (
      <View>
        { (this.state.isLoggedIn)
          ? <ProfileScreen handler={this.handler} />
          : <LoginScreen handler={this.handler} />}
      </View>
    );
  }
}

export default User;
