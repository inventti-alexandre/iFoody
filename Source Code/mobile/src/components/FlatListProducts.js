import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, Dimensions } from 'react-native';
import { Divider } from 'react-native-elements';
import axios from 'axios';
import ProductItem from '../components/ProductItem';
import ProductService from '../services/ProductService';

class FlatListProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      initPage: 1,
      initCount: 10
    };
  }

  componentDidMount() {
    this.getProductsByCategoryId(this.props.categoryInfo.id);
  }
  getProductsByCategoryId = id => {
    ProductService.PagingAllProductsByCategory(
      id,
      this.state.initPage,
      this.state.initCount
    ).then(data => {
      if (data.status === 404) {
      } else {
        this.setState({ products: data.results }, () => {
          // console.log("2222222", this.state.products);
        });
      }
    });
  };
  goAllProductsByCategory = () => {
    let categoryInfo = this.props.categoryInfo
    this.props.navigation.navigate('AllProductsByCategory', {
      categoryInfo
    });
  };

 navigateInItem = (value) => {
    console.log('navigateInItem Flatlist works');
    console.log('value is: ', value);
    this.props.navigation.navigate(value.screenName, { id: value.id });
  }

  render() {
    return (
      <View>
        {this.state.products.length > 0 ? (
          <View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={styles.categoryName}>
                {this.props.categoryInfo.name}
              </Text>
              <Text
                style={styles.moreText}
                onPress={this.goAllProductsByCategory}
              >
                Xem thêm
              </Text>
            </View>

            <Divider style={{ backgroundColor: '#96abce', marginBottom: 7 }} />
            <FlatList
              horizontal
              data={this.state.products}
              renderItem={({ item }) =>
                <ProductItem
                  productInfo={item}
                  navigateInItem={this.navigateInItem}
                  width={Dimensions.get('window').width / 1.5}
                />
              }
              keyExtractor={item => item.product.id}
            />
          </View>
        ) : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  categoryName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "steelblue",
    marginTop: 10,
    textAlign: "left",
    marginLeft: 20
  },
  moreText: {
    fontSize: 15,
    // fontWeight: "bold",
    // color: "steelblue",
    marginTop: 10,
    textAlign: "right",
    marginLeft: 20,
    marginRight: 20
  }
});

export default FlatListProducts;
