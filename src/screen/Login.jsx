import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import styles from '../assets/css/globalStyles';
import Iconfacebook from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/AntDesign';

const Login = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <View style={styles.textTitle}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.textSubTitle}>
          <Text style={styles.textColor}>Hi, Welcome back to Urticket! </Text>
        </View>
      </View>

      <View style={styles.parentInput}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="email"
            placeholderTextColor="gray"
            keyboardType="email-address"
          />
        </View>
        <View>
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="password"
            placeholderTextColor="gray"
          />
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.textForgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.loginWith}>
        <View>
          <Text style={styles.textColor}>Login With</Text>
        </View>
        <View style={styles.iconloginWith}>
          <Iconfacebook name="facebook" color="blue" size={40} />
          <Icon name="google" color="green" size={40} />
        </View>
      </View>
    </View>
  );
};

export default Login;
