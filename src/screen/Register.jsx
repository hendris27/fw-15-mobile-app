import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Checkbox, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

const Register = () => {
  const navigation = useNavigation();
  const [checked, setChecked] = React.useState(false);

  const [text, setText] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [textConfrimPassword, setTextConfrimPassword] = React.useState('');
  const [secureTextEntryConfrimPassword, setSecureTextEntryConfrimPassword] =
    React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const toggleSecureEntryConfrimPassword = () => {
    setSecureTextEntryConfrimPassword(!secureTextEntryConfrimPassword);
  };
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
              placeholder="Password"
              secureTextEntry={secureTextEntryConfrimPassword}
              value={textConfrimPassword}
              onChangeText={setTextConfrimPassword}
              right={
                <TextInput.Icon
                  name={secureTextEntryConfrimPassword ? 'eye' : 'eye-off'}
                  color="red"
                  onPress={toggleSecureEntryConfrimPassword}
                />
              }
            />
          </SafeAreaView>
        </SafeAreaView>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={secureTextEntry}
            value={text}
            onChangeText={setText}
            right={
              <TextInput.Icon
                name={secureTextEntry ? 'eye' : 'eye-off'}
                color="red"
                onPress={toggleSecureEntry}
              />
            }
          />
        </SafeAreaView>
      </View>
      <View style={styles.accept}>
        <Checkbox
          status={text ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!text);
          }}
        />
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
