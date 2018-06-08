import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import axios from 'axios';
import { Icon, Card } from 'react-native-elements';
import { GetStoreAddresses, GetAllProductsInStore, Store } from '../assets/constants/apiUrl';
import GeneralRating from '../components/GeneralRating';
import imageDefault from '../assets/constants/global';
import Review from '../components/Review';
import Map from '../components/Map';
import SearchService, { handelImagePath } from '../services/ShareFunction';

class DetailStoreScreen extends Component {
  constructor(props) {
    super(props);
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
    axios.get(`${Store}/${this.props.navigation.state.params.id}`)
      .then(response => {
        console.log('RESPONSE GETSTORE: ', response);
        response.data.images = handelImagePath(response.data.images);
        this.setState({ item: response.data });
        
        this.setState(this.state);
        const encodedStoreIds = encodeURIComponent(
          JSON.stringify([this.props.navigation.state.params.id]));

        axios.get(`${GetStoreAddresses}/?storeIds=${encodedStoreIds}`)
          .then(result => {
            console.log('RESULT GETSTOREADDRESS ', result);
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
            this.setState(this.state);
          })
          .catch(error => {
            console.log('Error to get GetStoreAddress', error);
          });
        this.setState(this.state);
        console.log('ănlaghien');
        axios.get(`${GetAllProductsInStore}/${this.props.navigation.state.params.id}`)
          .then(result => {
            console.log('Result GetALlProduct ', result);
            result.data.map((item) => (
              item.images = handelImagePath(item.images)
            ));
            this.setState({ productList: result.data });
          })
          .catch(error => {
            this.setState(this.state);
            console.log('Error to get ProductInStore', error);
          });
          this.setState(this.state);
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
    console.log('this.item in DetailStore : ', this.props)
    const deviceWidth = Dimensions.get('window').width;
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
                  imageWrapperStyle={{ 
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: 30,
                    alignItems: 'center',
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                    {this.state.item.name}
                  </Text>
                  <GeneralRating size={deviceWidth/3.3} rating={this.state.item.rating} />
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
            : 
              <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
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
                      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <GeneralRating rating={item.product.rating} size={deviceWidth/2.6}/>
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

            <Review storeId={this.props.navigation.state.params.id} />
            </ScrollView>
          : <Text />
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

export default DetailStoreScreen;
