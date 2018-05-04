import { View } from 'react-native';
import React, { Component } from 'react';
import { Avatar, FormInput, FormLabel } from 'react-native-elements';

class Profile extends Component {
  render() {
    console.log('inside Profile component');
    return (
      <View style={styles.containerStyle}>
        <Avatar
          xlarge
          containerStyle={styles.avatarStyle}
          rounded
          source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }}
            onPress={() => console.log('Works!')}
            activeOpacity={0.7}
        />

        <FormLabel>Name</FormLabel>
        <FormInput />
        <FormLabel>DOB</FormLabel>
        <FormInput />
        <FormLabel>Address</FormLabel>
        <FormInput />
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
