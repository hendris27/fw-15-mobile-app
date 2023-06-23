import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        style={styles.content}>
        <Text style={styles.textColor}>Find Events You Love</Text>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../assets/img/main_logo.png')}
            style={styles.img}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#0E8388',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  img: {
    width: 600,
    height: 500,
    marginTop: 20,
  },

  textColor: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
    width: 295,
    textAlign: 'center',
    letterSpacing: 3,
    lineHeight: 72,
  },
});

export default Home;
