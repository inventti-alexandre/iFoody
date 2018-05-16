import React, { Component } from 'react';
import { Button, View, AsyncStorage } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import Animation from 'lottie-react-native';
import axios from 'axios';
import GeneralButton from './GeneralButton';
import anim from '../assets/externals/airbnb/android_fingerprint';
import { SignIn } from '../assets/constants/apiUrl';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      authToken: '',
      isLoggedIn: false
    };
  }

  componentDidMount() {
    this.animation.play();
  }

  onPressButton = () => {
    this.onSubmit();
    this.setState({ isLoggedIn: true });
    this.props.handler(true);
  }


   onSubmit = () => {
    console.log('onSubmit5 work');
    console.log('this.state ', this.state);
    const dataTest = 'hoailinhtinh@gmail.com:8899';
    const data = Base64.btoa(dataTest);
    const config = {
       headers: {
         'Content-Type': 'application/json',
         Authorization: 'Basic '.concat(data)
       }
     };
    axios.post(SignIn, data, config)
    .then(async (response) => {
      console.log('Response 1: ', JSON.stringify(response));
      try {
        console.log('after111 navigation');
        this.setState({
          userId: response.data.userId,
          authToken: response.data.authToken,
          isLoggedIn: true
        });
        await AsyncStorage.setItem('user_id', response.data.userId);
        await AsyncStorage.setItem('auth_token', response.data.authToken);
        console.log('after222 navigation');
        this.props.handler(this.state);
        console.log('after333 navigation');
      } catch (error) {
        console.log('Error in saving storage ', error);
      }
    })
    .catch((error) => {
      console.log('error', JSON.stringify(error.response));
    });
  }

  render() {
    console.log('inside Login component');
    return (
        <View style={styles.containerStyle}>

          <View>
            <Animation
              ref={animation => {
                this.animation = animation;
              }}
              style={{
                width: 160,
                height: 110,
                alignSelf: 'center'
              }}
              loop
              source={anim}
            />
          </View>

          <FormLabel>Email</FormLabel>
          <FormInput
            onChangeText={(email) => {
              console.log('text', email);
              this.setState({ email });
              }
            }
          />

          <FormLabel>Password</FormLabel>
          <FormInput
            onChangeText={(text) => this.setState({ password: text })}
          />

          <GeneralButton style={styles.loginBtnStyle} onPress={this.onSubmit}>
            LOGIN
          </GeneralButton>
        </View>
    );
  }
}

const styles = {
  containerStyle: {
    backgroundColor: 'white',
  },
  headerStyle: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'sans-serif-light'
  },
  loginBtnStyle: {
    marginBottom: 30
  }
};

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const Base64 = {
  btoa: (input:string = '')  => {
    let str = input;
    let output = '';

    for (let block = 0, charCode, i = 0, map = chars;
    str.charAt(i | 0) || (map = '=', i % 1);
    output += map.charAt(63 & block >> 8 - i % 1 * 8)) {

      charCode = str.charCodeAt(i += 3/4);

      if (charCode > 0xFF) {
        throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
      }

      block = block << 8 | charCode;
    }

    return output;
  },

  atob: (input:string = '') => {
    let str = input.replace(/=+$/, '');
    let output = '';

    if (str.length % 4 == 1) {
      throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (let bc = 0, bs = 0, buffer, i = 0;
      buffer = str.charAt(i++);

      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
      buffer = chars.indexOf(buffer);
    }

    return output;
  }
};

export default Login;
