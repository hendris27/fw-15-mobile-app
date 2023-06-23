import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React from 'react';

const Register = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <View style={styles.textTitle}>
        <Text style={{fontSize: 24, fontWeight: '600', color: 'black'}}>
          Register
        </Text>
        <View style={styles.textSubTitle}>
          <Text style={{color: 'black'}}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{color: '#0E8388'}}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="email"
          placeholderTextColor="gray"
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          placeholderTextColor="gray"
        />
        <TextInput
          style={styles.input}
          placeholder="confirm password"
          placeholderTextColor="gray"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {height: '100%'},
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    color: 'black',
    paddingLeft: 15,
    paddingBottom: 10,
    paddingTop: 10,
    maxHeight: 50,
  },
  textTitle: {
    color: 'black',
    marginTop: 30,
    padding: 20,
    flexDirection: 'coloumn',
    rowGap: 20,
  },
  textSubTitle: {
    flexDirection: 'row',
    columnGap: 5,
  },
});

export default Register;
