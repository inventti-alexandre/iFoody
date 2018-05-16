import { View, AsyncStorage, Text } from 'react-native';
import React, { Component } from 'react';
import { Avatar, FormLabel } from 'react-native-elements';
import axios from 'axios';
import Moment from 'moment';
import GeneralButton from './GeneralButton';
import { GetUser } from '../assets/constants/apiUrl';

class Profile extends Component {
  constructor(props) {
    super(props);
    console.log('constructor in Profile');
    this.state = {
      user: {},
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

  logOut = async () => {
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

        <FormLabel>Name</FormLabel>
        <Text>{this.state.name}</Text>
        <FormLabel>Email</FormLabel>
        <Text>{this.state.email}</Text>
        <FormLabel>Birthday</FormLabel>
        <Text>{Moment(dt).format('DD-MM-YYYY')}</Text>

        <GeneralButton onPress={this.logOut}>
          Log Out
        </GeneralButton>
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
  }
};

export default Profile;
