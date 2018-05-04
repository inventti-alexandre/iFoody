import React from 'react';
import { Button } from 'react-native-elements';

const GeneralButton = ({ onPress, children }) => (
    <Button
      onPress={onPress}
      title={children}
      titleStyle={{ fontWeight: '700' }}
      containerStyle={{
        flex: 1
      }}
      buttonStyle={{
         backgroundColor: 'black',
         height: 45,
         borderColor: 'transparent',
         borderWidth: 0,
         borderRadius: 20,
      }}
       containerStyle={{ marginTop: 20 }}
    />
  );

export default GeneralButton;
