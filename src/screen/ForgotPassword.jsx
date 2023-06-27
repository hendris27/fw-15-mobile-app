import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React from 'react';
import styles from '../assets/css/globalStyles';

const ForgotPassword = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.textTitle}>
        <Text style={styles.title}>Forgot Password</Text>
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
      </View>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;
