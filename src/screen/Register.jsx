import {View, Text, TouchableOpacity} from 'react-native';
import {Checkbox} from 'react-native-paper';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import styles from '../assets/css/globalStyles';
import Input from '../components/Input';
import Alert from '../components/Alert';
import Button from '../components/Button';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {asyncRegister} from '../redux/actions/auth';
import {clearMessage} from '../redux/reducers/auth';

const validationSchema = Yup.object({
  fullName: Yup.string()
    .required('Full name is invalid!')
    .min(3, 'Your Name Minimun 3 Character'),
  email: Yup.string()
    .email('insert your the email valid')
    .required('Email is Invalid'),
  password: Yup.string().required('Password is invalid'),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const Register = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const successMessage = useSelector(state => state.auth.successMessage);
  const errorMessage = useSelector(state => state.auth.errorMessage);

  const doRegister = values => {
    dispatch(asyncRegister(values));
  };
  try {
    if (successMessage) {
      setTimeout(() => {
        dispatch(clearMessage());
        navigation.replace('Login');
      }, 1500);
    }
    if (errorMessage) {
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    }
  } catch (err) {}

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
        {successMessage && <Alert variant="Message">{successMessage}</Alert>}
        {errorMessage && <Alert variant="error">{errorMessage}</Alert>}
      </View>

      <Formik
        initialValues={{
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={doRegister}>
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
              placeholder="Insert Your Full Name"
              onBlur={handleBlur('fullName')}
              onChangeText={handleChange('fullName')}
              value={values.fullName}
            />
            {errors.fullName && touched.fullName && (
              <Text style={styles.errorsText}>{errors.fullName}</Text>
            )}
            <Input
              label="email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="Input your email"
              keyboardType="email-address"
            />
            {errors.email && touched.email && (
              <Text style={styles.errorsText}>{errors.email}</Text>
            )}
            <Input
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder="Input your password"
              secureTextEntry
            />
            {errors.password && touched.password && (
              <Text style={styles.errorsText}>{errors.password}</Text>
            )}
            <Input
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              placeholder="Input your confirmPassword"
              secureTextEntry
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <Text style={styles.errorsText}>{errors.confirmPassword}</Text>
            )}

            <View style={styles.textSubTitle}>
              <Checkbox />
              <Text style={styles.textColor}>Accept terms and condition</Text>
            </View>

            <Button
              disabled={!touched.email && !touched.password}
              onPress={handleSubmit}
              btnTitle="Register">
              Register
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Register;
