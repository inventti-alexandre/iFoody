import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon, Card, Button } from 'react-native-elements';
import Animation from 'lottie-react-native';
import GeneralRating from './GeneralRating';
import anim from '../assets/externals/airbnb/heart_with_particles.json';
import imageDefault from '../assets/constants/global';
import { handelImagePath } from '../services/ShareFunction';

class StoreItem extends Component {
  constructor(props) {
    super(props);
    console.log('Constructor StoreItem. Props is: ', this.props);
    console.log('this.props.buttonItemDisplay', this.props.buttonItemDisplay);
  }

  componentDidMount() {
    this.animation.play();
  }

  render() {
    console.log('inside StoreItem component');
    this.props.item.images = handelImagePath(this.props.item.images);
    return (
      <Card
        containerStyle={styles.containerStyle}
        image={{ uri:
          this.props.item.images.length > 0
          ? this.props.item.images[0].path
          : imageDefault
        }}
        imageStyle={styles.image}
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
              {this.props.item.name}
            </Text>
            <GeneralRating value={this.props.item.rating} />
          </View>

          <View style={{ flexDirection: 'row' }}>

              <Icon
                name='money'
                type='font-awesome'
                color='#517fa4'
              />

              <Text>
              {' '} {this.props.item.lowestPrice}
               - {this.props.item.highestPrice}
              </Text>

          </View>

          <Text>
            {this.props.item.address}, {this.props.item.district}
          </Text>

        </View>
        <Button
          icon={{ name: 'code' }}
          backgroundColor='#03A9F4'
          fontFamily='Lato'
          buttonStyle={{
              borderRadius: 10,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
              display: this.props.buttonItemDisplay }}
          title='Xem Ngay'
          onPress={() => {
            console.log('Xem Ngay Clicked!!!!');
            this.props.navigateInItem({ screenName: 'DetailStore', id: this.props.item.id });
          }}
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
    top: -220,
    right: 0
  },
  image: {
    flex: 1,
    height: 220
  }
};

export default StoreItem;
