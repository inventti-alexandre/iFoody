/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import AllReviewsScreen from './src/screens/AllReviewsScreen';
import DetailProductScreen from './src/screens/DetailProductScreen';
import DetailStoreScreen from './src/screens/DetailStoreScreen';
import FavoriteScreen from './src/screens/FavoriteScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ViewAllScreen from './src/screens/ViewAllScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';

type Props = {};


export default class App extends Component<Props> {

  render() {
    return (
        <RootStack />
    );
  }
}

const RootStack = StackNavigator(
  {
    AllReview: {
      screen: AllReviewsScreen,
      navigationOptions: { header: null }
    },
    DetailProduct: {
      screen: DetailProductScreen,
      navigationOptions: { header: null }
    },
    DetailStore: {
      screen: DetailStoreScreen,
      navigationOptions: { header: null }
    },
    Favorite: {
      screen: FavoriteScreen,
      navigationOptions: { header: null }
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: { header: null }
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: { header: null }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: { header: null }
    },
    ViewAll: {
      screen: ViewAllScreen,
      navigationOptions: { header: null }
    },
    Welcome: {
      screen: WelcomeScreen,
      navigationOptions: { header: null }
    }
  },
  {
    initialRouteName: 'Welcome',
  },
);
