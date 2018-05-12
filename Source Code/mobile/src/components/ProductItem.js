import { View, Text } from 'react-native';
import React, { Component } from 'react';
import { Icon, Card, Button } from 'react-native-elements';
import Animation from 'lottie-react-native';
import GeneralRating from './GeneralRating';
import anim from '../assets/externals/airbnb/heart_with_particles.json';

class ProductItem extends Component {
  constructor(props) {
    super(props);
    console.log('Constructor ProductItem. Props is: ', this.props);
  }

  componentDidMount() {
    this.animation.play();
  }

  navigateToDetail = () => {
    console.log('navigateToDetail works');
    this.props.navigation.navigate('ProductDetail');
  }

  render() {
    console.log('inside ProductItem component');

    return (
      <Card
        containerStyle={styles.containerStyle}
        image={{ uri: this.props.item.images[0].path }}
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
              {this.props.item.product.name}
            </Text>
            <GeneralRating value={this.props.item.product.rating} />
          </View>
          <View style={{ flexDirection: 'row' }}>

              <Icon
                name='money'
                type='font-awesome'
                color='#517fa4'
              />

              <Text>
              {' '} {this.props.item.product.price}
              </Text>

          </View>

          <Text>
            {this.props.item.store.address}
          </Text>

        </View>
        <Button
          icon={{ name: 'code' }}
          backgroundColor='#03A9F4'
          fontFamily='Lato'
          buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
          title='Xem Ngay'
          onPress={() => {
            console.log('Xem Ngay CLicked!!!');
            this.props.navigateInItem({
              screenName: 'DetailProduct',
              id: this.props.item.product.id });
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

export default ProductItem;
