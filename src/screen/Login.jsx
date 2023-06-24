import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Pressable,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import {FaRocket} from 'react-icons/fa';

const Register = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <View style={styles.textTitle}>
        <Text style={{fontSize: 24, fontWeight: '600', color: 'black'}}>
          Login
        </Text>
        <View style={styles.textSubTitle}>
          <Text style={{color: 'black'}}>Hi, Welcome back to Urticket! </Text>
        </View>
      </View>
      {/* <View>
        <FaRocket size={30} color="#900" />
      </View> */}
      <View />
      <View>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            placeholder="email"
            placeholderTextColor="gray"
          />
        </SafeAreaView>
        <SafeAreaView>
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="password"
            placeholderTextColor="gray"
          />
        </SafeAreaView>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text
          style={{
            color: 'black',
            fontWeight: '600',
            textAlign: 'right',
            paddingRight: 15,
          }}>
          Forgot Password?
        </Text>
      </TouchableOpacity>
      <View
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          marginTop: 30,
          borderRadius: 20,
        }}>
        <Pressable style={styles.btn}>
          <Text style={{color: 'white', fontSize: 18}}>Login</Text>
        </Pressable>
      </View>
      <View
        style={{
          flexBasis: 'coloumn',
          rowGap: 10,
          marginTop: 40,
          alignItems: 'center',
        }}>
        <View>
          <Text style={{color: 'black'}}>Login With</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text style={{color: 'black'}}>1</Text>
          </View>
          <View>
            <Text style={{color: 'black'}}>2</Text>
          </View>
          <View>
            <Text style={{color: 'black'}}>3</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {height: '100%'},
  btn: {
    backgroundColor: '#0E8388',
    padding: 15,
    alignItems: 'center',
    borderRadius: 20,
  },

  input: {
    height: 55,
    margin: 10,
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
    color: 'black',
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
