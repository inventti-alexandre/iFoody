import React, { Component } from 'react';
import { Rating } from 'react-native-elements';

class GeneralRating extends Component {

  ratingCompleted(rating) {
    console.log(`Rating is: ${rating}`);
  }

  render() {
    console.log('inside Rating component');
    return (
      <Rating
        readonly
        showReadOnlyText='false'
        type="star"
        fractions={1}
        startingValue={3.4}
        type='custom'
        imageSize={10}
        onFinishRating={this.ratingCompleted}
        style={{ paddingVertical: 10, alignItems: 'center' }}
      />
    );
  }
}

export default GeneralRating;
