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
import FlatListProducts from "../components/FlatListProducts";
import GeneralButton from "../components/GeneralButton";
import FavoriteScreen from "./FavoriteScreen";
import SearchService from "../services/SearchService";
import CategoryService from "../services/CategoryService";
import ProductService from "../services/ProductService";
import Map from "../components/Map";
import DetailStoreScreen from "./DetailStoreScreen";
import ProfileScreen from "./ProfileScreen";
import LoginScreen from "./LoginScreen";
import LoginManager from "../services/LoginManager";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      categoryList: [],
      storeList: [],
      user: {}
    };
  }

  componentDidMount() {
    LoginManager.isLoggedIn().then(response => {
      console.log("response of LoginManager ", response);
      this.setState({ isLoggedIn: false });
    });
    console.log("this.props.navigation", this.props);
    this.getProductsByCategoryId();
  }
  getProductsByCategoryId = () => {
    CategoryService.GetCategories().then(data => {
      this.setState({ categoryList: data });
    });
  };
  getSearchString = () => {};

  componentWillReceiveProps() {
    console.log("componentWillReceiveProps");
  }

  shouldComponentUpdate() {
    console.log("shouldComponentUpdate run");
    console.log("this.state in Home", this.state.isLoggedIn);
    return true;
  }
  componentWillUpdate() {
    console.log("componentWillUpdate");
  }
  componentDidUpdate() {
    console.log(
      "componentDidUpdate. This.state.isLoggedIn: ",
      this.state.isLoggedIn
    );
  }

  handler = (value) => {
    console.log(
      "handler method in HOME Component. VALUE from child is: ",
      value
    );
    this.setState({
      isLoggedIn: value.isLoggedIn,
      user: value
    });
  };

  changeTab = () => {
  };

   navigateInItem = (value) => {
    console.log('navigateInItem works. Value is: ', value);
    this.props.navigation.navigate(value.screenName, { id: value.id });
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <Tabs onClick={this.changeTab}>
          {/* First tab */}
          <ScrollView
            title="Trang chủ"
            iconName="home"
            iconType="octicon"
            style={styles.contentStyle}
          >
            <View style={styles.searchStyle}>
              <Search
                searchString={this.getSearchString}
                isHomePage
                navigation={this.props.navigation}
              />
              <View style={styles.categoryContainerStyle}>
                <FlatList
                  data={this.state.categoryList}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <FlatListProducts
                      key={item.key}
                      categoryInfo={item}
                      navigation={this.props.navigation}
                    />
                  )}
                />
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
            <FavoriteScreen
              user={this.state.user}
              navigation={this.props.navigation}
            />
          </ScrollView>

          {/* Third tab */}
          <ScrollView
            title="Thông Tin"
            iconName="user-o"
            iconType="font-awesome"
            style={styles.contentStyle}
            onClick={this.changeTab}
          >
            {this.state.isLoggedIn ? (
              <ProfileScreen handler={this.handler} user={this.state.user} />
            ) : (
              <LoginScreen handler={this.handler} />
            )}
          </ScrollView>

          {/* <GeneralButton
            onPress={() => this.props.navigation.navigate("Favorite")}
          >
            Xem Tất Cả
          </GeneralButton> */}
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

export default HomeScreen;
