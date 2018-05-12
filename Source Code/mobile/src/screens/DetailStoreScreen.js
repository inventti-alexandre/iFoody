import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import axios from 'axios';
import { Icon, Card } from 'react-native-elements';
import { GetStoreAddresses, GetAllProductsInStore, Store } from '../assets/constants/apiUrl';
import GeneralRating from '../components/GeneralRating';
import imageDefault from '../assets/constants/global';
import Review from '../components/Review';
import Map from '../components/Map';

export default class DetailStoreScreen extends Component {
  constructor(props) {
    super(props);
    console.log('DetailStoreScreen Constructor. this.props is: ', this.props);
    this.state = {
      item: '',
      productIdList: [],
      productList: [],
      buttonItemDisplay: 'none',
      locationReturnFromApi: {},
      location: {
        latlng: {
          latitude: 0,
          longitude: 0,
        },
        title: '',
        description: '',
        images: '',
        price: ''
      }
    };
  }

  componentDidMount() {
    console.log('componentDidMount in DetailStoreScreen');
    console.log(`${Store}/79ae2ad9-d5d0-4bf0-b5c6-3f123e97080c`);
    console.log('11111111111111');
    axios.get(`${Store}/79ae2ad9-d5d0-4bf0-b5c6-3f123e97080c`)
      .then(response => {
        console.log('response is: ', response);
        this.setState({ item: response.data });

        console.log('storeIds', ['79ae2ad9-d5d0-4bf0-b5c6-3f123e97080c']);
        const encodedStoreIds = encodeURIComponent(
          JSON.stringify(['79ae2ad9-d5d0-4bf0-b5c6-3f123e97080c']));
        console.log('encodedStoreIds', encodedStoreIds);

        axios.get(`${GetStoreAddresses}/?storeIds=${encodedStoreIds}`)
          .then(result => {
            console.log('result.data GetStoreAddresses is: ', result.data);
            this.setState({
              location: {
                latlng: {
                  latitude: result.data[0].latitude,
                  longitude: result.data[0].longitude
                },
                title: response.data.name,
                description: response.data.description,
                images: response.data.images,
                price: `${response.data.lowestPrice} - ${response.data.highestPrice}`
              }
            });
          })
          .catch(error => {
            console.log('Error to get GetStoreAddress', error);
          });

        axios.get(`${GetAllProductsInStore}/79ae2ad9-d5d0-4bf0-b5c6-3f123e97080c`)
          .then(result => {
            console.log('result.data GetAllProductsInStore is: ', result.data);
            this.setState({ productList: result.data });
          })
          .catch(error => {
            console.log('Error to get ProductInStore', error);
          });
      })
      .catch(error => {
        console.log('Error to get Store', error);
      });
  }

  getItem = (item) => {
    console.log('DetailScreen. getItem work. Item is: ', item);
    this.setState({ item });
  }

  render() {
    const deviceWidth = Dimensions.get('window').width;
    console.log('deviceWidth is: ', deviceWidth);
    console.log('This.state.productList is: ', this.state.productList);
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
                  height: 30,
                  alignItems: 'center',
                  marginLeft: 10,
                  marginRight: 10
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                    {this.state.item.name}
                  </Text>
                  <GeneralRating value={this.state.item.rating} />
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
                      {this.state.item.address}, {this.state.item.district},
                      {this.state.item.city}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
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
                    {' '} {this.state.item.lowestPrice}
                     - {this.state.item.highestPrice}
                    </Text>
                    </View>
                </View>
              </View>

              <View style={{ marginTop: 20, marginLeft: 15 }}>
                <Text>{this.state.item.description}</Text>
              </View>

            <Map items={[this.state.location]} />
            {(this.state.productList.length === 0)

            ? <Text>No Product In Store</Text>
            : <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                {this.state.productList.map((item, key) => (
                  <View key={key} style={{ width: (deviceWidth / 2) }}>

                    <Card
                      containerStyle={{ marginLeft: 5, marginRight: 5 }}
                      image={{ uri:
                        item.images.length > 0
                        ? item.images[0].path
                        : imageDefault
                      }}
                      imageStyle={styles.image}
                    >
                    <Text style={{ textAlign: 'center' }}>
                      {item.product.name}
                    </Text>
                    <View>
                      <GeneralRating value={item.rating} />
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
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
                      {' '} {item.product.price}
                      </Text>
                    </View>

                    </Card>
                  </View>
                ))}
              </View>
            }

            <Review storeId='79ae2ad9-d5d0-4bf0-b5c6-3f123e97080c' />
            </ScrollView>
          : <Text>No Store found</Text>
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
