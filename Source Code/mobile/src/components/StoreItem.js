import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
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
  }

  componentDidMount() {
    this.animation.play();
  }

  render() {
    console.log('inside StoreItem component. this.item is: ', this.props.item);
    this.props.item.images = handelImagePath(this.props.item.images);
    return (
      <TouchableOpacity 
        style={{
          width: this.props.width * 1.15, 
          height: this.props.height * 1.15 
        }}
        onPress={()=> {
          console.log('does not work');
            this.props.navigateInItem({
              screenName: 'DetailStore',
              id: this.props.item.id });
        }
      }>
        <Card
          containerStyle={styles.containerStyle}
          image={{ uri:
            this.props.item.images.length > 0
            ? this.props.item.images[0].path
            : imageDefault
          }}
          imageStyle={{
            width: this.props.width,
            height: this.props.height / 1.6,
            borderRadius: 7
          }}
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
            <View 
              style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between',
                alignItems: 'center'  
              }}>
              <Text 
                numberOfLines={1} 
                ellipsizeMode='tail'
                style={{
                  width: this.props.width / 1.55, 
                  fontSize: this.props.nameSize
                }}>
                {this.props.item.name}
              </Text>
              <GeneralRating size={this.props.width/2.5} rating={this.props.item.rating?this.props.item.rating:0} />
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
              {this.props.item.address + ', ' + this.props.item.district}
              </Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

export default StoreItem;

const styles = StyleSheet.create({
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


