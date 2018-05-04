import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon, Card, Button } from 'react-native-elements';
import image from '../assets/images/test.jpg';
import GeneralRating from './GeneralRating';

class ProductItem extends Component {
  render() {
    console.log('inside ProductItem component');
    return (
      <Card
        image={image}
      >
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>
              Càng Ghẹ Rang Muối
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
              {' '}  26,000
              </Text>

          </View>

          <Text>
            34/8 Sư Vạn Hạnh, Quận 10, TpHCM
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

export default ProductItem;
