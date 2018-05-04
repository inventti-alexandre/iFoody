import { Text, View } from 'react-native';
import React, { Component } from 'react';
import { Avatar, Divider } from 'react-native-elements';

class Review extends Component {
  render() {
    console.log('inside Review component');
    return (
      <View>
        <Divider style={{ backgroundColor: '#e5e5e5' }} />

        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Avatar
            small
            rounded
            source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }}
              onPress={() => console.log('Works!')}
              activeOpacity={0.7}
          />
          <View>
            <Text>Lady Gaga</Text>
            <Text>04/2018</Text>
          </View>
        </View>

        <View>
          <Text>Chất lượng khá ổn, mình cho 5 sao nha các bạn.</Text>
        </View>
      </View>
    );
  }
}

export default Review;
