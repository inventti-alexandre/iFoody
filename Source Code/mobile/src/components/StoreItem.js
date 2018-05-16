import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon, Card, Button } from 'react-native-elements';
import Animation from 'lottie-react-native';
import GeneralRating from './GeneralRating';
import anim from '../assets/externals/airbnb/heart_with_particles.json';
import { handelImagePath } from "../services/ShareFunction";
import { ImageLoader } from "react-native-image-fallback";

class StoreItem extends Component {
  constructor(props) {
    super(props);
    this.state = {     
    };
  }

  componentDidMount() {
    this.animation.play();
  }

  render() {
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
      <Card
        containerStyle={styles.containerStyle}
      >
       <ImageLoader
          source={imageSource}
          fallback={fallbacks}   
          style={styles.imageStyle}      
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
            <Text  style={styles.nameStoreStyle}>
              {item.store.name}
            </Text>
            <GeneralRating rating={item.store.rating?item.store.rating:0}/>
          </View>

          <View style={{ flexDirection: 'row' }}>

              <Icon
                name='money'
                type='font-awesome'
                color='#517fa4'
              />

              <Text>
              <Text>{" " + item.store.lowestPrice + ' - '+ item.store.highestPrice}</Text>
              </Text>

          </View>

          <Text style={styles.addressStoreStyle}>
            {item.store.address + ', '+ item.store.district+ ', '+ item.store.city}
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

export default StoreItem;
