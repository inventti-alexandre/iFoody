import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon, Card, Button } from 'react-native-elements';
import Animation from 'lottie-react-native';
import GeneralRating from './GeneralRating';
import anim from '../assets/externals/airbnb/heart_with_particles.json';
import { handelImagePath } from "../services/ShareFunction";
import { ImageLoader } from "react-native-image-fallback";

class SearchStoreItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.animation.play();
  }

  render() {
    console.log('ITEM in SeacrhStoreItem: ', this.props.storeInfo);
    let item = this.props.storeInfo;
    item.images = handelImagePath(item.images);
    const imageSource =
      item.images.length > 0
        ? item.images[0].path
        : require("../assets/images/no-image.jpg");
    const fallbacks = [
      require("../assets/images/no-image.jpg") // A locally require'd image
    ];
    return (
      <TouchableOpacity 
        style={{
          width: this.props.width * 1.12, 
          height: this.props.height * 1.15,
        }}
        onPress={()=> {
          console.log('does not work');
            this.props.navigateInItem({
              screenName: 'DetailStore',
              id: item.store.id });
        }
      }>
        <Card
          containerStyle={styles.containerStyle}
        >
        <ImageLoader
            source={imageSource}
            fallback={fallbacks}
            style={{
              width: this.props.width*0.75,
              height: this.props.height / 1.6,
            }}
          />
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
              <Text 
                numberOfLines={1} 
                ellipsizeMode='tail'
                style={{
                  width: this.props.width / 1.85, 
                  fontSize: this.props.nameSize
              }}>
                {item.store.name}
              </Text>
              <GeneralRating size={this.props.width/3.4} rating={item.store.rating?item.store.rating:0}/>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Icon
                  name='money'
                  type='font-awesome'
                  color='#517fa4'
                  size={this.props.priceSize}
                />
                <Text
                  numberOfLines={1} 
                  ellipsizeMode='tail'
                  style={{
                    alignItems: 'center' ,
                    fontSize: this.props.priceSize
                  }}
                >
                  {" " + item.store.lowestPrice + ' - '+ item.store.highestPrice}
                </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start'}}>
              <Text 
                numberOfLines={1} 
                ellipsizeMode='tail'
                style={{
                  alignItems: 'center' ,
                  fontSize: this.props.addressSize
                }}
              >
                  {item.store.address + ', '+ item.store.district+ ', '+ item.store.city}
              </Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
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
  imageStyle: {
    flexDirection: "row",
    height: 150,
    width: '100%',
  },
  nameStoreStyle: {
    width: '80%',
    maxHeight: 50
  },
  addressStoreStyle: {
    width: '100%',
    maxHeight: 70
  }
};

export default SearchStoreItem;
