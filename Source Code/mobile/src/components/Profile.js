import { View, AsyncStorage, Text, Dimensions } from 'react-native';
import React, { Component } from 'react';
import { Button, Avatar } from 'react-native-elements';
import axios from 'axios';
import Moment from 'moment';
import { GetUser } from '../assets/constants/apiUrl';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class Profile extends Component {
  constructor(props) {
    super(props);
    console.log('constructor in Profile. This.props is: ', this.props);
    this.state = {
      user: {},
      userId: '',
      authToken: '',
      email: '',
      name: '',
      birthday: ''
    };
  }

  componentWillMount() {
    console.log('Profile. This.props', this.props);
    AsyncStorage.getItem('email')
      .then(data => {
        console.log('email in ProfileComponent', data);
      });
  }

  componentDidMount() {
    console.log('componentDidMount in Profile work. This.props.user is: ',
      this.props.user);
    this.setState({ user: this.props.user }, () => {
      console.log('this.state.user is', this.state.user);
      this.getUser();
    });
  }

  getUser = () => {
    console.log('getUser in Profile');
    console.log(`${GetUser}/${this.state.user.userId}`);
    axios.get(`${GetUser}/${this.state.user.userId}`)
      .then(response => {
        console.log('response after getUser is: ', response);
        this.setState({
          email: response.data.email,
          name: `${response.data.lastName} ${response.data.firstName}`,
          birthday: response.data.birthday
        });
      })
      .catch(error => {
        console.log('Error in getUser is: ', error);
      });
  }

  async logOut() {
    console.log('Logout function');
    await AsyncStorage.removeItem('user_id')
      .then(response => {
          try {
            console.log('removeItem1 successfully');
            console.log('response1 in removeItem ', response);
            this.props.handler(false);
          } catch (error) {
            console.log('Error in removeItem1 ', error);
          }
      });
  await AsyncStorage.removeItem('auth_token')
      .then(response => {
        try {
          console.log('removeItem2 successfully');
          console.log('response2 in removeItem', response);
        } catch (error) {
          console.log('Error in removeItem2 ', error);
        }
      });
  }


  render() {
    Moment.locale('en');
    const dt = this.state.birthday;
    console.log('inside Profile component');
    return (
      <View style={styles.containerStyle}>
        <Avatar
          xlarge
          containerStyle={styles.avatarStyle}
          rounded
          source={{ uri: 'https://i.pinimg.com/favicons/1ecf46e6826fcad2c9972e2e2a900b4e0be711d5b1c17bd3eba28c50.png' }}
            onPress={() => console.log('Works!')}
            activeOpacity={0.7}
        />

        <Text style={styles.label}>Tên</Text>
        <Text style={styles.input}>{this.state.name}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.input}>{this.state.email}</Text>

        <Text style={styles.label}>DOB</Text>
        <Text style={styles.input}>{Moment(dt).format('DD-MM-YYYY')}</Text>

        <Button
          onPress={this.logOut}
          title='Đăng Xuất'
          buttonStyle={{
            borderRadius: 5,
            marginTop: 20,
            height: 45,
            width: deviceWidth * 0.45,
            alignSelf: 'center'
          }}
        />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
  },
  avatarStyle: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10
  },
  label: {
    marginLeft: 25,
    fontSize: 16,
    letterSpacing: 5
  },
  input: {
    height: 50,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 24,
    marginTop: 7
  }
};

export default Profile;
