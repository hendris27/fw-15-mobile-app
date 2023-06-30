import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Alert = ({variant, children}) => {
  if (variant === 'error') {
    return (
      <View style={styles.errorWrapper}>
        <Text style={styles.errorText}>{children}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.text}>{children}</Text>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  errorWrapper: {
    backgroundColor: '#ff9191',
    borderWidth: 1,
    borderColor: '#ff3636',
    padding: 5,
  },
  errorText: {
    color: '#ff3636',
  },
  wrapper: {
    backgroundColor: '#bfbfbf',
    borderWidth: 1,
    borderColor: '#545454',
    padding: 5,
  },
  text: {
    color: '#545454',
  },
});

export default Alert;
