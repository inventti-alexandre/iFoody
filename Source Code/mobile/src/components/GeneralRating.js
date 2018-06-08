import React, { Component } from 'react';
import { Rating } from 'react-native-elements';

class GeneralRating extends Component {
  constructor(props) {
    super(props);
  }
  
  ratingCompleted(rating) {
  }

  render() {
    const rating = this.props.rating;
    return (
      <Rating
        readonly
        showReadOnlyText='false'
        type="star"
        fractions={1}
        startingValue={rating}
        type='custom'
        imageSize={this.props.size/7.7}
        onFinishRating={this.ratingCompleted}
        style={{  }}
      />
    );
  }
}

export default GeneralRating;
