import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import globalStyles from '../assets/css/globalStyles';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import http from '../helpers/https';
import moment from 'moment';

const MyBooking = ({ navigation }) => {
  const [history, setHistory] = React.useState([]);
  const token = useSelector(state => state.auth.token);

  useFocusEffect(
    React.useCallback(() => {
      async function getHistoryBooking() {
        const { data } = await http(token).get('/history');
        setHistory(data.results);
      }

      getHistoryBooking();
    }, []),
  );
  return (
    <View style={globalStyles.containerChild}>
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
      <ScrollView>
        <View style={style.wrapperContent}>
          <View style={style.month}>
            <Text>March</Text>
          </View>
          {history.length < 1 && (
            <View style={style.noEventContainer}>
              <Text style={style.noEventText}>No tickets bought</Text>
              <View>
                <Text style={style.noEventSubText}>It seems you haven't "bought any ticket yet.</Text>
                <Text style={style.noEventSubText}>you can explore everything here.</Text>
                <Text style={style.noEventSubText}>do you want to try it?</Text>
              </View>
            </View>
          )}
          {history.map(item => {
            return (
              <View key={item.id} style={style.wrapperItem}>
                <View style={style.mainContentDetail}>
                  <View style={style.dateContent}>
                    <View style={style.textContDay}>
                      <Text style={style.textDay}>{moment(item.date).format('DD')}</Text>
                      <View>
                        <Text style={style.textDay}>{moment(item.date).format('ddd')}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={style.titleEvent}>
                    <View>
                      <Text style={style.textTitle}>{item.tittle}</Text>
                    </View>
                    <View>
                      <Text style={style.FontStyle}>{item.name}</Text>
                    </View>
                    <View style={style.titleTime}>
                      <Text>{moment(item.date).format('LLLL')}</Text>
                    </View>
                    <TouchableOpacity>
                      <Text style={style.textDetail}>Detail</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
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
  noEventSubText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    textTransform: 'capitalize',
    textAlign: 'center',
    color: 'black',
  },
  noEventContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
export default MyBooking;
