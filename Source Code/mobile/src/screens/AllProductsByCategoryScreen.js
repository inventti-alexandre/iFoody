import React, { Component } from "react";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import ProductService from "../services/ProductService";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Text,
  Dimensions
} from "react-native";

class AllProductsByCategoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      results: {
        currentPage: 0,
        results: [],
        totalPage: 0,
        totalRecord: 0
      },
      initPage: 1,
      initCount: 10
    };
  }

  componentDidMount() {
    this.getProductsByCategoryId(this.state.initPage);
  }
  getProductsByCategoryId = (page) => {
    ProductService.PagingAllProductsByCategory(
      this.props.navigation.state.params.categoryInfo.id,
      page,
      this.state.initCount
    ).then(data => {
      if (data.status === 404) {
      } else {
        if (page>1) {
          data.results.forEach(item => {
            this.state.results.results.push(item);
          });
          this.state.results.currentPage = data.currentPage;
          this.state.results.totalPage = data.totalPage;
          this.state.results.totalRecord = data.totalRecord;
          let temp = this.state.results;
          this.setState(
            {
              results: temp
            },
            function() {
              console.log("next page", this.state.results);
            }
          );
        } else {
          this.setState({ results: data }, function() {
            console.log("init page", this.state.results);
          });
        }
      }
    });
  };
  navigateInItem = value => {
    this.props.navigation.navigate(value.screenName, { id: value.id });
  };
  onScrollEnd = nativeEvent => {
    var windowHeight = Dimensions.get("window").height,
      height = nativeEvent.contentSize.height,
      offset = nativeEvent.contentOffset.y;
    if (windowHeight + offset >= height) {
      if (this.state.results.currentPage < this.state.results.totalPage) {
        currentPage = this.state.results.currentPage;
        this.getProductsByCategoryId(++currentPage);
      }
    }
  };

  render() {
    return (
      <ScrollView
        title="Tìm Kiếm"
        iconName="search"
        style={styles.contentStyle}
        iconType="octicon"
        onScroll={({ nativeEvent }) => {
          this.onScrollEnd(nativeEvent);
        }}
      >
        <View>
          <Text style={styles.totalRecord}>{this.state.results.totalRecord +' Kết quả cho '+ this.props.navigation.state.params.categoryInfo.name}</Text>
          <FlatList
            data={this.state.results.results}
            extraData={this.state}
            renderItem={({ item }) => (
              <ProductItem
                productInfo={item}
                navigateInItem={this.navigateInItem}
              />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  totalRecord: {
    color: "#4286f4",
    textAlign: "center",
    fontSize: 16,
    paddingTop: 5
  },
  contentStyle: {
    flex: 1, // Take up all available space
    backgroundColor: "white", // Darker background for content area
  },
})

export default AllProductsByCategoryScreen;
