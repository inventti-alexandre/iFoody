import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import axios from 'axios';
import { Divider, Icon, Card } from 'react-native-elements';
import { GetStoreAddresses, GetAllProductsInStore, Product, Store } from '../assets/constants/apiUrl';
import GeneralRating from '../components/GeneralRating';
import imageDefault from '../assets/constants/global';
import Review from '../components/Review';
import { handelImagePath } from '../services/ShareFunction';
import Map from '../components/Map';

class DetailProductScreen extends Component {
    constructor(props) {
      super(props);
      console.log('DetailProductScreen- Constructor. this.props is: ', this.props);
      this.state = {
        item: '',
        productId: '',
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
      console.log(`${Product}/${this.props.navigation.getParam('id')}`);
      axios.get(`${Product}/${this.props.navigation.getParam('id')}`)
        .then(response => {
          console.log('response is: ', response);
          response.data.images = handelImagePath(response.data.images);
          this.setState({ item: response.data });

          const encodedStoreIds = encodeURIComponent(
            JSON.stringify([response.data.store.id]));

          axios.get(`${GetStoreAddresses}/?storeIds=${encodedStoreIds}`)
            .then(result => {
              this.setState({
                location: {
                  latlng: {
                    latitude: result.data[0].latitude,
                    longitude: result.data[0].longitude
                  },
                  title: response.data.store.name,
                  description: response.data.store.description,
                  images: response.data.images,
                  price: response.data.product.price
                }
              });
              this.setState(this.state);
            })
            .catch(error => {
              console.log('Error to get GetStoreAddress', error);
            });
      })
      .catch(error => {
        console.log('Error to get Product', error);
      });
    }

    componentWillReceiveProps() {
      console.log('componentWillReceiveProps');
      return true;
    }
    getItem = (item) => {
      console.log('DetailScreen. getItem work. Item is: ', item);
      this.setState({ item });
    }

    render() {
      console.log('this.state.location : ', this.state.location);
      console.log('this.state.item ', this.state.item);

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
                    <GeneralRating size={deviceWidth/3.3} rating={this.state.item.product.rating} />
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

                <View style={{ 
                  marginTop: 15, 
                  marginLeft: 15,
                  marginRight: 15,
                  marginBottom: 15 }}>
                  <Text>{this.state.item.product.description}</Text>
                </View>

              <Divider color='grey' />
              <Map items={[this.state.location]} />

              <Review productId={this.props.navigation.getParam('id')} />

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

export default DetailProductScreen;
