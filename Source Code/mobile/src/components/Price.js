import React, { Component } from 'react';
import { PricingCard } from 'react-native-elements';

class Price extends Component {

  render() {
    console.log('inside Price component');
    return (
        <PricingCard
          color='#4f9deb'
          price='23000-29000'
          info={['Coffee Sữa Đá', '172 Bàu Cát, Quận 10, TPHCM']}
          button={{ title: 'Xem', icon: 'pets' }}
        />
    );
  }
}

export default Price;
