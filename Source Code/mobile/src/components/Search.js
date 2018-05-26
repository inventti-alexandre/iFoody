import { View } from "react-native";
import React, { Component } from "react";
import { SearchBar } from "react-native-elements";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.initText?this.props.initText:"",
      noIcon: false,
      clearIcon: false,
      placeHolder: "Tìm kiếm..."
    };
  }

  componentDidMount() {
    if(!this.props.isHomePage){
      console.log("777777777777", this.props.initText);
    }
    if(this.state.text!==""){
      let searchString = this.state.text.trim().replace(/ +(?= )/g, "");
      this.props.searchString(searchString);
    }
  }
  onChangeText = text => {
    this.setState({ text });
  };
  onSubmit = () => {
    if (this.props.isHomePage) {
      let initSearchString = this.state.text;
      this.props.navigation.navigate("SearchResult",  { initSearchString });
    } else {
      let searchString = this.state.text.trim().replace(/ +(?= )/g, "");
      this.props.searchString(searchString);
    }
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
          onSubmitEditing={this.onSubmit}
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
    paddingTop: 10,
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
