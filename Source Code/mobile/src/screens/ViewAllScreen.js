/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';
import { Button, Divider } from 'react-native-elements';
import Tabs from '../components/Tabs';
import Search from '../components/Search';
import StoreItem from '../components/StoreItem';
import GeneralButton from '../components/GeneralButton';

export default class ViewAllScreen extends Component {
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
               <StoreItem />
               <StoreItem />
               <StoreItem />
               <StoreItem />
               <GeneralButton>Xem Thêm
               </GeneralButton>
             </View>
             </View>
           </ScrollView>
           {/* Second tab */}
           <View
                title="Yêu Thích"
                iconName="heart"
                iconType="simple-line-icon"
                style={styles.contentStyle}
           >
             <Text style={styles.headerStyle}>
               Yêu Thích
             </Text>
             <Text style={styles.textStyle}>
               Components you define will end up rendering as native platform widgets
             </Text>
           </View>

           {/* Third tab */}
           <View
              title="Thông Tin"
              iconName="user-o"
              iconType="font-awesome"
              style={styles.contentStyle}
           >
             <Text style={styles.headerStyle}>
               Thông Tin
             </Text>
             <Text style={styles.textStyle}>
               It’s much easier to read and write comparing to native platform’s code
             </Text>
           </View>
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
    textAlign: 'center',                // Center
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
