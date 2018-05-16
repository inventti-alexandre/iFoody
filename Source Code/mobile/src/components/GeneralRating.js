import React, { Component } from 'react';
import { Rating } from 'react-native-elements';

class GeneralRating extends Component {
  constructor(props) {
    super(props);
  }
  ratingCompleted(rating) {
    console.log(`Rating is: ${rating}`);
  }

  render() {
    let rating = this.props.rating;
    console.log('inside Rating component', this.props.rating);
    return (
      <Rating
        readonly
        showReadOnlyText='false'
        type="star"
        fractions={1}
        startingValue={rating}
        type='custom'
        imageSize={10}
        onFinishRating={this.ratingCompleted}
        style={{ paddingVertical: 10, alignItems: 'center' }}
      />
    );
  }
}

export default GeneralRating;
