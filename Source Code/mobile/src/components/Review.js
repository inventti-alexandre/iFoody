import { Text, View } from 'react-native';
import React, { Component } from 'react';
import { Avatar } from 'react-native-elements';
import axios from 'axios';
import Moment from 'moment';
import { StoreReview, ProductReview } from '../assets/constants/apiUrl';

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: '',
      storeId: '',
      reviewList: []
    };
    console.log('REVIEW constructor . props is', this.props);
  }

  componentWillMount() {
    if (this.props.productId !== null && this.props.productId !== undefined) {
      this.setState({ productId: this.props.productId });
    } else if (this.props.storeId !== null && this.props.storeId !== undefined) {
      this.setState({ storeId: this.props.storeId });
    }
  }

  componentDidMount() {
    this.fetchReviewList();
  }

  fetchReviewList = () => {
    if (this.props.productId !== null && this.props.productId !== undefined) {
      console.log('PRODUCTID in Review ', this.props.productId);
      axios.get(`${ProductReview}/${this.props.productId}`)
        .then(response => {
          console.log('Review response: ', response);
          this.setState({ reviewList: response.data });
        })
        .catch(error => {
          console.log('fetchReviewList error: ', error);
        });
    } else if (this.props.storeId !== null && this.props.storeId !== undefined) {
      axios.get(`${StoreReview}/${this.props.storeId}`)
        .then(response => {
          console.log('Review response: ', response);
          this.setState({ reviewList: response.data });
        })
        .catch(error => {
          console.log('fetchReviewList error: ', error);
        });
    }
  }

  render() {
    Moment.locale('en');
    return (
      <View style={{ marginTop: 15 }}>
      <Text style={{ fontSize: 17, marginLeft: 10 }}>Đánh giá</Text>
        { this.state.reviewList.map((item, key) => (
          <View key={key} style={{ marginLeft: 10, marginRight: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
              <Avatar
                small
                rounded
                source={{
                  uri: 'https://imagineacademy.microsoft.com/content/images/microsoft-img.png'
                }}
                onPress={() => console.log('Works!')}
                activeOpacity={0.7}
              />

              <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>
                {item.user.lastName} {item.user.firstName}
              </Text>
              <Text style={{ fontSize: 13, marginLeft: 'auto' }}>
                {Moment(item.review.date).format('DD-MM-YYYY')}
              </Text>
            </View>

            <View style={{ marginBottom: 20, marginLeft: 20 }}>
              <Text>{item.review.reviewContent}</Text>
            </View>

          </View>
        ))}
      </View>
    );
  }
}

export default Review;
