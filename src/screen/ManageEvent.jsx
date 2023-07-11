import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import globalStyles from '../assets/css/globalStyles';
import http from '../helpers/https';
import FeatherIcon from 'react-native-vector-icons/Feather';

const ManageEvent = ({ navigation }) => {
  const token = useSelector(state => state.auth.token);
  const [events, setEvents] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      async function getEvents() {
        const { data } = await http(token).get('/events?limit=10');
        setEvents(data.results);
      }
      getEvents();
    }, []),
  );
  const deleteAction = async eventsItem => {
    try {
      await http(token).delete(`/events/manage/${eventsItem}`);
      setEvents(events.filter(eventitems => eventitems.id !== eventsItem));
    } catch (err) {
      const message = err?.response?.data?.message;
      if (message) {
        console.warn(message);
      }
    }
  };

  return (
    <View style={globalStyles.containerTitleNav}>
      <View style={globalStyles.navContainerChild}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <FeatherIcon name="arrow-left" size={25} color="#FFF" />
        </TouchableOpacity>
        <View>
          <Text style={globalStyles.textTitleWhite}>Manage Event</Text>
        </View>
        <View>
          <Text></Text>
        </View>
      </View>
      <View style={{ backgroundColor: 'white' }}>
        <TouchableOpacity style={styles.buttonCreate}>
          <Text
            style={styles.buttonTextCreate}
            onPress={() => {
              navigation.navigate('CreateEvent');
            }}>
            Create
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {events.map(items => {
          return (
            <View key={items.id}>
              <View style={styles.wrapperBoxEvents}>
                <View style={styles.boxDateEvents}>
                  <View style={styles.DateWrapper}>
                    <Text style={styles.TextDate}>{moment(items.date).format('DD')}</Text>
                    <Text style={globalStyles.textColor}>{moment(items.date).format('ddd')}</Text>
                  </View>
                </View>
                <View style={styles.boxContentEvent}>
                  <View>
                    <Text style={styles.titleTextEvent}>{items.title}</Text>
                  </View>
                  <View>
                    <View>
                      <Text style={globalStyles.textColor}>{items.location}</Text>
                    </View>
                    <View>
                      <Text style={globalStyles.textColor}>{moment(items.date).format('LLLL')}</Text>
                    </View>
                  </View>
                  <View style={styles.gapTitle}>
                    <Text style={globalStyles.textColor}>Detail</Text>
                    <Text
                      onPress={() => navigation.navigate('UpdateEvent', { eventId: items.id })}
                      style={globalStyles.textColor}>
                      Update
                    </Text>
                    <Text onPress={() => deleteAction(items.id)} style={globalStyles.textColor}>
                      Delete
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonCreate: {
    backgroundColor: '#0E8388',
    width: 100,
    margin: 20,
    padding: 10,
    borderRadius: 10,
  },
  buttonTextCreate: {
    color: 'white',
    paddingTop: 3,
    textAlign: 'center',
  },
  wrapperBoxEvents: {
    flexDirection: 'row',
    gap: 30,
    paddingTop: 30,
  },
  boxDateEvents: {
    flexDirection: 'column',
    gap: 20,
  },
  boxContentEvent: {
    flexDirection: 'column',
    gap: 10,
  },
  titleTextEvent: {
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  gapTitle: { flexDirection: 'row', gap: 10 },
});
export default ManageEvent;
