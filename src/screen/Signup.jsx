import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {Checkbox} from 'react-native-paper';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import styles from '../assets/css/globalStyles';

const Register = () => {
  const navigation = useNavigation();
  const [checked, setChecked] = React.useState(false);
  const [text, setText] = React.useState('');

  return (
    <View style={styles.wrapper}>
      <View style={styles.textTitle}>
        <Text style={styles.title}>Register</Text>
        <View style={styles.textSubTitle}>
          <Text style={styles.textColor}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.textPrimary}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.parentInput}>
        <View style={styles.input}>
          <TextInput
            style={styles.inputComponents}
            placeholder="Email"
            placeholderTextColor="gray"
          />
        </View>
        <View>
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="gray"
          />
        </View>
        <View>
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="gray"
          />
        </View>
      </View>
      <View style={styles.textSubTitle}>
        <Checkbox
          status={text ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!text);
          }}
        />
        <Text style={styles.textColor}>Accept terms and condition</Text>
      </View>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
