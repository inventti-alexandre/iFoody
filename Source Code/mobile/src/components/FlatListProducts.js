import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import ProductService from "../services/ProductService";

export default class FlatListProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      initPage: 1,
      initCount: 10
    };
    console.log('flatlistproduct:', this.props)
  }

  componentWillMount() {
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
        this.setState({ products: data.results }, function() {
          // console.log("2222222", this.state.products);
        });
      }
    });
  };

  render() {
    return (
      <View>
        {this.state.products.length > 0 ? (
          <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={styles.categoryName}>
                {this.props.categoryInfo.name}
              </Text>
              <Text style={styles.moreText} onPress={() => this.props.navigation.navigate('SearchResult')}>Xem thêm</Text>
            </View>

            <Divider style={{ backgroundColor: "#96abce", marginBottom: 7 }} />
            <FlatList
              horizontal
              data={this.state.products}
              renderItem={({ item }) => <ProductItem productInfo={item} />}
              keyExtractor={item => item.id}
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
    textAlign: 'left'
  },
  moreText:{
    fontSize: 20,
    // fontWeight: "bold",
    // color: "steelblue",
    marginTop: 10,
    textAlign: 'right'
  }
});
