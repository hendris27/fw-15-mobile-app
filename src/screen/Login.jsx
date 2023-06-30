import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import styles from '../assets/css/globalStyles';
import Iconfacebook from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import Button from '../components/Button';
import {login} from '../redux/reducers/auth';
import Input from '../components/Input';
import {asyncLogin} from '../redux/actions/auth';
import {useDispatch, useSelector} from 'react-redux';
import Alert from '../components/Alert';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const errorMessage = useSelector(state => state.auth.errorMessage);

  const doLogin = () => {
    // dispatch(login('abc'));
    dispatch(asyncLogin({email, password}));
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.textTitle}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.textSubTitle}>
          <Text style={styles.textColor}>Hi, Welcome back to Urticket! </Text>
        </View>
      </View>
      {errorMessage && <Alert variant="error">{errorMessage}</Alert>}
      <View style={styles.parentInput}>
        <Input
          onChangeText={setEmail}
          placeholder="email"
          placeholderTextColor="gray"
          keyboardType="email-address"
        />

        <Input
          onChangeText={setPassword}
          placeholder="password"
          secureTextEntry
          placeholderTextColor="gray"
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.textForgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <View>
        <Button onPress={doLogin}>Login</Button>
      </View>
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
