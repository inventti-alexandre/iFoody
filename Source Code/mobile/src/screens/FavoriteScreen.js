import React, { Component } from 'react';
import { Dimensions, Text, View, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';
import { FavoriteList, Product, Store } from '../assets/constants/apiUrl';
import ProductItem from '../components/ProductItem';
import StoreItem from '../components/StoreItem';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class FavoriteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteList: [],
      storeIdList: [],
      storeList: [],
      productIdList: [],
      productList: [],
      user: '',
      clickedItem: '',
      notificationLogin: 'Xin đăng nhập để xem mục yêu thích!'
    };
    console.log('constructor in favoriteScreen. this.props is: ', this.props);
  }
  componentWillMount() {
    console.log('componentWillMount');
  }

  componentDidMount() {
    console.log('Favorite componentDidMount. this.props.user: ', this.props.user);
    if (this.props.user === '' || this.props.user === undefined) {
      return true;
    }
    this.setState({ user: this.props.user }, () => {
      this.fetchFavoriteList();
    });
  }

  componentWillReceiveProps() {
    console.log('componentWillReceiveProps');
  }

  shouldComponentUpdate() {
    console.log('shouldComponentUpdate run');
    return true;
  }

  componentWillUpdate() {
    console.log('componentWillUpdate');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  onPressButton = () => {
    this.props.navigation.navigate('Login', this.handler);
  }

  setFavoriteList = (data) => {
    console.log('setFavoriteList work. Data is: ', data);
    this.setState({ favoriteList: data });
    data.map((item) => {
     if (item.storeId !== null) {
       this.state.storeIdList.push(item.storeId);
      } else if (item.productId !== null) {
        this.state.productIdList.push(item.productId);
      }
      return item;
    });
  }
  async test() {
    console.log('test function');
    await AsyncStorage.getItem('user_id')
      .then(data => {
        console.log('user_id in ProfileComponent', data);
      });
  }

  handler = (value) => {
    console.log("handler method in HOME Component. VALUE from child is: ", value
    );
  };

  fetchFavoriteList = () => {
    console.log('fetchFavoriteItems works');
    console.log(`${FavoriteList}/${this.state.user.userId}`);
    axios.get(`${FavoriteList}/${this.state.user.userId}`)
    .then(response => {
      console.log('response is: ', response);
      this.setFavoriteList(response.data);
      this.fetchStoreList();
      this.fetchProductList();
      console.log('finish Fetching FavoriteList');
      console.log(this.state.storeList);
      console.log(this.state.productList);
    })
    .catch(error => {
      console.log('Error: ', error);
    });
  }

  fetchProductList = () => {
    console.log('fetchProductList work');
    this.state.productIdList.map(productId => {
      console.log(`${Product}/${productId}`);
      axios.get(`${Product}/${productId}`)
        .then(response => {
          console.log('response is: ', response);
          this.setState({ productList: [...this.state.productList, response.data] });
        })
        .catch(error => {
          console.log('Error to get Product', error);
        });
      return productId;
    });
  }

  fetchStoreList = () => {
    console.log('fetchStoreList work');
    this.state.storeIdList.map(storeId => {
      console.log(`${Store}/${storeId}`);
      axios.get(`${Store}/${storeId}`)
        .then(response => {
          console.log('response is: ', response);
          response.data.id = storeId;
          this.setState({ storeList: [...this.state.storeList, response.data] });
        })
        .catch(error => {
          console.log('Error to get Store', error);
        });
        return storeId;
    });
  }

  handlerStore = (value) => {
    console.log('handler in DetailStoreScreen works. Value is', value);
    console.log('this.props', this.props);
    console.log('Finish navigate DetailStoreScreen');
  }

  handlerProduct = (value) => {
    console.log('handler in DetailProductScreen works. Value is', value);
    this.props.navigation.navigate(value.screenName, { id: value.id });
  }

  navigateInItem = (value) => {
    console.log('navigateInItem works');
    console.log('value is: ', value);
    this.props.navigation.navigate(value.screenName, { id: value.id });
  }

  render() {
    return ([
          this.state.storeList.map((item, key) => (
            <StoreItem
              key={key} item={item}
              navigateInItem={this.navigateInItem}
            />
          )),
          this.state.productList.map((item, key) => (
            <ProductItem
              key={key} productInfo={item}
              navigateInItem={this.navigateInItem}
            />
          ))]
    );
  }
}

export default FavoriteScreen;
