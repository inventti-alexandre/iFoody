import React, { Component } from 'react';
import { Dimensions, View, AsyncStorage } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import Animation from 'lottie-react-native';
import axios from 'axios';
import anim from '../assets/externals/airbnb/android_fingerprint';
import { SignIn } from '../assets/constants/apiUrl';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      authToken: '',
      isLoggedIn: false,
      isLoading: false
    };
  }

  componentDidMount() {
    this.animation.play();
  }

  componentWillReceiveProps = () => {
    console.log('componentWillReceiveProps works');
    return true;
  }

  onSubmit = () => {
    console.log('onSubmit workds');
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
    .then((response) => {
      try {
        console.log('response from SIgnin. response is: ', response);
        this.setState({
          userId: response.data.userId,
          authToken: response.data.authToken,
          isLoggedIn: true
        });
        this.props.handler(true);
        AsyncStorage.setItem('user_id', response.data.userId);
        AsyncStorage.setItem('auth_token', response.data.authToken);
        this.props.handler(this.state);
      } catch (error) {
        console.log('Error in saving storage ', error);
      }
    })
    .catch((error) => {
      console.log('error In SignIn', JSON.stringify(error.response));
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
                height: 150,
                alignSelf: 'center'
              }}
              loop
              source={anim}
            />
          </View>

          <View style={styles.input}>
              <FormLabel>Email</FormLabel>
              <FormInput
                onChangeText={(email) => {
                  this.setState({ email });
                  }
                }
                containerStyle={{
                  marginBottom: 15
                }}
              />

              <FormLabel>Password</FormLabel>
              <FormInput
                onChangeText={(text) => this.setState({ password: text })}
              />
          </View>

          <Button
            title="LOGIN"
            loading={this.state.isLoading}
            loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
            titleStyle={{
              fontWeight: "100",
              fontSize: 30
              }}
            onPress={() => {
              this.onSubmit();
             }}
            buttonStyle={{
              height: 60,
              backgroundColor: "#4CAF50",
              borderWidth: 0,
              borderRadius: 5,
              width: deviceWidth * 0.65,
              alignSelf: 'center',
              marginTop: 50,
            }}
            containerStyle={{
              width: deviceWidth,
               marginLeft: 25,
               marginRight: 25,
            }}
          />
        </View>
    );
  }
}

const styles = {
  containerStyle: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: deviceHeight * 0.83,
    paddingLeft: 15,
    paddingRight: 15,
  },
  headerStyle: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'sans-serif-light'
  },
  loginBtnStyle: {
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
