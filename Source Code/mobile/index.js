import { AppRegistry, YellowBox } from 'react-native';
import App from './App';
// start the app
AppRegistry.registerComponent('mobile', () => App);
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
console.ignoredYellowBox = ['Remote debugger'];
