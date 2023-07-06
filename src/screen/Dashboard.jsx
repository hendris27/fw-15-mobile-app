import {View, Text, Image, StyleSheet} from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import React, {useCallback} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import globalStyles from '../assets/css/globalStyles';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useFocusEffect} from '@react-navigation/native';
import http from '../helpers/https';
import moment from 'moment';
import {useSelector} from 'react-redux';

const Home = ({navigation}) => {
  const defaultimg = require('../assets/img/default-profile.jpg');
  const [events, setEvents] = React.useState([]);
  const [eventCategories, setEventCategories] = React.useState([]);
  const [eventCategoriesData, setEventCategoriesData] = React.useState([]);
  const [search, setSearch] = React.useState('');

  const deviceToken = useSelector(state => state.deviceToken.data);
  const token = useSelector(state => state.auth.token);
  const saveToken = useCallback(async () => {
    const form = new URLSearchParams({token: deviceToken.token});
    await http(token).post('/device-token', form.toString());
  }, [deviceToken, token]);

  React.useEffect(() => {
    saveToken();
  }, [saveToken]);

  useFocusEffect(
    React.useCallback(() => {
      async function getDataEvent() {
        try {
          const {data} = await http().get('/event?limit=10');
          setEvents(data.results);
        } catch (error) {
          const message = error?.response?.data?.message;
          if (message) {
            console.log(message);
          }
        }
      }
      getDataEvent();
    }, []),
  );

  async function getEventByCategory(name) {
    const {data} = await http(token).get('/event', {params: {category: name}});
    setEventCategoriesData(data.results);
  }

  async function getEventByName(search) {
    const eventdata = await http(token).get('/events?limit=20');
    const {data} = await http(token).get('/event', {
      params: {search: search},
    });
    if (search === '') {
      setEvents(eventdata.data.results);
    } else {
      setEvents(data.results);
    }
  }
  React.useEffect(() => {
    async function getEventCategories() {
      let {data} = await http(token).get('/category?limit=7');
      setEventCategories(data.results);
    }

    getEventCategories();
    getEventByCategory();
  }, []);

  return (
    <View style={globalStyles.wrapperDasboard}>
      <View>
        <View style={globalStyles.navContainer}>
          <View>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <FeatherIcon name="menu" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <FeatherIcon name="message-square" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={globalStyles.inputDashboard}>
        <TextInput
          style={globalStyles.inputComponentsDashboard}
          placeholder="Search event..."
          onChangeText={ev => setSearch(ev)}
          onSubmitEditing={() => getEventByName(search)}
          onBlur={() => getEventByName()}
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} color="white" />
      </View>
      <ScrollView style={globalStyles.container} horizontal={false}>
        <View style={globalStyles.eventContainer}>
          <Text style={globalStyles.textTitleEvent}>Events For You</Text>
          <FeatherIcon name="sliders" size={30} color="black" />
        </View>
        <ScrollView horizontal={true} style={globalStyles.wrapperBox}>
          {events.map(event => {
            return (
              <TouchableOpacity
                key={`events-detail${event.id}`}
                onPress={() => {
                  navigation.navigate('Detail Event', {
                    id: event.id,
                  });
                }}
                style={globalStyles.boxEvent}>
                {!event.picture && (
                  <Image style={globalStyles.img} source={defaultimg} />
                )}
                {event.picture && (
                  <Image
                    style={globalStyles.img}
                    source={{
                      uri: event.picture,
                    }}
                  />
                )}

                <View style={globalStyles.wrapperTitleTextHome}>
                  <Text style={globalStyles.textTitleDetail}>
                    {moment(event.date).format('LLLL')}
                  </Text>
                  <Text style={globalStyles.textTitleMain}>
                    {event?.tittle}
                  </Text>
                  <TouchableOpacity style={globalStyles.btnArrowRight}>
                    <View>
                      <FeatherIcon name="arrow-right" size={30} color="white" />
                    </View>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <View>
          <Text style={globalStyles.textTitleDiscover}>Discover</Text>
        </View>
        <ScrollView style={globalStyles.wrapperBox} horizontal={true}>
          {eventCategories.map(eventCat => {
            return (
              <View key={eventCat.id}>
                <TouchableOpacity
                  style={style.boxEventCategories}
                  onPress={() => getEventByCategory(eventCat.name)}>
                  <Text style={{color: 'black'}}>{eventCat.name}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
        <View style={globalStyles.containerUpcoming}>
          <Text style={globalStyles.containerTextUpcoming}>Upcoming</Text>
          <Text style={globalStyles.textColor}>See all</Text>
        </View>
        {eventCategoriesData.map(item => {
          return (
            <View key={item.id} style={globalStyles.eventUpcoming}>
              <View style={globalStyles.upcomingTextCont}>
                <View style={globalStyles.textContDay}>
                  <Text style={globalStyles.textDay}>
                    {moment(item.date).format('DD')}
                  </Text>
                  <Text style={globalStyles.textDay}>
                    {moment(item.date).format('ddd')}
                  </Text>
                </View>
              </View>
              <ScrollView horizontal={true} style={globalStyles.wrapperBox}>
                <TouchableOpacity
                  key={`events-detail${item.id}`}
                  onPress={() => {
                    navigation.navigate('DetailEvent', {
                      id: item.id,
                    });
                  }}
                  style={globalStyles.boxEvent}>
                  {!item.picture && (
                    <Image style={globalStyles.img} source={defaultimg} />
                  )}
                  {item.picture && (
                    <Image
                      style={globalStyles.img}
                      source={{
                        uri: item.picture,
                      }}
                    />
                  )}

                  <View style={globalStyles.wrapperTitleTextHome}>
                    <Text style={globalStyles.textTitleDetail}>
                      {moment(item.date).format('LLLL')}
                    </Text>
                    <Text style={globalStyles.textTitleMain}>
                      {item?.tittle}
                    </Text>
                    <TouchableOpacity style={globalStyles.btnArrowRight}>
                      <View>
                        <FeatherIcon
                          name="arrow-right"
                          size={30}
                          color="white"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
const style = StyleSheet.create({
  boxEventCategories: {
    width: 120,
    height: 50,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#52006A',
    backgroundColor: 'gray',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});

export default Home;
