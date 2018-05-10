import { View } from "react-native";
import React, { Component } from "react";
import { SearchBar } from "react-native-elements";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      noIcon: false,
      clearIcon: false,
      placeHolder: "Tìm kiếm..."
    };
  }

  componentDidMount() {}
  onChangeText = text => {
    this.setState({ text });
    let searchString = text.trim().replace(/ +(?= )/g, "");
    this.props.searchString(searchString);
  };

  render() {
    return (
      <View>
        <SearchBar
          containerStyle={styles.containerStyle}
          inputStyle={styles.inputStyle}
          icon={styles.iconStyle}
          noIcon={this.state.noIcon}
          lightTheme
          clearIcon={this.state.clearIcon}
          onFocus={() => this.setState({ clearIcon: true })}
          onBlur={() => this.setState({ clearIcon: false })}
          onChangeText={this.onChangeText}
          onClearText={() => {}}
          ref={search => {
            this.search = search;
          }}
          placeholder={this.state.placeHolder}
        />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    borderTopWidth: 0
  },
  inputStyle: {
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 50,
    height: 45,
    color: "#a3a375",
    backgroundColor: "white",
    fontFamily: "quicksand-regular",
    borderWidth: 1,
    borderColor: "black",
    shadowColor: "#a3a375",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  iconStyle: {
    color: "#a3a375",
    style: {
      fontSize: 20,
      // marginTop: 0,
      marginLeft: 10
    }
  }
};

export default Search;
