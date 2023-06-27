import {View, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import globalStyles from '../assets/css/globalStyles';
import Icon from 'react-native-vector-icons/Feather';

const Input = ({secureTextEntry, ...rest}) => {
  const [visible, setVisible] = React.useState(false);
  return (
    <View style={globalStyles.input}>
      {!secureTextEntry && (
        <TextInput
          {...rest}
          style={globalStyles.inputComponents}
          placeholderTextColor="gray"
        />
      )}
      {secureTextEntry && (
        <TextInput
          {...rest}
          secureTextEntry={!visible}
          style={globalStyles.inputComponents}
          placeholderTextColor="gray"
        />
      )}
      {secureTextEntry && (
        <TouchableOpacity onPress={() => setVisible(!visible)}>
          {visible && <Icon name="eye" color="black" size={20} />}
          {!visible && <Icon name="eye-off" color="black" size={20} />}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;
