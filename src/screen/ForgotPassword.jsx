import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {asyncForgotPassword} from '../redux/actions/auth';
import React from 'react';
import styles from '../assets/css/globalStyles';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Alert from '../components/Alert';
import {clearMessage} from '../redux/reducers/auth';

const ForgotPassword = () => {
  const successMessage = useSelector(state => state.auth.successMessage);
  const errorMessage = useSelector(state => state.auth.errorMessage);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const doForgotPassword = values => {
    dispatch(asyncForgotPassword(values));
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('email cannot be empty'),
  });
  try {
    if (successMessage) {
      setTimeout(() => {
        dispatch(clearMessage());
        navigation.navigate('ResetPassword');
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
        <Text style={styles.title}>Forgot Password</Text>
        <View style={styles.textSubTitle}>
          <Text style={styles.textColor}>Hi, Welcome back to Zonaticket! </Text>
        </View>
      </View>
      {successMessage && <Alert variant="Message">{successMessage}</Alert>}
      {errorMessage && <Alert variant="error">{errorMessage}</Alert>}
      <View />
      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={doForgotPassword}
        validationSchema={validationSchema}>
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <View style={styles.parentInput}>
            <TextInput
              style={styles.input}
              placeholder="email"
              placeholderTextColor="gray"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />

            {errors.email && touched.email && (
              <Text style={styles.errorsText}>{errors.email}</Text>
            )}
            <TouchableOpacity
              onPress={() => navigation.navigate('ResetPassword')}>
              <Text style={styles.textPrimary}>Reset Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
              <Text style={styles.btnText}>Send</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ForgotPassword;
