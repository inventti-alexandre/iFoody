import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon, Card, Button } from 'react-native-elements';
import GeneralRating from './GeneralRating';

class ProductItem extends Component {
  constructor(props) {
    super(props);
    console.log('Constructor ProductItem. Props is: ', this.props.item);
  }

  render() {
    console.log('inside ProductItem component');
    return (
      <Card
        image={{ uri: this.props.item.images[0].path }}
        imageStyle={styles.image}
      >
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>
              {this.props.item.product.name}
            </Text>
            <GeneralRating value={this.props.item.product.rating} />
            {console.log('RATING: ', this.props.item.product.rating)}
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
        />
      </Card>

    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 220
  }
});

export default ProductItem;
