import {View, Text, TouchableOpacity} from 'react-native';
import {Checkbox} from 'react-native-paper';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import styles from '../assets/css/globalStyles';
import Input from '../components/Input';
import Button from '../components/Button';

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
        <Input placeholder="Email" keyboardType="email-address" />

        <Input placeholder="Password" secureTextEntry />

        <Input placeholder="Confirm Password" secureTextEntry />
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
      <View>
        <Button>
          <Text>Sign Up</Text>
        </Button>
      </View>
    </View>
  );
};

export default Register;
