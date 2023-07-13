import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import globalStyles from '../assets/css/globalStyles';
import FeatherIcon from 'react-native-vector-icons/Feather';

const MyBooking = () => {
  return (
    <ScrollView style={globalStyles.containerChild}>
      <View style={globalStyles.navContainerChild}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <FeatherIcon name="arrow-left" size={25} color="#FFF" />
        </TouchableOpacity>
        <View>
          <Text style={globalStyles.textTitleWhite}>My Booking</Text>
        </View>
        <View>
          <Text />
        </View>
      </View>
      <View style={style.wrapperContent}>
        <View style={style.month}>
          <View>
            <Text style={style.textMonth}>March</Text>
          </View>
        </View>
        <View style={style.wrapperItem}>
          <View style={style.mainContentDetail}>
            <View style={style.dateContent}>
              <View style={style.textContDay}>
                <Text style={style.textDay}>15</Text>
                <Text>Wed</Text>
              </View>
            </View>
            <View style={style.titleEvent}>
              <View>
                <Text style={style.textTitle}>Sight & Sound Exhibition</Text>
              </View>
              <View style={style.titleTime}>
                <Text>Jakarta, Indonesia</Text>
                <Text>Wed, 15 Nov, 4.00 PM</Text>
              </View>
              <TouchableOpacity>
                <Text style={style.textDetail}>Detail</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.mainContentDetail}>
            <View style={style.dateContent}>
              <View style={style.textContDay}>
                <Text style={style.textDay}>15</Text>
                <Text>Wed</Text>
              </View>
            </View>
            <View style={style.titleEvent}>
              <View>
                <Text style={style.textTitle}>Sight & Sound Exhibition</Text>
              </View>
              <View style={style.titleTime}>
                <Text>Jakarta, Indonesia</Text>
                <Text>Wed, 15 Nov, 4.00 PM</Text>
              </View>
              <TouchableOpacity>
                <Text style={style.textDetail}>Detail</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(51, 102, 255, 1)',
  },
  contText: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  textEditMb: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  wrapperContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    padding: 30,
    gap: 50,
  },
  month: {
    backgroundColor: 'rgba(234, 241, 255, 1)',
    width: 125,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMonth: {
    fontWeight: 'bold',
    color: 'blue',
  },
  mainContentDetail: {
    flexDirection: 'row',
    gap: 15,
  },
  dateContent: {
    width: 60,
    height: 85,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 4,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContDay: {
    alignItems: 'center',
  },
  textDay: {
    color: '#FF8900',
    fontWeight: 'bold',
    fontSize: 16,
  },
  titleEvent: {
    gap: 15,
    width: 233,
  },
  textTitle: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  titleTime: {
    gap: 10,
  },
  textDetail: {
    color: 'blue',
  },
  wrapperItem: {
    gap: 40,
  },
});
export default MyBooking;
