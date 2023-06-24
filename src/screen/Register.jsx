import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CheckBox from 'react-native-check-box';
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
        <SafeAreaView>
          <TextInput
            style={styles.input}
            placeholder="email"
            emailTextEntry
            placeholderTextColor="gray"
          />
        </SafeAreaView>
        <SafeAreaView>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="password"
              placeholderTextColor="gray"
            />
          </SafeAreaView>
        </SafeAreaView>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="confirm password"
            placeholderTextColor="gray"
          />
        </SafeAreaView>
      </View>
      <View style={styles.accept}>
        <CheckBox style={styles.ck} />
        <Text style={{color: 'black', fontFamily: 'Poopins'}}>
          Accept terms and condition
        </Text>
      </View>
      <View
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          marginTop: 30,
          borderRadius: 20,
        }}>
        <Pressable style={styles.btn}>
          <Text style={{color: 'white', fontSize: 18}}>Register</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {height: '100%'},
  accept: {
    flexDirection: 'row',
    columnGap: 10,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#0E8388',
    padding: 15,
    alignItems: 'center',
    borderRadius: 20,
  },

  input: {
    height: 55,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    color: 'black',
    paddingLeft: 15,
    paddingBottom: 10,
    paddingTop: 10,
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
