import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import axios from 'axios';
import { Divider, Icon, Card } from 'react-native-elements';
import { Product } from '../assets/constants/apiUrl';
import GeneralRating from '../components/GeneralRating';
import imageDefault from '../assets/constants/global';
import Review from '../components/Review';

export default class DetailProductScreen extends Component {
    constructor(props) {
      super(props);
      console.log('DetailProductScreen- Constructor. this.props is: ', this.props);
      this.state = {
        item: '',
        productId: this.props.navigation.getParam('id'),
        buttonItemDisplay: 'none'
      };
      console.log('DetailProductScreen. getParam: ', this.props.navigation.getParam('id'));
    }

    componentDidMount() {
      console.log('componentDidMount in DetailProductScreen');
      console.log(`${Product}/${this.state.productId}`);
      axios.get(`${Product}/de444f26-d11e-461a-a048-4bc439f68594`)
        .then(response => {
          console.log('response is: ', response);
          this.setState({ item: response.data });
        })
        .catch(error => {
          console.log('Error to get Product', error);
        });
    }

    getItem = (item) => {
      console.log('DetailScreen. getItem work. Item is: ', item);
      this.setState({ item });
    }

    render() {
      const deviceWidth = Dimensions.get('window').width;
      console.log('deviceWidth is: ', deviceWidth);
      return (
         (this.state.item !== '')
            ? <ScrollView style={styles.container}>
                <View>
                  <Card
                    containerStyle={{ marginLeft: 0, marginRight: 0, marginTop: 0 }}
                    image={{ uri:
                      this.state.item.images.length > 0
                      ? this.state.item.images[0].path
                      : imageDefault
                    }}
                    imageStyle={styles.image}
                  />
                  <View
                   style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: 35,
                    alignItems: 'flex-start',
                    marginLeft: 10,
                    marginRight: 10
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                      }}
                    >
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                          {this.state.item.product.name}
                        </Text>
                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                          {this.state.item.store.name}
                        </Text>
                    </View>
                    <GeneralRating value={this.state.item.product.rating} />
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginLeft: 10
                     }}
                  >
                    <View>
                      <Text style={{ fontSize: 13 }}>
                        {this.state.item.store.address}, {this.state.item.store.district}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 10,
                        marginRight: 10
                       }}
                    >
                      <Icon
                        name='money'
                        type='font-awesome'
                        color='#517fa4'
                      />
                      <Text>
                      {' '} {this.state.item.product.price}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{ marginTop: 20, marginLeft: 15 }}>
                  <Text>{this.state.item.product.description}</Text>
                </View>

              <Divider color='grey' />

              <Review productId='de444f26-d11e-461a-a048-4bc439f68594' />
              </ScrollView>
            : <Text>No Product found</Text>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    containerStyle: {
      alignItems: 'stretch'
    },
    image: {
      flex: 1
    }
  });
