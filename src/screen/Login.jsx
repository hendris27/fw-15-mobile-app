import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../assets/css/globalStyles';
import Iconfacebook from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import Button from '../components/Button';
import Input from '../components/Input';
import Alert from '../components/Alert';
import {asyncLogin} from '../redux/actions/auth';
import {useDispatch, useSelector} from 'react-redux';
import {clearMessage} from '../redux/reducers/auth';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {Formik} from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('insert your the email valid')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(state => state.auth.errorMessage);

  const doLogin = values => {
    dispatch(asyncLogin(values));
  };
  if (errorMessage) {
    setTimeout(() => {
      dispatch(clearMessage());
    }, 6000);
  }
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <FeatherIcon name="arrow-left" size={25} color="#373A42" />
      </TouchableOpacity>
      <View />
      <View style={styles.textTitle}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.textSubTitle}>
          <Text style={styles.textColor}>Hi, Welcome back to Urticket! </Text>
        </View>
        {errorMessage && <Alert variant="error">{errorMessage}</Alert>}
      </View>

      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={validationSchema}
        onSubmit={doLogin}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.parentInput}>
            <Input
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
            {errors.email && touched.email && (
              <Text style={styles.errorsText}>{errors.email}</Text>
            )}
            <Input
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder="Enter your password"
              secureTextEntry
            />
            {errors.password && touched.password && (
              <Text style={styles.errorsText}>{errors.password}</Text>
            )}

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.textForgotPassword}>Forgot Password ?</Text>
            </TouchableOpacity>
            <Button
              disabled={!touched.email && !touched.password}
              onPress={handleSubmit}
              btnTitle="Login">
              Login
            </Button>
          </View>
        )}
      </Formik>

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
