import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import React from 'react';

const ForgotPassword = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.textTitle}>
        <Text style={{fontSize: 24, fontWeight: '600', color: 'black'}}>
          Forgot Password
        </Text>
        <View style={styles.textSubTitle}>
          <Text style={{color: 'black'}}>
            You’ll get mail soon on your email{' '}
          </Text>
        </View>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="email"
          placeholderTextColor="gray"
        />
      </View>

      <View
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          marginTop: 30,
          borderRadius: 20,
        }}>
        <Button style={styles.btn} title="Confirm" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {height: '100%'},

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

export default ForgotPassword;
