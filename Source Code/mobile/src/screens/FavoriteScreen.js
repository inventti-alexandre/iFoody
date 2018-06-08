import React, { Component } from 'react';
import { StyleSheet, Dimensions, Text, View, AsyncStorage, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';
import { FavoriteList, Product, Store } from '../assets/constants/apiUrl';
import ProductItem from '../components/ProductItem';
import StoreItem from '../components/StoreItem';
import LoginScreen from './LoginScreen';

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
      user: this.props.user,
      clickedItem: '',
      notificationLogin: 'Xin đăng nhập để xem mục yêu thích!',
      needToLogin: false
    };
    console.log('constructor in favoriteScreen. this.props is: ', this.props);
  }
  componentWillMount() {
    console.log('componentWillMount');
  }

  componentDidMount() {
    console.log('Favorite componentDidMount. this.props.user: ', this.props.user);
    if (Object.keys(this.state.user).length !== 0) {
      console.log('DDDDDDDDD');
      this.setState({ user: this.props.user }, () =>
        this.fetchFavoriteList());
    } else {
      console.log('EEEEEEE');
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    console.log('nextProps is: ', nextProps);
    this.setState({ user: nextProps.user });
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

  needToLogin() {
      console.log('needToLogin works');
      this.setState({ needToLogin: true });
  }

  render() {
    if (Object.keys(this.state.user).length === 0) {
      console.log('REnder User = 0')
      return (
        <View
          style={{
            flex: 1,
            height: deviceHeight * 0.85,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ alignSelf: 'center', fontSize: 24 }}>Đăng nhập để xem mục này</Text>
        </View>
      );
    }
     return (
      <View>
        <Text style={styles.header}>
          Cửa Hàng
        </Text>
        <FlatList
          horizontal
          data={this.state.storeList}
          renderItem={({ item }) =>
            <StoreItem
              item={item}
              navigateInItem={this.navigateInItem}
              width={Dimensions.get('window').width / 2.2}
              height={Dimensions.get('window').height / 3.5}
              nameSize={11}
              addressSize={10}
            />
          }
         keyExtractor={item => item.id}
        />    

        <Text style={styles.header}>
          Sản Phẩm
        </Text>      
        <FlatList
          horizontal
          data={this.state.productList}
          renderItem={({ item }) =>
            <ProductItem
              productInfo={item}
              navigateInItem={this.navigateInItem}
              width={Dimensions.get('window').width / 2.2}
              height={Dimensions.get('window').height / 3.5}
              nameSize={12}
              addressSize={10}
            />
          }
         keyExtractor={item => item.product.id}
        />
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 16,
    fontWeight: "bold",
    color: "steelblue",
    marginTop: 18,
    textAlign: "left",
    marginLeft: 18
  },
});

export default FavoriteScreen;

