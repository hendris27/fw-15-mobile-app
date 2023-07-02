import {Text, View} from 'react-native';
import React from 'react';
import globalStyles from '../assets/css/globalStyles';
import FeatherIcon from 'react-native-vector-icons/Feather';

const Headers = ({children, ...rest}) => {
  return (
    <View {...rest} style={globalStyles.navContainerChild}>
      <View>
        <FeatherIcon name="arrow-left" size={25} color="white" />
      </View>
      <View>
        <Text style={globalStyles.textTitleWhite}>{children}</Text>
      </View>
      <View />
    </View>
  );
};

export default Headers;
