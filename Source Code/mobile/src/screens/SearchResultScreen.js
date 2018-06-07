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
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Button, Divider } from "react-native-elements";
import axios from "axios";
import Tabs from "../components/Tabs";
import Search from "../components/Search";
import GeneralButton from "../components/GeneralButton";
import FavoriteScreen from "./FavoriteScreen";
import LoginScreen from "./LoginScreen";
import SearchService, {
  currentLocationGlobal
} from "../services/SearchService";
import CategoryService from "../services/CategoryService";
import Modal from "react-native-modal";
import CheckBox from "react-native-check-box";
import SearchStoreItem from "../components/SearchStoreItem";

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class SearchResultScreen extends Component {
  state = {
    categoryList: [],
    districts: [
      { id: "quan1", name: "quận 1", type: "district" },
      { id: "quan2", name: "quận 2", type: "district" },
      { id: "quan3", name: "quận 3", type: "district" },
      { id: "quan4", name: "quận 4", type: "district" },
      { id: "quan5", name: "quận 5", type: "district" },
      { id: "quan6", name: "quận 6", type: "district" },
      { id: "quan7", name: "quận 7", type: "district" },
      { id: "quan8", name: "quận 8", type: "district" },
      { id: "quan9", name: "quận 9", type: "district" },
      { id: "quan10", name: "quận 10", type: "district" },
      { id: "quan11", name: "quận 11", type: "district" },
      { id: "quan12", name: "quận 12", type: "district" },
      { id: "quanTanBinh", name: "quận Tân Bình", type: "district" },
      { id: "quanBinhThanh", name: "quận Bình Thạnh", type: "district" },
      { id: "quanPhuNhuan", name: "quận Phú Nhuận", type: "district" },
      { id: "quanTanPhu", name: "quận Tân Phú", type: "district" },
      { id: "quanBinhTan", name: "quận Bình Tân", type: "district" },
      { id: "quanThuDuc", name: "quận Thủ Đức", type: "district" },
      { id: "quanBinhChanh", name: "quận Bình Chánh", type: "district" },
      { id: "quanNhaBe", name: "quận Nhà Bè", type: "district" },
      { id: "quanHocMon", name: "quận Hóc Môn", type: "district" },
      { id: "quanCuChi", name: "quận Củ Chi", type: "district" },
      { id: "quanCanGio", name: "quận Cần Giờ", type: "district" }
    ],
    defaultChecked: false,
    searchResults: {
      currentPage: 0,
      results: [],
      totalPage: 0,
      totalRecord: 0
    },
    isModalVisible: false,
    filterDisplay: "Lọc",
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
    },
    isLoading: false
  };
  resetCheckbox = () => {
   this.state.categoryList.forEach(item=>{
     item.checked = false;
   });
   this.setState({
    districts: [
      { id: "quan1", name: "quận 1", type: "district" },
      { id: "quan2", name: "quận 2", type: "district" },
      { id: "quan3", name: "quận 3", type: "district" },
      { id: "quan4", name: "quận 4", type: "district" },
      { id: "quan5", name: "quận 5", type: "district" },
      { id: "quan6", name: "quận 6", type: "district" },
      { id: "quan7", name: "quận 7", type: "district" },
      { id: "quan8", name: "quận 8", type: "district" },
      { id: "quan9", name: "quận 9", type: "district" },
      { id: "quan10", name: "quận 10", type: "district" },
      { id: "quan11", name: "quận 11", type: "district" },
      { id: "quan12", name: "quận 12", type: "district" },
      { id: "quanTanBinh", name: "quận Tân Bình", type: "district" },
      { id: "quanBinhThanh", name: "quận Bình Thạnh", type: "district" },
      { id: "quanPhuNhuan", name: "quận Phú Nhuận", type: "district" },
      { id: "quanTanPhu", name: "quận Tân Phú", type: "district" },
      { id: "quanBinhTan", name: "quận Bình Tân", type: "district" },
      { id: "quanThuDuc", name: "quận Thủ Đức", type: "district" },
      { id: "quanBinhChanh", name: "quận Bình Chánh", type: "district" },
      { id: "quanNhaBe", name: "quận Nhà Bè", type: "district" },
      { id: "quanHocMon", name: "quận Hóc Môn", type: "district" },
      { id: "quanCuChi", name: "quận Củ Chi", type: "district" },
      { id: "quanCanGio", name: "quận Cần Giờ", type: "district" }
    ]
   })
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
  _resetFilterOption = () => {
    this.state.searchParam.districtList = [];
    this.state.searchParam.categoriesListId = [];
    this.state.searchParam.filterOption.districts = false;
    this.state.searchParam.filterOption.categories = false;
    this.resetCheckbox();
    this.setState({ isModalVisible: false, filterDisplay: "Lọc" },function() {
      console.log("search filter", this.state.searchParam);
      this.search(false);
    });
  };
  _fiterFinish = () => {
    let _this = this.state.searchParam;
    let numberOfFilter =
      _this.categoriesListId.length + _this.districtList.length;
    if (_this.categoriesListId.length > 0 || _this.districtList.length > 0) {
      this.setState(
        prevState => ({
          searchParam: {
            ...prevState.searchParam,
            filterOption: {
              ...prevState.searchParam.filterOption,
              categories: _this.categoriesListId.length > 0 ? true : false,
              districts: _this.districtList.length > 0 ? true : false
            },
            page: 1
          },
          searchResults: {
            currentPage: 0,
            results: [],
            totalPage: 0,
            totalRecord: 0
          },
          isModalVisible: false,
          filterDisplay: "Chọn ( " + numberOfFilter + " )"
        }),
        function() {
          console.log("search filter", this.state.searchParam);
          this.search(false);
        }
      );
    } else {
      this.setState({
        isModalVisible: false,
        filterDisplay: "Lọc"
      });
    }
  };
  onClick(data) {
    data.checked = !data.checked;
    if (data.checked) {
      if (data.type) {
        this.state.searchParam.districtList.push(data.name);
        console.log("OPTION DIS", this.state);
      } else {
        this.state.searchParam.categoriesListId.push(data.id);
        console.log("OPTION CAT", this.state);
      }
    } else {
      if (data.type) {
        for (let i = 0; i < this.state.searchParam.districtList.length; i++) {
          if (this.state.searchParam.districtList[i] === data.name) {
            this.state.searchParam.districtList.splice(i, 1);
            console.log("OPTION DIS", this.state);
            break;
          }
        }
      } else {
        for (
          let i = 0;
          i < this.state.searchParam.categoriesListId.length;
          i++
        ) {
          if (this.state.searchParam.categoriesListId[i] === data.id) {
            this.state.searchParam.categoriesListId.splice(i, 1);
            console.log("OPTION CAT", this.state);
            break;
          }
        }
      }
    }
    let _this = this.state.searchParam;
    let numberOfFilter =
      _this.categoriesListId.length + _this.districtList.length;
    if (numberOfFilter > 0) {
      this.setState({
        filterDisplay: "Chọn ( " + numberOfFilter + " )"
      });
    } else {
      this.setState({
        filterDisplay: "Lọc"
      });
    }
  }
  search = nextPage => {
    if (
      this.state.searchResults.currentPage <=
        this.state.searchResults.totalPage &&
      this.state.searchParam.searchString !== ""
    ) {
      SearchService.PagingSearching(this.state.searchParam).then(data => {
        if (data != null) {
          if (!nextPage) {
            this.setState({ searchResults: data }, function() {
              console.log("test 333333333", this.state.searchResults);
            });
          } else {
            data.results.forEach(item => {
              this.state.searchResults.results.push(item);
            });
            this.state.searchResults.currentPage = data.currentPage;
            this.state.searchResults.totalPage = data.totalPage;
            this.state.searchResults.totalRecord = data.totalRecord;
            let temp = this.state.searchResults;
            this.setState(
              {
                searchResults: temp,
                isLoading: false
              },
              function() {
                console.log("test 22222222", this.state.searchResults);
              }
            );
          }
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
      });
    }
  };

  componentDidMount() {
    console.log('TESTING currentLocationGlobal', global.currentLocation);
    CategoryService.GetCategories().then(data => {
      this.setState({ categoryList: data});
    });
  }
  getSearchString = searchString => {
    if (searchString !== this.state.searchParam.searchString) {
      this.setState(
        prevState => ({
          searchParam: {
            ...prevState.searchParam,
            searchString: searchString,
            page: 1
          },
          searchResults: {
            currentPage: 0,
            results: [],
            totalPage: 0,
            totalRecord: 0
          }
        }),
        function() {
          console.log("search", this.state.searchParam);
          this.search(false);
        }
      );
    }
  };
  onScrollEnd = nativeEvent => {
    var windowHeight = Dimensions.get("window").height,
      height = nativeEvent.contentSize.height,
      offset = nativeEvent.contentOffset.y;
    if (windowHeight + offset >= height && !this.state.isLoading) {
      if (
        this.state.searchResults.currentPage <
        this.state.searchResults.totalPage
      ) {
        this.setState(
          prevState => ({
            searchParam: {
              ...prevState.searchParam,
              page: prevState.searchParam.page + 1
            },
            isLoading: true
          }),
          function() {
            console.log("search next", this.state.searchParam);
            this.search(true);
          }
        );
      }
    }
  };
  setRatingFilter = () => {
    this.setState(
      prevState => ({
        searchParam: {
          ...prevState.searchParam,
          filterOption: {
            ...prevState.searchParam.filterOption,
            rating: true,
            location: false
          },
          page: 1
        },
        searchResults: {
          currentPage: 0,
          results: [],
          totalPage: 0,
          totalRecord: 0
        }
      }),
      function() {
        console.log("search filter", this.state.searchParam);
        this.search(false);
      }
    );
  };
  setLocationFilter = () => {
    this.setState(
      prevState => ({
        searchParam: {
          ...prevState.searchParam,
          currentLatitude: global.currentLocation.latitude,
          currentLongitude: global.currentLocation.longitude,
          filterOption: {
            ...prevState.searchParam.filterOption,
            rating: false,
            location: true
          },
          page: 1
        },
        searchResults: {
          currentPage: 0,
          results: [],
          totalPage: 0,
          totalRecord: 0
        }
      }),
      function() {
        console.log("search filter", this.state.searchParam);
        this.search(false);
      }
    );
  };

  navigateInItem = value => {
    console.log("navigateInItem works");
    console.log("value is: ", value);
    this.props.navigation.navigate(value.screenName, { id: value.id });
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
            onScroll={({ nativeEvent }) => {
              this.onScrollEnd(nativeEvent);
            }}
          >
            <View style={styles.searchStyle}>
              <Search
                searchString={this.getSearchString}
                isHomePage={false}
                initText={this.props.navigation.state.params.initSearchString}
              />

              <View style={styles.buttonContainerStyle}>
                <View style={{ width: 115 }}>
                  <Button
                    title="Gần Đây"
                    textStyle={styles.buttonTextStyle}
                    rounded
                    buttonStyle={
                      this.state.searchParam.filterOption.location
                        ? styles.buttonChosen
                        : styles.buttonStyle
                    }
                    onPress={this.setLocationFilter}
                  />
                </View>
                <View style={{ width: 115 }}>
                  <Button
                    title="Đánh giá cao"
                    textStyle={styles.buttonTextStyle}
                    rounded
                    buttonStyle={
                      this.state.searchParam.filterOption.rating
                        ? styles.buttonChosen
                        : styles.buttonStyle
                    }
                    onPress={this.setRatingFilter}
                  />
                </View>
                <View style={{ width: 115 }}>
                  <Button
                    title={this.state.filterDisplay}
                    textStyle={styles.buttonTextStyle}
                    rounded
                    buttonStyle={
                      this.state.filterDisplay === "Lọc"
                        ? styles.buttonStyle
                        : styles.buttonChosen
                    }
                    onPress={this._toggleModal}
                  />
                </View>
              </View>
              <Divider
                style={{ backgroundColor: "#f2f2f2", marginBottom: 7 }}
              />
              <View style={{}}>
                <Text style={styles.totalRecord}>
                  {this.state.searchResults.totalRecord +
                    ' Kết quả cho "' +
                    this.state.searchParam.searchString +
                    '"'}
                </Text>
                <Modal
                  animationInTiming={0}
                  animationOutTiming={0}
                  isVisible={this.state.isModalVisible}
                  style={styles.modalStyle}
                  onBackdropPress={this._fiterFinish}
                >
                  <ScrollView style={{}}>
                    <Text style={styles.typeFilter}> Chọn loại</Text>
                    <View>
                      {this.state.isLoading ? (
                        "Loading..."
                      ) : (
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
                          extraData={this.state}
                          keyExtractor={item => item.id}
                        />
                      )}
                    </View>
                    <Text style={styles.typeFilter}> Chọn quận</Text>
                    <View>
                      <FlatList
                        data={this.state.districts}
                        renderItem={({ item }) => (
                          <CheckBox
                            style={styles.item}
                            rightText={item.name}
                            onClick={() => this.onClick(item)}
                            isChecked={item.checked}
                          />
                        )}
                        extraData={this.state}
                        keyExtractor={item => item.id}
                      />
                    </View>
                  </ScrollView>
                  <View style={{ flexDirection: "row" }}>
                    <Button
                      title="Xong"
                      rounded
                      textStyle={styles.buttonTextStyle}
                      buttonStyle={styles.buttonModalStyle}
                      onPress={this._fiterFinish}
                    />
                    <Button
                      title="Hủy"
                      rounded
                      textStyle={styles.buttonTextStyle}
                      buttonStyle={styles.buttonModalStyle}
                      onPress={this._resetFilterOption}
                    />
                  </View>
                </Modal>
              </View>
              <View>
                <FlatList
                  data={this.state.searchResults.results}
                  extraData={this.state}
                  renderItem={({ item }) => (
                    <SearchStoreItem
                      storeInfo={item}
                      navigateInItem={this.navigateInItem}
                      width={Dimensions.get('window').width / 2.2}
                      height={Dimensions.get('window').height / 3.5}
                      nameSize={11}
                      addressSize={10}
                      priceSize={10}
                    />
                  )}
                  keyExtractor={item => item.store.id}
                />
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
    backgroundColor: "white", // Darker background for content area
    height: 600
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
    width: deviceWidth,
    flexDirection: 'row',
  },
  buttonStyle: {
    width: 110,
    height: 35,
    backgroundColor: "#f6f6f6",
    borderWidth: 1,
  },
  buttonChosen: {
    width: 110,
    height: 35,
    backgroundColor: "#42c2f4",
    borderWidth: 1,
  },
  buttonTextStyle: {
    color: "black",
    fontSize: 12,
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
  },
  totalRecord: {
    color: "#4286f4",
    textAlign: "center",
    fontSize: 14
  },
  buttonModalStyle: {
    width: 70,
    height: 30,
    backgroundColor: "#f6f6f6",
    borderWidth: 1
  }
});

export default SearchResultScreen;
