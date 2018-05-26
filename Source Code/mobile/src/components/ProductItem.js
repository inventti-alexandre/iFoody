import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Icon, Card, Button } from 'react-native-elements';
import Animation from 'lottie-react-native';
import GeneralRating from './GeneralRating';
import { handelImagePath } from '../services/ShareFunction';
import anim from '../assets/externals/airbnb/heart_with_particles.json';
import imageDefault from '../assets/constants/global';

class ProductItem extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }

  render() {
    let item = this.props.productInfo;
    item.images = handelImagePath(item.images);

    return (
      <Card
        containerStyle={{ width: this.props.width, position: 'relative' }}
        image={{ uri:
          item.images.length > 0
          ? item.images[0].path
          : imageDefault
        }}
        imageStyle={styles.image}
      >

        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
             }}
          >
            <Text style={{ width: this.props.width / 1.55, height: 40 }} >
              {item.product.name}
            </Text>
            <GeneralRating rating={item.product.rating ? item.product.rating : 0} />
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Icon name='money' type='font-awesome' color='#517fa4' />

            <Text> {item.product.price}</Text>
          </View>

          <Text style={{ width: this.props.width - 20, height: 50, alignItems: 'center' }}>
            {item.store.address}, {item.store.district}
          </Text>
        </View>
        <Button
          icon={{ name: 'code' }}
          backgroundColor='#03A9F4'
          fontFamily='Lato'
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0
          }}
          title='Xem Ngay'
          onPress={() => {
            this.props.navigateInItem({
              screenName: 'DetailProduct',
              id: item.product.id });
          }}
        />
      </Card>
    );
  }
}

export default ProductItem;

const styles = StyleSheet.create({
  imageStyle: {
    height: 220,
  },
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
});
