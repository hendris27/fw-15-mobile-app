import {View, Text, StyleSheet, ScrollView} from 'react-native';

import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import globalStyles from '../assets/css/globalStyles';
import styles from '../assets/css/globalStyles';
import Button from '../components/Button';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Alert from '../components/Alert';
import Input from '../components/Input';
import {useDispatch, useSelector} from 'react-redux';
import {clearMessage} from '../redux/reducers/auth';
import http from '../helpers/https';
import Icon from 'react-native-vector-icons/Feather';

const validationSchema = Yup.object({
  oldPassword: Yup.string()
    .required('Full name is invalid!')
    .min(3, 'Please insert valid full name'),

  newPassword: Yup.string().required('Password is invalid'),
  confirmNewPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});
const ChangePassword = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');
  const [successMsg, setSuccessMsg] = React.useState('');

  const doChangePassword = async values => {
    setErrorMessage('');
    setSuccessMsg('');
    setErrorMsg('');
    try {
      setSuccessMsg('');
      const body = new URLSearchParams(values).toString();
      const {data} = await http(token).patch('/changePassword', body);

      if (data.message === 'change password succes') {
        setSuccessMsg('Change Password Success');
        setTimeout(() => {
          setSuccessMsg('');
          dispatch(clearMessage());
        }, 2000);
      }
      if (errorMessage === '') {
        if (data.results.errors) {
          dispatch(clearMessage());
          setErrorMsg(data.results.errors[0].msg);
        }
      }
    } catch (error) {
      const message = error?.response?.data?.message;
      if (message) {
        setTimeout(() => {
          setErrorMsg(message);
        }, 1500);
      }
    }
  };

  return (
    <ScrollView style={globalStyles.containerTitleNav}>
      <View style={globalStyles.navContainerChild}>
        <View>
          <FeatherIcon name="arrow-left" size={25} color="white" />
        </View>
        <View>
          <Text style={globalStyles.textTitleWhite}>Change Password</Text>
        </View>
        <View>
          <Text />
        </View>
      </View>
      {errorMessage && <Alert>{errorMessage}</Alert>}
      {errorMsg && <Alert>{errorMsg}</Alert>}
      {successMsg && (
        <View style={style.boxMessage}>
          <Icon size={22} name="check" />
          <Text style={globalStyles.textColor}>{successMsg}</Text>
        </View>
      )}
      <View style={globalStyles.wrapperContent}>
        <Formik
          initialValues={{
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={doChangePassword}>
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
                placeholder="Old Password"
                onBlur={handleBlur('oldPassword')}
                onChangeText={handleChange('oldPassword')}
                value={values.oldPassword}
                secureTextEntry
              />
              {errors.oldPassword && touched.oldPassword && (
                <Text style={styles.errorsText}>{errors.oldPassword}</Text>
              )}

              <Input
                onChangeText={handleChange('newPassword')}
                onBlur={handleBlur('newPassword')}
                value={values.newPassword}
                placeholder="New Password"
                secureTextEntry
              />
              {errors.newPassword && touched.newPassword && (
                <Text style={styles.errorsText}>{errors.newPassword}</Text>
              )}
              <Input
                onChangeText={handleChange('confirmNewPassword')}
                onBlur={handleBlur('confirmNewPassword')}
                value={values.confirmNewPassword}
                placeholder="Confirm New Password"
                secureTextEntry
              />
              {errors.confirmNewPassword && touched.confirmNewPassword && (
                <Text style={styles.errorsText}>
                  {errors.confirmNewPassword}
                </Text>
              )}

              <Button
                disabled={!touched.email && !touched.newPassword}
                onPress={handleSubmit}
                btnTitle="Update">
                Update
              </Button>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};
const style = StyleSheet.create({
  boxMessage: {
    width: '100%',
    height: 45,
    borderRadius: 10,
    backgroundColor: '#10b981',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
});
export default ChangePassword;
