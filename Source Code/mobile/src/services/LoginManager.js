import { Component } from 'react';
import { AsyncStorage } from 'react-native';

class LoginManager extends Component {
  static isLoggedIn = async () => {
    const value = await AsyncStorage.getItem('user_id');

    if (value != null) {
      console.log('value is true');
      return true;
    }
    console.log('value is false');
    return false;
  }

  constructor(props) {
    super(props);
    console.log('constructor in LoginManager service ');
    this.state = {
      value: false
    };
  }
}

export default LoginManager;
