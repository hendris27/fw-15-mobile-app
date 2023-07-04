import {View, Text, Image, StyleSheet} from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import * as React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import globalStyles from '../assets/css/globalStyles';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {useFocusEffect} from '@react-navigation/native';
import http from '../helpers/https';
import moment from 'moment';
import {useSelector} from 'react-redux';

const Home = ({navigation}) => {
  const defaultimg = require('../assets/img/default-profile.jpg');
  const token = useSelector(state => state.auth.token);
  const [events, setEvents] = React.useState([]);
  const [eventCategories, setEventCategories] = React.useState([]);
  const [eventCategoriesData, setEventCategoriesData] = React.useState([]);
  const [search, setSearch] = React.useState('');

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
  useFocusEffect(
    React.useCallback(() => {
      async function getEventCategories() {
        let {data} = await http(token).get('/category?limit=7');
        setEventCategories(data.results);
      }

      getEventCategories();
      getEventByCategory();
    }, []),
  );

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
                onPress={() => navigation.navigate('DetailEvent')}
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
                  <TouchableOpacity
                    style={globalStyles.btnArrowRight}
                    onPress={() => navigation.navigate('Events')}>
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

          {/* <TouchableOpacity
            onPress={() => navigation.navigate('ManageEvent')}
            style={globalStyles.wrapperBoxNew}>
            <View style={globalStyles.wrapperBoxDiscover}>
              <View style={globalStyles.iconDiscover}>
                <FeatherIcon name="sliders" size={30} color="black" />
              </View>
              <Text style={globalStyles.textDiscover}>Technologi</Text>
            </View>
          </TouchableOpacity> */}
        </ScrollView>
        <View style={globalStyles.containerUpcoming}>
          <Text style={globalStyles.containerTextUpcoming}>Upcoming</Text>
          <Text style={globalStyles.textColor}>See all</Text>
        </View>
        <View style={globalStyles.monthTextCont}>
          <Text style={globalStyles.monthText}>SEP</Text>
        </View>
        <View style={globalStyles.eventUpcoming}>
          <View style={globalStyles.upcomingTextCont}>
            <View style={globalStyles.textContDay}>
              <Text style={globalStyles.textDay}>16</Text>
              <Text style={globalStyles.textDay}>Thu</Text>
            </View>
          </View>
          <View style={globalStyles.contentUpcoming}>
            <ScrollView horizontal={true} style={globalStyles.wrapperBox}>
              <TouchableOpacity
                onPress={() => navigation.navigate('DetailEvent')}
                style={globalStyles.boxEvent}>
                <Image
                  source={require('../assets/img/event.png')}
                  style={globalStyles.img}
                />

                <View style={globalStyles.wrapperTitleTextHome}>
                  <Text style={globalStyles.textTitleDetail}>
                    Wed, 10 Nov, 4:00 PM
                  </Text>
                  <Text style={globalStyles.textTitleMain}>
                    Sights & Sounds Exhibition
                  </Text>
                  <TouchableOpacity
                    style={globalStyles.btnArrowRight}
                    onPress={() => navigation.navigate('Events')}>
                    <View>
                      <FeatherIcon name="arrow-right" size={30} color="white" />
                    </View>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('DetailEvent')}
                style={globalStyles.boxEvent}>
                <Image
                  source={require('../assets/img/event2.jpg')}
                  style={globalStyles.img}
                />

                <View style={globalStyles.wrapperTitleTextHome}>
                  <Text style={globalStyles.textTitleDetail}>
                    Wed, 10 Nov, 4:00 PM
                  </Text>
                  <Text style={globalStyles.textTitleMain}>
                    Sights & Sounds Exhibition
                  </Text>
                  <TouchableOpacity
                    style={globalStyles.btnArrowRight}
                    onPress={() => navigation.navigate('Events')}>
                    <View>
                      <FeatherIcon name="arrow-right" size={30} color="white" />
                    </View>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('DetailEvent')}
                style={globalStyles.boxEvent}>
                <Image
                  source={require('../assets/img/event3.jpg')}
                  style={globalStyles.img}
                />

                <View style={globalStyles.wrapperTitleTextHome}>
                  <Text style={globalStyles.textTitleDetail}>
                    Wed, 10 Nov, 4:00 PM
                  </Text>
                  <Text style={globalStyles.textTitleMain}>
                    Sights & Sounds Exhibition
                  </Text>
                  <TouchableOpacity
                    style={globalStyles.btnArrowRight}
                    onPress={() => navigation.navigate('Events')}>
                    <View>
                      <FeatherIcon name="arrow-right" size={30} color="white" />
                    </View>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('DetailEvent')}
                style={globalStyles.boxEvent}>
                <Image
                  source={require('../assets/img/event2.jpg')}
                  style={globalStyles.img}
                />

                <View style={globalStyles.wrapperTitleTextHome}>
                  <Text style={globalStyles.textTitleDetail}>
                    Wed, 10 Nov, 4:00 PM
                  </Text>
                  <Text style={globalStyles.textTitleMain}>
                    Sights & Sounds Exhibition
                  </Text>
                  <TouchableOpacity
                    style={globalStyles.btnArrowRight}
                    onPress={() => navigation.navigate('Events')}>
                    <View>
                      <FeatherIcon name="arrow-right" size={30} color="white" />
                    </View>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity style={globalStyles.buttonUpcoming}>
              <Text style={globalStyles.textButton}>Show All 5 Events</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={globalStyles.eventUpcoming}>
          <View style={globalStyles.upcomingTextCont}>
            <View style={globalStyles.textContDay}>
              <Text style={globalStyles.textDay}>16</Text>
              <Text style={globalStyles.textDay}>Thu</Text>
            </View>
          </View>
          <ScrollView horizontal={true} style={globalStyles.wrapperBox}>
            <TouchableOpacity
              onPress={() => navigation.navigate('DetailEvent')}
              style={globalStyles.boxEvent}>
              <Image
                source={require('../assets/img/event.png')}
                style={globalStyles.img}
              />

              <View style={globalStyles.wrapperTitleTextHome}>
                <Text style={globalStyles.textTitleDetail}>
                  Wed, 10 Nov, 4:00 PM
                </Text>
                <Text style={globalStyles.textTitleMain}>
                  Sights & Sounds Exhibition
                </Text>
                <TouchableOpacity
                  style={globalStyles.btnArrowRight}
                  onPress={() => navigation.navigate('Events')}>
                  <View>
                    <FeatherIcon name="arrow-right" size={30} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('DetailEvent')}
              style={globalStyles.boxEvent}>
              <Image
                source={require('../assets/img/event2.jpg')}
                style={globalStyles.img}
              />

              <View style={globalStyles.wrapperTitleTextHome}>
                <Text style={globalStyles.textTitleDetail}>
                  Wed, 10 Nov, 4:00 PM
                </Text>
                <Text style={globalStyles.textTitleMain}>
                  Sights & Sounds Exhibition
                </Text>
                <TouchableOpacity
                  style={globalStyles.btnArrowRight}
                  onPress={() => navigation.navigate('Events')}>
                  <View>
                    <FeatherIcon name="arrow-right" size={30} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('DetailEvent')}
              style={globalStyles.boxEvent}>
              <Image
                source={require('../assets/img/event3.jpg')}
                style={globalStyles.img}
              />

              <View style={globalStyles.wrapperTitleTextHome}>
                <Text style={globalStyles.textTitleDetail}>
                  Wed, 10 Nov, 4:00 PM
                </Text>
                <Text style={globalStyles.textTitleMain}>
                  Sights & Sounds Exhibition
                </Text>
                <TouchableOpacity
                  style={globalStyles.btnArrowRight}
                  onPress={() => navigation.navigate('Events')}>
                  <View>
                    <FeatherIcon name="arrow-right" size={30} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('DetailEvent')}
              style={globalStyles.boxEvent}>
              <Image
                source={require('../assets/img/event2.jpg')}
                style={globalStyles.img}
              />

              <View style={globalStyles.wrapperTitleTextHome}>
                <Text style={globalStyles.textTitleDetail}>
                  Wed, 10 Nov, 4:00 PM
                </Text>
                <Text style={globalStyles.textTitleMain}>
                  Sights & Sounds Exhibition
                </Text>
                <TouchableOpacity
                  style={globalStyles.btnArrowRight}
                  onPress={() => navigation.navigate('Events')}>
                  <View>
                    <FeatherIcon name="arrow-right" size={30} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
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
