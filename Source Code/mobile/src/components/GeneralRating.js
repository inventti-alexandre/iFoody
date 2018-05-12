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
    return (
      <Rating
        readonly
        showReadOnlyText='false'
        type="star"
        fractions={1}
        startingValue={this.props.value}
        type='custom'
        imageSize={10}
        onFinishRating={this.ratingCompleted}
        style={{ paddingVertical: 10, alignItems: 'center' }}
      />
    );
  }
}

export default GeneralRating;
