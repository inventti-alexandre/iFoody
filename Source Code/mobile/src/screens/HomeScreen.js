/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from "react";
import { View, StyleSheet, ScrollView, FlatList, Text } from "react-native";
import { Button, Divider } from "react-native-elements";
import axios from "axios";
import Tabs from "../components/Tabs";
import Search from "../components/Search";
import FlatListroducts from "../components/FlatListProducts";
import GeneralButton from "../components/GeneralButton";
import FavoriteScreen from "./FavoriteScreen";
import LoginScreen from "./LoginScreen";
import SearchService from "../services/SearchService";
import CategoryService from "../services/CategoryService";
import ProductService from "../services/ProductService";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    categoryList: [],
    storeList: []
  };

  componentWillMount() {
    this.getProductsByCategoryId();
  }
  getProductsByCategoryId = () => {
    CategoryService.GetCategories().then(data => {
      this.setState({ categoryList: data });
    });
  };

  render() {
    return (
      <View style={styles.containerStyle}>
        <Tabs>
          {/* First tab */}
          <ScrollView
            title="Tìm Kiếm"
            iconName="search"
            iconType="octicon"
            style={styles.contentStyle}
          >
            <View style={styles.searchStyle}>
              <Search />

              <View style={styles.categoryContainerStyle}>
                <FlatList
                  data={this.state.categoryList}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <FlatListroducts categoryInfo={item} navigation={this.props.navigation} />
                  )}
                />

                <GeneralButton
                  onPress={() => this.props.navigation.navigate("SearchResult")}
                >
                  Xem Tất Cả
                </GeneralButton>
              </View>
            </View>
          </ScrollView>
          {/* Second tab */}
          <ScrollView
            title="Yêu Thích"
            iconName="heart"
            iconType="simple-line-icon"
            style={styles.contentStyle}
          >
            <FavoriteScreen />
          </ScrollView>

          {/* Third tab */}
          <ScrollView
            title="Thông Tin"
            iconName="user-o"
            iconType="font-awesome"
            style={styles.contentStyle}
          >
            <LoginScreen />
          </ScrollView>
        </Tabs>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // App container
  containerStyle: {
    flex: 1, // Take up all screen
    backgroundColor: "white" // Background color
  },
  // Tab content container
  contentStyle: {
    flex: 1, // Take up all available space
    backgroundColor: "white" // Darker background for content area
  },
  // Content header
  headerStyle: {
    margin: 10, // Add margin
    color: "blue", // White color
    fontFamily: "Avenir", // Change font family
    fontSize: 26 // Bigger font size
  },
  // Content text
  textStyle: {
    marginHorizontal: 20, // Add horizontal margin
    color: "black", // Semi-transparent text
    fontFamily: "Avenir",
    fontSize: 18
  },
  searchStyle: {},
  buttonContainerStyle: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  buttonStyle: {
    width: 110,
    height: 35,
    backgroundColor: "#f6f6f6",
    borderWidth: 1
  },
  buttonTextStyle: {
    color: "black",
    fontSize: 12
  },
  categoryContainerStyle: {}
});
