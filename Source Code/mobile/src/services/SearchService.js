import axios from "axios";
import { Alert } from 'react-native';
import { Search } from "../assets/constants/apiUrl";

onSubmit = () => {
  console.log("onSubmit3 work");
  console.log("this.state ", this.state);
  const dataTest = "hoailinhtinh@gmail.com:8899";
  const data = Base64.btoa(dataTest);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic ".concat(data)
    }
  };
  axios
    .post(SignIn, data, config)
    .then(async response => {
      console.log("Response: ", JSON.stringify(response));
      this.setState({ userId: response.data.userId });
      try {
        await AsyncStorage.setItem("user_id", response.data.userId);
        await AsyncStorage.setItem("auth_token", response.data.authToken);
      } catch (error) {
        console.log("Error in saving storage ", error);
      }
    })
    .catch(error => {
      console.log("error", JSON.stringify(error.response));
    });
};

function PagingSearching(searchParam) {
  let url = Search;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic "
    }
  };
  return axios
    .post(url, searchParam, config)
    .then(async response => {
      return response.data;
    })
    .catch(err => {
      return err.response;
    });
}

function getCurrentPosition() {
  try {
    global.navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('POSITION: ', position);
        global.currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.09,
        };
      },
      (error) => {
        //TODO: better design
        switch (error.code) {
          case 1:
            if (Platform.OS === 'ios') {
              Alert.alert('', 'Lỗi bật định vị!');
            } else {
              Alert.alert('', 'Lỗi bật định vị!');
            }
            break;
          default:
            Alert.alert('', 'Chưa bật định vị GPS !');
        }
      }
    );
  } catch (e) {
    Alert.alert(e.message || '');
  }
};

const SearchService = {
  PagingSearching,
  getCurrentPosition
};
export default SearchService;
