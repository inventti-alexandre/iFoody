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
  Text,
} from 'react-native';
import { Button, Divider } from 'react-native-elements';
import Tabs from '../components/Tabs';
import Search from '../components/Search';
import GeneralButton from '../components/GeneralButton';
import Map from '../components/Map';
import FavoriteScreen from './FavoriteScreen';
import DetailStoreScreen from './DetailStoreScreen';
import ProfileScreen from './ProfileScreen';
import LoginScreen from './LoginScreen';
import LoginManager from '../services/LoginManager';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      categoryList: [],
      storeList: [],
      user: {}
    };
  }


  componentWillMount() {
      LoginManager.isLoggedIn()
        .then(response => {
          console.log('response of LoginManager ', response);
          this.setState({ isLoggedIn: false });
        });
        console.log('this.props.navigation', this.props);
  }

  componentWillReceiveProps() {
    console.log('componentWillReceiveProps');
  }

shouldComponentUpdate() {
  console.log('shouldComponentUpdate run');
  console.log('this.state in Home', this.state.isLoggedIn);
  return true;
}
componentWillUpdate() {
  console.log('componentWillUpdate');
}
componentDidUpdate() {
  console.log('componentDidUpdate. This.state.isLoggedIn: ', this.state.isLoggedIn);
}

handler = (value) => {
  console.log('handler method in HOME Component. VALUE from child is: ', value);
    this.setState({
      isLoggedIn: value.isLoggedIn,
      user: value
    });
  }

changeTab = () => {
  console.log('changeTab');
}
  render() {
    console.log('render. this.state is: ', this.state);
    return (
      <View style={styles.containerStyle}>
        <Tabs onClick={this.changeTab}>
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

               <GeneralButton onPress={() => this.props.navigation.navigate('Favorite')}>Xem Tất Cả
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
            <FavoriteScreen user={this.state.user} navigation={this.props.navigation} />
           </ScrollView>

           {/* Third tab */}
           <ScrollView
              title="Thông Tin"
              iconName="user-o"
              iconType="font-awesome"
              style={styles.contentStyle}
              onClick={this.changeTab}
           >
           {this.state.isLoggedIn
             ? <ProfileScreen handler={this.handler} user={this.state.user} />
             : <LoginScreen handler={this.handler} />
           }
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
