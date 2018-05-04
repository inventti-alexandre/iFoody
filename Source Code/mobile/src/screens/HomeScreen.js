/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Text
} from 'react-native';
import { Button, Divider } from 'react-native-elements';
import axios from 'axios';
import Tabs from '../components/Tabs';
import Search from '../components/Search';
import GeneralButton from '../components/GeneralButton';
import FavoriteScreen from './FavoriteScreen';
import LoginScreen from './LoginScreen';
import { GetAllCategories } from '../assets/constants/apiUrl';

export default class HomeScreen extends Component {

  state = {
      categoryList: [],
      storeList: []
  }

  componentWillMount() {
    axios.get(GetAllCategories)
      .then(response => {
        console.log('response ', response);
        this.setState({ categoryList: response.data });
        console.log('After setState', this.state);
      });
  }

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

              <View style={styles.buttonContainerStyle}>
                <Button
                  title='Gần Đây'
                  rounded
                  textStyle={styles.buttonTextStyle}
                  buttonStyle={styles.buttonStyle}
                />
                <Button
                  title='Đánh giá cao'
                  rounded
                  textStyle={styles.buttonTextStyle}
                  buttonStyle={styles.buttonStyle}
                />
              </View>
              <Divider style={{ backgroundColor: '#f2f2f2', marginBottom: 7 }} />

             <View style={styles.categoryContainerStyle}>
             <FlatList
              data={this.state.categoryList}
              renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
              keyExtractor={(item) => item.id}
             />

               <GeneralButton onPress={() => this.props.navigation.navigate('Welcome')}>Xem Tất Cả
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
    flex: 1,                            // Take up all screen
    backgroundColor: 'white',         // Background color
  },
  // Tab content container
  contentStyle: {
    flex: 1,                            // Take up all available space
    backgroundColor: 'white',         // Darker background for content area
  },
  // Content header
  headerStyle: {
    margin: 10,                         // Add margin
    color: 'blue',                   // White color
    fontFamily: 'Avenir',               // Change font family
    fontSize: 26,                       // Bigger font size
  },
  // Content text
  textStyle: {
    marginHorizontal: 20,               // Add horizontal margin
    color: 'black', // Semi-transparent text
    fontFamily: 'Avenir',
    fontSize: 18,
  },
  searchStyle: {
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  buttonStyle: {
    width: 110,
    height: 35,
    backgroundColor: '#f6f6f6',
    borderWidth: 1
  },
  buttonTextStyle: {
    color: 'black',
    fontSize: 12,
  },
  categoryContainerStyle: {

  }
});
