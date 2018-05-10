/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity
} from "react-native";
import { Button, Divider } from "react-native-elements";
import axios from "axios";
import Tabs from "../components/Tabs";
import Search from "../components/Search";
import GeneralButton from "../components/GeneralButton";
import FavoriteScreen from "./FavoriteScreen";
import LoginScreen from "./LoginScreen";
import SearchService from "../services/SearchService";
import CategoryService from "../services/CategoryService";
import Modal from "react-native-modal";
import CheckBox from "react-native-check-box";

export default class SearchResultScreen extends Component {
  state = {
    categoryList: [],
    districts: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      "Bình Thạnh",
      "Tân Bình",
      "Phú Nhuận",
      "Tân Phú",
      "Gò Vấp",
      "Bình Tân",
      "Thủ Đức",
      "Bình Chánh",
      "Nhà Bè",
      "Hóc Môn",
      "Củ Chi",
      "Cần Giờ"
    ],
    searchResults: {
      currentPage: 0,
      results: [],
      totalPage: 0,
      totalRecord: 0
    },
    isModalVisible: false,
    searchParam: {
      searchString: "",
      page: 1,
      currentLatitude: 0,
      currentLongitude: 0,
      categoriesListId: [],
      districtList: [],
      count: 10,
      filterOption: {
        location: false,
        categories: false,
        districts: false,
        rating: false
      }
    }
  };
  initDefautlValue = () => {
    this.setState({
      searchParam: {
        searchString: "",
        page: this.initPage,
        currentLatitude: 0,
        currentLongitude: 0,
        categoriesListId: [],
        districtList: [],
        count: this.initCount,
        filterOption: {
          location: false,
          categories: false,
          districts: false,
          rating: false
        }
      }
    });
  };
  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  onClick(data) {
    data.checked = !data.checked;
    let msg = data.checked ? "you checked " : "you unchecked ";
    // this.toast.show(msg + data.name);
  }
  search = page => {
    if (
      this.state.searchResults.currentPage <= this.state.searchResults.totalPage && this.state.searchParam.searchString!==''
    ) {
      SearchService.PagingSearching(this.state.searchParam).then(data => {
        if (data != null) {
          this.setState({ searchResults: data });
        } else {
          this.setState({
            searchResults: {
              currentPage: 0,
              results: [],
              totalPage: 0,
              totalRecord: 0
            }
          });
        }
        console.log("test 22222222", this.state.searchResults);
      });
    }
  };

  componentWillMount() {
    CategoryService.GetCategories().then(data => {
      this.setState({ categoryList: data });
    });
  }
  getSearchString = searchString => {
    if(searchString!==this.state.searchParam.searchString){
      this.setState(
        prevState => ({
          searchParam: {
            ...prevState.searchParam,
            searchString: searchString
          }
        }),
        function() {
          console.log("search", this.state.searchParam);
          let page = this.state.searchResults.currentPage;
          this.search(page++);
        }
      );
    }
  };

  render() {
    let districtsKey = 1;
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
              <Search searchString={this.getSearchString} />

              <View style={styles.buttonContainerStyle}>
                <Button
                  title="Gần Đây"
                  rounded
                  textStyle={styles.buttonTextStyle}
                  buttonStyle={styles.buttonStyle}
                />
                <Button
                  title="Đánh giá cao"
                  rounded
                  textStyle={styles.buttonTextStyle}
                  buttonStyle={styles.buttonStyle}
                />
                <Button
                  title="Bộ lọc"
                  rounded
                  textStyle={styles.buttonTextStyle}
                  buttonStyle={styles.buttonStyle}
                />
              </View>
              <Divider
                style={{ backgroundColor: "#f2f2f2", marginBottom: 7 }}
              />
              <View style={{}}>
                <TouchableOpacity onPress={this._toggleModal}>
                  <Text>Show Modal</Text>
                </TouchableOpacity>
                <Modal
                  animationInTiming={0}
                  animationOutTiming={0}
                  isVisible={this.state.isModalVisible}
                  style={styles.modalStyle}
                  onBackdropPress={() =>
                    this.setState({ isModalVisible: false })
                  }
                >
                  <ScrollView style={{}}>
                    <Text style={styles.typeFilter}> Chọn loại</Text>
                    <View>
                      <FlatList
                        data={this.state.categoryList}
                        renderItem={({ item }) => (
                          <CheckBox
                            style={styles.item}
                            rightText={item.name}
                            onClick={() => this.onClick(item)}
                            isChecked={item.checked}
                          />
                        )}
                        keyExtractor={item => item.id}
                      />
                    </View>
                    <Text style={styles.typeFilter}> Chọn quận</Text>
                    <View>
                      <FlatList
                        data={this.state.districts}
                        renderItem={({ item }) => (
                          <CheckBox
                            style={styles.item}
                            rightText={item.toString()}
                            onClick={() => this.onClick(item)}
                            isChecked={item.checked}
                          />
                        )}
                        keyExtractor={item => "district" + districtsKey++}
                      />
                    </View>
                  </ScrollView>
                  <TouchableOpacity onPress={this._toggleModal}>
                    <Text>Chọn xong</Text>
                  </TouchableOpacity>
                </Modal>
              </View>

              <View style={styles.categoryContainerStyle}>
                <GeneralButton
                  onPress={() => this.props.navigation.navigate("Home")}
                >
                  Trở về trang chủ
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
  categoryContainerStyle: {},
  modalStyle: {
    backgroundColor: "white",
    width: 200
  },
  typeFilter: {
    color: "#1b7c2d",
    textAlign: "center",
    fontWeight: "bold"
  }
});
