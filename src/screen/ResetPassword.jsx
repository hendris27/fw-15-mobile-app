import {View, Text} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import styles from '../assets/css/globalStyles';
import Input from '../components/Input';
import Alert from '../components/Alert';
import Button from '../components/Button';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {asyncResetPassword} from '../redux/actions/auth';
import {clearMessage} from '../redux/reducers/auth';

const validationSchema = Yup.object({
  code: Yup.string()
    .required('Your Code is invalid!')
    .min(6, 'Your Code is invalid ')
    .max(6, 'Your Code max 6 digit'),
  email: Yup.string()
    .email('insert your the email valid')
    .required('Email is Invalid'),
  password: Yup.string()
    .required('Password is invalid')
    .min(8, 'mininum 8 character'),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});
const ResetPassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const successMessage = useSelector(state => state.auth.successMessage);
  const errorMessage = useSelector(state => state.auth.errorMessage);

  const doReset = values => {
    dispatch(asyncResetPassword(values));
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
  } catch (err) {
    if (err?.response?.data?.message === 'code for forgot password has used!') {
      setTimeout(() => {
        navigation.replace('ResetPassword');
      }, 3000);
    }
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.textTitle}>
        <Text style={styles.title}>Reset Password</Text>
        <View style={styles.textSubTitle}>
          <Text style={styles.textColor}>Reset your password in here</Text>
        </View>
        {successMessage && <Alert variant="Message">{successMessage}</Alert>}
        {errorMessage && <Alert variant="error">{errorMessage}</Alert>}
      </View>

      <Formik
        initialValues={{
          code: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={doReset}>
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
              placeholder="Input Your Code Here"
              onBlur={handleBlur('code')}
              onChangeText={handleChange('code')}
              value={values.code}
              keyboardType="numeric"
            />
            {errors.code && touched.code && (
              <Text style={styles.errorsText}>{errors.code}</Text>
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

            <Button
              disabled={!touched.email && !touched.password}
              onPress={handleSubmit}
              btnTitle="Confirm">
              Confirm
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ResetPassword;
