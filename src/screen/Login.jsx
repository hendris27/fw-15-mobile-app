import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Register = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <View style={styles.textTitle}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.textSubTitle}>
          <Text style={styles.textColor}>Hi, Welcome back to Urticket! </Text>
        </View>
      </View>
      <View />
      <View style={styles.parentInput}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="email"
            placeholderTextColor="gray"
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
          <View>
            <Text>1</Text>
          </View>
          <View>
            <Text>2</Text>
          </View>
          <View>
            <Text>3</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    paddingRight: 10,
    paddingLeft: 10,
  },
  btn: {
    width: '100%',
    marginTop: 30,
    backgroundColor: '#0E8388',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
  },
  parentInput: {
    flexDirection: 'column',
    rowGap: 20,
  },
  input: {
    height: 55,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    color: 'black',
    fontSize: 18,
    marginTop: 20,
  },
  textTitle: {
    color: 'black',
    marginTop: 30,
    flexDirection: 'coloumn',
    rowGap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  textSubTitle: {
    flexDirection: 'row',
    columnGap: 5,
  },
  textColor: {
    color: 'black',
  },
  textForgotPassword: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    textAlign: 'right',
    paddingRight: 10,
  },
  loginWith: {
    flexBasis: 'coloumn',
    rowGap: 10,
    marginTop: 40,
    alignItems: 'center',
  },
  iconloginWith: {
    flexDirection: 'row',
  },
});

export default Register;
