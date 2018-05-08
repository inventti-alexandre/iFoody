import React, { Component } from 'react';
import { Text, View, FlatList, ListItem } from 'react-native';
import axios from 'axios';
import { FavoriteList, Product, Store } from '../assets/constants/apiUrl';
import ProductItem from '../components/ProductItem';
import StoreItem from '../components/StoreItem';

export default class FavoriteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteList: [],
      productIdList: [],
      storeIdList: [],
      productList: [],
      storeList: [],
      user: this.props.user
    };
    console.log('constructor in favoriteScreen. this.state is: ', this.props.user);
  }

  componentWillMount() {
    console.log('componentWillMount');
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.fetchFavoriteList();
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

  setFavoriteList = (data) => {
    console.log('setFavoriteList work');
    this.setState({ favoriteList: data });
    data.map((item) => {
      if (item.productId !== null) {
        this.state.productIdList.push(item.productId);
      } else if (item.storeId !== null) {
        this.state.storeIdList.push(item.storeId);
      }
      return item;
    });
  }

  fetchFavoriteList = () => {
    console.log('fetchFavoriteItems works');
    axios.get(`${FavoriteList}/${this.state.user.userId}`)
    .then(response => {
      console.log('response is: ', response);
      this.setFavoriteList(response.data);
      this.fetchProductList();
      this.fetchStoreList();
      console.log('finish Fetching FavoriteList');
      console.log(this.state.productList);
      console.log(this.state.storeList);
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
          this.setState({ storeList: [...this.state.storeList, response.data] });
        })
        .catch(error => {
          console.log('Error to get Store', error);
        });
        return storeId;
    });
  }

  render() {
    console.log('in render', this.state.productList);
    console.log('in render', this.state.storeList);
    return ([
          this.state.productList.map((item, key) => (
            <ProductItem key={key} item={item} />
          )),
          this.state.storeList.map((item, key) => (
            <StoreItem key={key} item={item} />
          ))]
    );
  }
}
