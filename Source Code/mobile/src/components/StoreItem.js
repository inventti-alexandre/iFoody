import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon, Card, Button } from 'react-native-elements';
import Animation from 'lottie-react-native';
import image from '../assets/images/test2.jpg';
import GeneralRating from './GeneralRating';
import anim from '../assets/externals/airbnb/heart_with_particles.json';

class StoreItem extends Component {
  componentDidMount() {
    this.animation.play();
  }

  render() {
    console.log('inside StoreItem component');

    return (
      <Card
        containerStyle={styles.containerStyle}
        image={image}
      >
        <View style={styles.animationStyle}>
          <Animation
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 70,
              height: 70
            }}
            loop
            source={anim}
          />
        </View>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>
              The Coffee House
            </Text>
            <GeneralRating />
          </View>

          <View style={{ flexDirection: 'row' }}>

              <Icon
                name='money'
                type='font-awesome'
                color='#517fa4'
              />

              <Text>
              {' '}  29,000 - 56,000
              </Text>

          </View>

          <Text>
            113 Bình Phú, Quận 6, TpHCM
          </Text>

        </View>
        <Button
          icon={{ name: 'code' }}
          backgroundColor='#03A9F4'
          fontFamily='Lato'
          buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
          title='Xem Ngay'
        />
      </Card>
    );
  }
}

const styles = {
  containerStyle: {
    position: 'relative',
  },
  animationStyle: {
    position: 'absolute',
    top: -155,
    right: 0
  }
};

export default StoreItem;
