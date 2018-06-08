import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
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
      <TouchableOpacity style={{
        width: this.props.width * 1.15, 
        height: this.props.height * 1.15 }}
        onPress={()=> {
          console.log('does not work');
            this.props.navigateInItem({
              screenName: 'DetailProduct',
              id: item.product.id });
        }
      }>
        <Card
          containerStyle={{ 
            width: this.props.width, 
            height: this.props.height, 
            position: 'relative',
            borderRadius: 5
        }}
          image={{ uri:
            item.images.length > 0
            ? item.images[0].path
            : imageDefault
          }}
          imageStyle={{
            width: this.props.width,
            height: this.props.height / 1.6,
            borderRadius: 7
          }}
        >

          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Text 
                numberOfLines={1} 
                ellipsizeMode='tail'
                style={{ 
                  width: this.props.width / 1.55, 
                  fontSize: this.props.nameSize,
              }} >
                {item.product.name}
              </Text>
              <GeneralRating size={this.props.width / 2.5} rating={item.product.rating ? item.product.rating : 0} />
            </View>

            <View 
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}
            >
              <Text
                numberOfLines={1} 
                ellipsizeMode='tail'
                style={{ 
                  alignItems: 'center' ,
                  fontSize: this.props.addressSize
                  }}>
                  {item.store.address + ', ' + item.store.district}
              </Text>
           </View>
          </View>
        </Card>
      </TouchableOpacity>
      );
  }
}

export default ProductItem;

const styles = StyleSheet.create({
  touchableOpacity: {
  },
  imageStyle: {
  },
  containerStyle: {
    position: 'relative',
  },
  animationStyle: {
    position: 'absolute',
    top: -220,
    right: 0
  },
});
