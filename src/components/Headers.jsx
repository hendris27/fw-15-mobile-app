import {Text, View} from 'react-native';
import React from 'react';
import globalStyles from '../assets/css/globalStyles';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const Headers = ({children, ...rest}) => {
  const navigation = useNavigation();

  return (
    <View {...rest} style={globalStyles.navContainerChild}>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('')}>
          <FeatherIcon name="arrow-left" size={25} color="white" />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={globalStyles.textTitleWhite}>{children}</Text>
      </View>
      <View />
    </View>
  );
};

export default Headers;
