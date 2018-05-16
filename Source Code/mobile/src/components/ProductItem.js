import React, { Component } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { Icon, Card, Button } from "react-native-elements";
import GeneralRating from "./GeneralRating";
import { handelImagePath } from "../services/ShareFunction";
import { ImageLoader } from "react-native-image-fallback";

class ProductItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let item = this.props.productInfo;
    item.images = handelImagePath(item.images);
    const imageSource =
      item.images.length > 0
        ? item.images[0].path
        : require("../assets/images/no-image.jpg");
    const fallbacks = [
      require("../assets/images/no-image.jpg") // A locally require'd image
    ];
    return (
      <Card
        style={{
          width: Dimensions.get("window").width / 4,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ImageLoader
          source={imageSource}
          fallback={fallbacks}
          style={styles.imageStyle}
        />

        <View style={{}}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text  style={{ width: Dimensions.get("window").width / 4, height: 40 }}>{item.product.name}</Text>
            <GeneralRating rating={item.product.rating?item.product.rating:0}/>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Icon name="money" type="font-awesome" color="#517fa4" />

            <Text>{" " + item.product.price}</Text>
          </View>

          <Text
            style={{ width: Dimensions.get("window").width / 4, height: 70 }}
          >
            {item.store.address +
              ", " +
              item.store.district +
              ", " +
              item.store.city}
          </Text>
        </View>
        <Button
          icon={{ name: "code" }}
          backgroundColor="#03A9F4"
          fontFamily="Lato"
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0
          }}
          title="Xem Ngay"
        />
      </Card>
    );
  }
}

export default ProductItem;

const styles = StyleSheet.create({
  imageStyle: {
    flexDirection: "row",
    height: 150,
    width: '100%',
  }
});
