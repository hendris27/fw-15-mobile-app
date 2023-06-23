import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Register = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.textTitle}>
        <Text style={{fontSize: 24, fontWeight: '600'}}>Login</Text>
        <Text>Already have an account? Log In</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    color: 'red',
    backgroundColor: 'gray',
    // height: '100%',
  },
  textTitle: {
    color: 'white',
    marginTop: 30,
    padding: 20,
    flexDirection: 'coloumn',
    rowGap: 20,
  },
});

export default Register;
